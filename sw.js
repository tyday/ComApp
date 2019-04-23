importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

workbox.setConfig({
  debug: true
});

workbox.precaching.cleanupOutdatedCaches()
workbox.precaching.precacheAndRoute([
  {
    "url": "images/add.svg",
    "revision": "84a0b8714e7b9a611c2268e7297420d3"
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
    "revision": "8b89fd660eef7e896246d4ab2c71baeb"
  },
  {
    "url": "images/Header.svg",
    "revision": "83c2254e4d8815e807e88bc9a987ca46"
  },
  {
    "url": "images/Map.svg",
    "revision": "8dacd496550275acb50039f4aa686a6b"
  },
  {
    "url": "images/Program.svg",
    "revision": "3aeae0ffa42bc36129192fa7a03c08f0"
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
    "revision": "8f7c007967018b5eaa2c3cc49e95912a"
  },
  {
    "url": "images/Schedule.svg",
    "revision": "fe5017096e1c59c67a59d7decf44c2ed"
  },
  {
    "url": "images/square-arrow.svg",
    "revision": "157a276874dfb52b84b4cce61549d2e4"
  },
  {
    "url": "images/star.svg",
    "revision": "95ee328f97d386379bf13fc2efa55dcc"
  },
  {
    "url": "images/star2.svg",
    "revision": "d3a75ee06ebb3d44707928b075bcfd75"
  },
  {
    "url": "images/Volunteer.svg",
    "revision": "7c4303eafc266b79ce5ed2713ec3abb1"
  },
  {
    "url": "images/Website.svg",
    "revision": "4c9a7a1c25f6c4b0358bdfd3424e9786"
  },
  {
    "url": "index.html",
    "revision": "1686db405e935fe28ffd12ca6e0d8031"
  },
  {
    "url": "manifest.json",
    "revision": "90a2a7804f1cfc740fda5c16a531f1cc"
  },
  {
    "url": "scripts/main.js",
    "revision": "a3778d0e39a07db44f445ee7e27b1bf3"
  },
  {
    "url": "service-worker-workbox.js",
    "revision": "7eab8798b58e27d9326630079e100901"
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
    "revision": "4bcdcc613472037c0f9fe25df8d94ecb"
  }
]);

workbox.routing.registerRoute(
  'https://api.comfest.com/api/performers/',
  new workbox.strategies.StaleWhileRevalidate(),
);
