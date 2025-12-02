import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

// Hero image - futuristic AI/tech visual
const HERO_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop';

export function RevelaHero({ onContactClick }: RevelaHeroProps) {
  const scrollToHow = () => {
    document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="revela-hero revela-hero-light">
      {/* Background Image */}
      <div className="revela-hero-bg">
        <img 
          src={HERO_IMAGE}
          alt="Inteligência Artificial e Automação" 
          className="revela-hero-bg-image"
        />
        <div className="revela-hero-bg-overlay" />
      </div>

      {/* Background Glows */}
      <div className="revela-hero-glow revela-hero-glow-1" />
      <div className="revela-hero-glow revela-hero-glow-2" />

      <div className="revela-hero-container">
        {/* Left Content */}
        <div className="revela-hero-content">
          <span className="revela-hero-badge">Hub de IA para Empresas</span>
          
          <h1 className="revela-hero-title">
            Automatize sua empresa
            <span className="revela-hero-title-highlight">com Inteligência Artificial</span>
          </h1>
          
          <p className="revela-hero-subtitle">
            De <strong>8 horas</strong> de trabalho manual para <strong>8 minutos</strong>. 
            Entregamos apps e automações em semanas, não meses.
          </p>

          <div className="revela-hero-cta">
            <button onClick={onContactClick} className="revela-hero-btn revela-hero-btn-primary">
              Diagnóstico Gratuito
              <span>→</span>
            </button>
            <button onClick={scrollToHow} className="revela-hero-btn revela-hero-btn-secondary">
              Como funciona
            </button>
          </div>

          {/* Stats */}
          <div className="revela-hero-stats">
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">+200</div>
              <div className="revela-hero-stat-label">Automações</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">60 dias</div>
              <div className="revela-hero-stat-label">Do Zero ao App</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">+50</div>
              <div className="revela-hero-stat-label">Empresas</div>
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
