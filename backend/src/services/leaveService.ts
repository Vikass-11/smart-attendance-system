import * as leaveModel from '../models/leaveModel';
import db from '../config/db';
import { AppError } from '../middleware/errorHandler';

export const validateLeaveDates = (fromDate: string, toDate: string): boolean => {
  return new Date(fromDate) <= new Date(toDate);
};

export const createLeaveRequest = async (studentId: number, reason: string, fromDate: string, toDate: string) => {
  return leaveModel.submitLeaveRequest(studentId, reason, fromDate, toDate);
};

export const fetchMyLeaveRequests = async (studentId: number) => {
  return leaveModel.getStudentLeaveRequests(studentId);
};

export const fetchPendingLeaveRequests = async () => {
  return leaveModel.getPendingLeaveRequests();
};

export const processLeaveDecision = async (
  id: number,
  decision: 'approved' | 'rejected',
  reviewerId: number
): Promise<{ success: boolean; error?: string; statusCode?: number }> => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const leaveRequest = await leaveModel.getLeaveRequestByIdWithConn(conn, id);

    if (!leaveRequest) {
      await conn.rollback();
      return { success: false, error: 'Leave request not found', statusCode: 404 };
    }

    if (leaveRequest.status !== 'pending') {
      await conn.rollback();
      return { success: false, error: `Leave request already ${leaveRequest.status}`, statusCode: 409 };
    }

    await leaveModel.updateLeaveStatusWithConn(conn, id, decision, reviewerId);
    await conn.commit();
    return { success: true };
  } catch (err: any) {
    await conn.rollback();
    throw new AppError('Failed to process leave decision', 500, 'LEAVE_TX_FAILED');
  } finally {
    conn.release();
  }
};