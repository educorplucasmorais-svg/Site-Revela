export const KaiaSecurity = () => {
  return (
    <section className="kaia-security" style={{ padding: '80px 20px', background: 'var(--kaia-bg)', position: 'relative', borderTop: '1px solid var(--kaia-border)' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span className="kaia-section-label" style={{ color: 'var(--kaia-accent)', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Segurança e Privacidade
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginTop: '16px', marginBottom: '16px' }}>
            Seus dados protegidos com nível bancário
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            A Kaia foi construída seguindo as mais rigorosas normas de segurança e privacidade de dados.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          
          {/* LGPD */}
          <div className="kaia-security-card" style={{ background: 'var(--kaia-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--kaia-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚖️</div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>LGPD Compliance</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Totalmente aderente à Lei Geral de Proteção de Dados. Seus dados são seus e você tem total controle sobre eles.
            </p>
          </div>

          {/* Encryption */}
          <div className="kaia-security-card" style={{ background: 'var(--kaia-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--kaia-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>Criptografia Ponta a Ponta</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Todos os dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256), garantindo confidencialidade total.
            </p>
          </div>

          {/* Security Seal */}
          <div className="kaia-security-card" style={{ background: 'var(--kaia-bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--kaia-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛡️</div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>Garantia de Segurança</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Infraestrutura monitorada 24/7 com proteção contra ataques DDoS e backups automáticos diários.
            </p>
          </div>

        </div>

        <div style={{ marginTop: '60px', padding: '24px', background: 'rgba(34, 211, 238, 0.05)', borderRadius: '12px', border: '1px solid rgba(34, 211, 238, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--kaia-accent)', fontWeight: 'bold' }}>Certificações e Tecnologias:</span>
            <div style={{ display: 'flex', gap: '24px', opacity: 0.7 }}>
                <span style={{ color: 'white', fontWeight: '600' }}>SSL Seguro</span>
                <span style={{ color: 'white', fontWeight: '600' }}>ISO 27001 (Infra)</span>
                <span style={{ color: 'white', fontWeight: '600' }}>SOC 2 Type II (Infra)</span>
            </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          🔒 Proteção contra cópia e reprodução não autorizada ativa em todo o site e documentos.
        </div>
      </div>
    </section>
  );
};
