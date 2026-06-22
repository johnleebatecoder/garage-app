/* 掌上车库 — service worker（离线缓存）
   依赖已全部内联进 index.html，这里只缓存本地资源，不再依赖任何外部 CDN。 */
const CACHE = "garage-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./fonts/fraunces-400.woff2",
  "./fonts/fraunces-500.woff2",
  "./fonts/fraunces-600.woff2",
  "./img/hero.jpg",
  "./img/p1.jpg",
  "./img/p2.jpg",
  "./img/p3.jpg",
  "./img/p4.jpg",
  "./img/road.jpg",
];

/* 安装：预缓存核心资源 */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

/* 激活：清掉旧版本缓存（garage-v1 / v2） */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 取用：本地优先（cache-first），离线也能开；外部资源（字体等）网络优先并顺手缓存 */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
