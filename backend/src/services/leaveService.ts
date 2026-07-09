import * as leaveModel from '../models/leaveModel';

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
  const leaveRequest = await leaveModel.getLeaveRequestById(id);

  if (!leaveRequest) {
    return { success: false, error: 'Leave request not found', statusCode: 404 };
  }

  if (leaveRequest.status !== 'pending') {
    return { success: false, error: `Leave request already ${leaveRequest.status}`, statusCode: 409 };
  }

  await leaveModel.updateLeaveStatus(id, decision, reviewerId);
  return { success: true };
};