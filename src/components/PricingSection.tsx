import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';
import { stripePromise } from '../lib/stripe';
import PaymentModal from './PaymentModal';
import '../styles/pricing.css';

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
    popular: boolean;
    description?: string;
}

// Planos locais como fallback
const LOCAL_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        price: 997,
        currency: 'BRL',
        interval: 'mês',
        description: 'Perfeito para começar',
        popular: false,
        features: [
            'Diagnóstico inicial',
            '2 reuniões/mês',
            'Plano de ação básico',
            'Suporte por email',
            'Relatório mensal'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 2497,
        currency: 'BRL',
        interval: 'mês',
        description: 'Para negócios em crescimento',
        popular: true,
        features: [
            'Tudo do Starter',
            '4 reuniões/mês',
            'Gestão de marketing',
            'Dashboards personalizados',
            'Suporte prioritário',
            'Treinamento da equipe'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 0,
        currency: 'BRL',
        interval: 'mês',
        description: 'Soluções sob medida',
        popular: false,
        features: [
            'Tudo do Pro',
            'Reuniões ilimitadas',
            'Equipe dedicada',
            'Consultoria estratégica',
            'SLA garantido',
            'Gerente de conta'
        ]
    }
];

function PricingSection() {
    const [plans, setPlans] = useState<PricingPlan[]>(LOCAL_PLANS);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const data = await trpc.getPricingPlans.query();
            if (data && data.length > 0) {
                setPlans(data);
            }
        } catch (error) {
            console.error('Using local plans:', error);
            // Silently use local plans
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlan = (plan: PricingPlan) => {
        if (plan.price === 0) {
            // Enterprise - redirect to contact
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    if (loading) {
        return (
            <div className="pricing-loading">
                <div className="loading"></div>
            </div>
        );
    }

    return (
        <>
            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {plan.popular && (
                            <span className="pricing-badge">MAIS POPULAR</span>
                        )}

                        <div className="pricing-header">
                            <h3 className="pricing-name">{plan.name}</h3>
                            <p className="pricing-description">{plan.description}</p>
                            
                            <div className="pricing-price">
                                {plan.price === 0 ? (
                                    <span className="pricing-custom">Personalizado</span>
                                ) : (
                                    <>
                                        <span className="pricing-currency">R$</span>
                                        <span className="pricing-value">{plan.price.toLocaleString('pt-BR')}</span>
                                        <span className="pricing-interval">/{plan.interval}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <ul className="pricing-features">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="pricing-feature">
                                    <span className="pricing-check">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSelectPlan(plan)}
                            className={`pricing-btn ${plan.popular ? 'pricing-btn-primary' : 'pricing-btn-secondary'}`}
                        >
                            {plan.price === 0 ? 'Falar com Vendas' : plan.popular ? 'Escolher Pro' : 'Começar Grátis'}
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
