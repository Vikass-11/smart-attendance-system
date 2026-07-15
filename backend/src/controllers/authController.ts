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

    // Set HttpOnly cookie for access token (for improved security)
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      statusCode: 201,
      message: 'Registration completed successfully',
      data: { user },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      next(new AppError(error.message, 409, 'DUPLICATE_RESOURCE'));
      return;
    }
    console.error('Registration error:', error);
    next(error);
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

    // Set HttpOnly cookie containing the access token
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      message: 'Login successful',
      data: { user },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
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

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax' });
    sendSuccess(res, { message: 'Logged out successfully', data: null });
  } catch (err) {
    next(new AppError('Logout failed', 500, 'LOGOUT_FAILED'));
  }
};
