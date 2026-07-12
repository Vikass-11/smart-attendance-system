USE attendance_system;

INSERT IGNORE INTO departments (id, name) VALUES
  (1, 'Computer Science'),
  (2, 'Information Technology');

INSERT INTO courses (name, code, department_id, credits, faculty_id) VALUES
  ('Data Structures', 'CS201', 1, 4, 5),
  ('Database Management Systems', 'CS204', 1, 4, 5),
  ('Web Technologies', 'IT205', 2, 3, 5);

INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room)
SELECT id, 'monday', '09:00:00', '10:00:00', 'LH-101' FROM courses WHERE code = 'CS201';

INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room)
SELECT id, 'wednesday', '11:00:00', '12:00:00', 'LH-102' FROM courses WHERE code = 'CS204';

INSERT INTO timetable_slots (course_id, day_of_week, start_time, end_time, room)
SELECT id, 'friday', '14:00:00', '15:00:00', 'Lab-3' FROM courses WHERE code = 'IT205';

INSERT IGNORE INTO course_enrollments (course_id, student_id)
SELECT c.id, u.id FROM courses c, users u
WHERE c.code = 'CS201' AND u.role = 'student';

INSERT IGNORE INTO course_enrollments (course_id, student_id)
SELECT c.id, u.id FROM courses c, users u
WHERE c.code = 'CS204' AND u.role = 'student';

INSERT IGNORE INTO attendance (student_id, marked_by, date, status)
SELECT u.id, f.id, CURDATE() - INTERVAL 1 DAY, 'present'
FROM users u, users f WHERE u.role = 'student' AND f.role = 'faculty' LIMIT 1;

INSERT IGNORE INTO attendance (student_id, marked_by, date, status)
SELECT u.id, f.id, CURDATE() - INTERVAL 2 DAY, 'absent'
FROM users u, users f WHERE u.role = 'student' AND f.role = 'faculty' LIMIT 1;

INSERT IGNORE INTO attendance (student_id, marked_by, date, status)
SELECT u.id, f.id, CURDATE() - INTERVAL 3 DAY, 'present'
FROM users u, users f WHERE u.role = 'student' AND f.role = 'faculty' LIMIT 1;

INSERT IGNORE INTO leave_requests (student_id, reason, from_date, to_date, status)
SELECT u.id, 'Family function', CURDATE() + INTERVAL 5 DAY, CURDATE() + INTERVAL 6 DAY, 'pending'
FROM users u WHERE u.role = 'student' LIMIT 1;