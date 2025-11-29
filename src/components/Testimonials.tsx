import { useState, useEffect } from 'react';
import { testimonials, testimonialsConfig, type Testimonial } from '../data/testimonials';

// Componente de estrelas
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? '#FFB800' : 'rgba(255, 255, 255, 0.2)',
            fontSize: '1.1rem',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Componente de avatar com iniciais
function Avatar({ name, image }: { name: string; image: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid var(--color-primary)',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'white',
        border: '3px solid rgba(255, 107, 53, 0.3)',
      }}
    >
      {initials}
    </div>
  );
}

// Card de depoimento
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-xl)',
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.4s ease',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(20, 20, 20, 0.8))' 
          : 'var(--color-bg-card)',
        borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
      }}
    >
      {testimonialsConfig.showRating && <StarRating rating={testimonial.rating} />}
      
      <p
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-lg)',
          fontStyle: 'italic',
          position: 'relative',
        }}
      >
        <span style={{ 
          fontSize: '3rem', 
          color: 'var(--color-primary)', 
          opacity: 0.3,
          position: 'absolute',
          top: '-20px',
          left: '-10px',
          fontFamily: 'serif',
        }}>
          "
        </span>
        {testimonial.text}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <Avatar name={testimonial.name} image={testimonial.image} />
        <div>
          <h4 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '700', 
            marginBottom: '4px',
            color: 'var(--color-text)',
          }}>
            {testimonial.name}
          </h4>
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--color-text-muted)', 
            margin: 0,
          }}>
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente principal
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonialsConfig.autoRotate) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, testimonialsConfig.rotateInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-pattern" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
          <span className="hero-label">{testimonialsConfig.sectionLabel}</span>
          <h2>{testimonialsConfig.sectionTitle}</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            maxWidth: '700px', 
            margin: '0 auto', 
            marginTop: 'var(--space-md)' 
          }}>
            {testimonialsConfig.sectionSubtitle}
          </p>
        </div>

        {/* Grid de depoimentos */}
        <div className="grid grid-3" style={{ gap: 'var(--space-lg)' }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        {/* Indicadores */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: 'var(--space-xl)',
          }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: index === activeIndex ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                background: index === activeIndex 
                  ? 'var(--color-primary)' 
                  : 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-xl)',
            marginTop: 'var(--space-2xl)',
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid var(--color-border)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>
              50+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Empresas Atendidas
            </div>
          </div>
          <div style={{ 
            width: '1px', 
            height: '40px', 
            background: 'var(--color-border)',
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>
              95%
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Taxa de Satisfação
            </div>
          </div>
          <div style={{ 
            width: '1px', 
            height: '40px', 
            background: 'var(--color-border)',
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>
              3x
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Crescimento Médio
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
