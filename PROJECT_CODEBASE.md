# EduFlow - Complete Codebase

Generated on: 2026-07-19 05:30:24

## Folder Structure

```
smart-attendance-system/
├── .github
│   └── workflows
│       └── ci.yml
├── backend
│   ├── drizzle
│   │   ├── meta
│   │   │   ├── _journal.json
│   │   │   ├── 0000_snapshot.json
│   │   │   ├── 0001_snapshot.json
│   │   │   └── 0002_snapshot.json
│   │   ├── 0000_productive_human_robot.sql
│   │   ├── 0001_steep_maggott.sql
│   │   └── 0002_open_shiva.sql
│   ├── src
│   │   ├── __tests__
│   │   │   └── health.test.ts
│   │   ├── config
│   │   │   └── db.ts
│   │   ├── controllers
│   │   │   ├── adminController.ts
│   │   │   ├── agentController.ts
│   │   │   ├── attendanceController.ts
│   │   │   ├── authController.ts
│   │   │   ├── courseController.ts
│   │   │   ├── leaveController.ts
│   │   │   ├── reportController.ts
│   │   │   └── timetableController.ts
│   │   ├── db
│   │   │   ├── client.ts
│   │   │   ├── schema.ts
│   │   │   ├── seed.ts
│   │   │   └── seedDemo.ts
│   │   ├── middleware
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── requestLogger.ts
│   │   ├── models
│   │   │   ├── adminModel.ts
│   │   │   ├── attendanceModel.ts
│   │   │   ├── courseModel.ts
│   │   │   ├── leaveModel.ts
│   │   │   └── reportModel.ts
│   │   ├── routes
│   │   │   ├── adminRoutes.ts
│   │   │   ├── agentRoutes.ts
│   │   │   ├── attendanceRoutes.ts
│   │   │   ├── authRoutes.ts
│   │   │   ├── courseRoutes.ts
│   │   │   ├── leaveRoutes.ts
│   │   │   ├── reportRoutes.ts
│   │   │   └── timetableRoutes.ts
│   │   ├── scripts
│   │   │   ├── seedCourses.ts
│   │   │   └── seedUsers.ts
│   │   ├── services
│   │   │   ├── adminService.ts
│   │   │   ├── agentService.ts
│   │   │   ├── agentTools.ts
│   │   │   ├── attendanceService.ts
│   │   │   ├── authService.ts
│   │   │   ├── courseService.ts
│   │   │   ├── leaveService.ts
│   │   │   ├── reportService.ts
│   │   │   ├── timetableService.ts
│   │   │   └── tokenService.ts
│   │   ├── types
│   │   │   ├── custom.d.ts
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── apiResponse.ts
│   │   │   ├── dateHelpers.ts
│   │   │   ├── logger.ts
│   │   │   └── pagination.ts
│   │   ├── app.ts
│   │   └── swagger.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── drizzle.config.ts
│   ├── jest.config.cjs
│   ├── package.json
│   ├── seed.sql
│   ├── server.ts
│   └── tsconfig.json
├── docs
│   ├── schema.sql
│   └── seed.sql
├── frontend
│   ├── public
│   │   └── icons.svg
│   ├── src
│   │   ├── __tests__
│   │   │   └── sanity.test.ts
│   │   ├── api
│   │   │   └── axiosClient.ts
│   │   ├── assets
│   │   ├── components
│   │   │   ├── AgentChat.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── context
│   │   │   ├── auth-context.ts
│   │   │   └── AuthContext.tsx
│   │   ├── hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useTheme.ts
│   │   ├── lib
│   │   │   └── theme.ts
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminOverview.tsx
│   │   │   │   ├── CourseManagement.tsx
│   │   │   │   ├── Departments.tsx
│   │   │   │   ├── Reports.tsx
│   │   │   │   ├── TimetableManagement.tsx
│   │   │   │   └── UserManagement.tsx
│   │   │   ├── faculty
│   │   │   │   ├── FacultyDashboard.tsx
│   │   │   │   ├── FacultyOverview.tsx
│   │   │   │   ├── LeaveRequests.tsx
│   │   │   │   └── MarkAttendance.tsx
│   │   │   ├── student
│   │   │   │   ├── ApplyLeave.tsx
│   │   │   │   ├── StudentOverview.tsx
│   │   │   │   └── ViewAttendance.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MyTimetable.tsx
│   │   │   └── Register.tsx
│   │   ├── schemas
│   │   │   ├── authSchemas.ts
│   │   │   ├── courseSchema.ts
│   │   │   └── leaveSchema.ts
│   │   ├── store
│   │   │   ├── authStore.ts
│   │   │   └── dashboardStore.ts
│   │   ├── types
│   │   │   └── course.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── setupTests.ts
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── scripts
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
└── README.md
```

## Code Files

---

### `.eslintignore`

```text
node_modules/
frontend/node_modules/
backend/node_modules/
dist/
build/
.vite/
```

---

### `.eslintrc.cjs`

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {},
};
```

---

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    name: Lint (frontend)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Use Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install frontend deps
        working-directory: frontend
        run: npm ci

      - name: Run frontend lint
        working-directory: frontend
        run: npm run lint

  backend-build:
    name: Backend Build & Typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Use Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install backend deps
        working-directory: backend
        run: npm ci

      - name: Build backend
        working-directory: backend
        run: npm run build

  frontend-build:
    name: Frontend Build
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v6

      - name: Use Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install frontend deps
        working-directory: frontend
        run: npm ci

      - name: Force Native Linux Bindings
        working-directory: frontend
        run: npm install @rolldown/binding-linux-x64-gnu lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu --no-save

      - name: Build frontend
        working-directory: frontend
        run: npm run build

  docker-build-and-push:
    name: Build & Push Docker images
    runs-on: ubuntu-latest
    needs: [backend-build, frontend-build]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v6

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push backend image
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          file: ./backend/Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/smart-attendance-backend:latest,${{ secrets.DOCKERHUB_USERNAME }}/smart-attendance-backend:${{ github.sha }}

      - name: Build and push frontend image
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          file: ./frontend/Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/smart-attendance-frontend:latest,${{ secrets.DOCKERHUB_USERNAME }}/smart-attendance-frontend:${{ github.sha }}
```

---

### `.gitignore`

```text
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
firebase-service-account.json
logs/
*.csv
*.pdf
```

---

### `.prettierrc`

```text
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

### `README.md`

```md
# EduFlow

A modern, full-stack web application designed to streamline attendance tracking and management for educational institutions and organizations. The system features a robust backend API, a responsive frontend dashboard, and an integrated AI-powered attendance assistant.

## ✨ Features

- **Role-Based Access Control**: Distinct portals and permissions for Students, Faculty, and Administrators.
- **Department & User Management**: Admins can seamlessly manage institutional departments and user accounts.
- **AI Attendance Assistant**: Integrated conversational agent (powered by OpenAI) to help users quickly check attendance stats or perform updates.
- **Interactive Dashboards**: Data visualization and easy-to-use interfaces for tracking attendance metrics.
- **Secure Authentication**: JWT-based authentication and encrypted passwords.
- **Comprehensive API Documentation**: Built-in Swagger UI for exploring backend endpoints.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand & React Query
- **Routing**: React Router v7
- **Forms & Validation**: React Hook Form with Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL 
- **ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **AI Integration**: OpenAI API
- **Documentation**: Swagger UI & swagger-jsdoc

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server

### 1. Clone the repository
```bash
git clone https://github.com/Vikass-11/smart-attendance-system.git
cd smart-attendance-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory with the required environment variables (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `OPENAI_API_KEY`).
- Run database migrations:
  ```bash
  npm run db:push
  ```
- Start the backend development server:
  ```bash
  npm run dev
  ```
The API will run on `http://localhost:3000` (or your configured port). Swagger docs are available at `/api-docs`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
- Start the frontend development server:
  ```bash
  npm run dev
  ```
The application will run on `http://localhost:5173`.

## 🧪 Testing

Both frontend and backend include testing setups.
- **Frontend**: `npm test` (Vitest & React Testing Library)
- **Backend**: `npm test` (Jest & Supertest)

## 📄 License

This project is licensed under the ISC License.
```

---

### `backend/.env.example`

```example
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=attendance_system
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
```

---

### `backend/Dockerfile`

```text
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY server.ts ./
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

### `backend/drizzle.config.ts`

```typescript
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  },
} satisfies Config;
```

---

### `backend/drizzle/0000_productive_human_robot.sql`

```sql
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
```

---

### `backend/drizzle/0001_steep_maggott.sql`

```sql
ALTER TABLE `courses` ADD `max_students` int;--> statement-breakpoint
ALTER TABLE `courses` ADD `semester_start` date;--> statement-breakpoint
ALTER TABLE `courses` ADD `semester_end` date;
```

---

### `backend/drizzle/0002_open_shiva.sql`

