import { useState } from 'react';

const faqs = [
  {
    question: "A Kaia e segura para dados sensiveis?",
    answer: "Sim, absolutamente. Utilizamos criptografia de ponta a ponta (TLS 1.3 e AES-256) e seguimos rigorosamente a LGPD. Seus dados sao armazenados em servidores certificados ISO 27001."
  },
  {
    question: "Como funciona a integracao com o WhatsApp?",
    answer: "A integracao e feita atraves da API oficial do WhatsApp Business (Meta). Voce conecta seu numero em poucos cliques e a Kaia passa a gerenciar as conversas conforme as regras que voce definir."
  },
  {
    question: "Preciso saber programar para usar?",
    answer: "Nao! A Kaia foi desenhada para ser No-Code. Voce configura fluxos, respostas e automacoes atraves de uma interface visual intuitiva."
  },
  {
    question: "Posso testar antes de contratar?",
    answer: "Sim, oferecemos um periodo de demonstracao gratuito de 7 dias no plano Starter. Voce pode testar todas as funcionalidades basicas."
  },
  {
    question: "E se eu precisar de ajuda na configuracao?",
    answer: "Todos os planos incluem acesso a nossa base de conhecimento e suporte por email. Os planos Pro e Enterprise contam com suporte prioritario."
  }
];

export function KaiaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="kaia-faq-ocean">
      <div className="faq-container">
        <div className="faq-header">
          <span className="section-tag">Duvidas Comuns</span>
          <h2 className="section-title-big">Perguntas Frequentes</h2>
          <p className="faq-subtitle">
            Tudo o que voce precisa saber sobre como a Kaia pode transformar seu negocio.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>

              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
