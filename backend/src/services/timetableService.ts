import * as courseModel from '../models/courseModel';
import type { CreateTimetableSlotInput } from '../models/courseModel';

const isValidTimeRange = (startTime: string, endTime: string): boolean => {
  return startTime < endTime;
};

export const createSlot = async (input: CreateTimetableSlotInput) => {
  if (!isValidTimeRange(input.startTime, input.endTime)) {
    throw new Error('Start time must be before end time');
  }

  const course = await courseModel.getCourseById(input.courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  if (course.facultyId) {
    const overlaps = await courseModel.findOverlappingSlots(
      course.facultyId,
      input.dayOfWeek,
      input.startTime,
      input.endTime
    );
    if (overlaps.length > 0) {
      throw new Error('This faculty member already has a class scheduled at this time');
    }
  }

  return courseModel.createTimetableSlot(input);
};

export const fetchCourseTimetable = async (courseId: number) => {
  return courseModel.getTimetableForCourse(courseId);
};

export const fetchStudentTimetable = async (studentId: number) => {
  return courseModel.getStudentTimetable(studentId);
};

export const fetchFacultyTimetable = async (facultyId: number) => {
  return courseModel.getFacultyTimetable(facultyId);
};

export const removeSlot = async (id: number) => {
  return courseModel.deleteTimetableSlot(id);
};