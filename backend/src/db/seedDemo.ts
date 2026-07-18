import bcrypt from 'bcryptjs';
import db from '../config/db';

const seedDemo = async () => {
  try {
    console.log('Seeding Demo Data started...');
    
    const insertDept = async (name: string) => {
      await db.query('INSERT IGNORE INTO departments (name) VALUES (?)', [name]);
      const [rows]: any = await db.query('SELECT id FROM departments WHERE name = ?', [name]);
      return rows[0].id;
    };

    const depts = {
      CSE: await insertDept('Computer Science & Engineering (CSE)'),
      EEE: await insertDept('Electrical & Electronics Engineering (EEE)'),
      ME: await insertDept('Mechanical Engineering (ME)'),
      CE: await insertDept('Civil Engineering (CE)'),
      BT: await insertDept('Biotechnology (BT)'),
      AE: await insertDept('Aerospace Engineering (AE)'),
      IT: await insertDept('Information Technology (IT)'),
    };

    const passwordHash = await bcrypt.hash('password123', 10);

    const insertUser = async (name: string, email: string, role: string, deptId: number) => {
      await db.query(
        'INSERT IGNORE INTO users (name, email, password_hash, role, department_id, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, passwordHash, role, deptId, true]
      );
      const [rows]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      return rows[0].id;
    };

    const faculty = {
      CSE: await insertUser('Alan Turing', 'alan@test.com', 'faculty', depts.CSE),
      EEE: await insertUser('Nikola Tesla', 'nikola@test.com', 'faculty', depts.EEE),
      ME: await insertUser('Henry Ford', 'henry@test.com', 'faculty', depts.ME),
      CE: await insertUser('John Smeaton', 'john@test.com', 'faculty', depts.CE),
      BT: await insertUser('Rosalind Franklin', 'rosalind@test.com', 'faculty', depts.BT),
      AE: await insertUser('Kalpana Chawla', 'kalpana@test.com', 'faculty', depts.AE),
      IT: await insertUser('Tim Berners-Lee', 'tim@test.com', 'faculty', depts.IT),
    };

    const insertCourse = async (name: string, code: string, credits: number, deptId: number, facultyId: number) => {
      await db.query(
        'INSERT IGNORE INTO courses (name, code, credits, department_id, faculty_id) VALUES (?, ?, ?, ?, ?)',
        [name, code, credits, deptId, facultyId]
      );
      const [rows]: any = await db.query('SELECT id FROM courses WHERE code = ?', [code]);
      return rows[0].id;
    };

    const cseCourses = [
      await insertCourse('Introduction to Programming', 'CS101', 3, depts.CSE, faculty.CSE),
      await insertCourse('Data Structures & Algorithms', 'CS201', 4, depts.CSE, faculty.CSE),
      await insertCourse('Database Management Systems', 'CS301', 4, depts.CSE, faculty.CSE),
      await insertCourse('Artificial Intelligence', 'CS401', 3, depts.CSE, faculty.CSE),
      await insertCourse('Operating Systems', 'CS402', 3, depts.CSE, faculty.CSE),
    ];

    const eeeCourses = [
      await insertCourse('Basic Electrical Engineering', 'EE101', 3, depts.EEE, faculty.EEE),
      await insertCourse('Analog Circuits', 'EE201', 4, depts.EEE, faculty.EEE),
      await insertCourse('Power Systems', 'EE301', 4, depts.EEE, faculty.EEE),
      await insertCourse('Control Systems', 'EE401', 3, depts.EEE, faculty.EEE),
      await insertCourse('Renewable Energy', 'EE402', 3, depts.EEE, faculty.EEE),
    ];

    const itCourses = [
      await insertCourse('Web Technologies', 'IT101', 3, depts.IT, faculty.IT),
      await insertCourse('Computer Networks', 'IT201', 4, depts.IT, faculty.IT),
      await insertCourse('Cloud Computing', 'IT301', 4, depts.IT, faculty.IT),
      await insertCourse('Cybersecurity', 'IT401', 3, depts.IT, faculty.IT),
      await insertCourse('Software Engineering', 'IT402', 3, depts.IT, faculty.IT),
    ];

    const aeCourses = [
      await insertCourse('Intro to Aerospace', 'AE101', 3, depts.AE, faculty.AE),
      await insertCourse('Aerodynamics', 'AE201', 4, depts.AE, faculty.AE),
      await insertCourse('Flight Mechanics', 'AE301', 4, depts.AE, faculty.AE),
    ];
    
    const btCourses = [
      await insertCourse('Intro to Biotech', 'BT101', 3, depts.BT, faculty.BT),
      await insertCourse('Microbiology', 'BT201', 4, depts.BT, faculty.BT),
    ];
    
    const getCourseId = async (code: string) => {
       const [rows]: any = await db.query('SELECT id FROM courses WHERE code = ?', [code]);
       return rows.length ? rows[0].id : null;
    };

    const slots = [
      // Monday
      { code: 'CS101', day: 'monday', start: '09:00:00', end: '10:30:00', room: 'Room 301' },
      { code: 'CS201', day: 'monday', start: '10:45:00', end: '12:15:00', room: 'Room 301' },
      { code: 'IT101', day: 'monday', start: '13:00:00', end: '14:30:00', room: 'Lab 1' },
      { code: 'AE101', day: 'monday', start: '14:45:00', end: '16:15:00', room: 'Room 205' },

      // Tuesday
      { code: 'CS301', day: 'tuesday', start: '09:00:00', end: '10:30:00', room: 'Room 302' },
      { code: 'CS401', day: 'tuesday', start: '10:45:00', end: '12:15:00', room: 'Room 302' },
      { code: 'IT201', day: 'tuesday', start: '13:00:00', end: '14:30:00', room: 'Lab 2' },
      { code: 'EE101', day: 'tuesday', start: '14:45:00', end: '16:15:00', room: 'Room 101' },

      // Wednesday
      { code: 'CS201', day: 'wednesday', start: '09:00:00', end: '10:30:00', room: 'Room 301' },
      { code: 'CS402', day: 'wednesday', start: '10:45:00', end: '12:15:00', room: 'Room 303' },
      { code: 'IT301', day: 'wednesday', start: '13:00:00', end: '14:30:00', room: 'Lab 1' },
      { code: 'AE201', day: 'wednesday', start: '14:45:00', end: '16:15:00', room: 'Room 205' },

      // Thursday
      { code: 'CS301', day: 'thursday', start: '09:00:00', end: '10:30:00', room: 'Room 302' },
      { code: 'BT101', day: 'thursday', start: '10:45:00', end: '12:15:00', room: 'Room 401' },
      { code: 'IT401', day: 'thursday', start: '13:00:00', end: '14:30:00', room: 'Lab 3' },
      { code: 'EE201', day: 'thursday', start: '14:45:00', end: '16:15:00', room: 'Room 102' },

      // Friday
      { code: 'CS101', day: 'friday', start: '09:00:00', end: '10:30:00', room: 'Room 301' },
      { code: 'CS401', day: 'friday', start: '10:45:00', end: '12:15:00', room: 'Room 302' },
      { code: 'IT101', day: 'friday', start: '13:00:00', end: '14:30:00', room: 'Lab 1' },
      { code: 'BT201', day: 'friday', start: '14:45:00', end: '16:15:00', room: 'Room 205' },
    ];

    for (const slot of slots) {
      const cId = await getCourseId(slot.code);
      if (cId) {
        const [existing]: any = await db.query(
           'SELECT id FROM timetable_slots WHERE course_id = ? AND day_of_week = ? AND start_time = ?',
           [cId, slot.day, slot.start]
        );
        if (existing.length === 0) {
           await db.query(
             'INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room) VALUES (?, ?, ?, ?, ?)',
             [cId, slot.day, slot.start, slot.end, slot.room]
           );
        }
      }
    }

    const studentIds = [];
    for (let i = 1; i <= 10; i++) {
       const sid = await insertUser(`Demo Student ${i}`, `demo_student${i}@test.com`, 'student', i <= 5 ? depts.CSE : depts.IT);
       studentIds.push(sid);
    }

    for (const sid of studentIds.slice(0, 4)) {
       for (const cId of [...cseCourses, ...itCourses]) {
          await db.query('INSERT IGNORE INTO course_enrollments (course_id, student_id) VALUES (?, ?)', [cId, sid]);
       }
    }

    for (let i = 0; i < 5; i++) {
       const date = new Date();
       date.setDate(date.getDate() - i);
       const dStr = date.toISOString().split('T')[0];
       
       for (const sid of studentIds.slice(0, 4)) {
          let status = 'present';
          if (sid === studentIds[0] && i < 4) status = 'absent';
          if (sid === studentIds[1] && i < 3) status = 'absent';
          
          await db.query(
            'INSERT IGNORE INTO attendance (student_id, marked_by, date, status) VALUES (?, ?, ?, ?)',
            [sid, faculty.CSE, dStr, status]
          );
       }
    }

    console.log('Demo Data Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Demo Seeding failed:', err);
    process.exit(1);
  }
};

seedDemo();
