export interface Course {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  credits: number;
  facultyId: number | null;
}

export interface TimetableSlot {
  id: number;
  courseId: number;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
  room: string | null;
}

export interface StudentTimetableEntry {
  courseId: number;
  courseName: string;
  courseCode: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string | null;
}