```sql
CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`marked_by` int NOT NULL,
	`date` date NOT NULL,
	`status` enum('present','absent','late') NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`),
	CONSTRAINT `unique_attendance` UNIQUE(`student_id`,`date`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `departments_id` PRIMARY KEY(`id`),
	CONSTRAINT `departments_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `leave_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`reason` text NOT NULL,
	`from_date` date NOT NULL,
	`to_date` date NOT NULL,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`reviewed_by` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leave_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`department_id` int NOT NULL,
	`faculty_id` int,
	CONSTRAINT `subjects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firebase_uid` varchar(128),
	`name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`password_hash` varchar(255),
	`is_active` boolean DEFAULT true,
	`role` enum('student','faculty','admin') NOT NULL,
	`is_system_admin` boolean DEFAULT false,
	`department_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_firebase_uid_unique` UNIQUE(`firebase_uid`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_student_id_users_id_fk` FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_marked_by_users_id_fk` FOREIGN KEY (`marked_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leave_requests` ADD CONSTRAINT `leave_requests_student_id_users_id_fk` FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leave_requests` ADD CONSTRAINT `leave_requests_reviewed_by_users_id_fk` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_faculty_id_users_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_enrollments` ADD CONSTRAINT `course_enrollments_course_id_courses_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_enrollments` ADD CONSTRAINT `course_enrollments_student_id_users_id_fk` FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_faculty_id_users_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `timetable_slots` ADD CONSTRAINT `timetable_slots_course_id_courses_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;
```

---

### `backend/drizzle/meta/0000_snapshot.json`

```json
{
  "version": "5",
  "dialect": "mysql",
  "id": "4392679b-a3ee-4aa0-bab0-627ad66867a8",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "tables": {
    "course_enrollments": {
      "name": "course_enrollments",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "student_id": {
          "name": "student_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "enrolled_at": {
          "name": "enrolled_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "course_enrollments_id": {
          "name": "course_enrollments_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "course_enrollments_course_id_student_id_unique": {
          "name": "course_enrollments_course_id_student_id_unique",
          "columns": [
            "course_id",
            "student_id"
          ]
        }
      },
      "checkConstraint": {}
    },
    "courses": {
      "name": "courses",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "name": {
          "name": "name",
          "type": "varchar(150)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "varchar(20)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "department_id": {
          "name": "department_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "credits": {
          "name": "credits",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": 3
        },
        "faculty_id": {
          "name": "faculty_id",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "courses_id": {
          "name": "courses_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "courses_code_unique": {
          "name": "courses_code_unique",
          "columns": [
            "code"
          ]
        }
      },
      "checkConstraint": {}
    },
    "timetable_slots": {
      "name": "timetable_slots",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "day_of_week": {
          "name": "day_of_week",
          "type": "enum('monday','tuesday','wednesday','thursday','friday','saturday')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "start_time": {
          "name": "start_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "end_time": {
          "name": "end_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "room": {
          "name": "room",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "timetable_slots_id": {
          "name": "timetable_slots_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
```

---

### `backend/drizzle/meta/0001_snapshot.json`

```json
{
  "version": "5",
  "dialect": "mysql",
  "id": "a935ed45-1bd1-4000-a92d-2021ae05c1a0",
  "prevId": "4392679b-a3ee-4aa0-bab0-627ad66867a8",
  "tables": {
    "course_enrollments": {
      "name": "course_enrollments",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "student_id": {
          "name": "student_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "enrolled_at": {
          "name": "enrolled_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "course_enrollments_id": {
          "name": "course_enrollments_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "course_enrollments_course_id_student_id_unique": {
          "name": "course_enrollments_course_id_student_id_unique",
          "columns": [
            "course_id",
            "student_id"
          ]
        }
      },
      "checkConstraint": {}
    },
    "courses": {
      "name": "courses",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "name": {
          "name": "name",
          "type": "varchar(150)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "varchar(20)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "department_id": {
          "name": "department_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "credits": {
          "name": "credits",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": 3
        },
        "faculty_id": {
          "name": "faculty_id",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "max_students": {
          "name": "max_students",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "semester_start": {
          "name": "semester_start",
          "type": "date",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "semester_end": {
          "name": "semester_end",
          "type": "date",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "courses_id": {
          "name": "courses_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "courses_code_unique": {
          "name": "courses_code_unique",
          "columns": [
            "code"
          ]
        }
      },
      "checkConstraint": {}
    },
    "timetable_slots": {
      "name": "timetable_slots",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "day_of_week": {
          "name": "day_of_week",
          "type": "enum('monday','tuesday','wednesday','thursday','friday','saturday')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "start_time": {
          "name": "start_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "end_time": {
          "name": "end_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "room": {
          "name": "room",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "timetable_slots_id": {
          "name": "timetable_slots_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
```

---

### `backend/drizzle/meta/0002_snapshot.json`

```json
{
  "version": "5",
  "dialect": "mysql",
  "id": "5420c063-befa-40a2-ad6f-4f11303e5db7",
  "prevId": "a935ed45-1bd1-4000-a92d-2021ae05c1a0",
  "tables": {
    "attendance": {
      "name": "attendance",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "student_id": {
          "name": "student_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "marked_by": {
          "name": "marked_by",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "enum('present','absent','late')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "attendance_student_id_users_id_fk": {
          "name": "attendance_student_id_users_id_fk",
          "tableFrom": "attendance",
          "tableTo": "users",
          "columnsFrom": [
            "student_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "attendance_marked_by_users_id_fk": {
          "name": "attendance_marked_by_users_id_fk",
          "tableFrom": "attendance",
          "tableTo": "users",
          "columnsFrom": [
            "marked_by"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "attendance_id": {
          "name": "attendance_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "unique_attendance": {
          "name": "unique_attendance",
          "columns": [
            "student_id",
            "date"
          ]
        }
      },
      "checkConstraint": {}
    },
    "course_enrollments": {
      "name": "course_enrollments",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "student_id": {
          "name": "student_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "enrolled_at": {
          "name": "enrolled_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "course_enrollments_course_id_courses_id_fk": {
          "name": "course_enrollments_course_id_courses_id_fk",
          "tableFrom": "course_enrollments",
          "tableTo": "courses",
          "columnsFrom": [
            "course_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "course_enrollments_student_id_users_id_fk": {
          "name": "course_enrollments_student_id_users_id_fk",
          "tableFrom": "course_enrollments",
          "tableTo": "users",
          "columnsFrom": [
            "student_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "course_enrollments_id": {
          "name": "course_enrollments_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "course_enrollments_course_id_student_id_unique": {
          "name": "course_enrollments_course_id_student_id_unique",
          "columns": [
            "course_id",
            "student_id"
          ]
        }
      },
      "checkConstraint": {}
    },
    "courses": {
      "name": "courses",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "name": {
          "name": "name",
          "type": "varchar(150)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "code": {
          "name": "code",
          "type": "varchar(20)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "department_id": {
          "name": "department_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "credits": {
          "name": "credits",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": 3
        },
        "faculty_id": {
          "name": "faculty_id",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "max_students": {
          "name": "max_students",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "semester_start": {
          "name": "semester_start",
          "type": "date",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "semester_end": {
          "name": "semester_end",
          "type": "date",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "courses_department_id_departments_id_fk": {
          "name": "courses_department_id_departments_id_fk",
          "tableFrom": "courses",
          "tableTo": "departments",
          "columnsFrom": [
            "department_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "courses_faculty_id_users_id_fk": {
          "name": "courses_faculty_id_users_id_fk",
          "tableFrom": "courses",
          "tableTo": "users",
          "columnsFrom": [
            "faculty_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "courses_id": {
          "name": "courses_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "courses_code_unique": {
          "name": "courses_code_unique",
          "columns": [
            "code"
          ]
        }
      },
      "checkConstraint": {}
    },
    "departments": {
      "name": "departments",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "name": {
          "name": "name",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "departments_id": {
          "name": "departments_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "departments_name_unique": {
          "name": "departments_name_unique",
          "columns": [
            "name"
          ]
        }
      },
      "checkConstraint": {}
    },
    "leave_requests": {
      "name": "leave_requests",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "student_id": {
          "name": "student_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "reason": {
          "name": "reason",
          "type": "text",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "from_date": {
          "name": "from_date",
          "type": "date",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "to_date": {
          "name": "to_date",
          "type": "date",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "enum('pending','approved','rejected')",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "'pending'"
        },
        "reviewed_by": {
          "name": "reviewed_by",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "leave_requests_student_id_users_id_fk": {
          "name": "leave_requests_student_id_users_id_fk",
          "tableFrom": "leave_requests",
          "tableTo": "users",
          "columnsFrom": [
            "student_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "leave_requests_reviewed_by_users_id_fk": {
          "name": "leave_requests_reviewed_by_users_id_fk",
          "tableFrom": "leave_requests",
          "tableTo": "users",
          "columnsFrom": [
            "reviewed_by"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "leave_requests_id": {
          "name": "leave_requests_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "subjects": {
      "name": "subjects",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "name": {
          "name": "name",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "department_id": {
          "name": "department_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "faculty_id": {
          "name": "faculty_id",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "subjects_department_id_departments_id_fk": {
          "name": "subjects_department_id_departments_id_fk",
          "tableFrom": "subjects",
          "tableTo": "departments",
          "columnsFrom": [
            "department_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "subjects_faculty_id_users_id_fk": {
          "name": "subjects_faculty_id_users_id_fk",
          "tableFrom": "subjects",
          "tableTo": "users",
          "columnsFrom": [
            "faculty_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "subjects_id": {
          "name": "subjects_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "timetable_slots": {
      "name": "timetable_slots",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "course_id": {
          "name": "course_id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "day_of_week": {
          "name": "day_of_week",
          "type": "enum('monday','tuesday','wednesday','thursday','friday','saturday')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "start_time": {
          "name": "start_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "end_time": {
          "name": "end_time",
          "type": "time",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "room": {
          "name": "room",
          "type": "varchar(50)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "timetable_slots_course_id_courses_id_fk": {
          "name": "timetable_slots_course_id_courses_id_fk",
          "tableFrom": "timetable_slots",
          "tableTo": "courses",
          "columnsFrom": [
            "course_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "timetable_slots_id": {
          "name": "timetable_slots_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "firebase_uid": {
          "name": "firebase_uid",
          "type": "varchar(128)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "varchar(100)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(150)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "password_hash": {
          "name": "password_hash",
          "type": "varchar(255)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "is_active": {
          "name": "is_active",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": true
        },
        "role": {
          "name": "role",
          "type": "enum('student','faculty','admin')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "is_system_admin": {
          "name": "is_system_admin",
          "type": "boolean",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": false
        },
        "department_id": {
          "name": "department_id",
          "type": "int",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "default": "(now())"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "users_department_id_departments_id_fk": {
          "name": "users_department_id_departments_id_fk",
          "tableFrom": "users",
          "tableTo": "departments",
          "columnsFrom": [
            "department_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_firebase_uid_unique": {
          "name": "users_firebase_uid_unique",
          "columns": [
            "firebase_uid"
          ]
        },
        "users_email_unique": {
          "name": "users_email_unique",
          "columns": [
            "email"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}
```

---

### `backend/drizzle/meta/_journal.json`

```json
{
  "version": "7",
  "dialect": "mysql",
  "entries": [
    {
      "idx": 0,
      "version": "5",
      "when": 1783731048443,
      "tag": "0000_productive_human_robot",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "5",
      "when": 1783849074604,
      "tag": "0001_steep_maggott",
      "breakpoints": true
    },
    {
      "idx": 2,
      "version": "5",
      "when": 1784161513069,
      "tag": "0002_open_shiva",
      "breakpoints": true
    }
  ]
}
```

---

### `backend/jest.config.cjs`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        module: 'commonjs'
      }
    }
  }
};
```

---

### `backend/package.json`

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only server.ts",
    "build": "tsc",
    "test": "jest",
    "test:ci": "jest --runInBand --silent",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "drizzle-orm": "^0.45.2",
    "express": "^5.2.1",
    "json2csv": "^6.0.0-alpha.2",
    "jsonwebtoken": "^9.0.3",
    "mysql2": "^3.22.6",
    "openai": "^6.46.0",
    "pdfkit": "^0.19.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.3",
    "winston": "^3.19.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/jest": "^29.5.3",
    "@types/json2csv": "^5.0.7",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^26.1.1",
    "@types/pdfkit": "^0.17.6",
    "@types/supertest": "^2.0.12",
    "@types/winston": "^2.4.4",
    "drizzle-kit": "^0.31.10",
    "jest": "^29.7.0",
    "nodemon": "^3.1.14",
    "supertest": "^6.2.4",
    "ts-jest": "^29.1.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }
}
```

---

### `backend/seed.sql`

```sql
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
```

---

### `backend/server.ts`

```typescript
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### `backend/src/__tests__/health.test.ts`

```typescript
import request from 'supertest';
import app from '../app';

describe('Health endpoint', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
```

---

### `backend/src/app.ts`

```typescript
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leaveRoutes from './routes/leaveRoutes';
import adminRoutes from './routes/adminRoutes';
import reportRoutes from './routes/reportRoutes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import setupSwagger from './swagger';
import agentRoutes from './routes/agentRoutes';
import courseRoutes from './routes/courseRoutes';
import timetableRoutes from './routes/timetableRoutes';


const app: Application = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN?.replace(/\/$/, '') || 'http://localhost:5173';

const allowedOrigins = [
  frontendOrigin,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      // Allow any Vercel preview or production deployment
      if (origin.endsWith('.vercel.app')) return callback(null, true);
      // Allow explicitly listed origins
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use('/api/agent', agentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/timetable', timetableRoutes);
// OpenAPI docs
setupSwagger(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('EduFlow API is running.');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
```

---

### `backend/src/config/db.ts`

```typescript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
```

---

### `backend/src/controllers/adminController.ts`

```typescript
import { NextFunction, Response } from 'express';
import * as adminService from '../services/adminService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { createPaginationMeta, sendPaginated, sendSuccess } from '../utils/apiResponse';
import { parsePaginationOptions, parseSortBy, parseSortOrder } from '../utils/pagination';

export const addDepartment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    next(new AppError('name is required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await adminService.createNewDepartment(name);
    sendSuccess(res, {
      statusCode: 201,
      message: 'Department created successfully',
      data: { id: result.insertId, name },
    });
  } catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
      next(new AppError('Department already exists', 409, 'DUPLICATE_RESOURCE'));
      return;
    }
    next(new AppError('Failed to create department', 500, 'DEPARTMENT_CREATE_FAILED'));
  }
};

export const listDepartments = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pagination = parsePaginationOptions(req.query as Record<string, unknown>);
    const sortBy = parseSortBy(req.query.sortBy, ['name', 'createdAt'] as const, 'name');
    const sortOrder = parseSortOrder(req.query.sortOrder);
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined;

    const result = await adminService.fetchDepartments({
      ...pagination,
      sortBy,
      sortOrder,
      search,
    });

    sendPaginated(res, {
      data: result.rows,
      pagination: createPaginationMeta(pagination.page, pagination.limit, result.total),
      message: 'Departments fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const role = req.query.role as string | undefined;
  const search = req.query.search as string | undefined;

  try {
    const pagination = parsePaginationOptions(req.query as Record<string, unknown>);
    const sortBy = parseSortBy(req.query.sortBy, ['name', 'email', 'role', 'createdAt'] as const, 'name');
    const sortOrder = parseSortOrder(req.query.sortOrder);

    const result = await adminService.fetchUsers({
      ...pagination,
      role,
      search: search?.trim() || undefined,
      sortBy,
      sortOrder,
    });

    sendPaginated(res, {
      data: result.rows,
      pagination: createPaginationMeta(pagination.page, pagination.limit, result.total),
      message: 'Users fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { role, departmentId } = req.body as { role?: string; departmentId?: number | null };
  const actingUser = req.user!;
  const targetId = Number(id);

  if (role !== undefined && !adminService.isValidRole(role)) {
    next(new AppError('Invalid role. Must be one of: student, faculty, admin', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (departmentId !== undefined && departmentId !== null && Number.isNaN(Number(departmentId))) {
    next(new AppError('departmentId must be a number or null', 400, 'VALIDATION_ERROR'));
    return;
  }

  // Prevent admin from changing their own role unless role unchanged
  if (actingUser.id === targetId && role !== undefined && role !== actingUser.role) {
    next(new AppError('You cannot change your own role', 403, 'SELF_ROLE_CHANGE'));
    return;
  }

  try {
    const targetUser = await adminService.getUserById(targetId);

    if (!targetUser) {
      next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
      return;
    }

    const nextRole = role ?? targetUser.role;
    const nextDepartmentId =
      departmentId !== undefined ? (departmentId === null ? null : Number(departmentId)) : targetUser.department_id;

    if (targetUser.is_system_admin && nextRole !== 'admin') {
      next(new AppError(
        'The system admin (first registered admin) cannot be demoted. This is a protected account.',
        403,
        'SYSTEM_ADMIN_PROTECTED'
      ));
      return;
    }

    if (role !== undefined && departmentId !== undefined) {
      await adminService.changeUserRole(targetId, nextRole, nextDepartmentId);
    } else if (role !== undefined) {
      await adminService.changeUserRole(targetId, nextRole, targetUser.department_id ?? null);
    } else if (departmentId !== undefined) {
      await adminService.changeUserDepartment(targetId, nextDepartmentId);
    } else {
      next(new AppError('No updatable fields provided', 400, 'VALIDATION_ERROR'));
      return;
    }

    sendSuccess(res, {
      message: 'User updated successfully',
      data: { id: targetId, role: nextRole, departmentId: nextDepartmentId },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError('Failed to update user', 500, 'USER_UPDATE_FAILED'));
  }
};

export const removeUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const actingUser = req.user!;
  const targetId = Number(id);

  // Prevent admin from deleting themselves
  if (actingUser.id === targetId) {
    next(new AppError('You cannot delete your own account', 403, 'SELF_DELETE'));
    return;
  }

  try {
    // Prevent deletion of the system admin account
    const targetUser = await adminService.getUserById(targetId);
    if (!targetUser) {
      next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
      return;
    }

    if (targetUser.is_system_admin) {
      next(new AppError('The system admin account cannot be deleted', 403, 'SYSTEM_ADMIN_PROTECTED'));
      return;
    }

    await adminService.deactivateUser(targetId);
    sendSuccess(res, {
      message: 'User deleted successfully',
      data: { id: targetId },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError('Failed to delete user', 500, 'USER_DELETE_FAILED'));
  }
};

export const removeDepartment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    await adminService.removeDepartment(Number(id));
    sendSuccess(res, {
      message: 'Department deleted successfully',
      data: null,
    });
  } catch (error: any) {
    if (error.code === 'ER_ROW_IS_REFERENCED' || error.code === 'ER_ROW_IS_REFERENCED_2') {
      next(new AppError('Cannot delete department because it still has courses assigned to it. Please delete the courses first.', 409, 'DEPARTMENT_REFERENCED'));
      return;
    }
    next(new AppError('Failed to delete department', 500, 'DEPARTMENT_DELETE_FAILED'));
  }
};
```

---

### `backend/src/controllers/agentController.ts`

```typescript
import { Request, Response } from 'express';
import * as agentService from '../services/agentService';
import { randomUUID } from 'crypto';

// 1. Handles sending a chat message and managing session persistence
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    let { conversationId } = req.body;
    const user = (req as any).user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Generate a fresh dynamic UUID if none is supplied
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      conversationId = randomUUID();
    }

    try {
      const result = await agentService.chat(conversationId, message, user);
      return res.status(200).json({
        ...result,
        conversationId // Always return the active ID so the frontend can capture it
      });
    } catch (error: any) {
      // If the frontend sent an expired session ID from a previous login, reset cleanly
      if (error.message && error.message.includes('own this chat session')) {
        const newId = randomUUID();
        const result = await agentService.chat(newId, message, user);
        return res.status(200).json({
          ...result,
          conversationId: newId
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error in agent controller handleChat:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 2. Handles confirmation of pending actions
export const confirmAction = async (req: Request, res: Response) => {
  try {
    const { conversationId, confirmed } = req.body;
    const user = (req as any).user;

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required.' });
    }

    try {
      const result = await agentService.confirmPendingAction(conversationId, confirmed, user);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('own this chat session')) {
        return res.status(403).json({ error: "Unauthorized: You do not own this chat session." });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error in agent controller confirmAction:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 3. Handles fetching secure history for the logged-in user
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User context missing.' });
    }

    // If it's a generic session, return an empty array safely
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      return res.json([]);
    }

    try {
      const history = await agentService.getMessagesBySession(conversationId, user.id);
      return res.json(history || []);
    } catch (error: any) {
      if (error.message && error.message.includes('own this chat session')) {
        console.warn(`Prevented user ${user.id} from accessing history of session ${conversationId}`);
        return res.json([]);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
```

---

### `backend/src/controllers/attendanceController.ts`

```typescript
import { NextFunction, Response } from 'express';
import * as attendanceService from '../services/attendanceService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

export const markAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    next(new AppError('studentId, date, and status are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (!attendanceService.isValidStatus(status)) {
    next(new AppError('Invalid status', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    await attendanceService.recordAttendance(studentId, req.user!.id, date, status);
    sendSuccess(res, {
      message: 'Attendance marked successfully',
      data: { studentId, date, status },
    });
  } catch {
    next(new AppError('Failed to mark attendance', 500, 'ATTENDANCE_MARK_FAILED'));
  }
};

export const getMyAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await attendanceService.fetchStudentHistory(req.user!.id);
    sendSuccess(res, {
      message: 'Attendance history fetched successfully',
      data: records,
    });
  } catch {
    next(new AppError('Failed to fetch attendance', 500, 'ATTENDANCE_FETCH_FAILED'));
  }
};

export const getMyPercentage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await attendanceService.computeAttendancePercentage(req.user!.id);
    sendSuccess(res, {
      message: 'Attendance percentage calculated successfully',
      data: result,
    });
  } catch {
    next(new AppError('Failed to calculate percentage', 500, 'ATTENDANCE_PERCENTAGE_FAILED'));
  }
};

export const getClassAttendance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    next(new AppError('date query param is required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const records = await attendanceService.fetchClassAttendance(date);
    sendSuccess(res, {
      message: 'Class attendance fetched successfully',
      data: records,
    });
  } catch {
    next(new AppError('Failed to fetch class attendance', 500, 'CLASS_ATTENDANCE_FETCH_FAILED'));
  }
};

export const getLowAttendanceStudents = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const threshold = req.query.threshold ? parseFloat(req.query.threshold as string) : 75;

  try {
    const students = await attendanceService.fetchLowAttendanceStudents(threshold);
    sendSuccess(res, {
      message: 'Low attendance students fetched successfully',
      data: students,
    });
  } catch {
    next(new AppError('Failed to fetch low attendance students', 500, 'LOW_ATTENDANCE_FETCH_FAILED'));
  }
};
```

---

### `backend/src/controllers/authController.ts`

```typescript
import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/authService';
import { createAccessToken } from '../services/tokenService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

/**
 * Public endpoint — returns whether a system admin already exists.
 * The frontend uses this to conditionally show the "Admin" role option on the Register page.
 */
export const checkAdminExists = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const exists = await authService.adminExists();
    sendSuccess(res, {
      message: 'Admin status fetched',
      data: { adminExists: exists },
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password, role, departmentId } = req.body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    departmentId?: number | null;
  };

  if (!name || !email || !password || !role) {
    next(new AppError('Name, email, password, and role are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  // Only 'student' and 'admin' are allowed at registration — 'faculty' is assigned by admins only
  if (!authService.isValidRegistrationRole(role)) {
    next(new AppError(
      role === 'faculty'
        ? 'Faculty role cannot be self-assigned. It must be granted by an admin.'
        : 'Invalid role. Choose either "student" or "admin".',
      400,
      'VALIDATION_ERROR'
    ));
    return;
  }

  try {
    const user = await authService.registerUser(
      name,
      email,
      password,
      role,
      departmentId ?? null
    );

    const accessToken = createAccessToken(user);

    // Set HttpOnly cookie for access token (for improved security)
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      statusCode: 201,
      message: 'Registration completed successfully',
      data: { user },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        next(new AppError(error.message, 409, 'DUPLICATE_RESOURCE'));
        return;
      }
      if (error.message === 'AdminAlreadyExists') {
        next(new AppError(
          'An admin already exists. You cannot register as admin. Contact your system administrator.',
          409,
          'ADMIN_ALREADY_EXISTS'
        ));
        return;
      }
      if (error.message === 'InvalidRegistrationRole') {
        next(new AppError('Invalid role for registration', 400, 'VALIDATION_ERROR'));
        return;
      }
    }
    console.error('Registration error:', error);
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    next(new AppError('Email and password are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const user = await authService.loginUser(email, password);

    if (!user) {
      next(new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS'));
      return;
    }

    const accessToken = createAccessToken(user);

    // Set HttpOnly cookie containing the access token
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      message: 'Login successful',
      data: { user },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
    return;
  }

  sendSuccess(res, {
    message: 'Authenticated user fetched successfully',
    data: req.user,
  });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('access_token', { 
      httpOnly: true, 
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax' 
    });
    sendSuccess(res, { message: 'Logged out successfully', data: null });
  } catch (err) {
    next(new AppError('Logout failed', 500, 'LOGOUT_FAILED'));
  }
};

export const getPublicDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Queries your database for all existing departments
    // If using Prisma, it looks like: const departments = await prisma.department.findMany();
    // If using Sequelize: const departments = await Department.findAll();
    
    // Replace the line below with your actual database fetching logic:
    const departments = await authService.getAllDepartments(); 

    sendSuccess(res, {
      message: 'Public departments list fetched successfully',
      data: departments,
    });
  } catch (error) {
    console.error('Error fetching public departments list:', error);
    next(error);
  }
};
```

---

### `backend/src/controllers/courseController.ts`

```typescript
import { Response } from 'express';
import * as courseService from '../services/courseService';
import { AuthenticatedRequest } from '../types';

export const createCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, code, departmentId, credits, facultyId } = req.body;

  if (!name || !code || !departmentId) {
    res.status(400).json({ error: 'name, code, and departmentId are required' });
    return;
  }

  try {
    const id = await courseService.createNewCourse({ name, code, departmentId, credits, facultyId });
    res.status(201).json({ id, name, code, departmentId, credits, facultyId });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Course code already exists' });
      return;
    }
    res.status(500).json({ error: 'Failed to create course', details: err.message });
  }
};

export const listCourses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const courses = await courseService.fetchAllCourses();
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
};

export const getCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const course = await courseService.fetchCourseById(Number(id));
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch course', details: err.message });
  }
};

export const getMyCourses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role === 'faculty') {
      const courses = await courseService.fetchCoursesByFaculty(req.user!.id);
      res.json(courses);
      return;
    }
    if (req.user!.role === 'student') {
      const courses = await courseService.fetchStudentCourses(req.user!.id);
      res.json(courses);
      return;
    }
    res.status(400).json({ error: 'Role not applicable for this endpoint' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch your courses', details: err.message });
  }
};

export const updateCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await courseService.updateExistingCourse(Number(id), req.body);
    res.json({ message: 'Course updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update course', details: err.message });
  }
};

export const deleteCourse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await courseService.removeCourse(Number(id));
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete course', details: err.message });
  }
};

export const enrollStudent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { studentId } = req.body;

  if (!studentId) {
    res.status(400).json({ error: 'studentId is required' });
    return;
  }

  try {
    await courseService.enrollStudentInCourse(Number(id), studentId);
    res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Student already enrolled in this course' });
      return;
    }
    res.status(500).json({ error: 'Failed to enroll student', details: err.message });
  }
};

export const getEnrolledStudents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const students = await courseService.fetchEnrolledStudents(Number(id));
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch enrolled students', details: err.message });
  }
};

export const unenrollStudent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id, studentId } = req.params;

  try {
    await courseService.unenrollStudentFromCourse(Number(id), Number(studentId));
    res.json({ message: 'Student unenrolled successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to unenroll student', details: err.message });
  }
};
```

---

### `backend/src/controllers/leaveController.ts`

```typescript
import { NextFunction, Response } from 'express';
import * as leaveService from '../services/leaveService';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { sendSuccess } from '../utils/apiResponse';

export const submitLeave = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { reason, fromDate, toDate } = req.body;

  if (!reason || !fromDate || !toDate) {
    next(new AppError('reason, fromDate, and toDate are required', 400, 'VALIDATION_ERROR'));
    return;
  }

  if (!leaveService.validateLeaveDates(fromDate, toDate)) {
    next(new AppError('fromDate cannot be after toDate', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await leaveService.createLeaveRequest(req.user!.id, reason, fromDate, toDate);
    sendSuccess(res, {
      statusCode: 201,
      message: 'Leave request submitted',
      data: { id: result.insertId, reason, fromDate, toDate },
    });
  } catch {
    next(new AppError('Failed to submit leave request', 500, 'LEAVE_SUBMIT_FAILED'));
  }
};

export const getMyLeaveRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await leaveService.fetchMyLeaveRequests(req.user!.id);
    sendSuccess(res, {
      message: 'Leave requests fetched successfully',
      data: requests,
    });
  } catch {
    next(new AppError('Failed to fetch leave requests', 500, 'LEAVE_FETCH_FAILED'));
  }
};

export const getPendingRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await leaveService.fetchPendingLeaveRequests();
    sendSuccess(res, {
      message: 'Pending leave requests fetched successfully',
      data: requests,
    });
  } catch {
    next(new AppError('Failed to fetch pending requests', 500, 'PENDING_LEAVE_FETCH_FAILED'));
  }
};

export const reviewLeave = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { decision } = req.body;

  if (!['approved', 'rejected'].includes(decision)) {
    next(new AppError('decision must be approved or rejected', 400, 'VALIDATION_ERROR'));
    return;
  }

  try {
    const result = await leaveService.processLeaveDecision(Number(id), decision, req.user!.id);

    if (!result.success) {
      next(new AppError(result.error || 'Failed to review leave request', result.statusCode || 500, 'LEAVE_REVIEW_FAILED'));
      return;
    }

    sendSuccess(res, {
      message: `Leave request ${decision}`,
      data: { id: Number(id), decision },
    });
  } catch {
    next(new AppError('Failed to review leave request', 500, 'LEAVE_REVIEW_FAILED'));
  }
};
```

---

### `backend/src/controllers/reportController.ts`

```typescript
import { Response } from 'express';
import * as reportService from '../services/reportService';
import { getWeekRange, getMonthRange } from '../utils/dateHelpers';
import PDFDocument from 'pdfkit';
import { AuthenticatedRequest } from '../types';
import type { DepartmentReportFilters } from '../models/reportModel';
import apiResponse from '../utils/apiResponse';

export const dailyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    apiResponse.error(res, 'date is required', 400);
    return;
  }

  try {
    const data = await reportService.fetchDailyReport(date);
    apiResponse.success(res, data, 'Daily report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate daily report', 500, err.message);
  }
};

export const weeklyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    apiResponse.error(res, 'date is required (any date within the week)', 400);
    return;
  }

  try {
    const { fromDate, toDate } = getWeekRange(date);
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    apiResponse.success(res, { fromDate, toDate, data }, 'Weekly report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate weekly report', 500, err.message);
  }
};

export const monthlyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const month = req.query.month as string;
  const year = req.query.year as string;
  if (!month || !year) {
    apiResponse.error(res, 'month and year are required', 400);
    return;
  }

  try {
    const { fromDate, toDate } = getMonthRange(parseInt(month), parseInt(year));
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    apiResponse.success(res, { fromDate, toDate, data }, 'Monthly report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate monthly report', 500, err.message);
  }
};

export const institutionSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
    return;
  }

  try {
    // Parse optional filters from query string with sensible defaults
    const page = parseInt((req.query.page as string) || '1', 10) || 1;
    const limit = parseInt((req.query.limit as string) || '10', 10) || 10;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || undefined;
    const sortBy = ((req.query.sortBy as DepartmentReportFilters['sortBy']) || 'department') as DepartmentReportFilters['sortBy'];
    const sortOrder = ((req.query.sortOrder as DepartmentReportFilters['sortOrder']) || 'asc') as DepartmentReportFilters['sortOrder'];

    const filters: DepartmentReportFilters = {
      search,
      page,
      limit,
      offset,
      sortBy,
      sortOrder,
    };

    const result = await reportService.fetchInstitutionSummary(fromDate, toDate, filters);

    // Ensure response envelope: data: { summary, departmentBreakdown, departmentBreakdownMeta }
    apiResponse.success(res, result, 'Institution summary');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate summary', 500, err.message);
  }
};

export const exportCSV = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
    return;
  }

  try {
    const csv = await reportService.generateCSV(fromDate, toDate);
    res.header('Content-Type', 'text/csv');
    res.attachment(`attendance-report-${fromDate}-to-${toDate}.csv`);
    res.send(csv);
  } catch (err: any) {
    apiResponse.error(res, 'Failed to export CSV', 500, err.message);
  }
};

export const exportPDF = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
    return;
  }

  try {
    const data = await reportService.fetchRangeReport(fromDate, toDate);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=attendance-report-${fromDate}-to-${toDate}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(16).text('Attendance Report', { align: 'center' });
    doc.fontSize(10).text(`Period: ${fromDate} to ${toDate}`, { align: 'center' });
    doc.moveDown(2);

    data.forEach((row: any) => {
      doc.fontSize(11).text(
        `${row.name} (${row.email}) — Present: ${row.present_days || 0}, Absent: ${row.absent_days || 0}, Late: ${row.late_days || 0}, Percentage: ${row.percentage || 0}%`
      );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err: any) {
    apiResponse.error(res, 'Failed to export PDF', 500, err.message);
  }
};
```

---

### `backend/src/controllers/timetableController.ts`

```typescript
import { Response } from 'express';
import * as timetableService from '../services/timetableService';
import { AuthenticatedRequest } from '../types';

export const createSlot = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { courseId, dayOfWeek, startTime, endTime, room } = req.body;

  if (!courseId || !dayOfWeek || !startTime || !endTime) {
    res.status(400).json({ error: 'courseId, dayOfWeek, startTime, and endTime are required' });
    return;
  }

  try {
    const id = await timetableService.createSlot({ courseId, dayOfWeek, startTime, endTime, room });
    res.status(201).json({ id, courseId, dayOfWeek, startTime, endTime, room });
  } catch (err: any) {
    res.status(409).json({ error: err.message });
  }
};

export const getCourseTimetable = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { courseId } = req.params;

  try {
    const slots = await timetableService.fetchCourseTimetable(Number(courseId));
    res.json(slots);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch timetable', details: err.message });
  }
};

export const getMyTimetable = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role === 'student') {
      const timetable = await timetableService.fetchStudentTimetable(req.user!.id);
      res.json(timetable);
      return;
    }
    if (req.user!.role === 'faculty') {
      const timetable = await timetableService.fetchFacultyTimetable(req.user!.id);
      res.json(timetable);
      return;
    }
    res.status(400).json({ error: 'Role not applicable for this endpoint' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch your timetable', details: err.message });
  }
};

export const deleteSlot = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await timetableService.removeSlot(Number(id));
    res.json({ message: 'Timetable slot deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete slot', details: err.message });
  }
};
```

---

### `backend/src/db/client.ts`

```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
```

---

### `backend/src/db/schema.ts`

```typescript
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
  dayOfWeek: mysqlEnum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  room: varchar('room', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### `backend/src/db/seed.ts`

```typescript
import bcrypt from 'bcryptjs';
import db from '../config/db';

const seed = async () => {
  try {
    console.log('Seeding started...');
    
    // Create Department
    const [deptRes]: any = await db.query(
      'INSERT IGNORE INTO departments (name) VALUES (?)',
      ['Computer Science']
    );
    let deptId = deptRes.insertId;
    if (!deptId) {
       const [rows]: any = await db.query('SELECT id FROM departments WHERE name = "Computer Science"');
       deptId = rows[0].id;
    }

    const passwordHash = await bcrypt.hash('123456', 10);

    // Create Faculty
    await db.query(
      'INSERT IGNORE INTO users (name, email, password_hash, role, department_id, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      ['Test Faculty', 'faculty@test.com', passwordHash, 'faculty', deptId, true]
    );

    // Create Students
    for (let i = 1; i <= 5; i++) {
      await db.query(
        'INSERT IGNORE INTO users (name, email, password_hash, role, department_id, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [`Test Student ${i}`, `student${i}@test.com`, passwordHash, 'student', deptId, true]
      );
    }
    
    console.log('Seeding completed successfully! Emails: faculty@test.com, student1@test.com to student5@test.com. Password: 123456');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
```

---

### `backend/src/db/seedDemo.ts`

```typescript
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
```

---

### `backend/src/middleware/auth.ts`

```typescript
import { Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/tokenService';
import { AuthenticatedRequest } from '../types';
import { AppError } from './errorHandler';

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const cookieToken = (req as any).cookies?.access_token as string | undefined;

  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    next(new AppError('No token provided', 401, 'UNAUTHORIZED'));
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err: any) {
    next(new AppError('Invalid or expired token', 401, 'UNAUTHORIZED'));
  }
};

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
      return;
    }

    next();
  };
};
```

---

### `backend/src/middleware/errorHandler.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';

  if (statusCode >= 500) {
    logger.error(message, {
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
      code,
    });
  } else {
    logger.warn(message, {
      path: req.originalUrl,
      method: req.method,
      code,
    });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};
```

---

### `backend/src/middleware/requestLogger.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl}`, {
      status: res.statusCode,
      durationMs: duration,
      ip: req.ip,
    });
  });

  next();
};
```

---

### `backend/src/models/adminModel.ts`

```typescript
import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface UserFilters {
  role?: string | null;
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'name' | 'email' | 'role' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface DepartmentFilters {
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface UserModelRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string | null;
  is_system_admin: number;
  created_at: Date;
  updated_at: Date;
}

export const createDepartment = async (name: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(`INSERT INTO departments (name) VALUES (?)`, [name]);
  return result;
};

export const getAllDepartments = async (filters: DepartmentFilters): Promise<{ rows: any[]; total: number }> => {
  let query = 'SELECT id, name, created_at as createdAt FROM departments WHERE 1=1';
  const params: any[] = [];

  if (filters.search) {
    query += ' AND name LIKE ?';
    params.push(`%${filters.search}%`);
  }

  const countQuery = `SELECT COUNT(*) as count FROM (${query}) as t`;
  const [countRes]: any = await db.query(countQuery, params);
  const total = countRes[0].count;

  const columnMap: Record<string, string> = { name: 'name', createdAt: 'created_at' };
  const orderCol = columnMap[filters.sortBy] || 'name';
  query += ` ORDER BY ${orderCol} ${filters.sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  query += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);

  const [rows]: any = await db.query(query, params);
  return { rows, total };
};

export const getUsers = async (filters: UserFilters): Promise<{ rows: UserModelRow[]; total: number }> => {
  let query = `
    SELECT u.id, u.name, u.email, u.role, u.is_system_admin, u.is_active, u.department_id as departmentId, d.name as department, u.created_at as createdAt 
    FROM users u
    LEFT JOIN departments d ON u.department_id = d.id
    WHERE u.is_active = 1
  `;
  const params: any[] = [];

  if (filters.role) {
    query += ' AND u.role = ?';
    params.push(filters.role);
  }

  if (filters.search) {
    query += ' AND (u.name LIKE ? OR u.email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const countQuery = `SELECT COUNT(*) as count FROM (${query}) as t`;
  const [countRes]: any = await db.query(countQuery, params);
  const total = countRes[0].count;

  const columnMap: Record<string, string> = {
    name: 'u.name',
    email: 'u.email',
    role: 'u.role',
    createdAt: 'u.created_at',
  };
  const orderCol = columnMap[filters.sortBy] || 'u.name';
  query += ` ORDER BY ${orderCol} ${filters.sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  query += ' LIMIT ? OFFSET ?';
  params.push(filters.limit, filters.offset);

  const [rows] = await db.query<UserModelRow[]>(query, params);
  return { rows, total };
};

export const getUserById = async (id: number): Promise<any | null> => {
  const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

export const updateUserRoleAndDept = async (
  id: number,
  role: string,
  departmentId: number | null
): Promise<void> => {
  await db.query('UPDATE users SET role = ?, department_id = ? WHERE id = ?', [role, departmentId, id]);
};

export const updateUserDepartment = async (id: number, departmentId: number | null): Promise<void> => {
  await db.query('UPDATE users SET department_id = ? WHERE id = ?', [departmentId, id]);
};

export const deleteUserSoft = async (id: number): Promise<void> => {
  await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);
};

export const deleteDepartment = async (id: number): Promise<void> => {
  // First set department_id to NULL for all users in this department
  await db.query('UPDATE users SET department_id = NULL WHERE department_id = ?', [id]);
  // Then delete the department (will fail if courses still reference it)
  await db.query('DELETE FROM departments WHERE id = ?', [id]);
};
```

---

### `backend/src/models/attendanceModel.ts`

```typescript
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export const upsertAttendance = async (studentId: number, markedBy: number, date: string, status: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO attendance (student_id, marked_by, date, status) 
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = ?, marked_by = ?, updated_at = NOW()`,
    [studentId, markedBy, date, status, status, markedBy]
  );
  return result;
};

export const getStudentAttendanceHistory = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT a.id, a.date, a.status, u.name as markedBy 
     FROM attendance a
     LEFT JOIN users u ON a.marked_by = u.id
     WHERE a.student_id = ?
     ORDER BY a.date DESC`,
    [studentId]
  );
  return rows;
};

export const getAttendanceSummary = async (studentId: number): Promise<any> => {
  const [rows]: any = await db.query(
    `SELECT 
       SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
       SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
       SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
       COUNT(*) as total
     FROM attendance 
     WHERE student_id = ?`,
    [studentId]
  );
  const summary = rows[0] || { present: 0, absent: 0, late: 0, total: 0 };
  const present = Number(summary.present || 0);
  const absent = Number(summary.absent || 0);
  const late = Number(summary.late || 0);
  const total = Number(summary.total || 0);

  const effectivePresent = present + (late * 0.5);
  const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 0;

  return { present, absent, late, total, percentage };
};

export const getDailyClassAttendance = async (date: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT a.id, u.id as studentId, u.name as studentName, u.email as studentEmail, a.status, a.date
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date = ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [date]
  );
  return rows;
};

export const getLowAttendanceList = async (threshold: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as present,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absent,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as late,
       COUNT(a.id) as total
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id
     WHERE u.role = 'student' AND u.is_active = 1
     GROUP BY u.id`
  );

  return rows.map((row: any) => {
    const present = Number(row.present);
    const absent = Number(row.absent);
    const late = Number(row.late);
    const total = Number(row.total);
    const effectivePresent = present + (late * 0.5);
    const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;
    return { id: row.id, name: row.name, email: row.email, present, absent, late, total, percentage };
  }).filter((s: any) => s.percentage < threshold);
};
```

---

### `backend/src/models/courseModel.ts`

```typescript
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
```

---

### `backend/src/models/leaveModel.ts`

```typescript
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';

export const insertLeaveRequest = async (studentId: number, reason: string, fromDate: string, toDate: string): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO leave_requests (student_id, reason, from_date, to_date, status) VALUES (?, ?, ?, ?, 'pending')`,
    [studentId, reason, fromDate, toDate]
  );
  return result;
};

export const getLeaveRequestsByStudent = async (studentId: number): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT l.id, l.reason, l.from_date as fromDate, l.to_date as toDate, l.status, l.created_at as createdAt, u.name as reviewedBy
     FROM leave_requests l
     LEFT JOIN users u ON l.reviewed_by = u.id
     WHERE l.student_id = ?
     ORDER BY l.created_at DESC`,
    [studentId]
  );
  return rows;
};

export const getAllPendingLeaveRequests = async (): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT l.id, l.reason, l.from_date as fromDate, l.to_date as toDate, l.status, l.created_at as createdAt, u.name as studentName, u.email as studentEmail
     FROM leave_requests l
     JOIN users u ON l.student_id = u.id
     WHERE l.status = 'pending'
     ORDER BY l.created_at ASC`
  );
  return rows;
};

export const updateLeaveStatus = async (id: number, status: 'approved' | 'rejected', reviewedBy: number): Promise<void> => {
  await db.query(
    `UPDATE leave_requests SET status = ?, reviewed_by = ? WHERE id = ?`,
    [status, reviewedBy, id]
  );
};

export const getLeaveRequestById = async (id: number): Promise<any> => {
  const [rows]: any = await db.query(`SELECT * FROM leave_requests WHERE id = ?`, [id]);
  return rows[0] || null;
};
```

---

### `backend/src/models/reportModel.ts`

```typescript
import db from '../config/db';

export interface DepartmentReportFilters {
  search?: string;
  page: number;
  limit: number;
  offset: number;
  sortBy: 'department' | 'attendanceRate';
  sortOrder: 'asc' | 'desc';
}

export const getDailyReportData = async (date: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id as student_id, u.name, u.email, d.name as department, COALESCE(a.status, 'absent') as status
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date = ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [date]
  );
  return rows;
};

export const getRangeReportData = async (fromDate: string, toDate: string): Promise<any[]> => {
  const [rows]: any = await db.query(
    `SELECT u.id, u.name, u.email, d.name as department,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as present_days,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absent_days,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as late_days,
       COUNT(a.id) as total_days
     FROM users u
     LEFT JOIN departments d ON u.department_id = d.id
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = 1
     GROUP BY u.id, u.name, u.email, d.name`,
    [fromDate, toDate]
  );

  return rows.map((row: any) => {
    const present = Number(row.present_days);
    const absent = Number(row.absent_days);
    const late = Number(row.late_days);
    const total = Number(row.total_days);
    const effectivePresent = present + (late * 0.5);
    const percentage = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;
    return { ...row, percentage };
  });
};

export const getInstitutionSummaryData = async (fromDate: string, toDate: string, filters: DepartmentReportFilters): Promise<any> => {
  const [overallRows]: any = await db.query(
    `SELECT 
       COUNT(DISTINCT u.id) as totalStudents,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as presentCount,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absentCount,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as lateCount
     FROM users u
     LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
     WHERE u.role = 'student' AND u.is_active = 1`,
    [fromDate, toDate]
  );
  
  const overall = overallRows[0] || { totalStudents: 0, presentCount: 0, absentCount: 0, lateCount: 0 };
  const oPresent = Number(overall.presentCount);
  const oAbsent = Number(overall.absentCount);
  const oLate = Number(overall.lateCount);
  const oTotal = oPresent + oAbsent + oLate;
  const overallAttendanceRate = oTotal > 0 ? Math.round(((oPresent + oLate * 0.5) / oTotal) * 100) : 0;

  let breakdownQuery = `
    SELECT d.name as department,
       COUNT(DISTINCT u.id) as studentCount,
       COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) as presentCount,
       COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0) as absentCount,
       COALESCE(SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END), 0) as lateCount
    FROM departments d
    LEFT JOIN users u ON d.id = u.department_id AND u.role = 'student' AND u.is_active = 1
    LEFT JOIN attendance a ON u.id = a.student_id AND a.date BETWEEN ? AND ?
  `;
  const params: any[] = [fromDate, toDate];

  if (filters.search) {
    breakdownQuery += ' AND d.name LIKE ?';
    params.push(`%${filters.search}%`);
  }

  breakdownQuery += ' GROUP BY d.id, d.name';

  const [bdRows]: any = await db.query(breakdownQuery, params);

  const formattedBD = bdRows.map((row: any) => {
    const present = Number(row.presentCount);
    const absent = Number(row.absentCount);
    const late = Number(row.lateCount);
    const total = present + absent + late;
    const attendanceRate = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0;
    return { department: row.department, studentCount: row.studentCount, attendanceRate };
  });

  if (filters.sortBy === 'attendanceRate') {
    formattedBD.sort((a: any, b: any) => filters.sortOrder === 'desc' ? b.attendanceRate - a.attendanceRate : a.attendanceRate - b.attendanceRate);
  } else {
    formattedBD.sort((a: any, b: any) => {
      const comp = a.department.localeCompare(b.department);
      return filters.sortOrder === 'desc' ? -comp : comp;
    });
  }

  const totalBreakdownCount = formattedBD.length;
  const paginatedBD = formattedBD.slice(filters.offset, filters.offset + filters.limit);

  return {
    summary: { totalStudents: overall.totalStudents, overallAttendanceRate },
    departmentBreakdown: paginatedBD,
    departmentBreakdownMeta: { total: totalBreakdownCount, page: filters.page, limit: filters.limit }
  };
};
```

---

### `backend/src/routes/adminRoutes.ts`

```typescript
import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as adminController from '../controllers/adminController';

const router = express.Router();

router.get('/users', verifyToken, requireRole('faculty', 'admin'), adminController.listUsers);

router.use(verifyToken, requireRole('admin'));
router.post('/departments', adminController.addDepartment);
router.get('/departments', adminController.listDepartments);
router.delete('/departments/:id', adminController.removeDepartment);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.removeUser);

export default router;
```

---

### `backend/src/routes/agentRoutes.ts`

```typescript
import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { handleChat, confirmAction, getChatHistory } from '../controllers/agentController';

const router = Router();

// Protect all agent endpoints behind the authentication token
router.use(verifyToken);

// Chat endpoint (now handles automatic session creation/tracking)
router.post('/chat', handleChat);

// Confirmation endpoint for pending actions
router.post('/confirm', confirmAction);

// History endpoint to fetch past logs when opening the chat window
router.get('/history/:conversationId', getChatHistory);

export default router;
```

---

### `backend/src/routes/attendanceRoutes.ts`

```typescript
import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as attendanceController from '../controllers/attendanceController';

const router = express.Router();

router.post('/mark', verifyToken, requireRole('faculty', 'admin'), attendanceController.markAttendance);
router.get('/my-history', verifyToken, requireRole('student'), attendanceController.getMyAttendance);
router.get('/my-percentage', verifyToken, requireRole('student'), attendanceController.getMyPercentage);
router.get('/class', verifyToken, requireRole('faculty', 'admin'), attendanceController.getClassAttendance);
router.get('/low-attendance', verifyToken, requireRole('faculty', 'admin'), attendanceController.getLowAttendanceStudents);

export default router;
```

---

### `backend/src/routes/authRoutes.ts`

```typescript
import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getMe, 
  logout, 
  checkAdminExists,
  getPublicDepartments // 👈 1. Import the new controller function
} from '../controllers/authController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Public — check if system admin exists (used by Register page for conditional UI)
router.get('/admin-exists', checkAdminExists);

// 🌟 THE FIX: Public endpoint allowing guest users to load departments for the dropdown
router.get('/departments', getPublicDepartments); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);

export default router;
```

---

### `backend/src/routes/courseRoutes.ts`

```typescript
import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import {
  createCourse,
  listCourses,
  getCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
  enrollStudent,
  getEnrolledStudents,
  unenrollStudent,
} from '../controllers/courseController';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole('admin'), createCourse);
router.get('/', listCourses);
router.get('/my', getMyCourses);
router.get('/:id', getCourse);
router.put('/:id', requireRole('admin'), updateCourse);
router.delete('/:id', requireRole('admin'), deleteCourse);

router.post('/:id/enroll', requireRole('admin', 'faculty'), enrollStudent);
router.get('/:id/students', getEnrolledStudents);
router.delete('/:id/students/:studentId', requireRole('admin', 'faculty'), unenrollStudent);

export default router;
```

---

### `backend/src/routes/leaveRoutes.ts`

```typescript
import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as leaveController from '../controllers/leaveController';

const router = express.Router();

router.post('/submit', verifyToken, requireRole('student'), leaveController.submitLeave);
router.get('/my-requests', verifyToken, requireRole('student'), leaveController.getMyLeaveRequests);
router.get('/pending', verifyToken, requireRole('faculty', 'admin'), leaveController.getPendingRequests);
router.patch('/:id/review', verifyToken, requireRole('faculty', 'admin'), leaveController.reviewLeave);

export default router;
```

---

### `backend/src/routes/reportRoutes.ts`

```typescript
import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as reportController from '../controllers/reportController';

const router = express.Router();

router.use(verifyToken, requireRole('faculty', 'admin'));

router.get('/daily', reportController.dailyReport);
router.get('/weekly', reportController.weeklyReport);
router.get('/monthly', reportController.monthlyReport);
router.get('/summary', reportController.institutionSummary);
router.get('/export/csv', reportController.exportCSV);
router.get('/export/pdf', reportController.exportPDF);

export default router;
```

---

### `backend/src/routes/timetableRoutes.ts`

```typescript
import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import {
  createSlot,
  getCourseTimetable,
  getMyTimetable,
  deleteSlot,
} from '../controllers/timetableController';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole('admin'), createSlot);
router.get('/my', getMyTimetable);
router.get('/course/:courseId', getCourseTimetable);
router.delete('/:id', requireRole('admin'), deleteSlot);

export default router;
```

---

### `backend/src/scripts/seedCourses.ts`

```typescript
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
```

---

### `backend/src/scripts/seedUsers.ts`

```typescript
import * as bcrypt from 'bcryptjs';
import db from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

interface SeedUser {
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  departmentId: number | null;
}

const students: SeedUser[] = [
  { name: 'Ananya Sharma', email: 'ananya.sharma@test.com', role: 'student', departmentId: 1 },
  { name: 'Rohan Verma', email: 'rohan.verma@test.com', role: 'student', departmentId: 1 },
  { name: 'Priya Nair', email: 'priya.nair@test.com', role: 'student', departmentId: 1 },
  { name: 'Karthik Iyer', email: 'karthik.iyer@test.com', role: 'student', departmentId: 2 },
  { name: 'Sneha Reddy', email: 'sneha.reddy@test.com', role: 'student', departmentId: 2 },
  { name: 'Arjun Menon', email: 'arjun.menon@test.com', role: 'student', departmentId: 1 },
  { name: 'Divya Krishnan', email: 'divya.krishnan@test.com', role: 'student', departmentId: 2 },
  { name: 'Vishal Rao', email: 'vishal.rao@test.com', role: 'student', departmentId: 1 },
];

const faculty: SeedUser[] = [
  { name: 'Dr. Meera Pillai', email: 'meera.pillai@test.com', role: 'faculty', departmentId: 1 },
  { name: 'Prof. Suresh Kumar', email: 'suresh.kumar@test.com', role: 'faculty', departmentId: 2 },
];

const DEFAULT_PASSWORD = 'password123';

const seed = async () => {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  const allUsers = [...students, ...faculty];

  for (const user of allUsers) {
    try {
      await db.query(
        `INSERT INTO users (name, email, password_hash, role, department_id, is_active)
         VALUES (?, ?, ?, ?, ?, TRUE)`,
        [user.name, user.email, passwordHash, user.role, user.departmentId]
      );
      console.log(`✅ Created: ${user.name} (${user.email}) - ${user.role}`);
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(`⏭️  Skipped (already exists): ${user.email}`);
      } else {
        console.error(`❌ Failed: ${user.email}`, err.message);
      }
    }
  }

  console.log(`\nDone. All users have password: ${DEFAULT_PASSWORD}`);
  process.exit(0);
};

seed();
```

---

### `backend/src/services/adminService.ts`

```typescript
import * as adminModel from '../models/adminModel';

export const createNewDepartment = async (name: string) => adminModel.createDepartment(name);
export const fetchDepartments = async (filters: adminModel.DepartmentFilters) => adminModel.getAllDepartments(filters);
export const fetchUsers = async (filters: adminModel.UserFilters) => adminModel.getUsers(filters);
export const isValidRole = (role: string): boolean => ['student', 'faculty', 'admin'].includes(role);
export const getUserById = async (id: number) => adminModel.getUserById(id);
export const changeUserRole = async (id: number, role: string, departmentId: number | null) =>
  adminModel.updateUserRoleAndDept(id, role, departmentId);
export const changeUserDepartment = async (id: number, departmentId: number | null) =>
  adminModel.updateUserDepartment(id, departmentId);
export const deactivateUser = async (id: number) => adminModel.deleteUserSoft(id);
export const removeDepartment = async (id: number) => adminModel.deleteDepartment(id);
```

---

### `backend/src/services/agentService.ts`

```typescript
import OpenAI from 'openai';
import { agentTools } from './agentTools';
import * as attendanceService from './attendanceService';
import * as timetableService from './timetableService';
import * as courseService from './courseService';
import db from '../config/db';

let openaiInstance: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
  if (!openaiInstance) {
    const apiKey = process.env.QWEN_API_KEY || process.env.OPENAI_API_KEY;
    const baseURL = process.env.QWEN_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      throw new Error('Missing API credentials.');
    }

    openaiInstance = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Smart Attendance Agent',
      }
    });
  }
  return openaiInstance;
};

const QWEN_MODEL = 'qwen/qwen3.6-plus';

// 👉 READ-ONLY HELPER: Resolves a student's name to their user ID in the database
async function findStudentIdByName(name: string): Promise<number | null> {
  try {
    const [rows]: any = await db.execute(
      'SELECT id FROM users WHERE LOWER(name) LIKE ? AND LOWER(role) = "student"',
      [`%${name.toLowerCase()}%`]
    );
    return rows.length > 0 ? rows[0].id : null;
  } catch (err) {
    console.error('Error finding student by name:', err);
    return null;
  }
}

async function getOrCreateSession(conversationId: string, userId: number, userContext: any): Promise<any[]> {
  const [sessionRows]: any = await db.execute('SELECT user_id FROM chat_sessions WHERE id = ?', [conversationId]);

  if (sessionRows.length === 0) {
    await db.execute('INSERT INTO chat_sessions (id, user_id) VALUES (?, ?)', [conversationId, userId]);

    // Updated instructions to enforce read-only expectations and student name lookups
    const systemPrompt = `You are a helpful and intelligent AI Assistant for the EduFlow.
Current User Context:
- User ID: ${userContext.id}
- Name: ${userContext.name}
- Email: ${userContext.email}
- Role: ${userContext.role}

Your behavior rules:
- Assist the user with their queries regarding attendance, courses, and timetable.
- This system operates in STRICTLY READ-ONLY mode. You do not possess tools to update, edit, modify, or delete records. If asked to make changes, politely explain this read-only restriction.
- Students can only view their own attendance, percentage, courses, and timetable.
- Faculty and Admin users are fully authorized to check daily class attendance lists, view low attendance reports across all students, and lookup/view the detailed attendance history of any specific student by name.
- Strictly block students from executing admin/faculty functions. If attempted, reply politely explaining lack of permission.
- IMPORTANT: When outputting tabular data like timetables or attendance records, ALWAYS use proper Markdown table formatting with explicit newlines between the header, separator, and each row.`;

    await db.execute(
      'INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)',
      [conversationId, 'system', systemPrompt]
    );
  } else {
    if (sessionRows[0].user_id !== userId) {
      throw new Error('Unauthorized: You do not own this chat session.');
    }
  }

  const [rows]: any = await db.execute(
    'SELECT role, content, tool_calls, tool_call_id FROM chat_messages WHERE session_id = ? ORDER BY id ASC',
    [conversationId]
  );

  return rows.map((row: any) => ({
    role: row.role,
    content: row.content || '',
    ...(row.tool_calls && { tool_calls: typeof row.tool_calls === 'string' ? JSON.parse(row.tool_calls) : row.tool_calls }),
    ...(row.tool_call_id && { tool_call_id: row.tool_call_id })
  }));
}

async function saveMessage(conversationId: string, role: string, content: string, toolCalls?: any, toolCallId?: string) {
  await db.execute(
    'INSERT INTO chat_messages (session_id, role, content, tool_calls, tool_call_id) VALUES (?, ?, ?, ?, ?)',
    [
      conversationId,
      role,
      content,
      toolCalls ? JSON.stringify(toolCalls) : null,
      toolCallId || null
    ]
  );
}

export const chat = async (conversationId: string, message: string, user: any): Promise<any> => {
  const openai = getOpenAIClient();
  const messages = await getOrCreateSession(conversationId, user.id, user);

  await saveMessage(conversationId, 'user', message);
  messages.push({ role: 'user', content: message });

  try {
    let response = await openai.chat.completions.create({
      model: QWEN_MODEL,
      messages,
      tools: agentTools,
      tool_choice: 'auto',
      max_tokens: 1000,
    });

    let choice = response.choices[0];
    let toolCalls = choice.message.tool_calls;

    while (toolCalls && toolCalls.length > 0) {
      const assistantContent = choice.message.content || '';
      await saveMessage(conversationId, 'assistant', assistantContent, toolCalls);

      messages.push({
        role: 'assistant',
        content: assistantContent,
        tool_calls: toolCalls
      });

      for (const toolCall of toolCalls) {
        if (toolCall.type !== 'function') continue;

        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let toolResult: any;

        try {
          if (functionName === 'get_my_attendance_history') {
            toolResult = user.role !== 'student'
              ? { error: 'Only student accounts can fetch their history.' }
              : await attendanceService.fetchStudentHistory(user.id);
          }
          else if (functionName === 'get_my_attendance_percentage') {
            toolResult = user.role !== 'student'
              ? { error: 'Only student accounts can fetch percentage.' }
              : await attendanceService.computeAttendancePercentage(user.id);
          }
          // 👉 NEW READ TOOL HANDLER: Fetches another student's history by their name (Admin/Faculty only)
          else if (functionName === 'get_student_attendance_history') {
            if (user.role !== 'faculty' && user.role !== 'admin') {
              toolResult = { error: 'Unauthorized.' };
            } else if (!args.student_name) {
              toolResult = { error: 'Student name is required.' };
            } else {
              const targetStudentId = await findStudentIdByName(args.student_name);
              if (!targetStudentId) {
                toolResult = { error: `Could not find a student named "${args.student_name}".` };
              } else {
                toolResult = await attendanceService.fetchStudentHistory(targetStudentId);
              }
            }
          }
          else if (functionName === 'get_class_attendance') {
            toolResult = (user.role !== 'faculty' && user.role !== 'admin')
              ? { error: 'Unauthorized.' }
              : await attendanceService.fetchClassAttendance(args.date);
          }
          else if (functionName === 'get_low_attendance_students') {
            toolResult = (user.role !== 'faculty' && user.role !== 'admin')
              ? { error: 'Unauthorized.' }
              : await attendanceService.fetchLowAttendanceStudents(args.threshold ?? 75);
          }
          else if (functionName === 'get_my_timetable') {
            toolResult = user.role === 'student'
              ? await timetableService.fetchStudentTimetable(user.id)
              : await timetableService.fetchFacultyTimetable(user.id);
          }
          else if (functionName === 'get_my_courses') {
            toolResult = user.role === 'student'
              ? await courseService.fetchStudentCourses(user.id)
              : await courseService.fetchCoursesByFaculty(user.id);
          }
          else {
            toolResult = { error: 'Tool unrecognized.' };
          }
        } catch (execErr: any) {
          toolResult = { error: execErr.message || 'Execution error' };
        }

        const toolContent = JSON.stringify(toolResult);
        await saveMessage(conversationId, 'tool', toolContent, null, toolCall.id);

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolContent,
        });
      }

      response = await openai.chat.completions.create({
        model: QWEN_MODEL,
        messages,
        max_tokens: 1000,
      });

      choice = response.choices[0];
      toolCalls = choice.message.tool_calls;
    }

    const finalContent = choice.message.content || '';
    await saveMessage(conversationId, 'assistant', finalContent);

    return {
      reply: finalContent,
      conversationId,
    };
  } catch (err: any) {
    console.error('Agent chat model error:', err);
    throw err;
  }
};

export const confirmPendingAction = async (conversationId: string, confirmed: boolean, user: any): Promise<any> => {
  return {
    reply: 'Action confirmation is disabled. The assistant is configured in read-only mode.',
    pendingConfirmation: null,
    conversationId
  };
};

export const getMessagesBySession = async (conversationId: string, userId: number): Promise<any[]> => {
  const [sessionRows]: any = await db.execute('SELECT user_id FROM chat_sessions WHERE id = ?', [conversationId]);

  if (sessionRows.length === 0 || sessionRows[0].user_id !== userId) {
    return [];
  }

  const [rows]: any = await db.execute(
    'SELECT role, content FROM chat_messages WHERE session_id = ? AND role IN ("user", "assistant") ORDER BY id ASC',
    [conversationId]
  );
  return rows.map((row: any, index: number) => ({
    id: `hist-${index}`,
    role: row.role,
    text: row.content || '',
    pendingConfirmation: null
  }));
};
```

---

### `backend/src/services/agentTools.ts`

```typescript
import { ChatCompletionTool } from 'openai/resources/chat/completions';

export const agentTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_my_attendance_history',
      description: 'Get the attendance history records for the current student user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_attendance_percentage',
      description: 'Get the overall attendance percentage and summary (present, absent, late counts) for the current student user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_class_attendance',
      description: 'Get daily class attendance list for a specific date (Faculty/Admin only).',
      parameters: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'The date in YYYY-MM-DD format.' },
        },
        required: ['date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_low_attendance_students',
      description: 'Fetch students with attendance percentages below a specific threshold (Faculty/Admin only).',
      parameters: {
        type: 'object',
        properties: {
          threshold: { type: 'number', description: 'The threshold percentage (e.g. 75).' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_timetable',
      description: 'Get the complete timetable schedule slots for the current student or faculty user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_courses',
      description: 'Get all the courses that the current user is enrolled in (student) or teaching (faculty).',
      parameters: { type: 'object', properties: {} },
    },
  },
  // 👉 NEW READ-ONLY TOOL: Resolves names to IDs internally to fetch individual histories safely
  {
    type: 'function',
    function: {
      name: 'get_student_attendance_history',
      description: 'Get the date-by-date attendance history records for a specific student by providing their name (Faculty/Admin only).',
      parameters: {
        type: 'object',
        properties: {
          student_name: {
            type: 'string',
            description: 'The name of the student whose attendance history needs to be checked (e.g., "Diana Prince").',
          },
        },
        required: ['student_name'],
      },
    },
  },
];
```

---

### `backend/src/services/attendanceService.ts`

```typescript
import * as attendanceModel from '../models/attendanceModel';

export const isValidStatus = (status: string): boolean => ['present', 'absent', 'late'].includes(status);
export const recordAttendance = async (studentId: number, markedBy: number, date: string, status: string) => attendanceModel.upsertAttendance(studentId, markedBy, date, status);
export const fetchStudentHistory = async (studentId: number) => attendanceModel.getStudentAttendanceHistory(studentId);
export const computeAttendancePercentage = async (studentId: number) => attendanceModel.getAttendanceSummary(studentId);
export const fetchClassAttendance = async (date: string) => attendanceModel.getDailyClassAttendance(date);
export const fetchLowAttendanceStudents = async (threshold: number) => attendanceModel.getLowAttendanceList(threshold);
```

---

### `backend/src/services/authService.ts`

```typescript
import bcrypt from 'bcryptjs';
import db from '../config/db';

export const adminExists = async (): Promise<boolean> => {
  const [rows]: any = await db.query(`SELECT COUNT(*) as count FROM users WHERE role = 'admin'`);
  return rows[0].count > 0;
};

export const isValidRegistrationRole = (role: string): boolean => {
  return ['student', 'admin'].includes(role);
};

export const registerUser = async (name: string, email: string, password_raw: string, role: string, departmentId: number | null): Promise<any> => {
  const [existing]: any = await db.query(`SELECT id FROM users WHERE email = ?`, [email]);
  if (existing.length > 0) throw new Error('User already exists');

  const isFirstAdmin = role === 'admin' && !(await adminExists());
  if (role === 'admin' && !isFirstAdmin) throw new Error('AdminAlreadyExists');

  const passwordHash = await bcrypt.hash(password_raw, 10);
  const isSystemAdmin = isFirstAdmin ? 1 : 0;

  const [res]: any = await db.query(
    `INSERT INTO users (name, email, password_hash, role, department_id, is_system_admin, is_active) 
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    [name, email, passwordHash, role, departmentId, isSystemAdmin]
  );

  return { id: res.insertId, name, email, role, departmentId, isSystemAdmin: !!isSystemAdmin };
};

export const loginUser = async (email: string, password_raw: string): Promise<any | null> => {
  const [rows]: any = await db.query(`SELECT * FROM users WHERE email = ? AND is_active = 1`, [email]);
  const user = rows[0];

  if (!user || !user.password_hash) return null;

  const valid = await bcrypt.compare(password_raw, user.password_hash);
  if (!valid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    departmentId: user.department_id,
    isSystemAdmin: !!user.is_system_admin,
  };
};

// 🌟 THE FIX: Pulls active structural entries directly from your MySQL instance
export const getAllDepartments = async (): Promise<any[]> => {
  const [rows]: any = await db.query(`SELECT id, name FROM departments ORDER BY name ASC`);
  return rows;
};
```

---

### `backend/src/services/courseService.ts`

```typescript
import * as courseModel from '../models/courseModel';

export const createNewCourse = async (data: courseModel.CourseData) => courseModel.createCourse(data);
export const fetchAllCourses = async () => courseModel.getAllCourses();
export const fetchCourseById = async (id: number) => courseModel.getCourseById(id);
export const fetchCoursesByFaculty = async (facultyId: number) => courseModel.getCoursesByFacultyId(facultyId);
export const fetchStudentCourses = async (studentId: number) => courseModel.getCoursesByStudentId(studentId);
export const updateExistingCourse = async (id: number, data: Partial<courseModel.CourseData>) => courseModel.updateCourseDetails(id, data);
export const removeCourse = async (id: number) => courseModel.deleteCourseById(id);
export const enrollStudentInCourse = async (courseId: number, studentId: number) => courseModel.enrollStudent(courseId, studentId);
export const fetchEnrolledStudents = async (courseId: number) => courseModel.getEnrolledStudentsByCourseId(courseId);
export const unenrollStudentFromCourse = async (courseId: number, studentId: number) => courseModel.unenrollStudentFromCourseId(courseId, studentId);
```

---

### `backend/src/services/leaveService.ts`

```typescript
import * as leaveModel from '../models/leaveModel';

export const validateLeaveDates = (fromDate: string, toDate: string): boolean => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  return start <= end;
};

export const createLeaveRequest = async (studentId: number, reason: string, fromDate: string, toDate: string) => leaveModel.insertLeaveRequest(studentId, reason, fromDate, toDate);
export const fetchMyLeaveRequests = async (studentId: number) => leaveModel.getLeaveRequestsByStudent(studentId);
export const fetchPendingLeaveRequests = async () => leaveModel.getAllPendingLeaveRequests();
export const processLeaveDecision = async (id: number, decision: 'approved' | 'rejected', reviewedBy: number) => {
  const request = await leaveModel.getLeaveRequestById(id);
  if (!request) return { success: false, error: 'Leave request not found', statusCode: 404 };
  if (request.status !== 'pending') return { success: false, error: 'Leave request already reviewed', statusCode: 400 };

  await leaveModel.updateLeaveStatus(id, decision, reviewedBy);
  return { success: true };
};
```

---

### `backend/src/services/reportService.ts`

```typescript
import * as reportModel from '../models/reportModel';
import { Parser } from 'json2csv';

export const fetchDailyReport = async (date: string) => reportModel.getDailyReportData(date);
export const fetchRangeReport = async (fromDate: string, toDate: string) => reportModel.getRangeReportData(fromDate, toDate);
export const fetchInstitutionSummary = async (fromDate: string, toDate: string, filters: reportModel.DepartmentReportFilters) => reportModel.getInstitutionSummaryData(fromDate, toDate, filters);

export const generateCSV = async (fromDate: string, toDate: string): Promise<string> => {
  const records = await reportModel.getRangeReportData(fromDate, toDate);
  const fields = [
    { label: 'Student Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Department', value: 'department' },
    { label: 'Present Days', value: 'present_days' },
    { label: 'Absent Days', value: 'absent_days' },
    { label: 'Late Days', value: 'late_days' },
    { label: 'Attendance Percentage (%)', value: 'percentage' },
  ];
  const parser = new Parser({ fields });
  return parser.parse(records);
};
```

---

### `backend/src/services/timetableService.ts`

```typescript
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
```

---

### `backend/src/services/tokenService.ts`

```typescript
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

// Cast the fallback string to match the expected SignOptions['expiresIn'] type
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

export const createAccessToken = (user: any): string => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
```

---

### `backend/src/swagger.ts`

```typescript
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Attendance API',
      version: '1.0.0',
      description: 'API documentation for the Smart Attendance System',
    },
    servers: [{ url: '/api', description: 'Local API' }],
  },
  // Scan source files for JSDoc/OpenAPI annotations (controllers and routes)
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
```

---

### `backend/src/types/custom.d.ts`

```typescript
declare module 'swagger-ui-express';
declare module 'swagger-jsdoc';
declare module 'cookie-parser';
```

---

### `backend/src/types/index.ts`

```typescript
import { Request } from 'express';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  departmentId: number | null;
  isSystemAdmin?: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AppUser;
}

export interface UserRow {
  id: number;
  firebase_uid: string | null;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'faculty' | 'admin';
  department_id: number | null;
  created_at: Date;
  is_active: boolean;
}

export interface AttendanceRow {
  id: number;
  student_id: number;
  marked_by: number;
  date: string;
  status: 'present' | 'absent' | 'late';
  created_at: Date;
  updated_at: Date;
}

export interface LeaveRequestRow {
  id: number;
  student_id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: number | null;
  created_at: Date;
}

export interface DepartmentRow {
  id: number;
  name: string;
  created_at: Date;
}
```

---

### `backend/src/utils/apiResponse.ts`

```typescript
import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const success = (res: Response, data: any, message = 'OK', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const error = (res: Response, message = 'Internal Server Error', status = 500, details?: any) => {
  const payload: any = { success: false, message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
};

type SuccessOptions<T> = {
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
  statusCode?: number;
};

type PaginatedOptions<T> = {
  data: T;
  pagination: PaginationMeta;
  message?: string;
  statusCode?: number;
};

export const sendSuccess = <T>(
  res: Response,
  { data, message = 'Request completed successfully', meta, statusCode = 200 }: SuccessOptions<T>
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const sendPaginated = <T>(
  res: Response,
  { data, pagination, message = 'Request completed successfully', statusCode = 200 }: PaginatedOptions<T>
) => {
  return sendSuccess(res, {
    data,
    message,
    meta: { pagination },
    statusCode,
  });
};

export const createPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

export default { success, error, sendSuccess, sendPaginated, createPaginationMeta };
```

---

### `backend/src/utils/dateHelpers.ts`

```typescript
export interface DateRange {
  fromDate: string;
  toDate: string;
}

export const getWeekRange = (dateStr: string): DateRange => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    fromDate: monday.toISOString().split('T')[0],
    toDate: sunday.toISOString().split('T')[0],
  };
};

export const getMonthRange = (month: number, year: number): DateRange => {
  const fromDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const toDate = new Date(year, month, 0).toISOString().split('T')[0];
  return { fromDate, toDate };
};
```

---

### `backend/src/utils/logger.ts`

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
```

---

### `backend/src/utils/pagination.ts`

```typescript
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export const getPagination = (page = 1, limit = 10) => {
  const p = Math.max(1, Number(page || 1));
  const l = Math.max(1, Number(limit || 10));
  const offset = (p - 1) * l;
  return { page: p, limit: l, offset };
};

export const getPagingData = (totalItems: number, page: number, limit: number) => {
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage };
};

export default { getPagination, getPagingData };
import { AppError } from '../middleware/errorHandler';

export interface PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}

export interface SortingOptions<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: 'asc' | 'desc';
}

export const parsePositiveInt = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
};

export const parsePaginationOptions = (query: Record<string, unknown>, defaults = { page: 1, limit: 10 }): PaginationOptions => {
  const page = parsePositiveInt(query.page, defaults.page);
  const limit = Math.min(parsePositiveInt(query.limit, defaults.limit), 100);

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};

export const parseSortOrder = (value: unknown): 'asc' | 'desc' => {
  if (typeof value === 'string' && value.toLowerCase() === 'asc') {
    return 'asc';
  }

  return 'desc';
};

export const parseSortBy = <TSortBy extends string>(
  value: unknown,
  allowed: readonly TSortBy[],
  fallback: TSortBy
): TSortBy => {
  if (typeof value !== 'string') {
    return fallback;
  }

  if (!allowed.includes(value as TSortBy)) {
    throw new AppError(`Invalid sortBy value. Allowed values: ${allowed.join(', ')}`, 400, 'INVALID_SORT');
  }

  return value as TSortBy;
};
```

---

### `backend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "node16",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": false,
    "moduleResolution": "node16"
  },
  "include": ["src/**/*.ts", "server.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

### `docs/schema.sql`

```sql
CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    role ENUM('student', 'faculty', 'admin') NOT NULL,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    faculty_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (faculty_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS attendance (
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

CREATE TABLE IF NOT EXISTS leave_requests (
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

-- Note: courses, course_enrollments, and timetable_slots were created by Drizzle.
```

---

### `docs/seed.sql`

```sql
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
```

---

### `frontend/.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
. e n v  
 
```

---

### `frontend/Dockerfile`

```text
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm install @rolldown/binding-linux-x64-gnu lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu --no-save

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### `frontend/README.md`

```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
```

---

### `frontend/eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
```

---

### `frontend/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Modern minimalist app favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%232563eb%22/><text y=%2270%22 x=%2220%22 fill=%22white%22 font-family=%22sans-serif%22 font-size=%2260%22 font-weight=%22bold%22>A</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <title>EduFlow</title>
    <script>
      (function () {
        var stored = localStorage.getItem('theme');
        var isDark =
          stored === 'dark' ||
          (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) document.documentElement.classList.add('dark');
      })();
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### `frontend/package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest",
    "test:ci": "vitest --run",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@tailwindcss/vite": "^4.3.2",
    "@tanstack/react-query": "^5.101.2",
    "axios": "^1.18.1",
    "lucide-react": "^1.23.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.81.0",
    "react-markdown": "^10.1.0",
    "react-router-dom": "^7.18.1",
    "remark-gfm": "^4.0.1",
    "tailwindcss": "^4.3.2",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "jsdom": "^22.1.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.62.0",
    "vite": "^8.1.1",
    "vitest": "^1.2.2"
  }
}
```

---

### `frontend/public/icons.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

---

### `frontend/src/App.css`

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

---

### `frontend/src/App.tsx`

```tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentOverview from './pages/student/StudentOverview';
import ApplyLeave from './pages/student/ApplyLeave';
import ViewAttendance from './pages/student/ViewAttendance';
import FacultyOverview from './pages/faculty/FacultyOverview';
import MarkAttendance from './pages/faculty/MarkAttendance';
import LeaveRequests from './pages/faculty/LeaveRequests';
import AdminOverview from './pages/admin/AdminOverview';
import Departments from './pages/admin/Departments';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import CourseManagement from './pages/admin/CourseManagement';
import TimetableManagement from './pages/admin/TimetableManagement';
import MyTimetable from './pages/MyTimetable';

function App() {
  const { appUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!appUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
        {/* Student Routes */}
        {appUser.role === 'student' && (
          <>
            <Route path="/dashboard" element={<StudentOverview />} />
            <Route path="/dashboard/my-attendance" element={<ViewAttendance />} />
            <Route path="/dashboard/apply-leave" element={<ApplyLeave />} />
            <Route path="/dashboard/timetable" element={<MyTimetable />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Faculty Routes */}
        {appUser.role === 'faculty' && (
          <>
            <Route path="/dashboard" element={<FacultyOverview />} />
            <Route path="/dashboard/attendance" element={<MarkAttendance />} />
            <Route path="/dashboard/leave" element={<LeaveRequests />} />
            <Route path="/dashboard/timetable" element={<MyTimetable />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

        {/* Admin Routes */}
        {appUser.role === 'admin' && (
          <>
            <Route path="/dashboard" element={<AdminOverview />} />
            <Route path="/dashboard/departments" element={<Departments />} />
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/courses" element={<CourseManagement />} />
            <Route path="/dashboard/timetable" element={<TimetableManagement />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
```

---

### `frontend/src/__tests__/sanity.test.ts`

```typescript
import { it, expect } from 'vitest';

it('sanity: 1+1=2', () => {
  expect(1 + 1).toBe(2);
});
```

---

### `frontend/src/api/axiosClient.ts`

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Keep sending HttpOnly cookies if backend requires them
});

// 👉 ADDED: Request interceptor to dynamically inject the absolute freshest token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Grabs the token of whoever is currently logged in
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout will be handled by AuthProvider when receiving 401
    }
    if (error.response?.data?.error && typeof error.response.data.error === 'object') {
      error.message = error.response.data.error.message || 'An error occurred';
    } else if (typeof error.response?.data?.error === 'string') {
      error.message = error.response.data.error;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

### `frontend/src/components/AgentChat.tsx`

```tsx
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Check, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import apiClient from '../api/axiosClient';
import { useAuth } from '../hooks/useAuth';

interface PendingConfirmation {
  toolName: string;
  input: Record<string, unknown>;
  toolCallId: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  pendingConfirmation?: PendingConfirmation | null;
}

let messageIdCounter = 0;
const nextId = () => `msg-${Date.now()}-${messageIdCounter++}`;

const AgentChat = () => {
  const { appUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sessionKey = appUser ? `active_chat_session_id_${appUser.id}` : 'active_chat_session_id_guest';
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedId = sessionStorage.getItem(sessionKey);
      Promise.resolve().then(() => {
        setConversationId(savedId);
        setMessages([]);
      });
    }
  }, [sessionKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
      if (isOpen && conversationId) {
        setLoading(true);
        try {
          const res = await apiClient.get(`/agent/history/${conversationId}`);
          setMessages(res.data || []);
        } catch (err) {
          console.error('Failed to sync history', err);
        } finally {
          setLoading(false);
        }
      }
    };
    void loadHistory();
  }, [isOpen, conversationId]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const userText = input;
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: userText }]);
    setInput('');

    try {
      const res = await apiClient.post('/agent/chat', {
        message: userText,
        conversationId,
      });

      const newSessionId = res.data.conversationId;
      setConversationId(newSessionId);
      sessionStorage.setItem(sessionKey, newSessionId);

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: res.data.reply, pendingConfirmation: res.data.pendingConfirmation },
      ]);
    } catch (err: unknown) {
      console.error('Agent chat error', err);
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (confirmed: boolean) => {
    setLoading(true);
    if (!conversationId) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post('/agent/confirm', { conversationId, confirmed });
      setMessages((prev) => [
        ...prev.map((m) => (m.pendingConfirmation ? { ...m, pendingConfirmation: null } : m)),
        { id: nextId(), role: 'assistant', text: res.data.reply },
      ]);
    } catch (err: unknown) {
      console.error('Agent confirmation error', err);
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: 'Failed to process confirmation.' }]);
    } finally {
      setLoading(false);
    }
  };

  const isStaff = appUser?.role === 'admin' || appUser?.role === 'faculty';

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close assistant' : 'Open attendance assistant'}
        className="fixed bottom-[4.75rem] right-4 md:bottom-6 md:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors z-50 ring-4 ring-white/80 dark:ring-slate-900/80"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-[8.25rem] right-4 left-4 md:left-auto md:bottom-24 md:right-6 md:w-96 md:max-w-none max-w-lg mx-auto md:mx-0 h-[min(420px,calc(100vh-11rem))] md:h-[460px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 shrink-0">
            <p className="font-semibold text-sm">Attendance Assistant</p>
            <p className="text-xs text-slate-400">Ask me to check or update attendance</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {messages.length === 0 && !loading && (
              <p className="text-xs md:text-sm text-slate-400 text-center mt-6 px-4">
                {isStaff ? (
                  <span>Try: &quot;Show me students below 75% attendance&quot;</span>
                ) : (
                  <span>Try: &quot;What is my attendance percentage?&quot;</span>
                )}
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                  {msg.pendingConfirmation && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => void handleConfirm(true)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button
                        onClick={() => void handleConfirm(false)}
                        disabled={loading}
                        className="flex items-center gap-1 bg-slate-300 text-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-200 disabled:opacity-50"
                      >
                        <XCircle className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-slate-400">Thinking...</p>}
          </div>

          <div className="p-2.5 md:p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0 bg-white dark:bg-slate-950">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void sendMessage()}
              placeholder="Ask something..."
              className="flex-1 min-w-0 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => void sendMessage()}
              disabled={loading}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentChat;
```

---

### `frontend/src/components/ErrorBoundary.tsx`

```tsx
import React from 'react';

type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<React.PropsWithChildren<Record<string, unknown>>, State> {
  constructor(props: React.PropsWithChildren<Record<string, unknown>>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: false, error };
  }

  componentDidCatch(): void {
    // optional: send to remote logging
    // console.error('Uncaught error in component tree');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-600 mb-4">An unexpected error occurred. Please try again or contact support.</p>
            <details className="whitespace-pre-wrap text-xs text-gray-500">
              {this.state.error?.stack}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
```

---

### `frontend/src/components/Layout.tsx`

```tsx
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
import AgentChat from './AgentChat';
import apiClient from '../api/axiosClient';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out of the session?')) return;
    try {
      localStorage.removeItem('token');
      await apiClient.post('/auth/logout').catch(() => {});
    } catch (err) {
      console.error('Logout error context:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  const isMainOverviewPage =
    location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:min-h-screen">
        <header className="sticky top-0 z-30 flex justify-between items-center px-4 py-2.5 md:px-5 md:py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm transition-colors shadow-sm">
          <div>
            {!isMainOverviewPage ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all outline-none"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Back to </span>Overview
              </button>
            ) : (
              <div className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Overview
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 md:p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors border border-transparent outline-none"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all outline-none"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-5 lg:p-6 pb-24 md:pb-6 overflow-y-auto overflow-x-hidden w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      <AgentChat />
    </div>
  );
};

export default Layout;
```

---

### `frontend/src/components/Loader.tsx`

```tsx
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-200">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        {/* Spinning Indicator */}
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
        Loading system assets...
      </p>
    </div>
  );
};
export default Loader;
```

---

### `frontend/src/components/Sidebar.tsx`

```tsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { appUser } = useAuth();

  const studentLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const facultyLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/attendance', label: 'Mark Attendance', icon: CalendarCheck, shortLabel: 'Mark' },
    { to: '/dashboard/leave', label: 'Leave Requests', icon: ClipboardList, shortLabel: 'Leave' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, shortLabel: 'Home' },
    { to: '/dashboard/departments', label: 'Departments', icon: Building2, shortLabel: 'Depts' },
    { to: '/dashboard/users', label: 'Users', icon: Users, shortLabel: 'Users' },
    { to: '/dashboard/reports', label: 'Reports', icon: FileText, shortLabel: 'Reports' },
    { to: '/dashboard/courses', label: 'Courses', icon: BookOpen, shortLabel: 'Courses' },
    { to: '/dashboard/timetable', label: 'Timetable', icon: Calendar, shortLabel: 'Time' },
  ];

  const links =
    appUser?.role === 'admin' ? adminLinks : appUser?.role === 'faculty' ? facultyLinks : studentLinks;

  return (
    <>
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-52 md:shrink-0 md:flex-col md:border-r md:border-slate-200/80 md:bg-slate-50/80 md:p-3 dark:md:border-slate-800/80 dark:md:bg-slate-950 transition-colors duration-200">
        <div className="flex items-center gap-2.5 px-2 py-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
            <GraduationCap className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200 leading-tight">
            Smart Attendance
          </span>
        </div>

        <nav className="flex flex-col flex-1 space-y-0.5 overflow-y-auto">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate text-[13px] font-medium">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-3 border-t border-slate-200/60 text-[10px] text-slate-400 dark:border-slate-800 px-2">
          Logged in as{' '}
          <span className="font-semibold text-slate-600 dark:text-slate-300 capitalize">{appUser?.role}</span>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <div className="flex items-stretch overflow-x-auto scrollbar-none px-1 py-1.5 gap-0.5">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex min-w-[4.25rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-200/70 text-slate-900 font-semibold dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-[9px] font-medium leading-tight text-center">{link.shortLabel}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
```

---

### `frontend/src/components/ThemeToggle.tsx`

```tsx
import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-base transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
      aria-label="Toggle theme"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};
```

---

### `frontend/src/context/AuthContext.tsx`

```tsx
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import apiClient from '../api/axiosClient';
import { AuthContext, type AppUser } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        const res = await apiClient.get('/auth/me');

        // backend uses a consistent envelope: { success, message, data }
        // data may be either the user object or { user }
        const user = res.data?.data?.user ?? res.data?.data ?? null;

        if (isMounted) {
          setAppUser(user);
        }
      } catch {
        if (isMounted) {
          setAppUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    const user = res.data?.data?.user ?? res.data?.data ?? null;
    setAppUser(user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // ignore
    }
    setAppUser(null);
  };

  return (
    <AuthContext.Provider value={{ appUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### `frontend/src/context/auth-context.ts`

```typescript
import { createContext } from 'react';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  departmentId: number | null;
}

export interface AuthContextType {
  appUser: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

---

### `frontend/src/hooks/useAuth.ts`

```typescript
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
```

---

### `frontend/src/hooks/useTheme.ts`

```typescript
import { useEffect, useState } from 'react';
import { applyTheme, getInitialTheme } from '../lib/theme';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return { darkMode, toggleTheme };
}
```

---

### `frontend/src/index.css`

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer utilities {
  .gradient-mesh {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
    position: relative;
    overflow: hidden;
  }

  .gradient-mesh::before,
  .gradient-mesh::after {
    content: '';
    position: absolute;
    border-radius: 9999px;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .gradient-mesh::before {
    width: 500px;
    height: 500px;
    background: #6366f1;
    top: -100px;
    left: -100px;
  }

  .gradient-mesh::after {
    width: 400px;
    height: 400px;
    background: #22d3ee;
    bottom: -80px;
    right: -80px;
    animation-delay: -10s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(60px, 40px); }
  }

  .glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
}

@layer components {
  .page-header {
    @apply mb-4 md:mb-6;
  }

  .page-title {
    @apply text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white;
  }

  .page-subtitle {
    @apply text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5;
  }

  .stat-grid {
    @apply grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6;
  }

  .stat-grid-3 {
    @apply grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6;
  }

  .stat-card {
    @apply bg-white dark:bg-slate-950 rounded-lg border border-slate-200/80 dark:border-slate-800 p-3 md:p-4 relative overflow-hidden shadow-sm;
  }

  .stat-card-label {
    @apply text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-snug;
  }

  .stat-card-value {
    @apply text-xl md:text-2xl font-bold mt-1.5 md:mt-2 text-slate-900 dark:text-white tracking-tight;
  }

  .action-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4;
  }

  .action-card {
    @apply bg-white dark:bg-slate-950 rounded-lg border border-slate-200/80 dark:border-slate-800 p-3 md:p-4 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all flex items-center justify-between gap-3;
  }

  .action-card-icon {
    @apply p-2 rounded-lg shrink-0 transition-transform group-hover:scale-105;
  }

  .panel-card {
    @apply bg-white dark:bg-slate-950 rounded-lg border border-slate-200/80 dark:border-slate-800 p-3 md:p-4 shadow-sm;
  }
}
```

---

### `frontend/src/lib/theme.ts`

```typescript
const THEME_KEY = 'theme';

export function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark') return true;
  if (stored === 'light') return false;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(isDark: boolean): void {
  if (typeof document === 'undefined') return;

  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}
```

---

### `frontend/src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';
import { applyTheme, getInitialTheme } from './lib/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

applyTheme(getInitialTheme());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
```

---

### `frontend/src/pages/Login.tsx`

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../schemas/authSchemas';
import type { LoginFormData } from '../schemas/authSchemas';

const Login = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get('registered') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: unknown) {
      let message = 'Invalid email or password';

      if (typeof err === 'object' && err !== null && 'response' in err) {
        const response = (err as { response?: unknown }).response;
        if (typeof response === 'object' && response !== null && 'data' in response) {
          const dataObj = (response as { data?: unknown }).data;
          if (typeof dataObj === 'object' && dataObj !== null && 'error' in dataObj) {
            const errorValue = (dataObj as { error?: unknown }).error;
            if (typeof errorValue === 'string') {
              message = errorValue;
            } else if (
              typeof errorValue === 'object' &&
              errorValue !== null &&
              'message' in errorValue &&
              typeof (errorValue as { message?: unknown }).message === 'string'
            ) {
              message = (errorValue as { message: string }).message;
            }
          }
        }
      }

      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 w-full max-w-md p-8 relative z-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
          </div>
          <span className="font-semibold text-lg text-slate-900 dark:text-white">EduFlow</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 text-center">Welcome back</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center">Sign in to continue to your dashboard</p>

        {justRegistered && (
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-sm mb-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-400/20 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Account created successfully. Please log in.
          </div>
        )}

        {apiError && (
          <div className="text-red-700 dark:text-red-300 text-sm mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/20 rounded-lg p-3">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email')}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                placeholder="you@institution.edu"
              />
            </div>
            {errors.email && <p className="text-red-600 dark:text-red-300 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register('password')}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-600 dark:text-red-300 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors disabled:opacity-50 shadow-md shadow-indigo-500/20 dark:shadow-indigo-500/30"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 dark:text-indigo-300 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

---

### `frontend/src/pages/MyTimetable.tsx`

```tsx
import { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import Layout from '../components/Layout';
import type { StudentTimetableEntry } from '../types/course';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const MyTimetable = () => {
  const [entries, setEntries] = useState<StudentTimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/timetable/my-timetable');
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to load timetable', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const entriesForDay = (day: string) =>
    entries.filter((e) => e.dayOfWeek === day).sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">My Timetable</h1>

      {entries.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 text-center text-slate-400">
          No timetable entries yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DAYS.map((day) => (
            <div key={day} className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
              <p className="font-semibold text-sm text-slate-900 dark:text-white mb-3 capitalize">{day}</p>
              <div className="space-y-2">
                {entriesForDay(day).length === 0 && (
                  <p className="text-xs text-slate-300 dark:text-slate-600">No classes</p>
                )}
                {entriesForDay(day).map((e, i) => (
                  <div key={i} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2 border-l-2 border-indigo-500">
                    <p className="text-xs font-medium text-indigo-900 dark:text-indigo-300">{e.courseCode}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{e.startTime.slice(0, 5)} - {e.endTime.slice(0, 5)}</p>
                    {e.room && <p className="text-xs text-slate-400 dark:text-slate-500">{e.room}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MyTimetable;
```

---

### `frontend/src/pages/Register.tsx`

```tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Building2 } from 'lucide-react';
import apiClient from '../api/axiosClient';
import type { AxiosError } from 'axios';

interface DepartmentRecord {
  id: number;
  name: string;
}

const Register = () => {
  const navigate = useNavigate();

  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState(''); // Tracks the numeric ID string

  // UI Dataset States
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamically pull latest database departments created by Admin
  useEffect(() => {
    const fetchLiveDepartments = async () => {
      try {
        const response = await apiClient.get('/departments');
        const data = response.data?.data ?? response.data ?? [];
        setDepartments(Array.isArray(data) ? data : []);
      } catch {
        try {
          // Fallback route context check
          const fallbackRes = await apiClient.get('/auth/departments');
          const data = fallbackRes.data?.data ?? fallbackRes.data ?? [];
          setDepartments(Array.isArray(data) ? data : []);
        } catch (fallbackErr) {
          console.error('Could not load institutional departments:', fallbackErr);
        }
      }
    };
    void fetchLiveDepartments();
  }, []);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!departmentId) {
      setError('Please select your institutional department.');
      setLoading(false);
      return;
    }

    try {
      // 🎯 Fixed: Sends 'departmentId' as an integer and forces 'role' to 'student'
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role: 'student',
        departmentId: Number(departmentId)
      });

      navigate('/login');
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Registration failed. Please check your entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Branding Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold text-white tracking-wide">EduFlow</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Create your account</h2>
          <p className="text-sm text-slate-400 mt-1">Get started in a few seconds</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* Security configuration prevents basic browser cache injection fields */}
        <form onSubmit={handleRegisterSubmit} autoComplete="new-password" name="signup-secure-matrix" className="space-y-4">

          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayrton Senna"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayrton.s@gmail.com"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="new-password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Dynamic Database Dropdown Menu */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Department</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                required
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled className="bg-slate-900 text-slate-500">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id} className="bg-slate-900 text-white">
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submission Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Registering Account...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
```

---

### `frontend/src/pages/admin/AdminDashboard.tsx`

```tsx
import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
}

interface Department {
  id: number;
  name: string;
}

interface Summary {
  total_students: number;
  total_records: number;
  total_present: number;
  total_absent: number;
  total_late: number;
  overall_percentage: number;
}

interface DeptBreakdown {
  department: string;
  total_students: number;
  percentage: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [deptBreakdown, setDeptBreakdown] = useState<DeptBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  const [newDeptName, setNewDeptName] = useState('');
  const [deptSaving, setDeptSaving] = useState(false);
  const [search, setSearch] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        setLoading(true);
        try {
          const [usersRes, deptRes, summaryRes] = await Promise.all([
            apiClient.get('/admin/users'),
            apiClient.get('/admin/departments'),
            apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`),
          ]);
          setUsers(usersRes.data?.data ?? usersRes.data);
          setDepartments(deptRes.data?.data ?? deptRes.data);
          setSummary(summaryRes.data?.data?.summary ?? summaryRes.data?.summary ?? null);
          const deptRaw = summaryRes.data?.data?.departmentBreakdown ?? summaryRes.data?.departmentBreakdown ?? [];
          setDeptBreakdown(Array.isArray(deptRaw) ? deptRaw : deptRaw?.rows ?? []);
        } catch (err) {
          console.error('Failed to load admin dashboard data', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [monthStart, today]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, deptRes, summaryRes] = await Promise.all([
        apiClient.get('/admin/users'),
        apiClient.get('/admin/departments'),
        apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`),
      ]);
      setUsers(usersRes.data?.data ?? usersRes.data);
      setDepartments(deptRes.data?.data ?? deptRes.data);
      setSummary(summaryRes.data?.data?.summary ?? summaryRes.data?.summary ?? null);
      const deptRaw = summaryRes.data?.data?.departmentBreakdown ?? summaryRes.data?.departmentBreakdown ?? [];
      setDeptBreakdown(Array.isArray(deptRaw) ? deptRaw : deptRaw?.rows ?? []);
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    setDeptSaving(true);
    try {
      await apiClient.post('/admin/departments', { name: newDeptName });
      setNewDeptName('');
      await loadData();
    } catch (err) {
      console.error('Failed to add department', err);
    } finally {
      setDeptSaving(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.get(`/admin/users?search=${encodeURIComponent(search)}`);
      setUsers(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await apiClient.delete(`/admin/users/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_students ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Overall Attendance</p>
          <p className="text-3xl font-bold mt-1">{summary?.overall_percentage ?? 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Present (This Month)</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_present ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">Absent (This Month)</p>
          <p className="text-3xl font-bold mt-1">{summary?.total_absent ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Department-wise Attendance</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {deptBreakdown.length === 0 && <p className="text-sm text-gray-400">No data yet.</p>}
            {deptBreakdown.map((d, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{d.department || 'Unassigned'}</span>
                <span className="text-sm font-medium">{d.percentage ?? 0}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Manage Departments</h2>
          <form onSubmit={handleAddDepartment} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="New department name"
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={deptSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </form>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {departments.map((d) => (
              <div key={d.id} className="text-sm border-b pb-1">{d.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">All Users</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="border rounded px-3 py-1.5 text-sm"
            />
            <button type="submit" className="bg-gray-100 px-3 py-1.5 rounded text-sm hover:bg-gray-200">
              Search
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Department</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 capitalize">{u.role}</td>
                  <td className="py-2">{u.department || '-'}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
```

---

### `frontend/src/pages/admin/AdminOverview.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, FileText, ArrowRight } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

interface Summary {
  total_students: number;
  overall_percentage: number;
  total_present: number;
  total_absent: number;
}

const AdminOverview = () => {
  const { appUser } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
          const summaryObj = res.data?.data?.summary ?? res.data?.summary ?? null;
          setSummary(summaryObj);
        } catch (err) {
          console.error('Failed to load summary', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [monthStart, today]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading system overview data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome, {appUser?.name}</h1>
        <p className="page-subtitle">Institution-wide overview for this month.</p>
      </div>

      <div className="stat-grid">
        {[
          { label: 'Total Students', value: summary?.total_students ?? 0, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Overall Attendance', value: `${summary?.overall_percentage ?? 0}%`, line: 'from-emerald-500 to-green-400' },
          { label: 'Present (Month)', value: summary?.total_present ?? 0, line: 'from-indigo-500 to-purple-400' },
          { label: 'Absent (Month)', value: summary?.total_absent ?? 0, line: 'from-red-500 to-pink-400' },
        ].map((card, i) => (
          <div key={i} className="stat-card flex flex-col justify-between">

            <span className="stat-card-label">{card.label}</span>
            <p className="stat-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="action-grid">
        {[
          { to: '/dashboard/departments', icon: Building2, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400', title: 'Departments', desc: 'Manage institution departments' },
          { to: '/dashboard/users', icon: Users, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-400', title: 'Users', desc: 'Manage students, faculty, and admins' },
          { to: '/dashboard/reports', icon: FileText, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400', title: 'Reports', desc: 'Department breakdown and exports' },
        ].map((link, i) => {
          const Icon = link.icon;
          return (
            <Link key={i} to={link.to} className="group action-card">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`action-card-icon ${link.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{link.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{link.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default AdminOverview;
```

---

### `frontend/src/pages/admin/CourseManagement.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { courseSchema } from '../../schemas/courseSchema';
import type { CourseFormInput, CourseFormData } from '../../schemas/courseSchema';
import type { Course } from '../../types/course';

interface Department {
  id: number;
  name: string;
}

interface FacultyUser {
  id: number;
  name: string;
  email: string;
}

interface StudentUser {
  id: number;
  name: string;
  email: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [facultyList, setFacultyList] = useState<FacultyUser[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [enrolledMap, setEnrolledMap] = useState<Record<number, number[]>>({});
  const [pendingEnrollments, setPendingEnrollments] = useState<Record<number, number[]>>({});
  const [savingEnrollments, setSavingEnrollments] = useState<Record<number, boolean>>({});
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editFacultyId, setEditFacultyId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormInput, unknown, CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: { credits: 3 },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, deptRes, facultyRes, studentsRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/admin/departments'),
        apiClient.get('/admin/users?role=faculty'),
        apiClient.get('/admin/users?role=student'),
      ]);
      setCourses(coursesRes.data);
      setDepartments(deptRes.data.data || deptRes.data);
      setFacultyList(facultyRes.data.data || facultyRes.data);
      setStudents(studentsRes.data.data || studentsRes.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrollments = async (courseId: number) => {
    try {
      const res = await apiClient.get(`/courses/${courseId}/students`);
      const raw = (res.data ?? []) as Array<Record<string, unknown>>;
      const ids = raw
        .map((e) => {
          const raw_id = e.studentId ?? e.student_id ?? e.id;
          return typeof raw_id === 'number' ? raw_id : Number(raw_id);
        })
        .filter((n) => !isNaN(n) && n > 0);
      setEnrolledMap((prev) => ({ ...prev, [courseId]: ids }));
    } catch (err) {
      console.error('Failed to load enrollments', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const onSubmit = async (data: CourseFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/courses', data);
      reset({ credits: 3, name: '', code: '', departmentId: undefined, facultyId: undefined } as CourseFormInput);
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to create course';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      setApiError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course? This will also remove its enrollments and timetable slots.')) return;
    try {
      await apiClient.delete(`/courses/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete course', err);
    }
  };

  const toggleExpand = (courseId: number) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
      return;
    }
    setExpandedCourseId(courseId);
    void loadEnrollments(courseId);
  };

  const handlePendingToggle = (courseId: number, studentId: number) => {
    setPendingEnrollments((prev) => {
      const current = prev[courseId] ?? [...(enrolledMap[courseId] ?? [])];
      const isChecked = current.includes(studentId);
      return {
        ...prev,
        [courseId]: isChecked ? current.filter((id) => id !== studentId) : [...current, studentId],
      };
    });
  };

  const saveEnrollments = async (courseId: number) => {
    setSavingEnrollments((prev) => ({ ...prev, [courseId]: true }));
    const original = enrolledMap[courseId] ?? [];
    const pending = pendingEnrollments[courseId] ?? original;
    const toAdd = pending.filter((id) => !original.includes(id));
    const toRemove = original.filter((id) => !pending.includes(id));
    try {
      await Promise.all([
        ...toAdd.map((studentId) => apiClient.post(`/courses/${courseId}/enroll`, { studentId })),
        ...toRemove.map((studentId) => apiClient.delete(`/courses/${courseId}/students/${studentId}`)),
      ]);
      await loadEnrollments(courseId);
      setPendingEnrollments((prev) => { const next = { ...prev }; delete next[courseId]; return next; });
    } catch (err) {
      console.error('Failed to save enrollments', err);
    } finally {
      setSavingEnrollments((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const startEditFaculty = (course: Course) => {
    setEditingCourseId(course.id);
    setEditFacultyId(course.facultyId ? String(course.facultyId) : '');
  };

  const saveEditFaculty = async (courseId: number) => {
    try {
      await apiClient.put(`/courses/${courseId}`, {
        facultyId: editFacultyId ? Number(editFacultyId) : null,
      });
      setEditingCourseId(null);
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to update faculty assignment';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      alert(message);
    }
  };

  // Enrollment is now managed via handlePendingToggle + saveEnrollments

  const getDeptName = (id: number) => departments.find((d) => d.id === id)?.name || '-';
  const getFacultyName = (id: number | null) => facultyList.find((f) => f.id === id)?.name || 'Unassigned';

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">Course Management</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Add New Course</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
          <div>
            <input
              type="text"
              {...register('name')}
              placeholder="Course name"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="text"
              {...register('code')}
              placeholder="Course code"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            {errors.code && <p className="text-red-600 text-xs mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <select {...register('departmentId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id} className="dark:bg-slate-900">{d.name}</option>
              ))}
            </select>
            {errors.departmentId && <p className="text-red-600 text-xs mt-1">{errors.departmentId.message}</p>}
          </div>

          <div>
            <select {...register('facultyId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Assign faculty (optional)</option>
              {facultyList.map((f) => (
                <option key={f.id} value={String(f.id)} className="dark:bg-slate-900">{f.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              {...register('credits')}
              placeholder="Credits"
              className="w-20 border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">All Courses</h2>
        <div className="space-y-2">
          {courses.length === 0 && <p className="text-sm text-slate-400">No courses yet.</p>}
          {courses.map((c) => (
            <div key={c.id} className="border border-slate-100 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-between p-3 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.code} — {c.name}</p>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{getDeptName(c.departmentId)} • {c.credits} credits • Faculty:</span>
                    {editingCourseId === c.id ? (
                      <span className="flex items-center gap-1">
                        <select
                          value={editFacultyId}
                          onChange={(e) => setEditFacultyId(e.target.value)}
                          className="border border-slate-300 dark:border-slate-700 bg-transparent rounded px-1 py-0.5 text-xs text-slate-900 dark:text-white"
                        >
                          <option value="" className="dark:bg-slate-900">Unassigned</option>
                          {facultyList.map((f) => (
                            <option key={f.id} value={f.id} className="dark:bg-slate-900">{f.name}</option>
                          ))}
                        </select>
                        <button onClick={() => saveEditFaculty(c.id)} className="text-indigo-600 hover:underline">Save</button>
                        <button onClick={() => setEditingCourseId(null)} className="text-slate-400 hover:underline">Cancel</button>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {getFacultyName(c.facultyId)}
                        <button onClick={() => startEditFaculty(c)} className="text-indigo-600 hover:underline ml-1">Edit</button>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleExpand(c.id)}
                    className="text-indigo-600 text-xs hover:underline"
                  >
                    {expandedCourseId === c.id ? 'Hide Students' : 'Manage Students'}
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 text-xs hover:underline">
                    Delete
                  </button>
                </div>
              </div>

              {expandedCourseId === c.id && (
                <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Enroll / Unenroll Students</p>
                    <div className="flex items-center gap-2">
                      {pendingEnrollments[c.id] !== undefined && (
                        <button
                          onClick={() => setPendingEnrollments((prev) => { const next = { ...prev }; delete next[c.id]; return next; })}
                          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded"
                        >
                          Reset
                        </button>
                      )}
                      <button
                        onClick={() => void saveEnrollments(c.id)}
                        disabled={savingEnrollments[c.id] || pendingEnrollments[c.id] === undefined}
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        {savingEnrollments[c.id] ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                    {students.map((s) => {
                      const pending = pendingEnrollments[c.id];
                      const isChecked = pending !== undefined
                        ? pending.includes(s.id)
                        : (enrolledMap[c.id] ?? []).includes(s.id);
                      const isDirty = pending !== undefined &&
                        isChecked !== (enrolledMap[c.id] ?? []).includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className={`flex items-center gap-2.5 text-xs rounded-lg px-3 py-2 border cursor-pointer transition-colors select-none
                            ${
                              isDirty
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200'
                                : isChecked
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                          <span className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors pointer-events-none
                            ${
                              isDirty
                                ? 'border-indigo-500 bg-indigo-500'
                                : isChecked
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => handlePendingToggle(c.id, s.id)}
                          />
                          <span className="font-medium">{s.name}</span>
                          <span className="text-slate-400 dark:text-slate-500 truncate">({s.email})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseManagement;
```

---

### `frontend/src/pages/admin/Departments.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Plus, Trash2, Building, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import type { AxiosError } from 'axios';

interface DepartmentNode {
  id: number;
  name: string;
}

const Departments = () => {
  const [departments, setDepartments] = useState<DepartmentNode[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      setError(null);
      const res = await apiClient.get('/admin/departments');
      // Adjust structure safely to handle unwrapped arrays or collection containers
      setDepartments(res.data?.data ?? res.data ?? []);
    } catch (err) {
      console.error('Failed fetching data matrices:', err);
      setError('Could not fetch active structural organization nodes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDepartments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.post('/admin/departments', { name: name.trim() });
      setSuccess(`Successfully registered unit "${name}".`);
      setName('');
      await fetchDepartments();
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to initialize unit path.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, targetName: string) => {
    if (!confirm(`Are you sure you want to completely drop "${targetName}"?`)) return;

    setError(null);
    setSuccess(null);
    try {
      await apiClient.delete(`/admin/departments/${id}`);
      setSuccess('Department dropped successfully.');
      await fetchDepartments();
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to remove target department record.');
    }
  };

  return (
    <Layout>
      {/* Flexible Header: Align right on desktop, drop down on mobile */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Departments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure structural organizational units.</p>
        </div>

        {/* Form Element optimized for upper-right placement */}
        <form onSubmit={handleCreate} className="w-full lg:max-w-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-sm">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Register New Unit</label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              disabled={submitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Computer Science"
              className="flex-1 px-3 py-1.5 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder-slate-400 text-sm"
            />
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      {/* Core Display State Resolver */}
      {loading ? (
        /* Perfectly Centered Content Loading Spinner */
        <div className="flex flex-col items-center justify-center min-h-[280px] w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white"></div>
          <span className="text-xs text-slate-400 mt-3 font-medium tracking-wide">Syncing architecture...</span>
        </div>
      ) : departments.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-8 text-center text-slate-400 italic text-sm shadow-sm">
          No institutional infrastructure logs mapped to node indexes.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Infrastructure Units</span>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {departments.map((dept) => (
              <li key={dept.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-white">{dept.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(dept.id, dept.name)}
                  className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg transition-colors outline-none"
                  title="Remove department"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Departments;
```

---

### `frontend/src/pages/admin/Reports.tsx`

```tsx
import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface DeptBreakdown {
  department: string;
  percentage: number;
}

const Reports = () => {
  const [deptBreakdown, setDeptBreakdown] = useState<DeptBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const monthStart = today.slice(0, 8) + '01';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const res = await apiClient.get(`/reports/summary?fromDate=${monthStart}&toDate=${today}`);
          const breakdownRaw = res.data?.data?.departmentBreakdown ?? res.data?.departmentBreakdown ?? [];
          const breakdown = Array.isArray(breakdownRaw) ? breakdownRaw : breakdownRaw?.rows ?? [];
          setDeptBreakdown(breakdown);
        } catch (err) {
          console.error('Failed to load reports', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [monthStart, today]);

  const handleExport = async (type: 'csv' | 'pdf') => {
    const res = await apiClient.get(`/reports/export/${type}?fromDate=${monthStart}&toDate=${today}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendance-report.${type}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">Reports</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Department-wise Attendance (This Month)</h2>
        <div className="space-y-2">
          {deptBreakdown.length === 0 && <p className="text-sm text-slate-400">No data yet.</p>}
          {deptBreakdown.map((d, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">{d.department || 'Unassigned'}</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{d.percentage ?? 0}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Export Attendance Report</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('csv')}
            className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
```

---

### `frontend/src/pages/admin/TimetableManagement.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { timetableSlotSchema } from '../../schemas/courseSchema';
import type { TimetableSlotFormInput, TimetableSlotFormData } from '../../schemas/courseSchema';
import type { Course, TimetableSlot } from '../../types/course';

interface Department {
  id: number;
  name: string;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const TimetableManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [slots, setSlots] = useState<Record<number, TimetableSlot[]>>({});
  const [selectedDeptId, setSelectedDeptId] = useState<number | ''>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<TimetableSlotFormInput, unknown, TimetableSlotFormData>({
  resolver: zodResolver(timetableSlotSchema),
});

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, deptRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/admin/departments')
      ]);
      const courseList: Course[] = coursesRes.data;
      setCourses(courseList);
      setDepartments(deptRes.data?.data ?? deptRes.data ?? []);

      const slotsResults = await Promise.all(
        courseList.map((c) => apiClient.get(`/timetable/course/${c.id}`))
      );

      const slotsMap: Record<number, TimetableSlot[]> = {};
      courseList.forEach((c, i) => {
        slotsMap[c.id] = slotsResults[i].data;
      });
      setSlots(slotsMap);
    } catch (err) {
      console.error('Failed to load timetable data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const onSubmit = async (data: TimetableSlotFormData) => {
    setApiError('');
    setSaving(true);
    try {
      await apiClient.post('/timetable', data);
      reset();
      await loadData();
    } catch (err: unknown) {
      let message = 'Failed to create slot';
      if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
        message = (err as { message: string }).message;
      }
      setApiError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: number) => {
    if (!confirm('Delete this timetable slot?')) return;
    try {
      await apiClient.delete(`/timetable/${id}`);
      await loadData();
    } catch (err) {
      console.error('Failed to delete slot', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="page-title mb-6">Timetable Management</h1>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Add Timetable Slot</h2>

        {apiError && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-3">{apiError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-3" noValidate>
          <div>
            <select {...register('courseId')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              <option value="" className="dark:bg-slate-900">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id} className="dark:bg-slate-900">{c.code} - {c.name}</option>
              ))}
            </select>
            {errors.courseId && <p className="text-red-600 text-xs mt-1">{errors.courseId.message}</p>}
          </div>

          <div>
            <select {...register('dayOfWeek')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
              {DAYS.map((d) => (
                <option key={d} value={d} className="dark:bg-slate-900">{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <input type="time" {...register('startTime')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white [color-scheme:light_dark]" />
            {errors.startTime && <p className="text-red-600 text-xs mt-1">{errors.startTime.message}</p>}
          </div>

          <div>
            <input type="time" {...register('endTime')} className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white [color-scheme:light_dark]" />
            {errors.endTime && <p className="text-red-600 text-xs mt-1">{errors.endTime.message}</p>}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              {...register('room')}
              placeholder="Room"
              className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap"
            >
              {saving ? '...' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="font-semibold text-slate-900 dark:text-white">Current Schedule</h2>
          <div className="flex flex-wrap items-center gap-3">
             <select
               value={selectedDay}
               onChange={(e) => setSelectedDay(e.target.value)}
               className="border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white"
             >
               <option value="" className="dark:bg-slate-900">All Days</option>
               {DAYS.map(d => (
                 <option key={d} value={d} className="dark:bg-slate-900 capitalize">{d}</option>
               ))}
             </select>
             <select
               value={selectedDeptId}
               onChange={(e) => setSelectedDeptId(e.target.value === '' ? '' : Number(e.target.value))}
               className="border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white"
             >
               <option value="" className="dark:bg-slate-900">All Departments</option>
               {departments.map(d => (
                 <option key={d.id} value={d.id} className="dark:bg-slate-900">{d.name}</option>
               ))}
             </select>
          </div>
        </div>
        <div className="space-y-4">
          {courses
            .filter(c => selectedDeptId === '' || c.departmentId === selectedDeptId)
            .filter(c => {
              if (selectedDay === '') return true;
              const cSlots = slots[c.id] || [];
              return cSlots.some(s => s.dayOfWeek === selectedDay);
            })
            .map((c) => {
              const cSlots = slots[c.id] || [];
              const filteredSlots = selectedDay !== '' ? cSlots.filter(s => s.dayOfWeek === selectedDay) : cSlots;
              
              return (
                <div key={c.id}>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">{c.code} - {c.name}</p>
                  {filteredSlots.length === 0 ? (
                    <p className="text-xs text-slate-400 ml-2">No slots scheduled{selectedDay !== '' ? ` for ${selectedDay}` : ''}.</p>
                  ) : (
                    <div className="space-y-1 ml-2">
                      {filteredSlots.map((s) => (
                        <div key={s.id} className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800/50 pb-1">
                          <span className="capitalize">
                            {s.dayOfWeek} • {s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)} {s.room && `• ${s.room}`}
                          </span>
                          <button onClick={() => handleDeleteSlot(s.id)} className="text-red-600 hover:underline">
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default TimetableManagement;
```

---

### `frontend/src/pages/admin/UserManagement.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import type { AxiosError } from 'axios';

interface UserRecord {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  department?: string | null;
  departmentId?: number | null;
}

interface DepartmentRecord {
  id: number;
  name: string;
}

const ROLE_STYLES: Record<UserRecord['role'], string> = {
  admin: 'bg-slate-600 text-white',
  faculty: 'bg-emerald-600 text-white',
  student: 'bg-blue-600 text-white',
};

const UserManagement = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDataDirectives = async () => {
    try {
      setError(null);
      const [usersResponse, deptsResponse] = await Promise.all([
        apiClient.get('/admin/users', { params: { limit: 100 } }),
        apiClient.get('/admin/departments', { params: { limit: 100 } }),
      ]);

      setUsers(usersResponse.data?.data ?? usersResponse.data ?? []);
      setDepartments(deptsResponse.data?.data ?? deptsResponse.data ?? []);
    } catch (err) {
      console.error('Error synchronizing database metrics:', err);
      setError('Failed to fetch institutional account or department lists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDataDirectives();
  }, []);

  const resolveDepartmentName = (departmentId: number | null | undefined): string => {
    if (departmentId == null) return '';
    return departments.find((dept) => dept.id === departmentId)?.name ?? '';
  };

  const handleUpdateUserProperties = async (
    userId: string | number,
    parameters: { role?: string; departmentId?: number | null }
  ) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await apiClient.patch(`/admin/users/${userId}`, parameters);
      const updated = response.data?.data;

      setSuccess('User updated successfully.');

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id !== userId) return user;

          const nextDepartmentId =
            updated?.departmentId !== undefined ? updated.departmentId : user.departmentId ?? null;

          return {
            ...user,
            role: (updated?.role ?? parameters.role ?? user.role) as UserRecord['role'],
            departmentId: nextDepartmentId,
            department: resolveDepartmentName(nextDepartmentId) || null,
          };
        })
      );
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to update user.');
      void fetchDataDirectives();
    }
  };

  const handleDeleteUser = async (userId: string | number, name: string) => {
    if (!confirm(`Are you absolutely sure you want to delete access for ${name}?`)) return;
    setError(null);
    setSuccess(null);
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      setSuccess(`Account workspace for ${name} removed.`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Failed to terminate account profile.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 min-w-0">
        <div className="min-w-0">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage roles and access permissions across the institution.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-0">
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none w-full sm:w-auto"
          >
            <option value="all" className="dark:bg-slate-900">All Roles</option>
            <option value="admin" className="dark:bg-slate-900">Admins</option>
            <option value="faculty" className="dark:bg-slate-900">Faculty</option>
            <option value="student" className="dark:bg-slate-900">Students</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none w-full md:w-64"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[320px] w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white"></div>
          <span className="text-xs text-slate-400 mt-3 font-medium tracking-wide">Assembling user profiles...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="panel-card text-center text-slate-400 italic text-sm">
          No registered records match your lookup parameters.
        </div>
      ) : (
        <div className="panel-card overflow-x-auto text-sm p-0 min-w-0">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">User</th>
                <th className="px-3 py-3">Current Role</th>
                <th className="px-3 py-3">Department</th>
                <th className="px-3 py-3">Change Role</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {filteredUsers.map((user) => {
                const departmentValue =
                  user.departmentId != null ? String(user.departmentId) : '';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${ROLE_STYLES[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <span className="text-xs text-slate-400 italic">Global System Scope</span>
                      ) : (
                        <select
                          value={departmentValue}
                          onChange={(e) => {
                            const nextDepartmentId = e.target.value ? Number(e.target.value) : null;
                            void handleUpdateUserProperties(user.id, { departmentId: nextDepartmentId });
                          }}
                          className="px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 min-w-[140px]"
                        >
                          <option value="" className="dark:bg-slate-900">Unassigned (None)</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id} className="dark:bg-slate-900">
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          void handleUpdateUserProperties(user.id, { role: e.target.value })
                        }
                        className="px-2 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="student" className="dark:bg-slate-900">Student</option>
                        <option value="faculty" className="dark:bg-slate-900">Faculty</option>
                        <option value="admin" className="dark:bg-slate-900">Admin</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => void handleDeleteUser(user.id, user.name)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors outline-none"
                        title={`Delete account entry for ${user.name}`}
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default UserManagement;
```

---

### `frontend/src/pages/faculty/FacultyDashboard.tsx`

```tsx
import { useEffect, useState } from 'react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';

interface StudentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
}

interface PendingLeave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  student_id: number;
  student_name: string;
  student_email: string;
}

interface LowAttendanceStudent {
  id: number;
  name: string;
  email: string;
  total_days: number;
  present_days: number;
  percentage: number;
}

const FacultyDashboard = () => {
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [pendingLeaves, setPendingLeaves] = useState<PendingLeave[]>([]);
  const [lowAttendance, setLowAttendance] = useState<LowAttendanceStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const [markDate, setMarkDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, leaveRes, lowRes] = await Promise.all([
        apiClient.get('/admin/users?role=student'),
        apiClient.get('/leave/pending'),
        apiClient.get('/attendance/low-attendance?threshold=75'),
      ]);
      setStudents(usersRes.data?.data ?? usersRes.data);
      setPendingLeaves(leaveRes.data?.data ?? leaveRes.data);
      setLowAttendance(lowRes.data?.data ?? lowRes.data);
    } catch (err) {
      console.error('Failed to load faculty dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const entries = Object.entries(attendanceMap);
      await Promise.all(
        entries.map(([studentId, status]) =>
          apiClient.post('/attendance/mark', { studentId: Number(studentId), date: markDate, status })
        )
      );
      setSaveMessage(`Saved attendance for ${entries.length} student(s).`);
      setAttendanceMap({});
    } catch {
      setSaveMessage('Failed to save attendance for one or more students.');
    } finally {
      setSaving(false);
    }
  };

  const handleReview = async (id: number, decision: 'approved' | 'rejected') => {
    try {
      await apiClient.patch(`/leave/${id}/review`, { decision });
      await loadData();
    } catch (err) {
      console.error('Failed to review leave request', err);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Mark Attendance</h2>
          <input
            type="date"
            value={markDate}
            onChange={(e) => setMarkDate(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          />
        </div>

        {saveMessage && <p className="text-sm text-blue-600 mb-3">{saveMessage}</p>}

        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {students.length === 0 && <p className="text-sm text-gray-400">No students found.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-sm">{student.name} <span className="text-gray-400">({student.email})</span></span>
              <div className="flex gap-1">
                {['present', 'absent', 'late'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(student.id, status)}
                    className={`text-xs px-2 py-1 rounded ${
                      attendanceMap[student.id] === status
                        ? status === 'present'
                          ? 'bg-green-600 text-white'
                          : status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving || Object.keys(attendanceMap).length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Pending Leave Requests</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pendingLeaves.length === 0 && <p className="text-sm text-gray-400">No pending requests.</p>}
            {pendingLeaves.map((lr) => (
              <div key={lr.id} className="border-b pb-3">
                <p className="text-sm font-medium">{lr.student_name}</p>
                <p className="text-xs text-gray-500 mb-1">{lr.reason}</p>
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(lr.from_date).toLocaleDateString()} - {new Date(lr.to_date).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReview(lr.id, 'approved')}
                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(lr.id, 'rejected')}
                    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-4">Low Attendance (Below 75%)</h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {lowAttendance.length === 0 && <p className="text-sm text-gray-400">No students below threshold.</p>}
            {lowAttendance.map((s) => (
              <div key={s.id} className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">{s.name}</span>
                <span className="text-xs font-medium text-red-600">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;
```

---

### `frontend/src/pages/faculty/FacultyOverview.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardList, AlertTriangle, ArrowRight } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardStore } from '../../store/dashboardStore';

interface LowAttendanceStudent {
  id: number;
  name: string;
  percentage: number;
}

interface FacultyOverviewCache {
  lowAttendance: LowAttendanceStudent[];
  pendingCount: number;
  studentCount: number;
}

const FacultyOverview = () => {
  const { appUser } = useAuth();
  const { getCached, setCache } = useDashboardStore();
  const [lowAttendance, setLowAttendance] = useState<LowAttendanceStudent[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = 'faculty-overview';
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const cached = getCached<FacultyOverviewCache>(cacheKey);

        if (cached) {
          setLowAttendance(cached.lowAttendance);
          setPendingCount(cached.pendingCount);
          setStudentCount(cached.studentCount);
          setLoading(false);
          return;
        }

        try {
          const [lowRes, leaveRes, studentsRes] = await Promise.all([
            apiClient.get('/attendance/low-attendance?threshold=75'),
            apiClient.get('/leave/pending'),
            apiClient.get('/admin/users?role=student'),
          ]);

          const lowData = lowRes.data?.data ?? lowRes.data;
          const leaveData = leaveRes.data?.data ?? leaveRes.data;
          const studentsData = studentsRes.data?.data ?? studentsRes.data;

          const result = {
            lowAttendance: Array.isArray(lowData) ? lowData : [],
            pendingCount: Array.isArray(leaveData) ? leaveData.length : (leaveData?.length ?? 0),
            studentCount: Array.isArray(studentsData) ? studentsData.length : (studentsData?.length ?? 0),
          };

          setLowAttendance(result.lowAttendance);
          setPendingCount(result.pendingCount);
          setStudentCount(result.studentCount);
          setCache(cacheKey, result);
        } catch (err) {
          console.error('Failed to load overview data', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [getCached, setCache]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Processing alert registers...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome, {appUser?.name}</h1>
        <p className="page-subtitle">Here&apos;s what&apos;s happening in your classes today.</p>
      </div>

      <div className="stat-grid-3">
        {[
          { label: 'Total Students', value: studentCount, line: 'from-indigo-500 to-cyan-400' },
          { label: 'Pending Leaves', value: pendingCount, line: 'from-amber-500 to-orange-400' },
          { label: 'Below 75%', value: lowAttendance.length, line: 'from-red-500 to-pink-400' },
        ].map((card, i) => (
          <div key={i} className="stat-card">

            <span className="stat-card-label">{card.label}</span>
            <p className="stat-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
        <div className="space-y-3">
          <Link to="/dashboard/attendance" className="group action-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className="action-card-icon bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Mark Attendance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Record attendance for your students</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link to="/dashboard/leave" className="group action-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className="action-card-icon bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                <ClipboardList className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">Review Leave Requests</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pendingCount} request(s) waiting</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {lowAttendance.length > 0 && (
          <div className="panel-card">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Low Attendance Watchlist</h2>
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {lowAttendance.map((s) => (
                <div key={s.id} className="flex justify-between items-center gap-2 py-2 first:pt-0 last:pb-0">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{s.name}</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded shrink-0">
                    {s.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FacultyOverview;
```

---

### `frontend/src/pages/faculty/LeaveRequests.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface PendingLeave {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  student_name: string;
}

const LeaveRequests = () => {
  const { invalidate } = useDashboardStore();
  const [pendingLeaves, setPendingLeaves] = useState<PendingLeave[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/leave/pending');
      setPendingLeaves(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load leave requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleReview = async (id: number, decision: 'approved' | 'rejected') => {
    try {
      await apiClient.patch(`/leave/${id}/review`, { decision });
      await loadData();
      invalidate('faculty-overview');
    } catch (err) {
      console.error('Failed to review leave request', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading leave queue entries...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Pending Leave Requests</h2>
        </div>
        <div className="space-y-3">
          {pendingLeaves.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6">No active entries requiring evaluation.</p>
          )}
          {pendingLeaves.map((lr) => (
            <div key={lr.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-900/60 bg-slate-50/30 dark:bg-slate-900/10 space-y-2">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{lr.student_name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">"{lr.reason}"</p>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Timeline: {new Date(lr.from_date).toLocaleDateString()} - {new Date(lr.to_date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleReview(lr.id, 'approved')}
                  className="text-xs bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-md font-semibold transition-opacity hover:opacity-90"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReview(lr.id, 'rejected')}
                  className="text-xs border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400 px-3 py-1.5 rounded-md font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequests;
```

---

### `frontend/src/pages/faculty/MarkAttendance.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Calendar, CheckSquare } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface StudentUser {
  id: number;
  name: string;
  email: string;
}

const MarkAttendance = () => {
  const { invalidate } = useDashboardStore();
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [markDate, setMarkDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/users?role=student');
      setStudents(res.data?.data ?? res.data);
    } catch (err) {
      console.error('Failed to load students', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadStudents();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const entries = Object.entries(attendanceMap);
      await Promise.all(
        entries.map(([studentId, status]) =>
          apiClient.post('/attendance/mark', { studentId: Number(studentId), date: markDate, status })
        )
      );
      setSaveMessage(`Saved attendance for ${entries.length} student(s).`);
      setAttendanceMap({});
      invalidate('faculty-overview');
    } catch {
      setSaveMessage('Failed to save attendance for one or more students.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing class list indices...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Roster Checklist Input</h2>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              value={markDate}
              onChange={(e) => setMarkDate(e.target.value)}
              className="border border-slate-200 pl-9 pr-3 py-1.5 text-xs rounded-lg bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {saveMessage && (
          <div className="mb-4 p-3 rounded-md text-xs font-semibold bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">
            {saveMessage}
          </div>
        )}

        <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-96 overflow-y-auto pr-1 mb-6">
          {students.length === 0 && <p className="text-sm text-slate-400 py-4 text-center">No students registered.</p>}
          {students.map((student) => (
            <div key={student.id} className="flex flex-wrap justify-between items-center py-3 first:pt-0 last:pb-0 gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-0 truncate flex-1">
                {student.name} <span className="text-slate-400 font-normal text-xs">({student.email})</span>
              </span>
              <div className="flex gap-1 shrink-0">
                {['present', 'absent', 'late'].map((status) => {
                  const active = attendanceMap[student.id] === status;
                  const theme = 
                    status === 'present' ? 'bg-emerald-600 text-white' : 
                    status === 'absent' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white';
                  
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(student.id, status)}
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded transition-all ${
                        active ? theme : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving || Object.keys(attendanceMap).length === 0}
          className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {saving ? 'Saving...' : `Save Attendance (${Object.keys(attendanceMap).length})`}
        </button>
      </div>
    </Layout>
  );
};

export default MarkAttendance;
```

---

### `frontend/src/pages/student/ApplyLeave.tsx`

```tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Send, CalendarRange, ShieldAlert } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';
import { leaveSchema } from '../../schemas/leaveSchema';
import type { LeaveFormData } from '../../schemas/leaveSchema';
import type { AxiosError } from 'axios';

interface LeaveRequest {
  id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: string;
  created_at: string;
}

const ApplyLeave = () => {
  const { getCached, setCache, invalidate } = useDashboardStore();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const cacheKey = 'student-dashboard';

  const loadRequests = async (skipCache = false) => {
    setLoadingHistory(true);
    if (!skipCache) {
      const cached = getCached<{ leaveRequests: LeaveRequest[] }>(cacheKey);
      if (cached?.leaveRequests && cached.leaveRequests.length > 0) {
        setLeaveRequests(cached.leaveRequests);
        setLoadingHistory(false);
        return;
      }
    }

    try {
      const leaveRes = await apiClient.get('/leave/my-requests');
      const data = leaveRes.data?.data ?? leaveRes.data;
      setLeaveRequests(data);
      setCache(cacheKey, { percentage: null, history: [], leaveRequests: data });
    } catch (err) {
      console.error('Failed to synchronize exemption records', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitLeave = async (data: LeaveFormData) => {
    setSubmitError('');
    setSubmitting(true);
    try {
      await apiClient.post('/leave/submit', data);
      reset();
      invalidate(cacheKey);
      await loadRequests(true);
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      setSubmitError(err.message ?? 'Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      approved: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400',
      rejected: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400',
      pending: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400',
    };
    return `text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border shrink-0 ${
      variants[status] || 'bg-slate-100 text-slate-600'
    }`;
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl">
        
        {/* Input Block */}
        <div className="md:col-span-1 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <FileText className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-bold">Request Exemption</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmitLeave)} className="space-y-3.5" noValidate>
            {submitError && (
              <div className="flex items-center gap-2 p-3 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {submitError}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">Reason Statement</label>
              <textarea
                rows={3}
                {...register('reason')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none resize-none"
                placeholder="State your clear justification..."
              />
              {errors.reason && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.reason.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">From Date</label>
                <input
                  type="date"
                  {...register('fromDate')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
                />
                {errors.fromDate && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.fromDate.message}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">To Date</label>
                <input
                  type="date"
                  {...register('toDate')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white dark:border-slate-800 focus:outline-none"
                />
                {errors.toDate && <p className="text-red-500 text-[11px] font-medium mt-1">{errors.toDate.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2 rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-1.5 transition-opacity"
            >
              <Send className="w-3 h-3" />
              {submitting ? 'Transmitting...' : 'Submit Request'}
            </button>
          </form>
        </div>

        {/* History Ledger Block */}
        <div className="md:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
            <CalendarRange className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">Leave Pipeline Logs</h3>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {loadingHistory ? (
              <p className="text-xs text-slate-400 py-6 text-center animate-pulse">Syncing pipeline registries...</p>
            ) : leaveRequests.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">No structural exemption records logged.</p>
            ) : (
              leaveRequests.map((lr) => (
                <div key={lr.id} className="p-3.5 border border-slate-100 dark:border-slate-900 rounded-xl flex items-start justify-between gap-4 bg-slate-50/20 dark:bg-slate-900/10">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">"{lr.reason}"</p>
                    <p className="text-[10px] font-medium text-slate-400">
                      Span: {new Date(lr.from_date).toLocaleDateString()} — {new Date(lr.to_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={statusBadge(lr.status)}>{lr.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ApplyLeave;
```

---

### `frontend/src/pages/student/StudentOverview.tsx`

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FilePlus2, ArrowRight, XCircle } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface PercentageData {
  totalDays: number;
  presentDays: number;
  percentage: number;
}

const StudentOverview = () => {
  const { getCached, setCache } = useDashboardStore();
  const [percentage, setPercentage] = useState<PercentageData | null>(null);
  const [loading, setLoading] = useState(true);

  const cacheKey = 'student-dashboard';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        // Access existing cache if available
        const cached = getCached<{ percentage: PercentageData | null }>(cacheKey);
        if (cached?.percentage) {
          setPercentage(cached.percentage);
          setLoading(false);
          return;
        }

        try {
          const pctRes = await apiClient.get('/attendance/my-percentage');
          const data = pctRes.data?.data ?? pctRes.data;
          setPercentage(data);
          
          // Seed initial cache shell safely
          setCache(cacheKey, { percentage: data, history: [], leaveRequests: [] });
        } catch (err) {
          console.error('Failed to load compliance percentage metric', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [getCached, setCache]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing systemic compliance metrics...</p>
        </div>
      </Layout>
    );
  }

  const rate = percentage?.percentage ?? 0;
  const total = percentage?.totalDays ?? 0;
  const present = percentage?.presentDays ?? 0;
  const absent = total - present;
  const isBreached = rate < 75;

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Overview of your attendance and leave status.</p>
      </div>

      <div className="stat-grid-3">
        <div className="stat-card flex flex-col justify-between">

          <span className="stat-card-label">Attendance Rate</span>
          <p className={`stat-card-value ${isBreached ? 'text-red-600 dark:text-red-400' : ''}`}>{rate}%</p>
        </div>

        <div className="stat-card flex flex-col justify-between">

          <span className="stat-card-label">Days Present</span>
          <p className="stat-card-value">{present}</p>
        </div>

        <div className="stat-card flex flex-col justify-between col-span-2 sm:col-span-1">

          <span className="stat-card-label">Total Sessions</span>
          <p className="stat-card-value">{total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <Link to="/dashboard/my-attendance" className="group action-card">
          <div className="flex items-center gap-3 min-w-0">
            <div className="action-card-icon bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Attendance Logs</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">View your attendance history</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link to="/dashboard/apply-leave" className="group action-card">
          <div className="flex items-center gap-3 min-w-0">
            <div className="action-card-icon bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <FilePlus2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Leave Requests</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Apply for leave and track status</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {isBreached && total > 0 && (
        <div className="mt-4 flex items-start gap-3 p-3 md:p-4 bg-red-50/50 border border-red-100 rounded-lg dark:bg-red-950/10 dark:border-red-900/30">
          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800 dark:text-red-400">Compliance Notice</p>
            <p className="text-xs text-red-700/80 dark:text-red-400/70 mt-1 leading-relaxed">
              Your attendance is below the required 75% limit. You have {absent} absent day(s) recorded.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentOverview;
```

---

### `frontend/src/pages/student/ViewAttendance.tsx`

```tsx
import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import apiClient from '../../api/axiosClient';
import Layout from '../../components/Layout';
import { useDashboardStore } from '../../store/dashboardStore';

interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
}

const ViewAttendance = () => {
  const { getCached, setCache } = useDashboardStore();
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const cacheKey = 'student-dashboard';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const cached = getCached<{ history: AttendanceRecord[] }>(cacheKey);
        if (cached?.history && cached.history.length > 0) {
          setHistory(cached.history);
          setLoading(false);
          return;
        }

        try {
          const historyRes = await apiClient.get('/attendance/my-history');
          const data = historyRes.data?.data ?? historyRes.data;
          setHistory(data);
          
          setCache(cacheKey, { percentage: null, history: data, leaveRequests: [] });
        } catch (err) {
          console.error('Failed to sync structural attendance records', err);
        } finally {
          setLoading(false);
        }
      })();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [getCached, setCache]);

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      present: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30',
      absent: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30',
      late: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30',
    };
    return `inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase border ${
      variants[status] || 'bg-slate-50 text-slate-600 border-slate-100'
    }`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing personal validation ledger...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Attendance History</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Granular log audit map of your institution check-ins.</p>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60">
                <tr>
                  <th className="px-5 py-3 font-semibold flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> Date Evaluated
                  </th>
                  <th className="px-5 py-3 font-semibold text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-5 py-8 text-center text-slate-400">No verification stamps mapped yet.</td>
                  </tr>
                ) : (
                  history.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={statusBadge(record.status)}>{record.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAttendance;
```

---

### `frontend/src/schemas/authSchemas.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'admin'], { message: 'Please select a role' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
```

---

### `frontend/src/schemas/courseSchema.ts`

```typescript
import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().min(2, 'Course name must be at least 2 characters'),
  code: z.string().min(2, 'Course code is required').max(20),
  departmentId: z.coerce.number().min(1, 'Please select a department'),
  credits: z.coerce.number().min(1).max(10).default(3),
  facultyId: z.coerce.number().optional(),
});

export type CourseFormInput = z.input<typeof courseSchema>;
export type CourseFormData = z.infer<typeof courseSchema>;

export const timetableSlotSchema = z
  .object({
    courseId: z.coerce.number().min(1, 'Please select a course'),
    dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    room: z.string().optional(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: 'Start time must be before end time',
    path: ['endTime'],
  });

export type TimetableSlotFormInput = z.input<typeof timetableSlotSchema>;
export type TimetableSlotFormData = z.infer<typeof timetableSlotSchema>;
```

---

### `frontend/src/schemas/leaveSchema.ts`

```typescript
import { z } from 'zod';

export const leaveSchema = z
  .object({
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
    fromDate: z.string().min(1, 'From date is required'),
    toDate: z.string().min(1, 'To date is required'),
  })
  .refine((data) => new Date(data.fromDate) <= new Date(data.toDate), {
    message: 'From date cannot be after to date',
    path: ['toDate'],
  });

export type LeaveFormData = z.infer<typeof leaveSchema>;
```

---

### `frontend/src/setupTests.ts`

```typescript
import '@testing-library/jest-dom';
```

---

### `frontend/src/store/authStore.ts`

```typescript
const ACCESS_TOKEN_KEY = 'attendance_access_token';

let accessToken: string | null =
  typeof window !== 'undefined' ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const getAccessToken = (): string | null => {
  return accessToken;
};
```

---

### `frontend/src/store/dashboardStore.ts`

```typescript
import { create } from 'zustand';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

interface DashboardStore {
  cache: Record<string, CacheEntry>;
  getCached: <T>(key: string, maxAgeMs?: number) => T | null;
  setCache: <T>(key: string, data: T) => void;
  invalidate: (key: string) => void;
  invalidateAll: () => void;
}

const DEFAULT_MAX_AGE = 60 * 1000; // 1 minute

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  cache: {},

  getCached: <T>(key: string, maxAgeMs = DEFAULT_MAX_AGE): T | null => {
    const entry = get().cache[key];
    if (!entry) return null;
    const isStale = Date.now() - entry.timestamp > maxAgeMs;
    return isStale ? null : (entry.data as T);
  },

  setCache: <T>(key: string, data: T) => {
    set((state) => ({
      cache: { ...state.cache, [key]: { data, timestamp: Date.now() } },
    }));
  },

  invalidate: (key) => {
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    });
  },

  invalidateAll: () => set({ cache: {} }),
}));
```

---

### `frontend/src/types/course.ts`

```typescript
export interface Course {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  credits: number;
  facultyId: number | null;
}

export interface TimetableSlot {
  id: number;
  courseId: number;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
  room: string | null;
}

export interface StudentTimetableEntry {
  courseId: number;
  courseName: string;
  courseCode: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string | null;
}
```

---

### `frontend/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode toggling via className="dark" on <html>
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Overrides default sans font with Inter
      },
    },
  },
  plugins: [],
}
```

---

### `frontend/tsconfig.app.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

---

### `frontend/tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

---

### `frontend/tsconfig.node.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

---

### `frontend/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### `frontend/vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

### `frontend/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov']
    }
  }
});
```

---

*Total files included: 128*
