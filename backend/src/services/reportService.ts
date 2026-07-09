import * as reportModel from '../models/reportModel';
import { Parser } from 'json2csv';

export const fetchDailyReport = async (date: string) => {
  return reportModel.getDailyReport(date);
};

export const fetchRangeReport = async (fromDate: string, toDate: string) => {
  return reportModel.getRangeReport(fromDate, toDate);
};

export const fetchInstitutionSummary = async (fromDate: string, toDate: string) => {
  const summary = await reportModel.getInstitutionSummary(fromDate, toDate);
  const departmentBreakdown = await reportModel.getDepartmentWiseReport(fromDate, toDate);
  return { summary, departmentBreakdown };
};

export const generateCSV = async (fromDate: string, toDate: string): Promise<string> => {
  const data = await reportModel.getRangeReport(fromDate, toDate);
  const parser = new Parser({
    fields: ['student_id', 'name', 'email', 'total_days', 'present_days', 'absent_days', 'late_days', 'percentage'],
  });
  return parser.parse(data);
};