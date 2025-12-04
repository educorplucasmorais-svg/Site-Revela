import '../styles/kaia.css';
import { KaiaHero } from '../components/KaiaHero';
import { KaiaBanner } from '../components/KaiaBanner';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaFAQ } from '../components/KaiaFAQ';
import { KaiaCTA } from '../components/KaiaCTA';

export default function Kaia() {
  return (
    <div className="kaia-page">
      {/* Hero Section */}
      <KaiaHero />

      {/* Banner / Intro */}
      <KaiaBanner />

      {/* Features Section */}
      <KaiaFeatures />

      {/* Pricing Section */}
      <KaiaPricing />

      {/* FAQ Section */}
      <KaiaFAQ />

      {/* CTA Final */}
      <KaiaCTA />
    </div>
  );
}
