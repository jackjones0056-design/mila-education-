const CACHE = 'mila-learning-missions-v4';
const ASSETS = [
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/icon-192.png',
  './literacy/','./literacy/index.html','./literacy/styles.css','./literacy/app.js','./literacy/manifest.webmanifest',
  './worksheets.html','./worksheets.css','./worksheets.js'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE && k.startsWith('mila-learning-missions')).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const path = new URL(event.request.url).pathname;
  const fallback = path.includes('/literacy/') ? './literacy/index.html' : './index.html';
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(fallback))));
});
