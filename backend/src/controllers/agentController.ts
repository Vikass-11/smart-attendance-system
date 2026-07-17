import { Request, Response } from 'express';
import * as agentService from '../services/agentService';
import { randomUUID } from 'crypto';

// Helper to guarantee a conversationId is unique to the logged-in user
const getScopedConversationId = (conversationId: string | undefined, userId: number): string => {
  const prefix = `user_${userId}_`;
  
  // If no ID is provided, or if it's a generic fallback string
  if (!conversationId || conversationId === 'default' || conversationId === 'null' || conversationId === 'undefined') {
    return `${prefix}${randomUUID()}`;
  }
  
  // If already scoped to this user, leave it as is
  if (conversationId.startsWith(prefix)) {
    return conversationId;
  }
  
  // Otherwise, prepend the user scope to make it unique
  return `${prefix}${conversationId}`;
};

// 1. Handles sending a chat message and managing session persistence
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { conversationId } = req.body;
    const user = (req as any).user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Securely scope the session ID on the backend
    const scopedId = getScopedConversationId(conversationId, user.id);

    const result = await agentService.chat(scopedId, message, user);
    
    // Return the scoped ID back so the frontend can track it
    return res.status(200).json({
      ...result,
      conversationId: scopedId
    });
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

    const scopedId = getScopedConversationId(conversationId, user.id);
    const result = await agentService.confirmPendingAction(scopedId, confirmed, user);
    
    return res.status(200).json({
      ...result,
      conversationId: scopedId
    });
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

    // Apply the same user-scoped check to prevent cross-account history reading
    const scopedId = getScopedConversationId(conversationId, userId);

    const history = await agentService.getMessagesBySession(scopedId, userId);
    
    return res.json(history);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};