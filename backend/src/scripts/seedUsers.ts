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