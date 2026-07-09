import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  logger.error(message, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
    },
  });
};