// Offline cache, cache-first for the app's own files. Each deploy gets its own CACHE name
// (the Pages workflow stamps in the commit SHA), so a new version downloads as a complete set
// and is used on the next launch. If you add or rename a file, add it to FILES.
// Requests to other hosts (fonts, Supabase) are left to the network.
const CACHE = 'radio-dev';
const FILES = [
  './', 'index.html', 'styles.css', 'config.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'data/pools.json', 'vendor/supabase.js',
  'src/core/progress.js', 'src/core/merge.js', 'src/core/learn.js',
  'src/storage/local.js', 'src/storage/cloud.js',
  'src/ui/app.js', 'src/ui/flags.js', 'src/ui/explain.js', 'data/explanations/e1.json', 'data/explanations/e7.json', 'data/explanations/tech.json', 'data/explanations/gen.json',
  'figs/3B1.png', 'figs/3B2.png', 'figs/3B3.png', 'figs/3C4.png', 'figs/3C5.png', 'figs/3D10.png', 'figs/3D11.png', 'figs/3D6.png', 'figs/3D7.png', 'figs/3D8.png', 'figs/3D9.png', 'figs/3E12.png', 'figs/3E13.png', 'figs/3E14.png', 'figs/3F15.png', 'figs/3F16.png', 'figs/3H17.png', 'figs/8A1.png', 'figs/8A2.png', 'figs/8A3.png', 'figs/8A4.png', 'figs/8A5.png', 'figs/8A6.png', 'figs/8A7.png', 'figs/8A8.png', 'figs/8C10.png', 'figs/8C11.png', 'figs/8C9.png', 'figs/8F12.png', 'figs/E5-1.png', 'figs/E6-1.png', 'figs/E6-2.png', 'figs/E6-3.png', 'figs/E7-1.png', 'figs/E7-2.png', 'figs/E7-3.png', 'figs/E9-1.png', 'figs/E9-2.png', 'figs/E9-3.png', 'figs/G7-1.png', 'figs/T-1.png', 'figs/T-2.png', 'figs/T-3.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE)
    .then(cache => cache.match(e.request, { ignoreSearch: true }))
    .then(hit => hit ?? fetch(e.request)));
});
