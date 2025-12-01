import { useEffect, useState } from 'react';
import '../styles/page-transition.css';

interface PageTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'show' | 'exit'>('idle');

  useEffect(() => {
    if (isActive) {
      setPhase('enter');
      
      // Show logo
      setTimeout(() => setPhase('show'), 400);
      
      // Exit animation
      setTimeout(() => setPhase('exit'), 1200);
      
      // Complete
      setTimeout(() => {
        setPhase('idle');
        onComplete?.();
      }, 1600);
    }
  }, [isActive, onComplete]);

  if (phase === 'idle') return null;

  return (
    <div className={`page-transition ${phase}`}>
      {/* Gradient Background with Animated Panels */}
      <div className="transition-panel transition-panel-1" />
      <div className="transition-panel transition-panel-2" />
      
      {/* Center Logo */}
      <div className="transition-content">
        <div className="transition-logo">
          <svg viewBox="0 0 200 200" className="logo-svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* Kaia Logo - Ocean wave with AI spark */}
            <circle cx="100" cy="100" r="80" fill="url(#logoGradient)" opacity="0.1" />
            <path 
              d="M 40 100 Q 70 80, 100 100 T 160 100" 
              stroke="url(#logoGradient)" 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M 40 110 Q 70 90, 100 110 T 160 110" 
              stroke="url(#logoGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle cx="100" cy="70" r="8" fill="#22D3EE">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="75" r="4" fill="#06B6D4" opacity="0.7" />
            <circle cx="110" cy="75" r="4" fill="#06B6D4" opacity="0.7" />
          </svg>
          <h1 className="logo-text">Kaia</h1>
          <p className="logo-subtitle">Inteligência em Pessoas</p>
        </div>
      </div>

      {/* Subtle Particle Effect */}
      <div className="transition-particles">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${10 + i * 7}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
