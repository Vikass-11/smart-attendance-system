import { mysqlTable, int, varchar, timestamp, mysqlEnum, time, unique, date } from 'drizzle-orm/mysql-core';

export const courses = mysqlTable('courses', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  departmentId: int('department_id').notNull(),
  credits: int('credits').default(3),
  facultyId: int('faculty_id'),
  maxStudents: int('max_students'),
  semesterStart: date('semester_start'),
  semesterEnd: date('semester_end'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const courseEnrollments = mysqlTable('course_enrollments', {
  id: int('id').autoincrement().primaryKey(),
  courseId: int('course_id').notNull(),
  studentId: int('student_id').notNull(),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
}, (table) => ({
  uniqueEnrollment: unique().on(table.courseId, table.studentId),
}));

export const timetableSlots = mysqlTable('timetable_slots', {
  id: int('id').autoincrement().primaryKey(),
  courseId: int('course_id').notNull(),
  dayOfWeek: mysqlEnum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  room: varchar('room', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});