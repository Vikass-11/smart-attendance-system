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