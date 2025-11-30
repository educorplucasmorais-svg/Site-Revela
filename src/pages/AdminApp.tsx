import React, { useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import { Link, useLocation } from 'wouter';

export default function AdminApp() {
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
        <div className="container" style={{ paddingTop: '120px', minHeight: '70vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <h2>App Interno - Revela</h2>
                <div>
                    <button className="btn" onClick={handleLogout}>Sair</button>
                </div>
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                <div className="card revela-card-dark">
                    <h3>Usuário autenticado</h3>
                    {user ? (
                        <div>
                            <p><strong>Nome:</strong> {user.name || '-'}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    ) : (
                        <div>
                            <p>Nenhum usuário autenticado. <Link href="/admin/login">Entrar</Link></p>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3>Próximos passos</h3>
                    <ul>
                        <li>Integrar CRUD de usuários</li>
                        <li>Gerenciar contatos</li>
                        <li>Dashboard de métricas</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
