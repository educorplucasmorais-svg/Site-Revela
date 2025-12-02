import { useEffect, useRef } from 'react';

type Props = {
  opacity?: number;
};

export function OceanCanvas({ opacity = 0.5 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Immersion intensity presets via env: light | std | rich
    const rawMode = (import.meta as any)?.env?.VITE_KAIA_IMMERSION as string | undefined;
    const isProd = !!(import.meta as any)?.env?.PROD;
    const mode = rawMode || (isProd ? 'rich' : 'std');
    const isMobile = Math.min(window.innerWidth || 0, window.innerHeight || 0) < 640;
    const mobileMult = isMobile ? 0.8 : 1.0;
    const densityMult = mode === 'light' ? 0.6 : mode === 'rich' ? 1.25 : 1.0;
    const glowMult = (mode === 'light' ? 0.85 : mode === 'rich' ? 1.25 : 1.0) * (isMobile ? 0.9 : 1.0);
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
    const baseCount = Math.floor(((window.innerWidth || 1024) / 22) * densityMult * mobileMult);
    const particles = Array.from({ length: Math.min(120, Math.max(30, baseCount)) }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // depth factor: lower z = closer/bigger
      z: Math.random(),
      r: (2.2 + Math.random() * 2.0) * (0.8 + Math.random() * 0.2),
      s: Math.random() * 0.6 + 0.1,
      a: Math.random() * Math.PI * 2,
      life: Math.random() * 1.0,   // 0..1
      ls: 0.004 + Math.random() * 0.006 // life speed
    }));

    // Neon reef: pre-generate stem anchors along seabed
    const reefCount = Math.max(4, Math.min(12, Math.floor(((window.innerWidth || 1024) / 160) * densityMult * mobileMult)));
    const reef = Array.from({ length: reefCount }).map((_, i) => {
      const px = (i + Math.random() * 0.4) / reefCount;
      return {
        x: px, // normalized 0..1
        h: 50 + Math.random() * 90, // height of stem (subtle)
        sway: 6 + Math.random() * 12,
        phase: Math.random() * Math.PI * 2,
        hue: 190 + Math.random() * 40, // narrow teal-cyan
      };
    });

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

      // particles drift with fade in/out and blue radial glow
      for (const p of particles) {
        p.x += Math.cos(p.a + t * 0.0006) * p.s * (0.8 + (1 - p.z) * 0.6);
        p.y += Math.sin(p.a + t * 0.0008) * (p.s * 0.6) * (0.8 + (1 - p.z) * 0.6);
        p.life += p.ls;
        if (p.life >= 1) {
          p.life = 0;
          // respawn at a new random position to emphasize appearing/disappearing
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.z = Math.random();
          p.r = (2.2 + Math.random() * 2.0) * (0.9 + Math.random() * 0.3);
          p.s = Math.random() * 0.6 + 0.1;
          p.a = Math.random() * Math.PI * 2;
          p.ls = 0.004 + Math.random() * 0.006;
        }
        if (p.x < -10) p.x = canvas.width + 10; if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10; if (p.y > canvas.height + 10) p.y = -10;

        const radius = p.r * dpr * (0.9 + (1 - p.z) * 0.7);
        const alpha = Math.max(0, Math.sin(p.life * Math.PI)) * opacity;

        // blue radial gradient that feels stronger up close
        const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.0);
        rg.addColorStop(0, `rgba(0,220,255,${0.65 * alpha})`);
        rg.addColorStop(1, `rgba(0,120,255,0)`);
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // seabed shadow
      const bedY = canvas.height * 0.86;
      const bedGrad = ctx.createLinearGradient(0, bedY, 0, canvas.height);
      bedGrad.addColorStop(0, 'rgba(0,15,25,0.0)');
      const bedOpacity = 0.30 * (mode === 'light' ? 0.8 : mode === 'rich' ? 1.15 : 1.0);
      bedGrad.addColorStop(1, `rgba(0,15,25,${bedOpacity.toFixed(3)})`);
      ctx.fillStyle = bedGrad;
      ctx.fillRect(0, bedY, canvas.width, canvas.height - bedY);

      // neon reef stems
      ctx.lineWidth = 1.6 * dpr;
      for (const s of reef) {
        const baseX = s.x * canvas.width;
        const baseY = canvas.height - 8 * dpr;
        const sway = Math.sin(t * 0.005 + s.phase) * s.sway * dpr;
        const tipX = baseX + sway;
        const tipY = baseY - s.h * dpr;

        // glowing stroke
        const pulse = 0.5 + 0.35 * Math.sin(t * 0.008 + s.phase);
        const color = `hsla(${s.hue}, 85%, ${60 - pulse * 12}%, ${0.7})`;
        ctx.strokeStyle = color;

        ctx.beginPath();
        // curvy stem using two control points
        const c1x = baseX - s.sway * 0.4 * dpr;
        const c1y = baseY - s.h * 0.35 * dpr;
        const c2x = baseX + s.sway * 0.8 * dpr;
        const c2y = baseY - s.h * 0.7 * dpr;
        ctx.moveTo(baseX, baseY);
        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, tipX, tipY);
        ctx.shadowColor = color;
        ctx.shadowBlur = 6 * dpr * glowMult;
        ctx.stroke();

        // tip glow node
        ctx.shadowBlur = 10 * dpr * glowMult;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(tipX, tipY, (2.5 + pulse * 1.5) * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // small side branches
        if (Math.random() < 0.03) {
          const by = tipY + (Math.random() * 0.4) * (baseY - tipY);
          const dir = Math.random() > 0.5 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(baseX + (sway * 0.4), by);
          ctx.quadraticCurveTo(
            baseX + dir * 8 * dpr,
            by - 6 * dpr,
            baseX + dir * 12 * dpr,
            by - 2 * dpr
          );
          ctx.strokeStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 4 * dpr;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // faint monolith lines (tech vibe, subtle)
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = 'rgba(0,180,255,0.08)';
      for (let i = 0; i < 3; i++) {
        const x = ((i + 1) / 4) * canvas.width + Math.sin(t * 0.002 + i) * 5 * dpr;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x, canvas.height - 70 * dpr - Math.sin(t * 0.004 + i) * 16 * dpr);
        ctx.stroke();
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
