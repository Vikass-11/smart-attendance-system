import OpenAI from 'openai';
import { getToolsForRole, executeTool, TOOLS } from './agentTools';
import { AppUser } from '../types';

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

const MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

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
  messages: ConversationMessage[];
  pendingAction: PendingAction | null;
}

const conversations = new Map<string, Conversation>();

const SYSTEM_PROMPT = `You are an assistant for a Smart Attendance Management System. You help faculty, admin, and students by answering questions and performing actions using the tools available to you. Break down multi-step requests into individual tool calls. Be concise. If a user asks something outside your tools' scope, say so honestly.`;

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
    conversation = { messages: [{ role: 'system', content: SYSTEM_PROMPT }], pendingAction: null };
    conversations.set(conversationId, conversation);
  }

  conversation.messages.push({ role: 'user', content: userMessage });

  const tools = toOpenAITools(user.role);

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: conversation.messages as any,
    tools,
  });

  const choice = response.choices[0].message;
  conversation.messages.push({ role: 'assistant', content: choice.content || '', tool_calls: choice.tool_calls });

  const toolCall = choice.tool_calls?.[0];

  if (toolCall) {
    const toolName = toolCall.function.name;
    const input = JSON.parse(toolCall.function.arguments);
    const toolDef = TOOLS.find((t) => t.name === toolName);

    if (toolDef?.destructive) {
      conversation.pendingAction = { toolName, input, toolCallId: toolCall.id };
      return {
        reply: choice.content || `I'd like to ${toolName.replace(/_/g, ' ')} with: ${JSON.stringify(input)}. Confirm to proceed?`,
        pendingConfirmation: conversation.pendingAction,
        conversationId,
      };
    }

    const result = await executeTool(toolName, input, user);

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

    const followUpChoice = followUp.choices[0].message;
    conversation.messages.push({ role: 'assistant', content: followUpChoice.content || '' });

    return { reply: followUpChoice.content || 'Done.', pendingConfirmation: null, conversationId };
  }

  return { reply: choice.content || '...', pendingConfirmation: null, conversationId };
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

  const { toolName, input, toolCallId } = conversation.pendingAction;
  conversation.pendingAction = null;

  if (!confirmed) {
    conversation.messages.push({ role: 'tool', tool_call_id: toolCallId, content: 'User declined this action.' });
    return { reply: 'Okay, action cancelled.' };
  }

  const result = await executeTool(toolName, input, user);

  conversation.messages.push({ role: 'tool', tool_call_id: toolCallId, content: JSON.stringify(result) });

  const tools = toOpenAITools(user.role);

  const followUp = await client.chat.completions.create({
    model: MODEL,
    messages: conversation.messages as any,
    tools,
  });

  const followUpChoice = followUp.choices[0].message;
  conversation.messages.push({ role: 'assistant', content: followUpChoice.content || '' });

  return { reply: followUpChoice.content || 'Done.' };
};