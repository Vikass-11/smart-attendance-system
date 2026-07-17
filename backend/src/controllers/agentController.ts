import { Request, Response } from 'express';
import * as agentService from '../services/agentService';
import { createHash } from 'crypto';

// Generates a 100% compliant, secure version-4 UUID unique to each user
const getDeterministicUUID = (userId: number): string => {
  const hash = createHash('sha256').update(`user_session_secure_salt_${userId}`).digest('hex');
  
  const part1 = hash.substring(0, 8);
  const part2 = hash.substring(8, 12);
  const part3 = '4' + hash.substring(13, 16); // Force version 4 compliant char
  
  const originalChar17 = hash.charAt(16);
  const validHex = ['8', '9', 'a', 'b'];
  const index = parseInt(originalChar17, 16) % 4;
  const part4 = validHex[index] + hash.substring(17, 20); // Force valid variant
  
  const part5 = hash.substring(20, 32);
  
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
};

// 1. Handles sending a chat message and managing session persistence
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const user = (req as any).user;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Force every message to be saved under the user's permanent, secure UUID.
    // This completely bypasses frontend stale storage and synchronization bugs.
    const secureId = getDeterministicUUID(user.id);

    const result = await agentService.chat(secureId, message, user);
    
    // Return the result and append the secure ID so the frontend can stay in sync
    return res.status(200).json({
      ...result,
      conversationId: secureId
    });
  } catch (error: any) {
    console.error('Error in agent controller handleChat:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 2. Handles confirmation of pending actions (e.g., confirming read-only alerts)
export const confirmAction = async (req: Request, res: Response) => {
  try {
    const { confirmed } = req.body;
    const user = (req as any).user;

    const secureId = getDeterministicUUID(user.id);
    const result = await agentService.confirmPendingAction(secureId, confirmed, user);
    
    return res.status(200).json({
      ...result,
      conversationId: secureId
    });
  } catch (error: any) {
    console.error('Error in agent controller confirmAction:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 3. Handles fetching secure history for the logged-in user
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user; 

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. User context missing.' });
    }

    const userId = user.id;

    // Force history lookup to pull from their deterministic, secure UUID
    const secureId = getDeterministicUUID(userId);

    const history = await agentService.getMessagesBySession(secureId, userId);
    
    return res.json(history);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};