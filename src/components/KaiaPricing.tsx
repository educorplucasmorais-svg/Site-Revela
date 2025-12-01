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
    price: 25,
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
    price: 69.99,
    period: '/mês',
    featured: true,
    features: [
      '+opções anteriores',
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
    price: 120,
    period: '/mês',
    features: [
      '+opções anteriores',
      '2 consultorias (2 horas)',
      'Criação e automatização de soluções',
      '(Até 3 unidades)'
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
              <span className="kaia-price-currency">R$</span>
              <span className="kaia-price-value">{plan.price}</span>
              <span className="kaia-price-period">{plan.period}</span>
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
