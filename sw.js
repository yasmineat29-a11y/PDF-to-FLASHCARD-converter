const CACHE_NAME = 'flashcardit-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './sw.js'
];

// Installs and caches app files immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Clears out any old cache variants when activated
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Serves cached assets cleanly when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request) || new Response("Offline Mode Activated");
    })
  );
});
