'use client';

import { useEffect, useRef } from 'react';

type Props = { className?: string };

export default function HeatEffect({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // --- sizing
    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // --- blobs
    type Blob = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      o: number;
    };
    const blobs: Blob[] = [];
    const COUNT = 6;
    const init = () => {
      blobs.length = 0;
      const w = canvas.width / dpr,
        h = canvas.height / dpr;
      for (let i = 0; i < COUNT; i++) {
        blobs.push({
          x: Math.random() * w,
          y: h * (0.6 + Math.random() * 0.5), // concentrés vers le bas
          r: 400 + Math.random() * 300,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.4) * 0.2,
          o: 0.35 + Math.random() * 0.25,
        });
      }
    };
    init();

    // --- "vent" (gust) contrôlé par la souris
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };
    let gust = 0; // intensité instantanée du vent (0..1+)
    let gustTarget = 0; // cible (on la augmente sur mouvement)
    const GUST_DECAY = 0.12; // vitesse de retour de gust → 0
    const LERP = (a: number, b: number, t: number) => a + (b - a) * t;

    // écoute souris / toucher
    const onMove = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      if (e instanceof TouchEvent) {
        const t = e.touches[0];
        if (!t) return;
        x = t.clientX;
        y = t.clientY;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
      // booster la cible de rafale, plafonnée
      gustTarget = Math.min(1.0, gustTarget + 0.25);
    };
    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    // --- animation
    let raf = 0;
    function loop() {
      const w = canvas.width / dpr,
        h = canvas.height / dpr;

      // easing de l’intensité du vent
      gust = LERP(
        gust,
        mouse.active ? gustTarget : 0,
        mouse.active ? 0.25 : 0.18
      );
      // la cible redescend doucement
      gustTarget = Math.max(0, gustTarget - 0.08);

      // update blobs
      for (const b of blobs) {
        const turbulence = Math.sin(Date.now() * 0.001 + b.x * 0.01) * 0.05;
        b.vx += turbulence;
        b.vy += Math.cos(Date.now() * 0.001 + b.y * 0.01) * 0.03;
        // force de vent radiale depuis la souris
        if (gust > 0.001) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          // zone d’influence (rayon ~ 280..420 px selon gust)
          const influence = 150 + gust * 80;
          const sigma2 = influence * influence; // gaussienne simple
          const falloff = Math.exp(-dist2 / (2 * sigma2)); // 0..1

          // direction normalisée
          let nx = dx,
            ny = dy;
          const len = Math.hypot(nx, ny) || 1;
          nx /= len;
          ny /= len;

          // impulse (plus gust est fort, plus on pousse)
          const push = (0.9 + b.r / 1200) * gust * falloff * 1.6; // ajusté au rayon
          b.vx += nx * push * 0.6;
          b.vy += ny * push * 0.6;
        }

        // dynamique naturelle
        b.x += b.vx;
        b.y += b.vy;

        // friction légère
        b.vx *= 0.92;
        b.vy *= 0.92;

        // rebonds doux (zone utile: 35%–115% hauteur)
        if (b.x < -b.r || b.x > w + b.r) b.vx *= -1;
        if (b.y < h * 0.35 || b.y > h + b.r * 0.25) b.vy *= -1;
      }

      // DRAW
      ctx.clearRect(0, 0, w, h);

      // 1) dessiner les blobs en "lighter"
      // @ts-ignore
      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(255,140,60,${b.o * 1.2})`);      // ← Plus intense au centre
        g.addColorStop(0.45, `rgba(255,95,25,${b.o * 0.75})`);   // ← Plus visible au milieu
        g.addColorStop(1, 'rgba(255,60,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      }

      // 2) “souffle” local : on perce un trou (destination-out) centré sur la souris
      if (gust > 0.01) {
        // @ts-ignore
        ctx.globalCompositeOperation = 'destination-out';
        const r0 = 80 + gust * 80; // coeur complètement "éteint"
        const r1 = r0 + 160 + gust * 120; // dégradé doux vers la chaleur
        const mg = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          r0,
          mouse.x,
          mouse.y,
          r1
        );
        mg.addColorStop(0.0, 'rgba(0,0,0,0.95)');
        mg.addColorStop(1.0, 'rgba(0,0,0,0)');
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, r1, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3) reset pour prochaine frame
      // @ts-ignore
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // ⚠️ laissons le canvas recevoir les events souris (donc PAS pointer-events-none)
      className={`absolute inset-0 w-full h-full filter blur-[80px] ${
        className ?? ''
      }`}
    />
  );
}
