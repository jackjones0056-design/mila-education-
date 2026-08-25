const CACHE = 'mila-learning-missions-v7';
const ASSETS = [
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/icon-192.png',
  './literacy/','./literacy/index.html','./literacy/styles.css','./literacy/app.js','./literacy/data.js','./literacy/manifest.webmanifest','./literacy/sw.js',
  './worksheets.html','./worksheets.css','./worksheets.js','./update.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k.startsWith('mila-learning-missions'))
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const fallback = url.pathname.includes('/literacy/') ? './literacy/index.html' : './index.html';
          return caches.match(fallback);
        }
        return Response.error();
      })
  );
});
