const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const attendanceController = require('../controllers/attendanceController');

router.post('/mark', verifyToken, requireRole('faculty', 'admin'), attendanceController.markAttendance);
router.get('/my-history', verifyToken, requireRole('student'), attendanceController.getMyAttendance);
router.get('/my-percentage', verifyToken, requireRole('student'), attendanceController.getMyPercentage);
router.get('/class', verifyToken, requireRole('faculty', 'admin'), attendanceController.getClassAttendance);
router.get('/low-attendance', verifyToken, requireRole('faculty', 'admin'), attendanceController.getLowAttendanceStudents);

module.exports = router;