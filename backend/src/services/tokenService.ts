import jwt, { type SignOptions } from 'jsonwebtoken';
import type { AppUser } from '../types';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not configured');
}

export const createAccessToken = (user: AppUser): string => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string): AppUser => {
  return jwt.verify(token, JWT_SECRET) as AppUser;
};
