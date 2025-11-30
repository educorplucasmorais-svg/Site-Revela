'use client';

import { forwardRef } from 'react';

type LogoProps = {
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
} & React.SVGProps<SVGSVGElement>;

export const KaiaLogo = forwardRef<SVGSVGElement, LogoProps>(({ className, style, ...props }, ref) => {
    return (
        <svg 
            ref={ref}
            className={className} 
            style={style} 
            width="800" 
            height="800" 
            viewBox="0 0 800 800" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00c6ff' }} />
                    <stop offset="100%" style={{ stopColor: '#0072ff' }} />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="7.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <style>
                    {`
                        @keyframes flow {
                            to {
                                stroke-dashoffset: 1000;
                            }
                        }
                        @keyframes pulseGlow {
                            0%, 100% { opacity: 0.6; }
                            50% { opacity: 1; }
                        }
                        .circuit-path {
                            stroke-dasharray: 500;
                            stroke-dashoffset: 0;
                            animation: flow 10s linear infinite;
                        }
                        .circuit-group {
                            animation: pulseGlow 3s ease-in-out infinite;
                        }
                    `}
                </style>
            </defs>

            {/* Grupo de Animação de Circuito */}
            <g className="circuit-group" stroke="#00e5ff" strokeWidth="1.5" fill="none" filter="url(#glow)">
                <path className="circuit-path" d="M 400,220 V 150 H 300 L 250,100" />
                <path className="circuit-path" style={{ animationDelay: '-1s' }} d="M 400,220 V 120 H 500 L 550,170" />
                <path className="circuit-path" style={{ animationDelay: '-2s' }} d="M 580,325 H 650 V 250 L 700,225" />
                <path className="circuit-path" style={{ animationDelay: '-3s' }} d="M 580,475 H 680 L 730,425" />
                <path className="circuit-path" style={{ animationDelay: '-4s' }} d="M 400,580 V 650 H 500 L 550,700" />
                <path className="circuit-path" style={{ animationDelay: '-5s' }} d="M 400,580 V 680 H 300 L 250,630" />
                <path className="circuit-path" style={{ animationDelay: '-6s' }} d="M 220,475 H 120 V 550 L 70, 580" />
                <path className="circuit-path" style={{ animationDelay: '-7s' }} d="M 220,325 H 150 V 250 L 100, 225" />
                <path className="circuit-path" style={{ animationDelay: '-8s' }} d="M 350,220 L 300, 270 H 240" />
                <path className="circuit-path" style={{ animationDelay: '-9s' }} d="M 450,220 L 500, 270 H 560" />
                <path className="circuit-path" d="M 545,525 L 500,580" />
                <path className="circuit-path" style={{ animationDelay: '-1s' }} d="M 255,525 L 300,580" />
                <path className="circuit-path" style={{ animationDelay: '-2s' }} d="M 200,400 H 100" />
                <path className="circuit-path" style={{ animationDelay: '-3s' }} d="M 600,400 H 700" />

                {/* Nós do circuito */}
                <circle cx="400" cy="150" r="4"/>
                <circle cx="250" cy="100" r="4"/>
                <circle cx="550" cy="170" r="4"/>
                <circle cx="700" cy="225" r="4"/>
                <circle cx="730" cy="425" r="3"/>
                <circle cx="550" cy="700" r="4"/>
                <circle cx="250" cy="630" r="3"/>
                <circle cx="70" cy="580" r="4"/>
                <circle cx="100" cy="225" r="4"/>
                <circle cx="240" cy="270" r="3"/>
                <circle cx="560" cy="270" r="3"/>
            </g>

            {/* Hexágono Central */}
            <polygon points="400,220 580,325 580,475 400,580 220,475 220,325" fill="url(#hexagonGradient)" opacity="0.9"/>
            <polygon points="400,220 580,325 580,475 400,580 220,475 220,325" fill="black" opacity="0.2"/>

            {/* Texto "KAIA" */}
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                  fontFamily="Arial, Helvetica, sans-serif" fontSize="90" fontWeight="bold"
                  fill="white" letterSpacing="8">
                KAIA
            </text>
        </svg>
    );
});

KaiaLogo.displayName = 'KaiaLogo';
