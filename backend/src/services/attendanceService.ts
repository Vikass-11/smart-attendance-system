import * as attendanceModel from '../models/attendanceModel';

export const isValidStatus = (status: string): boolean => ['present', 'absent', 'late'].includes(status);
export const recordAttendance = async (studentId: number, markedBy: number, date: string, status: string) => attendanceModel.upsertAttendance(studentId, markedBy, date, status);
export const fetchStudentHistory = async (studentId: number) => attendanceModel.getStudentAttendanceHistory(studentId);
export const computeAttendancePercentage = async (studentId: number) => attendanceModel.getAttendanceSummary(studentId);
export const fetchClassAttendance = async (date: string) => attendanceModel.getDailyClassAttendance(date);
export const fetchLowAttendanceStudents = async (threshold: number) => attendanceModel.getLowAttendanceList(threshold);
export const fetchHighAttendanceStudents = async (departmentId: number, threshold: number) => attendanceModel.getHighAttendanceListByDept(departmentId, threshold);