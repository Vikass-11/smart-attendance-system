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
];