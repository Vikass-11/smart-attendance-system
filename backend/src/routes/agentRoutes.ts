import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import { chatWithAgent, confirmAction } from '../controllers/agentController';

const router = express.Router();

router.use(verifyToken, requireRole('student', 'faculty', 'admin'));
router.post('/chat', chatWithAgent);
router.post('/confirm', confirmAction);

export default router;