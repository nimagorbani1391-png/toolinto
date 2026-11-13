self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // فعلاً برای سادگی، درخواست‌ها را به شبکه ارسال می‌کند
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
