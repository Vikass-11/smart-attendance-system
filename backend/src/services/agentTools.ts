import { z } from 'zod';
import * as attendanceService from './attendanceService';
import * as leaveService from './leaveService';
import * as adminService from './adminService';
import * as reportService from './reportService';
import { AppUser } from '../types';

export interface ToolDefinition {
    name: string;
    description: string;
    input_schema: {
        type: 'object';
        properties: Record<string, any>;
        required?: string[];
    };
    zodSchema: z.ZodType<any>;
    destructive: boolean;
    allowedRoles: string[];
}

export const TOOLS: ToolDefinition[] = [
    {
        name: 'get_attendance',
        description: 'Get attendance records. Provide studentId for one student, a single date for a daily view, or fromDate+toDate for a range report.',
        input_schema: {
            type: 'object',
            properties: {
                studentId: { type: 'number', description: 'Optional: filter to one student' },
                date: { type: 'string', description: 'Optional: single date YYYY-MM-DD for a daily view' },
                fromDate: { type: 'string', description: 'Optional: range start YYYY-MM-DD' },
                toDate: { type: 'string', description: 'Optional: range end YYYY-MM-DD' },
            },
        },
        zodSchema: z.object({
            studentId: z.number().optional(),
            date: z.string().optional(),
            fromDate: z.string().optional(),
            toDate: z.string().optional(),
        }),
        destructive: false,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'get_students',
        description: 'List students with pagination',
        input_schema: {
            type: 'object',
            properties: {
                search: { type: 'string' },
                page: { type: 'number', description: 'Default 1' },
                limit: { type: 'number', description: 'Default 20, max 100' },
            },
        },
        zodSchema: z.object({
            search: z.string().optional(),
            page: z.number().min(1).optional(),
            limit: z.number().min(1).max(100).optional(),
        }),
        destructive: false,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'get_leave_requests',
        description: 'Get leave requests, optionally filtered by status and/or student',
        input_schema: {
            type: 'object',
            properties: {
                status: { type: 'string', enum: ['pending', 'approved', 'rejected'] },
                studentId: { type: 'number' },
            },
        },
        zodSchema: z.object({
            status: z.enum(['pending', 'approved', 'rejected']).optional(),
            studentId: z.number().optional(),
        }),
        destructive: false,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'get_my_attendance',
        description: "Get the current logged-in student's own attendance history and percentage",
        input_schema: { type: 'object', properties: {} },
        zodSchema: z.object({}),
        destructive: false,
        allowedRoles: ['student'],
    },
    {
        name: 'get_my_leave_requests',
        description: "Get the current logged-in student's own leave requests",
        input_schema: { type: 'object', properties: {} },
        zodSchema: z.object({}),
        destructive: false,
        allowedRoles: ['student'],
    },
    {
        name: 'mark_attendance',
        description: 'Mark attendance for a single student on a date. DESTRUCTIVE - requires confirmation.',
        input_schema: {
            type: 'object',
            properties: {
                studentId: { type: 'number' },
                date: { type: 'string' },
                status: { type: 'string', enum: ['present', 'absent', 'late'] },
            },
            required: ['studentId', 'date', 'status'],
        },
        zodSchema: z.object({
            studentId: z.number(),
            date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
            status: z.enum(['present', 'absent', 'late']),
        }),
        destructive: true,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'bulk_mark_attendance',
        description: 'Mark attendance for multiple students on the same date at once. DESTRUCTIVE - requires confirmation.',
        input_schema: {
            type: 'object',
            properties: {
                date: { type: 'string' },
                entries: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            studentId: { type: 'number' },
                            status: { type: 'string', enum: ['present', 'absent', 'late'] },
                        },
                    },
                },
            },
            required: ['date', 'entries'],
        },
        zodSchema: z.object({
            date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
            entries: z
                .array(
                    z.object({
                        studentId: z.number(),
                        status: z.enum(['present', 'absent', 'late']),
                    })
                )
                .min(1)
                .max(200),
        }),
        destructive: true,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'review_leave_request',
        description: 'Approve or reject a pending leave request. DESTRUCTIVE - requires confirmation.',
        input_schema: {
            type: 'object',
            properties: {
                leaveId: { type: 'number' },
                decision: { type: 'string', enum: ['approved', 'rejected'] },
            },
            required: ['leaveId', 'decision'],
        },
        zodSchema: z.object({
            leaveId: z.number(),
            decision: z.enum(['approved', 'rejected']),
        }),
        destructive: true,
        allowedRoles: ['faculty', 'admin'],
    },
    {
        name: 'submit_leave_request',
        description: 'Submit a leave request for the current logged-in student. DESTRUCTIVE - requires confirmation.',
        input_schema: {
            type: 'object',
            properties: {
                reason: { type: 'string' },
                fromDate: { type: 'string' },
                toDate: { type: 'string' },
            },
            required: ['reason', 'fromDate', 'toDate'],
        },
        zodSchema: z.object({
            reason: z.string().min(5),
            fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
            toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
        }),
        destructive: true,
        allowedRoles: ['student'],
    },
];

