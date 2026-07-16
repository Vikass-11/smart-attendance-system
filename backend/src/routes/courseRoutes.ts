import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import {
  createCourse,
  listCourses,
  getCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
  enrollStudent,
  getEnrolledStudents,
  unenrollStudent,
} from '../controllers/courseController';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole('admin'), createCourse);
router.get('/', listCourses);
router.get('/my', getMyCourses);
router.get('/:id', getCourse);
router.put('/:id', requireRole('admin'), updateCourse);
router.delete('/:id', requireRole('admin'), deleteCourse);

router.post('/:id/enroll', requireRole('admin', 'faculty'), enrollStudent);
router.get('/:id/students', getEnrolledStudents);
router.delete('/:id/students/:studentId', requireRole('admin', 'faculty'), unenrollStudent);

export default router;