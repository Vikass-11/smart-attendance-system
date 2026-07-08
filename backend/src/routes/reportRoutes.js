const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

router.use(verifyToken, requireRole('faculty', 'admin'));

router.get('/daily', reportController.dailyReport);
router.get('/weekly', reportController.weeklyReport);
router.get('/monthly', reportController.monthlyReport);
router.get('/summary', reportController.institutionSummary);
router.get('/export/csv', reportController.exportCSV);
router.get('/export/pdf', reportController.exportPDF);

module.exports = router;