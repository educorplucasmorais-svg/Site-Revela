import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import Stripe from 'stripe';
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
});

export type AppRouter = typeof appRouter;
