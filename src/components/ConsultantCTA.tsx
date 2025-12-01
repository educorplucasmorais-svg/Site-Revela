import React from 'react';

export function ConsultantCTA() {
  const handleClick = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '90px',
        zIndex: 60,
        background: 'var(--color-primary)',
        color: '#fff',
        border: 'none',
        padding: '14px 18px',
        borderRadius: '10px',
        fontWeight: 600,
        boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
        cursor: 'pointer'
      }}>
      Conversar com um consultor →
    </button>
  );
}
