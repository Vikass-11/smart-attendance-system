import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export interface TimetableSlotData {
  courseId: number;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
  room?: string;
}

export const createSlot = async (data: TimetableSlotData): Promise<number> => {
  const [conflicts]: any = await db.query(
    `SELECT id FROM timetable_slots 
     WHERE room = ? AND day_of_week = ? 
     AND (
       (start_time <= ? AND end_time > ?) OR
       (start_time < ? AND end_time >= ?) OR
       (? <= start_time AND ? > start_time)
     )`,
    [data.room, data.dayOfWeek, data.startTime, data.startTime, data.endTime, data.endTime, data.startTime, data.endTime]
  );

  if (conflicts.length > 0) throw new Error('Conflict detected: Room is already booked during this time');

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room) VALUES (?, ?, ?, ?, ?)`,
    [data.courseId, data.dayOfWeek, data.startTime, data.endTime, data.room ?? null]
  );
  return result.insertId;
};

export const fetchCourseTimetable = async (courseId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT ts.id, ts.day_of_week as dayOfWeek, ts.start_time as startTime, ts.end_time as endTime, ts.room, c.name as courseName, c.code as courseCode
     FROM timetable_slots ts
     JOIN courses c ON ts.course_id = c.id
     WHERE ts.course_id = ?
     ORDER BY FIELD(ts.day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'), ts.start_time`,
    [courseId]
  );
  return rows;
};

export const fetchStudentTimetable = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT ts.id, ts.day_of_week as dayOfWeek, ts.start_time as startTime, ts.end_time as endTime, ts.room, c.name as courseName, c.code as courseCode, u.name as facultyName
     FROM course_enrollments ce
     JOIN courses c ON ce.course_id = c.id
     JOIN timetable_slots ts ON c.id = ts.course_id
     LEFT JOIN users u ON c.faculty_id = u.id
     WHERE ce.student_id = ?
     ORDER BY FIELD(ts.day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'), ts.start_time`,
    [studentId]
  );
  return rows;
};

export const fetchFacultyTimetable = async (facultyId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT ts.id, ts.day_of_week as dayOfWeek, ts.start_time as startTime, ts.end_time as endTime, ts.room, c.name as courseName, c.code as courseCode
     FROM courses c
     JOIN timetable_slots ts ON c.id = ts.course_id
     WHERE c.faculty_id = ?
     ORDER BY FIELD(ts.day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'), ts.start_time`,
    [facultyId]
  );
  return rows;
};

export const removeSlot = async (id: number): Promise<void> => {
  await db.query('DELETE FROM timetable_slots WHERE id = ?', [id]);
};