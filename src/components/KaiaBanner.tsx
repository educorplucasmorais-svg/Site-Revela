import { Link } from 'wouter';
import { KaiaWaterLogo } from './KaiaWaterLogo';
import '../styles/kaia-banner.css';

export function KaiaBanner() {
  return (
    <section className="kaia-banner">
      <div className="kaia-banner-bg" />
      <div className="kaia-banner-waves" aria-hidden>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M0,80 C300,150 500,0 800,60 C1100,120 1300,80 1440,40 L1440,200 L0,200 Z" fill="url(#waveGrad)" />
        </svg>
      </div>
      <div className="container kaia-banner-inner">
        <div className="kaia-banner-left">
          <span className="kaia-banner-label">— Kaia</span>
          <h3 className="kaia-banner-title">
            Mergulhe no mar de conhecimento
            <span className="kaia-banner-highlight"> com a Kaia</span>
          </h3>
          <p className="kaia-banner-sub">
            Sua assistente de IA para pessoas e negócios. Descubra, aprenda e evolua com insights acionáveis.
          </p>
          <div className="kaia-banner-cta">
            <Link href="/kaia">
              <a className="btn btn-primary">Acessar Kaia →</a>
            </Link>
            <a href="#contato" className="btn btn-secondary">Falar com especialista</a>
          </div>
        </div>
        <div className="kaia-banner-right">
          <KaiaWaterLogo className="kaia-banner-logo" showText={false} />
        </div>
      </div>
    </section>
  );
}
