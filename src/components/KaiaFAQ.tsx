import React, { useState } from 'react';

const faqs = [
  {
    question: "A Kaia é segura para dados sensíveis?",
    answer: "Sim, absolutamente. Utilizamos criptografia de ponta a ponta (TLS 1.3 e AES-256) e seguimos rigorosamente a LGPD. Seus dados são armazenados em servidores certificados ISO 27001 e nunca são compartilhados com terceiros sem sua autorização explícita."
  },
  {
    question: "Como funciona a integração com o WhatsApp?",
    answer: "A integração é feita através da API oficial do WhatsApp Business (Meta). Você conecta seu número em poucos cliques e a Kaia passa a gerenciar as conversas conforme as regras que você definir, podendo transbordar para um humano a qualquer momento."
  },
  {
    question: "Preciso saber programar para usar?",
    answer: "Não! A Kaia foi desenhada para ser No-Code. Você configura fluxos, respostas e automações através de uma interface visual intuitiva. Nossa IA também ajuda a criar configurações apenas conversando com ela."
  },
  {
    question: "Posso testar antes de contratar?",
    answer: "Sim, oferecemos um período de demonstração gratuito de 7 dias no plano Starter. Você pode testar todas as funcionalidades básicas e ver o impacto no seu atendimento antes de assumir qualquer compromisso financeiro."
  },
  {
    question: "E se eu precisar de ajuda na configuração?",
    answer: "Todos os planos incluem acesso à nossa base de conhecimento e suporte por email. Os planos Professional e Enterprise contam com suporte prioritário via chat e reuniões de onboarding para garantir seu sucesso."
  }
];

export function KaiaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="kaia-faq" style={{ padding: '100px 20px', background: 'var(--kaia-bg)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="kaia-section-header" style={{ marginBottom: '60px' }}>
          <span className="kaia-section-label">Dúvidas Comuns</span>
          <h2 className="kaia-section-title">Perguntas Frequentes</h2>
          <p className="kaia-section-desc">
            Tudo o que você precisa saber sobre como a Kaia pode transformar seu negócio.
          </p>
        </div>

        <div className="kaia-faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`kaia-faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
              style={{
                background: 'var(--kaia-bg-card)',
                border: `1px solid ${openIndex === index ? 'var(--kaia-primary)' : 'var(--kaia-border)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="kaia-faq-question"
                style={{
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  color: 'white'
                }}
              >
                {faq.question}
                <span style={{ 
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: 'var(--kaia-accent)',
                  fontSize: '1.5rem'
                }}>
                  ⌄
                </span>
              </div>
              
              <div 
                className="kaia-faq-answer"
                style={{
                  padding: '0 24px',
                  height: openIndex === index ? 'auto' : '0',
                  opacity: openIndex === index ? 1 : 0,
                  paddingBottom: openIndex === index ? '24px' : '0',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
