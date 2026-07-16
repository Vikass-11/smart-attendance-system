import { ChatCompletionTool } from 'openai/resources/chat/completions';

export const agentTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_my_attendance_history',
      description: 'Get the attendance history records for the current student user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_attendance_percentage',
      description: 'Get the overall attendance percentage and summary (present, absent, late counts) for the current student user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_class_attendance',
      description: 'Get daily class attendance list for a specific date (Faculty/Admin only).',
      parameters: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'The date in YYYY-MM-DD format.' },
        },
        required: ['date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_low_attendance_students',
      description: 'Fetch students with attendance percentages below a specific threshold (Faculty/Admin only).',
      parameters: {
        type: 'object',
        properties: {
          threshold: { type: 'number', description: 'The threshold percentage (e.g. 75).' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_timetable',
      description: 'Get the complete timetable schedule slots for the current student or faculty user.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_courses',
      description: 'Get all the courses that the current user is enrolled in (student) or teaching (faculty).',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'submit_leave_request',
      description: 'Draft a leave request for the current student user. This will prompt for confirmation before committing.',
      parameters: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'The reason for leave.' },
          fromDate: { type: 'string', description: 'The start date of the leave (YYYY-MM-DD).' },
          toDate: { type: 'string', description: 'The end date of the leave (YYYY-MM-DD).' },
        },
        required: ['reason', 'fromDate', 'toDate'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'review_leave_request',
      description: 'Approve or reject a pending student leave request (Faculty/Admin only). This will prompt for confirmation before committing.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The ID of the leave request.' },
          decision: { type: 'string', enum: ['approved', 'rejected'], description: 'The review decision.' },
        },
        required: ['id', 'decision'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'mark_student_attendance',
      description: 'Mark attendance (present, absent, late) for a student on a specific date (Faculty/Admin only). This will prompt for confirmation before committing.',
      parameters: {
        type: 'object',
        properties: {
          studentId: { type: 'number', description: 'The ID of the student user.' },
          date: { type: 'string', description: 'The date in YYYY-MM-DD format.' },
          status: { type: 'string', enum: ['present', 'absent', 'late'], description: 'The attendance status.' },
        },
        required: ['studentId', 'date', 'status'],
      },
    },
  },
];