interface KaiaHeroProps {
  onDemoClick?: () => void;
}

export function KaiaHero({ onDemoClick }: KaiaHeroProps) {
  return (
    <section className="kaia-hero">
      {/* Floating background elements */}
      <div className="kaia-float-elements">
        <div className="kaia-float-orb kaia-float-orb-1" />
        <div className="kaia-float-orb kaia-float-orb-2" />
      </div>
      
      <div className="kaia-hero-content">
        <span className="kaia-badge kaia-animate">Inteligência Artificial</span>
        
        <h1 className="kaia-animate kaia-animate-delay-1">
          Transforme conversas em conversões com IA
        </h1>
        
        <p className="kaia-hero-subtitle kaia-animate kaia-animate-delay-2">
          A Kaia automatiza atendimento, qualifica leads e personaliza ofertas 24/7. 
          Integração em minutos com seu WhatsApp, site e CRM — resultados em dias.
        </p>
        
        <div className="kaia-cta-group kaia-animate kaia-animate-delay-3">
          <a href="#pricing" className="kaia-btn kaia-btn-primary">
            Começar Grátis
            <span>→</span>
          </a>
          {onDemoClick && (
            <button onClick={onDemoClick} className="kaia-btn kaia-btn-secondary">
              🖥️ Ver Demo do App
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="kaia-stats kaia-animate kaia-animate-delay-4">
          <div className="kaia-stat">
            <div className="kaia-stat-value">98%</div>
            <div className="kaia-stat-label">Taxa de Resposta</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">3x</div>
            <div className="kaia-stat-label">Mais Conversões</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">24/7</div>
            <div className="kaia-stat-label">Disponibilidade</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">5min</div>
            <div className="kaia-stat-label">Setup Inicial</div>
          </div>
        </div>
      </div>
    </section>
  );
}
