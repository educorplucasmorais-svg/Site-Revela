import '../styles/kaia.css';
import { useEffect, useState, useRef } from 'react';
import { KaiaWaterLogo } from '../components/KaiaWaterLogo';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaFAQ } from '../components/KaiaFAQ';

// ========================================
// TECH-NOIR LANDING PAGE - KAIA
// Estética: Dark Mode Premium + Neon Accents
// Features: Scrollytelling + Partículas + Big Type
// ========================================

// Partículas flutuantes estilo WebGL (CSS puro para performance)
const ParticleField = () => {
  const particles = useRef<Array<{ x: number; y: number; size: number; speed: number; opacity: number }>>([]);
  
  if (particles.current.length === 0) {
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.4
    }));
  }

  return (
    <div className="particle-field">
      {particles.current.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${15 / p.speed}s`,
            animationDelay: `${-i * 0.3}s`
          }}
        />
      ))}
    </div>
  );
};

// Orbe de gradiente flutuante (efeito Three.js simulado)
const GradientOrb = ({ position, color, size }: { position: string; color: string; size: number }) => (
  <div
    className="gradient-orb"
    style={{
      position: 'absolute',
      ...JSON.parse(`{${position}}`),
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(60px)',
      opacity: 0.4,
      animation: 'orbFloat 20s ease-in-out infinite'
    }}
  />
);

// Ícones SVG minimalistas
const IconProfile = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const IconPDI = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 11h6M8 15h4" />
  </svg>
);

const IconMetas = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" opacity="0.5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const IconIA = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <circle cx="12" cy="10" r="2" />
    <path d="M9 15h6" />
  </svg>
);

const IconShield = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconChart = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 20h16" />
    <path d="M4 10l4-3 4 5 4-7 4 4" />
  </svg>
);

// Big Type animado (Tipografia Cinética)
const BigType = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`big-type ${visible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

// Card com efeito de borda neon
const NeonCard = ({ children, accent = '#22D3EE' }: { children: React.ReactNode; accent?: string }) => (
  <div className="neon-card" style={{ '--accent': accent } as React.CSSProperties}>
    {children}
  </div>
);

// Seção com Scrollytelling
const ScrollSection = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`scroll-section ${inView ? 'in-view' : ''}`}>
      {children}
    </section>
  );
};

const KaiaPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setHeaderSolid(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tech-noir-page">
      {/* Background Tech-Noir */}
      <div className="tech-noir-bg">
        <div className="noise-overlay" />
        <ParticleField />
        <GradientOrb position='"top": "-200px", "left": "-200px"' color="#22D3EE" size={600} />
        <GradientOrb position='"bottom": "-300px", "right": "-200px"' color="#0891B2" size={500} />
        <GradientOrb position='"top": "50%", "right": "10%"' color="#06B6D4" size={300} />
      </div>

      {/* Header Premium Fixo */}
      <header className={`tech-header ${headerSolid ? 'solid' : ''}`}>
        <div className="header-content">
          <a href="/" className="header-logo">
            <span className="logo-text">KAIA</span>
          </a>
          <nav className="header-nav">
            <a href="#features">Recursos</a>
            <a href="#pricing">Planos</a>
            <a href="#faq">FAQ</a>
            <a href="https://wa.me/5531993044867" className="nav-cta" target="_blank" rel="noopener">
              Falar com Consultor
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Big Type */}
      <section className="hero-tech-noir">
        <div className="hero-content">
          {/* Logo KAIA Grande Animada */}
          <div className="hero-logo-container">
            <KaiaWaterLogo
              showText={true}
              animated={true}
              style={{
                width: '320px',
                height: 'auto'
              }}
            />
          </div>

          <div className="hero-badge">
            <span className="badge-dot" />
            People Analytics + IA
          </div>

          <BigType delay={0}>DESENVOLVA</BigType>
          <BigType delay={200}>PESSOAS</BigType>
          <BigType delay={400}>COM CIÊNCIA</BigType>          <p className="hero-subtitle">
            Diagnóstico comportamental científico. PDI automático. 
            <br />
            Resultados mensuráveis em 7 dias.
          </p>

          <div className="hero-actions">
            <a href="#pricing" className="btn-primary-neon">
              Começar agora
              <span className="btn-glow" />
            </a>
            <a href="#features" className="btn-ghost">
              Ver recursos
            </a>
          </div>

          {/* Stats com efeito de contagem */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">+3x</span>
              <span className="stat-label">Precisão PDI</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">-28%</span>
              <span className="stat-label">Turnover</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">7d</span>
              <span className="stat-label">1º Diagnóstico</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator - desaparece gradualmente com o scroll */}
        <div 
          className="scroll-indicator"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-50%) translateY(${scrollY * 0.5}px)`,
            pointerEvents: scrollY > 100 ? 'none' : 'auto'
          }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Role para explorar</span>
        </div>
      </section>

      {/* Features - Scrollytelling Cards */}
      <ScrollSection id="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">O Ciclo</span>
            <h2 className="section-title-big">
              Três pilares.<br />
              <span className="text-gradient">Um sistema integrado.</span>
            </h2>
          </div>

          <div className="features-grid">
            <NeonCard>
              <div className="card-icon"><IconProfile /></div>
              <h3>Mapeamento de Perfil</h3>
              <p>DISC, QP, Sabotadores e Maturidade integrados. A IA gera diagnóstico científico eliminando achismo.</p>
              <div className="card-number">01</div>
            </NeonCard>

            <NeonCard accent="#0891B2">
              <div className="card-icon" style={{ color: '#0891B2' }}><IconPDI /></div>
              <h3>PDI Inteligente</h3>
              <p>Plano de Desenvolvimento Individual automático com SWOT, 5W2H, ações, prazos e métricas.</p>
              <div className="card-number">02</div>
            </NeonCard>

            <NeonCard accent="#0EA5E9">
              <div className="card-icon" style={{ color: '#0EA5E9' }}><IconMetas /></div>
              <h3>Gestão de Metas</h3>
              <p>Objetivos claros e mensuráveis. Contrato transparente entre líder e liderado por Quarter.</p>
              <div className="card-number">03</div>
            </NeonCard>
          </div>
        </div>
      </ScrollSection>

      {/* Por que Kaia - Broken Grid Layout */}
      <ScrollSection>
        <div className="section-container">
          <div className="broken-grid">
            <div className="grid-text">
              <span className="section-tag">Diferenciais</span>
              <h2 className="section-title-big">
                Por que a<br />
                <span className="text-gradient">KAIA?</span>
              </h2>
            </div>

            <div className="differentials-grid">
              <div className="diff-card">
                <IconIA />
                <h4>IA Proprietária</h4>
                <p>Modelos treinados com perfis reais brasileiros</p>
              </div>
              <div className="diff-card">
                <IconShield />
                <h4>LGPD Compliant</h4>
                <p>100% auditável e transparente</p>
              </div>
              <div className="diff-card">
                <IconChart />
                <h4>People Analytics 2.0</h4>
                <p>Análise prescritiva, não só descritiva</p>
              </div>
              <div className="diff-card highlight">
                <span className="big-number">5x</span>
                <h4>ROI Comprovado</h4>
                <p>Retorno no primeiro ano</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* CTA Flutuante */}
      <section className="cta-floating">
        <div className="cta-content">
          <h2>Pronto para transformar sua gestão de pessoas?</h2>
          <a href="#pricing" className="btn-primary-neon large">
            Ver planos
            <span className="btn-glow" />
          </a>
        </div>
      </section>

      {/* Pricing */}
      <ScrollSection id="pricing">
        <KaiaPricing />
      </ScrollSection>

      {/* FAQ */}
      <ScrollSection id="faq">
        <KaiaFAQ />
      </ScrollSection>

      {/* Footer Tech-Noir */}
      <footer className="footer-tech-noir">
        <div className="footer-content">
          <div className="footer-brand">
            <KaiaWaterLogo showText={false} style={{ height: 48, width: 'auto' }} />
            <p>Desenvolvendo pessoas com ciência e tecnologia.</p>
          </div>
          <div className="footer-links">
            <a href="#features">Recursos</a>
            <a href="#pricing">Planos</a>
            <a href="#faq">FAQ</a>
            <a href="/">Revela</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Kaia by Revela. Todos os direitos reservados.</p>
          <a href="/" className="back-link">← Voltar para Revela</a>
        </div>
      </footer>
    </div>
  );
};

export default KaiaPage;