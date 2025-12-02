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
    name: 'Me conhecer',
    desc: 'Teste comportamental',
    price: 49.9,
    period: '/mês',
    features: [
      'DISC',
      'QP',
      'Sabotadores'
    ],
    cta: 'Começar Grátis'
  },
  {
    id: 'kaia-pro',
    name: 'Crescimento saudável',
    desc: 'Para negócios em crescimento',
    price: 89.9,
    period: '/mês',
    featured: true,
    features: [
      '+ Me conhecer',
      'Softskills',
      'Liderança',
      'PDI'
    ],
    cta: 'Escolher Pro'
  },
  {
    id: 'kaia-enterprise',
    name: 'Conselho bom a gente vende',
    desc: 'Soluções sob medida',
    price: 109.9,
    period: '/mês',
    features: [
      '+ Crescimento saudável',
      '2 consultorias (2 horas)',
      'Criação e automatização de soluções',
      '(Até 3 unidades)'
    ],
    cta: 'Falar com Vendas'
  }
];


export function KaiaPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlan(planId);
    // Open WhatsApp with plan context
    const message = encodeURIComponent(`Olá! Tenho interesse no plano "${planName}". Gostaria de saber mais!`);
    window.open(`https://wa.me/5531993044867?text=${message}`, '_blank');
  };

  const formatBRL = (v: number) => v.toFixed(2).replace('.', ',');

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
              <span className="kaia-price-currency">R$</span>
              <span className="kaia-price-value">{formatBRL(plan.price)}</span>
              <span className="kaia-price-period">{plan.period}</span>
            </div>

            <ul className="kaia-price-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button
              className={`kaia-btn ${plan.id === 'kaia-starter' ? 'kaia-btn-oxygen' : (plan.featured ? 'kaia-btn-primary' : 'kaia-btn-secondary')}`}
              style={{ width: '100%', justifyContent: 'center', padding: plan.id === 'kaia-starter' ? '16px 20px' : undefined, fontSize: plan.id === 'kaia-starter' ? '1.05rem' : undefined }}
              onClick={() => handleSelectPlan(plan.id, plan.name)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
