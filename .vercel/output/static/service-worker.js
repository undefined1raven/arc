const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  s + "/_app/immutable/entry/app.dc1c0fc7.js",
  s + "/_app/immutable/nodes/0.71b44ea9.js",
  s + "/_app/immutable/nodes/1.d3989140.js",
  s + "/_app/immutable/nodes/2.5e59f313.js",
  s + "/_app/immutable/nodes/3.49815daa.js",
  s + "/_app/immutable/chunks/index.77302298.js",
  s + "/_app/immutable/chunks/scheduler.e108d1fd.js",
  s + "/_app/immutable/chunks/singletons.9723d75f.js",
  s + "/_app/immutable/entry/start.9bf17741.js"
], d = [
  s + "/favicon.png",
  s + "/icon.png",
  s + "/manifest.json"
], i = Date.now(), c = self, h = `cache${i}`, p = l.concat(d), m = new Set(p);
c.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(h).then((e) => e.addAll(p)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (e) => {
      for (const a of e)
        a !== h && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function u(t) {
  const e = await caches.open(`offline${i}`);
  try {
    const a = await fetch(t);
    return e.put(t, a.clone()), a;
  } catch (a) {
    const n = await e.match(t);
    if (n)
      return n;
    throw a;
  }
}
c.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const e = new URL(t.request.url), a = e.protocol.startsWith("http"), n = e.hostname === self.location.hostname && e.port !== self.location.port, o = e.host === self.location.host && m.has(e.pathname), r = t.request.cache === "only-if-cached" && !o;
  a && !n && !r && t.respondWith(
    (async () => o && await caches.match(t.request) || u(t.request))()
  );
});
