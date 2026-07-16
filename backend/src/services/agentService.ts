import OpenAI from 'openai';
import { agentTools } from './agentTools';
import * as attendanceService from './attendanceService';
import * as timetableService from './timetableService';
import * as courseService from './courseService';

// Conversations mapping stateful session memory
const conversations = new Map<string, any[]>();

// --- LAZY-LOADED OPENAI CLIENT ---
let openaiInstance: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
  if (!openaiInstance) {
    const apiKey = process.env.QWEN_API_KEY || process.env.OPENAI_API_KEY;
    const baseURL = process.env.QWEN_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      throw new Error(
        'Missing API credentials. Please set QWEN_API_KEY or OPENAI_API_KEY in your .env file.'
      );
    }

    openaiInstance = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Smart Attendance Agent',
      }
    });
  }
  return openaiInstance;
};

const QWEN_MODEL = 'qwen/qwen3.6-plus'; 

export const chat = async (conversationId: string, message: string, user: any): Promise<any> => {
  const openai = getOpenAIClient();

  if (!conversations.has(conversationId)) {
    const systemPrompt = `You are a helpful and intelligent AI Assistant for the Smart Attendance System.
Current User Context:
- User ID: ${user.id}
- Name: ${user.name}
- Email: ${user.email}
- Role: ${user.role}

Your behavior rules:
- Assist the user with their queries regarding attendance, courses, and timetable.
- Students can only view their own attendance, percentage, courses, and timetable.
- Faculty and Admin users are fully authorized to check daily class attendance lists and view low attendance reports across all students.
- Strictly block students from executing admin/faculty functions. If attempted, reply politely explaining lack of permission.`;

    conversations.set(conversationId, [{ role: 'system', content: systemPrompt }]);
  }

  const messages = conversations.get(conversationId)!;
  messages.push({ role: 'user', content: message });

  if (messages.length > 20) {
    const systemMsg = messages[0];
    const recentMsgs = messages.slice(-18);
    conversations.set(conversationId, [systemMsg, ...recentMsgs]);
  }

  try {
    let response = await openai.chat.completions.create({
      model: QWEN_MODEL,
      messages,
      tools: agentTools,
      tool_choice: 'auto',
      max_tokens: 1000,
    });

    let choice = response.choices[0];
    let toolCalls = choice.message.tool_calls;

    while (toolCalls && toolCalls.length > 0) {
      // Fix: Sanitize content so OpenRouter doesn't crash on null
      messages.push({
        role: 'assistant',
        content: choice.message.content || '', 
        tool_calls: choice.message.tool_calls
      });

      for (const toolCall of toolCalls) {
        if (toolCall.type !== 'function') {
          continue; 
        }

        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let toolResult: any;

        try {
          if (functionName === 'get_my_attendance_history') {
            toolResult = user.role !== 'student' 
              ? { error: 'Only student accounts can fetch their history.' } 
              : await attendanceService.fetchStudentHistory(user.id);
          } 
          
          else if (functionName === 'get_my_attendance_percentage') {
            toolResult = user.role !== 'student' 
              ? { error: 'Only student accounts can fetch percentage.' } 
              : await attendanceService.computeAttendancePercentage(user.id);
          } 
          
          else if (functionName === 'get_class_attendance') {
            toolResult = (user.role !== 'faculty' && user.role !== 'admin') 
              ? { error: 'Unauthorized.' } 
              : await attendanceService.fetchClassAttendance(args.date);
          } 
          
          else if (functionName === 'get_low_attendance_students') {
            toolResult = (user.role !== 'faculty' && user.role !== 'admin') 
              ? { error: 'Unauthorized.' } 
              : await attendanceService.fetchLowAttendanceStudents(args.threshold ?? 75);
          } 
          
          else if (functionName === 'get_my_timetable') {
            toolResult = user.role === 'student' 
              ? await timetableService.fetchStudentTimetable(user.id) 
              : await timetableService.fetchFacultyTimetable(user.id);
          } 
          
          else if (functionName === 'get_my_courses') {
            toolResult = user.role === 'student' 
              ? await courseService.fetchStudentCourses(user.id) 
              : await courseService.fetchCoursesByFaculty(user.id);
          } 
          
          else {
            toolResult = { error: 'Tool unrecognized.' };
          }
        } catch (execErr: any) {
          toolResult = { error: execErr.message || 'Execution error' };
        }

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        });
      }

      response = await openai.chat.completions.create({
        model: QWEN_MODEL,
        messages,
        max_tokens: 1000,
      });

      choice = response.choices[0];
      toolCalls = choice.message.tool_calls;
    }

    messages.push({ role: 'assistant', content: choice.message.content || '' });

    return {
      reply: choice.message.content,
      conversationId,
    };
  } catch (err: any) {
    console.error('Agent chat model error:', err);
    throw err;
  }
};
// Stub function to satisfy TypeScript compiler for read-only mode
export const confirmPendingAction = async (conversationId: string, confirmed: boolean, user: any): Promise<any> => {
  return { 
    reply: 'Action confirmation is currently disabled (running in read-only mode).', 
    pendingConfirmation: null, 
    conversationId 
  };
};