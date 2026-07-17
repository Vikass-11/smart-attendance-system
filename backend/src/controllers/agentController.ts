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

    // Fallback if no conversation ID is provided at all
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined') {
      conversationId = randomUUID();
    }

    try {
      // Attempt to proceed with the given session ID
      const result = await agentService.chat(conversationId, message, user);
      return res.status(200).json(result);
    } catch (error: any) {
      // Handle the case where the frontend sent a leftover session ID belonging to another user
      if (error.message && error.message.includes('own this chat session')) {
        console.warn(`Ownership mismatch: User ${user.id} attempted to use session ${conversationId}. Resetting session.`);
        
        // Silently generate a clean, brand-new UUID for this user
        const newConversationId = randomUUID();
        const result = await agentService.chat(newConversationId, message, user);
        
        // Return the successful response and append the new ID so the frontend can update itself
        return res.status(200).json({
          ...result,
          conversationId: newConversationId
        });
      }
      
      // Rethrow other unexpected errors
      throw error;
    }
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

    const userId = user.id;

    try {
      // Safely load history
      const history = await agentService.getMessagesBySession(conversationId, userId);
      return res.json(history);
    } catch (error: any) {
      // If ownership check fails, return an empty array instead of throwing a 500.
      // This allows the frontend to safely render a blank chat window.
      if (error.message && error.message.includes('own this chat session')) {
        console.warn(`Prevented user ${userId} from accessing history of session ${conversationId}`);
        return res.json([]);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};