import React, { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  url: string;
  icon?: string;
  description?: string;
};

// Load product data from data/products.json (fallback if dynamic import fails)
const loadProducts = async (): Promise<Product[]> => {
  try {
    // dynamic import so Vite can include the JSON
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mod = await import('../../data/products.json');
    return mod.default || mod;
  } catch (e) {
    return [
      {
        id: 'kaia',
        name: 'Kaia',
        url: 'https://kaia.example',
        icon: '/kaia.svg',
        description: 'Kaia - assistant',
      },
    ];
  }
};

const ProductsArea: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts().then(setProducts).catch(() => {});
  }, []);

  const openProduct = (p: Product) => {
    setActive(p);
  };

  const closeModal = () => setActive(null);

  return (
    <section id="produtos" className="section-pattern" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '1.5rem' }}>
          <span className="hero-label">— PRODUTOS</span>
          <h2>Explore nossos produtos</h2>
          <p style={{ maxWidth: 720, margin: '0 auto' }}>
            Toque no ícone para abrir o produto. Essa área simula uma tela de iPhone para
            demonstrar o produto como um app.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="phone-frame card">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="app-grid">
                {products.length === 0 && (
                  <div className="app-icon placeholder">
                    <div className="dot" />
                    <div className="app-label">—</div>
                  </div>
                )}

                {products.map((p) => (
                  <button
                    key={p.id}
                    className="app-icon"
                    onClick={() => openProduct(p)}
                    aria-label={`Abrir ${p.name}`}
                  >
                    {p.icon ? (
                      <img src={p.icon} alt={p.name} style={{ width: 56, height: 56, borderRadius: 12 }} />
                    ) : (
                      <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(255,255,255,0.12)' }} />
                    )}
                    <div className="app-label">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with iframe */}
      {active && (
        <div className="product-modal" role="dialog" aria-modal="true">
          <div className="product-modal-backdrop" onClick={closeModal} />
          <div className="product-modal-content">
            <div className="product-modal-header">
              <strong>{active.name}</strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <a className="btn btn-secondary" href={active.url} target="_blank" rel="noopener noreferrer">Abrir em nova aba</a>
                <button className="btn" onClick={closeModal} aria-label="Fechar">×</button>
              </div>
            </div>
            <div className="product-modal-body">
              <iframe
                title={active.name}
                src={active.url}
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                frameBorder={0}
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsArea;
