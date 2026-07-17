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

    // Generate a fresh dynamic UUID if none is supplied
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      conversationId = randomUUID();
    }

    try {
      const result = await agentService.chat(conversationId, message, user);
      return res.status(200).json({
        ...result,
        conversationId // Always return the active ID so the frontend can capture it
      });
    } catch (error: any) {
      // If the frontend sent an expired session ID from a previous login, reset cleanly
      if (error.message && error.message.includes('own this chat session')) {
        const newId = randomUUID();
        const result = await agentService.chat(newId, message, user);
        return res.status(200).json({
          ...result,
          conversationId: newId
        });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error in agent controller handleChat:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 2. Handles confirmation of pending actions
export const confirmAction = async (req: Request, res: Response) => {
  try {
    const { conversationId, confirmed } = req.body;
    const user = (req as any).user;

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required.' });
    }

    try {
      const result = await agentService.confirmPendingAction(conversationId, confirmed, user);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('own this chat session')) {
        return res.status(403).json({ error: "Unauthorized: You do not own this chat session." });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error in agent controller confirmAction:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 3. Handles fetching secure history for the logged-in user
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User context missing.' });
    }

    // If it's a generic session, return an empty array safely
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      return res.json([]);
    }

    try {
      const history = await agentService.getMessagesBySession(conversationId, user.id);
      return res.json(history || []);
    } catch (error: any) {
      if (error.message && error.message.includes('own this chat session')) {
        console.warn(`Prevented user ${user.id} from accessing history of session ${conversationId}`);
        return res.json([]);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};