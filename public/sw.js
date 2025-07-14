const CACHE_NAME = "andras-pwa-cache-v1";
const urlsToCache = [
  // List of assets to cache for offline use
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/css/style.css",
  "/js/script.js",
  "/js/sw.js",
  "/images/favicon.ico",
  "/images/logo.png",
  "/images/icon-48x48.png",
  "/images/icon-72x72.png",
  "/images/icon-96x96.png",
  "/images/icon-144x144.png",
  "/images/icon-192x192.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png",
];

// Install Event: Cache all specified assets when the service worker is installed
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install event received.");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching application shell and assets.");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error(
          "Service Worker: Failed to cache assets during install!",
          error
        );
      })
  );
});

// Fetch Event: Serve requests from cache if available, otherwise fetch from network and cache the result
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Serve the cached response if found
        return response;
      }
      // If not in cache, fetch from network and cache it for future use
      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache valid responses (status 200 and type 'basic')
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.error(
            "Service Worker: Fetch failed for:",
            event.request.url,
            error
          );
          // If the request is for the app's root URL and it fails, try to return the cached version
          // This helps the app load offline if the user visits the root URL
          if (event.request.url === "https://andrasapplied.netlify.app/") {
            return caches.match("https://andrasapplied.netlify.app/");
          }
          // For other requests, let the browser handle the error if not in cache
          throw error;
        });
    })
  );
});

// Activate Event: Remove any old caches that don't match the current cache name
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate event received.");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Message Event: Listen for messages from the client (e.g., to trigger skipWaiting for immediate activation)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
