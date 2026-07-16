import * as leaveModel from '../models/leaveModel';

export const validateLeaveDates = (fromDate: string, toDate: string): boolean => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  return start <= end;
};

export const createLeaveRequest = async (studentId: number, reason: string, fromDate: string, toDate: string) => leaveModel.insertLeaveRequest(studentId, reason, fromDate, toDate);
export const fetchMyLeaveRequests = async (studentId: number) => leaveModel.getLeaveRequestsByStudent(studentId);
export const fetchPendingLeaveRequests = async () => leaveModel.getAllPendingLeaveRequests();
export const processLeaveDecision = async (id: number, decision: 'approved' | 'rejected', reviewedBy: number) => {
  const request = await leaveModel.getLeaveRequestById(id);
  if (!request) return { success: false, error: 'Leave request not found', statusCode: 404 };
  if (request.status !== 'pending') return { success: false, error: 'Leave request already reviewed', statusCode: 400 };

  await leaveModel.updateLeaveStatus(id, decision, reviewedBy);
  return { success: true };
};