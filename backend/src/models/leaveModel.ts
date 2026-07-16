import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export const insertLeaveRequest = async (studentId: number, reason: string, fromDate: string, toDate: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO leave_requests (student_id, reason, from_date, to_date, status) VALUES (?, ?, ?, ?, 'pending')`,
    [studentId, reason, fromDate, toDate]
  );
  return result;
};

export const getLeaveRequestsByStudent = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT l.id, l.reason, l.from_date as fromDate, l.to_date as toDate, l.status, l.created_at as createdAt, u.name as reviewedBy
     FROM leave_requests l
     LEFT JOIN users u ON l.reviewed_by = u.id
     WHERE l.student_id = ?
     ORDER BY l.created_at DESC`,
    [studentId]
  );
  return rows;
};

export const getAllPendingLeaveRequests = async (): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT l.id, l.reason, l.from_date as fromDate, l.to_date as toDate, l.status, l.created_at as createdAt, u.name as studentName, u.email as studentEmail
     FROM leave_requests l
     JOIN users u ON l.student_id = u.id
     WHERE l.status = 'pending'
     ORDER BY l.created_at ASC`
  );
  return rows;
};

export const updateLeaveStatus = async (id: number, status: 'approved' | 'rejected', reviewedBy: number): Promise<void> => {
  await db.query(
    `UPDATE leave_requests SET status = ?, reviewed_by = ? WHERE id = ?`,
    [status, reviewedBy, id]
  );
};

export const getLeaveRequestById = async (id: number): Promise<any> => {
  const [rows]: any = await db.query(`SELECT * FROM leave_requests WHERE id = ?`, [id]);
  return rows[0] || null;
};