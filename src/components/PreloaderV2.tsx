'use client';

import { useEffect, useState } from 'react'; // Ajout de useState pour l'hydratation si besoin
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoading } from '@/hooks/usePageLoading';

interface PreloaderV2Props {
  onComplete?: () => void;
}

/**
 * Preloader amélioré avec tracking des ressources réelles
 */
export default function PreloaderV2({ onComplete }: PreloaderV2Props) {
  const { progress, isLoading } = usePageLoading({
    minDuration: 1000,
    maxDuration: 4000,
  });

  // Pour éviter les erreurs d'hydratation sur le SSR avec le Math.round
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setDisplayProgress(Math.round(progress));
  }, [progress]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111] text-white"
        >
          {/* CORRECTION ICI :
            1. Ajout de `px-8` pour éviter que le texte ne touche les bords du overflow
            2. Ajout de `pb-2` pour laisser de la place aux descendeurs de la police
          */}
          <div className="relative overflow-hidden px-8 pb-2">
            <motion.h1
              initial={{ opacity: 0, y: 100 }} // On fait venir le texte de plus bas
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              // Ajout de w-full et text-center pour assurer le centrage visuel
              className="text-[12vw] md:text-[140px] font-bold font-sans tabular-nums tracking-tighter leading-none w-full text-center"
            >
              {displayProgress}%
            </motion.h1>

            {/* Indicateur de progression (Barre) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Texte de statut */}
          <motion.div
            className="mt-4 text-sm md:text-base text-white/50 font-medium uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {displayProgress < 30 && "Initialisation"}
            {displayProgress >= 30 && displayProgress < 70 && "Chargement"}
            {displayProgress >= 70 && displayProgress < 100 && "Finalisation"}
            {displayProgress === 100 && "Prêt"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}