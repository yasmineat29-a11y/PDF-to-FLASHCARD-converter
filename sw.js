const CACHE_NAME = 'flashcardit-cache-v3'; // Changed v2 to v3
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './sw.js',
  'https://cdn-icons-png.flaticon.com/512/2702/2702134.png' // Added your new icon to cache
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

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

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Prioritize cache for speed, fallback to network
      return cachedResponse || fetch(e.request);
    })
  );
});
