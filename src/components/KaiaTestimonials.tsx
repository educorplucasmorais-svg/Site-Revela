const testimonials = [
  {
    name: "Ricardo Silva",
    role: "CEO, TechSolutions",
    content: "A Kaia revolucionou nosso atendimento. Reduzimos o tempo de resposta em 80% e nossos clientes nunca estiveram tão satisfeitos. A implementação foi surpreendentemente rápida.",
    avatar: "RS"
  },
  {
    name: "Fernanda Costa",
    role: "Diretora de Vendas, ImobPrime",
    content: "Antes perdíamos muitos leads fora do horário comercial. Com a Kaia, atendemos 24/7 e nossa conversão aumentou 45% no primeiro mês. É como ter uma equipe extra.",
    avatar: "FC"
  },
  {
    name: "Pedro Santos",
    role: "Fundador, E-commerce Pro",
    content: "A capacidade da IA de entender o contexto e dar respostas precisas é impressionante. Não parece um robô comum. Meus clientes elogiam a agilidade do suporte.",
    avatar: "PS"
  }
];

export function KaiaTestimonials() {
  return (
    <section className="kaia-testimonials" style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #0A0A14 0%, var(--kaia-bg) 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="kaia-section-header" style={{ marginBottom: '80px' }}>
          <span className="kaia-section-label">Depoimentos</span>
          <h2 className="kaia-section-title">Quem usa e aprova</h2>
          <p className="kaia-section-desc">
            Junte-se a centenas de empresas que já transformaram seu atendimento com a Kaia.
          </p>
        </div>

        <div className="kaia-testimonials-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className="kaia-testimonial-card"
              style={{
                background: 'var(--kaia-bg-card)',
                border: '1px solid var(--kaia-border)',
                borderRadius: '24px',
                padding: '40px',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '24px', 
                right: '32px', 
                fontSize: '4rem', 
                color: 'var(--kaia-primary)', 
                opacity: 0.2,
                fontFamily: 'serif',
                lineHeight: 1
              }}>
                "
              </div>

              <div style={{ marginBottom: '24px', display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#F59E0B', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>

              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1.1rem', 
                lineHeight: '1.6', 
                marginBottom: '32px',
                fontStyle: 'italic'
              }}>
                "{t.content}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: 'var(--kaia-gradient)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.1rem'
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--kaia-accent)', fontSize: '0.85rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges / Logos Placeholder */}
        <div style={{ 
          marginTop: '80px', 
          padding: '40px', 
          borderTop: '1px solid var(--kaia-border)',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px',
          opacity: 0.5,
          filter: 'grayscale(100%)'
        }}>
           {/* Simple text placeholders for logos to keep it clean without external assets */}
           <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>TECHCRUNCH</span>
           <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>FORBES</span>
           <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>WIRED</span>
           <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>BLOOMBERG</span>
        </div>
      </div>
    </section>
  );
}
