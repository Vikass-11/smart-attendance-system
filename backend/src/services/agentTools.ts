import * as attendanceService from './attendanceService';
import * as leaveService from './leaveService';
import * as adminService from './adminService';
import { AppUser } from '../types';

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  destructive: boolean;
  allowedRoles: string[];
}

export const TOOLS: ToolDefinition[] = [
  {
    name: 'get_low_attendance_students',
    description: 'Get students with attendance below a given percentage threshold',
    input_schema: {
      type: 'object',
      properties: { threshold: { type: 'number', description: 'Percentage threshold, default 75' } },
    },
    destructive: false,
    allowedRoles: ['faculty', 'admin'],
  },
  {
    name: 'get_pending_leave_requests',
    description: 'Get all pending leave requests awaiting review',
    input_schema: { type: 'object', properties: {} },
    destructive: false,
    allowedRoles: ['faculty', 'admin'],
  },
  {
    name: 'list_students',
    description: 'List all students, optionally filtered by search term',
    input_schema: {
      type: 'object',
      properties: { search: { type: 'string', description: 'Optional name/email search term' } },
    },
    destructive: false,
    allowedRoles: ['faculty', 'admin'],
  },
  {
    name: 'get_my_attendance_percentage',
    description: "Get the current logged-in student's own attendance percentage",
    input_schema: { type: 'object', properties: {} },
    destructive: false,
    allowedRoles: ['student'],
  },
  {
    name: 'mark_attendance',
    description: 'Mark attendance for a specific student on a specific date. This is a DESTRUCTIVE action requiring confirmation.',
    input_schema: {
      type: 'object',
      properties: {
        studentId: { type: 'number' },
        date: { type: 'string', description: 'YYYY-MM-DD format' },
        status: { type: 'string', enum: ['present', 'absent', 'late'] },
      },
      required: ['studentId', 'date', 'status'],
    },
    destructive: true,
    allowedRoles: ['faculty', 'admin'],
  },
  {
    name: 'review_leave_request',
    description: 'Approve or reject a pending leave request. This is a DESTRUCTIVE action requiring confirmation.',
    input_schema: {
      type: 'object',
      properties: {
        leaveId: { type: 'number' },
        decision: { type: 'string', enum: ['approved', 'rejected'] },
      },
      required: ['leaveId', 'decision'],
    },
    destructive: true,
    allowedRoles: ['faculty', 'admin'],
  },
];

export const executeTool = async (toolName: string, input: any, user: AppUser): Promise<any> => {
  switch (toolName) {
    case 'get_low_attendance_students':
      return attendanceService.fetchLowAttendanceStudents(input.threshold || 75);
    case 'get_pending_leave_requests':
      return leaveService.fetchPendingLeaveRequests();
    case 'list_students':
      return adminService.fetchUsers('student', input.search);
    case 'get_my_attendance_percentage':
      return attendanceService.computeAttendancePercentage(user.id);
    case 'mark_attendance':
      return attendanceService.recordAttendance(input.studentId, user.id, input.date, input.status);
    case 'review_leave_request':
      return leaveService.processLeaveDecision(input.leaveId, input.decision, user.id);
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
};

export const getToolsForRole = (role: string): ToolDefinition[] => {
  return TOOLS.filter((t) => t.allowedRoles.includes(role));
};