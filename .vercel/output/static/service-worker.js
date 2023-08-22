const t = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), r = [
  t + "/_app/immutable/entry/app.089bb2b6.js",
  t + "/_app/immutable/nodes/0.e26692fd.js",
  t + "/_app/immutable/nodes/1.36c97c8c.js",
  t + "/_app/immutable/nodes/2.38d6700e.js",
  t + "/_app/immutable/assets/3.e6d5e579.css",
  t + "/_app/immutable/nodes/3.92cfb29c.js",
  t + "/_app/immutable/chunks/index.790afe26.js",
  t + "/_app/immutable/chunks/index.79de4c8c.js",
  t + "/_app/immutable/chunks/scheduler.4342e115.js",
  t + "/_app/immutable/chunks/singletons.d455a578.js",
  t + "/_app/immutable/entry/start.f616cce8.js"
], m = [
  t + "/favicon.png",
  t + "/icon.png",
  t + "/manifest.json"
], o = Date.now(), c = self, p = `cache${o}`, h = r.concat(m), u = new Set(h);
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(p).then((s) => s.addAll(h)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== p && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function d(e) {
  const s = await caches.open(`offline${o}`);
  try {
    const a = await fetch(e);
    return s.put(e, a.clone()), a;
  } catch (a) {
    const n = await s.match(e);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.protocol.startsWith("http"), n = s.hostname === self.location.hostname && s.port !== self.location.port, i = s.host === self.location.host && u.has(s.pathname), l = e.request.cache === "only-if-cached" && !i;
  a && !n && !l && e.respondWith(
    (async () => i && await caches.match(e.request) || d(e.request))()
  );
});
