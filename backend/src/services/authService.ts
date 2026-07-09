import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const isUserRegistered = async (uid: string): Promise<boolean> => {
  const [rows] = await db.query<RowDataPacket[]>('SELECT id FROM users WHERE firebase_uid = ?', [uid]);
  return rows.length > 0;
};

export const createUser = async (
  uid: string,
  name: string,
  email: string,
  role: string,
  departmentId: number | null
): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO users (firebase_uid, name, email, role, department_id) VALUES (?, ?, ?, ?, ?)',
    [uid, name, email, role, departmentId]
  );
  return result.insertId;
};

export const isValidRole = (role: string): boolean => {
  return ['student', 'faculty', 'admin'].includes(role);
};