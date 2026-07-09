import { NextFunction, Response } from 'express';
import * as leaveService from '../services/leaveService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

export const submitLeave = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { reason, fromDate, toDate } = req.body;

  if (!reason || !fromDate || !toDate) {
    next(new AppError('reason, fromDate, and toDate are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (!leaveService.validateLeaveDates(fromDate, toDate)) {
    next(new AppError('fromDate cannot be after toDate', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await leaveService.createLeaveRequest(req.user!.id, reason, fromDate, toDate);
    sendSuccess(res, {
      statusCode: 201,
      message: 'Leave request submitted',
      data: { id: result.insertId, reason, fromDate, toDate },
    });
  } catch {
    next(new AppError('Failed to submit leave request', 500, 'LEAVE_SUBMIT_FAILED'));
  }
};

export const getMyLeaveRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await leaveService.fetchMyLeaveRequests(req.user!.id);
    sendSuccess(res, {
      message: 'Leave requests fetched successfully',
      data: requests,
    });
  } catch {
    next(new AppError('Failed to fetch leave requests', 500, 'LEAVE_FETCH_FAILED'));
  }
};

export const getPendingRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await leaveService.fetchPendingLeaveRequests();
    sendSuccess(res, {
      message: 'Pending leave requests fetched successfully',
      data: requests,
    });
  } catch {
    next(new AppError('Failed to fetch pending requests', 500, 'PENDING_LEAVE_FETCH_FAILED'));
  }
};

export const reviewLeave = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { decision } = req.body;

  if (!['approved', 'rejected'].includes(decision)) {
    next(new AppError('decision must be approved or rejected', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await leaveService.processLeaveDecision(Number(id), decision, req.user!.id);

    if (!result.success) {
      next(new AppError(result.error || 'Failed to review leave request', result.statusCode || 500, 'LEAVE_REVIEW_FAILED'));
      return;
    }

    sendSuccess(res, {
      message: `Leave request ${decision}`,
      data: { id: Number(id), decision },
    });
  } catch {
    next(new AppError('Failed to review leave request', 500, 'LEAVE_REVIEW_FAILED'));
  }
};
