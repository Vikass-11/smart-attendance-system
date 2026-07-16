import express from 'express';
import { registerUser, loginUser, getMe, logout, checkAdminExists } from '../controllers/authController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Public — check if system admin exists (used by Register page for conditional UI)
router.get('/admin-exists', checkAdminExists);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);

export default router;