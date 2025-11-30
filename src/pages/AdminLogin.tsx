import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { trpc } from '../lib/trpc';

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
            const res = await trpc.auth.login.mutate({ username, password });
            if (res?.token) {
                try { localStorage.setItem('revela_token', res.token); } catch (e) {}
                setLocation('/admin/app');
            }
        } catch (err: any) {
            setError(err?.message || 'Falha ao autenticar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '120px', minHeight: '70vh' }}>
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <h2>Área Interna - Revela</h2>
                <p>Use as credenciais de administrador para acessar o App interno.</p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-md)' }}>
                    <label>
                        Usuário
                        <input value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </label>

                    <label>
                        Senha
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </label>

                    {error && <div style={{ color: 'var(--color-danger)' }}>{error}</div>}

                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                        <button className="btn btn-primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
                        <Link href="/" className="btn">Voltar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
