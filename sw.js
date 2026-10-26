var CACHE = "cw-entry-v1";
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(["./", "manifest.json", "icons/pwa-192.png", "icons/pwa-512.png", "icons/apple-touch-icon.png"]);
  }).catch(function(){}));
  self.skipWaiting();
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET" || e.request.mode === "navigate") return;
  e.respondWith(
    caches.match(e.request).then(function(hit){ return hit || fetch(e.request); }).catch(function(){})
  );
});
