import React, { useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import { Link, useLocation } from 'wouter';
import { KaiaWaterLogo } from '../components/KaiaWaterLogo';
import '../styles/kaia-theme.css';

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
            setSendResult(JSON.stringify(res?.data || res, null, 2));
        } catch (e: any) {
            setSendResult(e?.message || 'Erro ao enviar');
        } finally {
            setSending(false);
        }
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
                    <KaiaWaterLogo style={{ height: '32px', width: 'auto' }} showText={false} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Admin</span>
                </div>
                <button className="kaia-btn" style={{ width: 'auto', padding: '0.5rem 1rem' }} onClick={handleLogout}>
                    Sair
                </button>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div className="kaia-card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Usuário autenticado</h3>
                        {user ? (
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <p><strong style={{ color: 'hsl(var(--primary))' }}>Nome:</strong> {user.name || '-'}</p>
                                <p><strong style={{ color: 'hsl(var(--primary))' }}>Email:</strong> {user.email}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Nenhum usuário autenticado. <Link href="/admin/login" style={{ color: 'hsl(var(--primary))' }}>Entrar</Link></p>
                            </div>
                        )}
                    </div>

                    <div className="kaia-card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ferramentas</h3>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Teste WhatsApp</h4>
                            <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
                                Envie uma mensagem de teste para o número configurado em `WHATSAPP_PHONE`.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button className="kaia-btn" style={{ width: 'auto' }} onClick={handleSendTest} disabled={sending}>
                                    {sending ? 'Enviando...' : 'Enviar teste WhatsApp'}
                                </button>
                                <button 
                                    className="kaia-btn" 
                                    style={{ width: 'auto', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' }} 
                                    onClick={()=>{ setSendResult(null); }}
                                >
                                    Limpar
                                </button>
                            </div>
                            {sendResult && (
                                <pre style={{ 
                                    marginTop: '1rem', 
                                    padding: '1rem', 
                                    backgroundColor: 'hsl(var(--muted))', 
                                    borderRadius: 'var(--radius)',
                                    overflow: 'auto',
                                    fontSize: '0.875rem'
                                }}>{sendResult}</pre>
                            )}
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Próximos passos</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'hsl(var(--muted-foreground))' }}>
                                <li>Integrar CRUD de usuários</li>
                                <li>Gerenciar contatos</li>
                                <li>Dashboard de métricas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
