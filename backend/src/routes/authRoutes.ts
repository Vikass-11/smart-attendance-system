import express from 'express';
import { registerUser, loginUser, getMe, logout } from '../controllers/authController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);

export default router;