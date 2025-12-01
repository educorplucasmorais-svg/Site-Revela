import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { RevelaHero } from '../components/RevelaHero';
import { ServiceCard } from '../components/ServiceCard';
import { PainPoints } from '../components/PainPoints';
import { ToolsGrid } from '../components/ToolsGrid';
import { Methodology } from '../components/Methodology';
import '../styles/landing-page.css';

const services = [
    {
        icon: '🎓',
        title: 'Capacitação em IA Aplicada',
        description: 'Seu time dominando IA em 30 dias. Workshops práticos que transformam colaboradores em operadores de automação.',
        benefits: ['Resultados em 4 semanas', 'Certificação inclusa', 'Suporte pós-treinamento']
    },
    {
        icon: '🚀',
        title: 'Aceleração de Crescimento',
        description: 'De gargalo operacional a escala previsível. Identificamos os 3 processos que mais drenam seu tempo e automatizamos em até 60 dias.',
        benefits: ['Diagnóstico gratuito', 'ROI projetado antes de começar', 'Garantia de resultado']
    },
    {
        icon: '💎',
        title: 'Produtos Digitais Sob Medida',
        description: 'Pare de pagar mensalidade. Seja dono da sua tecnologia. Apps, dashboards e ferramentas que você controla.',
        benefits: ['MVP em 8 semanas', 'Código seu, para sempre', 'Escalável sem custos extras']
    },
    {
        icon: '⚡',
        title: 'Automação que Liberta',
        description: '8 horas de trabalho manual em 8 minutos. Conectamos seus sistemas e fazemos sua operação rodar no piloto automático.',
        benefits: ['+200 integrações prontas', 'Implementação em 2 semanas', 'Suporte 24/7 com IA']
    },
    {
        icon: '📱',
        title: 'Do Zero ao App em 60 Dias',
        description: 'Ideia hoje. App funcionando amanhã. MVPs, ferramentas internas e apps completos com velocidade de startup.',
        benefits: ['Prototipação em 7 dias', 'Testes com usuários reais', 'Deploy incluso']
    }
];

function Home() {
    useEffect(() => {
        const header = document.getElementById('header');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = () => {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* SEÇÃO 1: HERO */}
            <RevelaHero onContactClick={scrollToContact} />

            {/* SEÇÃO 2: PROBLEMA/DOR */}
            <section id="dores" className="section-dark landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— O PROBLEMA</span>
                        <h2 className="section-title">Você reconhece esses sintomas?</h2>
                        <p className="section-subtitle">
                            Se sua empresa sofre com algum desses gargalos, você está perdendo tempo e dinheiro todos os dias.
                        </p>
                    </div>
                    <PainPoints />
                </div>
            </section>

            {/* SEÇÃO 3: SOLUÇÃO - HUB REVELA */}
            <section id="solucao" className="section-pattern landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— A SOLUÇÃO</span>
                        <h2 className="section-title">
                            A Revela transforma operações travadas
                            <span className="text-gradient"> em máquinas de crescimento</span>
                        </h2>
                        <p className="section-subtitle">
                            Hub de Inovação com IA que entrega em semanas, não meses.
                            Somos sua "Nave Mãe" estratégica para escalar com tecnologia de ponta.
                        </p>
                    </div>
                    <div className="solution-pillars">
                        <div className="pillar">
                            <span className="pillar-icon">🎓</span>
                            <h4>Educação Tech</h4>
                            <p>Capacitação em IA para times</p>
                        </div>
                        <div className="pillar">
                            <span className="pillar-icon">🔍</span>
                            <h4>Soluções Empresariais</h4>
                            <p>Consultoria 360º e diagnóstico</p>
                        </div>
                        <div className="pillar">
                            <span className="pillar-icon">💎</span>
                            <h4>Produtos Digitais</h4>
                            <p>Apps, SaaS e ativos proprietários</p>
                        </div>
                        <div className="pillar">
                            <span className="pillar-icon">⚡</span>
                            <h4>Automatizações</h4>
                            <p>Fluxos inteligentes e integrações</p>
                        </div>
                        <div className="pillar">
                            <span className="pillar-icon">🛠️</span>
                            <h4>Desenvolvimento</h4>
                            <p>MVPs e ferramentas sob medida</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 4: PILARES/SERVIÇOS */}
            <section id="servicos" className="section-dark landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— NOSSOS SERVIÇOS</span>
                        <h2 className="section-title">Soluções para escalar seu negócio</h2>
                        <p className="section-subtitle">
                            Escolha o serviço que faz mais sentido para o momento da sua empresa.
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                                benefits={service.benefits}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SEÇÃO 5: METODOLOGIA/ESTEIRA */}
            <section id="metodologia" className="section-pattern landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— METODOLOGIA</span>
                        <h2 className="section-title">Metodologia Ágil com IA de Ponta</h2>
                        <p className="section-subtitle">
                            Do briefing ao deploy em sprints de alta velocidade
                        </p>
                    </div>
                    <Methodology />
                </div>
            </section>

            {/* SEÇÃO 6: FERRAMENTAS/STACK */}
            <section id="ferramentas" className="section-dark landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— TECNOLOGIA</span>
                        <h2 className="section-title">Tecnologia de Ponta ao Seu Alcance</h2>
                        <p className="section-subtitle">
                            Usamos as mesmas ferramentas das big techs para acelerar seus resultados
                        </p>
                    </div>
                    <ToolsGrid />
                </div>
            </section>

            {/* SEÇÃO 7: PROVA SOCIAL */}
            <section id="resultados" className="section-pattern landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— RESULTADOS</span>
                        <h2 className="section-title">Empresas que já transformaram suas operações</h2>
                    </div>
                    <div className="social-proof-metrics">
                        <div className="metric-card">
                            <span className="metric-value">+50</span>
                            <span className="metric-label">empresas atendidas</span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-value">+200</span>
                            <span className="metric-label">automações implementadas</span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-value">8h → 8min</span>
                            <span className="metric-label">de trabalho</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 8: CTA FINAL */}
            <section id="contato" className="section-dark landing-section cta-section">
                <div className="container">
                    <div className="cta-content">
                        <div className="section-header">
                            <span className="section-label">— VAMOS CONVERSAR</span>
                            <h2 className="section-title">Diagnóstico Gratuito de Automação</h2>
                            <p className="section-subtitle">
                                Descubra em 30 minutos os 3 processos que mais drenam tempo na sua empresa.
                                <br />
                                <strong>Sem compromisso. 100% gratuito.</strong>
                            </p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
