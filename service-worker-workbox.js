importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

workbox.setConfig({
  debug: true
});

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  "https://api.comfest.com/api/performers/",
  new workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  "https://api.comfest.com/api/workshops/",
  new workbox.strategies.staleWhileRevalidate()
);
