import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import Stripe from 'stripe';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import type { Context } from './context';
import { query as dbQuery } from './lib/db';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

// Define your routes here
export const appRouter = router({
    auth: router({
        // Login with username/email + password
        login: publicProcedure
            .input(z.object({ username: z.string(), password: z.string() }))
            .mutation(async ({ input }) => {
                const rows: any = await dbQuery(
                    `SELECT id, password_hash, email, name FROM users WHERE (email = ? OR name = ?) LIMIT 1`,
                    [input.username, input.username]
                );

                if (!rows || rows.length === 0) {
                    throw new Error('Credenciais inválidas');
                }

                const user = rows[0];
                const ok = await bcrypt.compare(input.password, user.password_hash || '');
                if (!ok) throw new Error('Credenciais inválidas');

                // create session token
                const token = crypto.randomBytes(48).toString('hex');
                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

                await dbQuery(`INSERT INTO sessions (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())`, [user.id, token, expiresAt]);

                return {
                    success: true,
                    token,
                    user: { id: user.id, email: user.email, name: user.name },
                };
            }),

        // Return current authenticated user (if any)
        whoami: publicProcedure.query(async ({ ctx }) => {
            return ctx.user || null;
        }),

        // Logout: remove session by token
        logout: publicProcedure.mutation(async ({ ctx }) => {
            const auth = (ctx.req.headers.authorization as string) || '';
            if (!auth || !auth.startsWith('Bearer ')) return { success: true };
            const token = auth.slice(7);
            try {
                await dbQuery(`DELETE FROM sessions WHERE token = ?`, [token]);
            } catch (e) {
                console.warn('Failed to delete session', e);
            }
            return { success: true };
        }),
    }),
    // Contact form submission
    submitContact: publicProcedure
        .input(
            z.object({
                name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
                email: z.string().email('Email inválido'),
                phone: z.string().min(10, 'Telefone inválido'),
                company: z.string().optional(),
                message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
            })
        )
        .mutation(async ({ input }) => {
                console.log('Contact form submission:', input);

                try {
                    // Try to persist to MySQL if configured
                    await dbQuery(
                        `INSERT INTO contacts (name, email, phone, company, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
                        [input.name, input.email, input.phone || null, input.company || null, input.message]
                    );
                } catch (e: any) {
                    console.warn('Failed to persist contact to DB:', e?.message || e);
                }

                await new Promise((resolve) => setTimeout(resolve, 500));

                return {
                    success: true,
                    message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
                };
        }),

    // Get services/features
    getServices: publicProcedure.query(async () => {
        return [
            {
                id: 1,
                title: 'Estratégia de Crescimento',
                description: 'Planejamento estratégico focado em resultados mensuráveis e crescimento sustentável',
                icon: '📈',
            },
            {
                id: 2,
                title: 'Execução Prática',
                description: 'Implementação hands-on com metodologias ágeis usadas por grandes startups',
                icon: '⚡',
            },
            {
                id: 3,
                title: 'Análise de Dados',
                description: 'Decisões baseadas em dados e métricas reais para maximizar resultados',
                icon: '📊',
            },
        ];
    }),

    // Get pricing plans
    getPricingPlans: publicProcedure.query(async () => {
        return [
            {
                id: 'starter',
                name: 'Diagnóstico',
                price: 497,
                currency: 'BRL',
                interval: 'único',
                features: [
                    'Análise completa do negócio',
                    'Identificação de gargalos',
                    'Plano de ação personalizado',
                    'Relatório detalhado',
                    '1 sessão de acompanhamento',
                ],
                popular: false,
            },
            {
                id: 'professional',
                name: 'Crescimento',
                price: 2997,
                currency: 'BRL',
                interval: 'mensal',
                features: [
                    'Tudo do Diagnóstico',
                    'Execução hands-on',
                    'Reuniões semanais',
                    'Acesso ao time completo',
                    'Ferramentas e templates',
                    'Suporte prioritário',
                ],
                popular: true,
            },
            {
                id: 'enterprise',
                name: 'C-Level as a Service',
                price: 9997,
                currency: 'BRL',
                interval: 'mensal',
                features: [
                    'Tudo do Crescimento',
                    'Time executivo dedicado',
                    'Estratégia personalizada',
                    'Implementação completa',
                    'Treinamento do time',
                    'Resultados garantidos',
                ],
                popular: false,
            },
        ];
    }),

    // Create payment intent (Stripe)
    createPaymentIntent: publicProcedure
        .input(
            z.object({
                planId: z.string(),
                paymentMethod: z.enum(['card', 'boleto', 'pix']),
                customerInfo: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    phone: z.string(),
                    cpf: z.string().optional(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            try {
                // Get plan details
                const plans = await appRouter.createCaller({} as Context).getPricingPlans();
                const plan = plans.find(p => p.id === input.planId);

                if (!plan) {
                    throw new Error('Plano não encontrado');
                }

                // Create payment intent based on method
                if (input.paymentMethod === 'card') {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: plan.price * 100, // Convert to cents
                        currency: 'brl',
                        payment_method_types: ['card'],
                        metadata: {
                            planId: input.planId,
                            customerName: input.customerInfo.name,
                            customerEmail: input.customerInfo.email,
                        },
                    });

                    return {
                        success: true,
                        clientSecret: paymentIntent.client_secret,
                        paymentIntentId: paymentIntent.id,
                    };
                } else if (input.paymentMethod === 'pix') {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: plan.price * 100,
                        currency: 'brl',
                        payment_method_types: ['pix'],
                        metadata: {
                            planId: input.planId,
                            customerName: input.customerInfo.name,
                            customerEmail: input.customerInfo.email,
                        },
                    });

                    return {
                        success: true,
                        clientSecret: paymentIntent.client_secret,
                        paymentIntentId: paymentIntent.id,
                    };
                } else if (input.paymentMethod === 'boleto') {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: plan.price * 100,
                        currency: 'brl',
                        payment_method_types: ['boleto'],
                        payment_method_options: {
                            boleto: {
                                expires_after_days: 3,
                            },
                        },
                        metadata: {
                            planId: input.planId,
                            customerName: input.customerInfo.name,
                            customerEmail: input.customerInfo.email,
                        },
                    });

                    return {
                        success: true,
                        clientSecret: paymentIntent.client_secret,
                        paymentIntentId: paymentIntent.id,
                    };
                }

                throw new Error('Método de pagamento inválido');
            } catch (error: any) {
                console.error('Payment error:', error);
                throw new Error(error.message || 'Erro ao processar pagamento');
            }
        }),

    // Newsletter subscription
    subscribeNewsletter: publicProcedure
        .input(
            z.object({
                email: z.string().email('Email inválido'),
            })
        )
        .mutation(async ({ input }) => {
            console.log('Newsletter subscription:', input);

            await new Promise((resolve) => setTimeout(resolve, 300));

            return {
                success: true,
                message: 'Inscrição realizada com sucesso!',
            };
        }),

    // Send WhatsApp message via Meta Graph API (server-side)
    sendWhatsapp: publicProcedure
        .input(
            z.object({
                to: z.string().optional(),
                text: z.string().min(1, 'Texto obrigatório'),
                name: z.string().optional(),
                topic: z.enum(['consultoria','kaia','servicos','precos','suporte']).optional(),
                dryRun: z.boolean().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const phoneId = process.env.WHATSAPP_PHONE_ID;
            const token = process.env.WHATSAPP_TOKEN;
            const defaultTo = process.env.WHATSAPP_PHONE || process.env.WHATSAPP_DEFAULT_NUMBER || process.env.WHATSAPP_TO;

            const to = input.to || defaultTo || '5531993044867';

            // Compose a simple assistant opening reply to assist triage
            const greeting = `Olá${input.name ? `, ${input.name}` : ''}! 👋 Sou o assistente da Revela.`;
            const menu = `Posso ajudar com:\n1) Consultoria e diagnóstico\n2) Kaia (app e hub)\n3) Serviços e soluções\n4) Preços e planos\n5) Suporte`;
            const tip = `Responda com o número da opção ou descreva sua necessidade.`;
            const topicHint = input.topic ? `\nPercebi interesse em: ${input.topic}. Vou direcionar melhor.` : '';
            const assembled = `${greeting}\n\n${menu}\n\n${tip}${topicHint}\n\nMensagem inicial: "${input.text}"`;

            // Dry-run mode (for tests/local without WhatsApp credentials)
            if (input.dryRun || !phoneId || !token) {
                return { success: true, mode: 'mock', to, preview: assembled };
            }

            if (!to) throw new Error('Número destino não informado');

            try {
                const body = {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to,
                    type: 'text',
                    text: {
                        preview_url: true,
                        body: assembled,
                    },
                };

                const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;

                const res = await axios.post(url, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 8000,
                });

                return { success: true, data: res.data };
            } catch (e: any) {
                console.error('WhatsApp send error:', e?.response?.data || e?.message || e);
                throw new Error(e?.response?.data?.error?.message || e?.message || 'Falha ao enviar WhatsApp');
            }
        }),
});

export type AppRouter = typeof appRouter;
