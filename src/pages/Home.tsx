import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { RevelaHero } from '../components/RevelaHero';
import '../styles/landing-page.css';

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

            {/* SEÇÃO 2: FLUXO DE SERVIÇOS (Mind Map Style) */}
            <section id="servicos" className="section-lighter landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— O que fazemos</span>
                        <h2 className="section-title">
                            Do problema à solução
                            <span className="text-gradient"> em 4 passos</span>
                        </h2>
                    </div>
                    
                    {/* Flow Chart Style */}
                    <div className="flow-chart">
                        <div className="flow-node flow-node-problem">
                            <div className="flow-node-icon">😰</div>
                            <h3>Processos Manuais</h3>
                            <p>Tarefas repetitivas, planilhas, retrabalho</p>
                        </div>
                        
                        <div className="flow-arrow">→</div>
                        
                        <div className="flow-node flow-node-step">
                            <div className="flow-node-icon">🔍</div>
                            <h3>Diagnóstico</h3>
                            <p>Mapeamos gargalos em 30min</p>
                            <span className="flow-badge">Gratuito</span>
                        </div>
                        
                        <div className="flow-arrow">→</div>
                        
                        <div className="flow-node flow-node-step">
                            <div className="flow-node-icon">⚡</div>
                            <h3>Automação</h3>
                            <p>IA + Apps em semanas</p>
                            <span className="flow-badge">2-8 sem</span>
                        </div>
                        
                        <div className="flow-arrow">→</div>
                        
                        <div className="flow-node flow-node-result">
                            <div className="flow-node-icon">🚀</div>
                            <h3>Escala</h3>
                            <p>8h → 8min de trabalho</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 3: SOLUÇÕES (Visual Cards - 3 principais) */}
            <section id="solucoes" className="section-dark landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— Soluções</span>
                        <h2 className="section-title">Como podemos ajudar</h2>
                    </div>
                    
                    <div className="solution-cards">
                        <div className="solution-card solution-card-featured">
                            <div className="solution-icon">🤖</div>
                            <h3>Automação com IA</h3>
                            <p>Conectamos seus sistemas e eliminamos tarefas repetitivas. +200 integrações prontas.</p>
                            <ul className="solution-benefits">
                                <li>✓ Implementação em 2 semanas</li>
                                <li>✓ Suporte 24/7 com IA</li>
                            </ul>
                        </div>
                        
                        <div className="solution-card">
                            <div className="solution-icon">📱</div>
                            <h3>Apps Sob Medida</h3>
                            <p>Do zero ao app em 60 dias. Você é dono do código.</p>
                            <ul className="solution-benefits">
                                <li>✓ MVP em 8 semanas</li>
                                <li>✓ Deploy incluso</li>
                            </ul>
                        </div>
                        
                        <div className="solution-card">
                            <div className="solution-icon">🎓</div>
                            <h3>Capacitação IA</h3>
                            <p>Seu time dominando IA em 30 dias com workshops práticos.</p>
                            <ul className="solution-benefits">
                                <li>✓ Certificação inclusa</li>
                                <li>✓ Suporte pós-treinamento</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 4: METODOLOGIA (Timeline Visual) */}
            <section id="metodologia" className="section-lighter landing-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">— Metodologia</span>
                        <h2 className="section-title">Como entregamos</h2>
                    </div>
                    
                    <div className="timeline-flow">
                        <div className="timeline-step">
                            <div className="timeline-number">01</div>
                            <div className="timeline-content">
                                <h4>Descoberta</h4>
                                <span className="timeline-duration">1-2 sem</span>
                            </div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-step">
                            <div className="timeline-number">02</div>
                            <div className="timeline-content">
                                <h4>MVP</h4>
                                <span className="timeline-duration">2-4 sem</span>
                            </div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-step">
                            <div className="timeline-number">03</div>
                            <div className="timeline-content">
                                <h4>IA</h4>
                                <span className="timeline-duration">2-3 sem</span>
                            </div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div className="timeline-step">
                            <div className="timeline-number">04</div>
                            <div className="timeline-content">
                                <h4>Go-live</h4>
                                <span className="timeline-duration">1-2 sem</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tech Stack as icons */}
                    <div className="tech-stack-bar">
                        <span className="tech-label">Stack:</span>
                        <div className="tech-icons">
                            <span title="Google AI Studio">🤖</span>
                            <span title="GPT-4 / Claude">🧠</span>
                            <span title="GitHub">💻</span>
                            <span title="Vercel">▲</span>
                            <span title="Railway">🚂</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 5: CTA FINAL */}
            <section id="contato" className="section-dark landing-section cta-section">
                <div className="container">
                    <div className="cta-content">
                        <div className="section-header">
                            <span className="section-label">— Vamos conversar</span>
                            <h2 className="section-title">Diagnóstico Gratuito</h2>
                            <p className="section-subtitle">
                                Descubra os 3 processos que mais drenam tempo na sua empresa.
                                <br />
                                <strong>30 minutos. 100% gratuito.</strong>
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
