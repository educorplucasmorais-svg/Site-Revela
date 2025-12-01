import React from 'react';

type Props = {
  onPrimaryCta?: () => void;
};

export function HeroBF({ onPrimaryCta }: Props) {
  return (
    <section className="section-hero" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: 980 }}>
        <div className="text-center">
          <h1 style={{ fontSize: '2.4rem', lineHeight: 1.15 }}>
            Revela — Inteligência estratégica para crescer com clareza.
          </h1>
          <h2 style={{ fontSize: '1.25rem', marginTop: 'var(--space-md)', color: 'var(--color-text-muted)' }}>
            Conheça nossa marca, produtos e cases. Estratégia prática, execução junto ao seu time e provas reais de resultado.
          </h2>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-lg)' }}>
            <a className="btn btn-primary" href="#produtos">Ver produtos</a>
            <a className="btn btn-secondary" href="#cases">Ver cases</a>
          </div>
          <div style={{ marginTop: 'var(--space-md)', color: 'var(--color-text-muted)' }}>
            Revela: consultoria e crescimento. Pessoas primeiro, resultados consistentes.
          </div>
        </div>
      </div>
    </section>
  );
}
