import React from 'react';
import '../styles/kaia.css';
import KaiaHero from '../components/KaiaHero';
import KaiaFeatures from '../components/KaiaFeatures';
import KaiaPricing from '../components/KaiaPricing';
import KaiaFAQ from '../components/KaiaFAQ';
import KaiaCTA from '../components/KaiaCTA';
import KaiaSecurity from '../components/KaiaSecurity';
import KaiaTestimonials from '../components/KaiaTestimonials';
import WhatsAppButton from '../components/WhatsAppButton';

const KaiaPage: React.FC = () => {
  return (
    <div className="kaia-page" style={{ position: 'relative' }}>
      {/* Background */}
      <div className="kaia-simple-bg" />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <KaiaHero />
        <KaiaFeatures />
        <KaiaTestimonials />
        <KaiaPricing />
        <KaiaSecurity />
        <KaiaFAQ />
        <KaiaCTA />
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default KaiaPage;
