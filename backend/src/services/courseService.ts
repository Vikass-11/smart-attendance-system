import * as courseModel from '../models/courseModel';

export const createNewCourse = async (data: courseModel.CourseData) => courseModel.createCourse(data);
export const fetchAllCourses = async () => courseModel.getAllCourses();
export const fetchCourseById = async (id: number) => courseModel.getCourseById(id);
export const fetchCoursesByFaculty = async (facultyId: number) => courseModel.getCoursesByFacultyId(facultyId);
export const fetchStudentCourses = async (studentId: number) => courseModel.getCoursesByStudentId(studentId);
export const updateExistingCourse = async (id: number, data: Partial<courseModel.CourseData>) => courseModel.updateCourseDetails(id, data);
export const removeCourse = async (id: number) => courseModel.deleteCourseById(id);
export const enrollStudentInCourse = async (courseId: number, studentId: number) => courseModel.enrollStudent(courseId, studentId);
export const fetchEnrolledStudents = async (courseId: number) => courseModel.getEnrolledStudentsByCourseId(courseId);
export const unenrollStudentFromCourse = async (courseId: number, studentId: number) => courseModel.unenrollStudentFromCourseId(courseId, studentId);