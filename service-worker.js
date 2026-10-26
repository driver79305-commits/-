const V='mateen-v1',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'],
EXT=['https://cdn.tailwindcss.com/3.4.17','https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);await Promise.allSettled(EXT.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r))))}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!/^https?:/.test(r.url))return;
e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')&&res.status!==206){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>h||(r.mode==='navigate'?caches.match('./index.html'):Response.error()));return h||n}))});
