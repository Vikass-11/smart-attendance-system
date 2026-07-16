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
  is_system_admin: number;
}

interface CountRow extends RowDataPacket {
  count: number;
}

const mapUser = (row: UserRecord): AppUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  departmentId: row.department_id,
  isSystemAdmin: Boolean(row.is_system_admin),
});

/** Valid roles that can be chosen during self-registration */
export const REGISTRATION_ROLES = ['student', 'admin'] as const;
export type RegistrationRole = (typeof REGISTRATION_ROLES)[number];

export const isValidRole = (role: string): role is AppUser['role'] => {
  return ['student', 'faculty', 'admin'].includes(role);
};

export const isValidRegistrationRole = (role: string): role is RegistrationRole => {
  return REGISTRATION_ROLES.includes(role as RegistrationRole);
};

/** Returns the count of active admin users in the system. */
export const getAdminCount = async (): Promise<number> => {
  const [rows] = await db.query<CountRow[]>(
    `SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND is_active = TRUE`
  );
  return Number(rows[0].count);
};

/** Returns true if at least one admin exists. Used by the public /auth/admin-exists endpoint. */
export const adminExists = async (): Promise<boolean> => {
  const count = await getAdminCount();
  return count > 0;
};

export const getUserById = async (id: number): Promise<AppUser | null> => {
  const [rows] = await db.query<UserRecord[]>(
    'SELECT id, name, email, password_hash, role, department_id, is_active, is_system_admin FROM users WHERE id = ? AND is_active = TRUE LIMIT 1',
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
  role: RegistrationRole,
  departmentId: number | null
): Promise<AppUser> => {
  // Reject faculty role at registration — faculty is assigned by admin only
  if (!isValidRegistrationRole(role)) {
    throw new Error('InvalidRegistrationRole');
  }

  // If requesting admin role, ensure no admin exists yet
  if (role === 'admin') {
    const adminCount = await getAdminCount();
    if (adminCount > 0) {
      throw new Error('AdminAlreadyExists');
    }
  }

  const [existingRows] = await db.query<UserRecord[]>(
    'SELECT id, name, email, password_hash, role, department_id, is_active, is_system_admin FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  const passwordHash = await bcrypt.hash(password, 10);
  const isSystemAdmin = role === 'admin' ? 1 : 0;

  if (existingRows.length > 0) {
    const existingUser = existingRows[0];

    if (existingUser.is_active) {
      throw new Error('User already exists');
    }

    await db.query<ResultSetHeader>(
      `UPDATE users
       SET name = ?, password_hash = ?, role = ?, department_id = ?, is_active = TRUE, is_system_admin = ?
       WHERE id = ?`,
      [name, passwordHash, role, departmentId, isSystemAdmin, existingUser.id]
    );

    const reactivatedUser = await getUserById(existingUser.id);

    if (!reactivatedUser) {
      throw new Error('User reactivation failed');
    }

    return reactivatedUser;
  }

  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO users (name, email, password_hash, role, department_id, is_system_admin) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, passwordHash, role, departmentId, isSystemAdmin]
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
    'SELECT id, name, email, password_hash, role, department_id, is_active, is_system_admin FROM users WHERE email = ? AND is_active = TRUE LIMIT 1',
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
