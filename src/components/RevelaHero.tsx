import '../styles/revela-hero.css';

interface RevelaHeroProps {
  onContactClick: () => void;
}

// Imagem lateral ilustrativa (substituir por ativo proprietário se desejado)
const SIDE_IMAGE = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop';

export function RevelaHero({ onContactClick }: RevelaHeroProps) {
  return (
    <section className="revela-hero">
      {/* Side Image */}
      <div className="revela-hero-bg">
        <img
          src={SIDE_IMAGE}
          alt="Equipe estratégica trabalhando em soluções digitais"
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
          <span className="revela-hero-badge">Hub de Inovação + IA</span>
          
          <h1 className="revela-hero-title">
            Revela 2.0:
            <span className="revela-hero-title-highlight"> Hub de Inovação e Aceleração de Potencial Humano com IA</span>
          </h1>
          
          <p className="revela-hero-subtitle">
            Uma "Nave Mãe" estratégica que produz soluções empresariais, automações e produtos com Inteligência Artificial. Democratizamos a tecnologia de ponta e a estratégia de high-level, desenvolvendo soluções que unem automação inteligente e a essência humana.
          </p>

          <div className="revela-hero-cta">
            <button onClick={onContactClick} className="revela-hero-btn revela-hero-btn-primary">
              Falar com um consultor <span>→</span>
            </button>
            <a href="#conhecer" className="revela-hero-btn revela-hero-btn-secondary">
              Conhecer a Revela
            </a>
          </div>

          {/* Stats */}
          <div className="revela-hero-stats">
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">B2B+B2C</div>
              <div className="revela-hero-stat-label">Empresas & Pessoas</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">3 Pilares</div>
              <div className="revela-hero-stat-label">Consultoria + Tech + Produtos</div>
            </div>
            <div className="revela-hero-stat">
              <div className="revela-hero-stat-value">MVP 14d</div>
              <div className="revela-hero-stat-label">Até MVP Navegável</div>
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
