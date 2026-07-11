import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { PoolConnection } from 'mysql2/promise';

export const markAttendance = async (
  studentId: number,
  markedBy: number,
  date: string,
  status: string
): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO attendance (student_id, marked_by, date, status)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by)`,
    [studentId, markedBy, date, status]
  );
  return result;
};

export const markAttendanceWithConn = async (
  conn: PoolConnection,
  studentId: number,
  markedBy: number,
  date: string,
  status: string
): Promise<ResultSetHeader> => {
  const [result] = await conn.query<ResultSetHeader>(
    `INSERT INTO attendance (student_id, marked_by, date, status)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by)`,
    [studentId, markedBy, date, status]
  );
  return result;
};

export const getStudentAttendance = async (studentId: number): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, date, status, created_at, updated_at
     FROM attendance
     WHERE student_id = ?
     ORDER BY date DESC`,
    [studentId]
  );
  return rows;
};

export const getAttendanceByDate = async (date: string): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT a.id, a.status, u.id AS student_id, u.name AS student_name
     FROM attendance a
     JOIN users u ON a.student_id = u.id
     WHERE a.date = ? AND u.role = 'student'
     ORDER BY u.name`,
    [date]
  );
  return rows;
};

export interface PercentageResult {
  totalDays: number;
  presentDays: number;
  percentage: number;
}

export const calculatePercentage = async (studentId: number): Promise<PercentageResult> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT
        COUNT(*) AS total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_days
     FROM attendance
     WHERE student_id = ?`,
    [studentId]
  );

  const totalDays = rows[0].total_days as number;
  const presentDays = rows[0].present_days as number;
  const percentage = totalDays > 0 ? Number(((presentDays / totalDays) * 100).toFixed(2)) : 0;

  return { totalDays, presentDays, percentage };
};

export const getStudentsBelowThreshold = async (threshold: number = 75): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT
        u.id, u.name, u.email,
        COUNT(a.id) AS total_days,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_days,
        ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS percentage
     FROM users u
     JOIN attendance a ON u.id = a.student_id
     WHERE u.role = 'student'
     GROUP BY u.id
     HAVING percentage < ?
     ORDER BY percentage ASC`,
    [threshold]
  );
  return rows;
};

export const getStudentsAboveThreshold = async (threshold: number = 75): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT
        u.id, u.name, u.email,
        COUNT(a.id) AS total_days,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_days,
        ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS percentage
     FROM users u
     JOIN attendance a ON u.id = a.student_id
     WHERE u.role = 'student'
     GROUP BY u.id
     HAVING percentage >= ?
     ORDER BY percentage DESC`,
    [threshold]
  );
  return rows;
};