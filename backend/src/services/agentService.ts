import OpenAI from 'openai';
import { agentTools } from './agentTools';
import * as attendanceService from './attendanceService';
import * as timetableService from './timetableService';
import * as courseService from './courseService';
import db from '../config/db';

let openaiInstance: OpenAI | null = null;

const getOpenAIClient = (): OpenAI => {
  if (!openaiInstance) {
    const apiKey = process.env.QWEN_API_KEY || process.env.OPENAI_API_KEY;
    const baseURL = process.env.QWEN_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      throw new Error('Missing API credentials.');
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

// 👉 READ-ONLY HELPER: Resolves a student's name to their user ID in the database
async function findStudentIdByName(name: string): Promise<number | null> {
  try {
    const [rows]: any = await db.execute(
      'SELECT id FROM users WHERE LOWER(name) LIKE ? AND LOWER(role) = "student"',
      [`%${name.toLowerCase()}%`]
    );
    return rows.length > 0 ? rows[0].id : null;
  } catch (err) {
    console.error('Error finding student by name:', err);
    return null;
  }
}

async function getOrCreateSession(conversationId: string, userId: number, userContext: any): Promise<any[]> {
  const [sessionRows]: any = await db.execute('SELECT user_id FROM chat_sessions WHERE id = ?', [conversationId]);

  if (sessionRows.length === 0) {
    await db.execute('INSERT INTO chat_sessions (id, user_id) VALUES (?, ?)', [conversationId, userId]);

    // Updated instructions to enforce read-only expectations and student name lookups
    const systemPrompt = `You are a helpful and intelligent AI Assistant for the Campus360.
Current User Context:
- User ID: ${userContext.id}
- Name: ${userContext.name}
- Email: ${userContext.email}
- Role: ${userContext.role}

Your behavior rules:
- Assist the user with their queries regarding attendance, courses, and timetable.
- This system operates in STRICTLY READ-ONLY mode. You do not possess tools to update, edit, modify, or delete records. If asked to make changes, politely explain this read-only restriction.
- Students can only view their own attendance, percentage, courses, and timetable.
- Faculty and Admin users are fully authorized to check daily class attendance lists, view low attendance reports across all students, and lookup/view the detailed attendance history of any specific student by name.
- Strictly block students from executing admin/faculty functions. If attempted, reply politely explaining lack of permission.
- IMPORTANT: When outputting tabular data like timetables or attendance records, ALWAYS use proper Markdown table formatting with explicit newlines between the header, separator, and each row.`;

    await db.execute(
      'INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)',
      [conversationId, 'system', systemPrompt]
    );
  } else {
    if (sessionRows[0].user_id !== userId) {
      throw new Error('Unauthorized: You do not own this chat session.');
    }
  }

  const [rows]: any = await db.execute(
    'SELECT role, content, tool_calls, tool_call_id FROM chat_messages WHERE session_id = ? ORDER BY id ASC',
    [conversationId]
  );

  return rows.map((row: any) => ({
    role: row.role,
    content: row.content || '',
    ...(row.tool_calls && { tool_calls: typeof row.tool_calls === 'string' ? JSON.parse(row.tool_calls) : row.tool_calls }),
    ...(row.tool_call_id && { tool_call_id: row.tool_call_id })
  }));
}

async function saveMessage(conversationId: string, role: string, content: string, toolCalls?: any, toolCallId?: string) {
  await db.execute(
    'INSERT INTO chat_messages (session_id, role, content, tool_calls, tool_call_id) VALUES (?, ?, ?, ?, ?)',
    [
      conversationId,
      role,
      content,
      toolCalls ? JSON.stringify(toolCalls) : null,
      toolCallId || null
    ]
  );
}

export const chat = async (conversationId: string, message: string, user: any): Promise<any> => {
  const openai = getOpenAIClient();
  const messages = await getOrCreateSession(conversationId, user.id, user);

  await saveMessage(conversationId, 'user', message);
  messages.push({ role: 'user', content: message });

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
      const assistantContent = choice.message.content || '';
      await saveMessage(conversationId, 'assistant', assistantContent, toolCalls);

      messages.push({
        role: 'assistant',
        content: assistantContent,
        tool_calls: toolCalls
      });

      for (const toolCall of toolCalls) {
        if (toolCall.type !== 'function') continue;

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
          // 👉 NEW READ TOOL HANDLER: Fetches another student's history by their name (Admin/Faculty only)
          else if (functionName === 'get_student_attendance_history') {
            if (user.role !== 'faculty' && user.role !== 'admin') {
              toolResult = { error: 'Unauthorized.' };
            } else if (!args.student_name) {
              toolResult = { error: 'Student name is required.' };
            } else {
              const targetStudentId = await findStudentIdByName(args.student_name);
              if (!targetStudentId) {
                toolResult = { error: `Could not find a student named "${args.student_name}".` };
              } else {
                toolResult = await attendanceService.fetchStudentHistory(targetStudentId);
              }
            }
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
          else if (functionName === 'get_all_courses') {
            toolResult = user.role !== 'admin'
              ? { error: 'Unauthorized.' }
              : await courseService.fetchAllCourses();
          }
          else if (functionName === 'get_high_attendance_students') {
            toolResult = user.role !== 'faculty'
              ? { error: 'Only faculty members can access this.' }
              : await attendanceService.fetchHighAttendanceStudents(user.departmentId, args.threshold ?? 75);
          }
          else {
            toolResult = { error: 'Tool unrecognized.' };
          }
        } catch (execErr: any) {
          toolResult = { error: execErr.message || 'Execution error' };
        }

        const toolContent = JSON.stringify(toolResult);
        await saveMessage(conversationId, 'tool', toolContent, null, toolCall.id);

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolContent,
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

    const finalContent = choice.message.content || '';
    await saveMessage(conversationId, 'assistant', finalContent);

    return {
      reply: finalContent,
      conversationId,
    };
  } catch (err: any) {
    console.error('Agent chat model error:', err);
    throw err;
  }
};

export const confirmPendingAction = async (conversationId: string, confirmed: boolean, user: any): Promise<any> => {
  return {
    reply: 'Action confirmation is disabled. The assistant is configured in read-only mode.',
    pendingConfirmation: null,
    conversationId
  };
};

export const getMessagesBySession = async (conversationId: string, userId: number): Promise<any[]> => {
  const [sessionRows]: any = await db.execute('SELECT user_id FROM chat_sessions WHERE id = ?', [conversationId]);

  if (sessionRows.length === 0 || sessionRows[0].user_id !== userId) {
    return [];
  }

  const [rows]: any = await db.execute(
    'SELECT role, content FROM chat_messages WHERE session_id = ? AND role IN ("user", "assistant") ORDER BY id ASC',
    [conversationId]
  );
  return rows.map((row: any, index: number) => ({
    id: `hist-${index}`,
    role: row.role,
    text: row.content || '',
    pendingConfirmation: null
  }));
};

export const fetchUserChatSessions = async (userId: number): Promise<any[]> => {
  // Fetch sessions for the user, and left join to get the first user message as a preview
  const [rows]: any = await db.execute(
    `SELECT cs.id as sessionId, 
            (SELECT content FROM chat_messages cm WHERE cm.session_id = cs.id AND cm.role = 'user' ORDER BY id ASC LIMIT 1) as preview
     FROM chat_sessions cs
     WHERE cs.user_id = ?
     ORDER BY cs.id DESC`, // Using session id as rough proxy for time since we don't know if created_at exists on chat_sessions
    [userId]
  );
  return rows;
};