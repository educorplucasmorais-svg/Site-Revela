import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

// Árvore laranja realista com folhas caindo (Unsplash)
const TREE_IMAGE = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=90&auto=format&fit=crop';

export function RevelaHero({ onContactClick }: RevelaHeroProps) {
  return (
    <section className="revela-hero">
      {/* Background Image - Árvore à direita */}
      <div className="revela-hero-bg">
        <img 
          src={TREE_IMAGE}
          alt="" 
          className="revela-hero-bg-image"
        />
        <div className="revela-hero-bg-overlay" />
      </div>

      {/* Falling Leaves Animation */}
      <div className="revela-leaves-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="revela-leaf" />
        ))}
      </div>

      {/* Background Glows */}
      <div className="revela-hero-glow revela-hero-glow-1" />
      <div className="revela-hero-glow revela-hero-glow-2" />

      <div className="revela-hero-container">
        {/* Left Content */}
        <div className="revela-hero-content">
          <span className="revela-hero-badge">Inteligência Estratégica</span>
          
          <h1 className="revela-hero-title">
            Revele o potencial
            <span className="revela-hero-title-highlight">oculto do seu negócio.</span>
          </h1>
          
          <p className="revela-hero-subtitle">
            Sua equipe completa de marketing e estratégia, agora potencializada pela IA. 
            Estruturamos processos, desenvolvemos pessoas e comunicamos sua essência.
          </p>

          <div className="revela-hero-cta">
            <button onClick={onContactClick} className="revela-hero-btn revela-hero-btn-primary">
              Iniciar Diagnóstico
              <span>→</span>
            </button>
            <a href="#servicos" className="revela-hero-btn revela-hero-btn-secondary">
              Saiba Mais
            </a>
          </div>

          {/* Stats */}
          <div className="revela-hero-stats">
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">3x</div>
              <div className="revela-hero-stat-label">Crescimento Médio</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">50+</div>
              <div className="revela-hero-stat-label">Empresas</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">95%</div>
              <div className="revela-hero-stat-label">Satisfação</div>
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
