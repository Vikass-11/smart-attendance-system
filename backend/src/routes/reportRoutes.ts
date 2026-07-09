import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import * as reportController from '../controllers/reportController';

const router = express.Router();

router.use(verifyToken, requireRole('faculty', 'admin'));

router.get('/daily', reportController.dailyReport);
router.get('/weekly', reportController.weeklyReport);
router.get('/monthly', reportController.monthlyReport);
router.get('/summary', reportController.institutionSummary);
router.get('/export/csv', reportController.exportCSV);
router.get('/export/pdf', reportController.exportPDF);

export default router;