import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { KaiaAppDemo } from '../components/KaiaAppDemo';
import { KaiaHero } from '../components/KaiaHero';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaSecurity } from '../components/KaiaSecurity';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaTestimonials } from '../components/KaiaTestimonials';
import { KaiaFAQ } from '../components/KaiaFAQ';
import { KaiaCTA } from '../components/KaiaCTA';
import { KaiaLogo } from '../components/KaiaLogo';
import '../styles/kaia.css';

export default function KaiaPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showDemo) {
    return (
      <div style={{ marginTop: '-80px' }}>
        <KaiaAppDemo />
        <button
          onClick={() => setShowDemo(false)}
          className="kaia-back-btn"
        >
          ← Voltar para Landing Page
        </button>
      </div>
    );
  }

  return (
    <div className="kaia-page" style={{ marginTop: '-96px' }}>
      {/* Static PNG background prioritized; canvas VFX disabled for clarity */}
      {/* Background Tree Image - Parallax */}
      <div 
        className="kaia-bg-tree"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img src="/kaia-bg.png" alt="" className="kaia-bg-tree-img" />
        <div className="kaia-bg-tree-overlay" />
      </div>

      {/* Floating Leaves Animation */}
      <div className="kaia-leaves">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="kaia-leaf" />
        ))}
      </div>

      {/* Kaia Logo Header */}
      <header className="kaia-header">
        <div className="kaia-logo">
          <KaiaLogo style={{ height: '40px', width: 'auto' }} />
        </div>
        <nav className="kaia-nav">
          <Link href="/revela" className="kaia-nav-link">
            ← Hub Revela
          </Link>
          <a href="#visao">Visão</a>
          <a href="#features">Recursos</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#cases">Casos</a>
          <a href="#metricas">Métricas</a>
          <a href="#pricing">Planos</a>
          <button onClick={() => setLocation('/kaia/hub')} className="kaia-nav-demo">
            Acessar Hub
          </button>
        </nav>
      </header>

      <KaiaHero onDemoClick={() => setLocation('/kaia/hub')} />
      <div className="container" style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
        <button className="btn btn-primary" onClick={() => setLocation('/kaia/hub')}>
          Acessar Hub da Kaia →
        </button>
      </div>
      {/* Visão Estratégica */}
      <section className="section-pattern" id="visao" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="hero-label">— VISÃO</span>
            <h2 style={{ fontSize: '2rem', lineHeight: 1.15 }}>Um copiloto inteligente para Liderança, RH e Performance Humana</h2>
            <p style={{ fontSize: '1.05rem', maxWidth: '840px', margin: 'var(--space-md) auto 0' }}>
              A Kaia conecta People Analytics + Gestão de Talentos em um fluxo único: do diagnóstico granular à
              prescrição de ações práticas que elevam engajamento, retenção e desenvolvimento.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginTop: 'var(--space-md)' }}>
              <span className="tag">Mapeamento Comportamental</span>
              <span className="tag">PDI Inteligente</span>
              <span className="tag">Métricas de Cultura</span>
              <span className="tag">Recomendações de Gestão</span>
            </div>
          </div>
          {/* Problemas que resolvemos */}
          <div className="grid" style={{ display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {[
              { title: 'Baixa Clareza de Potencial', text: 'Empresas não sabem quais talentos acelerar e em que timing.' },
              { title: 'Planos que não Viram Rotina', text: 'PDIs e feedbacks não se convertem em evolução mensurável.' },
              { title: 'Alta Rotatividade Oculta', text: 'Sinais precoces de saída passam despercebidos até ser tarde.' },
              { title: 'Cultura sem Termômetro', text: 'Falta leitura integrada entre clima, comportamento e desempenho.' }
            ].map(item => (
              <div key={item.title} className="card revela-card-dark" style={{ padding: 'var(--space-lg)' }}>
                <h3 className="revela-keyword" style={{ marginBottom: 'var(--space-sm)' }}>{item.title}</h3>
                <p style={{ margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Roadmap & Módulos */}
      <section className="section-dark" id="roadmap">
        <div className="container" style={{ maxWidth: '1150px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="hero-label">— ROADMAP 2026</span>
            <h2 style={{ fontSize: '1.9rem', lineHeight: 1.2 }}>Evolução Planejada e Entregas de Alto Impacto</h2>
            <p style={{ fontSize: '1.02rem', maxWidth: '800px', margin: 'var(--space-md) auto 0' }}>Cada fase expande profundidade analítica e poder de ação para líderes e áreas de desenvolvimento humano.</p>
          </div>
          <div className="grid" style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {[
              { step: 'MVP 2', date: '01/01/2026', focus: 'Mapeamento Avulso', result: 'Decisões rápidas sobre perfil e aderência.' },
              { step: 'MVP 1', date: '15/01/2026', focus: 'Mapeamento + PDI + Metas', result: 'Integração total ciclo talento.' },
              { step: 'Release Mobile', date: 'Q3 2026', focus: 'Acesso Líder & Talento', result: 'Acompanhamento contínuo em tempo real.' },
              { step: 'Analytics Avançado', date: 'Q4 2026', focus: 'Correlações & Riscos', result: 'Previsões preditivas de saída e evolução.' }
            ].map(r => (
              <div key={r.step} className="card" style={{ padding: 'var(--space-lg)', background: 'var(--color-bg-elevated)' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-primary)' }}>{r.step} • {r.date}</h3>
                <p style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.5px', margin: 'var(--space-xs) 0 0', opacity: .8 }}>{r.focus}</p>
                <p style={{ fontSize: '.9rem', marginTop: 'var(--space-sm)' }}>{r.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Casos de Uso */}
      <section className="section-pattern" id="cases">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="hero-label">— CASOS DE USO</span>
            <h2 style={{ fontSize: '1.9rem', lineHeight: 1.15 }}>Aplicações Diretas no Dia a Dia</h2>
          </div>
          <div className="grid" style={{ display: 'grid', gap: 'var(--space-xl)', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {[
              { title: 'Onboarding Inteligente', text: 'Mapeamento rápido de perfil para integração personalizada e engajamento inicial.' },
              { title: 'Rituais de Liderança', text: 'Recomendações semanais de foco para 1:1 e evolução de equipe.' },
              { title: 'Retenção Preventiva', text: 'Alertas antecipados de risco de saída e plano de ação sugerido.' },
              { title: 'Aceleração de Talentos', text: 'Identificação de alto potencial e trilhas personalizadas de desenvolvimento.' }
            ].map(c => (
              <div key={c.title} className="card revela-card-dark" style={{ padding: 'var(--space-lg)' }}>
                <h3 className="revela-keyword" style={{ marginBottom: 'var(--space-sm)' }}>{c.title}</h3>
                <p style={{ margin: 0 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Métricas & Impacto */}
      <section className="section-dark" id="metricas">
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="hero-label">— MÉTRICAS E IMPACTO</span>
            <h2 style={{ fontSize: '1.85rem', lineHeight: 1.2 }}>Resultados Esperados no Ciclo Inicial</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center' }}>
            {[
              { label: 'Redução de Rotatividade Oculta', value: '−18%' },
              { label: 'Engajamento em Rituais de Gestão', value: '+32%' },
              { label: 'Precisão de Identificação de Potencial', value: '+27%' },
              { label: 'Aderência a Planos de Desenvolvimento', value: '+42%' }
            ].map(m => (
              <div key={m.label} className="card" style={{ padding: 'var(--space-md) var(--space-lg)', background: 'var(--color-bg-elevated)' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-primary)' }}>{m.value}</h3>
                <p style={{ margin: 0, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.5px' }}>{m.label}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <a href="#contato" className="btn btn-primary">Solicitar acesso antecipado</a>
          </div>
        </div>
      </section>
      <KaiaFeatures />
      <KaiaTestimonials />
      <KaiaSecurity />
      <KaiaPricing />
      <KaiaFAQ />
      <KaiaCTA />
    </div>
  );
}