// executeTool now takes the AUTHENTICATED caller's role explicitly and re-checks
// permission at execution time — this is the fix for the role-check bypass at confirm time.
export const executeTool = async (toolName: string, rawInput: unknown, user: AppUser): Promise<any> => {
    const toolDef = TOOLS.find((t) => t.name === toolName);

    if (!toolDef) {
        throw new Error(`Unknown tool: ${toolName}`);
    }

    if (!toolDef.allowedRoles.includes(user.role)) {
        throw new Error(`Role '${user.role}' is not permitted to use tool '${toolName}'`);
    }

    const parsed = toolDef.zodSchema.safeParse(rawInput);
    if (!parsed.success) {
        throw new Error(`Invalid input for tool '${toolName}': ${parsed.error.message}`);
    }
    const input = parsed.data;

    switch (toolName) {
        case 'get_attendance': {
            if (input.studentId) {
                return attendanceService.fetchStudentHistory(input.studentId);
            }
            if (input.date) {
                return attendanceService.fetchClassAttendance(input.date);
            }
            if (input.fromDate && input.toDate) {
                return reportService.fetchRangeReport(input.fromDate, input.toDate);
            }
            throw new Error('Provide studentId, date, or fromDate+toDate');
        }

        case 'get_students': {
            const result = await adminService.fetchUsers({
                role: 'student',
                search: input.search,
                page: input.page || 1,
                limit: input.limit || 20,
                offset: ((input.page || 1) - 1) * (input.limit || 20),
                sortBy: 'name',
                sortOrder: 'asc',
            });
            return result.rows;
        }

        case 'get_leave_requests': {
            const all = await leaveService.fetchPendingLeaveRequests();
            let filtered = all;
            if (input.status) {
                filtered = filtered.filter((r: any) => r.status === input.status);
            }
            if (input.studentId) {
                filtered = filtered.filter((r: any) => r.student_id === input.studentId);
            }
            return filtered;
        }

        case 'get_my_attendance':
            return attendanceService.computeAttendancePercentage(user.id);

        case 'get_my_leave_requests':
            return leaveService.fetchMyLeaveRequests(user.id);

        case 'mark_attendance':
            return attendanceService.recordAttendance(input.studentId, user.id, input.date, input.status);

        case 'bulk_mark_attendance': {
            const results = await Promise.all(
                input.entries.map((e: { studentId: number; status: string }) =>
                    attendanceService.recordAttendance(e.studentId, user.id, input.date, e.status)
                )
            );
            return { markedCount: results.length };
        }

        case 'review_leave_request':
            return leaveService.processLeaveDecision(input.leaveId, input.decision, user.id);

        case 'submit_leave_request':
            return leaveService.createLeaveRequest(user.id, input.reason, input.fromDate, input.toDate);

        default:
            throw new Error(`Unhandled tool: ${toolName}`);
    }
};

// Memoized per-role tool lists — TOOLS is static, no need to recompute the filter every request.
const roleToolsCache = new Map<string, ToolDefinition[]>();

export const getToolsForRole = (role: string): ToolDefinition[] => {
    if (!roleToolsCache.has(role)) {
        roleToolsCache.set(role, TOOLS.filter((t) => t.allowedRoles.includes(role)));
    }
    return roleToolsCache.get(role)!;
};