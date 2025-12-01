import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './context';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3060;

// CORS: allow Vercel frontend(s) and localhost for dev
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
  ...configuredOrigins, // e.g., https://revela-alpha.vercel.app, https://preview-xyz.vercel.app
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.some((o) => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// tRPC middleware
app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
});
