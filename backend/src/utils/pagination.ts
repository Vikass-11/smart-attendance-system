export interface PaginationParams {
  page?: number;
  limit?: number;
}

export const getPagination = (page = 1, limit = 10) => {
  const p = Math.max(1, Number(page || 1));
  const l = Math.max(1, Number(limit || 10));
  const offset = (p - 1) * l;
  return { page: p, limit: l, offset };
};

export const getPagingData = (totalItems: number, page: number, limit: number) => {
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage };
};

export default { getPagination, getPagingData };
import { AppError } from '../middleware/errorHandler';

export interface PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}

export interface SortingOptions<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: 'asc' | 'desc';
}

export const parsePositiveInt = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
};

export const parsePaginationOptions = (query: Record<string, unknown>, defaults = { page: 1, limit: 10 }): PaginationOptions => {
  const page = parsePositiveInt(query.page, defaults.page);
  const limit = Math.min(parsePositiveInt(query.limit, defaults.limit), 100);

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};

export const parseSortOrder = (value: unknown): 'asc' | 'desc' => {
  if (typeof value === 'string' && value.toLowerCase() === 'asc') {
    return 'asc';
  }

  return 'desc';
};

export const parseSortBy = <TSortBy extends string>(
  value: unknown,
  allowed: readonly TSortBy[],
  fallback: TSortBy
): TSortBy => {
  if (typeof value !== 'string') {
    return fallback;
  }

  if (!allowed.includes(value as TSortBy)) {
    throw new AppError(`Invalid sortBy value. Allowed values: ${allowed.join(', ')}`, 400, 'INVALID_SORT');
  }

  return value as TSortBy;
};
