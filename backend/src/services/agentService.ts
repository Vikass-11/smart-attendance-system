import OpenAI from 'openai';
import { getToolsForRole, executeTool, TOOLS } from './agentTools';
import { AppUser } from '../types';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const MODEL = process.env.GROQ_MODEL || 'qwen-2.5-32b';

interface ConversationMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tool_calls?: any[];
  tool_call_id?: string;
}

interface PendingAction {
  toolName: string;
  input: any;
  toolCallId: string;
}

interface Conversation {
  userId: number;
  messages: ConversationMessage[];
  pendingAction: PendingAction | null;
}

const conversations = new Map<string, Conversation>();

const getSystemPrompt = (user: AppUser) => `You are an AI assistant for the College Management System.
Today's date is ${new Date().toISOString().split('T')[0]}.

Your job is to understand natural language, identify the user's intent, and perform the appropriate action using the available tools.

## Roles
The authenticated user's role will be provided as one of:
- Admin
- Faculty
- Student

Always enforce role-based access.

---

## Admin Permissions
Admin has complete access to the system.
Admin can:
- Manage students
- Manage faculty
- Manage courses
- Manage attendance
- Manage leave requests
- Promote users
- View reports
- View dashboards
- View all users
- Search any record
- View statistics
- Approve or reject requests
Never hide information from Admin unless it is confidential system information.

---

## Faculty Permissions
Faculty can:
- View assigned courses
- View students
- Mark attendance
- Update attendance
- View attendance
- Apply leave
- View their own leave status
- View students enrolled in their courses
Faculty cannot:
- Delete students
- Promote users
- View system-wide reports
- Manage admins
- View confidential admin information

---

## Student Permissions
Students can:
- View their own attendance
- View their own profile
- View their own courses
- Apply for leave
- View leave status
- View timetable
- View announcements
Students cannot:
- View other students' data
- View faculty details
- View admin data
- Mark attendance
- Modify attendance
- Manage courses
- Approve leave

---

## Behaviour
Always understand natural language.
Examples:
"mark attendance for student1 today"
"make student 4 absent"
"who is absent today"
"show today's attendance"
"which students applied leave"
"list courses"
"show faculty"
"who teaches DBMS"
"show my attendance"
"how many students are present"
Understand synonyms automatically.

---

## Tool Usage
If a suitable tool exists:
- Extract parameters.
- Call the tool.
- Show a friendly response.

Example:
User: Mark student ID 3 present today.
Assistant: The attendance for student ID 3 has been marked as Present for today.

Do NOT expose raw JSON.
Do NOT ask for confirmation unless the action is destructive (delete, permanently remove, etc.).

---

## Missing Information
If required information is missing, ask a short follow-up question.
Example:
"Mark attendance."
↓
Which student would you like to mark attendance for?

---

## If No Tool Exists
Never say: "I am not able to..."
Instead explain naturally.
Example: "The system currently doesn't support listing faculty members." or "Faculty listing isn't available yet. Once that feature is added, I'll be able to show all faculty members."
Likewise: "The course listing feature hasn't been implemented yet."

---

## Unauthorized Requests
If the logged-in user's role is not allowed to perform an action, politely refuse.
Example:
Student: List all students.
↓
You don't have permission to view the student directory.

Example:
Student: Show faculty members.
↓
You don't have permission to access faculty information.

Example:
Faculty: Promote student to faculty.
↓
Only administrators can promote users.

---

## Response Style
- Be conversational.
- Be concise.
- Never mention tools.
- Never mention internal implementation.
- Never expose API payloads.
- Never expose JSON.
- Always answer in natural language.

---

## Context
Current User:
Role: ${user.role}
User ID: ${user.id}
Name: ${user.name}

Use this information to decide what data the user is allowed to access.
If the request is ambiguous, ask only the minimum clarification needed.
Always prefer answering naturally over exposing implementation details.

IMPORTANT: Tools like mark_attendance, review_leave_request, and others require a numeric studentId or leaveId, never a name. If the user refers to a student or leave request by name rather than ID, you MUST first call get_students (or get_leave_requests) to look up the correct numeric ID. DO NOT ask the user for the ID. Once you receive the tool response with the actual numeric ID, you can then proceed to use the follow-up tool. Never guess or pass a name string where a number is required.`;

const REFUSAL_MESSAGE = "I can't share my internal configuration, but I'm happy to help with attendance, leave, or reports.";

// Second-layer defense: catches leaks even if the model ignores its system prompt.
// Small/free models are less reliable at following instructions, so this output-side
// filter is a necessary backstop, not just the prompt-level rule alone.
const containsPromptLeak = (text: string): boolean => {
  const lowered = text.toLowerCase();
  const leakIndicators = [
    'system prompt',
    'system-level guidance',
    'developer-specific directive',
    'security rules',
    'operating rules',
    'knowledge cutoff',
    'trained by',
    'these rules shape',
    'instructions that govern',
  ];
  return leakIndicators.some((indicator) => lowered.includes(indicator));
};

