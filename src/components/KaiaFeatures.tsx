

const features = [
  { title: 'Atendimento 24/7', desc: 'Bots inteligentes que respondem rápido e com contexto.' },
  { title: 'Geração de Leads', desc: 'Qualifique e capture contatos automaticamente.' },
  { title: 'Personalização', desc: 'Ofertas e recomendações sob medida para cada cliente.' },
  { title: 'Integração Simples', desc: 'Conecte com seu site, CRM e WhatsApp.' }
];

export function KaiaFeatures() {
  return (
    <section style={{padding: '40px 0'}}>
      <h2 style={{textAlign: 'center', marginBottom: 24}}>Recursos da Kaia</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16
      }}>
        {features.map((f) => (
          <div key={f.title} style={{
            border: '1px solid #333',
            borderRadius: 10,
            padding: 16
          }}>
            <h3 style={{marginBottom: 8}}>{f.title}</h3>
            <p style={{opacity: 0.85}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
