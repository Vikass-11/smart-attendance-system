import * as reportModel from '../models/reportModel';
import { Parser } from 'json2csv';

export const fetchDailyReport = async (date: string) => reportModel.getDailyReportData(date);
export const fetchRangeReport = async (fromDate: string, toDate: string) => reportModel.getRangeReportData(fromDate, toDate);
export const fetchInstitutionSummary = async (fromDate: string, toDate: string, filters: reportModel.DepartmentReportFilters) => reportModel.getInstitutionSummaryData(fromDate, toDate, filters);

export const generateCSV = async (fromDate: string, toDate: string): Promise<string> => {
  const records = await reportModel.getRangeReportData(fromDate, toDate);
  const fields = [
    { label: 'Student Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Department', value: 'department' },
    { label: 'Present Days', value: 'present_days' },
    { label: 'Absent Days', value: 'absent_days' },
    { label: 'Late Days', value: 'late_days' },
    { label: 'Attendance Percentage (%)', value: 'percentage' },
  ];
  const parser = new Parser({ fields });
  return parser.parse(records);
};