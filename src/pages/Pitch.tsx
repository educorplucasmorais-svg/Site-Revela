import React from 'react';

const sections = [
  {
    id: 'ato1',
    title: 'ATO 1: Identidade e Proposta de Valor',
    content: (
      <div className="pitch-block">
        <h3>O Que Somos</h3>
        <p><strong>Revela 2.0</strong>: Hub de Inovação e Aceleração de Potencial Humano com IA. Evoluímos de uma consultoria para um <strong>Hub</strong> estratégico que produz soluções empresariais, automações e produtos nativos em Inteligência Artificial.</p>
        <p><strong>Conceito de Hub</strong>: A Revela possui diversos produtos e projetos, mas é a cultura, os valores e a inteligência coletiva que nutrem e definem cada iniciativa incubada.</p>
        <p><strong>Missão Atualizada</strong>: Democratizar tecnologia de ponta e estratégia high-level, desenvolvendo soluções que unem automação inteligente e essência humana.</p>
        <h4>Estrutura de Valor</h4>
        <p>Abordagem transversal: atendemos a empresa como organismo completo e também o indivíduo.</p>
        <div className="grid-vertical" style={{display: 'grid', gap: 'var(--space-lg)'}}>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Empresas (CNPJ)</h5>
            <p><strong>Foco:</strong> Inovação e Eficiência</p>
            <p><strong>Entrega:</strong> Consultoria 360º (Estratégico, Tático, Operacional) + Ferramentas Proprietárias de IA.</p>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Pessoas (CPF)</h5>
            <p><strong>Foco:</strong> Carreira e Vida</p>
            <p><strong>Entrega:</strong> Mentoria, Desenvolvimento de Carreira e Produtos de Impacto Social (Tech for Good).</p>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Projetos (Incubadora)</h5>
            <p><strong>Foco:</strong> Aceleração</p>
            <p><strong>Entrega:</strong> Know-how, Tecnologia, Capital Intelectual e Estrutura para MVPs.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ato2',
    title: 'ATO 2: Pilares Revela 2.0',
    content: (
      <div className="pitch-block">
        <p>A sustentação do Hub vem de três grandes pilares que alimentam clientes e projetos incubados.</p>
        <div className="grid" style={{display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))'}}>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>1. Educação Tech</h5>
            <p><strong>Foco:</strong> Desenvolvimento de competências digitais e comportamentais.</p>
            <p><strong>Formatos:</strong> Coaching, Mentoria, Palestras e Treinamentos.</p>
            <p><strong>Objetivo:</strong> Preparar talentos para alta performance em ambientes tecnológicos.</p>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>2. Desenvolvimento de Produto & TI</h5>
            <p><strong>Escopo:</strong> Automação, criação de código, implantação, manutenção de apps e integração.</p>
            <p><strong>Diferencial:</strong> Produção de soluções empresariais com automações e produtos nativos em IA.</p>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>3. Capital Humano by IA</h5>
            <p><strong>Integração:</strong> Inteligência aplicada à jornada de pessoas + dados organizacionais.</p>
            <p><strong>Resultado:</strong> Amplificação do desempenho e redução de desperdício operacional.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ato3',
    title: 'ATO 3: Ecossistema de Produtos e Incubadora',
    content: (
      <div className="pitch-block">
        <p>Foco estratégico 2026: lançamento de MVPs e consolidação da Incubadora.</p>
        <h4>1. Produtos Autorais (Carro-Chefe)</h4>
        <div className="card" style={{padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)'}}>
          <h5>KAIA (People Analytics & Gestão)</h5>
          <p>Plataforma proprietária de IA: um copiloto de RH e Liderança (diagnóstico à prescrição).</p>
          <ul style={{margin: 0, paddingLeft: 'var(--space-lg)'}}>
            <li><strong>MVP 2 (Créditos):</strong> 01/01/2026 – Mapeamento avulso.</li>
            <li><strong>MVP 1 (SaaS Completo):</strong> 15/01/2026 – Mapeamento, PDI e META.</li>
            <li><strong>App Mobile:</strong> Previsão Q3 2026.</li>
            <li><strong>Estratégia Comercial:</strong> Varejo (B2C / PMEs) e Atacado (B2B / Corporativo).</li>
          </ul>
        </div>
        <h4>2. Incubadora de Projetos Revela</h4>
        <p>Investidora e aceleradora: fornece Insumos (Marca, Tecnologia, Jurídico) para projetos de alto potencial.</p>
        <div className="grid-vertical" style={{display: 'grid', gap: 'var(--space-lg)'}}>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Modelo de Negócio</h5>
            <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
              <li>Faturamento por Projeto (não mensal).</li>
              <li>Incubação: 12 meses.</li>
              <li>Participação Ex.: 50% Revela / 50% Equipe.</li>
            </ul>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Estrutura de Capital</h5>
            <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
              <li>Fundo de Caixa & Reserva.</li>
              <li>Capital de Giro (Reinvestimento).</li>
              <li>Capital Incubadora (Multiplicador de retorno).</li>
            </ul>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Pipeline / Exemplos</h5>
            <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
              <li><strong>Caramelo:</strong> Em análise e PoC. Próximo: Pitch de Negócio.</li>
              <li><strong>Telário:</strong> Em desenvolvimento.</li>
              <li><strong>Projeto Angústia (Ed-Tech):</strong> Impacto social – apoio à cessação de pornografia.</li>
            </ul>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Equipe & Métricas</h5>
            <p><strong>Equipe:</strong> Sami, Rose, Lucas.</p>
            <p><strong>Métricas:</strong> Esforço, Conhecimento, Tempo, Interesse.</p>
          </div>
          <div className="card" style={{padding: 'var(--space-lg)'}}>
            <h5>Consultorias Ativas</h5>
            <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
              <li>Brigada Camarão: App (Produto + Consultoria).</li>
              <li>Marmitaria: Consultoria Vigilância Sanitária (VISA).</li>
              <li>Fábrica de Vela: Estruturação.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ato4',
    title: 'ATO 4: Planejamento Financeiro e Roadmap',
    content: (
      <div className="pitch-block">
        <h4>Exemplo de Estrutura de Capital (Projeto Base R$10.000)</h4>
        <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
          <li>Divisão: R$ 5.000 Revela / R$ 5.000 Parceiros.</li>
        </ul>
        <h5 style={{marginTop: 'var(--space-lg)'}}>Cenário de Alavancagem (Alto Risco)</h5>
        <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
          <li>Capital Aportado: R$ 20.000</li>
          <li>Capital Devedor: R$ 60.000 (36 meses)</li>
          <li>Parcela: R$ 1.666,66</li>
        </ul>
        <h5 style={{marginTop: 'var(--space-lg)'}}>Prioridades</h5>
        <ul style={{margin:0, paddingLeft:'var(--space-lg)'}}>
          <li><strong>Crítico:</strong> Finalizar Business Plan interno.</li>
          <li><strong>Alta Prioridade:</strong> Cartilha / PDF de Venda para investidores e clientes.</li>
          <li><strong>Ação Comercial:</strong> Upsell de IA na base atual.</li>
          <li><strong>Pesquisa:</strong> Modelos de corporativismos sociais.</li>
          <li><strong>Baixa (Agora):</strong> Site Institucional completo e App (foco em MVPs).</li>
        </ul>
      </div>
    )
  },
  {
    id: 'conclusao',
    title: 'Conclusão para Investidores',
    content: (
      <div className="pitch-block">
        <p>A Revela 2.0 é um <strong>Ecossistema de Inovação</strong> que mitiga riscos via diversificação (Consultoria + SaaS + Incubadora). Investir na Revela é apostar em uma fábrica de negócios guiada por dados e valores humanos inegociáveis.</p>
        <p><strong>Chamada à Ação:</strong> Entre em contato para receber o PDF detalhado e agenda de reuniões.</p>
      </div>
    )
  }
];

export const Pitch: React.FC = () => {
  return (
    <div className="container" style={{paddingTop: '140px', paddingBottom: 'var(--space-3xl)'}}>
      <header style={{marginBottom: 'var(--space-2xl)'}}>
        <h1 style={{fontSize: '2.5rem', lineHeight: 1.1}}>Pitch de Investimento: Revela 2.0</h1>
        <p style={{fontSize: '1.05rem', maxWidth: '840px'}}>Hub de Inovação e Aceleração de Potencial Humano com IA. Estrutura integrada de consultoria, tecnologia e incubação para criar e escalar produtos de alto impacto.</p>
      </header>
      <nav style={{marginBottom: 'var(--space-xl)'}}>
        <ul style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', listStyle: 'none', padding: 0}}>
          {sections.map(s => (
            <li key={s.id}><a href={'#'+s.id} className="tag" style={{textDecoration: 'none'}}>{s.title.split(':')[0]}</a></li>
          ))}
        </ul>
      </nav>
      <div style={{display: 'grid', gap: 'var(--space-2xl)'}}>
        {sections.map(section => (
          <section key={section.id} id={section.id} style={{scrollMarginTop: '120px'}}>
            <h2 style={{fontSize: '1.75rem', marginBottom: 'var(--space-md)'}}>{section.title}</h2>
            {section.content}
          </section>
        ))}
      </div>
      <div style={{marginTop: 'var(--space-2xl)'}}>
        <a href="#contato" className="btn btn-primary">Solicitar Material Completo</a>
      </div>
    </div>
  );
};

export default Pitch;
