import express from 'express';
import { auth, limiter, logger, correlationId, badJsonHandler } from '../../../utils';

const app = express();
app.use(express.json());
app.use(correlationId);
app.use(logger);
app.use(limiter);

app.get('/notifications', auth, (req, res) => {
  const notifications = [
    {
      id: 'N001',
      message: 'Pesanan Anda telah diproses',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'N002',
      message: 'Pesanan Anda sedang dikirim',
      createdAt: new Date().toISOString(),
    },
  ];
  res.status(200).json({ notifications });
});

app.use(badJsonHandler);

export default app;
