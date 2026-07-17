import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ TEMPORARY RUNNER: Populate Empty Passwords (Safe to delete after it runs)
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt from 'bcryptjs';
import db from './src/config/db';

async function repairSeedPasswords() {
  try {
    console.log("⚙️ Checking for users with missing password hashes...");
    const [users]: any = await db.query("SELECT id, email FROM users WHERE password_hash IS NULL");
    
    if (users.length === 0) {
      console.log("✅ All users already have valid password hashes.");
      return;
    }

    const defaultHash = await bcrypt.hash('password', 10);
    console.log(`🔧 Found ${users.length} users with NULL hashes. Repairing...`);

    for (const user of users) {
      await db.query("UPDATE users SET password_hash = ? WHERE id = ?", [defaultHash, user.id]);
    }

    console.log("🎉 SUCCESS: All seed users have been updated with the password: 'password'");
  } catch (error: any) {
    console.error("❌ Password repair failed:", error.message);
  }
}

// Run 3 seconds after the server boots up
setTimeout(repairSeedPasswords, 3000);
// ─────────────────────────────────────────────────────────────────────────────