const CACHE_NAME = 'ledger-v1';
const ASSETS = [
  'finance.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install the Service Worker and Cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch files from Cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
