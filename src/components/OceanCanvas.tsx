import { useEffect, useRef } from 'react';

type Props = {
  opacity?: number;
};

export function OceanCanvas({ opacity = 0.5 }: Props) {
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

    // nano particles (ocean tech vibe)
    // Reduce particles on small screens for clarity/performance
    const baseCount = Math.floor(window.innerWidth / 10);
    const particles = Array.from({ length: Math.min(160, Math.max(60, baseCount)) }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.6 + 0.1,
      a: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      if (document.hidden) { animRef.current = requestAnimationFrame(render); return; }

      // deep ocean gradient
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, 'rgba(2,8,20,1)');
      g.addColorStop(1, 'rgba(6,20,35,1)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // aurora band
      const bandY = canvas.height * 0.35 + Math.sin(t * 0.003) * 60 * dpr;
      const bandH = 160 * dpr; // thicker aurora
      const aurora = ctx.createLinearGradient(0, bandY - bandH, 0, bandY + bandH);
      aurora.addColorStop(0, 'rgba(0,180,255,0.05)');
      aurora.addColorStop(0.5, 'rgba(0,180,255,0.35)'); // brighter center
      aurora.addColorStop(1, 'rgba(0,180,255,0.05)');
      ctx.fillStyle = aurora;
      ctx.fillRect(0, bandY - bandH, canvas.width, bandH * 2);

      // nano curves (banana-like micro arcs)
      ctx.globalAlpha = 0.3; // slightly brighter nano arcs
      ctx.strokeStyle = 'rgba(0,220,255,0.35)';
      for (let i = 0; i < 18; i++) {
        const cx = (i / 18) * canvas.width;
        const cy = bandY + Math.sin(t * 0.004 + i) * 40 * dpr;
        ctx.beginPath();
        ctx.moveTo(cx - 80 * dpr, cy - 10 * dpr);
        ctx.quadraticCurveTo(cx, cy + 20 * dpr, cx + 80 * dpr, cy - 10 * dpr);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // particles drift
      for (const p of particles) {
        p.x += Math.cos(p.a + t * 0.0006) * p.s;
        p.y += Math.sin(p.a + t * 0.0008) * (p.s * 0.6);
        if (p.x < -10) p.x = canvas.width + 10; if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10; if (p.y > canvas.height + 10) p.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(0,200,255,${opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      t += 1;
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
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
