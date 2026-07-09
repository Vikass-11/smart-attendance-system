import { Response, NextFunction } from 'express';
import admin from '../config/firebase';
import db from '../config/db';
import { RowDataPacket } from 'mysql2';
import { AuthenticatedRequest, UserRow } from '../types';

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id, role, department_id FROM users WHERE firebase_uid = ? AND is_active = TRUE',
      [decoded.uid]
    );

    if (rows.length === 0) {
      res.status(403).json({ error: 'User not registered in system' });
      return;
    }

    const userRow = rows[0] as Pick<UserRow, 'id' | 'role' | 'department_id'>;

    req.user = {
      uid: decoded.uid,
      email: decoded.email || '',
      id: userRow.id,
      role: userRow.role,
      departmentId: userRow.department_id,
    };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const verifyFirebaseOnly = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user_pending = { uid: decoded.uid, email: decoded.email || '' };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
};