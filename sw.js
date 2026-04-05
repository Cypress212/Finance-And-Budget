const CACHE_NAME = 'commander-v1';
const ASSETS = [
  'finance.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install: Save the app files to the phone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: Serve the app from the phone's memory, even without internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
