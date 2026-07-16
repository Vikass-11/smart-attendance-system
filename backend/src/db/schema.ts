import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  mysqlEnum,
  time,
  unique,
  date,
  boolean,
  text,
} from 'drizzle-orm/mysql-core';

// ─── Departments ─────────────────────────────────────────────────────────────
export const departments = mysqlTable('departments', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  firebaseUid: varchar('firebase_uid', { length: 128 }).unique(), // nullable — only for Firebase auth
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }), // nullable — only for local auth
  isActive: boolean('is_active').default(true),
  role: mysqlEnum('role', ['student', 'faculty', 'admin']).notNull(),
  isSystemAdmin: boolean('is_system_admin').default(false), // true only for the first-ever registered admin — cannot be demoted
  departmentId: int('department_id').references(() => departments.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── Subjects ────────────────────────────────────────────────────────────────
export const subjects = mysqlTable('subjects', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  departmentId: int('department_id').notNull().references(() => departments.id),
  facultyId: int('faculty_id').references(() => users.id),
});

// ─── Attendance ───────────────────────────────────────────────────────────────
export const attendance = mysqlTable('attendance', {
  id: int('id').autoincrement().primaryKey(),
  studentId: int('student_id').notNull().references(() => users.id),
  markedBy: int('marked_by').notNull().references(() => users.id),
  date: date('date').notNull(),
  status: mysqlEnum('status', ['present', 'absent', 'late']).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  uniqueAttendance: unique('unique_attendance').on(table.studentId, table.date),
}));

// ─── Leave Requests ───────────────────────────────────────────────────────────
export const leaveRequests = mysqlTable('leave_requests', {
  id: int('id').autoincrement().primaryKey(),
  studentId: int('student_id').notNull().references(() => users.id),
  reason: text('reason').notNull(),
  fromDate: date('from_date').notNull(),
  toDate: date('to_date').notNull(),
  status: mysqlEnum('status', ['pending', 'approved', 'rejected']).default('pending'),
  reviewedBy: int('reviewed_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Courses ──────────────────────────────────────────────────────────────────
export const courses = mysqlTable('courses', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  departmentId: int('department_id').notNull().references(() => departments.id),
  credits: int('credits').default(3),
  facultyId: int('faculty_id').references(() => users.id),
  maxStudents: int('max_students'),
  semesterStart: date('semester_start'),
  semesterEnd: date('semester_end'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ─── Course Enrollments ───────────────────────────────────────────────────────
export const courseEnrollments = mysqlTable('course_enrollments', {
  id: int('id').autoincrement().primaryKey(),
  courseId: int('course_id').notNull().references(() => courses.id),
  studentId: int('student_id').notNull().references(() => users.id),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
}, (table) => ({
  uniqueEnrollment: unique().on(table.courseId, table.studentId),
}));

// ─── Timetable Slots ──────────────────────────────────────────────────────────
export const timetableSlots = mysqlTable('timetable_slots', {
  id: int('id').autoincrement().primaryKey(),
  courseId: int('course_id').notNull().references(() => courses.id),
  dayOfWeek: mysqlEnum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  room: varchar('room', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});