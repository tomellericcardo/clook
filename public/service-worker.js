// Application cache name
const app_cache = 'clook_v1';

// Resources to cache
const offline = '/offline';
const to_cache = [
    '/scripts/ajax.js',
    '/scripts/sidebar.js',
    '/scripts/registration.js',
    '/scripts/login.js',
    '/scripts/home.js',
    '/scripts/new.js',
    '/scripts/clook.js',
    '/scripts/settings.js',
    '/styles/main.css',
    '/styles/sidebar.css',
    '/styles/clook.css',
    '/images/clook192.png',
    '/images/clook512.png'
];


// Service worker installation
self.addEventListener('install', function(event) {
    event.waitUntil(precache());
});

// Fetching resources
self.addEventListener('fetch', function(event) {
    if (event.request.method != 'GET' || event.request.mode === 'navigate') {
        event.respondWith(fetch(event.request).catch(function(error) {
            return caches.match(offline);
        }));
    } else {
        event.respondWith(fromCache(event.request));
        event.waitUntil(update(event.request));
    }
});


// Precache resources
function precache() {
    return caches.open(app_cache).then(function(cache) {
        cache.add(offline);
        return cache.addAll(to_cache);
    });
}

// Get resource from cache
function fromCache(request) {
    return caches.open(app_cache).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || fetch(request);
        });
    });
}

// Update cache
function update(request) {
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;
    return caches.open(app_cache).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}
