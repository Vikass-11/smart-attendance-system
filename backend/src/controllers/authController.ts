import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { createAccessToken } from '../services/tokenService';
import { AuthenticatedRequest } from '../types';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role, departmentId } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    departmentId?: number | null;
  };

  if (!name || !email || !password || !role) {
    res.status(400).json({ error: 'Name, email, password, and role are required' });
    return;
  }

  if (!authService.isValidRole(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  try {
    const user = await authService.registerUser(
      name,
      email,
      password,
      role,
      departmentId ?? null
    );

    const accessToken = createAccessToken(user);

    res.status(201).json({ accessToken, user });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      res.status(409).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  try {
    const user = await authService.loginUser(email, password);

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const accessToken = createAccessToken(user);

    res.status(200).json({ accessToken, user });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.status(200).json({ user: req.user });
};