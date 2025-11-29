import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';
import { stripePromise } from '../lib/stripe';
import PaymentModal from './PaymentModal';

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
    popular: boolean;
}

function PricingSection() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const data = await trpc.getPricingPlans.query();
            setPlans(data);
        } catch (error) {
            console.error('Error loading plans:', error);
            toast.error('Erro ao carregar planos');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlan = (plan: PricingPlan) => {
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                <div className="loading"></div>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-3">
                {plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className="card fade-in-up"
                        style={{
                            animationDelay: `${index * 100}ms`,
                            position: 'relative',
                            border: plan.popular ? '2px solid var(--color-primary)' : undefined,
                            transform: plan.popular ? 'scale(1.05)' : undefined,
                        }}
                    >
                        {plan.popular && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '0.375rem 1rem',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    boxShadow: 'var(--shadow-glow)',
                                }}
                            >
                                MAIS POPULAR
                            </div>
                        )}

                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                            <h3
                                style={{
                                    fontSize: '1.5rem',
                                    marginBottom: 'var(--space-sm)',
                                    color: plan.popular ? 'var(--color-primary)' : 'var(--color-text)',
                                }}
                            >
                                {plan.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>R$</span>
                                <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                    {plan.price.toLocaleString('pt-BR')}
                                </span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                    /{plan.interval}
                                </span>
                            </div>
                        </div>

                        <ul style={{ listStyle: 'none', marginBottom: 'var(--space-xl)', display: 'grid', gap: 'var(--space-sm)' }}>
                            {plan.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--space-sm)',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }}>✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSelectPlan(plan)}
                            className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                            style={{ width: '100%' }}
                        >
                            Escolher Plano →
                        </button>
                    </div>
                ))}
            </div>

            {showPaymentModal && selectedPlan && (
                <Elements stripe={stripePromise}>
                    <PaymentModal
                        plan={selectedPlan}
                        onClose={() => {
                            setShowPaymentModal(false);
                            setSelectedPlan(null);
                        }}
                    />
                </Elements>
            )}
        </>
    );
}

export default PricingSection;
