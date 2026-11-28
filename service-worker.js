const CACHE_NAME = "2stroke-tech-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/style.css",

  "./js/app.js",

  "./js/engine/diagnostics.js",
  "./js/engine/scoreEngine.js",
  "./js/engine/applyRules.js",

  "./js/rules/rules.js",
  "./js/rules/evidenceRules.js",
  "./js/rules/compressionRules.js",

  "./js/data/causes.js",
  "./js/data/repairs.js",
  "./js/data/procedures.js",

  "./assets/favicon-32.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/logo.png",
  "./assets/logo-transparent.png",
  "./splash-logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then((cached) => {

        const networkResponse =
          fetch(event.request)
            .then((response) => {

              if (response && response.ok) {
                const copy = response.clone();

                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, copy);
                  });
              }

              return response;
            })
            .catch(() => cached);

        return cached || networkResponse;
      })
  );
});