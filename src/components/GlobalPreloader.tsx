'use client';

import PreloaderV2 from '@/components/PreloaderV2';

/**
 * Wrapper global pour le Preloader
 *
 * Ce composant doit être placé dans le layout principal (layout.tsx)
 * pour s'afficher une seule fois au premier chargement de l'application
 * et ne plus jamais se réafficher lors de la navigation.
 */
export default function GlobalPreloader() {
  const handlePreloaderComplete = () => {
    // Dispatcher l'événement pour les composants qui écoutent
    // (par exemple, la navbar qui attend la fin du preloader)
    window.dispatchEvent(new Event('preloaderComplete'));
  };

  return <PreloaderV2 onComplete={handlePreloaderComplete} />;
}
