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
        name: 'Me conhecer',
        price: 25,
        currency: 'BRL',
        interval: 'mês',
        description: 'Teste comportamental e autoconhecimento',
        popular: false,
        features: [
            'DISC',
            'QP (Questionário de Perfil)',
            'Sabotadores',
        ]
    },
    {
        id: 'pro',
        name: 'Crescimento saudável',
        price: 69.99,
        currency: 'BRL',
        interval: 'mês',
        description: 'Desenvolvimento contínuo e liderança',
        popular: true,
        features: [
            'Tudo do Me conhecer',
            'Softskills',
            'Liderança',
            'PDI (Plano de Desenvolvimento Individual)'
        ]
    },
    {
        id: 'enterprise',
        name: 'Conselho bom a gente vende',
        price: 120,
        currency: 'BRL',
        interval: 'mês',
        description: 'Consultoria prática e automações',
        popular: false,
        features: [
            'Tudo do Crescimento saudável',
            '2 consultorias (2 horas)',
            'Criação e automatização de soluções (até 3 unidades)'
        ]
    }
];

function PricingSection() {
    const [plans, setPlans] = useState<PricingPlan[]>(LOCAL_PLANS);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        setLoading(false); // Sempre usa planos locais, ignora API
    }, []);

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
