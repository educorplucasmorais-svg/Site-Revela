import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { trpc } from '../lib/trpc';
import { API_BASE_URL } from '../lib/api';
import { useEffect } from 'react';
import { KaiaWaterLogo } from '../components/KaiaWaterLogo';
import '../styles/kaia-theme.css';

export default function AdminLogin() {
    const [, setLocation] = useLocation();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [envStatus, setEnvStatus] = useState<{ url: string; ok: boolean | null; message?: string }>({ url: API_BASE_URL || '(vazio)', ok: null });

    // Environment diagnostics: test /api/health
    useEffect(() => {
        const url = API_BASE_URL ? `${API_BASE_URL}/api/health` : '/api/health';
        let cancelled = false;
        fetch(url, { method: 'GET' })
            .then(async r => {
                if (cancelled) return;
                if (!r.ok) {
                    setEnvStatus({ url, ok: false, message: `HTTP ${r.status}` });
                    return;
                }
                try {
                    const data = await r.json();
                    setEnvStatus({ url, ok: true, message: data.status || 'ok' });
                } catch (e: any) {
                    setEnvStatus({ url, ok: false, message: 'Resposta não-JSON' });
                }
            })
            .catch(e => {
                if (cancelled) return;
                setEnvStatus({ url, ok: false, message: (e?.message || 'falha de rede').slice(0, 80) });
            });
        return () => { cancelled = true; };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Always attempt server-side authentication via tRPC
            // No client-side password validation for security reasons
            const res = await trpc.auth.login.mutate({ username, password });
            if (res?.token) {
                try { localStorage.setItem('revela_token', res.token); } catch (e) {}
                setLocation('/admin/app');
            }
        } catch (err: any) {
            // Show clearer message when backend returns non-JSON or is unreachable
            const msg = (err?.message || '').toString();
            if (msg.includes('Unexpected end of JSON input') || msg.includes('fetch')) {
                setError('Falha ao conectar à API. Verifique se o backend está rodando e VITE_API_URL configurado no Vercel.');
            } else {
                setError(err?.message || 'Credenciais inválidas');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kaia-theme light kaia-login-container">
            <div className="kaia-card">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <KaiaWaterLogo style={{ width: '80px', height: '80px' }} showText={false} />
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

                    {/* Environment status panel */}
                    <div style={{
                        fontSize: '0.7rem',
                        lineHeight: 1.4,
                        color: envStatus.ok ? 'hsl(var(--muted-foreground))' : 'hsl(var(--destructive))',
                        background: 'hsl(var(--muted) / 0.3)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius)'
                    }}>
                        <strong>API:</strong> {envStatus.url}<br />
                        Status: {envStatus.ok === null ? 'testando...' : envStatus.ok ? 'OK' : 'Indisponível'} {envStatus.message ? `(${envStatus.message})` : ''}
                        {envStatus.ok === false && (
                            <>
                                <br />Configure backend deploy e defina <code style={{ fontSize: '0.65rem' }}>VITE_API_URL</code> no Vercel.
                                <br /><a href="https://github.com/educorplucasmorais-svg/Site-Revela#-produ%C3%A7%C3%A3o-backend--frontend" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>Ver guia de produção</a>
                            </>
                        )}
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
