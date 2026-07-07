// Incrementing to v5 forces the browser to notice a change
const CACHE_NAME = 'commander-cache-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event - Force immediate activation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  // Forces the waiting service worker to become the active service worker
  self.skipWaiting(); 
});

// Activate Event - Wipe out any old version caches automatically
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old system cache cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Forces the page to immediately start using this new service worker script
  return self.clients.claim();
});

// Fetch Event - Serve fresh code online or fallback to cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
