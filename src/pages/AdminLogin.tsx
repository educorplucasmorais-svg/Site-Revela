import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { trpc } from '../lib/trpc';
import { API_BASE_URL } from '../lib/api';
import { KaiaLogo } from '../components/KaiaLogo';
import '../styles/kaia-theme.css';

export default function AdminLogin() {
    const [, setLocation] = useLocation();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // If API_BASE_URL is empty or points to localhost in production, fallback to mock auth
            const isApiUnavailable = !API_BASE_URL || (typeof window !== 'undefined' && location.origin.includes('vercel.app') && API_BASE_URL.includes('localhost'));

            if (isApiUnavailable) {
                if (username === 'admin' && password === (import.meta.env.SEED_ADMIN_PASSWORD || 'admin123')) {
                    try { localStorage.setItem('revela_token', 'mock-token'); } catch (e) {}
                    setLocation('/admin/app');
                    return;
                } else {
                    throw new Error('API indisponível. Use credenciais padrão admin/admin123 para acesso temporário.');
                }
            }

            const res = await trpc.auth.login.mutate({ username, password });
            if (res?.token) {
                try { localStorage.setItem('revela_token', res.token); } catch (e) {}
                setLocation('/admin/app');
            }
        } catch (err: any) {
            // Show clearer message when backend returns non-JSON or is unreachable
            const msg = (err?.message || '').toString();
            if (msg.includes('Unexpected end of JSON input')) {
                setError('Falha ao conectar à API. Verifique VITE_API_URL e backend em produção.');
            } else {
                setError(err?.message || 'Falha ao autenticar');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kaia-theme light kaia-login-container">
            <div className="kaia-card">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <KaiaLogo style={{ width: '80px', height: '80px' }} />
                </div>
                
                <h2 style={{ textAlign: 'center', marginBottom: '0.375rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Área Interna - Kaia
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '1.25rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                    Acesse o painel administrativo
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.875rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Usuário</label>
                        <input 
                            className="kaia-input"
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)} 
                            placeholder="Digite seu usuário"
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Senha</label>
                        <input 
                            className="kaia-input"
                            type="password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            placeholder="Digite sua senha"
                        />
                    </div>

                    {error && (
                        <div style={{ 
                            color: 'hsl(var(--destructive))', 
                            fontSize: '0.875rem', 
                            padding: '0.5rem', 
                            backgroundColor: 'hsl(var(--destructive) / 0.1)',
                            borderRadius: 'var(--radius)'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                        <button className="kaia-btn" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <Link href="/" style={{ 
                            textAlign: 'center', 
                            color: 'hsl(var(--muted-foreground))',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                        }}>
                            Voltar para o site
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
