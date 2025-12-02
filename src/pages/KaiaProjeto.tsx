import { useState } from 'react';

export default function KaiaProjeto() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin') setOk(true);
    else alert('Credenciais invalidas');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #020814, #061423)', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Projeto KAIA - MVP e Estrategia</h1>
          <a href="/kaia" style={{ color: '#22D3EE', textDecoration: 'none', fontWeight: 700 }}>Voltar</a>
        </div>

        {!ok ? (
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(15,15,26,0.8)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 12,
            padding: 24,
            maxWidth: 460
          }}>
            <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: '1.2rem' }}>Acesso Restrito</h2>
            <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.6)' }}>Somente administradores.</p>
            <div style={{ display: 'grid', gap: 12 }}>
              <input
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="Usuario"
                style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              />
              <input
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Senha"
                type="password"
                style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              />
              <button type="submit" style={{ padding: '12px 16px', borderRadius: 10, border: 'none', fontWeight: 700, background: 'linear-gradient(135deg,#6366F1,#22D3EE)', color: '#fff', cursor: 'pointer' }}>
                Entrar
              </button>
            </div>
          </form>
        ) : (
          <div style={{ background: 'rgba(15,15,26,0.7)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, padding: 24 }}>
            <article style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
              <h2>O MVP (Produto Minimo Viavel)</h2>
              <p>O MVP da plataforma Kaia e o coracao do projeto e foca em estabelecer o ciclo fundamental de desenvolvimento de talentos: Diagnostico, Planejamento e Execucao.</p>
              <h3>Pilares</h3>
              <ul>
                <li>Mapeamento de Perfil (DISC, QP, Sabotadores)</li>
                <li>PDI Inteligente</li>
                <li>Gestao de Metas</li>
              </ul>
              <h3>ROI Estimado</h3>
              <p>CAPEX R$ 1.3M; valor estimado maior que R$ 7.2M/ano.</p>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
