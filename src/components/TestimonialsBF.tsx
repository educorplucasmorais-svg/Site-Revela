import React from 'react';

export function TestimonialsBF() {
  const items = [
    {
      role: 'Ex-advogado → dev NoCode',
      text:
        'Em 90 dias, publiquei meu primeiro app de gestão jurídica sem código. Hoje atendo 12 escritórios.',
    },
    {
      role: 'Freelancer',
      text:
        'Automatizei onboarding com N8N + IA. Saí de R$3k para R$9k/mês em 4 meses.',
    },
    {
      role: 'Gestor em transição',
      text:
        'Usei Bubble para lançar um MVP de marketplace. Validamos em 6 semanas e fechamos nossos primeiros 50 pagamentos.',
    },
  ];

  return (
    <section className="section-dark">
      <div className="container">
        <h3 className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>Depoimentos</h3>
        <div className="grid grid-3" style={{ gap: 'var(--space-lg)' }}>
          {items.map((it, idx) => (
            <div key={idx} className="card revela-card-dark">
              <p style={{ fontWeight: 600 }}>{it.role}</p>
              <p style={{ marginBottom: 0 }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
