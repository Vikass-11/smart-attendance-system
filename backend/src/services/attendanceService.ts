import * as attendanceModel from '../models/attendanceModel';
import db from '../config/db';
import { AppError } from '../middleware/errorHandler';

export const VALID_STATUSES = ['present', 'absent', 'late'];

export const isValidStatus = (status: string): boolean => VALID_STATUSES.includes(status);

export const recordAttendance = async (studentId: number, markedBy: number, date: string, status: string) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const result = await attendanceModel.markAttendanceWithConn(conn, studentId, markedBy, date, status);
    await conn.commit();
    return result;
  } catch (err: any) {
    await conn.rollback();
    throw new AppError('Failed to record attendance', 500, 'ATTENDANCE_TX_FAILED');
  } finally {
    conn.release();
  }
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

export const fetchAboveThresholdStudents = async (threshold: number) => {
  return attendanceModel.getStudentsAboveThreshold(threshold);
};