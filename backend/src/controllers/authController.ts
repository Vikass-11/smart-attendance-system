import { Response } from 'express';
import * as authService from '../services/authService';
import { AuthenticatedRequest } from '../types';

export const registerUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, role, departmentId } = req.body;
  const pending = req.user_pending;

  if (!pending) {
    res.status(401).json({ error: 'No pending user context' });
    return;
  }

  const { uid, email } = pending;

  if (!name || !role) {
    res.status(400).json({ error: 'Name and role are required' });
    return;
  }

  if (!authService.isValidRole(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  try {
    const alreadyRegistered = await authService.isUserRegistered(uid);
    if (alreadyRegistered) {
      res.status(409).json({ error: 'User already registered' });
      return;
    }

    const id = await authService.createUser(uid, name, email, role, departmentId || null);

    res.status(201).json({ id, uid, name, email, role, departmentId: departmentId || null });
  } catch (err: any) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.json(req.user);
};