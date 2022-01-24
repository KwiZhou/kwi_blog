/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "932a5301a7c002fb6a5cc752516e2e64"
  },
  {
    "url": "assets/css/0.styles.e4d8b86b.css",
    "revision": "41d77a9ad6b8cb8e4c1b61ff3f996001"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7028b0a5.js",
    "revision": "97ca743d50d4372267a336d603036c72"
  },
  {
    "url": "assets/js/11.24e021f1.js",
    "revision": "f8aab60749c65f4022b34afc1bb2bd86"
  },
  {
    "url": "assets/js/12.50f0dbf5.js",
    "revision": "a0970aec10837b7d5e494e29cf08b326"
  },
  {
    "url": "assets/js/13.bc848fb8.js",
    "revision": "f817532854c0fcd96717337e396720ba"
  },
  {
    "url": "assets/js/14.63ffa326.js",
    "revision": "7c2e69bf9cbc0e83374dfbf358af8bc3"
  },
  {
    "url": "assets/js/2.7f4d780a.js",
    "revision": "97e79970b907ec2eccbb7815be2f2393"
  },
  {
    "url": "assets/js/3.7762399e.js",
    "revision": "94a45c510cb423658009fd74955c686c"
  },
  {
    "url": "assets/js/4.1b609518.js",
    "revision": "d00ba37b91e1c1f83861ae1d0d62126c"
  },
  {
    "url": "assets/js/5.455d75bf.js",
    "revision": "0f3b0d2392a6f10ebd3e78461934811c"
  },
  {
    "url": "assets/js/6.c7b54f12.js",
    "revision": "4e35df050dc24e6b218b5b72675b65bc"
  },
  {
    "url": "assets/js/7.f39602d3.js",
    "revision": "bce4551afa8b7c5e21147cccc5f57ed4"
  },
  {
    "url": "assets/js/8.24b682ce.js",
    "revision": "9d9a078939677a4f6c82ad38a17585c6"
  },
  {
    "url": "assets/js/9.b9c9c8ce.js",
    "revision": "d08822ec1d2177359be2fb0cd53de592"
  },
  {
    "url": "assets/js/app.f74a1f92.js",
    "revision": "a43143f045d2278d50ee445920825bbc"
  },
  {
    "url": "images/kwiImg.jpg",
    "revision": "02b8af3b079abffdb0a1486c3f1d0bb1"
  },
  {
    "url": "index.html",
    "revision": "775690e534020bbded51a04b202e14b0"
  },
  {
    "url": "threesword/css/index.html",
    "revision": "446c2bce1a430fed0fadeb3feb8a79fe"
  },
  {
    "url": "threesword/html/index.html",
    "revision": "6a4254f4f8278afc0c37e6ff9f82f73f"
  },
  {
    "url": "threesword/javascript/index.html",
    "revision": "7052871b97fb1816595f3fae29268169"
  },
  {
    "url": "threesword/javascript/notes/note1_javascript.html",
    "revision": "f66256c627ee5002f22aeb1c9b48ac48"
  },
  {
    "url": "vue/index.html",
    "revision": "5e2a3a769c8a55fd9ea32ed76dc85ef3"
  },
  {
    "url": "vue/notes/note1_NavigationGuards.html",
    "revision": "df3f302ed9906851e24d730c1a37337b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
