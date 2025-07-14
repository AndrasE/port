const CACHE_NAME = "andras-pwa-cache-v1";
const urlsToCache = [
  // List of assets to cache for offline use
  "/",
  "/index.html",
  "/manifest.json",
  "/css/styles.min.css",
  "/js/script.js",
  "/sw.js",
  "/images/icons/favicon.ico",
  "/images/icons/logo.png",
  "/images/icons/icon-48x48.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
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

      // --- ADD THIS CHECK HERE ---
      const requestUrl = new URL(event.request.url);
      if (requestUrl.protocol !== "http:" && requestUrl.protocol !== "https:") {
        // If it's not an http or https request (e.g., chrome-extension://),
        // just let the browser handle it without caching.
        console.log(
          "Service Worker: Skipping caching for non-http/https request:",
          event.request.url
        );
        return fetch(event.request);
      }
      // --- END OF ADDITION ---

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
          // Make sure this URL matches your actual deployed URL
          if (event.request.url === "https://andrasapplied.netlify.app/") {
            return caches.match("https://andrasapplied.netlify.app/");
          }
          // For other requests, let the browser handle the error if not in cache
          // Re-throwing the error can sometimes be beneficial for debugging in development,
          // but in production, you might want a more graceful fallback or just return new Response("")
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
