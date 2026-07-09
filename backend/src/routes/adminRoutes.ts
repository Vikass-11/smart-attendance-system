import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as adminController from '../controllers/adminController';

const router = express.Router();

router.get('/users', verifyToken, requireRole('faculty', 'admin'), adminController.listUsers);

router.use(verifyToken, requireRole('admin'));
router.post('/departments', adminController.addDepartment);
router.get('/departments', adminController.listDepartments);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.removeUser);

export default router;