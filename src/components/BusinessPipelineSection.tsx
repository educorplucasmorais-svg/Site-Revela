import React from 'react';

interface Stage {
  title: string;
  subtitle: string;
  outcome: string;
}

const stages: Stage[] = [
  {
    title: '1. Ideação & Seleção',
    subtitle: 'Filtro estratégico e tese clara',
    outcome: 'Convergimos ideias em uma tese validada. Redução média de 40% em retrabalho inicial.'
  },
  {
    title: '2. Diagnóstico & Pesquisa',
    subtitle: 'Dores, persona e hipóteses',
    outcome: 'Mapeamento estruturado de dores + persona. Aumenta em 3x a precisão das primeiras decisões.'
  },
  {
    title: '3. Arquitetura & Design Lean',
    subtitle: 'Escopo mínimo e blueprint',
    outcome: 'Definição de MVP essencial. Corte de até 55% de funcionalidades não críticas.'
  },
  {
    title: '4. Sprint de Desenvolvimento',
    subtitle: 'Construção ágil com IA',
    outcome: 'Entrega rápida (“Vibe Coding”). Média de 14 dias até versão funcional navegável.'
  },
  {
    title: '5. MVP & Implantação Controlada',
    subtitle: 'Teste pilotado e métricas',
    outcome: 'Release controlado com feedback real. Evita desperdício de até 30% em features mal usadas.'
  },
  {
    title: '6. Otimização & Escala',
    subtitle: 'Analytics + automações',
    outcome: 'Refino guiado por uso e dados. Aumento médio de 25% em retenção no ciclo inicial.'
  },
  {
    title: '7. Comercial & Capital',
    subtitle: 'Go-to-market e funding',
    outcome: 'Estrutura de pricing, canais e pitch. Redução do tempo de captação em até 20%.'
  }
];

export const BusinessPipelineSection: React.FC = () => {
  return (
    <section id="esteira" className="section-pattern" style={{borderTop: '1px solid var(--color-border)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 'var(--space-2xl)'}}>
          <span className="hero-label">— ESTEIRA DE CRIAÇÃO DE PRODUTOS</span>
          <h2 style={{fontSize: '2rem', lineHeight: 1.15, marginTop: 'var(--space-sm)'}}>Da Ideia ao MVP Escalável com Inteligência Humana + IA</h2>
          <p style={{fontSize: '1.05rem', maxWidth: '880px', margin: 'var(--space-md) auto 0'}}>
            Nosso modelo reduz desperdício, acelera ciclo de validação e orienta cada etapa por dados + contexto humano.
            Uma linha de montagem inteligente para produtos digitais de alto impacto.
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginTop: 'var(--space-md)'}}>
            <span className="tag">≤ 14 dias até MVP navegável</span>
            <span className="tag">−40% retrabalho ideação</span>
            <span className="tag">+3x precisão de hipóteses</span>
            <span className="tag">+25% retenção inicial</span>
            <span className="tag">Go-to-market guiado</span>
          </div>
        </div>
        <div className="grid" style={{display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))'}}>
          {stages.map(stage => (
            <div key={stage.title} className="card revela-card-dark" style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)'}}>
              <h3 className="revela-keyword" style={{marginBottom: 0}}>{stage.title}</h3>
              <p style={{fontSize: '0.78rem', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase', margin: 0, opacity: .9}}>{stage.subtitle}</p>
              <p style={{marginTop: 'var(--space-xs)', fontSize: '0.9rem', lineHeight: 1.45}}>{stage.outcome}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: 'var(--space-xl)'}}>
          <a href="#contato" className="btn btn-primary">Validar minha ideia com a Revela</a>
        </div>
      </div>
    </section>
  );
};

export default BusinessPipelineSection;
