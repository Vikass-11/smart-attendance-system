import { NextFunction, Response } from 'express';
import * as adminService from '../services/adminService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { createPaginationMeta, sendPaginated, sendSuccess } from '../utils/apiResponse';
import { parsePaginationOptions, parseSortBy, parseSortOrder } from '../utils/pagination';

export const addDepartment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    next(new AppError('name is required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await adminService.createNewDepartment(name);
    sendSuccess(res, {
      statusCode: 201,
      message: 'Department created successfully',
      data: { id: result.insertId, name },
    });
  } catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      next(new AppError('Department already exists', 409, 'DUPLICATE_RESOURCE'));
      return;
    }
    next(new AppError('Failed to create department', 500, 'DEPARTMENT_CREATE_FAILED'));
  }
};

export const listDepartments = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pagination = parsePaginationOptions(req.query as Record<string, unknown>);
    const sortBy = parseSortBy(req.query.sortBy, ['name', 'createdAt'] as const, 'name');
    const sortOrder = parseSortOrder(req.query.sortOrder);
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined;

    const result = await adminService.fetchDepartments({
      ...pagination,
      sortBy,
      sortOrder,
      search,
    });

    sendPaginated(res, {
      data: result.rows,
      pagination: createPaginationMeta(pagination.page, pagination.limit, result.total),
      message: 'Departments fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const role = req.query.role as string | undefined;
  const search = req.query.search as string | undefined;

  try {
    const pagination = parsePaginationOptions(req.query as Record<string, unknown>);
    const sortBy = parseSortBy(req.query.sortBy, ['name', 'email', 'role', 'createdAt'] as const, 'name');
    const sortOrder = parseSortOrder(req.query.sortOrder);

    const result = await adminService.fetchUsers({
      ...pagination,
      role,
      search: search?.trim() || undefined,
      sortBy,
      sortOrder,
    });

    sendPaginated(res, {
      data: result.rows,
      pagination: createPaginationMeta(pagination.page, pagination.limit, result.total),
      message: 'Users fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { role, departmentId } = req.body as { role?: string; departmentId?: number | null };
  const actingUser = req.user!;
  const targetId = Number(id);

  if (role !== undefined && !adminService.isValidRole(role)) {
    next(new AppError('Invalid role. Must be one of: student, faculty, admin', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (departmentId !== undefined && departmentId !== null && Number.isNaN(Number(departmentId))) {
    next(new AppError('departmentId must be a number or null', 400, 'VALIDATION_ERROR'));
    return;
  }

  // Prevent admin from changing their own role unless role unchanged
  if (actingUser.id === targetId && role !== undefined && role !== actingUser.role) {
    next(new AppError('You cannot change your own role', 403, 'SELF_ROLE_CHANGE'));
    return;
  }

  try {
    const targetUser = await adminService.getUserById(targetId);

    if (!targetUser) {
      next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
      return;
    }

    const nextRole = role ?? targetUser.role;
    const nextDepartmentId =
      departmentId !== undefined ? (departmentId === null ? null : Number(departmentId)) : targetUser.department_id;

    if (targetUser.is_system_admin && nextRole !== 'admin') {
      next(new AppError(
        'The system admin (first registered admin) cannot be demoted. This is a protected account.',
        403,
        'SYSTEM_ADMIN_PROTECTED'
      ));
      return;
    }

    if (role !== undefined && departmentId !== undefined) {
      await adminService.changeUserRole(targetId, nextRole, nextDepartmentId);
    } else if (role !== undefined) {
      await adminService.changeUserRole(targetId, nextRole, targetUser.department_id ?? null);
    } else if (departmentId !== undefined) {
      await adminService.changeUserDepartment(targetId, nextDepartmentId);
    } else {
      next(new AppError('No updatable fields provided', 400, 'VALIDATION_ERROR'));
      return;
    }

    sendSuccess(res, {
      message: 'User updated successfully',
      data: { id: targetId, role: nextRole, departmentId: nextDepartmentId },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError('Failed to update user', 500, 'USER_UPDATE_FAILED'));
  }
};

export const removeUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const actingUser = req.user!;
  const targetId = Number(id);

  // Prevent admin from deleting themselves
  if (actingUser.id === targetId) {
    next(new AppError('You cannot delete your own account', 403, 'SELF_DELETE'));
    return;
  }

  try {
    // Prevent deletion of the system admin account
    const targetUser = await adminService.getUserById(targetId);
    if (!targetUser) {
      next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
      return;
    }

    if (targetUser.is_system_admin) {
      next(new AppError('The system admin account cannot be deleted', 403, 'SYSTEM_ADMIN_PROTECTED'));
      return;
    }

    await adminService.deactivateUser(targetId);
    sendSuccess(res, {
      message: 'User deleted successfully',
      data: { id: targetId },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError('Failed to delete user', 500, 'USER_DELETE_FAILED'));
  }
};
