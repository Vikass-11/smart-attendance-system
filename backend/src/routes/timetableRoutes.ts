import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import {
  createSlot,
  getCourseTimetable,
  getMyTimetable,
  deleteSlot,
} from '../controllers/timetableController';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole('admin'), createSlot);
router.get('/my', getMyTimetable);
router.get('/course/:courseId', getCourseTimetable);
router.delete('/:id', requireRole('admin'), deleteSlot);

export default router;