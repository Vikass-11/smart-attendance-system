import { Response } from 'express';
import * as courseService from '../services/courseService';
import { AuthenticatedRequest } from '../types';

export const createCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, code, departmentId, credits, facultyId } = req.body;

  if (!name || !code || !departmentId) {
    res.status(400).json({ error: 'name, code, and departmentId are required' });
    return;
  }

  try {
    const id = await courseService.createNewCourse({ name, code, departmentId, credits, facultyId });
    res.status(201).json({ id, name, code, departmentId, credits, facultyId });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Course code already exists' });
      return;
    }
    res.status(500).json({ error: 'Failed to create course', details: err.message });
  }
};

export const listCourses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const courses = await courseService.fetchAllCourses();
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
};

export const getCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const course = await courseService.fetchCourseById(Number(id));
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch course', details: err.message });
  }
};

export const getMyCourses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role === 'faculty') {
      const courses = await courseService.fetchCoursesByFaculty(req.user!.id);
      res.json(courses);
      return;
    }
    if (req.user!.role === 'student') {
      const courses = await courseService.fetchStudentCourses(req.user!.id);
      res.json(courses);
      return;
    }
    res.status(400).json({ error: 'Role not applicable for this endpoint' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch your courses', details: err.message });
  }
};

export const updateCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await courseService.updateExistingCourse(Number(id), req.body);
    res.json({ message: 'Course updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update course', details: err.message });
  }
};

export const deleteCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await courseService.removeCourse(Number(id));
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete course', details: err.message });
  }
};

export const enrollStudent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { studentId } = req.body;

  if (!studentId) {
    res.status(400).json({ error: 'studentId is required' });
    return;
  }

  try {
    await courseService.enrollStudentInCourse(Number(id), studentId);
    res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Student already enrolled in this course' });
      return;
    }
    res.status(500).json({ error: 'Failed to enroll student', details: err.message });
  }
};

export const getEnrolledStudents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const students = await courseService.fetchEnrolledStudents(Number(id));
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch enrolled students', details: err.message });
  }
};

export const unenrollStudent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id, studentId } = req.params;

  try {
    await courseService.unenrollStudentFromCourse(Number(id), Number(studentId));
    res.json({ message: 'Student unenrolled successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to unenroll student', details: err.message });
  }
};