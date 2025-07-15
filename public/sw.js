const CACHE_NAME = "andras-pwa-cache-v1"; // Increment this version for updates!
const urlsToCache = [
  // List of assets to cache for offline use
  "/", // This is crucial for your start_url
  "/index.html",
  "/manifest.json",
  "/css/styles.min.css",
  "/js/script.js",
  "/sw.js", // Caching the service worker itself
  "/images/favicon.ico",
  "/images/icons/logo.png",
  "/images/icons/icon-48x48.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  // Add an offline page if you want a custom fallback for navigations
  // '/offline.html'
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
  // Forces the waiting service worker to become the active service worker.
  // Useful during development to see changes immediately.
  self.skipWaiting();
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
  // Ensures the service worker takes control of existing clients immediately upon activation.
  // Without this, the service worker might not control the page until the next navigation/reload.
  self.clients.claim();
});

// Fetch Event: Serve requests from cache if available, otherwise fetch from network and cache the result
self.addEventListener("fetch", (event) => {
  // We only want to handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Check if it's a non-http/https request (e.g., chrome-extension://) and skip caching
  const requestUrl = new URL(event.request.url);
  if (requestUrl.protocol !== "http:" && requestUrl.protocol !== "https:") {
    console.log(
      "Service Worker: Skipping caching for non-http/https request:",
      event.request.url
    );
    return event.respondWith(fetch(event.request)); // Let the browser handle it
  }

  // Prioritize cache first, then network, with a cache update
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If a cached response is found, return it immediately
      if (cachedResponse) {
        // console.log("Service Worker: Serving from cache:", event.request.url); // Uncomment for debugging
        return cachedResponse;
      }

      // If not in cache, go to the network
      // console.log("Service Worker: Going to network for:", event.request.url); // Uncomment for debugging
      return fetch(event.request)
        .then((networkResponse) => {
          // Check if we received a valid response from the network
          // `response.ok` covers 2xx status codes
          // `response.type === 'basic'` generally applies to same-origin requests
          if (networkResponse && networkResponse.ok) {
            const responseToCache = networkResponse.clone(); // Clone the response as it's a stream
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
              // console.log("Service Worker: Cached new response:", event.request.url); // Uncomment for debugging
            });
          }
          return networkResponse; // Return the network response whether it's cached or not
        })
        .catch((error) => {
          // --- CRITICAL FIX: PROVIDE FALLBACK FROM CACHE IF NETWORK FAILS ---
          console.error(
            "Service Worker: Fetch failed, attempting to serve from cache:",
            event.request.url,
            error
          );
          // If the network request fails, try to return a cached response as a fallback.
          // This ensures that CSS, images, etc., still load if the user is offline.
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If even the cache doesn't have it (e.g., a new asset not yet cached),
            // you can return a generic offline page for navigation requests or a blank response for assets.
            if (event.request.mode === "navigate") {
              // You might have an 'offline.html' page cached specifically for this scenario
              return caches.match("/offline.html" || "/"); // Fallback to '/' if no specific offline page
            }
            // For other asset types (CSS, images), return an empty/error response
            return new Response(null, {
              status: 503,
              statusText: "Service Unavailable (Offline)",
            });
          });
        });
    })
  );
});

// Message Event: Listen for messages from the client (e.g., to trigger skipWaiting for immediate activation)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
