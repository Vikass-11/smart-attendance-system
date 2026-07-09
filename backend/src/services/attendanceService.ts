import * as attendanceModel from '../models/attendanceModel';

export const VALID_STATUSES = ['present', 'absent', 'late'];

export const isValidStatus = (status: string): boolean => VALID_STATUSES.includes(status);

export const recordAttendance = async (studentId: number, markedBy: number, date: string, status: string) => {
  return attendanceModel.markAttendance(studentId, markedBy, date, status);
};

export const fetchStudentHistory = async (studentId: number) => {
  return attendanceModel.getStudentAttendance(studentId);
};

export const fetchClassAttendance = async (date: string) => {
  return attendanceModel.getAttendanceByDate(date);
};

export const computeAttendancePercentage = async (studentId: number) => {
  return attendanceModel.calculatePercentage(studentId);
};

export const fetchLowAttendanceStudents = async (threshold: number) => {
  return attendanceModel.getStudentsBelowThreshold(threshold);
};