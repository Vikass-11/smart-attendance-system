import OpenAI from 'openai';
import { agentTools } from './agentTools';
import * as attendanceService from './attendanceService';
import * as timetableService from './timetableService';
import * as courseService from './courseService';
import * as leaveService from './leaveService';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Conversations mapping stateful session memory
const conversations = new Map<string, any[]>();

// Store for actions pending human-in-the-loop confirmation
export const pendingActions = new Map<string, { type: string; args: any }>();

export const chat = async (conversationId: string, message: string, user: any): Promise<any> => {
  // Initialize context-aware system prompt injects logged-in user context
  if (!conversations.has(conversationId)) {
    const systemPrompt = `You are a helpful and intelligent AI Assistant for the Smart Attendance System.
Current User Context:
- User ID: ${user.id}
- Name: ${user.name}
- Email: ${user.email}
- Role: ${user.role}
- Department ID: ${user.departmentId || 'None'}

Your behavior rules:
- Assist the user with their queries regarding attendance, courses, timetable, and leave.
- Students can only view their own attendance, percentage, courses, timetable, and submit leave requests.
- Faculty and Admin users can check daily class attendance lists, check students with low attendance, review leave requests, and mark student attendance.
- Strictly block students from executing admin/faculty functions. If attempted, reply politely explaining lack of permission.
- If a tool requires user confirmation (submit_leave_request, review_leave_request, mark_student_attendance), draft the action and inform the user. Do NOT call database functions directly within the drafted tool step; the system intercepts it for confirmation.`;

    conversations.set(conversationId, [{ role: 'system', content: systemPrompt }]);
  }

  const messages = conversations.get(conversationId)!;
  messages.push({ role: 'user', content: message });

  // Limit message array length to keep performance high
  if (messages.length > 20) {
    const systemMsg = messages[0];
    const recentMsgs = messages.slice(-18);
    conversations.set(conversationId, [systemMsg, ...recentMsgs]);
  }

  try {
    let response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools: agentTools,
      tool_choice: 'auto',
    });

    let choice = response.choices[0];
    let toolCalls = choice.message.tool_calls;
    let pendingConfirmation: any = null;

    while (toolCalls && toolCalls.length > 0) {
      messages.push(choice.message);

      for (const toolCall of toolCalls) {
        // --- TYPE GUARD ADDED HERE ---
        // Narrows type to ChatCompletionMessageFunctionToolCall
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
          
          // ─── STATE MUTATIONS (Intercepted for Two-Phase Commit) ───
          else if (functionName === 'submit_leave_request') {
            if (user.role !== 'student') {
              toolResult = { error: 'Only student accounts can submit leaves.' };
            } else {
              pendingActions.set(conversationId, { type: 'submit_leave_request', args });
              pendingConfirmation = { type: 'submit_leave_request', args };
              toolResult = { status: 'pending_confirmation', message: 'Leave request drafted. Awaiting user confirmation.' };
            }
          } 
          
          else if (functionName === 'review_leave_request') {
            if (user.role !== 'faculty' && user.role !== 'admin') {
              toolResult = { error: 'Unauthorized.' };
            } else {
              pendingActions.set(conversationId, { type: 'review_leave_request', args });
              pendingConfirmation = { type: 'review_leave_request', args };
              toolResult = { status: 'pending_confirmation', message: 'Leave decision drafted. Awaiting user confirmation.' };
            }
          } 
          
          else if (functionName === 'mark_student_attendance') {
            if (user.role !== 'faculty' && user.role !== 'admin') {
              toolResult = { error: 'Unauthorized.' };
            } else {
              pendingActions.set(conversationId, { type: 'mark_student_attendance', args });
              pendingConfirmation = { type: 'mark_student_attendance', args };
              toolResult = { status: 'pending_confirmation', message: 'Attendance entry drafted. Awaiting user confirmation.' };
            }
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
        model: 'gpt-4o-mini',
        messages,
      });

      choice = response.choices[0];
      toolCalls = choice.message.tool_calls;
    }

    messages.push({ role: 'assistant', content: choice.message.content || '' });

    return {
      reply: choice.message.content,
      pendingConfirmation,
      conversationId,
    };
  } catch (err: any) {
    console.error('Agent chat model error:', err);
    throw err;
  }
};

export const confirmPendingAction = async (conversationId: string, confirmed: boolean, user: any): Promise<any> => {
  const pending = pendingActions.get(conversationId);

  if (!pending) {
    return { reply: 'No action is currently pending confirmation.', pendingConfirmation: null, conversationId };
  }

  pendingActions.delete(conversationId);

  if (!confirmed) {
    const cancelReply = `I've cancelled that action for you. What else can I help you with?`;
    conversations.get(conversationId)?.push({ role: 'assistant', content: cancelReply });
    return { reply: cancelReply, pendingConfirmation: null, conversationId };
  }

  try {
    let successMessage = '';

    if (pending.type === 'submit_leave_request') {
      const { reason, fromDate, toDate } = pending.args;
      await leaveService.createLeaveRequest(user.id, reason, fromDate, toDate);
      successMessage = `Your leave request from **${fromDate}** to **${toDate}** for "*${reason}*" was submitted successfully!`;
    } 
    
    else if (pending.type === 'review_leave_request') {
      const { id, decision } = pending.args;
      const res = await leaveService.processLeaveDecision(id, decision, user.id);
      if (!res.success) throw new Error(res.error || 'Failed to review leave.');
      successMessage = `Leave request **#${id}** has been marked **${decision}**!`;
    } 
    
    else if (pending.type === 'mark_student_attendance') {
      const { studentId, date, status } = pending.args;
      await attendanceService.recordAttendance(studentId, user.id, date, status);
      successMessage = `Successfully recorded: Student ID **#${studentId}** has been marked **${status}** for **${date}**!`;
    } 
    
    else {
      throw new Error(`Unknown action type: ${pending.type}`);
    }

    conversations.get(conversationId)?.push({ role: 'assistant', content: successMessage });

    return {
      reply: successMessage,
      pendingConfirmation: null,
      conversationId,
    };
  } catch (err: any) {
    const errReply = `An error occurred: ${err.message}. Please try again.`;
    conversations.get(conversationId)?.push({ role: 'assistant', content: errReply });
    return { reply: errReply, pendingConfirmation: null, conversationId };
  }
};