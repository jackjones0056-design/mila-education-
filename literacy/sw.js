const CACHE = 'kindergarten-literacy-mission-v6';
const ASSETS = ['./','./index.html','./styles.css','./app.js','./data.js','./manifest.webmanifest','./worksheets.html','./worksheets.css','./wsdata.js','./wsrender.js','./update.html','../icons/icon-192.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE && (
      k.startsWith('kindergarten-literacy-mission') ||
      k.startsWith('mila-learning-missions') ||
      k.startsWith('kindergarten-math-mission')
    )).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const request=event.request;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith(fetch(request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}
    return response;
  }).catch(async()=>{
    const cached=await caches.match(request);
    if(cached)return cached;
    if(request.mode==='navigate')return caches.match('./index.html');
    return Response.error();
  }));
});