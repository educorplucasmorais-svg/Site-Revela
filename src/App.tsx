import { useState, useEffect } from 'react';
import Kaia from "./pages/Kaia";
import AdminLogin from './pages/AdminLogin';
import AdminApp from './pages/AdminApp';
import KaiaHub from './pages/KaiaHub';
import Products from './pages/Products';
import { Route, Switch, Link, useLocation } from 'wouter';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import { PageTransition } from './components/PageTransition';
import { useContentProtection } from './hooks/useContentProtection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Navigation } from './components/Navigation';
import Diagnostics from './pages/Diagnostics';
import './style.css';

function App() {
    useContentProtection();
    const [location] = useLocation();
    const [showTransition, setShowTransition] = useState(false);
    const [pendingRoute, setPendingRoute] = useState<string | null>(null);
    const [, setLocation] = useLocation();

    // Handle navigation to Kaia with transition
    const handleKaiaClick = (e: React.MouseEvent) => {
        if (location !== '/kaia') {
            e.preventDefault();
            setShowTransition(true);
            setPendingRoute('/kaia');
        }
    };

    // Complete navigation after transition
    const handleTransitionComplete = () => {
        if (pendingRoute) {
            setLocation(pendingRoute);
            setPendingRoute(null);
        }
        setShowTransition(false);
    };

    // Check if current route is Kaia
    const isKaiaRoute = location === '/kaia';

    return (
        <>
            <Toaster position="top-right" richColors />

            {/* VFX Page Transition */}
            <PageTransition 
                isActive={showTransition} 
                onComplete={handleTransitionComplete}
            />

            {!isKaiaRoute && (
                <Navigation onKaiaClick={handleKaiaClick} />
            )}

            <main>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/produtos">
                        <Products />
                    </Route>
                    <Route path="/kaia">
                        <Kaia />
                    </Route>
                    <Route path="/diagnostics">
                        <Diagnostics />
                    </Route>
                    <Route path="/kaia/hub">
                        <KaiaHub />
                    </Route>
                    <Route path="/admin/login">
                        <AdminLogin />
                    </Route>
                    <Route path="/admin/app">
                        <AdminApp />
                    </Route>
                    <Route>
                        <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '100vh' }}>
                            <h1>404</h1>
                            <p>Página não encontrada</p>
                            <Link href="/" className="btn btn-primary">Voltar ao início</Link>
                        </div>
                    </Route>
                </Switch>
            </main>

            {!isKaiaRoute && (
                <footer style={{
                    background: 'var(--color-bg-elevated)',
                    borderTop: '1px solid var(--color-border)',
                    padding: 'var(--space-2xl) 0',
                    marginTop: 'var(--space-3xl)'
                }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 'var(--space-xl)',
                            marginBottom: 'var(--space-xl)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)', color: 'var(--color-primary)' }}>
                                    RevelaIA
                                </h3>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                                    Hub de Inovação e Tecnologia. Automação inteligente e soluções 
                                    com IA para empresas que querem escalar.
                                </p>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', fontWeight: '600' }}>
                                    Educação Tech
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)' }}>
                                    <li><a href="/incubadora" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Incubadora</a></li>
                                    <li><a href="/mentorias" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Mentorias</a></li>
                                    <li><a href="/palestras" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Palestras</a></li>
                                    <li><a href="/hackathon" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Hackathon</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', fontWeight: '600' }}>
                                    Soluções TEC
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)' }}>
                                    <li><a href="/produtos" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Produtos</a></li>
                                    <li><a href="/esteira" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Esteira de Processos</a></li>
                                    <li><a href="/pitch" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Pitch de Negócio</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', fontWeight: '600' }}>
                                    Contato
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)' }}>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📧 contato@revelaia.tech</li>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📱 +55 31 99304-4867</li>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📍 Atuação em todo o Brasil</li>
                                </ul>
                            </div>
                        </div>
                {/* Floating WhatsApp button visible on all routes */}
                <WhatsAppButton />

                        {/* LGPD Certification Seal */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'var(--space-lg)',
                            flexWrap: 'wrap',
                            padding: 'var(--space-lg) 0',
                            borderTop: '1px solid var(--color-border)',
                            marginTop: 'var(--space-lg)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                padding: '12px 20px',
                                background: 'rgba(255, 107, 53, 0.08)',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                borderRadius: '8px'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>🔒</span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                        CRIPTOGRAFIA SSL
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                        Dados Protegidos
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                padding: '12px 20px',
                                background: 'rgba(255, 107, 53, 0.08)',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                borderRadius: '8px'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                        LGPD COMPLIANT
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                        Lei nº 13.709/2018
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                padding: '12px 20px',
                                background: 'rgba(255, 107, 53, 0.08)',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                borderRadius: '8px'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>✓</span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                        SITE SEGURO
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                        Navegação Protegida
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            borderTop: '1px solid var(--color-border)',
                            paddingTop: 'var(--space-lg)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0', fontSize: '0.9rem' }}>
                                © {new Date().getFullYear()} RevelaIA. Todos os direitos reservados.
                                Hub de Inovação e Tecnologia com IA.
                            </p>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}

export default App;
