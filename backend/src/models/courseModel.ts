import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export interface CourseData {
  name: string;
  code: string;
  departmentId: number;
  credits?: number;
  facultyId?: number | null;
}

export const createCourse = async (data: CourseData): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO courses (name, code, department_id, credits, faculty_id) VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.code, data.departmentId, data.credits ?? 3, data.facultyId ?? null]
  );
  return result.insertId;
};

export const getAllCourses = async (): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT c.id, c.name, c.code, c.credits, d.name as department, u.name as facultyName, c.department_id as departmentId, c.faculty_id as facultyId
     FROM courses c
     LEFT JOIN departments d ON c.department_id = d.id
     LEFT JOIN users u ON c.faculty_id = u.id`
  );
  return rows;
};

export const getCourseById = async (id: number): Promise<any> => {
  const [rows]: any = await db.query(
    `SELECT c.id, c.name, c.code, c.credits, d.name as department, u.name as facultyName, c.department_id as departmentId, c.faculty_id as facultyId
     FROM courses c
     LEFT JOIN departments d ON c.department_id = d.id
     LEFT JOIN users u ON c.faculty_id = u.id
     WHERE c.id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const getCoursesByFacultyId = async (facultyId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT c.id, c.name, c.code, c.credits, d.name as department 
     FROM courses c
     LEFT JOIN departments d ON c.department_id = d.id
     WHERE c.faculty_id = ?`,
    [facultyId]
  );
  return rows;
};

export const getCoursesByStudentId = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT c.id, c.name, c.code, c.credits, d.name as department, u.name as facultyName
     FROM course_enrollments ce
     JOIN courses c ON ce.course_id = c.id
     LEFT JOIN departments d ON c.department_id = d.id
     LEFT JOIN users u ON c.faculty_id = u.id
     WHERE ce.student_id = ?`,
    [studentId]
  );
  return rows;
};

export const updateCourseDetails = async (id: number, data: Partial<CourseData>): Promise<void> => {
  const updates: string[] = [];
  const params: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    const columnMap: Record<string, string> = {
      name: 'name',
      code: 'code',
      departmentId: 'department_id',
      credits: 'credits',
      facultyId: 'faculty_id',
    };
    const colName = columnMap[key];
    if (colName) {
      updates.push(`${colName} = ?`);
      params.push(value);
    }
  });

  if (updates.length === 0) return;

  params.push(id);
  await db.query(`UPDATE courses SET ${updates.join(', ')} WHERE id = ?`, params);
};

export const deleteCourseById = async (id: number): Promise<void> => {
  await db.query('DELETE FROM timetable_slots WHERE course_id = ?', [id]);
  await db.query('DELETE FROM course_enrollments WHERE course_id = ?', [id]);
  await db.query('DELETE FROM courses WHERE id = ?', [id]);
};

export const enrollStudent = async (courseId: number, studentId: number): Promise<void> => {
  await db.query(`INSERT INTO course_enrollments (course_id, student_id) VALUES (?, ?)`, [courseId, studentId]);
};

export const getEnrolledStudentsByCourseId = async (courseId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email, d.name as department
     FROM course_enrollments ce
     JOIN users u ON ce.student_id = u.id
     LEFT JOIN departments d ON u.department_id = d.id
     WHERE ce.course_id = ?`,
    [courseId]
  );
  return rows;
};

export const unenrollStudentFromCourseId = async (courseId: number, studentId: number): Promise<void> => {
  await db.query(`DELETE FROM course_enrollments WHERE course_id = ? AND student_id = ?`, [courseId, studentId]);
};