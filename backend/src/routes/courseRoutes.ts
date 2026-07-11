import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as courseController from '../controllers/courseController';

const router = express.Router();

router.use(verifyToken);

router.get('/my-courses', requireRole('faculty', 'student'), courseController.getMyCourses);
router.get('/', requireRole('admin', 'faculty'), courseController.listCourses);
router.get('/:id', requireRole('admin', 'faculty', 'student'), courseController.getCourse);
router.post('/', requireRole('admin'), courseController.createCourse);
router.patch('/:id', requireRole('admin'), courseController.updateCourse);
router.delete('/:id', requireRole('admin'), courseController.deleteCourse);

router.post('/:id/enroll', requireRole('admin'), courseController.enrollStudent);
router.get('/:id/students', requireRole('admin', 'faculty'), courseController.getEnrolledStudents);
router.delete('/:id/students/:studentId', requireRole('admin'), courseController.unenrollStudent);

export default router;