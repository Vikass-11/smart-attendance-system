import * as adminModel from '../models/adminModel';

export const isValidRole = (role: string): boolean => ['student', 'faculty', 'admin'].includes(role);

export const createNewDepartment = async (name: string) => {
  return adminModel.createDepartment(name);
};

export const fetchDepartments = async () => {
  return adminModel.getAllDepartments();
};

export const fetchUsers = async (role?: string, search?: string) => {
  if (search) return adminModel.searchUsers(search);
  return adminModel.getAllUsers(role || null);
};

export const changeUserRole = async (userId: number, role: string, departmentId: number | null) => {
  return adminModel.updateUserRole(userId, role, departmentId);
};

export const deactivateUser = async (userId: number) => {
  return adminModel.deleteUser(userId);
};