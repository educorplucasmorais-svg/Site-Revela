import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  desc: string;
  price: number;
  period: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    id: 'kaia-starter',
    name: 'Starter',
    desc: 'Perfeito para testar e validar',
    price: 49,
    period: '/mês',
    features: [
      '500 mensagens/mês',
      '1 canal (WhatsApp ou Web)',
      'Respostas automáticas básicas',
      'Dashboard de métricas',
      'Suporte por email'
    ],
    cta: 'Começar Grátis'
  },
  {
    id: 'kaia-pro',
    name: 'Pro',
    desc: 'Para negócios em crescimento',
    price: 149,
    period: '/mês',
    featured: true,
    features: [
      '5.000 mensagens/mês',
      '3 canais simultâneos',
      'IA personalizada para sua marca',
      'Integrações com CRM',
      'Analytics avançado',
      'Suporte prioritário'
    ],
    cta: 'Escolher Pro'
  },
  {
    id: 'kaia-enterprise',
    name: 'Enterprise',
    desc: 'Soluções sob medida',
    price: 0,
    period: 'Personalizado',
    features: [
      'Mensagens ilimitadas',
      'Canais ilimitados',
      'IA treinada exclusivamente',
      'API dedicada',
      'SLA garantido',
      'Gerente de conta dedicado'
    ],
    cta: 'Falar com Vendas'
  }
];

export function KaiaPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Scroll to CTA section for now (payment disabled)
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="kaia-pricing">
      <div className="kaia-section-header">
        <span className="kaia-section-label">Planos</span>
        <h2 className="kaia-section-title">Escolha o plano ideal</h2>
        <p className="kaia-section-desc">
          Comece gratuitamente e escale conforme sua necessidade. 
          Sem fidelidade, cancele quando quiser.
        </p>
      </div>

      <div className="kaia-pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`kaia-price-card ${plan.featured ? 'featured' : ''}`}
          >
            {plan.featured && <span className="kaia-price-popular">Mais Popular</span>}
            
            <h3 className="kaia-price-name">{plan.name}</h3>
            <p className="kaia-price-desc">{plan.desc}</p>
            
            <div className="kaia-price-amount">
              {plan.price > 0 ? (
                <>
                  <span className="kaia-price-currency">R$</span>
                  <span className="kaia-price-value">{plan.price}</span>
                  <span className="kaia-price-period">{plan.period}</span>
                </>
              ) : (
                <span className="kaia-price-value" style={{ fontSize: '2rem' }}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="kaia-price-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button
              className={`kaia-btn ${plan.featured ? 'kaia-btn-primary' : 'kaia-btn-secondary'}`}
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
