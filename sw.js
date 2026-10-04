self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installé');
});

self.addEventListener('fetch', (e) => {
  // Nécessaire pour valider les critères PWA, même vide.
});