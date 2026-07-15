import * as adminModel from '../models/adminModel';
import * as courseModel from '../models/courseModel';
import type { DepartmentFilters, UserFilters } from '../models/adminModel';

export const isValidRole = (role: string): boolean => ['student', 'faculty', 'admin'].includes(role);

export const createNewDepartment = async (name: string) => {
  return adminModel.createDepartment(name);
};

export const fetchDepartments = async (filters: DepartmentFilters) => {
  return adminModel.getAllDepartments(filters);
};

export const fetchUsers = async (filters: UserFilters) => {
  return adminModel.getAllUsers(filters);
};

export const changeUserRole = async (userId: number, role: string, departmentId: number | null) => {
  return adminModel.updateUserRole(userId, role, departmentId);
};

export const deactivateUser = async (userId: number) => {
  const facultyCourses = await courseModel.getCoursesByFaculty(userId);
  for (const course of facultyCourses) {
    await courseModel.unassignFacultyFromCourse(course.id);
  }
  return adminModel.deleteUser(userId);
};