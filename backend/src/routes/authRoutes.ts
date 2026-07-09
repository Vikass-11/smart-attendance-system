import express from 'express';
import { registerUser, getMe } from '../controllers/authController';
import { verifyFirebaseOnly, verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', verifyFirebaseOnly, registerUser);
router.get('/me', verifyToken, getMe);

export default router;