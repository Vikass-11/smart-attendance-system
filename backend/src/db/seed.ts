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
