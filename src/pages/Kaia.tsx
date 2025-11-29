
import { KaiaHero } from '../components/KaiaHero';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaCTA } from '../components/KaiaCTA';

export default function KaiaPage() {
  return (
    <main style={{padding: '0 16px'}}>
      <KaiaHero />
      <KaiaFeatures />
      <KaiaPricing />
      <KaiaCTA />
    </main>
  );
}
