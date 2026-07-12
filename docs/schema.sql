CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role ENUM('student', 'faculty', 'admin') NOT NULL,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    faculty_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (faculty_id) REFERENCES users(id)
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    marked_by INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('present', 'absent', 'late') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (marked_by) REFERENCES users(id),
    UNIQUE KEY unique_attendance (student_id, date)
);

-- Index recommendations:
-- 1) Index on `attendance.date` to speed up queries that fetch attendance by date (frequent for class view reports):
--    CREATE INDEX idx_attendance_date ON attendance(date);
-- 2) Index on `users.role` to accelerate queries filtering by role (student/faculty/admin):
--    CREATE INDEX idx_users_role ON users(role);
-- 3) Index on `users.department_id` to speed up joins when fetching users by department:
--    CREATE INDEX idx_users_department ON users(department_id);
-- Rationale: These are low-cost secondary indexes that target frequent WHERE clauses and JOIN keys used by reporting and listing endpoints. Add them if profiling indicates benefit on large datasets.

CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    reason TEXT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    reviewed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);
-- Course Management

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    credits INT DEFAULT 3,
    faculty_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (faculty_id) REFERENCES users(id)
);

CREATE TABLE course_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    UNIQUE KEY unique_enrollment (course_id, student_id)
);

CREATE TABLE timetable_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    day_of_week ENUM('monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE INDEX idx_courses_department ON courses(department_id);
CREATE INDEX idx_enrollments_student ON course_enrollments(student_id);
CREATE INDEX idx_timetable_course ON timetable_slots(course_id);

ALTER TABLE courses ADD COLUMN max_students INT DEFAULT NULL;
ALTER TABLE courses ADD COLUMN semester_start DATE DEFAULT NULL;
ALTER TABLE courses ADD COLUMN semester_end DATE DEFAULT NULL;