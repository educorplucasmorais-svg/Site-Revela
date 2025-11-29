import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

// Imagem tech: Rede neural / conexões abstratas (Unsplash CDN)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=90&auto=format&fit=crop';
// Alt: Abstract tech network
const HERO_IMAGE_ALT = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=90&auto=format&fit=crop';

export function RevelaHero({ onContactClick }: RevelaHeroProps) {
  return (
    <section className="revela-hero">
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

        {/* Right Visual - Tech Image with Effects */}
        <div className="revela-hero-visual">
          <div className="revela-tree-container">
            {/* Floating Particles - Tech Style */}
            <div className="revela-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="revela-particle" />
              ))}
            </div>

            {/* Tech Image with Glow Effect */}
            <div className="revela-tree-image-wrapper">
              <div className="revela-tree-glow" />
              <img 
                src={HERO_IMAGE}
                alt="Tecnologia e Inovação - Revela"
                className="revela-tree-image revela-tech-image"
                loading="eager"
                onError={(e) => { e.currentTarget.src = HERO_IMAGE_ALT; }}
              />
              <div className="revela-tree-reflection" />
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
