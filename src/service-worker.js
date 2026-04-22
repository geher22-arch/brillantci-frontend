/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

// Navigation (app shell)
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Cache images
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new CacheFirst({
    cacheName: 'brillantci-images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// Cache API (exercices, leçons) — stale while revalidate pour que l'app marche hors-ligne
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/matieres') || url.pathname.startsWith('/api/exercices'),
  new StaleWhileRevalidate({
    cacheName: 'brillantci-api',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 })],
  })
);

// API auth — toujours en ligne (pas de cache pour login/inscription)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/eleves'),
  new NetworkFirst({ cacheName: 'brillantci-auth' })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
