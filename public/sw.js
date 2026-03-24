// Service Worker — caches viewed Quran page images for instant revisits.
// Cache-first strategy for page images only. All other requests pass through.

const CACHE_NAME = 'quran-pages-v1';
const MAX_CACHED_PAGES = 100; // ~30MB cap at ~300KB per image

const CACHEABLE = /\/pages\/\d+\.webp$/;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all clients immediately so the SW takes effect without reload
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

/**
 * Trim cache to MAX_CACHED_PAGES entries (FIFO — oldest evicted first).
 */
async function trimCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  if (keys.length > MAX_CACHED_PAGES) {
    const toDelete = keys.slice(0, keys.length - MAX_CACHED_PAGES);
    for (const key of toDelete) {
      await cache.delete(key);
    }
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only intercept page image requests
  if (!CACHEABLE.test(url.pathname)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached; // Instant — already in cache

      return fetch(event.request).then((response) => {
        // Only cache successful responses
        if (!response.ok) return response;

        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
          trimCache();
        });
        return response;
      });
    })
  );
});
