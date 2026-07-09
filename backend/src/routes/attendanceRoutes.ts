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