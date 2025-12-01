import React from 'react';

interface Phase {
  number: number;
  title: string;
  subtitle: string;
  steps: string[];
  outcome: string;
  highlight?: string;
}

const phases: Phase[] = [
  {
    number: 1,
    title: 'Descoberta e Prototipagem Rápida',
    subtitle: 'Do problema ao protótipo em dias',
    steps: [
      'Mapeamento de Valor/Viabilidade (Formulário estratégico focado em problema e KPI)',
      'Workshop de Alinhamento (1h para definir MVP e métrica de sucesso)',
      'Prova de Conceito (POC) com IA (Low-Code/No-Code, função central de IA)',
      'Pitch da POC e Decisão (48h para feedback e aceite)'
    ],
    outcome: 'Contrato de desenvolvimento ou proposta de reformulação paga',
    highlight: 'Sem protótipo, não há contrato'
  },
  {
    number: 2,
    title: 'Desenvolvimento Ágil e Interativo (MVPs)',
    subtitle: 'Sprints com entregas de valor incremental',
    steps: [
      'MVP 1 (Core): Projeto Escrito + Design System + Código base limpo (Feedback: 3 dias)',
      'MVP 2 (Funcionalidade de IA): Integração do modelo de IA operacional com dados de teste (Feedback: 3 dias)',
      'MVP 3 (Produção): Integração com Banco de Dados + Hospedagem + Treinamento da equipe'
    ],
    outcome: 'Versão de Lançamento (Go-Live) pronta para validação no mercado',
    highlight: 'Foco em UX, precisão da IA e performance'
  },
  {
    number: 3,
    title: 'Lançamento e Validação de Resultados',
    subtitle: 'Prova de Valor e ROI',
    steps: [
      'Relatório de Desempenho (Comparação KPI inicial vs. após 30 dias)',
      'Documentação e Transparência da IA (Como funciona e como melhora o processo)',
      'Revisão do Sucesso e Proposta de Expansão'
    ],
    outcome: 'ROI comprovado + proposta de suporte e evolução contínua',
    highlight: 'De "Venda" para "Prova de Valor"'
  },
  {
    number: 4,
    title: 'Parceria e Crescimento Contínuo',
    subtitle: 'Sustentação e Evolução (Receita Recorrente)',
    steps: [
      'Suporte Técnico e Atualizações contínuas',
      'Monitoramento da IA (Evitar drift e perda de precisão)',
      'Otimização Contínua (Novos recursos baseados em IA e dados)',
      'Contrato de Retenção com SLA (Service Level Agreement)'
    ],
    outcome: 'Parceria de longo prazo com evolução guiada por dados e uso real',
    highlight: 'Aqui é onde o dinheiro recorrente é gerado'
  }
];

export const ProductPipelineSection: React.FC = () => {
  return (
    <section id="esteira" className="section-pattern" style={{borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: 'var(--space-2xl)'}}>
          <span className="hero-label">— ESTEIRA DE PRODUTO OTIMIZADA</span>
          <h2 style={{fontSize: '2.2rem', lineHeight: 1.15, marginTop: 'var(--space-sm)'}}>
            Da Ideia ao Produto Escalável com IA e Velocidade
          </h2>
          <p style={{fontSize: '1.05rem', maxWidth: '900px', margin: 'var(--space-md) auto 0', lineHeight: 1.6}}>
            Nossa esteira otimizada foca em <strong>IA e Velocidade</strong>, eliminando desperdícios e acelerando a validação. 
            Cada fase adiciona valor e nos aproxima de um produto que resolve problemas reais com tecnologia de ponta.
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginTop: 'var(--space-lg)'}}>
            <span className="tag">⚡ Prototipagem em dias</span>
            <span className="tag">🎯 Foco em KPI e ROI</span>
            <span className="tag">🤖 IA desde o início</span>
            <span className="tag">📊 Validação com dados reais</span>
            <span className="tag">🔄 Evolução contínua</span>
          </div>
        </div>

        <div style={{display: 'grid', gap: 'var(--space-2xl)'}}>
          {phases.map(phase => (
            <div key={phase.number} className="card revela-card-dark" style={{padding: 'var(--space-xl)', position: 'relative', overflow: 'hidden'}}>
              {/* Phase Number Badge */}
              <div style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(var(--color-primary-rgb), 0.15)',
                border: '2px solid var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                {phase.number}
              </div>

              <div style={{maxWidth: 900}}>
                <h3 className="revela-keyword" style={{marginBottom: 'var(--space-xs)', fontSize: '1.5rem'}}>
                  Fase {phase.number}: {phase.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  letterSpacing: '.5px', 
                  textTransform: 'uppercase', 
                  margin: '0 0 var(--space-lg) 0', 
                  opacity: .85,
                  color: 'var(--color-primary)'
                }}>
                  {phase.subtitle}
                </p>

                {/* Steps */}
                <div style={{marginBottom: 'var(--space-lg)'}}>
                  <h4 style={{fontSize: '0.95rem', marginBottom: 'var(--space-sm)', opacity: 0.9}}>Etapas:</h4>
                  <ul style={{margin: 0, paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)'}}>
                    {phase.steps.map((step, i) => (
                      <li key={i} style={{lineHeight: 1.5, fontSize: '0.95rem'}}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: 'var(--space-md)',
                  marginBottom: phase.highlight ? 'var(--space-sm)' : 0
                }}>
                  <strong style={{fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.7, letterSpacing: '.5px'}}>
                    Resultado:
                  </strong>
                  <p style={{margin: 'var(--space-xs) 0 0 0', fontSize: '0.95rem'}}>{phase.outcome}</p>
                </div>

                {/* Highlight */}
                {phase.highlight && (
                  <div style={{
                    marginTop: 'var(--space-sm)',
                    padding: 'var(--space-sm) var(--space-md)',
                    background: 'rgba(var(--color-primary-rgb), 0.1)',
                    borderLeft: '3px solid var(--color-primary)',
                    borderRadius: 4
                  }}>
                    <p style={{margin: 0, fontSize: '0.9rem', fontStyle: 'italic'}}>
                      💡 {phase.highlight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: 'var(--space-2xl)'}}>
          <a href="#contato" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '16px 32px'}}>
            Transformar minha ideia em produto com IA
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductPipelineSection;
