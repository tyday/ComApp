importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
workbox.precaching.cleanupOutdatedCaches()
workbox.precaching.precacheAndRoute([]);


workbox.routing.registerRoute(
  'https://api.comfest.com/api/performers/',
  new workbox.strategies.StaleWhileRevalidate(),
);
