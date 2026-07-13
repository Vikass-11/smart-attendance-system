import db from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

interface SeedCourse {
  name: string;
  code: string;
  departmentId: number;
  credits: number;
  facultyEmail: string;
}

const courses: SeedCourse[] = [
  { name: 'Software Engineering', code: 'CS301', departmentId: 1, credits: 4, facultyEmail: 'meera.pillai@test.com' },
  { name: 'Computer Networks', code: 'CS302', departmentId: 1, credits: 3, facultyEmail: 'meera.pillai@test.com' },
  { name: 'Cloud Computing', code: 'IT301', departmentId: 2, credits: 3, facultyEmail: 'suresh.kumar@test.com' },
  { name: 'Cyber Security', code: 'IT302', departmentId: 2, credits: 4, facultyEmail: 'suresh.kumar@test.com' },
];

const timetableSlotsData = [
  { code: 'CS301', dayOfWeek: 'monday', startTime: '10:00:00', endTime: '11:00:00', room: 'LH-201' },
  { code: 'CS302', dayOfWeek: 'wednesday', startTime: '09:00:00', endTime: '10:00:00', room: 'LH-202' },
  { code: 'IT301', dayOfWeek: 'tuesday', startTime: '11:00:00', endTime: '12:00:00', room: 'Lab-1' },
  { code: 'IT302', dayOfWeek: 'thursday', startTime: '14:00:00', endTime: '15:00:00', room: 'Lab-2' },
];

const seed = async () => {
  for (const course of courses) {
    try {
      const [facultyRows]: any = await db.query(`SELECT id FROM users WHERE email = ?`, [course.facultyEmail]);
      const facultyId = facultyRows[0]?.id ?? null;

      await db.query(
        `INSERT INTO courses (name, code, department_id, credits, faculty_id) VALUES (?, ?, ?, ?, ?)`,
        [course.name, course.code, course.departmentId, course.credits, facultyId]
      );
      console.log(`✅ Created course: ${course.code} - ${course.name}`);
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(`⏭️  Skipped (already exists): ${course.code}`);
      } else {
        console.error(`❌ Failed: ${course.code}`, err.message);
      }
    }
  }

  for (const slot of timetableSlotsData) {
    try {
      const [courseRows]: any = await db.query(`SELECT id FROM courses WHERE code = ?`, [slot.code]);
      const courseId = courseRows[0]?.id;
      if (!courseId) continue;

      await db.query(
        `INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room) VALUES (?, ?, ?, ?, ?)`,
        [courseId, slot.dayOfWeek, slot.startTime, slot.endTime, slot.room]
      );
      console.log(`✅ Added timetable slot for ${slot.code}: ${slot.dayOfWeek} ${slot.startTime}`);
    } catch (err: any) {
      console.error(`❌ Failed slot for ${slot.code}`, err.message);
    }
  }

  // Enroll all students (from earlier seed) into all new courses
  const [studentRows]: any = await db.query(`SELECT id FROM users WHERE role = 'student' AND is_active = TRUE`);
  const [courseIdRows]: any = await db.query(
    `SELECT id FROM courses WHERE code IN ('CS301','CS302','IT301','IT302')`
  );

  for (const student of studentRows) {
    for (const course of courseIdRows) {
      try {
        await db.query(
          `INSERT INTO course_enrollments (course_id, student_id) VALUES (?, ?)`,
          [course.id, student.id]
        );
      } catch (err: any) {
        // ignore duplicates
      }
    }
  }
  console.log(`\n✅ Enrolled ${studentRows.length} students into ${courseIdRows.length} courses.`);

  console.log('\nDone.');
  process.exit(0);
};

seed();