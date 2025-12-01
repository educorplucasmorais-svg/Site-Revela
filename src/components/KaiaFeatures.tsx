const features = [
  { 
    icon: '🤖',
    title: 'Atendimento 24/7', 
    desc: 'Bots inteligentes que respondem instantaneamente com contexto e personalidade da sua marca.' 
  },
  { 
    icon: '🎯',
    title: 'Geração de Leads', 
    desc: 'Qualifique e capture contatos automaticamente com perguntas estratégicas e scoring inteligente.' 
  },
  { 
    icon: '✨',
    title: 'Personalização IA', 
    desc: 'Ofertas e recomendações sob medida baseadas no comportamento e preferências de cada cliente.' 
  },
  { 
    icon: '🔗',
    title: 'Integração Simples', 
    desc: 'Conecte em minutos com WhatsApp, Instagram, site, CRM e mais de 50 ferramentas.' 
  },
  { 
    icon: '📊',
    title: 'Analytics Avançado', 
    desc: 'Dashboards em tempo real com métricas de conversão, satisfação e performance.' 
  },
  { 
    icon: '🛡️',
    title: 'Segurança Total', 
    desc: 'Dados criptografados, LGPD compliant e infraestrutura enterprise-grade.' 
  }
];

export function KaiaFeatures() {
  return (
    <section id="features" className="kaia-features">
      <div className="kaia-section-header">
        <span className="kaia-section-label">Recursos</span>
        <h2 className="kaia-section-title">Tudo que você precisa para escalar</h2>
        <p className="kaia-section-desc">
          A Kaia combina inteligência artificial avançada com facilidade de uso 
          para transformar a experiência do seu cliente.
        </p>
      </div>

      <div className="kaia-features-grid">
        {features.map((f, index) => (
          <div 
            key={f.title} 
            className={`kaia-feature-card kaia-animate kaia-animate-delay-${index + 1}`}
          >
            <div className="kaia-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA após Features */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <a 
          href="https://wa.me/5531993044867?text=Olá!%20Quero%20conhecer%20a%20Kaia%20e%20transformar%20meu%20atendimento"
          target="_blank"
          rel="noopener noreferrer"
          className="kaia-btn kaia-btn-primary"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            fontSize: '1.1rem',
            textDecoration: 'none'
          }}
        >
          <span>💬</span>
          Fale com um consultor agora
        </a>
        <p style={{ 
          marginTop: '16px', 
          fontSize: '0.9rem', 
          color: 'rgba(255,255,255,0.6)' 
        }}>
          Resposta em menos de 2 minutos
        </p>
      </div>
    </section>
  );
}
