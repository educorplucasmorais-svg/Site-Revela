import React, { useState } from 'react';
import PaymentModal from './PaymentModal';

export function KaiaPricing() {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<{
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
  } | null>(null);

  const openStarter = (): void => {
    setPlan({
      id: 'kaia-starter',
      name: 'Starter',
      price: 49,
      currency: 'BRL',
      interval: 'month',
    });
    setIsOpen(true);
  };

  return (
    <section id="pricing" style={{ padding: '48px 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Planos e Preços</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <div style={{ border: '1px solid #333', borderRadius: 10, padding: 16 }}>
          <h3>Starter</h3>
          <p style={{ opacity: 0.85 }}>Ideal para validar a Kaia no seu negócio.</p>
          <p><strong>R$ 49/mês</strong></p>
          <button
            className="btn btn-primary"
            onClick={openStarter}
            style={{ padding: '10px 16px', borderRadius: 8 }}
          >
            Experimentar
          </button>
        </div>
        <div style={{ border: '1px solid #333', borderRadius: 10, padding: 16 }}>
          <h3>Pro</h3>
          <p style={{ opacity: 0.85 }}>Mais automação e integrações avançadas.</p>
          <p><strong>R$ 149/mês</strong></p>
          <a href="#cta" style={{ display: 'inline-block', padding: '10px 16px', borderRadius: 8, background: '#ff6200', color: '#fff', textDecoration: 'none' }}>Assinar</a>
        </div>
        <div style={{ border: '1px solid #333', borderRadius: 10, padding: 16 }}>
          <h3>Enterprise</h3>
          <p style={{ opacity: 0.85 }}>Projetos sob medida e SLA dedicado.</p>
          <p><strong>Fale com vendas</strong></p>
          <a href="#cta" style={{ display: 'inline-block', padding: '10px 16px', borderRadius: 8, background: '#ff6200', color: '#fff', textDecoration: 'none' }}>Contato</a>
        </div>
      </div>

      {isOpen && plan && (
        <PaymentModal
          plan={plan}
          onClose={() => setIsOpen(false)}
        />
      )}
    </section>
  );
}
