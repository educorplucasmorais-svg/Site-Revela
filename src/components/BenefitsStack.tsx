import React from 'react';

export function BenefitsStack() {
  const items = [
    { title: 'Diagnóstico', desc: 'Mapa claro de prioridades, sem ruído. Foco no essencial.' },
    { title: 'Execução', desc: 'Implementação junto ao seu time, com entregáveis práticos.' },
    { title: 'Rotina', desc: 'Rituais simples, evolução semanal, consistência no resultado.' },
    { title: 'Kaia Hub', desc: 'Central de ativos, automações e materiais Revela.' },
  ];

  return (
    <section id="beneficios" className="section-pattern">
      <div className="container">
        <h3 className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          Como a Revela entrega resultado
        </h3>
        <div className="grid grid-2" style={{ gap: 'var(--space-lg)' }}>
          {items.map((it) => (
            <div key={it.title} className="card revela-card-dark">
              <h4 className="revela-keyword">{it.title}</h4>
              <p style={{ marginBottom: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
