import db from '../config/db';
import { RowDataPacket } from 'mysql2';

export const getDailyReport = async (date: string): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id AS student_id, u.name, u.email, a.status
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date = ?
     WHERE u.role = 'student' AND u.is_active = TRUE
     ORDER BY u.name`,
    [date]
  );
  return rows;
};

export const getRangeReport = async (fromDate: string, toDate: string): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id AS student_id, u.name, u.email,
            COUNT(a.id) AS total_days,
            SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_days,
            SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_days,
            SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_days,
            ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / NULLIF(COUNT(a.id), 0)) * 100, 2) AS percentage
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = TRUE
     GROUP BY u.id
     ORDER BY u.name`,
    [fromDate, toDate]
  );
  return rows;
};

export const getInstitutionSummary = async (fromDate: string, toDate: string): Promise<RowDataPacket> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT
        COUNT(DISTINCT u.id) AS total_students,
        COUNT(a.id) AS total_records,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS total_present,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS total_absent,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS total_late,
        ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / NULLIF(COUNT(a.id), 0)) * 100, 2) AS overall_percentage
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = TRUE`,
    [fromDate, toDate]
  );
  return rows[0];
};

export const getDepartmentWiseReport = async (fromDate: string, toDate: string): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT d.name AS department,
            COUNT(DISTINCT u.id) AS total_students,
            ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / NULLIF(COUNT(a.id), 0)) * 100, 2) AS percentage
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = TRUE
     GROUP BY d.id
     ORDER BY percentage ASC`,
    [fromDate, toDate]
  );
  return rows;
};
