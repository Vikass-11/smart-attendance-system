import bcrypt from 'bcryptjs';
import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import type { AppUser } from '../types';

interface UserRecord extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'faculty' | 'admin';
  department_id: number | null;
  is_active: number;
}

const mapUser = (row: UserRecord): AppUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  departmentId: row.department_id,
});

export const isValidRole = (role: string): role is AppUser['role'] => {
  return ['student', 'faculty', 'admin'].includes(role);
};

export const getUserById = async (id: number): Promise<AppUser | null> => {
  const [rows] = await db.query<UserRecord[]>(
    'SELECT id, name, email, password_hash, role, department_id, is_active FROM users WHERE id = ? AND is_active = TRUE LIMIT 1',
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return mapUser(rows[0]);
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: AppUser['role'],
  departmentId: number | null
): Promise<AppUser> => {
  const [existingRows] = await db.query<UserRecord[]>(
    'SELECT id, name, email, password_hash, role, department_id, is_active FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  const passwordHash = await bcrypt.hash(password, 10);

  if (existingRows.length > 0) {
    const existingUser = existingRows[0];

    if (existingUser.is_active) {
      throw new Error('User already exists');
    }

    await db.query<ResultSetHeader>(
      `UPDATE users
       SET name = ?, password_hash = ?, role = ?, department_id = ?, is_active = TRUE
       WHERE id = ?`,
      [name, passwordHash, role, departmentId, existingUser.id]
    );

    const reactivatedUser = await getUserById(existingUser.id);

    if (!reactivatedUser) {
      throw new Error('User reactivation failed');
    }

    return reactivatedUser;
  }

  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO users (name, email, password_hash, role, department_id) VALUES (?, ?, ?, ?, ?)',
    [name, email, passwordHash, role, departmentId]
  );

  const user = await getUserById(result.insertId);

  if (!user) {
    throw new Error('User creation failed');
  }

  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AppUser | null> => {
  const [rows] = await db.query<UserRecord[]>(
    'SELECT id, name, email, password_hash, role, department_id, is_active FROM users WHERE email = ? AND is_active = TRUE LIMIT 1',
    [email]
  );

  if (rows.length === 0) {
    return null;
  }

  const userRecord = rows[0];
  const passwordMatches = await bcrypt.compare(password, userRecord.password_hash);

  if (!passwordMatches) {
    return null;
  }

  return mapUser(userRecord);
};
