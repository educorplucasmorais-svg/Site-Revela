import { useEffect, useState } from 'react';
import '../styles/page-transition.css';

interface PageTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'wave' | 'fill' | 'fade'>('idle');

  useEffect(() => {
    if (isActive) {
      setPhase('wave');
      
      // Wave animation
      setTimeout(() => setPhase('fill'), 600);
      
      // Fill complete
      setTimeout(() => setPhase('fade'), 1200);
      
      // Animation complete
      setTimeout(() => {
        setPhase('idle');
        onComplete?.();
      }, 1800);
    }
  }, [isActive, onComplete]);

  if (phase === 'idle') return null;

  return (
    <div className={`page-transition ${phase}`}>
      {/* Liquid Wave SVG */}
      <svg 
        className="transition-wave"
        viewBox="0 0 1440 800" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient from Orange to Blue */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35">
              <animate 
                attributeName="stop-color" 
                values="#FF6B35;#6366F1;#22D3EE" 
                dur="1.2s" 
                fill="freeze"
              />
            </stop>
            <stop offset="50%" stopColor="#FF8C50">
              <animate 
                attributeName="stop-color" 
                values="#FF8C50;#818CF8;#06B6D4" 
                dur="1.2s" 
                fill="freeze"
              />
            </stop>
            <stop offset="100%" stopColor="#FFB088">
              <animate 
                attributeName="stop-color" 
                values="#FFB088;#22D3EE;#0891B2" 
                dur="1.2s" 
                fill="freeze"
              />
            </stop>
          </linearGradient>

          {/* Glow Filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main Wave */}
        <path 
          className="wave-path wave-1"
          fill="url(#waveGradient)" 
          filter="url(#glow)"
          d="M0,800 L0,400 Q180,350 360,400 T720,400 T1080,400 T1440,400 L1440,800 Z"
        />
        
        {/* Secondary Wave */}
        <path 
          className="wave-path wave-2"
          fill="url(#waveGradient)" 
          opacity="0.7"
          d="M0,800 L0,450 Q180,400 360,450 T720,450 T1080,450 T1440,450 L1440,800 Z"
        />

        {/* Third Wave */}
        <path 
          className="wave-path wave-3"
          fill="url(#waveGradient)" 
          opacity="0.5"
          d="M0,800 L0,500 Q180,450 360,500 T720,500 T1080,500 T1440,500 L1440,800 Z"
        />
      </svg>

      {/* Liquid Droplets */}
      <div className="transition-droplets">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="droplet"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
            }}
          />
        ))}
      </div>

      {/* Particles/Bubbles */}
      <div className="transition-bubbles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 0.8}s`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      {/* Center Logo/Text */}
      <div className="transition-logo">
        <span className="transition-logo-icon">🤖</span>
        <span className="transition-logo-text">Kaia</span>
      </div>
    </div>
  );
}
