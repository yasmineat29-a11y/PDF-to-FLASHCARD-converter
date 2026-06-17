self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Let network tasks execute naturally
  e.respondWith(fetch(e.request).catch(() => new Response("Offline Mode Activated")));
});
