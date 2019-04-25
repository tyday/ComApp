importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

workbox.setConfig({
  debug: true
});

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute([
  {
    "url": "images/add.svg",
    "revision": "f590b0491df82f08c93de9a191434977"
  },
  {
    "url": "images/BrettHelling.jpg",
    "revision": "c9c13575b5b5865d560faecd6a1fa2b2"
  },
  {
    "url": "images/ComfestLogo-Basic-192.png",
    "revision": "102f84e7dee73b604ffe2da8e4cff355"
  },
  {
    "url": "images/ComfestLogo-Basic-48.png",
    "revision": "2486e5612a69c5dcd26c79bbf70408e7"
  },
  {
    "url": "images/ComfestLogo-Basic-512.png",
    "revision": "d889eed03f4233320c8806e1f23277f6"
  },
  {
    "url": "images/ComfestLogo-Basic-96.png",
    "revision": "906ac6fc503f422a77e56d70f4188189"
  },
  {
    "url": "images/ComfestLogo-Basic.png",
    "revision": "3d472175d2968cb978121c60d90fae7d"
  },
  {
    "url": "images/FestivalMap.svg",
    "revision": "e40206344b59318932e2246496337212"
  },
  {
    "url": "images/FunMap.svg",
    "revision": "689e2b11e646def69e0f8f4592763d3c"
  },
  {
    "url": "images/Header.svg",
    "revision": "83c2254e4d8815e807e88bc9a987ca46"
  },
  {
    "url": "images/Map.svg",
    "revision": "e194a94314effefefdb7087e674b74ba"
  },
  {
    "url": "images/Program.svg",
    "revision": "17e3290f8cee9c6c656fd3acae9e7acc"
  },
  {
    "url": "images/Program2015.jpg",
    "revision": "ae8c24e5e29764c18dca4537a08ea6b5"
  },
  {
    "url": "images/Program2016.jpg",
    "revision": "1002140e36b48511ea590e5dd802110f"
  },
  {
    "url": "images/Program2017-full.jpg",
    "revision": "eab21c2db3ee2c8628b7b90adb672aca"
  },
  {
    "url": "images/Purpose.svg",
    "revision": "1e60f4f803786f7afc9502c0dd7cfa17"
  },
  {
    "url": "images/Schedule.svg",
    "revision": "4fb3cbc284e07dbe098c7b038b74a44b"
  },
  {
    "url": "images/square-arrow.svg",
    "revision": "b37681d3083ca0134abb9e977959dbf5"
  },
  {
    "url": "images/star.svg",
    "revision": "a31df5fa9d9d850b5f8805616ed5f329"
  },
  {
    "url": "images/star2.svg",
    "revision": "100fc2d1aa7d0812d344e9aee042f8f2"
  },
  {
    "url": "images/Volunteer.svg",
    "revision": "ac8b3aede7953c918668ed357ef3525f"
  },
  {
    "url": "images/Website.svg",
    "revision": "3a3e4c01cd4d560002bbdd4d47a60da1"
  },
  {
    "url": "index.html",
    "revision": "06f68cae3a186e3becd30a63b27c0dd2"
  },
  {
    "url": "manifest.json",
    "revision": "97aed838e0ab85be037a67278ad7b741"
  },
  {
    "url": "scripts/main.js",
    "revision": "33d1ea19aac51eb256146017e5353535"
  },
  {
    "url": "service-worker-workbox.js",
    "revision": "4b0af29eb06f74b635eaa657d030fca2"
  },
  {
    "url": "styles/styles.css",
    "revision": "253baf45c9f0d5cb85dc7df0d8c77757"
  },
  {
    "url": "test_data.json",
    "revision": "1392834d251137b985f71f4e01c4dea7"
  },
  {
    "url": "test.html",
    "revision": "32e424205add49c68919ada895c67085"
  },
  {
    "url": "workbox-config.js",
    "revision": "b38118c2f2268da498050657f535f0f1"
  }
]);

workbox.routing.registerRoute(
  "https://api.comfest.com/api/performers/",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  "https://api.comfest.com/api/workshops/",
  new workbox.strategies.StaleWhileRevalidate()
);
