import React from 'react';

export function KaiaCTA() {
  return (
    <section id="cta" style={{padding: '56px 0', textAlign: 'center'}}>
      <h2 style={{marginBottom: 12}}>Pronto para testar a Kaia?</h2>
      <p style={{maxWidth: 680, margin: '0 auto 20px', opacity: 0.85}}>
        Abra a demo ou fale com nosso time para uma implantação guiada.
      </p>
      <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap'}}>
        <a href="/kaia-site/index.html" target="_blank" rel="noreferrer" style={{
          display: 'inline-block', padding: '12px 18px', borderRadius: 8, background: '#111', color: '#fff', textDecoration: 'none', border: '1px solid #333'
        }}>Abrir demo</a>
        <a href="/contato" style={{
          display: 'inline-block', padding: '12px 18px', borderRadius: 8, background: '#ff6200', color: '#fff', textDecoration: 'none'
        }}>Falar com vendas</a>
      </div>
    </section>
  );
}
