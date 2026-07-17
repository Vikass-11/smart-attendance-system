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

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    // 1. Safe-cast the conversationId parameter to a string
    const conversationId = req.params.conversationId as string;

    // 2. Safe-cast the request object to bypass the missing 'user' type error
    const userId = (req as any).user.id; 

    // 3. Retrieve the secure chat history matching this user
    const history = await agentService.getMessagesBySession(conversationId, userId);
    
    return res.json(history);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};