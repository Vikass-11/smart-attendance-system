import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leaveRoutes from './routes/leaveRoutes';
import adminRoutes from './routes/adminRoutes';
import reportRoutes from './routes/reportRoutes';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;