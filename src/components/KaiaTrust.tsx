export function KaiaTrust() {
  return (
    <section className="kaia-trust" aria-label="Selo de confiança e segurança">
      <div className="kaia-trust-inner">
        <div className="kaia-trust-item">
          <div className="kaia-trust-icon">🔒</div>
          <div>
            <div style={{ fontSize: '.8rem', opacity: .8 }}>Criptografia</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700 }}>TLS 1.3 / AES‑256</div>
          </div>
        </div>
        <div className="kaia-trust-item">
          <div className="kaia-trust-icon">🛡️</div>
          <div>
            <div style={{ fontSize: '.8rem', opacity: .8 }}>Conformidade</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700 }}>LGPD</div>
          </div>
        </div>
        <div className="kaia-trust-item">
          <div className="kaia-trust-icon">📈</div>
          <div>
            <div style={{ fontSize: '.8rem', opacity: .8 }}>Disponibilidade</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700 }}>SLA 99,9%</div>
          </div>
        </div>
        <div className="kaia-trust-item">
          <div className="kaia-trust-icon">🤝</div>
          <div>
            <div style={{ fontSize: '.8rem', opacity: .8 }}>Satisfação</div>
            <div style={{ fontSize: '.95rem', fontWeight: 700 }}>NPS Alto</div>
          </div>
        </div>
      </div>
    </section>
  );
}
