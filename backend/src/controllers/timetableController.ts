import { Response } from 'express';
import * as timetableService from '../services/timetableService';
import { AuthenticatedRequest } from '../types';

export const createSlot = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { courseId, dayOfWeek, startTime, endTime, room } = req.body;

  if (!courseId || !dayOfWeek || !startTime || !endTime) {
    res.status(400).json({ error: 'courseId, dayOfWeek, startTime, and endTime are required' });
    return;
  }

  try {
    const id = await timetableService.createSlot({ courseId, dayOfWeek, startTime, endTime, room });
    res.status(201).json({ id, courseId, dayOfWeek, startTime, endTime, room });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCourseTimetable = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { courseId } = req.params;

  try {
    const slots = await timetableService.fetchCourseTimetable(Number(courseId));
    res.json(slots);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch timetable', details: err.message });
  }
};

export const getMyTimetable = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role === 'student') {
      const timetable = await timetableService.fetchStudentTimetable(req.user!.id);
      res.json(timetable);
      return;
    }
    if (req.user!.role === 'faculty') {
      const timetable = await timetableService.fetchFacultyTimetable(req.user!.id);
      res.json(timetable);
      return;
    }
    res.status(400).json({ error: 'Role not applicable for this endpoint' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch your timetable', details: err.message });
  }
};

export const deleteSlot = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await timetableService.removeSlot(Number(id));
    res.json({ message: 'Timetable slot deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete slot', details: err.message });
  }
};