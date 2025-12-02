import { KaiaWaterLogo } from './KaiaWaterLogo';
interface KaiaHeroProps {
  onDemoClick?: () => void;
  onMembersClick?: () => void;
}

export function KaiaHero({ onDemoClick, onMembersClick }: KaiaHeroProps) {
  return (
    <section className="kaia-hero">
      {/* Floating background elements */}
      <div className="kaia-float-elements">
        <div className="kaia-float-orb kaia-float-orb-1" />
        <div className="kaia-float-orb kaia-float-orb-2" />
      </div>
      
      <div className="kaia-hero-content">
        {/* Kaia brand mark */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <KaiaWaterLogo showText={false} style={{ height: '56px', width: 'auto', opacity: 0.9 }} />
        </div>
        <span className="kaia-badge kaia-animate">App de IA • People Analytics</span>

        <h1 className="kaia-animate kaia-animate-delay-1">
          Desenvolva pessoas 3x mais rápido com IA
        </h1>

        <p className="kaia-hero-subtitle kaia-animate kaia-animate-delay-2">
          A Kaia é o app que mapeia potencial, cria PDIs e ativa rituais de liderança — da análise à ação, em minutos.
          Um fluxo contínuo e mensurável para elevar performance, engajamento e retenção.
        </p>
        
        <div className="kaia-cta-group kaia-animate kaia-animate-delay-3">
          {onDemoClick && (
            <button onClick={onDemoClick} className="kaia-btn kaia-btn-primary">
              🧪 Demonstração gratuita
            </button>
          )}
          <a href="#pricing" className="kaia-btn kaia-btn-secondary">
            Ver planos
            <span>→</span>
          </a>
          {onMembersClick && (
            <button onClick={onMembersClick} className="kaia-btn kaia-btn-oxygen" style={{ marginLeft: 8 }}>
              Área de Membros
            </button>
          )}
        </div>

        {/* Teaser media tile: plays if VITE_KAIA_TEASER_URL is provided; else shows a gradient with a Play button */}
        <div className="kaia-hero-media kaia-animate kaia-animate-delay-4">
          {typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_KAIA_TEASER_URL ? (
            <div className="kaia-media-tile">
              <video
                className="kaia-media-video"
                src={(import.meta as any).env.VITE_KAIA_TEASER_URL}
                muted
                loop
                playsInline
                autoPlay
                aria-label="Teaser da Kaia"
              />
            </div>
          ) : (
            <div className="kaia-media-tile kaia-media-fallback">
              <div className="kaia-media-content">
                <div className="kaia-media-eyebrow">Preview</div>
                <div className="kaia-media-title">Veja a Kaia em ação</div>
                {onDemoClick && (
                  <button className="kaia-btn kaia-btn-secondary" onClick={onDemoClick}>
                    Reproduzir demonstração
                  </button>
                )}
              </div>
            </div>
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
