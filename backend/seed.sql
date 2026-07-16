-- Step 1: Temporarily turn off safety checks to allow truncate and override auto_increments safely
SET FOREIGN_KEY_CHECKS = 0;

-- Step 2: Clear existing data to ensure a clean slate
TRUNCATE TABLE `timetable_slots`;
TRUNCATE TABLE `course_enrollments`;
TRUNCATE TABLE `courses`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `departments`;

-- Step 3: Insert Departments
INSERT INTO `departments` (id, name) VALUES
(1, 'Computer Science'),
(2, 'Electrical Engineering');

-- Step 4: Insert Users (Admins, Faculty, and Students)
-- Note: firebase_uid and password_hash are set to NULL by default to let your system handle authentication safely
INSERT INTO `users` (id, name, email, role, department_id, is_system_admin) VALUES
(1, 'Vikas', 'admin@gmail.com', 'admin', NULL, 1),
(2, 'Test Faculty', 'faculty@test.com', 'faculty', 1, 0),
(10, 'Prof. Alan Turing', 'turing@test.com', 'faculty', 1, 0),
(11, 'Prof. Nikola Tesla', 'tesla@test.com', 'faculty', 2, 0),
(3, 'Test Student 3', 'student3@test.com', 'student', 1, 0),
(5, 'Test Student 1', 'student1@test.com', 'student', 1, 0),
(6, 'Test Student 2', 'student2@test.com', 'student', 1, 0),
(7, 'Test Student 4', 'student4@test.com', 'student', 1, 0),
(8, 'Test Student 5', 'student5@test.com', 'student', 1, 0),
(12, 'EE Student 1', 'ee_student1@test.com', 'student', 2, 0),
(13, 'EE Student 2', 'ee_student2@test.com', 'student', 2, 0);

-- Step 5: Insert Courses (And assign faculty members directly via faculty_id!)
INSERT INTO `courses` (id, name, code, department_id, credits, faculty_id) VALUES
(1, 'Data Structures & Algorithms', 'CS201', 1, 4, 2),   -- Taught by Test Faculty (id: 2)
(2, 'Database Management Systems', 'CS202', 1, 4, 10), -- Taught by Prof. Turing (id: 10)
(3, 'Software Engineering', 'CS203', 1, 3, 10),        -- Taught by Prof. Turing (id: 10)
(4, 'Introduction to Circuits', 'EE101', 2, 4, 11),     -- Taught by Prof. Tesla (id: 11)
(5, 'Digital Electronics', 'EE102', 2, 3, 11);         -- Taught by Prof. Tesla (id: 11)

-- Step 6: Enroll Students in Courses
INSERT INTO `course_enrollments` (course_id, student_id) VALUES
(1, 3), -- Student 3 taking CS201
(2, 3), -- Student 3 taking CS202
(1, 5), -- Student 1 taking CS201
(2, 6), -- Student 2 taking CS202
(3, 7), -- Student 4 taking CS203
(3, 8), -- Student 5 taking CS203
(4, 12),-- EE Student 1 taking EE101
(5, 13);-- EE Student 2 taking EE102

-- Step 7: Build the Timetable Slots (Using lowercase days as required by your ENUM)
INSERT INTO `timetable_slots` (id, course_id, day_of_week, start_time, end_time, room) VALUES
(1, 1, 'monday', '09:00:00', '10:30:00', 'Room 301'),
(2, 2, 'tuesday', '11:00:00', '12:30:00', 'Room 302'),
(3, 3, 'wednesday', '09:00:00', '10:30:00', 'Room 204'),
(4, 4, 'thursday', '14:00:00', '15:30:00', 'Room 101'),
(5, 5, 'friday', '11:00:00', '12:30:00', 'Room 102');

-- Step 8: Re-enable safety and foreign key checks
SET FOREIGN_KEY_CHECKS = 1;