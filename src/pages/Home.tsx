import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { RevelaHero } from '../components/RevelaHero';
import { BenefitsStack } from '../components/BenefitsStack';
import { TestimonialsBF } from '../components/TestimonialsBF';
import { PillarsSection } from '../components/PillarsSection';
import { MethodologySection } from '../components/MethodologySection';
import { ProductPipelineSection } from '../components/ProductPipelineSection';
import { ProductsIncubatorSection } from '../components/ProductsIncubatorSection';
import { FAQ } from '../components/FAQ';
import { trpc } from '../lib/trpc';

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
            {/* 1. Header / Hero topo de funil */}
            <RevelaHero onContactClick={scrollToContact} />

            {/* 2. Conhecer a empresa (Pilares) */}
            <PillarsSection />

            {/* 3. Metodologia */}
            <MethodologySection />

            {/* 3.1 Esteira de Criação de Produtos (sales pitch) */}
            <ProductPipelineSection />

            {/* 4. Benefícios / Como entregamos valor */}
            <BenefitsStack />

            {/* 5. Metodologia de produtos já destacada acima (mantida) */}

            {/* 6. Prova social */}
            <TestimonialsBF />

            {/* 7. Produtos e Incubadora */}
            <ProductsIncubatorSection />

            {/* 8. Serviços (cards resumidos) */}
            <section id="servicos" className="section-pattern">
                <div className="container">
                    <div className="grid grid-3">
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Diagnóstico Estratégico</h3>
                            <p style={{ marginBottom: 0 }}>Identifique oportunidades e elimine barreiras ao crescimento.</p>
                        </div>
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Execução Eficiente</h3>
                            <p style={{ marginBottom: 0 }}>Transforme planos em ações concretas com impacto imediato.</p>
                        </div>
                        <div className="card revela-card-dark">
                            <h3 className="revela-keyword">Rotina de Sucesso</h3>
                            <p style={{ marginBottom: 0 }}>Estabeleça processos contínuos para resultados consistentes.</p>
                        </div>
                    </div>
                    <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                        <a
                          href={`https://wa.me/5531993044867?text=${encodeURIComponent('Preciso de ajuda com serviços da Revela.')}`}
                          className="btn btn-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            const href = `https://wa.me/5531993044867?text=${encodeURIComponent('Preciso de ajuda com serviços da Revela.')}`;
                            try { const opened = window.open(href, '_blank', 'noopener'); if (!opened) window.location.href = href; } catch { window.location.href = href; }
                            try { trpc.sendWhatsapp.mutate({ text: 'Dúvida sobre serviços', topic: 'servicos' }); } catch {}
                          }}
                        >
                          Falar com consultor sobre serviços
                        </a>
                    </div>
                </div>
            </section>

            {/* 9. Entrar em contato */}
            <section id="contato" className="section-dark">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
                        <span className="hero-label">— ENTRE EM CONTATO</span>
                        <h2>Receba uma análise gratuita do seu negócio</h2>
                        <p style={{ fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', marginTop: 'var(--space-sm)' }}>
                            Descubra como podemos ajudar a transformar desafios em oportunidades de crescimento.
                        </p>
                    </div>
                    <ContactForm />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-lg)' }}>
                        <a
                            href={`https://wa.me/5531993044867?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor sobre meu caso.')}`}
                            className="btn btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                const href = `https://wa.me/5531993044867?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor sobre meu caso.')}`;
                                try { const opened = window.open(href, '_blank', 'noopener'); if (!opened) window.location.href = href; } catch { window.location.href = href; }
                                try { trpc.sendWhatsapp.mutate({ text: 'Contato direto via WhatsApp', topic: 'consultoria' }); } catch {}
                            }}
                        >
                            Falar com um consultor agora
                        </a>
                    </div>
                </div>
            </section>

            {/* 10. Perguntas frequentes */}
            <FAQ />
        </>
    );
}

export default Home;
