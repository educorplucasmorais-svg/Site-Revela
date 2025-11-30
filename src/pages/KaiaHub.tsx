import React, { useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import { Link, useLocation } from 'wouter';
import { KaiaLogo } from '../components/KaiaLogo';
import '../styles/kaia-theme.css';

export default function KaiaHub() {
    const [, setLocation] = useLocation();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        trpc.auth.whoami.query().then((u) => {
            if (mounted) setUser(u);
        }).catch(() => setUser(null));
        return () => { mounted = false; };
    }, []);

    const handleLogout = async () => {
        try {
            await trpc.auth.logout.mutate();
        } catch (e) {
            // ignore
        }
        try { localStorage.removeItem('revela_token'); } catch (e) {}
        setLocation('/admin/login');
    };

    return (
        <div className="kaia-theme light" style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
            <nav style={{ 
                borderBottom: '1px solid hsl(var(--border))', 
                padding: '1rem 2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: 'hsl(var(--card))'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <KaiaLogo style={{ height: '32px', width: 'auto' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Kaia Hub</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/" style={{ 
                        padding: '0.5rem 1rem',
                        textDecoration: 'none',
                        color: 'hsl(var(--muted-foreground))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        ← Voltar
                    </Link>
                    <button className="kaia-btn" style={{ width: 'auto', padding: '0.5rem 1rem' }} onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Bem-vindo ao Kaia
                    </h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Seu assistente de inteligência artificial para negócios
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {/* Card do Usuário */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                👤
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Perfil</h3>
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                                    {user ? user.email : 'Não autenticado'}
                                </p>
                            </div>
                        </div>
                        {user && (
                            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <p><strong>Nome:</strong> {user.name || '-'}</p>
                                <p><strong>Status:</strong> <span style={{ color: 'hsl(var(--primary))' }}>Ativo</span></p>
                            </div>
                        )}
                    </div>

                    {/* Card Análise de Dados */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                📊
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Análise de Dados</h3>
                            </div>
                        </div>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            Transforme dados brutos em insights acionáveis
                        </p>
                        <button className="kaia-btn" style={{ width: '100%' }}>
                            Iniciar Análise
                        </button>
                    </div>

                    {/* Card Automação */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                ⚡
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Automação</h3>
                            </div>
                        </div>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            Automatize processos e aumente sua produtividade
                        </p>
                        <button className="kaia-btn" style={{ width: '100%' }}>
                            Configurar
                        </button>
                    </div>

                    {/* Card Relatórios */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                📈
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Relatórios</h3>
                            </div>
                        </div>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            Gere relatórios detalhados e personalizados
                        </p>
                        <button className="kaia-btn" style={{ width: '100%' }}>
                            Ver Relatórios
                        </button>
                    </div>

                    {/* Card Integrações */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                🔗
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Integrações</h3>
                            </div>
                        </div>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            Conecte suas ferramentas favoritas
                        </p>
                        <button className="kaia-btn" style={{ width: '100%' }}>
                            Gerenciar
                        </button>
                    </div>

                    {/* Card Suporte */}
                    <div className="kaia-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'hsl(var(--primary) / 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                💬
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Suporte</h3>
                            </div>
                        </div>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            Estamos aqui para ajudar você
                        </p>
                        <a 
                            href="https://wa.me/5531993044867" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="kaia-btn" 
                            style={{ 
                                width: '100%', 
                                display: 'inline-block', 
                                textAlign: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            Entrar em Contato
                        </a>
                    </div>
                </div>

                {/* Seção de Atividades Recentes */}
                <div className="kaia-card" style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Atividades Recentes
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ 
                            padding: '1rem', 
                            backgroundColor: 'hsl(var(--muted) / 0.3)', 
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🎯</span>
                            <div>
                                <p style={{ fontWeight: '600' }}>Bem-vindo ao Kaia!</p>
                                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                                    Configure sua conta e comece a usar nossos recursos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
