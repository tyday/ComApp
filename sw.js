importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

workbox.setConfig({
  debug: false
});

workbox.precaching.cleanupOutdatedCaches();
workbox.precaching.precacheAndRoute([
  {
    "url": "images/2018-Comfest_Robert-Berry-248_300.jpg",
    "revision": "fdbad0027aa0b0c6eaef4d5d1b7760e6"
  },
  {
    "url": "images/add.svg",
    "revision": "84a0b8714e7b9a611c2268e7297420d3"
  },
  {
    "url": "images/COMFEST_1A_06222018_IMGL0447_1_300.jpg",
    "revision": "4ff8c3130b38409ac2cb99bc1c505f67"
  },
  {
    "url": "images/ComFest_2019_1.jpg",
    "revision": "92ad292dbb2e17047092f330a34f2126"
  },
  {
    "url": "images/ComFest2019_Map.png",
    "revision": "a94558fcd4333c116856ccc24c3cca81"
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
    "url": "images/cropped-Header2019.png",
    "revision": "c5659d8366de2b3d7b3590eaf886afbb"
  },
  {
    "url": "images/First-Aid-1-300x200.jpg",
    "revision": "96f4fe09775576abf39b96d74127df51"
  },
  {
    "url": "images/Header.svg",
    "revision": "83c2254e4d8815e807e88bc9a987ca46"
  },
  {
    "url": "images/Icons_Favorites-Off.svg",
    "revision": "035545f9e5ecdd0e95a5d24c234eec80"
  },
  {
    "url": "images/Icons_Favorites-On.svg",
    "revision": "f55df16a13fc4321edefa364db5ad064"
  },
  {
    "url": "images/Icons_Favorites.svg",
    "revision": "5fc77eac839f04ad27a75e79f89b599a"
  },
  {
    "url": "images/Icons_Filter_2.svg",
    "revision": "1aa923d5745b1be6b839c511dbdb1d35"
  },
  {
    "url": "images/Icons_Map.svg",
    "revision": "663c0488201af420d4605c6f74aa1761"
  },
  {
    "url": "images/Icons_Menu_2.svg",
    "revision": "5b079ec82fa92031ad309d77f93d4580"
  },
  {
    "url": "images/Icons_Program.svg",
    "revision": "722053e0d522414224881b7aec08f9ed"
  },
  {
    "url": "images/Icons_Purpose.svg",
    "revision": "c9a132d2e300d2c077191dd9c3bdb847"
  },
  {
    "url": "images/Icons_Settings.svg",
    "revision": "c2c5572fb64d4ccab810ecbce893d390"
  },
  {
    "url": "images/Icons_Speakers_Workshops.svg",
    "revision": "fe5c7bf5aa618be725c16dbe1e658f57"
  },
  {
    "url": "images/Icons_Stage_Schedule.svg",
    "revision": "5dc193c476973abd9c0d76aeeddd32a9"
  },
  {
    "url": "images/Icons_Street_Fair.svg",
    "revision": "7ebd84f19ad7a07453a659e50fb31677"
  },
  {
    "url": "images/Icons_Tips_Info.svg",
    "revision": "1d7475daf3cec907dd50f578f56d72de"
  },
  {
    "url": "images/Icons_Volunteer.svg",
    "revision": "be4f2b399205eb65fc0bc29b23655c2c"
  },
  {
    "url": "images/Icons_Website.svg",
    "revision": "10557f9a25194909bea4056f360595d1"
  },
  {
    "url": "images/square-arrow.svg",
    "revision": "157a276874dfb52b84b4cce61549d2e4"
  },
  {
    "url": "images/Volunteer-Now.jpg",
    "revision": "ae83cde1c1ef2c2e14c6fcc7aeb05826"
  },
  {
    "url": "index.html",
    "revision": "e1d1eea2e96b10ff3c4ccaa15cb7784b"
  },
  {
    "url": "manifest.json",
    "revision": "97aed838e0ab85be037a67278ad7b741"
  },
  {
    "url": "scripts/main.js",
    "revision": "eee81c0cb5f2e25092dd76688050a7d9"
  },
  {
    "url": "service-worker-workbox.js",
    "revision": "a6db48a569678c7148aa0bbeea77fd08"
  },
  {
    "url": "styles/styles.css",
    "revision": "f5ece7ddf00df91e8a61b07884a63ffa"
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
  "https://api.comfest.com/api/performers/?ordering=performance_time",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  "https://api.comfest.com/api/workshops/?ordering=performance_time",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  "/assets/ComFest_2019.pdf",
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.setDefaultHandler(()=>{
  workbox.routing.registerNavigationRoute(
    // Assuming '/single-page-app.html' has been precached,
    // look up its corresponding cache key.
    workbox.precaching.getCacheKeyForURL('/index.html')
    );
})