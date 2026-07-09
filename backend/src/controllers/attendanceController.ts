import { NextFunction, Response } from 'express';
import * as attendanceService from '../services/attendanceService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

export const markAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    next(new AppError('studentId, date, and status are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (!attendanceService.isValidStatus(status)) {
    next(new AppError('Invalid status', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    await attendanceService.recordAttendance(studentId, req.user!.id, date, status);
    sendSuccess(res, {
      message: 'Attendance marked successfully',
      data: { studentId, date, status },
    });
  } catch {
    next(new AppError('Failed to mark attendance', 500, 'ATTENDANCE_MARK_FAILED'));
  }
};

export const getMyAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await attendanceService.fetchStudentHistory(req.user!.id);
    sendSuccess(res, {
      message: 'Attendance history fetched successfully',
      data: records,
    });
  } catch {
    next(new AppError('Failed to fetch attendance', 500, 'ATTENDANCE_FETCH_FAILED'));
  }
};

export const getMyPercentage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await attendanceService.computeAttendancePercentage(req.user!.id);
    sendSuccess(res, {
      message: 'Attendance percentage calculated successfully',
      data: result,
    });
  } catch {
    next(new AppError('Failed to calculate percentage', 500, 'ATTENDANCE_PERCENTAGE_FAILED'));
  }
};

export const getClassAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    next(new AppError('date query param is required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const records = await attendanceService.fetchClassAttendance(date);
    sendSuccess(res, {
      message: 'Class attendance fetched successfully',
      data: records,
    });
  } catch {
    next(new AppError('Failed to fetch class attendance', 500, 'CLASS_ATTENDANCE_FETCH_FAILED'));
  }
};

export const getLowAttendanceStudents = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const threshold = req.query.threshold ? parseFloat(req.query.threshold as string) : 75;

  try {
    const students = await attendanceService.fetchLowAttendanceStudents(threshold);
    sendSuccess(res, {
      message: 'Low attendance students fetched successfully',
      data: students,
    });
  } catch {
    next(new AppError('Failed to fetch low attendance students', 500, 'LOW_ATTENDANCE_FETCH_FAILED'));
  }
};
