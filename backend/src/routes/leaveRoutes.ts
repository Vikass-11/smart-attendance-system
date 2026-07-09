import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as leaveController from '../controllers/leaveController';

const router = express.Router();

router.post('/submit', verifyToken, requireRole('student'), leaveController.submitLeave);
router.get('/my-requests', verifyToken, requireRole('student'), leaveController.getMyLeaveRequests);
router.get('/pending', verifyToken, requireRole('faculty', 'admin'), leaveController.getPendingRequests);
router.patch('/:id/review', verifyToken, requireRole('faculty', 'admin'), leaveController.reviewLeave);

export default router;