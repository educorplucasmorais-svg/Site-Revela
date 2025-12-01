import { useEffect, useState } from 'react';
import { API_BASE_URL, apiUrl } from '../lib/api';

export default function Diagnostics() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState<string>('');
  const [ts, setTs] = useState<string>('');

  useEffect(() => {
    setStatus('loading');
    fetch(apiUrl('/api/health'))
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (r.ok) {
          setStatus('ok');
          setMsg(JSON.stringify(j));
          setTs(j?.timestamp || '');
        } else {
          setStatus('error');
          setMsg(`HTTP ${r.status}`);
        }
      })
      .catch((e) => {
        setStatus('error');
        setMsg(String(e?.message || e));
      });
  }, []);

  const base = API_BASE_URL || '(relative / proxy)';

  return (
    <div className="container" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: 'var(--space-lg)' }}>Diagnostics</h1>
      <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: 720 }}>
        <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--color-bg-elevated)' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>API Base URL</div>
          <div style={{ fontFamily: 'monospace' }}>{base}</div>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: 12, background: 'var(--color-bg-elevated)' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Health</div>
          <div>Status: <strong>{status}</strong></div>
          {ts && <div>Timestamp: {ts}</div>}
          {msg && (
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', marginTop: 8 }}>{msg}</pre>
          )}
        </div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          Dica: Em produção, defina `VITE_API_URL` no Vercel apontando para o domínio público do backend.
        </div>
      </div>
    </div>
  );
}
