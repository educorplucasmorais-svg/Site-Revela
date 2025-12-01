import { useEffect, useRef } from 'react';

type Props = {
  opacity?: number;
};

export function EcoCanvas({ opacity = 0.65 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();

    // Slightly more organic leaves/embers
    const particles = Array.from({ length: Math.min(100, Math.floor(window.innerWidth / 16)) }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.8 + 0.7, // larger variance
      s: Math.random() * 0.3 + 0.06,
      a: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      if (document.hidden) {
        animRef.current = requestAnimationFrame(render);
        return;
      }
      // background gradient fog (earthy tones)
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, 'rgba(10,10,10,1)');
      g.addColorStop(0.5, 'rgba(18,18,18,1)');
      g.addColorStop(1, 'rgba(22,18,12,1)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // subtle grid
      // softer grid for better text contrast
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = '#FF6B35';
      const step = 80 * dpr;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // ember/leaf particles drifting upward
      for (const p of particles) {
        p.y -= p.s * 0.8;
        p.x += Math.sin(p.a) * 0.3;
        p.a += 0.01;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        const hue = 20 + Math.random() * 10; // warm orange
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
