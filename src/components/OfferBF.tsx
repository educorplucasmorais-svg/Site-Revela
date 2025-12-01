import React from 'react';

type Props = {
  onPrimaryCta?: () => void;
};

export function OfferBF({ onPrimaryCta }: Props) {
  return (
    <section id="produtos" className="section-pattern">
      <div className="container" style={{ maxWidth: 920 }}>
        <h3 className="text-center" style={{ marginBottom: 'var(--space-lg)' }}>Nossos produtos</h3>
        <div className="card revela-card-dark" style={{ padding: 'var(--space-xl)' }}>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
            <li>Diagnóstico: mapa de prioridades e oportunidades reais</li>
            <li>Execução: implementação hands-on junto ao seu time</li>
            <li>Rotina: rituais simples para evoluir toda semana</li>
            <li>Kaia Hub: central de ativos e automações</li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={onPrimaryCta}>Falar com um consultor</button>
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-md)', color: 'var(--color-text-muted)' }}>
            Conheça a Revela por dentro: estratégia prática, execução e provas reais.
          </p>
        </div>
      </div>
    </section>
  );
}
