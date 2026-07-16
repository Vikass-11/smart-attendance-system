import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface UserFilters {
  role?: string | null;
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'name' | 'email' | 'role' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface DepartmentFilters {
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface UserModelRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string | null;
  is_system_admin: number;
  created_at: Date;
  updated_at: Date;
}

export const createDepartment = async (name: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(`INSERT INTO departments (name) VALUES (?)`, [name]);
  return result;
};

export const getAllDepartments = async (
  filters: DepartmentFilters
): Promise<{ rows: RowDataPacket[]; total: number }> => {
  const sortColumnMap: Record<DepartmentFilters['sortBy'], string> = {
    name: 'name',
    createdAt: 'created_at',
  };

  let whereClause = '';
  const params: Array<string | number> = [];

  if (filters.search) {
    whereClause = 'WHERE name LIKE ?';
    params.push(`%${filters.search}%`);
  }

  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM departments ${whereClause}`,
    params
  );

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM departments
     ${whereClause}
     ORDER BY ${sortColumnMap[filters.sortBy]} ${filters.sortOrder.toUpperCase()}
     LIMIT ? OFFSET ?`,
    [...params, filters.limit, filters.offset]
  );

  return { rows, total: Number(countRows[0].total) };
};

export const getAllUsers = async (
  filters: UserFilters
): Promise<{ rows: RowDataPacket[]; total: number }> => {
  const sortColumnMap: Record<UserFilters['sortBy'], string> = {
    name: 'u.name',
    email: 'u.email',
    role: 'u.role',
    createdAt: 'u.created_at',
  };

  let whereClause = 'WHERE u.is_active = TRUE';
  const params: Array<string | number> = [];

  if (filters.role) {
    whereClause += ' AND u.role = ?';
    params.push(filters.role);
  }

  if (filters.search) {
    whereClause += ' AND (u.name LIKE ? OR u.email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total
     FROM users u
     ${whereClause}`,
    params
  );

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id, u.name, u.email, u.role, u.is_system_admin, u.created_at, u.updated_at, d.name AS department
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     ${whereClause}
     ORDER BY ${sortColumnMap[filters.sortBy]} ${filters.sortOrder.toUpperCase()}
     LIMIT ? OFFSET ?`,
    [...params, filters.limit, filters.offset]
  );

  return { rows, total: Number(countRows[0].total) };
};

export const getUserById = async (userId: number): Promise<UserModelRow | null> => {
  const [rows] = await db.query<UserModelRow[]>(
    `SELECT u.id, u.name, u.email, u.role, u.is_system_admin, u.created_at, u.updated_at, d.name AS department
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     WHERE u.id = ? AND u.is_active = TRUE
     LIMIT 1`,
    [userId]
  );
  return rows.length > 0 ? rows[0] : null;
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
