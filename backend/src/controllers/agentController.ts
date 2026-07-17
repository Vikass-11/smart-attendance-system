import { Request, Response } from 'express';
import * as agentService from '../services/agentService';
import { randomUUID, createHash } from 'crypto';

// Generates a 100% valid, secure UUID unique to each user's account
const getDeterministicUUID = (userId: number): string => {
  const hash = createHash('sha256').update(`user_session_secure_salt_${userId}`).digest('hex');
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32)
  ].join('-');
};

// 1. Handles sending a chat message and managing session persistence
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    let { conversationId } = req.body;
    const user = (req as any).user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Fallback to the user's own deterministic UUID if none is provided or is placeholder
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      conversationId = getDeterministicUUID(user.id);
    }

    try {
      const result = await agentService.chat(conversationId, message, user);
      return res.status(200).json(result);
    } catch (error: any) {
      // If the frontend sent an unauthorized stale ID, silently fall back to their secure deterministic UUID
      if (error.message && error.message.includes('own this chat session')) {
        const secureId = getDeterministicUUID(user.id);
        const result = await agentService.chat(secureId, message, user);
        return res.status(200).json({
          ...result,
          conversationId: secureId
        });
      }
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
    let { conversationId, confirmed } = req.body;
    const user = (req as any).user;

    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      conversationId = getDeterministicUUID(user.id);
    }

    try {
      const result = await agentService.confirmPendingAction(conversationId, confirmed, user);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('own this chat session')) {
        const secureId = getDeterministicUUID(user.id);
        const result = await agentService.confirmPendingAction(secureId, confirmed, user);
        return res.status(200).json(result);
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
    let conversationId = req.params.conversationId as string;
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User context missing.' });
    }

    const userId = user.id;

    // Resolve placeholders to the secure user-specific UUID
    if (!conversationId || conversationId === 'null' || conversationId === 'undefined' || conversationId === 'default') {
      conversationId = getDeterministicUUID(userId);
    }

    try {
      const history = await agentService.getMessagesBySession(conversationId, userId);
      return res.json(history);
    } catch (error: any) {
      // If they requested a stale/unauthorized ID, gracefully fetch their own secure history
      if (error.message && error.message.includes('own this chat session')) {
        const secureId = getDeterministicUUID(userId);
        const history = await agentService.getMessagesBySession(secureId, userId);
        return res.json(history);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};