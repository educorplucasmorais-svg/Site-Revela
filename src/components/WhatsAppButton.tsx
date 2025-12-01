import { useState } from 'react';
import { trpc } from '../lib/trpc';

export function WhatsAppButton() {
  const [sending, setSending] = useState(false);
  const waNumber = '5531993044867';
  const baseText = 'Olá! Gostaria de falar com um consultor da Revela.';
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(baseText)}`;

  const handleClick = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    // Try opening in new tab; fallback to same-tab navigation
    try {
      const opened = window.open(href, '_blank', 'noopener');
      if (!opened) {
        window.location.href = href;
      }
    } catch {
      window.location.href = href;
    }
    // Fire server-side bot message (if configured)
    setSending(true);
    try {
      await trpc.sendWhatsapp.mutate({ text: baseText, topic: 'consultoria' });
    } catch {}
    setSending(false);
  };

  return (
    <a
      aria-label="Falar no WhatsApp"
      href={href}
      onClick={handleClick}
      rel="noopener"
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#25D366',
        boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'auto'
      }}
      title={sending ? 'Enviando...' : 'Falar com consultor'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="28" height="28" aria-hidden="true">
        <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.39 0 .04 5.35.04 11.98a11.9 11.9 0 001.6 6l-1.64 6.02 6.18-1.62a11.93 11.93 0 005.86 1.53h.01c6.64 0 12.02-5.35 12.02-11.98 0-3.2-1.25-6.21-3.55-8.45zm-8.48 19.5h-.01a9.9 9.9 0 01-5.05-1.37l-.36-.21-3.67.97.98-3.57-.24-.37a9.9 9.9 0 01-1.53-5.2c0-5.47 4.47-9.93 9.96-9.93 2.66 0 5.16 1.03 7.04 2.9a9.82 9.82 0 012.93 7.04c0 5.47-4.47 9.93-10.05 9.93zm5.52-7.42c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.43-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.12.3-.32.45-.48.15-.16.2-.27.3-.45.1-.17.05-.33-.02-.47-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.51-.68-.52h-.58c-.2 0-.47.07-.72.33-.25.25-.95.93-.95 2.27s.98 2.64 1.13 2.82c.15.18 1.93 2.95 4.67 4.02.65.28 1.16.45 1.56.58.65.21 1.24.18 1.7.11.52-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
