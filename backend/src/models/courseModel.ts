import { db } from '../db/client';
import { courses, courseEnrollments, timetableSlots } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';

export interface CreateCourseInput {
  name: string;
  code: string;
  departmentId: number;
  credits?: number;
  facultyId?: number | null;
  maxStudents?: number | null;
  semesterStart?: string | null;
  semesterEnd?: string | null;
}

export const createCourse = async (input: CreateCourseInput) => {
  const [result] = await db.insert(courses).values([{
    name: input.name,
    code: input.code,
    departmentId: input.departmentId,
    credits: input.credits ?? 3,
    facultyId: input.facultyId ?? null,
    maxStudents: input.maxStudents ?? null,
    semesterStart: input.semesterStart ? new Date(input.semesterStart) : null,
    semesterEnd: input.semesterEnd ? new Date(input.semesterEnd) : null,
  }]);
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
  const updateData: any = { ...input };
  if (input.semesterStart) {
    updateData.semesterStart = new Date(input.semesterStart);
  }
  if (input.semesterEnd) {
    updateData.semesterEnd = new Date(input.semesterEnd);
  }
  await db.update(courses).set(updateData).where(eq(courses.id, id));
};

export const unassignFacultyFromCourse = async (courseId: number) => {
  await db.update(courses).set({ facultyId: null }).where(eq(courses.id, courseId));
};

export const deleteCourse = async (id: number) => {
  await db.delete(courseEnrollments).where(eq(courseEnrollments.courseId, id));
  await db.delete(timetableSlots).where(eq(timetableSlots.courseId, id));
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

export const getStudentDepartment = async (studentId: number): Promise<number | null> => {
  const result: any = await db.execute(sql`SELECT department_id FROM users WHERE id = ${studentId}`);
  const rows = result[0];
  return rows[0]?.department_id ?? null;
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

export const findOverlappingSlots = async (
  facultyId: number | null,
  dayOfWeek: string,
  startTime: string,
  endTime: string,
  excludeSlotId?: number
) => {
  if (!facultyId) return [];

  const facultyCourseRows = await db.select().from(courses).where(eq(courses.facultyId, facultyId));
  const facultyCourseIds = facultyCourseRows.map((c) => c.id);

  if (facultyCourseIds.length === 0) return [];

  const allSlots = await db.select().from(timetableSlots).where(eq(timetableSlots.dayOfWeek, dayOfWeek as any));

  return allSlots.filter((slot) => {
    if (excludeSlotId && slot.id === excludeSlotId) return false;
    if (!facultyCourseIds.includes(slot.courseId)) return false;
    return startTime < slot.endTime && endTime > slot.startTime;
  });
};

export const findRoomConflicts = async (
  room: string | undefined,
  dayOfWeek: string,
  startTime: string,
  endTime: string,
  excludeSlotId?: number
) => {
  if (!room) return [];

  const allSlots = await db.select().from(timetableSlots).where(eq(timetableSlots.dayOfWeek, dayOfWeek as any));

  return allSlots.filter((slot) => {
    if (excludeSlotId && slot.id === excludeSlotId) return false;
    if (slot.room !== room) return false;
    return startTime < slot.endTime && endTime > slot.startTime;
  });
};