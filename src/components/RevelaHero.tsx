import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

export function RevelaHero({ onContactClick }: RevelaHeroProps) {
  const scrollToHow = () => {
    document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="revela-hero">
      {/* Animated Tech Background */}
      <div className="revela-hero-tech-bg">
        <div className="revela-hero-grid-lines" />
        <div className="revela-hero-floating-elements">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="revela-floating-shape" />
          ))}
        </div>
      </div>

      {/* Background Glows */}
      <div className="revela-hero-glow revela-hero-glow-1" />
      <div className="revela-hero-glow revela-hero-glow-2" />

      <div className="revela-hero-container">
        {/* Left Content */}
        <div className="revela-hero-content">
          <span className="revela-hero-badge">Hub de Inovação e Tecnologia com IA</span>
          
          <h1 className="revela-hero-title">
            Sua empresa ainda opera
            <span className="revela-hero-title-highlight">no modo manual?</span>
          </h1>
          
          <p className="revela-hero-subtitle">
            Enquanto você lê isso, seus concorrentes estão automatizando com IA.
            <strong> Transformamos operações travadas em máquinas de crescimento — em semanas, não meses.</strong>
          </p>

          <div className="revela-hero-cta">
            <button onClick={onContactClick} className="revela-hero-btn revela-hero-btn-primary">
              Agendar Diagnóstico Gratuito
              <span>→</span>
            </button>
            <button onClick={scrollToHow} className="revela-hero-btn revela-hero-btn-secondary">
              Ver como funciona
            </button>
          </div>

          {/* Stats */}
          <div className="revela-hero-stats">
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">8h → 8min</div>
              <div className="revela-hero-stat-label">Redução de Trabalho</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">+200</div>
              <div className="revela-hero-stat-label">Automações</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">60 dias</div>
              <div className="revela-hero-stat-label">Do Zero ao App</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="revela-scroll-indicator">
        Scroll
      </div>
    </section>
  );
}
