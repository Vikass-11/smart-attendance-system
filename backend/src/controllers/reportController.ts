import { Response } from 'express';
import * as reportService from '../services/reportService';
import { getWeekRange, getMonthRange } from '../utils/dateHelpers';
import PDFDocument from 'pdfkit';
import { AuthenticatedRequest } from '../types';
import type { DepartmentReportFilters } from '../models/reportModel';

export const dailyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    res.status(400).json({ error: 'date is required' });
    return;
  }

  try {
    const data = await reportService.fetchDailyReport(date);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate daily report', details: err.message });
  }
};

export const weeklyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    res.status(400).json({ error: 'date is required (any date within the week)' });
    return;
  }

  try {
    const { fromDate, toDate } = getWeekRange(date);
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    res.json({ fromDate, toDate, data });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate weekly report', details: err.message });
  }
};

export const monthlyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const month = req.query.month as string;
  const year = req.query.year as string;
  if (!month || !year) {
    res.status(400).json({ error: 'month and year are required' });
    return;
  }

  try {
    const { fromDate, toDate } = getMonthRange(parseInt(month), parseInt(year));
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    res.json({ fromDate, toDate, data });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate monthly report', details: err.message });
  }
};

export const institutionSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    res.status(400).json({ error: 'fromDate and toDate are required' });
    return;
  }

  try {
    // Parse optional filters from query string with sensible defaults
    const page = parseInt((req.query.page as string) || '1', 10) || 1;
    const limit = parseInt((req.query.limit as string) || '10', 10) || 10;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || undefined;
    const sortBy = ((req.query.sortBy as DepartmentReportFilters['sortBy']) || 'department') as DepartmentReportFilters['sortBy'];
    const sortOrder = ((req.query.sortOrder as DepartmentReportFilters['sortOrder']) || 'asc') as DepartmentReportFilters['sortOrder'];

    const filters: DepartmentReportFilters = {
      search,
      page,
      limit,
      offset,
      sortBy,
      sortOrder,
    };

    const result = await reportService.fetchInstitutionSummary(fromDate, toDate, filters);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate summary', details: err.message });
  }
};

export const exportCSV = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    res.status(400).json({ error: 'fromDate and toDate are required' });
    return;
  }

  try {
    const csv = await reportService.generateCSV(fromDate, toDate);
    res.header('Content-Type', 'text/csv');
    res.attachment(`attendance-report-${fromDate}-to-${toDate}.csv`);
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to export CSV', details: err.message });
  }
};

export const exportPDF = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    res.status(400).json({ error: 'fromDate and toDate are required' });
    return;
  }

  try {
    const data = await reportService.fetchRangeReport(fromDate, toDate);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=attendance-report-${fromDate}-to-${toDate}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(16).text('Attendance Report', { align: 'center' });
    doc.fontSize(10).text(`Period: ${fromDate} to ${toDate}`, { align: 'center' });
    doc.moveDown(2);

    data.forEach((row: any) => {
      doc.fontSize(11).text(
        `${row.name} (${row.email}) — Present: ${row.present_days || 0}, Absent: ${row.absent_days || 0}, Late: ${row.late_days || 0}, Percentage: ${row.percentage || 0}%`
      );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to export PDF', details: err.message });
  }
};