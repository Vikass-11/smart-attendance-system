import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { PoolConnection } from 'mysql2/promise';

export const submitLeaveRequest = async (
  studentId: number,
  reason: string,
  fromDate: string,
  toDate: string
): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO leave_requests (student_id, reason, from_date, to_date, status)
     VALUES (?, ?, ?, ?, 'pending')`,
    [studentId, reason, fromDate, toDate]
  );
  return result;
};

export const getStudentLeaveRequests = async (studentId: number): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, reason, from_date, to_date, status, created_at
     FROM leave_requests
     WHERE student_id = ?
     ORDER BY created_at DESC`,
    [studentId]
  );
  return rows;
};

export const getPendingLeaveRequests = async (): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT lr.id, lr.reason, lr.from_date, lr.to_date, lr.status, lr.created_at,
            u.id AS student_id, u.name AS student_name, u.email AS student_email
     FROM leave_requests lr
     JOIN users u ON lr.student_id = u.id
     WHERE lr.status = 'pending'
     ORDER BY lr.created_at ASC`
  );
  return rows;
};

export const getLeaveRequestById = async (id: number): Promise<RowDataPacket | undefined> => {
  const [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM leave_requests WHERE id = ?`, [id]);
  return rows[0];
};

export const updateLeaveStatus = async (
  id: number,
  status: string,
  reviewedBy: number
): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE leave_requests SET status = ?, reviewed_by = ? WHERE id = ?`,
    [status, reviewedBy, id]
  );
  return result;
};

export const getLeaveRequestByIdWithConn = async (conn: PoolConnection, id: number): Promise<RowDataPacket | undefined> => {
  const [rows] = await conn.query<RowDataPacket[]>(`SELECT * FROM leave_requests WHERE id = ? FOR UPDATE`, [id]);
  return rows[0];
};

export const updateLeaveStatusWithConn = async (conn: PoolConnection, id: number, status: string, reviewedBy: number): Promise<ResultSetHeader> => {
  const [result] = await conn.query<ResultSetHeader>(
    `UPDATE leave_requests SET status = ?, reviewed_by = ? WHERE id = ?`,
    [status, reviewedBy, id]
  );
  return result;
};