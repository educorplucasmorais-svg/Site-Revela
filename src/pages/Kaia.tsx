import { KaiaHero } from '../components/KaiaHero';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaCTA } from '../components/KaiaCTA';
import '../styles/kaia.css';

export default function KaiaPage() {
  return (
    <div style={{ marginTop: '-96px' }}> {/* Compensate for header height */}
      <KaiaHero />
      <KaiaFeatures />
      <KaiaPricing />
      <KaiaCTA />
    </div>
  );
}
