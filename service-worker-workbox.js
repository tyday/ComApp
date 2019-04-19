importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
workbox.precaching.cleanupOutdatedCaches()
workbox.precaching.precacheAndRoute([]);


workbox.routing.registerRoute(
  'http://192.168.1.12:8000/api/performers/',
  new workbox.strategies.StaleWhileRevalidate(),
);
