import { build, files, timestamp } from '$service-worker';
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
// listen for the install events
worker.addEventListener('install', (event) => {
    // @ts-ignore
    event.waitUntil(
        caches
            .open(FILES)
            .then((cache) => cache.addAll(to_cache))
            .then(() => {
                // @ts-ignore
                worker.skipWaiting();
            })
    );
});
// listen for the activate events
worker.addEventListener('activate', (event) => {
    // @ts-ignore
    event.waitUntil(
        caches.keys().then(async (keys) => {
            // delete old caches
            for (const key of keys) {
                if (key !== FILES) await caches.delete(key);
            }
            // @ts-ignore
            worker.clients.claim();
        })
    );
});
// attempt to process HTTP requests and rely on the cache if offline
async function fetchAndCache(request) {
    const cache = await caches.open(`offline${timestamp}`);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch (err) {
        const response = await cache.match(request);
        if (response) return response;
        throw err;
    }
}
// listen for the fetch events
worker.addEventListener('fetch', (event) => {
    // @ts-ignore
    if (event.request.method !== 'GET' || event.request.headers.has('range')) return;
    // @ts-ignore
    const url = new URL(event.request.url);
    // only cache files that are local to your application
    const isHttp = url.protocol.startsWith('http');
    const isDevServerRequest =
        url.hostname === self.location.hostname && url.port !== self.location.port;
    const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
    // @ts-ignore
    const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;
    if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
        // @ts-ignore
        event.respondWith(
            (async () => {
                // always serve static files and bundler-generated assets from cache.
                // if your application has other URLs with data that will never change,
                // set this variable to true for them and they will only be fetched once.
                // @ts-ignore
                const cachedAsset = isStaticAsset && (await caches.match(event.request));
                // @ts-ignore
                return cachedAsset || fetchAndCache(event.request);
            })()
        );
    }
});