const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const leaveController = require('../controllers/leaveController');

router.post('/submit', verifyToken, requireRole('student'), leaveController.submitLeave);
router.get('/my-requests', verifyToken, requireRole('student'), leaveController.getMyLeaveRequests);
router.get('/pending', verifyToken, requireRole('faculty', 'admin'), leaveController.getPendingRequests);
router.patch('/:id/review', verifyToken, requireRole('faculty', 'admin'), leaveController.reviewLeave);

module.exports = router;