import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { query as dbQuery } from './lib/db';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
    // Try to resolve current user from Bearer token stored in sessions table
    let user: { id: number; email: string; name?: string } | null = null;
    let token: string | null = null;

    try {
        const auth = (req.headers?.authorization as string) || '';
        if (auth && auth.startsWith('Bearer ')) {
            token = auth.slice(7);
            const rows: any = await dbQuery(
                `SELECT s.* , u.id as user_id, u.email, u.name
                 FROM sessions s
                 JOIN users u ON s.user_id = u.id
                 WHERE s.token = ? AND (s.expires_at IS NULL OR s.expires_at > NOW())
                 LIMIT 1`,
                [token]
            );

            if (rows && Array.isArray(rows) && rows.length > 0) {
                const r = rows[0];
                user = { id: r.user_id, email: r.email, name: r.name };
            }
        }
    } catch (e) {
        console.warn('Context DB check failed:', (e as any)?.message || e);
    }

    return {
        req,
        res,
        user,
        token,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
