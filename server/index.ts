import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './context';

const app = express();
const PORT = process.env.PORT || 3000;

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

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app (production only)
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../../client');
    app.use(express.static(clientDistPath));

    app.get('*', (req, res) => {
        // Don't intercept API routes
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
