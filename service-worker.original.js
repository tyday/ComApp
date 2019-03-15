// from export.habernashing.com
var CACHE_NAME = 'CPWA-lcl-cache-v0.01';
var urlsToCache = [
  '/',
  // '/index.html',
  '/styles/styles.css',
  '/scripts/main.js',
  '/images/FestivalMap.svg',
  '/images/FunMap.svg',
  '/images/Header.svg',
  '/images/Map.svg',
  '/images/Program.svg',
  '/images/Purpose.svg',
  '/images/Schedule.svg',
  '/images/star.svg',
  '/images/star2.svg',
  '/images/Volunteer.svg',
  '/images/Website.svg',
  '/images/ComfestLogo-Basic-48.png',
  '/images/ComfestLogo-Basic-96.png',
  '/images/ComfestLogo-Basic-192.png',
  '/images/ComfestLogo-Basic-512.png',
  '/images/ComfestLogo-Basic.png'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
  console.log('SW activated')
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!CACHE_NAME.includes(key)) { //if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});


self.addEventListener('fetch', function (event) {
    // console.log(event);
  var requestUrl = new URL(event.request.url);
  // if (requestUrl.hostname == 'exp.habernashing.com') {
  if (requestUrl.hostname == 'localhost') {
  // if (requestUrl.hostname == '127.0.0.1') {
  // if (requestUrl.hostname == 'tyday.net') {


    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function (response) {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function (cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  }
  });
  
