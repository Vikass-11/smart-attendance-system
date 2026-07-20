import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export const upsertAttendance = async (studentId: number, markedBy: number, date: string, status: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO attendance (student_id, marked_by, date, status) 
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = ?, marked_by = ?, updated_at = NOW()`,
    [studentId, markedBy, date, status, status, markedBy]
  );
  return result;
};

export const getStudentAttendanceHistory = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT a.id, a.date, a.status, u.name as markedBy 
     FROM attendance a
     LEFT JOIN users u ON a.marked_by = u.id
     WHERE a.student_id = ?
     ORDER BY a.date DESC`,
    [studentId]
  );
  return rows;
};

export const getAttendanceSummary = async (studentId: number): Promise<any> => {
  const [rows]: any = await db.query(
    `SELECT 
       SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
       SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
       SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
       COUNT(*) as total
     FROM attendance 
     WHERE student_id = ?`,
    [studentId]
  );
  const summary = rows[0] || { present: 0, absent: 0, late: 0, total: 0 };
  const present = Number(summary.present || 0);
  const absent = Number(summary.absent || 0);
  const late = Number(summary.late || 0);
  const total = Number(summary.total || 0);

  const effectivePresent = present + (late * 0.5);
  const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 0;

  return { present, absent, late, total, percentage };
};

export const getDailyClassAttendance = async (date: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT a.id, u.id as studentId, u.name as studentName, u.email as studentEmail, a.status, a.date
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date = ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [date]
  );
  return rows;
};

export const getLowAttendanceList = async (threshold: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as present,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absent,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as late,
       COUNT(a.id) as total
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id
     WHERE u.role = 'student' AND u.is_active = 1
     GROUP BY u.id`
  );

  return rows.map((row: any) => {
    const present = Number(row.present);
    const absent = Number(row.absent);
    const late = Number(row.late);
    const total = Number(row.total);
    const effectivePresent = present + (late * 0.5);
    const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;
    return { id: row.id, name: row.name, email: row.email, present, absent, late, total, percentage };
  }).filter((s: any) => s.percentage < threshold);
};

export const getHighAttendanceListByDept = async (departmentId: number, threshold: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as present,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absent,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as late,
       COUNT(a.id) as total
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id
     WHERE u.role = 'student' AND u.is_active = 1 AND u.department_id = ?
     GROUP BY u.id`,
     [departmentId]
  );

  return rows.map((row: any) => {
    const present = Number(row.present);
    const absent = Number(row.absent);
    const late = Number(row.late);
    const total = Number(row.total);
    const effectivePresent = present + (late * 0.5);
    const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;
    return { id: row.id, name: row.name, email: row.email, present, absent, late, total, percentage };
  }).filter((s: any) => s.percentage >= threshold);
};