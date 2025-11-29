import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

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

        {/* Right Visual - Tree with Falling Leaves */}
        <div className="revela-hero-visual">
          <div className="revela-tree-container">
            {/* Falling Leaves */}
            <div className="revela-leaves-container">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="revela-leaf" />
              ))}
            </div>

            {/* Floating Particles */}
            <div className="revela-particles">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="revela-particle" />
              ))}
            </div>

            {/* Tree SVG */}
            <svg 
              className="revela-tree" 
              viewBox="0 0 400 480" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tree trunk */}
              <path 
                d="M185 480 L185 320 Q180 300 175 280 L175 250 Q185 240 200 240 Q215 240 225 250 L225 280 Q220 300 215 320 L215 480" 
                fill="url(#trunkGradient)"
              />
              
              {/* Tree roots */}
              <path 
                d="M175 480 Q160 460 140 480 M225 480 Q240 460 260 480 M200 480 L200 500" 
                stroke="#8B4513" 
                strokeWidth="8" 
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Main foliage - layered circles for organic look */}
              <ellipse cx="200" cy="180" rx="140" ry="120" fill="url(#foliageGradient1)" opacity="0.9"/>
              <ellipse cx="160" cy="150" rx="90" ry="80" fill="url(#foliageGradient2)" opacity="0.8"/>
              <ellipse cx="250" cy="160" rx="80" ry="70" fill="url(#foliageGradient2)" opacity="0.8"/>
              <ellipse cx="200" cy="100" rx="100" ry="80" fill="url(#foliageGradient3)" opacity="0.9"/>
              <ellipse cx="140" cy="120" rx="60" ry="50" fill="url(#foliageGradient3)" opacity="0.7"/>
              <ellipse cx="270" cy="130" rx="55" ry="45" fill="url(#foliageGradient3)" opacity="0.7"/>
              <ellipse cx="200" cy="60" rx="70" ry="55" fill="url(#foliageGradient4)" opacity="0.9"/>
              <ellipse cx="160" cy="80" rx="40" ry="35" fill="url(#foliageGradient4)" opacity="0.8"/>
              <ellipse cx="240" cy="85" rx="35" ry="30" fill="url(#foliageGradient4)" opacity="0.8"/>
              
              {/* Tree top highlight */}
              <ellipse cx="200" cy="40" rx="45" ry="35" fill="url(#foliageHighlight)" opacity="0.7"/>

              {/* Gradients */}
              <defs>
                <linearGradient id="trunkGradient" x1="200" y1="240" x2="200" y2="480" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B5A2B"/>
                  <stop offset="100%" stopColor="#5D3A1A"/>
                </linearGradient>
                
                <radialGradient id="foliageGradient1" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#FF8C50"/>
                  <stop offset="70%" stopColor="#E85A28"/>
                  <stop offset="100%" stopColor="#C44A1C"/>
                </radialGradient>
                
                <radialGradient id="foliageGradient2" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#FFB088"/>
                  <stop offset="60%" stopColor="#FF6B35"/>
                  <stop offset="100%" stopColor="#D45020"/>
                </radialGradient>
                
                <radialGradient id="foliageGradient3" cx="0.5" cy="0.3" r="0.6">
                  <stop offset="0%" stopColor="#FFCC99"/>
                  <stop offset="50%" stopColor="#FF8C50"/>
                  <stop offset="100%" stopColor="#E85A28"/>
                </radialGradient>
                
                <radialGradient id="foliageGradient4" cx="0.5" cy="0.3" r="0.5">
                  <stop offset="0%" stopColor="#FFE0C0"/>
                  <stop offset="60%" stopColor="#FFB088"/>
                  <stop offset="100%" stopColor="#FF8C50"/>
                </radialGradient>
                
                <radialGradient id="foliageHighlight" cx="0.5" cy="0.3" r="0.5">
                  <stop offset="0%" stopColor="#FFF0E0"/>
                  <stop offset="100%" stopColor="#FFCC99"/>
                </radialGradient>
              </defs>
            </svg>
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
