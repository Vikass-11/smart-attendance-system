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

export const getAllDepartments = async (filters: DepartmentFilters): Promise<{ rows: any[]; total: number }> => {
  let query = 'SELECT id, name, created_at as createdAt FROM departments WHERE 1=1';
  const params: any[] = [];

  if (filters.search) {
    query += ' AND name LIKE ?';
    params.push(`%${filters.search}%`);
  }

  const countQuery = `SELECT COUNT(*) as count FROM (${query}) as t`;
  const [countRes]: any = await db.query(countQuery, params);
  const total = countRes[0].count;

  const columnMap: Record<string, string> = { name: 'name', createdAt: 'created_at' };
  const orderCol = columnMap[filters.sortBy] || 'name';
  query += ` ORDER BY ${orderCol} ${filters.sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  query += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);

  const [rows]: any = await db.query(query, params);
  return { rows, total };
};

export const getUsers = async (filters: UserFilters): Promise<{ rows: UserModelRow[]; total: number }> => {
  let query = `
    SELECT u.id, u.name, u.email, u.role, u.is_system_admin, u.is_active, d.name as department, u.created_at as createdAt 
    FROM users u
    LEFT JOIN departments d ON u.department_id = d.id
    WHERE u.is_active = 1
  `;
  const params: any[] = [];

  if (filters.role) {
    query += ' AND u.role = ?';
    params.push(filters.role);
  }

  if (filters.search) {
    query += ' AND (u.name LIKE ? OR u.email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const countQuery = `SELECT COUNT(*) as count FROM (${query}) as t`;
  const [countRes]: any = await db.query(countQuery, params);
  const total = countRes[0].count;

  const columnMap: Record<string, string> = {
    name: 'u.name',
    email: 'u.email',
    role: 'u.role',
    createdAt: 'u.created_at',
  };
  const orderCol = columnMap[filters.sortBy] || 'u.name';
  query += ` ORDER BY ${orderCol} ${filters.sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  query += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);

  const [rows] = await db.query<UserModelRow[]>(query, params);
  return { rows, total };
};

export const getUserById = async (id: number): Promise<any | null> => {
  const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

export const updateUserRoleAndDept = async (id: number, role: string, departmentId: number | null): Promise<void> => {
  await db.query('UPDATE users SET role = ?, department_id = ? WHERE id = ?', [role, departmentId, id]);
};

export const deleteUserSoft = async (id: number): Promise<void> => {
  await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);
};