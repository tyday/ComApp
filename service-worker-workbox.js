importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

workbox.setConfig({
  debug: true
});

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  "https://api.comfest.com/api/performers/?ordering=performance_time",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  "https://api.comfest.com/api/workshops/?ordering=performance_time",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.setDefaultHandler(()=>{
  workbox.routing.registerNavigationRoute(
    // Assuming '/single-page-app.html' has been precached,
    // look up its corresponding cache key.
    workbox.precaching.getCacheKeyForURL('/index.html')
    );
})