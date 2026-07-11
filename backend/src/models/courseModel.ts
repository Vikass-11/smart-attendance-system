import { db } from '../db/client';
import { courses, courseEnrollments, timetableSlots } from '../db/schema';
import { eq, like, or, and } from 'drizzle-orm';

export interface CreateCourseInput {
  name: string;
  code: string;
  departmentId: number;
  credits?: number;
  facultyId?: number | null;
}

export const createCourse = async (input: CreateCourseInput) => {
  const [result] = await db.insert(courses).values({
    name: input.name,
    code: input.code,
    departmentId: input.departmentId,
    credits: input.credits ?? 3,
    facultyId: input.facultyId ?? null,
  });
  return result.insertId;
};

export const getAllCourses = async () => {
  return db.select().from(courses);
};

export const getCourseById = async (id: number) => {
  const result = await db.select().from(courses).where(eq(courses.id, id));
  return result[0];
};

export const getCoursesByFaculty = async (facultyId: number) => {
  return db.select().from(courses).where(eq(courses.facultyId, facultyId));
};

export const getCoursesByDepartment = async (departmentId: number) => {
  return db.select().from(courses).where(eq(courses.departmentId, departmentId));
};

export const updateCourse = async (id: number, input: Partial<CreateCourseInput>) => {
  await db.update(courses).set(input).where(eq(courses.id, id));
};

export const deleteCourse = async (id: number) => {
  await db.delete(courses).where(eq(courses.id, id));
};

// Enrollments

export const enrollStudent = async (courseId: number, studentId: number) => {
  const [result] = await db.insert(courseEnrollments).values({ courseId, studentId });
  return result.insertId;
};

export const getEnrolledStudents = async (courseId: number) => {
  return db.select().from(courseEnrollments).where(eq(courseEnrollments.courseId, courseId));
};

export const getStudentCourses = async (studentId: number) => {
  return db
    .select({
      courseId: courses.id,
      name: courses.name,
      code: courses.code,
      credits: courses.credits,
    })
    .from(courseEnrollments)
    .innerJoin(courses, eq(courseEnrollments.courseId, courses.id))
    .where(eq(courseEnrollments.studentId, studentId));
};

export const unenrollStudent = async (courseId: number, studentId: number) => {
  await db
    .delete(courseEnrollments)
    .where(and(eq(courseEnrollments.courseId, courseId), eq(courseEnrollments.studentId, studentId)));
};

// Timetable

export interface CreateTimetableSlotInput {
  courseId: number;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
  room?: string;
}

export const createTimetableSlot = async (input: CreateTimetableSlotInput) => {
  const [result] = await db.insert(timetableSlots).values(input);
  return result.insertId;
};

export const getTimetableForCourse = async (courseId: number) => {
  return db.select().from(timetableSlots).where(eq(timetableSlots.courseId, courseId));
};

export const getStudentTimetable = async (studentId: number) => {
  return db
    .select({
      courseId: courses.id,
      courseName: courses.name,
      courseCode: courses.code,
      dayOfWeek: timetableSlots.dayOfWeek,
      startTime: timetableSlots.startTime,
      endTime: timetableSlots.endTime,
      room: timetableSlots.room,
    })
    .from(courseEnrollments)
    .innerJoin(courses, eq(courseEnrollments.courseId, courses.id))
    .innerJoin(timetableSlots, eq(timetableSlots.courseId, courses.id))
    .where(eq(courseEnrollments.studentId, studentId));
};

export const getFacultyTimetable = async (facultyId: number) => {
  return db
    .select({
      courseId: courses.id,
      courseName: courses.name,
      courseCode: courses.code,
      dayOfWeek: timetableSlots.dayOfWeek,
      startTime: timetableSlots.startTime,
      endTime: timetableSlots.endTime,
      room: timetableSlots.room,
    })
    .from(courses)
    .innerJoin(timetableSlots, eq(timetableSlots.courseId, courses.id))
    .where(eq(courses.facultyId, facultyId));
};

export const deleteTimetableSlot = async (id: number) => {
  await db.delete(timetableSlots).where(eq(timetableSlots.id, id));
};