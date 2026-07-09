import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/authService';
import { createAccessToken } from '../services/tokenService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password, role, departmentId } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    departmentId?: number | null;
  };

  if (!name || !email || !password || !role) {
    next(new AppError('Name, email, password, and role are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (!authService.isValidRole(role)) {
    next(new AppError('Invalid role', 400, 'VALIDATION_ERROR'));
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

    sendSuccess(res, {
      statusCode: 201,
      message: 'Registration completed successfully',
      data: { accessToken, user },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      next(new AppError(error.message, 409, 'DUPLICATE_RESOURCE'));
      return;
    }

    next(new AppError('Registration failed', 500, 'REGISTRATION_FAILED'));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    next(new AppError('Email and password are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const user = await authService.loginUser(email, password);

    if (!user) {
      next(new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS'));
      return;
    }

    const accessToken = createAccessToken(user);

    sendSuccess(res, {
      message: 'Login successful',
      data: { accessToken, user },
    });
  } catch {
    next(new AppError('Login failed', 500, 'LOGIN_FAILED'));
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
    return;
  }

  sendSuccess(res, {
    message: 'Authenticated user fetched successfully',
    data: req.user,
  });
};
