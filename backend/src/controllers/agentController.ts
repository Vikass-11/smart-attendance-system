import { Request, Response } from 'express';
import * as agentService from '../services/agentService';
import { randomUUID } from 'crypto';

// 1. Handles sending a chat message and managing session persistence
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    let { conversationId } = req.body;
    const user = (req as any).user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!conversationId) {
      conversationId = randomUUID();
    }

    const result = await agentService.chat(conversationId, message, user);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error in agent controller handleChat:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 2. Handles confirmation of pending actions (e.g., confirming read-only alerts)
export const confirmAction = async (req: Request, res: Response) => {
  try {
    const { conversationId, confirmed } = req.body;
    const user = (req as any).user;

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required.' });
    }

    const result = await agentService.confirmPendingAction(conversationId, confirmed, user);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error in agent controller confirmAction:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 3. Fetches past chat logs for a session when the chat UI opens
// 3. Fetches past chat logs for a session when the chat UI opens
export const handleGetHistory = async (req: Request, res: Response) => {
  try {
    // Explicitly cast to string to satisfy the TypeScript compiler
    const conversationId = req.params.conversationId as string;
    
    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required.' });
    }
    
    const messages = await agentService.getMessagesBySession(conversationId);
    return res.status(200).json({ messages });
  } catch (error: any) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};