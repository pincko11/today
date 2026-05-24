const CACHE = 'daily3-v5';
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
  './kuakua.jpg',
  './avatar-lv.jpg'
];

// 安装：预缓存所有文件
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 网络优先策略：HTML 走网络（保证最新），其他文件走缓存（快）
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // HTML 和主页：网络优先，失败时用缓存
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/today/' || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // 其他文件：缓存优先，失败时用网络
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// 新版本就绪时通知所有页面自动刷新
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
