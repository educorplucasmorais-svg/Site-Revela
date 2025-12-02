import { useState } from 'react';
import { Link } from 'wouter';
import '../styles/products.css';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: 'live' | 'beta' | 'coming-soon';
  theme: 'purple' | 'blue' | 'orange' | 'green' | 'red';
  icon: string;
  features: string[];
  cta: string;
  link: string;
  image?: string;
}

const products: Product[] = [
  {
    id: 'kaia',
    name: 'Kaia',
    tagline: 'Sua assistente de IA pessoal',
    description: 'Transforme conversas em ações. Kaia aprende com você e automatiza tarefas repetitivas, economizando horas do seu dia.',
    status: 'live',
    theme: 'purple',
    icon: '🤖',
    features: [
      'Processamento de linguagem natural',
      'Automação de tarefas',
      'Integração com WhatsApp',
      'Aprendizado contínuo'
    ],
    cta: 'Conhecer Kaia',
    link: '/kaia',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
  },
  {
    id: 'automacao',
    name: 'AutoRevela',
    tagline: 'Automação empresarial sob medida',
    description: 'Criamos automações customizadas que integram seus sistemas e eliminam trabalho manual. De 8 horas para 8 minutos.',
    status: 'live',
    theme: 'blue',
    icon: '⚡',
    features: [
      'Integração de sistemas',
      'Workflows personalizados',
      'APIs e webhooks',
      'Dashboards em tempo real'
    ],
    cta: 'Automatizar agora',
    link: '#contato'
  },
  {
    id: 'mvp',
    name: 'MVP Express',
    tagline: 'Seu produto em 14 dias',
    description: 'Validamos sua ideia construindo um MVP funcional em até 14 dias. Metodologia ágil, entregas semanais e pivotagem rápida.',
    status: 'live',
    theme: 'orange',
    icon: '🚀',
    features: [
      'Desenvolvimento ágil',
      'Design system incluso',
      'Deploy automatizado',
      'Métricas de validação'
    ],
    cta: 'Criar meu MVP',
    link: '#contato'
  },
  {
    id: 'hub',
    name: 'RevelaHub',
    tagline: 'Plataforma de gestão inteligente',
    description: 'Sistema completo para gerenciar projetos, clientes e equipes. IA integrada para insights e automações.',
    status: 'beta',
    theme: 'green',
    icon: '🎯',
    features: [
      'Gestão de projetos',
      'CRM inteligente',
      'Análise preditiva',
      'Relatórios automáticos'
    ],
    cta: 'Entrar na beta',
    link: '#contato'
  },
  {
    id: 'chatbot',
    name: 'ChatRevela',
    tagline: 'Atendimento 24/7 com IA',
    description: 'Chatbot personalizado para seu negócio. Responde clientes, agenda reuniões e qualifica leads automaticamente.',
    status: 'live',
    theme: 'blue',
    icon: '💬',
    features: [
      'Treinamento personalizado',
      'Multi-canal (site, WhatsApp, Instagram)',
      'Base de conhecimento dinâmica',
      'Handoff para humanos'
    ],
    cta: 'Criar chatbot',
    link: '#contato'
  },
  {
    id: 'analytics',
    name: 'InsightRevela',
    tagline: 'Inteligência de dados',
    description: 'Transformamos dados brutos em insights acionáveis. Dashboards interativos e alertas inteligentes.',
    status: 'coming-soon',
    theme: 'red',
    icon: '📊',
    features: [
      'Dashboards personalizados',
      'Machine Learning',
      'Alertas preditivos',
      'Integração com ERPs'
    ],
    cta: 'Em breve',
    link: '#'
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'beta' | 'coming-soon'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.status === filter);

  const getStatusLabel = (status: Product['status']) => {
    const labels = {
      'live': 'Disponível',
      'beta': 'Beta',
      'coming-soon': 'Em breve'
    };
    return labels[status];
  };

  const scrollToContact = () => {
    setSelectedProduct(null);
    setTimeout(() => {
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-bg">
          <div className="products-hero-gradient" />
          <div className="products-hero-grid" />
        </div>
        
        <div className="container">
          <div className="products-hero-content">
            <span className="products-label">— ECOSSISTEMA REVELA</span>
            <h1 className="products-hero-title">
              Soluções que
              <span className="products-hero-title-gradient"> transformam</span>
              <br />
              sua empresa
            </h1>
            <p className="products-hero-subtitle">
              Do diagnóstico à execução. Cada produto é uma experiência única,
              desenhada para resolver problemas reais com tecnologia de ponta.
            </p>

            {/* Filters */}
            <div className="products-filters">
              <button 
                className={`products-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`products-filter-btn ${filter === 'live' ? 'active' : ''}`}
                onClick={() => setFilter('live')}
              >
                Disponíveis
              </button>
              <button 
                className={`products-filter-btn ${filter === 'beta' ? 'active' : ''}`}
                onClick={() => setFilter('beta')}
              >
                Beta
              </button>
              <button 
                className={`products-filter-btn ${filter === 'coming-soon' ? 'active' : ''}`}
                onClick={() => setFilter('coming-soon')}
              >
                Em breve
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className={`product-card product-card-${product.theme}`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-card-header">
                  <span className="product-card-icon">{product.icon}</span>
                  <span className={`product-card-status product-card-status-${product.status}`}>
                    {getStatusLabel(product.status)}
                  </span>
                </div>
                
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-tagline">{product.tagline}</p>
                <p className="product-card-description">{product.description}</p>

                <div className="product-card-features">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="product-card-feature">
                      ✓ {feature}
                    </span>
                  ))}
                </div>

                <button className="product-card-cta">
                  {product.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de detalhes */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className={`product-modal product-modal-${selectedProduct.theme}`} onClick={(e) => e.stopPropagation()}>
            <button className="product-modal-close" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>

            <div className="product-modal-content">
              <div className="product-modal-header">
                <span className="product-modal-icon">{selectedProduct.icon}</span>
                <div>
                  <h2 className="product-modal-name">{selectedProduct.name}</h2>
                  <p className="product-modal-tagline">{selectedProduct.tagline}</p>
                </div>
                <span className={`product-modal-status product-modal-status-${selectedProduct.status}`}>
                  {getStatusLabel(selectedProduct.status)}
                </span>
              </div>

              {selectedProduct.image && (
                <div className="product-modal-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
              )}

              <div className="product-modal-body">
                <p className="product-modal-description">{selectedProduct.description}</p>

                <h3 className="product-modal-features-title">Funcionalidades</h3>
                <ul className="product-modal-features">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="product-modal-feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-modal-footer">
                {selectedProduct.status === 'live' && (
                  <>
                    {selectedProduct.link.startsWith('#') ? (
                      <button 
                        className="product-modal-btn product-modal-btn-primary"
                        onClick={scrollToContact}
                      >
                        {selectedProduct.cta}
                      </button>
                    ) : (
                      <Link href={selectedProduct.link}>
                        <button className="product-modal-btn product-modal-btn-primary">
                          {selectedProduct.cta}
                        </button>
                      </Link>
                    )}
                  </>
                )}
                {selectedProduct.status === 'beta' && (
                  <button 
                    className="product-modal-btn product-modal-btn-secondary"
                    onClick={scrollToContact}
                  >
                    Solicitar acesso beta
                  </button>
                )}
                {selectedProduct.status === 'coming-soon' && (
                  <button 
                    className="product-modal-btn product-modal-btn-disabled"
                    disabled
                  >
                    Em desenvolvimento
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <section id="contato" className="products-cta-section">
        <div className="container">
          <div className="products-cta-content">
            <h2 className="products-cta-title">
              Pronto para transformar
              <span className="text-gradient"> seu negócio?</span>
            </h2>
            <p className="products-cta-subtitle">
              Fale com nossos especialistas e descubra qual solução é ideal para você.
            </p>
            <div className="products-cta-buttons">
              <a 
                href="https://wa.me/5531993044867?text=Olá! Vi os produtos da Revela e gostaria de saber mais."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Falar com especialista
              </a>
              <Link href="/">
                <button className="btn btn-secondary btn-lg">
                  Voltar ao início
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
