// Service Worker: hält die App-Dateien für den Offline-Betrieb bereit.
// Lernstand und Login laufen über Firebase und werden hier nicht angefasst.
const CACHE = 'karteikasten-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const cacheable = u.origin === location.origin || u.host === 'www.gstatic.com' || u.host === 'fonts.googleapis.com' || u.host === 'fonts.gstatic.com';
  if (!cacheable) return;
  // Erst Netz (immer aktuell), bei fehlender Verbindung aus dem Zwischenspeicher
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok || res.type === 'opaque'){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./')))
  );
});
