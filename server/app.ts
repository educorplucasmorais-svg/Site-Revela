import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './context';

// Load env (Vercel provides process.env automatically; config() harmless there)
config();

const app = express();

const frontendOriginsEnv = process.env.FRONTEND_ORIGINS || process.env.FRONTEND_URL || '';
const configuredOrigins = frontendOriginsEnv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3050',
  'http://localhost:3051',
  'http://localhost:5173',
  ...configuredOrigins,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some((o) => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;