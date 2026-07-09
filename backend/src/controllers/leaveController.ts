import { Response } from 'express';
import * as leaveService from '../services/leaveService';
import { AuthenticatedRequest } from '../types';

export const submitLeave = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { reason, fromDate, toDate } = req.body;

  if (!reason || !fromDate || !toDate) {
    res.status(400).json({ error: 'reason, fromDate, and toDate are required' });
    return;
  }

  if (!leaveService.validateLeaveDates(fromDate, toDate)) {
    res.status(400).json({ error: 'fromDate cannot be after toDate' });
    return;
  }

  try {
    const result = await leaveService.createLeaveRequest(req.user!.id, reason, fromDate, toDate);
    res.status(201).json({ id: result.insertId, message: 'Leave request submitted' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit leave request', details: err.message });
  }
};

export const getMyLeaveRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const requests = await leaveService.fetchMyLeaveRequests(req.user!.id);
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch leave requests', details: err.message });
  }
};

export const getPendingRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const requests = await leaveService.fetchPendingLeaveRequests();
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch pending requests', details: err.message });
  }
};

export const reviewLeave = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { decision } = req.body;

  if (!['approved', 'rejected'].includes(decision)) {
    res.status(400).json({ error: 'decision must be approved or rejected' });
    return;
  }

  try {
    const result = await leaveService.processLeaveDecision(Number(id), decision, req.user!.id);

    if (!result.success) {
      res.status(result.statusCode || 500).json({ error: result.error });
      return;
    }

    res.json({ message: `Leave request ${decision}` });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to review leave request', details: err.message });
  }
};