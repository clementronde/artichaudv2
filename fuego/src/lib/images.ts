/**
 * Attend que toutes les images de la page soient téléchargées puis décodées (ou en erreur), en signalant la progression.
 * Toutes les images du site sont en chargement immédiat (loading="eager") : le rideau d'ouverture ne se lève qu'une fois
 * le site entièrement chargé. `maxMs` borne l'attente sur une connexion très lente.
 */
export function waitForImages(onProgress: (ratio: number) => void, maxMs = 8000): Promise<void> {
  const imgs = Array.from(document.images);
  const total = imgs.length;
  let done = 0;
  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      onProgress(1);
      resolve();
    };
    const timer = setTimeout(finish, maxMs);
    const tick = () => {
      done += 1;
      onProgress(done / total);
      if (done >= total) Promise.all(imgs.map((i) => i.decode?.().catch(() => undefined))).then(finish);
    };
    onProgress(0);
    if (!total) return finish();
    imgs.forEach((img) => {
      if (img.complete) tick();
      else {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true });
      }
    });
  });
}
