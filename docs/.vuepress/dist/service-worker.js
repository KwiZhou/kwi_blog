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
    "revision": "3d3536eb724a26d20635df9193fdb864"
  },
  {
    "url": "assets/css/0.styles.495d9abf.css",
    "revision": "b2ecb761cfe7c5f47fe8fd3a4e1e1d04"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.2a84e4d0.js",
    "revision": "a62999e5b990ba61339375eae6968780"
  },
  {
    "url": "assets/js/11.24e021f1.js",
    "revision": "f8aab60749c65f4022b34afc1bb2bd86"
  },
  {
    "url": "assets/js/12.cee24b89.js",
    "revision": "8044fd0549adf5770c86c39d40a89466"
  },
  {
    "url": "assets/js/13.257ab326.js",
    "revision": "07c959f5b865c7694d4c963f09083c31"
  },
  {
    "url": "assets/js/14.bc9c560c.js",
    "revision": "439d7aabfd09915595cc93873a472037"
  },
  {
    "url": "assets/js/15.d0000273.js",
    "revision": "d123f51815d9a4cec9a893618c2b1a48"
  },
  {
    "url": "assets/js/16.eb1cb299.js",
    "revision": "3c2fa629005e0c66141faa11c0fd63e3"
  },
  {
    "url": "assets/js/2.7f4d780a.js",
    "revision": "97e79970b907ec2eccbb7815be2f2393"
  },
  {
    "url": "assets/js/3.5a01458f.js",
    "revision": "7b27e70b0b531c28180c6dfbb833cebf"
  },
  {
    "url": "assets/js/4.9dcd8108.js",
    "revision": "d9245f792ce58faa839e0737cb5206a1"
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
    "url": "assets/js/7.fa1c6f43.js",
    "revision": "95eabeafa1e09210a89314eff55dc0a9"
  },
  {
    "url": "assets/js/8.2477214a.js",
    "revision": "79eb7ec2255949cd844b6b4966d07e47"
  },
  {
    "url": "assets/js/9.02d842bf.js",
    "revision": "358091f5dbd1ca0ac6946ff2b5ef2a8f"
  },
  {
    "url": "assets/js/app.f0bc55ea.js",
    "revision": "97ad7dc012ccd4f8a23461a09de842ef"
  },
  {
    "url": "images/kwiImg.jpg",
    "revision": "02b8af3b079abffdb0a1486c3f1d0bb1"
  },
  {
    "url": "index.html",
    "revision": "2b89b752bed17bdaccaacd4a2b1faff7"
  },
  {
    "url": "threesword/css/index.html",
    "revision": "cc72f5640241ae32a25421900a20e653"
  },
  {
    "url": "threesword/html/index.html",
    "revision": "677c2b2d5978a6871278ec4a808a4ed1"
  },
  {
    "url": "threesword/javascript/index.html",
    "revision": "d91ddf7dec41c85e08f94e47198ab273"
  },
  {
    "url": "threesword/javascript/notes/note1_javascript.html",
    "revision": "bff20aa03d5582cdf9a0fc452d9bda06"
  },
  {
    "url": "vue/index.html",
    "revision": "6a039c55cdd3381c5e12bee626edb0b5"
  },
  {
    "url": "vue/notes/note1_NavigationGuards.html",
    "revision": "036d9f0f43635938083a015303a92456"
  },
  {
    "url": "xiaoji/index.html",
    "revision": "7ddb124c1706b99f11d86ede2fec4515"
  },
  {
    "url": "xiaoji/notes/note1_https.html",
    "revision": "98f8041541f164b24690e1df77d6c13d"
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
