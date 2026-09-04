/* Humble Times — site.js v3. Product data is injected as window.HT by the build. */
(() => {
const D = window.HT, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const eur = n => '€' + n.toFixed(2).replace('.', ',');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const img = (f, w = 800) => D.cdn + f + '&width=' + w;
const byId = id => D.products.find(p => p.id === id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const track = (ev, data) => { (window.dataLayer = window.dataLayer || []).push({ event: ev, ...data }); dispatchEvent(new CustomEvent('ht:' + ev, { detail: data })); };

/* ---- image fallback ---- */
const PH = t => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#EDE5D3"/><g fill="#5E1B26"><rect width="400" height="14"/><rect y="28" width="400" height="14"/><rect y="486" width="400" height="14"/><rect y="458" width="400" height="14"/></g><text x="200" y="260" text-anchor="middle" font-family="Arial" font-weight="900" font-size="26" fill="#5E1B26">${t.replace(/[<>&]/g,'')}</text><text x="200" y="290" text-anchor="middle" font-family="Arial" font-size="13" fill="#6E6759">image loads once hosted</text></svg>`);
document.addEventListener('error', e => { const i = e.target; if (i.tagName === 'IMG' && !i.dataset.ph) { i.dataset.ph = 1; i.src = PH(i.alt || 'Humble Times'); i.removeAttribute('srcset'); } }, true);

/* ---- drop countdown ---- */
const dc = $('#dropCount'); if (dc) { const t = new Date(dc.dataset.when).getTime(); const tick = () => { let d = Math.max(0, t - Date.now()); dc.innerHTML = [[86400000, 'days'], [3600000, 'hrs'], [60000, 'min'], [1000, 'sec']].map(([ms, l]) => { const v = Math.floor(d / ms); d %= ms; return `<div><b>${String(v).padStart(2, '0')}</b><span>${l}</span></div>`; }).join(''); }; tick(); setInterval(tick, 1000); }

/* ---- header ---- */
const header = $('header.site');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const mnav = $('#mobileNav');
$('#burger')?.addEventListener('click', () => { mnav.classList.add('open'); document.body.style.overflow = 'hidden'; });
$('#closeNav')?.addEventListener('click', () => { mnav.classList.remove('open'); document.body.style.overflow = ''; });

/* ---- reveals ---- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
const revealables = $$('.rv,.stagger');
revealables.forEach(el => io.observe(el));
setTimeout(() => revealables.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 1.2) el.classList.add('in'); }), 1200);
window.HT_REVEAL_ALL = () => revealables.forEach(el => el.classList.add('in'));

/* ---- toast ---- */
let tt; const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2400); };

/* ---- stock: static from data.js, overridden by /api/stock (KV) when live ---- */
const stock = {}; D.products.forEach(p => stock[p.id] = { ...(p.stock || {}) });
const inStock = (id, s) => !(id in stock) || !(s in stock[id]) || stock[id][s] > 0;
const left = (id, s) => stock[id]?.[s];
fetch('/api/stock').then(r => r.ok ? r.json() : null).then(live => { if (live && typeof live === 'object') { Object.assign(stock, live); paintStock(); } }).catch(() => {});

/* ---- cart ---- */
let cart = store.get('ht-cart') || [];
const save = () => store.set('ht-cart', cart);
const qty = () => cart.reduce((a, l) => a + l.qty, 0), total = () => cart.reduce((a, l) => a + l.qty * byId(l.id).price, 0);
const drawer = $('#drawer'), veil = $('#veil');
const openCart = () => { closeSheet(); drawer.classList.add('on'); veil.classList.add('on'); drawer.setAttribute('aria-hidden', 'false'); };
const closeCart = () => { drawer.classList.remove('on'); veil.classList.remove('on'); drawer.setAttribute('aria-hidden', 'true'); };
window.setQty = (i, q) => { if (q < 1) cart.splice(i, 1); else cart[i].qty = q; save(); renderCart(); };
function add(id, size, n = 1) { if (!inStock(id, size)) return toast('That size is sold out'); const l = cart.find(x => x.id === id && x.size === size); l ? l.qty += n : cart.push({ id, size, qty: n }); save(); renderCart(); const c = $('#cartCount'); c.classList.add('pop'); setTimeout(() => c.classList.remove('pop'), 300); toast(`Added ${byId(id).name} (${size})`); track('add_to_cart', { item_id: id, size, quantity: n, value: byId(id).price * n, currency: 'EUR' }); openCart(); }
const pairHtml = ids => `<div class="pair-row">${ids.map(byId).filter(Boolean).map(p => `<a href="/products/${p.id}/" data-qa="${p.id}"><img src="${img(p.images[0], 200)}" alt=""><span><b>${esc(p.name)}</b>${eur(p.price)} · <u>Quick add</u></span></a>`).join('')}</div>`;
function renderCart() {
  $('#cartCount').textContent = qty();
  const L = $('#lines'), F = $('#drawerFoot');
  if (!cart.length) { L.innerHTML = `<div class="cart-empty"><b>Your bag is empty</b><p>Start with The Jersey.</p><p style="margin-top:16px"><a class="btn" href="/products/ht-jersey/">Shop The Jersey</a></p></div>`; F.innerHTML = ''; return; }
  L.innerHTML = cart.map((l, i) => { const p = byId(l.id), n = left(l.id, l.size); return `<div class="line"><img src="${img(p.images[0], 300)}" alt=""><div><h4><a href="/products/${p.id}/">${esc(p.name)}</a></h4><div class="sz">Size ${l.size}${n != null && n <= 3 ? ` · <span style="color:var(--sale)">only ${n} left</span>` : ''}</div><div style="display:flex;align-items:center"><span class="qty"><button aria-label="Decrease" onclick="setQty(${i},${l.qty - 1})">−</button><output>${l.qty}</output><button aria-label="Increase" onclick="setQty(${i},${l.qty + 1})">+</button></span><button class="rm" onclick="setQty(${i},0)">Remove</button></div></div><div class="amt">${eur(p.price * l.qty)}</div></div>`; }).join('');
  const inCart = new Set(cart.map(l => l.id)); const sugg = [...new Set(cart.flatMap(l => byId(l.id).pairs || []))].filter(id => !inCart.has(id)).slice(0, 2);
  if (sugg.length) L.innerHTML += `<div class="xsell"><h4>Pair it with</h4>${pairHtml(sugg)}</div>`;
  const t = total(), lf = D.freeShip - t;
  F.innerHTML = `<div style="font-size:13px;font-weight:600">${lf > 0 ? `Add ${eur(lf)} more for free Irish delivery` : 'Free Irish delivery unlocked ✓'}</div><div class="ship-bar"><i style="width:${Math.min(100, t / D.freeShip * 100)}%"></i></div><div class="tot"><span>Subtotal</span><span>${eur(t)}</span></div><button class="btn burg full" id="checkout">Checkout — ${eur(t)}</button><div class="promo">Discount codes, Apple Pay &amp; Google Pay at checkout</div>`;
  $('#checkout').onclick = checkout;
}
async function checkout() { const b = $('#checkout'); b.disabled = true; b.textContent = 'Redirecting…'; track('begin_checkout', { value: total(), currency: 'EUR', items: cart });
  try { const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart }) }); const d = await r.json(); if (d.url) location.href = d.url; else throw new Error(d.error || ''); }
  catch (e) { toast(/sold out/i.test(e.message) ? e.message : 'Checkout isn\'t connected yet — see README'); b.disabled = false; b.textContent = 'Checkout'; } }
