import { KaiaWaterLogo } from './KaiaWaterLogo';

interface KaiaHeroProps {
  onDemoClick?: () => void;
  onMembersClick?: () => void;
}

export function KaiaHero({ onDemoClick, onMembersClick }: KaiaHeroProps) {
  return (
    <>
      {/* Header fixo no topo */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 22, 40, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <KaiaWaterLogo showText={false} style={{ height: '36px', width: 'auto' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>KAIA</span>
        </div>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>Recursos</a>
          <a href="#pricing" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>Planos</a>
          <a href="#faq" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" style={{
            background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Contato</a>
        </nav>
      </header>

      <section className="kaia-hero" style={{ paddingTop: '100px' }}>
        {/* Floating background elements */}
        <div className="kaia-float-elements">
          <div className="kaia-float-orb kaia-float-orb-1" />
          <div className="kaia-float-orb kaia-float-orb-2" />
        </div>

        <div className="kaia-hero-content">
          {/* Kaia brand mark - LOGO 300px */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <KaiaWaterLogo showText={false} style={{ height: '300px', width: 'auto' }} />
          </div>
          
          <span className="kaia-badge kaia-animate">App de IA - People Analytics</span>

          <h1 className="kaia-animate kaia-animate-delay-1" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Desenvolva pessoas 3x mais rapido com IA
          </h1>

          <p className="kaia-hero-subtitle kaia-animate kaia-animate-delay-2" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            A Kaia e o app que mapeia potencial, cria PDIs e ativa rituais de lideranca - da analise a acao, em minutos.
          </p>

          <div className="kaia-cta-group kaia-animate kaia-animate-delay-3" style={{ marginBottom: '2rem' }}>
            <a href="#pricing" className="kaia-btn kaia-btn-primary">
              Ver planos
            </a>
            <a href="https://wa.me/5511999999999" className="kaia-btn kaia-btn-secondary" target="_blank" rel="noopener">
              Falar com consultor
            </a>
          </div>

          {/* Stats */}
          <div className="kaia-stats kaia-animate kaia-animate-delay-4">
            <div className="kaia-stat">
              <div className="kaia-stat-value">+3x</div>
              <div className="kaia-stat-label">Precisao em PDI</div>
            </div>
            <div className="kaia-stat">
              <div className="kaia-stat-value">-28%</div>
              <div className="kaia-stat-label">Turnover potencial</div>
            </div>
            <div className="kaia-stat">
              <div className="kaia-stat-value">7d</div>
              <div className="kaia-stat-label">Ate 1o diagnostico</div>
            </div>
            <div className="kaia-stat">
              <div className="kaia-stat-value">360</div>
              <div className="kaia-stat-label">Visao integrada</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
