const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/users', verifyToken, requireRole('faculty', 'admin'), adminController.listUsers);

router.use(verifyToken, requireRole('admin'));
router.post('/departments', adminController.addDepartment);
router.get('/departments', adminController.listDepartments);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.removeUser);

module.exports = router;