$('#cartBtn').onclick = openCart; $('#closeCart').onclick = closeCart; veil.onclick = () => { closeCart(); closeSheet(); closeModal(); };
addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); closeSearch(); closeSheet(); closeModal(); } });
renderCart();

/* ---- quick add: hover pills on desktop, bottom sheet on touch ---- */
const sheet = $('#sheet');
function closeSheet() { if (!sheet) return; sheet.classList.remove('on'); if (!drawer.classList.contains('on')) veil.classList.remove('on'); }
function openSheet(id) { const p = byId(id); sheet.innerHTML = `<h3>${esc(p.name)} · ${eur(p.price)}</h3><div class="hint">${esc(p.fit || 'Relaxed fit')}</div><div class="sizes">${p.sizes.map(s => `<button data-size="${s}" class="${inStock(id, s) ? '' : 'so'}"${inStock(id, s) ? '' : ' disabled'}>${s}</button>`).join('')}</div><div class="hint">Tap a size to add it to your bag</div>`; sheet.querySelectorAll('button[data-size]').forEach(b => b.onclick = () => add(id, b.dataset.size)); sheet.classList.add('on'); veil.classList.add('on'); }
document.addEventListener('click', e => {
  const pill = e.target.closest('.qa button'); if (pill) { e.preventDefault(); if (!pill.classList.contains('so')) add(pill.closest('.card').dataset.id, pill.dataset.size); return; }
  const m = e.target.closest('.qa-m'); if (m) { e.preventDefault(); openSheet(m.closest('.card').dataset.id); return; }
  const pa = e.target.closest('[data-qa]'); if (pa) { e.preventDefault(); openSheet(pa.dataset.qa); }
});
function paintStock() {
  $$('.card[data-id]').forEach(c => { const id = c.dataset.id, p = byId(id); if (!p) return; const qa = c.querySelector('.qa'); if (qa) qa.innerHTML = p.sizes.map(s => `<button data-size="${s}" class="${inStock(id, s) ? '' : 'so'}" aria-label="Add size ${s}">${s}</button>`).join('');
    const tot = p.sizes.reduce((a, s) => a + (left(id, s) ?? 99), 0); const lowEl = c.querySelector('.low'); if (lowEl) lowEl.style.display = tot <= 8 ? '' : 'none'; });
  const id = $('#addBtn')?.dataset.id; if (id) $$('#sizes button').forEach(b => { const s = b.dataset.size, n = left(id, s); b.classList.toggle('so', !inStock(id, s)); b.querySelector('.n')?.remove(); if (inStock(id, s) && n != null && n <= 3) b.insertAdjacentHTML('beforeend', `<span class="n">${n} left</span>`); });
  $('#sizes')?.classList.remove('loading');
}
paintStock();

