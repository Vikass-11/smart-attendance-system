import * as courseModel from '../models/courseModel';
import type { CreateCourseInput } from '../models/courseModel';

export const createNewCourse = async (input: CreateCourseInput) => {
  return courseModel.createCourse(input);
};

export const fetchAllCourses = async () => {
  return courseModel.getAllCourses();
};

export const fetchCourseById = async (id: number) => {
  return courseModel.getCourseById(id);
};

export const fetchCoursesByFaculty = async (facultyId: number) => {
  return courseModel.getCoursesByFaculty(facultyId);
};

export const fetchCoursesByDepartment = async (departmentId: number) => {
  return courseModel.getCoursesByDepartment(departmentId);
};

export const updateExistingCourse = async (id: number, input: Partial<CreateCourseInput>) => {
  return courseModel.updateCourse(id, input);
};

export const removeCourse = async (id: number) => {
  return courseModel.deleteCourse(id);
};

export const enrollStudentInCourse = async (courseId: number, studentId: number) => {
  return courseModel.enrollStudent(courseId, studentId);
};

export const fetchEnrolledStudents = async (courseId: number) => {
  return courseModel.getEnrolledStudents(courseId);
};

export const fetchStudentCourses = async (studentId: number) => {
  return courseModel.getStudentCourses(studentId);
};

export const unenrollStudentFromCourse = async (courseId: number, studentId: number) => {
  return courseModel.unenrollStudent(courseId, studentId);
};