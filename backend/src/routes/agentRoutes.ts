import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { handleChat, confirmAction, handleGetHistory } from '../controllers/agentController';

const router = Router();

// Protect all agent endpoints behind the authentication token check
router.use(verifyToken);

// Chat endpoint (now handles automatic session creation/tracking)
router.post('/chat', handleChat);

// Confirmation endpoint for pending actions
router.post('/confirm', confirmAction);

// History endpoint to fetch past logs when opening the chat window
router.get('/history/:conversationId', handleGetHistory);

export default router;