import { useState } from 'react';
import { KaiaAppDemo } from '../components/KaiaAppDemo';
import { KaiaHero } from '../components/KaiaHero';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaCTA } from '../components/KaiaCTA';
import '../styles/kaia.css';

export default function KaiaPage() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return (
      <div style={{ marginTop: '-80px' }}>
        <KaiaAppDemo />
        {/* Floating back button */}
        <button
          onClick={() => setShowDemo(false)}
          style={{
            position: 'fixed',
            top: '100px',
            left: '280px',
            padding: '10px 20px',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1001,
            fontSize: '0.85rem',
            fontWeight: 600,
            fontFamily: 'inherit',
          }}
        >
          ← Voltar para Landing Page
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '-96px' }}>
      <KaiaHero onDemoClick={() => setShowDemo(true)} />
      <KaiaFeatures />
      <KaiaPricing />
      <KaiaCTA />
    </div>
  );
}
