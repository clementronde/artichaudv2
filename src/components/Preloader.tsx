'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showAsh, setShowAsh] = useState(false);
  const progress = useMotionValue(0);

  // --- COULEURS DU TEXTE (Chauffe) ---
  const color = useTransform(progress, [0, 50, 85, 100], ["#444", "#a22", "#f50", "#fff"]);
  const textShadow = useTransform(progress, [60, 100], [
    "0px 0px 0px rgba(0,0,0,0)", 
    "0px 0px 50px rgba(255, 100, 0, 0.8)"
  ]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Séquence de chargement
    const controls = animate(progress, 100, {
      duration: 3,
      ease: "linear",
      onComplete: () => {
        // Fin du chargement -> déclenche l'explosion
        setLoadingComplete(true);
        setShowAsh(true);
        
        // On rend la main au site (scroll)
        document.body.style.overflow = '';
        onComplete();
      }
    });

    return () => controls.stop();
  }, [onComplete, progress]);

  return (
    <>
      <AnimatePresence>
        {!loadingComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Compteur qui chauffe */}
            <motion.h1
              style={{ color, textShadow }}
              className="relative z-10 text-[15vw] md:text-[200px] font-black font-sans tabular-nums tracking-tighter leading-none select-none"
            >
              <Counter value={progress} />
            </motion.h1>

            {/* Effet de lueur ambiante */}
            <motion.div 
                style={{ opacity: useTransform(progress, [0, 100], [0, 0.5]) }}
                className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COUCHE DE CENDRES INTERACTIVE --- */}
      {/* Reste affichée après le chargement pour le jeu de nettoyage */}
      {showAsh && <AshOverlay />}
    </>
  );
}

// ----------------------------------------------------------------------
// SOUS-COMPOSANT : GESTION DES CENDRES (CANVAS)
// ----------------------------------------------------------------------

function AshOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };
    
    // Ajuster la taille du canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Classe Particule (Cendre)
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      friction: number;
      rotation: number;
      rotSpeed: number;

      constructor() {
        // On concentre les cendres au centre (là où était le texte)
        // avec un peu de dispersion aléatoire sur l'écran
        const isCenter = Math.random() > 0.3;
        if (isCenter) {
            this.x = window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.5;
            this.y = window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight * 0.4;
        } else {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
        }

        this.vx = (Math.random() - 0.5) * 0.5; // Légère dérive initiale
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1; // Taille variable
        
        // Nuances de gris / noir / orange brulé
        const tone = Math.floor(Math.random() * 50);
        this.color = Math.random() > 0.95 
            ? `rgba(255, 69, 0, ${Math.random()})` // Quelques braises
            : `rgba(${tone}, ${tone}, ${tone}, ${Math.random() * 0.5 + 0.4})`; // Suie
            
        this.friction = 0.96; // Résistance de l'air
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        // Interaction Souris (Repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 150; // Rayon d'action de la souris

        if (distance < forceRadius) {
            const force = (forceRadius - distance) / forceRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * 15; // Puissance de la poussée

            this.vx -= Math.cos(angle) * push;
            this.vy -= Math.sin(angle) * push;
        }

        // Physique
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        // Limites (rebond léger ou disparition ?) -> On laisse sortir pour nettoyer
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        // Forme irrégulière pour faire "cendre" et pas juste "cercle"
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 400 : 1200; // Moins sur mobile
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Events
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    render();

    // Auto-clean après 8 secondes pour ne pas gêner l'UX trop longtemps
    const cleanupTimer = setTimeout(() => {
        setOpacity(0);
    }, 8000);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (opacity === 0) return null; // Désactive le rendu quand fini

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity }}
      transition={{ duration: 1 }}
      // pointer-events-none est CRUCIAL : 
      // cela permet à l'utilisateur de cliquer sur le site EN DESSOUS 
      // tout en bougeant la souris pour nettoyer les cendres visuellement.
      className="fixed inset-0 z-[9998] pointer-events-none touch-none"
    />
  );
}

// ----------------------------------------------------------------------
// UTILITAIRES
// ----------------------------------------------------------------------

function Counter({ value }: { value: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    return value.on("change", (latest: number) => {
      if (ref.current) ref.current.textContent = `${latest.toFixed(0)}%`;
    });
  }, [value]);
  return <span ref={ref} />;
}