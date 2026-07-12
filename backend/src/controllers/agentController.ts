import { Response } from 'express';
import * as agentService from '../services/agentService';
import { AuthenticatedRequest } from '../types';
import { randomUUID } from 'crypto';

export const chatWithAgent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { message, conversationId } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'message is required and must be a string' });
    return;
  }

  if (conversationId != null && typeof conversationId !== 'string') {
    res.status(400).json({ error: 'conversationId must be a string' });
    return;
  }

  const convId = conversationId || randomUUID();

  try {
    const result = await agentService.chat(convId, message, req.user!);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Agent failed to respond', details: err.message });
  }
};

export const confirmAction = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { conversationId, confirmed } = req.body;

  if (!conversationId || confirmed === undefined) {
    res.status(400).json({ error: 'conversationId and confirmed are required' });
    return;
  }

  try {
    const result = await agentService.confirmPendingAction(conversationId, confirmed, req.user!);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process confirmation', details: err.message });
  }
};