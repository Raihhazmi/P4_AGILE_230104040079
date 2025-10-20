import express from 'express';
import { z } from 'zod';
import { auth, limiter, logger, correlationId, badJsonHandler } from '../../../utils';

const app = express();
app.use(express.json());
app.use(correlationId);
app.use(logger);
app.use(limiter);

const orderSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

app.post('/orders', auth, (req, res) => {
  const parse = orderSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: 'Validation error', code: '400' });
  }

  const order = {
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    status: 'created',
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(order);
});

app.use(badJsonHandler);

export default app;
