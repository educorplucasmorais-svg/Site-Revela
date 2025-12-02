import { KaiaWaterLogo } from './KaiaWaterLogo';
import { useState, useEffect } from 'react';

interface KaiaHeroProps {
  onDemoClick?: () => void;
  onMembersClick?: () => void;
}

export function KaiaHero({ onDemoClick, onMembersClick }: KaiaHeroProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Premium - Estilo Revela */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled 
          ? 'rgba(2, 8, 20, 0.98)' 
          : 'linear-gradient(180deg, rgba(2, 8, 20, 0.9) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34, 211, 238, 0.2)' : 'none',
        padding: scrolled ? '12px 40px' : '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo + Brand */}
        <a href="/kaia" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Glow effect behind logo */}
            <div style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'pulse 3s ease-in-out infinite'
            }} />
            <KaiaWaterLogo showText={false} style={{ height: '44px', width: 'auto', position: 'relative', zIndex: 1 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em'
            }}>KAIA</span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: 'rgba(255,255,255,0.5)', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>by Revela</span>
          </div>
        </a>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#features" style={{ 
            color: 'rgba(255,255,255,0.75)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >Recursos</a>
          
          <a href="#pricing" style={{ 
            color: 'rgba(255,255,255,0.75)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >Planos</a>
          
          <a href="#faq" style={{ 
            color: 'rgba(255,255,255,0.75)', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#22D3EE'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >FAQ</a>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />

          {/* CTA Buttons */}
          <a href="/" style={{ 
            color: 'rgba(255,255,255,0.6)', 
            textDecoration: 'none', 
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Revela
          </a>

          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" style={{
            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(34, 211, 238, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 211, 238, 0.3)';
          }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Demo
          </a>
        </nav>
      </header>

      {/* Keyframes for pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>

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
