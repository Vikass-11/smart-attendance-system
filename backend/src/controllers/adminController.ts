import { Response } from 'express';
import * as adminService from '../services/adminService';
import { AuthenticatedRequest } from '../types';

export const addDepartment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'name is required' });
    return;
  }

  try {
    const result = await adminService.createNewDepartment(name);
    res.status(201).json({ id: result.insertId, name });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Department already exists' });
      return;
    }
    res.status(500).json({ error: 'Failed to create department', details: err.message });
  }
};

export const listDepartments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const departments = await adminService.fetchDepartments();
    res.json(departments);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch departments', details: err.message });
  }
};

export const listUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const role = req.query.role as string | undefined;
  const search = req.query.search as string | undefined;

  try {
    const users = await adminService.fetchUsers(role, search);
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role, departmentId } = req.body;

  if (!adminService.isValidRole(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  try {
    await adminService.changeUserRole(Number(id), role, departmentId || null);
    res.json({ message: 'User updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

export const removeUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await adminService.deactivateUser(Number(id));
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};