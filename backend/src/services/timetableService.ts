import * as courseModel from '../models/courseModel';
import type { CreateTimetableSlotInput } from '../models/courseModel';

const isValidTimeRange = (startTime: string, endTime: string): boolean => {
  return startTime < endTime;
};

export const createSlot = async (input: CreateTimetableSlotInput) => {
  if (!isValidTimeRange(input.startTime, input.endTime)) {
    throw new Error('Start time must be before end time');
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