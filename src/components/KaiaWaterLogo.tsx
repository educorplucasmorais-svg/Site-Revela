'use client';

import { forwardRef } from 'react';

export type KaiaWaterLogoProps = {
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  showText?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const KaiaWaterLogo = forwardRef<SVGSVGElement, KaiaWaterLogoProps>(({ className, style, showText = true, ...props }, ref) => {
  const cubeGradientId = 'kaia-cube-gradient';
  const waterGradientId = 'kaia-water-gradient';

  return (
    <svg
      ref={ref}
      className={className}
      style={style}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={props['aria-label'] || 'KAIA Logo'}
      {...props}
    >
      <defs>
        <linearGradient id={cubeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c6ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#0072ff" stopOpacity="1" />
        </linearGradient>

        <linearGradient id={waterGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#005bea" stopOpacity="1" />
          <stop offset="100%" stopColor="#00c6ff" stopOpacity="0.8" />
        </linearGradient>

        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ícone Gráfico */}
      <g transform="translate(50, 50) scale(0.8)">
        {/* Água / Ondas */}
        <g fill={`url(#${waterGradientId})`} opacity="0.9">
          <path d="M 50,300 Q 150,350 250,300 T 450,300 V 350 H 50 Z" />
          <path d="M 0,320 Q 120,280 250,320 T 500,320 V 380 H 0 Z" opacity="0.7" />
          <path d="M 100,250 Q 50,280 50,320 L 150,320 Q 150,280 100,250 Z" />
        </g>

        {/* Cubo Tecnológico */}
        <g stroke={`url(#${cubeGradientId})`} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#soft-glow)">
          <path d="M 250,50 L 400,125 V 275 L 250,350 L 100,275 V 125 Z" />
          <path d="M 100,125 L 250,200 L 400,125" />
          <path d="M 250,200 V 350" />

          <path d="M 250,100 L 325,137.5" opacity="0.6" />
          <path d="M 250,150 L 175,112.5" opacity="0.6" />

          <path d="M 150,150 V 250" opacity="0.6" />
          <path d="M 175,287.5 L 250,250" opacity="0.6" />

          <path d="M 350,150 V 250" opacity="0.6" />
          <path d="M 325,287.5 L 250,250" opacity="0.6" />

          <circle cx="250" cy="50" r="5" fill="#fff" stroke="none" />
          <circle cx="400" cy="125" r="5" fill="#fff" stroke="none" />
          <circle cx="100" cy="125" r="5" fill="#fff" stroke="none" />
          <circle cx="250" cy="200" r="7" fill="#fff" stroke="none" />
          <circle cx="250" cy="350" r="5" fill="#fff" stroke="none" />
          <circle cx="175" cy="162.5" r="4" fill={`url(#${cubeGradientId})`} stroke="none" />
          <circle cx="325" cy="162.5" r="4" fill={`url(#${cubeGradientId})`} stroke="none" />
        </g>
      </g>

      {showText && (
        <g transform="translate(0, 430)">
          <text x="50%" y="0" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="60" fontWeight="800" fill="currentColor" letterSpacing="4">
            KAIA
          </text>
          <text x="50%" y="40" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="18" fontWeight="500" fill="currentColor" opacity="0.7" letterSpacing="1">
            PLATAFORMA DE DESENVOLVIMENTO DE PESSOAS
          </text>
        </g>
      )}
    </svg>
  );
});

KaiaWaterLogo.displayName = 'KaiaWaterLogo';
