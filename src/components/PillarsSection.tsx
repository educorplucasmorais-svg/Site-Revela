import React from 'react';

export function PillarsSection() {
  const mainPillars = [
    {
      title: '1. Educação Tech (O Capital Humano by IA)',
      desc: 'Desenvolvimento de competências para a era digital e comportamental. Coaching, Mentoria, Palestras e Treinamentos (Individuais e Coletivos). Preparamos talentos para operarem em alta performance em ambientes tecnológicos.',
      icon: '🎓'
    },
    {
      title: '2. Consultoria Empresarial 360º',
      desc: 'Atuação transversal atendendo empresas (CNPJ) e pessoas (CPF). Consultoria Estratégica, Tática e Operacional com foco em Inovação, Eficiência e Ferramentas de IA Proprietárias.',
      icon: '🎯'
    },
    {
      title: '3. Desenvolvimento de Produto e TI (A Fábrica de Soluções)',
      desc: 'Automatização de projetos, Criação de códigos, Implantação e Manutenção de Apps ("Vibe Coding"). Produção de soluções empresariais com automações e produtos nativos em IA.',
      icon: '⚙️'
    }
  ];

  const ecosystem = [
    { level: 'Empresas (CNPJ)', focus: 'Inovação e Eficiência', delivery: 'Consultoria 360º + Ferramentas de IA' },
    { level: 'Pessoas (CPF)', focus: 'Carreira e Vida', delivery: 'Desenvolvimento + Mentoria + Tech for Good' },
    { level: 'Projetos (Incubadora)', focus: 'Aceleração', delivery: 'Know-how + Tecnologia + Capital Intelectual' }
  ];

  return (
    <section id="conhecer" className="section-dark">
      <div className="container" style={{ maxWidth: 1200 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="hero-label">— OS PILARES DO HUB</span>
          <h2 style={{ fontSize: '2.2rem', marginTop: 'var(--space-sm)' }}>O Motor que Alimenta o Ecossistema Revela</h2>
          <p style={{ fontSize: '1.05rem', maxWidth: '800px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
            Três grandes pilares sustentam tanto os clientes externos quanto os projetos incubados
          </p>
        </div>

        {/* Main Pillars */}
        <div className="grid" style={{ display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', marginBottom: 'var(--space-2xl)' }}>
          {mainPillars.map(p => (
            <div key={p.title} className="card revela-card-dark" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{p.icon}</div>
              <h3 className="revela-keyword" style={{ marginBottom: 'var(--space-md)', fontSize: '1.3rem' }}>{p.title}</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Ecosystem Table */}
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Estrutura de Valor Única (Abrangência)</h3>
          <div className="card revela-card-dark" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Nível de Atuação</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Foco do Cliente</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>O que entregamos</th>
                </tr>
              </thead>
              <tbody>
                {ecosystem.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: 'var(--space-md)', borderBottom: i < ecosystem.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <strong>{row.level}</strong>
                    </td>
                    <td style={{ padding: 'var(--space-md)', borderBottom: i < ecosystem.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      {row.focus}
                    </td>
                    <td style={{ padding: 'var(--space-md)', borderBottom: i < ecosystem.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      {row.delivery}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
