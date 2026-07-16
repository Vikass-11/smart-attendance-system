import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { chatWithAgent, confirmAction } from '../controllers/agentController';

const router = Router();

router.use(verifyToken);

router.post('/chat', chatWithAgent);
router.post('/confirm', confirmAction);

export default router;