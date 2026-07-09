import { Request } from 'express';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  departmentId: number | null;
}

export interface AuthenticatedRequest extends Request {
  user?: AppUser;
}

export interface UserRow {
  id: number;
  firebase_uid: string | null;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'faculty' | 'admin';
  department_id: number | null;
  created_at: Date;
  is_active: boolean;
}

export interface AttendanceRow {
  id: number;
  student_id: number;
  marked_by: number;
  date: string;
  status: 'present' | 'absent' | 'late';
  created_at: Date;
  updated_at: Date;
}

export interface LeaveRequestRow {
  id: number;
  student_id: number;
  reason: string;
  from_date: string;
  to_date: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: number | null;
  created_at: Date;
}

export interface DepartmentRow {
  id: number;
  name: string;
  created_at: Date;
}