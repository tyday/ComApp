importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
workbox.precaching.cleanupOutdatedCaches()
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
    /.+\\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst()
  );
