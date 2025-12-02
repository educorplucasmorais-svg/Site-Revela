import '../styles/kaia.css';
import { KaiaHero } from '../components/KaiaHero';
import { KaiaFeatures } from '../components/KaiaFeatures';
import { KaiaTestimonials } from '../components/KaiaTestimonials';
import { KaiaPricing } from '../components/KaiaPricing';
import { KaiaSecurity } from '../components/KaiaSecurity';
import { KaiaFAQ } from '../components/KaiaFAQ';

// Componente CTA reutilizável
const SectionCTA = ({ text = "Ver planos e começar" }: { text?: string }) => (
  <div style={{
    padding: '40px 20px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(26,54,93,0.3) 50%, rgba(10,22,40,0) 100%)'
  }}>
    <a 
      href="#pricing"
      style={{
        display: 'inline-block',
        padding: '16px 40px',
        background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1.1rem',
        boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
    >
      {text}
    </a>
  </div>
);

const KaiaPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 100%)',
      color: 'white'
    }}>
      <KaiaHero />
      
      <KaiaFeatures />
      <SectionCTA text="Ver planos e começar" />
      
      <KaiaTestimonials />
      <SectionCTA text="Comece agora mesmo" />
      
      <KaiaPricing />
      
      <KaiaSecurity />
      <SectionCTA text="Fale com um especialista" />
      
      <KaiaFAQ />

      {/* Seção Sobre o Projeto MVP */}
      <section id="projeto" style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg, rgba(26,54,93,0.2) 0%, rgba(10,22,40,0.4) 100%)'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(34, 211, 238, 0.15)',
              borderRadius: '20px',
              color: '#22D3EE',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              SOBRE O PROJETO
            </span>
            
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>
              O MVP da Plataforma Kaia
            </h2>
            
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1rem', lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>
              O MVP (Produto Mínimo Viável) da plataforma Kaia é o coração do projeto e foca em estabelecer 
              o ciclo fundamental de desenvolvimento de talentos: <strong>Diagnóstico, Planejamento e Execução</strong>.
            </p>
          </div>

          {/* 3 Pilares */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Os 3 Pilares Fundamentais
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '3rem'
          }}>
            <div style={{ padding: '28px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(34,211,238,0.2)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#22D3EE' }}>1. Mapeamento de Perfil</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '1rem' }}>
                Implementação de formulários para mapear perfis comportamentais: DISC, Quociente Positivo (QP), Sabotadores e Maturidade.
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, fontStyle: 'italic' }}>
                A IA cruza dados de múltiplas fontes para gerar um diagnóstico profundo e científico, eliminando o "achismo" da gestão de pessoas.
              </p>
            </div>
            
            <div style={{ padding: '28px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(34,211,238,0.2)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#22D3EE' }}>2. PDI Inteligente</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '1rem' }}>
                Geração automática do Plano de Desenvolvimento Individual (PDI) a partir da análise detalhada do relatório de perfil.
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, fontStyle: 'italic' }}>
                A IA traduz insights complexos em um plano de ação personalizado com frameworks como SWOT e 5W2H.
              </p>
            </div>
            
            <div style={{ padding: '28px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(34,211,238,0.2)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#22D3EE' }}>3. Gestão de Metas</h4>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '1rem' }}>
                Funcionalidade para transformar as diretrizes do PDI em objetivos claros e mensuráveis.
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, fontStyle: 'italic' }}>
                Cria um "contrato" objetivo entre líder e liderado, dividindo 100% das atividades no Quarter.
              </p>
            </div>
          </div>

          {/* Ciclo */}
          <div style={{ 
            textAlign: 'center', 
            padding: '24px', 
            background: 'rgba(34,211,238,0.1)', 
            borderRadius: '12px',
            marginBottom: '3rem'
          }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>
              🔄 Juntos, esses pilares formam um ciclo robusto: <br/>
              <strong style={{ color: '#22D3EE' }}>Diagnosticar com precisão → Planejar com inteligência → Executar com clareza</strong>
            </p>
          </div>

          {/* Metodologia */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Metodologia e Tecnologia
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '3rem'
          }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#22D3EE' }}>⚡ Metodologia Ágil</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Sprints de 2 semanas com squad dedicado e multifuncional</p>
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#22D3EE' }}>🛠️ Stack Moderna</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>React, Next.js, Genkit, Gemini, Google AI Studio, Firebase</p>
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#22D3EE' }}>👥 Visões Distintas</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Interfaces específicas para Líder e Colaborador</p>
            </div>
          </div>

          {/* Importância Estratégica */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Importância Estratégica
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '3rem'
          }}>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🏛️ Governança e Risco</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Sistema de IA auditável e transparente ("Racionalidade KAIA"), essencial para mitigar vieses algorítmicos 
                e garantir conformidade LGPD. Processos auditáveis preparados para IPO.
              </p>
            </div>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚀 Vantagem Competitiva</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Arquitetura proprietária que evita vendor lock-in. Projetada para suportar múltiplas unidades 
                de negócio e expansão global mantendo excelência.
              </p>
            </div>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>📈 People Analytics 2.0</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Migração da análise descritiva para prescritiva. A IA cruza múltiplos vetores (DISC, QP, Metas) 
                para prescrever PDIs hiper-personalizados e prever riscos.
              </p>
            </div>
          </div>

          {/* Impacto */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Impacto e Retorno
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '2rem'
          }}>
            <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.15) 100%)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22D3EE' }}>5x+</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>ROI no primeiro ano</div>
            </div>
            <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.15) 100%)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22D3EE' }}>3-4</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Plataformas consolidadas</div>
            </div>
            <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.15) 100%)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22D3EE' }}>-1%</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Redução de turnover</div>
            </div>
            <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.15) 100%)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22D3EE' }}>9.6k</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Horas de liderança liberadas/ano</div>
            </div>
          </div>

          {/* Próximos Passos */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', marginTop: '3rem' }}>
            Roadmap de Liberação
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #EF4444' }}>
              <span style={{ background: '#EF4444', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>URGENTE</span>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>1. Aprovação e Investimento</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Formalização para squad dedicado e multifuncional</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #EF4444' }}>
              <span style={{ background: '#EF4444', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>URGENTE</span>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>2. Kick-off e Setup (Sprint 0)</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Configuração de infraestrutura Google Cloud/Firebase e licenciamento</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
              <span style={{ background: '#F59E0B', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>IMPORTANTE</span>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>3. Discovery e Definição de Escopo</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>PO e Conversation Designer detalham histórias de usuário (Semanas 1-4)</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
              <span style={{ background: '#F59E0B', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>IMPORTANTE</span>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>4. Desenvolvimento e QA (Sprints 3-6)</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Execução do Roadmap em 6-8 semanas com Sprint Reviews quinzenais</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid #6B7280' }}>
              <span style={{ background: '#6B7280', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>PRÓXIMO</span>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>5. Piloto, Testes A/B e Lançamento</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rollout gradual a partir do 3º/4º mês com Canary Release</p>
              </div>
            </div>
          </div>

          {/* Squad */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', marginTop: '3rem' }}>
            Squad MVP (4 Meses)
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '2rem'
          }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👔</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Product Manager</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤖</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Engenheiro IA/ML</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Engenheiro Backend</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✍️</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>UX Writer</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧪</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Analista QA/Dados</div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer CTA Final */}
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1a365d 0%, #0a1628 100%)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Pronto para transformar sua gestão de pessoas?
        </h2>
        <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
          Comece hoje e veja resultados em até 7 dias
        </p>
        <a 
          href="#pricing"
          style={{
            display: 'inline-block',
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.2rem',
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4)'
          }}
        >
          Ver planos e começar →
        </a>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <a 
          href="#pricing"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)'
          }}
        >
          Começar agora →
        </a>
        <p style={{ opacity: 0.7, marginBottom: '1rem' }}>
          © 2025 Kaia by Revela. Todos os direitos reservados.
        </p>
        <a href="/" style={{ color: '#22D3EE', textDecoration: 'none' }}>
          ← Voltar para Revela
        </a>
      </footer>
    </div>
  );
};

export default KaiaPage;