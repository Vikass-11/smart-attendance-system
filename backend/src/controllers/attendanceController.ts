import { Response } from 'express';
import * as attendanceService from '../services/attendanceService';
import { AuthenticatedRequest } from '../types';

export const markAttendance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    res.status(400).json({ error: 'studentId, date, and status are required' });
    return;
  }

  if (!attendanceService.isValidStatus(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }

  try {
    await attendanceService.recordAttendance(studentId, req.user!.id, date, status);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to mark attendance', details: err.message });
  }
};

export const getMyAttendance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const records = await attendanceService.fetchStudentHistory(req.user!.id);
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch attendance', details: err.message });
  }
};

export const getMyPercentage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await attendanceService.computeAttendancePercentage(req.user!.id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to calculate percentage', details: err.message });
  }
};

export const getClassAttendance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const date = req.query.date as string;
  if (!date) {
    res.status(400).json({ error: 'date query param is required' });
    return;
  }

  try {
    const records = await attendanceService.fetchClassAttendance(date);
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch class attendance', details: err.message });
  }
};

export const getLowAttendanceStudents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const threshold = req.query.threshold ? parseFloat(req.query.threshold as string) : 75;

  try {
    const students = await attendanceService.fetchLowAttendanceStudents(threshold);
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch low attendance students', details: err.message });
  }
};