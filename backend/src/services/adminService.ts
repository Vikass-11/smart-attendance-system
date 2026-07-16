import * as adminModel from '../models/adminModel';

export const createNewDepartment = async (name: string) => adminModel.createDepartment(name);
export const fetchDepartments = async (filters: adminModel.DepartmentFilters) => adminModel.getAllDepartments(filters);
export const fetchUsers = async (filters: adminModel.UserFilters) => adminModel.getUsers(filters);
export const isValidRole = (role: string): boolean => ['student', 'faculty', 'admin'].includes(role);
export const getUserById = async (id: number) => adminModel.getUserById(id);
export const changeUserRole = async (id: number, role: string, departmentId: number | null) => adminModel.updateUserRoleAndDept(id, role, departmentId);
export const deactivateUser = async (id: number) => adminModel.deleteUserSoft(id);