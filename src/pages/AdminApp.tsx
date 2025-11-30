import React, { useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import { Link, useLocation } from 'wouter';

export default function AdminApp() {
    const [, setLocation] = useLocation();
    const [user, setUser] = useState<any>(null);
    const [sending, setSending] = useState(false);
    const [sendResult, setSendResult] = useState<string | null>(null);

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

    const handleSendTest = async () => {
        setSendResult(null);
        setSending(true);
        try {
            const res = await trpc.sendWhatsapp.mutate({ text: 'Teste de mensagem: Olá da equipe Revela.' });
            setSendResult(JSON.stringify(res?.data || res));
        } catch (e: any) {
            setSendResult(e?.message || 'Erro ao enviar');
        } finally {
            setSending(false);
        }
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

                        <div style={{ marginTop: 'var(--space-md)' }}>
                            <h4>Teste WhatsApp</h4>
                            <p>Envie uma mensagem de teste para o número configurado em `WHATSAPP_PHONE`.</p>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                <button className="btn btn-primary" onClick={handleSendTest} disabled={sending}>
                                    {sending ? 'Enviando...' : 'Enviar teste WhatsApp'}
                                </button>
                                <button className="btn" onClick={()=>{ setSendResult(null); }}>
                                    Limpar
                                </button>
                            </div>
                            {sendResult && (
                                <pre style={{ marginTop: 'var(--space-md)', maxHeight: 200, overflow: 'auto' }}>{sendResult}</pre>
                            )}
                        </div>
                </div>
            </div>
        </div>
    );
}
