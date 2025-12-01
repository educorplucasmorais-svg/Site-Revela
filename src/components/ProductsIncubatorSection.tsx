import React from 'react';

export const ProductsIncubatorSection: React.FC = () => {
  return (
    <section id="produtos-incubadora" className="section-dark" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="hero-label">— ECOSSISTEMA DE PRODUTOS</span>
          <h2 style={{ fontSize: '2.2rem', marginTop: 'var(--space-sm)' }}>
            Produtos Autorais e Incubadora de Projetos
          </h2>
          <p style={{ fontSize: '1.05rem', maxWidth: '850px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
            O foco estratégico para 2026 é o lançamento de MVPs e a consolidação da Incubadora. 
            Investimos em produtos que democratizam tecnologia e aceleramos projetos de alto potencial.
          </p>
        </div>

        {/* KAIA - Produto Carro-Chefe */}
        <div className="card revela-card-dark" style={{ padding: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)', background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08) 0%, rgba(0,0,0,0.4) 100%)' }}>
          <div style={{ display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--color-primary)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
                🚀 PRODUTO CARRO-CHEFE
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>
                KAIA: People Analytics & Gestão
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
                A plataforma proprietária de IA da Revela. Um copiloto de RH e Liderança que vai do diagnóstico à prescrição.
              </p>

              {/* Roadmap */}
              <div style={{ marginBottom: 'var(--space-lg)' }}>
                <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 'var(--space-sm)', opacity: 0.8 }}>
                  Roadmap de Lançamento 2026:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✓</span>
                    <span><strong>MVP 2 (Créditos)</strong> - 01/01/2026: Foco em Mapeamento avulso</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>⏳</span>
                    <span><strong>MVP 1 (SaaS Completo)</strong> - 15/01/2026: MPM, PDI e META</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>📱</span>
                    <span><strong>App Mobile</strong> - Q3 2026</span>
                  </li>
                </ul>
              </div>

              {/* Estratégia Comercial */}
              <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: 'var(--space-xs)' }}>Estratégia Comercial:</strong>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  <strong>Varejo</strong> (B2C/Pequenas empresas) e <strong>Atacado</strong> (B2B/Corporativo)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1',
                background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2) 0%, rgba(var(--color-primary-rgb), 0.05) 100%)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(var(--color-primary-rgb), 0.3)',
                fontSize: '4rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                🤖
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-md)',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}>
                  <strong style={{ fontSize: '1.2rem' }}>KAIA</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>People Analytics + IA</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <a href="/kaia" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 28px' }}>
              Conhecer KAIA em detalhes
            </a>
          </div>
        </div>

        {/* A Incubadora */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-md)' }}>
              A Incubadora de Projetos Revela
            </h3>
            <p style={{ fontSize: '1.05rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              A Revela atua como <strong>investidora e aceleradora</strong>, fornecendo "Insumos" 
              (Manual de Marca, Tecnologia, Jurídico) para projetos com alto potencial.
            </p>
          </div>

          {/* Modelo de Negócio da Incubadora */}
          <div className="grid" style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 'var(--space-2xl)' }}>
            <div className="card revela-card-dark" style={{ padding: 'var(--space-lg)' }}>
              <h4 className="revela-keyword" style={{ marginBottom: 'var(--space-md)' }}>💰 Modelo de Negócio</h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <li>Faturamento: <strong>Por Projeto</strong> (não mensal)</li>
                <li>Período: <strong>1 ano</strong> (12 meses)</li>
                <li>Participação: <strong>50% Revela / 50% Parceiros</strong></li>
              </ul>
            </div>

            <div className="card revela-card-dark" style={{ padding: 'var(--space-lg)' }}>
              <h4 className="revela-keyword" style={{ marginBottom: 'var(--space-md)' }}>💼 Estrutura de Capital</h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <li>Fundo de Caixa e Reserva de Segurança</li>
                <li>Capital de Giro (Reinvestimento)</li>
                <li>Capital Incubadora (Multiplicador de retorno)</li>
              </ul>
            </div>

            <div className="card revela-card-dark" style={{ padding: 'var(--space-lg)' }}>
              <h4 className="revela-keyword" style={{ marginBottom: 'var(--space-md)' }}>🎯 O que fornecemos</h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <li>Manual de Marca e Identidade</li>
                <li>Tecnologia e Infraestrutura</li>
                <li>Jurídico e Estruturação</li>
                <li>Know-how e Mentoria</li>
              </ul>
            </div>
          </div>

          {/* Projetos em Incubação */}
          <div className="card revela-card-dark" style={{ padding: 'var(--space-xl)' }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
              Projetos em Incubação e Pipeline
            </h4>
            
            <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
              {/* Projeto Destaque */}
              <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid var(--color-primary)' }}>
                <h5 style={{ margin: '0 0 var(--space-xs) 0', fontSize: '1.1rem' }}>
                  🎓 Projeto Angústia (Ed-Tech)
                </h5>
                <p style={{ margin: '0 0 var(--space-sm) 0', fontSize: '0.95rem' }}>
                  Produto de impacto social para ajudar pessoas a pararem de consumir pornografia.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                  <span className="tag">Equipe: Sami, Rose, Lucas</span>
                  <span className="tag">Tech for Good</span>
                </div>
              </div>

              {/* Outros Projetos */}
              <div style={{ display: 'grid', gap: 'var(--space-sm)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <h5 style={{ margin: '0 0 var(--space-xs) 0', fontSize: '1rem' }}>🐕 Caramelo</h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    Em fase de análise e PoC. Próximo: Pitch de Negócio.
                  </p>
                </div>

                <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <h5 style={{ margin: '0 0 var(--space-xs) 0', fontSize: '1rem' }}>🦐 Brigada Camarão</h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    App (Produto + Consultoria) - Pipeline ativo
                  </p>
                </div>

                <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <h5 style={{ margin: '0 0 var(--space-xs) 0', fontSize: '1rem' }}>🍱 Marmitaria</h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    Consultoria VISA - Pipeline ativo
                  </p>
                </div>

                <div style={{ padding: 'var(--space-md)', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <h5 style={{ margin: '0 0 var(--space-xs) 0', fontSize: '1rem' }}>🕯️ Fábrica de Vela</h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                    Consultoria de estruturação - Pipeline
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', padding: 'var(--space-xl)', background: 'rgba(var(--color-primary-rgb), 0.05)', borderRadius: 12, border: '1px solid rgba(var(--color-primary-rgb), 0.2)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-md)' }}>
            Quer acelerar seu projeto com a Revela?
          </h3>
          <p style={{ fontSize: '1.05rem', marginBottom: 'var(--space-lg)', maxWidth: 700, margin: '0 auto var(--space-lg) auto' }}>
            Investir na Revela é investir em um <strong>Ecossistema de Inovação</strong> que mitiga riscos através da 
            diversificação (Consultoria + Produtos SaaS + Incubadora).
          </p>
          <a href="#contato" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '14px 28px' }}>
            Apresentar meu projeto para a incubadora
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsIncubatorSection;
