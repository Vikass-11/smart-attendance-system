import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SuccessOptions<T> {
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
  statusCode?: number;
}

interface PaginatedOptions<T> {
  data: T;
  pagination: PaginationMeta;
  message?: string;
  statusCode?: number;
}

export const sendSuccess = <T>(
  res: Response,
  { data, message = 'Request completed successfully', meta, statusCode = 200 }: SuccessOptions<T>
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const sendPaginated = <T>(
  res: Response,
  { data, pagination, message = 'Request completed successfully', statusCode = 200 }: PaginatedOptions<T>
) => {
  return sendSuccess(res, {
    data,
    message,
    meta: { pagination },
    statusCode,
  });
};

export const createPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});
