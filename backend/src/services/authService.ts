import bcrypt from 'bcryptjs';
import db from '../config/db';

export const adminExists = async (): Promise<boolean> => {
  const [rows]: any = await db.query(`SELECT COUNT(*) as count FROM users WHERE role = 'admin'`);
  return rows[0].count > 0;
};

export const isValidRegistrationRole = (role: string): boolean => {
  return ['student', 'admin'].includes(role);
};

export const registerUser = async (name: string, email: string, password_raw: string, role: string, departmentId: number | null): Promise<any> => {
  const [existing]: any = await db.query(`SELECT id FROM users WHERE email = ?`, [email]);
  if (existing.length > 0) throw new Error('User already exists');

  const isFirstAdmin = role === 'admin' && !(await adminExists());
  if (role === 'admin' && !isFirstAdmin) throw new Error('AdminAlreadyExists');

  const passwordHash = await bcrypt.hash(password_raw, 10);
  const isSystemAdmin = isFirstAdmin ? 1 : 0;

  const [res]: any = await db.query(
    `INSERT INTO users (name, email, password_hash, role, department_id, is_system_admin, is_active) 
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    [name, email, passwordHash, role, departmentId, isSystemAdmin]
  );

  return { id: res.insertId, name, email, role, departmentId, isSystemAdmin: !!isSystemAdmin };
};

export const loginUser = async (email: string, password_raw: string): Promise<any | null> => {
  const [rows]: any = await db.query(`SELECT * FROM users WHERE email = ? AND is_active = 1`, [email]);
  const user = rows[0];

  if (!user || !user.password_hash) return null;

  const valid = await bcrypt.compare(password_raw, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    departmentId: user.department_id,
    isSystemAdmin: !!user.is_system_admin,
  };
};