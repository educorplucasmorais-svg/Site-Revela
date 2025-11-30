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
      {/* Background Tree Image - Parallax */}
      <div 
        className="kaia-bg-tree"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img src="/hero-tree.jpg" alt="" className="kaia-bg-tree-img" />
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
          <a href="#features">Recursos</a>
          <a href="#pricing">Planos</a>
          <button onClick={() => setLocation('/kaia/hub')} className="kaia-nav-demo">
            Acessar Hub
          </button>
        </nav>
      </header>

      <KaiaHero onDemoClick={() => setLocation('/kaia/hub')} />
      <KaiaFeatures />
      <KaiaTestimonials />
      <KaiaSecurity />
      <KaiaPricing />
      <KaiaFAQ />
      <KaiaCTA />
    </div>
  );
}
