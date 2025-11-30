import { useState, useEffect } from 'react';
import Kaia from "./pages/Kaia";
import AdminLogin from './pages/AdminLogin';
import AdminApp from './pages/AdminApp';
import { Route, Switch, Link, useLocation } from 'wouter';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import { PageTransition } from './components/PageTransition';
import { useContentProtection } from './hooks/useContentProtection';
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

    // Check if current route is Kaia (root or /kaia)
    const isKaiaRoute = location === '/' || location === '/kaia';

    return (
        <>
            <Toaster position="top-right" richColors />

            {/* VFX Page Transition */}
            <PageTransition 
                isActive={showTransition} 
                onComplete={handleTransitionComplete}
            />

            {!isKaiaRoute && (
                <header className="header" id="header">
                    <div className="container">
                        <nav className="nav">
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className="nav-logo">
                                    Kaia
                                    <span className="nav-tagline">Inteligência Artificial para Negócios</span>
                                </div>
                            </Link>
                            <ul className="nav-links">
                                <li><Link href="/" className="nav-link">Início</Link></li>
                                <li><Link href="/revela" className="nav-link">Revela (Antigo)</Link></li>
                                <li><Link href="#features" className="nav-link">Recursos</Link></li>
                                <li><Link href="#pricing" className="nav-link">Planos</Link></li>
                                <li><Link href="/admin/login" className="nav-link">Acesso</Link></li>
                            </ul>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                    📅 {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        </nav>
                    </div>
                </header>
            )}

            <main>
                <Switch>
                    <Route path="/" component={Kaia} />
                    <Route path="/revela" component={Home} />
                    <Route path="/kaia">
                        <Kaia />
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
                                    Revela
                                </h3>
                                <p style={{ fontSize: '0.95rem', marginBottom: '0' }}>
                                    Potencializando negócios através de pessoas. Inteligência estratégica para
                                    empresas que querem crescer de forma sustentável.
                                </p>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', fontWeight: '600' }}>
                                    Links Rápidos
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)' }}>
                                    <li><a href="#servicos" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Serviços</a></li>
                                    <li><a href="#sobre" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Sobre</a></li>
                                    <li><a href="#contato" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Contato</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', fontWeight: '600' }}>
                                    Contato
                                </h4>
                                <ul style={{ listStyle: 'none', display: 'grid', gap: 'var(--space-sm)' }}>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📧 contato@revela.com.br</li>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📱 +55 31 99304-4867</li>
                                    <li style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>📍 Atuação em todo o Brasil</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{
                            borderTop: '1px solid var(--color-border)',
                            paddingTop: 'var(--space-lg)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0', fontSize: '0.9rem' }}>
                                © {new Date().getFullYear()} Revela. Todos os direitos reservados.
                                Consultoria para pequenas e médias empresas.
                            </p>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}

export default App;