/* ---- search ---- */
const sBox = $('#search'); function closeSearch() { sBox.classList.remove('on'); document.body.style.overflow = ''; }
$('#searchBtn').onclick = () => { sBox.classList.add('on'); document.body.style.overflow = 'hidden'; $('#q').focus(); }; $('#closeSearch').onclick = closeSearch;
$$('.search .pops button').forEach(b => b.onclick = () => { $('#q').value = b.textContent; $('#q').dispatchEvent(new Event('input')); });
$('#q').addEventListener('input', e => { const q = e.target.value.trim().toLowerCase(); const res = q ? D.products.filter(p => (p.name + ' ' + p.tags.join(' ')).toLowerCase().includes(q)) : [];
  $('#sres').innerHTML = res.map(p => `<a class="card" href="/products/${p.id}/"><span class="card-img"><img src="${img(p.images[0], 400)}" alt="${esc(p.name)}"></span><span class="card-meta"><h3>${esc(p.name)}</h3><span class="price">${eur(p.price)}</span></span></a>`).join('') || (q ? '<p>No matches — try "hoodie" or "jersey".</p>' : ''); });

/* ---- collection filters ---- */
const cg = $('#collGrid');
if (cg) { let size = ''; const draw = () => { const sort = $('#sort').value; const cards = $$('#collGrid .card'); cards.forEach(c => { c.style.display = (!size || (c.dataset.sizes.split(',').includes(size) && inStock(c.dataset.id, size))) ? '' : 'none'; }); const vis = cards.filter(c => c.style.display !== 'none'); const key = c => +c.dataset.price; if (sort === 'low') vis.sort((a, b) => key(a) - key(b)); if (sort === 'high') vis.sort((a, b) => key(b) - key(a)); if (sort === 'featured' || sort === 'new') vis.sort((a, b) => +a.dataset.order - +b.dataset.order); if (sort === 'new') vis.reverse(); vis.forEach(c => cg.appendChild(c)); $('#empty').style.display = vis.length ? 'none' : ''; $$('#filters .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.size === size)); };
  $$('#filters .chip').forEach(b => b.onclick = () => { size = b.dataset.size; draw(); }); $('#sort').onchange = draw; draw(); }

/* ---- size-guide modal ---- */
const modal = $('#modal'); function closeModal() { modal?.classList.remove('on'); }
$$('[data-modal]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); modal.classList.add('on'); }));
$('#closeModal')?.addEventListener('click', closeModal);

/* ---- delivery promise (Europe/Dublin working days) ---- */
(function deliveryPromise() {
  const el = $('#deliv'); if (!el) return;
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Dublin' }));
  const isWD = d => d.getDay() > 0 && d.getDay() < 6; const addWD = (d, n) => { d = new Date(d); while (n > 0) { d.setDate(d.getDate() + 1); if (isWD(d)) n--; } return d; };
  const beforeCut = isWD(now) && now.getHours() < D.cutoffHour; const ship = beforeCut ? new Date(now) : addWD(now, 1);
  const fmt = d => d.toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });
  let cut = ''; if (beforeCut) { const m = D.cutoffHour * 60 - (now.getHours() * 60 + now.getMinutes()); cut = `<span class="cut">Order in the next ${Math.floor(m / 60)}h ${m % 60}m and it ships today</span>`; }
  el.innerHTML = `<b>Delivery to Ireland: ${fmt(addWD(ship, 2))} – ${fmt(addWD(ship, 3))}</b><span>Ships ${beforeCut ? 'today' : fmt(ship)} from Co. Wexford · An Post tracked</span>${cut}`;
})();

/* ---- product page ---- */
const buy = $('#addBtn');
if (buy) { const id = buy.dataset.id, p = byId(id); let size = null, n = 1;
  track('view_item', { item_id: id, value: p.price, currency: 'EUR' });
  const rv = (store.get('ht-recent') || []).filter(x => x !== id); rv.unshift(id); store.set('ht-recent', rv.slice(0, 8));
  $$('#sizes button').forEach(b => b.onclick = () => { const s = b.dataset.size; $$('#sizes button').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#err').textContent = '';
    if (!inStock(id, s)) { size = null; $('#notify').classList.add('on'); $('#notify').dataset.sku = id + '-' + s; $('#stickySize').textContent = s + ' — sold out'; return; }
    size = s; $('#notify').classList.remove('on'); $('#stickySize').textContent = 'Size ' + s; });
  $('#qp').onclick = () => { n++; $('#qo').textContent = n; }; $('#qm').onclick = () => { if (n > 1) { n--; $('#qo').textContent = n; } };
  const go = () => { if (!size) { $('#err').textContent = 'Pick a size first.'; $('#sizes').scrollIntoView({ block: 'center', behavior: 'smooth' }); return; } add(id, size, n); };
  buy.onclick = go; $('#stickyAdd').onclick = go;
  const sb = $('#stickyBuy'); new IntersectionObserver(es => sb.classList.toggle('on', !es[0].isIntersecting)).observe(buy);
}
/* ---- recently viewed strip ---- */
const rec = $('#recent'); if (rec) { const ids = (store.get('ht-recent') || []).filter(i => i !== buy?.dataset.id).slice(0, 4); if (ids.length) { rec.classList.add('on'); rec.querySelector('.grid').innerHTML = ids.map(byId).filter(Boolean).map(p => `<article class="card" data-id="${p.id}"><a class="card-img" href="/products/${p.id}/"><img src="${img(p.images[0], 500)}" alt="${esc(p.name)}" loading="lazy"></a><div class="card-meta"><h3><a href="/products/${p.id}/">${esc(p.name)}</a></h3><span class="price">${eur(p.price)}</span></div></article>`).join(''); } }

/* ---- forms ---- */
document.addEventListener('submit', e => {
  const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
  if (e.target.id === 'newsForm') { e.preventDefault(); post('/api/subscribe', { email: e.target.email.value }); track('sign_up', {}); toast('You\'re on the list'); e.target.reset(); }
  if (e.target.id === 'notifyForm') { e.preventDefault(); post('/api/notify', { email: e.target.email.value, sku: e.target.closest('.notify').dataset.sku }); toast('We\'ll email you the moment it\'s back'); e.target.reset(); }
  if (e.target.id === 'contactForm') { e.preventDefault(); post('/api/contact', { name: e.target.cn.value, email: e.target.ce.value, message: e.target.cm.value }); toast('Message sent — we\'ll reply within a day'); e.target.reset(); }
});

/* ---- thank-you page ---- */
const ty = $('#orderSummary'); if (ty) { store.set('ht-cart', []); const sid = new URLSearchParams(location.search).get('session_id'); if (sid) fetch('/api/session?id=' + encodeURIComponent(sid)).then(r => r.json()).then(o => { if (!o.items) return; ty.innerHTML = `<p><b>Order ${esc(o.number || '')}</b> · ${esc(o.email || '')}</p>${o.items.map(i => `<p>${i.qty} × ${esc(i.name)} — ${eur(i.amount / 100)}</p>`).join('')}<p><b>Total ${eur(o.total / 100)}</b></p>`; track('purchase', { transaction_id: o.number, value: o.total / 100, currency: 'EUR' }); }).catch(() => {}); }

/* ---- fit quiz (Scuffers-style size recommender) ---- */
const quiz = $('#quiz');
if (quiz) {
  const ans = { size: null, usual: 0, build: 0, pref: 0, height: 178 }; let step = 0; const steps = $$('#quiz .q');
  const show = i => { step = i; steps.forEach((q, k) => q.classList.toggle('on', k === i)); $('#qstep').textContent = `${Math.min(i + 1, steps.length - 1)} / ${steps.length - 1}`; $('#qback').style.visibility = i ? 'visible' : 'hidden'; $('#qnext').textContent = i === steps.length - 2 ? 'See my size' : 'Next'; $('#qnext').style.display = i === steps.length - 1 ? 'none' : ''; };
  $$('#quiz .opts button').forEach(b => b.onclick = () => { const k = b.parentElement.dataset.k; ans[k] = isNaN(+b.dataset.v) ? b.dataset.v : +b.dataset.v; b.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#qh').oninput = e => { ans.height = +e.target.value; $('#qhv').textContent = ans.height + ' cm'; };
  const ORDER = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  const result = () => { if (!ans.size) return null; let i = ORDER.indexOf(ans.size); i += ans.usual + ans.build + ans.pref; if (ans.height >= 190) i += 1; if (ans.height <= 165) i -= 1; i = Math.max(0, Math.min(ORDER.length - 1, i)); return ORDER[i]; };
  $('#qnext').onclick = () => { if (step === 0 && !ans.size) return toast('Pick your usual size'); if (step === steps.length - 2) { const r = result(); const pid = $('#addBtn')?.dataset.id; const has = !pid || byId(pid).sizes.includes(r); $('#qres').innerHTML = `We'd go with <b>${r}</b>${pid ? (has && inStock(pid, r) ? `<span class="mute">Available for ${esc(byId(pid).name)}.</span>` : `<span class="mute">Not in stock for this piece right now — try the nearest size or join the restock list.</span>`) : ''}`; store.set('ht-fit', r); markRec(); } show(step + 1); };
  $('#qback').onclick = () => show(step - 1);
  document.addEventListener('click', e => { const a = e.target.closest('[data-quiz]'); if (a) { e.preventDefault(); show(0); $('#quizModal').classList.add('on'); } });
  $('#closeQuiz').onclick = () => $('#quizModal').classList.remove('on');
  $('#qretake')?.addEventListener('click', () => show(0));
  show(0);
}
function markRec() { const r = store.get('ht-fit'); if (!r) return; $$('#sizes button').forEach(b => b.classList.toggle('rec', b.dataset.size === r)); const f = $('#fitrec'); if (f) f.innerHTML = `Your size from the Fit Quiz: <b>${r}</b> <button data-quiz style="text-decoration:underline">retake</button>`; }
markRec();

/* ---- welcome popup (10% first order) — once per browser, after 9s or on exit intent ---- */
const pop = $('#pop');
if (pop && !store.get('ht-pop')) { let shown = false; const open = () => { if (shown) return; shown = true; pop.classList.add('on'); store.set('ht-pop', 1); };
  setTimeout(open, 9000); document.addEventListener('mouseleave', e => { if (e.clientY < 10) open(); });
  $('#popX').onclick = () => pop.classList.remove('on'); }
document.addEventListener('submit', e => { if (e.target.id === 'popForm') { e.preventDefault(); fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e.target.email.value, source: 'popup' }) }).catch(() => {}); track('sign_up', { source: 'popup' }); e.target.closest('.pop').innerHTML = `<b>You're on the list</b><p>Use code <strong>${D.welcomeCode}</strong> at checkout for 10% off your first order.</p>`; } });
})();
