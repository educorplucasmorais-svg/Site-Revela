import React from 'react';

export function FAQ() {
  const items = [
    { q: 'Preciso saber programar?', a: 'Não. Você aprende NoCode + IA com fluxos práticos e publica seu app sem escrever código tradicional.' },
    { q: 'Serve para iniciantes?', a: 'Sim. Começa com fundamentos e evolui para projetos guiados. Do zero ao MVP publicado.' },
    { q: 'Tenho pouco tempo. Funciona?', a: 'Sim. Trilhas semanais e projetos modulares. Você avança com blocos objetivos.' },
    { q: 'E se eu travar?', a: 'Comunidade 10k+ e suporte nas trilhas. Lives e mentorias ajudam a destravar publicação.' },
    { q: 'Posso usar para freelas?', a: 'Sim. A stack ensina projetos vendáveis (SaaS, automações, apps), com templates e casos reais.' },
  ];

  return (
    <section className="section-dark">
      <div className="container" style={{ maxWidth: 900 }}>
        <h3 className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>Perguntas Frequentes</h3>
        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
          {items.map((it, idx) => (
            <details key={idx} className="faq-item">
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{it.q}</summary>
              <p style={{ marginTop: 'var(--space-sm)' }}>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
