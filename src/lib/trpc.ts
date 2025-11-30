import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { appRouter } from '../../server/router';
import { apiUrl } from './api';

export const trpc = createTRPCProxyClient<typeof appRouter>({
    links: [
        httpBatchLink({
            url: apiUrl('/api/trpc'),
            headers() {
                try {
                    if (typeof window !== 'undefined') {
                        const t = localStorage.getItem('revela_token');
                        if (t) return { Authorization: `Bearer ${t}` };
                    }
                } catch (e) {
                    // ignore
                }
                return {};
            },
        }),
    ],
});
