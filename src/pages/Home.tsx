import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ServicesGrid from '../components/ServicesGrid';
import PricingSection from '../components/PricingSection';
import ProductsArea from '../components/ProductsArea';
import { Testimonials } from '../components/Testimonials';
import { RevelaHero } from '../components/RevelaHero';

function Home() {

    useEffect(() => {
        // Header scroll effect
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
            {/* Hero Section - Novo Design Tech com Árvore */}
            <RevelaHero onContactClick={scrollToContact} />

            {/* Services Section */}
            <section id="servicos" className="section-dark">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span className="hero-label">— NOSSOS SERVIÇOS</span>
                        <h2>Como transformamos seu negócio</h2>
                        <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
                            Metodologias comprovadas que já ajudaram dezenas de empresas a crescerem de forma sustentável
                        </p>
                    </div>
                    <ServicesGrid />
                </div>
            </section>

            {/* Methodology Section */}
            <section className="section-pattern">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span className="hero-label">— NOSSA METODOLOGIA</span>
                        <h2>Transformando estratégia em resultados</h2>
                    </div>

                    <div className="grid grid-3">
                        <div className="card">
                            <div className="icon">📊</div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Diagnóstico</h3>
                            <p style={{ marginBottom: '0' }}>
                                Analisamos profundamente seu negócio, identificando oportunidades e gargalos
                                que impedem o crescimento acelerado.
                            </p>
                        </div>

                        <div className="card">
                            <div className="icon">⚡</div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Execução</h3>
                            <p style={{ marginBottom: '0' }}>
                                Implementamos as estratégias de forma hands-on, trabalhando lado a lado
                                com seu time para garantir resultados.
                            </p>
                        </div>

                        <div className="card">
                            <div className="icon">📈</div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Crescimento</h3>
                            <p style={{ marginBottom: '0' }}>
                                Acompanhamos métricas em tempo real e ajustamos a rota para maximizar
                                o retorno sobre investimento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="section-dark">
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--space-3xl)' }}>
                        <div>
                            <span className="hero-label">— RESULTADOS COMPROVADOS</span>
                            <h2>Já ajudamos empresas a duplicarem e até triplicarem suas vendas</h2>
                            <p>
                                A Revela nasceu da experiência de profissionais que integraram o time pioneiro
                                de grandes startups e depois lideraram operações em diferentes setores.
                            </p>
                            <p>
                                Trazemos esse know-how para apoiar pequenas e médias empresas que enfrentam os
                                mesmos desafios de escala, mas sem acesso às ferramentas certas.
                            </p>

                            <div style={{ marginTop: 'var(--space-xl)' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)', color: 'var(--color-primary)' }}>
                                    Nossos valores:
                                </h3>
                                <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
                                    {[
                                        'Ética e transparência',
                                        'Execução prática',
                                        'Inovação constante',
                                        'Foco em resultados',
                                        'Mentalidade de dono',
                                        'Desenvolvimento de pessoas'
                                    ].map((value) => (
                                        <div key={value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>✓</span>
                                            <span style={{ fontSize: '1.05rem' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: 'var(--space-2xl)', background: 'rgba(255, 107, 53, 0.05)' }}>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: 'var(--space-lg)' }}>
                                C-level as a service
                            </h3>
                            <p style={{ fontSize: '1.05rem', marginBottom: 'var(--space-xl)' }}>
                                Atuamos como seu time executivo, juntando estratégia e execução para
                                transformar o crescimento em realidade.
                            </p>

                            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                                <div>
                                    <h4 style={{
                                        fontSize: '1.125rem',
                                        marginBottom: 'var(--space-xs)',
                                        color: 'var(--color-text)',
                                        fontWeight: '600'
                                    }}>
                                        🎯 Priorizar o que importa
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '0', color: 'var(--color-text-muted)' }}>
                                        Escolher e testar iniciativas que geram impacto direto no negócio
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '1.125rem',
                                        marginBottom: 'var(--space-xs)',
                                        color: 'var(--color-text)',
                                        fontWeight: '600'
                                    }}>
                                        🔄 Criar rituais de crescimento
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '0', color: 'var(--color-text-muted)' }}>
                                        Práticas consistentes que mantêm a empresa evoluindo semana após semana
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '1.125rem',
                                        marginBottom: 'var(--space-xs)',
                                        color: 'var(--color-text)',
                                        fontWeight: '600'
                                    }}>
                                        💡 Capacitar o time
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '0', color: 'var(--color-text-muted)' }}>
                                        Treinar sua equipe com mindset de crescimento na prática
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="section-pattern">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span className="hero-label">— CASES DE SUCESSO</span>
                        <h2>Empresas que transformamos</h2>
                    </div>

                    <div className="grid grid-3">
                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>
                                3x
                            </div>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>Crescimento médio</h4>
                            <p style={{ marginBottom: '0', fontSize: '0.95rem' }}>
                                Aumento de faturamento em 12 meses
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>
                                50+
                            </div>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>Empresas atendidas</h4>
                            <p style={{ marginBottom: '0', fontSize: '0.95rem' }}>
                                De diversos setores e portes
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>
                                95%
                            </div>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>Satisfação</h4>
                            <p style={{ marginBottom: '0', fontSize: '0.95rem' }}>
                                Clientes recomendam nossos serviços
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Depoimentos */}
            <Testimonials />

            {/* Pricing Section */}
            <section id="precos" className="section-dark">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span className="hero-label">— NOSSOS PLANOS</span>
                        <h2>Escolha o plano ideal para seu negócio</h2>
                        <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
                            Investimento que se paga com resultados reais. Pagamento seguro via cartão, PIX ou boleto.
                        </p>
                    </div>
                    <PricingSection />
                </div>
            </section>

            {/* Products / Apps (iPhone mockup) */}
            <ProductsArea />

            {/* Contact Section */}
            <section id="contato" className="section-dark">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <span className="hero-label">— FALE CONOSCO</span>
                        <h2>Quer acelerar o crescimento da sua empresa?</h2>
                        <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
                            Deixe seus dados e receba um diagnóstico inicial gratuito para identificar
                            oportunidades de escalar com consistência
                        </p>
                    </div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
}

export default Home;
