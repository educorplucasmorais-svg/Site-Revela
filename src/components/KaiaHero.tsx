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
        <span className="kaia-badge kaia-animate">People Analytics • IA</span>

        <h1 className="kaia-animate kaia-animate-delay-1">
          Copiloto de RH e Liderança orientado por dados
        </h1>

        <p className="kaia-hero-subtitle kaia-animate kaia-animate-delay-2">
          A Kaia mapeia talentos, gera planos de desenvolvimento individuais (PDI) e prioriza ações de cultura e performance.
          Do diagnóstico à prescrição — tudo em um fluxo inteligente e contínuo.
        </p>
        
        <div className="kaia-cta-group kaia-animate kaia-animate-delay-3">
          <a href="#roadmap" className="kaia-btn kaia-btn-primary">
            Ver Roadmap
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
            <div className="kaia-stat-value">+3x</div>
            <div className="kaia-stat-label">Precisão em PDI</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">−28%</div>
            <div className="kaia-stat-label">Turnover potencial</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">7d</div>
            <div className="kaia-stat-label">Até 1º diagnóstico</div>
          </div>
          <div className="kaia-stat">
            <div className="kaia-stat-value">360º</div>
            <div className="kaia-stat-label">Visão integrada</div>
          </div>
        </div>
      </div>
    </section>
  );
}
