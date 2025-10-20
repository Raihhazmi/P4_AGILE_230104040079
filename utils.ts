import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import pino from 'pino-http';

export const correlationId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.headers['x-correlation-id'] || randomUUID();
  res.setHeader('x-correlation-id', String(id));
  (req as any).correlationId = id;
  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer test123') {
    return res.status(401).json({ message: 'Unauthorized', code: '401' });
  }
  next();
};

export const badJsonHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Invalid JSON', code: 'BAD_JSON' });
  }
  return res.status(500).json({ message: 'Internal Server Error', code: '500' });
};

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const logger = pino({
  customProps: (req) => ({ correlationId: (req as any).correlationId }),
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: { ...req.headers, authorization: '[REDACTED]' },
    }),
  },
});
