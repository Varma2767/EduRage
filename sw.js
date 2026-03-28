// ═══════════════════════════════════════════════════════
//  EduManage Pro — Service Worker
//  Caches all app files for full offline functionality
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'edumanage-pro-v1';
const GOOGLE_FONTS_CACHE = 'edumanage-fonts-v1';

// Files to cache on install (app shell)
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ─── INSTALL: Cache the app shell ─────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing EduManage Pro v1...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE: Clean up old caches ────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== GOOGLE_FONTS_CACHE)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH: Serve from cache, fallback to network ─────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle Google Fonts (cache on first use)
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.open(GOOGLE_FONTS_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // For same-origin requests: Cache First, network fallback
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          // Cache valid responses
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // Offline fallback: serve index.html for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
    return;
  }

  // External requests: network only
  event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
});

// ─── BACKGROUND SYNC (future-proof) ───────────────────
self.addEventListener('sync', event => {
  console.log('[SW] Sync event:', event.tag);
});

// ─── PUSH NOTIFICATIONS (future-proof) ───────────────
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  self.registration.showNotification(data.title || 'EduManage Pro', {
    body: data.body || 'You have a new notification',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
  });
});
