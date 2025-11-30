export function KaiaCTA() {
  return (
    <section id="cta" className="kaia-cta">
      <div className="kaia-cta-content">
        <span className="kaia-section-label">Comece Agora</span>
        <h2>Pronto para revolucionar seu atendimento?</h2>
        <p>
          Junte-se a centenas de empresas que já usam a Kaia para 
          automatizar conversas e multiplicar resultados.
        </p>
        
        <div className="kaia-cta-group">
          <a 
            href="https://wa.me/5531993044867?text=Olá! Gostaria de saber mais sobre a Kaia" 
            target="_blank" 
            rel="noreferrer"
            className="kaia-btn kaia-btn-primary"
          >
            💬 Falar no WhatsApp
          </a>
          <a 
            href="mailto:contato@revela.com.br?subject=Interesse na Kaia" 
            className="kaia-btn kaia-btn-secondary"
          >
            ✉️ Enviar Email
          </a>
        </div>

        <p style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.5 }}>
          Teste grátis por 7 dias • Sem cartão de crédito • Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
