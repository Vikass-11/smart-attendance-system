import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const createDepartment = async (name: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(`INSERT INTO departments (name) VALUES (?)`, [name]);
  return result;
};

export const getAllDepartments = async (): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM departments ORDER BY name`);
  return rows;
};

export const getAllUsers = async (role: string | null = null): Promise<RowDataPacket[]> => {
  let query = `SELECT u.id, u.name, u.email, u.role, u.created_at, d.name AS department
               FROM users u
               LEFT JOIN departments d ON u.department_id = d.id
               WHERE u.is_active = TRUE`;
  const params: string[] = [];

  if (role) {
    query += ` AND u.role = ?`;
    params.push(role);
  }

  query += ` ORDER BY u.name`;

  const [rows] = await db.query<RowDataPacket[]>(query, params);
  return rows;
};

export const searchUsers = async (searchTerm: string): Promise<RowDataPacket[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id, u.name, u.email, u.role, d.name AS department
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     WHERE u.is_active = TRUE AND (u.name LIKE ? OR u.email LIKE ?)
     ORDER BY u.name`,
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  return rows;
};

export const updateUserRole = async (
  userId: number,
  role: string,
  departmentId: number | null
): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE users SET role = ?, department_id = ? WHERE id = ?`,
    [role, departmentId, userId]
  );
  return result;
};

export const deleteUser = async (userId: number): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(`UPDATE users SET is_active = FALSE WHERE id = ?`, [userId]);
  return result;
};