const sanitizeReply = (text: string): string => {
  if (!text) return text;
  return containsPromptLeak(text) ? REFUSAL_MESSAGE : text;
};

const safeParseArguments = (raw: string): any => {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const toOpenAITools = (role: string) =>
  getToolsForRole(role).map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }));

export const chat = async (
  conversationId: string,
  userMessage: string,
  user: AppUser
): Promise<{ reply: string; pendingConfirmation: PendingAction | null; conversationId: string }> => {
  let conversation = conversations.get(conversationId);
  if (!conversation) {
    conversation = { userId: user.id, messages: [{ role: 'system', content: getSystemPrompt(user) }], pendingAction: null };
    conversations.set(conversationId, conversation);
  } else if (conversation.userId !== user.id) {
    throw new Error('Conversation not found');
  }

  conversation.messages.push({ role: 'user', content: userMessage });

  const tools = toOpenAITools(user.role);

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: conversation.messages as any,
    tools,
  });

  if (!response.choices || response.choices.length === 0) {
    return { reply: 'The assistant is temporarily unavailable. Please try again.', pendingConfirmation: null, conversationId };
  }
  const choice = response.choices[0].message;
  conversation.messages.push({ role: 'assistant', content: choice.content || '', tool_calls: choice.tool_calls });

  const toolCall = choice.tool_calls?.[0];

  if (toolCall && toolCall.type === 'function') {
    const toolName = toolCall.function.name;
    const input = safeParseArguments(toolCall.function.arguments);
    const toolDef = TOOLS.find((t) => t.name === toolName);

    if (!toolDef) {
      return {
        reply: "I tried to use a tool that isn't available. Please rephrase your request.",
        pendingConfirmation: null,
        conversationId,
      };
    }

    if (toolDef.destructive) {
      conversation.pendingAction = { toolName, input, toolCallId: toolCall.id };
      const proposedReply = choice.content || `I'd like to ${toolName.replace(/_/g, ' ')} with: ${JSON.stringify(input)}. Confirm to proceed?`;
      console.log('RAW MODEL REPLY BEFORE SANITIZE:', proposedReply);
      return {
        reply: sanitizeReply(proposedReply),
        pendingConfirmation: conversation.pendingAction,
        conversationId,
      };
    }

    let result: any;
    try {
      result = await executeTool(toolName, input, user);
    } catch (err: any) {
      result = { error: err.message };
    }

    conversation.messages.push({
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify(result),
    });

    const followUp = await client.chat.completions.create({
      model: MODEL,
      messages: conversation.messages as any,
      tools,
    });

    if (!followUp.choices || followUp.choices.length === 0) {
      return { reply: sanitizeReply(choice.content || 'Done, but I could not generate a summary.'), pendingConfirmation: null, conversationId };
    }
    const followUpChoice = followUp.choices[0].message;
    conversation.messages.push({ role: 'assistant', content: followUpChoice.content || '' });

    return { reply: sanitizeReply(followUpChoice.content || 'Done.'), pendingConfirmation: null, conversationId };
  }

  return { reply: sanitizeReply(choice.content || '...'), pendingConfirmation: null, conversationId };
};

export const confirmPendingAction = async (
  conversationId: string,
  confirmed: boolean,
  user: AppUser
): Promise<{ reply: string }> => {
  const conversation = conversations.get(conversationId);

  if (!conversation?.pendingAction) {
    return { reply: 'No pending action to confirm.' };
  }

  if (!conversation.pendingAction) {
    return { reply: 'No pending action to confirm.' };
  }

  const { toolName, input, toolCallId } = conversation.pendingAction;
  conversation.pendingAction = null;

  if (!confirmed) {
    conversation.messages.push({ role: 'tool', tool_call_id: toolCallId, content: 'User declined this action.' });
    return { reply: 'Okay, action cancelled.' };
  }

  let result: any;
  try {
    result = await executeTool(toolName, input, user);
  } catch (err: any) {
    result = { error: err.message };
  }

  conversation.messages.push({ role: 'tool', tool_call_id: toolCallId, content: JSON.stringify(result) });
  const tools = toOpenAITools(user.role);

  const followUp = await client.chat.completions.create({
    model: MODEL,
    messages: conversation.messages as any,
    tools,
  });

  if (!followUp.choices || followUp.choices.length === 0) {
    return { reply: 'Action completed, but I could not generate a summary.' };
  }

  const followUpChoice = followUp.choices[0].message;
  conversation.messages.push({ role: 'assistant', content: followUpChoice.content || '' });

  return { reply: sanitizeReply(followUpChoice.content || 'Done.') };
};