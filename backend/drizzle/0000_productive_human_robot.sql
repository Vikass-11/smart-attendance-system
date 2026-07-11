CREATE TABLE `course_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course_id` int NOT NULL,
	`student_id` int NOT NULL,
	`enrolled_at` timestamp DEFAULT (now()),
	CONSTRAINT `course_enrollments_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_enrollments_course_id_student_id_unique` UNIQUE(`course_id`,`student_id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(150) NOT NULL,
	`code` varchar(20) NOT NULL,
	`department_id` int NOT NULL,
	`credits` int DEFAULT 3,
	`faculty_id` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `timetable_slots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course_id` int NOT NULL,
	`day_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`room` varchar(50),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `timetable_slots_id` PRIMARY KEY(`id`)
);
