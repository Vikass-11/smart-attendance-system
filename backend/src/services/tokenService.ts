import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const createAccessToken = (user: any): string => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};