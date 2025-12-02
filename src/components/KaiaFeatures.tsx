const features = [
  {
    icon: '🧭',
    title: 'Mapeamento Comportamental',
    desc: 'DISC, QP e sinais de potencial em uma leitura unificada por pessoa e equipe.'
  },
  {
    icon: '🧩',
    title: 'PDI Inteligente',
    desc: 'Planos de desenvolvimento personalizados com metas claras, prazos e rituais semanais.'
  },
  {
    icon: '🧠',
    title: 'Rituais de Liderança',
    desc: 'Sugestões de foco para 1:1, feedbacks e construção de cultura — consistência que vira hábito.'
  },
  {
    icon: '📈',
    title: 'People Analytics',
    desc: 'Métricas de engajamento, aderência a PDIs e evolução por squad, capítulo e organização.'
  },
  {
    icon: '🚨',
    title: 'Risco de Saída',
    desc: 'Sinais precoces de churn de talento com fatores de risco e plano de ação recomendado.'
  },
  {
    icon: '🔗',
    title: 'Integrações & Segurança',
    desc: 'Conecta com ferramentas do time. LGPD, criptografia e infraestrutura monitorada 24/7.'
  }
];

export function KaiaFeatures() {
  return (
    <section id="features" className="kaia-features">
      <div className="kaia-section-header">
        <span className="kaia-section-label">Recursos</span>
        <h2 className="kaia-section-title">People Analytics que vira ação</h2>
        <p className="kaia-section-desc">Do mapeamento ao PDI — um fluxo simples que cria rotina de evolução.</p>
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

      {/* Subtle inline CTA to keep page short */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a
          href="#pricing"
          className="kaia-btn kaia-btn-oxygen"
          style={{ textDecoration: 'none' }}
        >
          Ver planos e começar
        </a>
      </div>
    </section>
  );
}
