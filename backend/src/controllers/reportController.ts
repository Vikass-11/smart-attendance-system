import { Response } from 'express';
import * as reportService from '../services/reportService';
import { getWeekRange, getMonthRange } from '../utils/dateHelpers';
import PDFDocument from 'pdfkit';
import { AuthenticatedRequest } from '../types';
import type { DepartmentReportFilters } from '../models/reportModel';
import apiResponse from '../utils/apiResponse';

export const dailyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    apiResponse.error(res, 'date is required', 400);
    return;
  }

  try {
    const data = await reportService.fetchDailyReport(date);
    apiResponse.success(res, data, 'Daily report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate daily report', 500, err.message);
  }
};

export const weeklyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    apiResponse.error(res, 'date is required (any date within the week)', 400);
    return;
  }

  try {
    const { fromDate, toDate } = getWeekRange(date);
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    apiResponse.success(res, { fromDate, toDate, data }, 'Weekly report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate weekly report', 500, err.message);
  }
};

export const monthlyReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const month = req.query.month as string;
  const year = req.query.year as string;
  if (!month || !year) {
    apiResponse.error(res, 'month and year are required', 400);
    return;
  }

  try {
    const { fromDate, toDate } = getMonthRange(parseInt(month), parseInt(year));
    const data = await reportService.fetchRangeReport(fromDate, toDate);
    apiResponse.success(res, { fromDate, toDate, data }, 'Monthly report');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate monthly report', 500, err.message);
  }
};

export const institutionSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
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
    apiResponse.success(res, result, 'Institution summary');
  } catch (err: any) {
    apiResponse.error(res, 'Failed to generate summary', 500, err.message);
  }
};

export const exportCSV = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
    return;
  }

  try {
    const csv = await reportService.generateCSV(fromDate, toDate);
    res.header('Content-Type', 'text/csv');
    res.attachment(`attendance-report-${fromDate}-to-${toDate}.csv`);
    res.send(csv);
  } catch (err: any) {
    apiResponse.error(res, 'Failed to export CSV', 500, err.message);
  }
};

export const exportPDF = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  if (!fromDate || !toDate) {
    apiResponse.error(res, 'fromDate and toDate are required', 400);
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
    apiResponse.error(res, 'Failed to export PDF', 500, err.message);
  }
};