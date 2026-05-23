// 离线缓存——首次加载后，没有网络也能用
const CACHE = 'daily3-v3';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon.png',
  './xavier.jpg',
  './zayne.jpg',
  './rafayel.jpg',
  './sylus.jpg',
  './caleb.jpg',
  './kuakua.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
