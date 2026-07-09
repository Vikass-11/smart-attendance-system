import * as reportModel from '../models/reportModel';
import { Parser } from 'json2csv';
import type { DepartmentReportFilters } from '../models/reportModel';

export const fetchDailyReport = async (date: string) => {
  return reportModel.getDailyReport(date);
};

export const fetchRangeReport = async (fromDate: string, toDate: string) => {
  return reportModel.getRangeReport(fromDate, toDate);
};

export const fetchInstitutionSummary = async (
  fromDate: string,
  toDate: string,
  filters: DepartmentReportFilters
) => {
  const summary = await reportModel.getInstitutionSummary(fromDate, toDate);
  const departmentResult = await reportModel.getDepartmentWiseReport(fromDate, toDate, filters);

  // Normalize response: return rows array and include pagination/meta separately
  return {
    summary,
    departmentBreakdown: departmentResult.rows,
    departmentBreakdownMeta: { total: departmentResult.total },
  };
};

export const generateCSV = async (fromDate: string, toDate: string): Promise<string> => {
  const data = await reportModel.getRangeReport(fromDate, toDate);
  const parser = new Parser({
    fields: ['student_id', 'name', 'email', 'total_days', 'present_days', 'absent_days', 'late_days', 'percentage'],
  });
  return parser.parse(data);
};
