import React from 'react';

export function MethodologySection() {
  const steps = [
    { 
      n: 1, 
      title: 'Diagnóstico', 
      desc: 'Levantamento claro de contexto, prioridades e bloqueios reais. Mapeamos o problema e o KPI de sucesso.',
      icon: '🔍'
    },
    { 
      n: 2, 
      title: 'Plano', 
      desc: 'Roadmap objetivo com entregáveis, responsáveis e metas semanais. MVP definido com escopo mínimo.',
      icon: '📋'
    },
    { 
      n: 3, 
      title: 'Execução', 
      desc: 'Implementação prática junto ao time com "Vibe Coding". Ajustes iterativos baseados em dados e feedback contínuo.',
      icon: '⚡'
    },
    { 
      n: 4, 
      title: 'Validação', 
      desc: 'Lançamento controlado com métricas. Relatório de desempenho comparando KPIs antes/depois. Prova de ROI.',
      icon: '📊'
    },
    { 
      n: 5, 
      title: 'Evolução', 
      desc: 'Escala de processos, fortalecimento de pessoas e consolidação de ativos. Parceria de longo prazo com suporte contínuo.',
      icon: '🚀'
    },
  ];

  return (
    <section id="metodologia" className="section-pattern">
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="hero-label">— NOSSA METODOLOGIA</span>
          <h2 style={{ fontSize: '2rem', marginTop: 'var(--space-sm)' }}>Como Entregamos Valor de Ponta a Ponta</h2>
          <p style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
            Uma metodologia testada que une estratégia, execução ágil e validação contínua com foco em resultados mensuráveis.
          </p>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {steps.map(s => (
            <div key={s.n} className="card revela-card-dark" style={{ padding: 'var(--space-xl)', position: 'relative', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{s.icon}</div>
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontSize: '0.8rem',
                opacity: 0.5,
                fontWeight: 600
              }}>Etapa {s.n}</span>
              <h4 style={{ marginTop: 0, marginBottom: 'var(--space-md)', fontSize: '1.2rem' }}>{s.title}</h4>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
