import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as timetableController from '../controllers/timetableController';

const router = express.Router();

router.use(verifyToken);

router.get('/my-timetable', requireRole('faculty', 'student'), timetableController.getMyTimetable);
router.get('/course/:courseId', requireRole('admin', 'faculty', 'student'), timetableController.getCourseTimetable);
router.post('/', requireRole('admin'), timetableController.createSlot);
router.delete('/:id', requireRole('admin'), timetableController.deleteSlot);

export default router;