import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
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
            {/* Hero minimal */}
            <RevelaHero onContactClick={scrollToContact} />

            {/* Value proposition concise */}
            <section id="sobre" className="section-dark">
                <div className="container text-center" style={{ maxWidth: '760px' }}>
                    <span className="hero-label">— SOBRE A REVELA</span>
                    <h2 style={{ marginTop: 'var(--space-sm)' }}>Crescimento claro, sem ruído</h2>
                    <p style={{ fontSize: '1.1rem', marginTop: 'var(--space-md)' }}>
                        Foco no essencial: estratégia prática, execução direta e rituais simples que geram resultado.
                    </p>
                </div>
            </section>

            {/* Three key services only */}
            <section id="servicos" className="section-pattern">
                <div className="container">
                    <div className="grid grid-3">
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Diagnóstico</h3>
                            <p style={{ marginBottom: 0 }}>Mapa das prioridades e oportunidades reais.</p>
                        </div>
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Execução</h3>
                            <p style={{ marginBottom: 0 }}>Implementação hands-on junto ao seu time.</p>
                        </div>
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Rotina</h3>
                            <p style={{ marginBottom: 0 }}>Rituais simples para evoluir toda semana.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Single CTA with contact form */}
            <section id="contato" className="section-dark">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
                        <span className="hero-label">— VAMOS CONVERSAR</span>
                        <h2>Diagnóstico inicial gratuito</h2>
                        <p style={{ fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', marginTop: 'var(--space-sm)' }}>
                            Envie seus dados e receba uma análise direta do que pode gerar impacto imediato.
                        </p>
                    </div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
}

export default Home;
