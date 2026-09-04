// POST /api/checkout → Stripe Checkout Session. Prices + stock are checked server-side.
import { CATALOG, FREE_SHIP_CENTS, SHIP_IE_CENTS, SHIP_EU_CENTS } from '../_catalog.js';
import { getStock } from '../_stock.js';

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'STRIPE_SECRET_KEY is not set' }, 500);
  let items; try { ({ items } = await request.json()); } catch { return json({ error: 'Bad request' }, 400); }
  if (!Array.isArray(items) || !items.length) return json({ error: 'Cart is empty' }, 400);

  const stock = await getStock(env);
  const origin = new URL(request.url).origin, f = new URLSearchParams();
  f.set('mode', 'payment'); f.set('currency', 'eur');
  f.set('success_url', `${origin}/thanks/?session_id={CHECKOUT_SESSION_ID}`); f.set('cancel_url', `${origin}/shop/`);
  f.set('allow_promotion_codes', 'true');
  f.set('phone_number_collection[enabled]', 'true');
  f.set('billing_address_collection', 'auto');
  ['IE','GB','FR','DE','ES','IT','NL','BE','PT','AT','SE','DK','FI','PL','CZ','LU'].forEach((c, i) => f.set(`shipping_address_collection[allowed_countries][${i}]`, c));
  if (env.STRIPE_TAX === 'true') f.set('automatic_tax[enabled]', 'true');

  let subtotal = 0, n = 0; const meta = [];
  for (const it of items) {
    const p = CATALOG[it.id]; const qty = Math.max(1, Math.min(10, parseInt(it.qty, 10) || 1));
    if (!p) return json({ error: `Unknown product: ${it.id}` }, 400);
    if (!p.sizes.includes(it.size)) return json({ error: `Bad size for ${p.name}` }, 400);
    const have = stock?.[it.id]?.[it.size]; if (have != null && have < qty) return json({ error: `${p.name} (${it.size}) is sold out` }, 409);
    subtotal += p.price * qty; meta.push(`${it.id}|${it.size}|${qty}`);
    f.set(`line_items[${n}][quantity]`, String(qty));
    f.set(`line_items[${n}][price_data][currency]`, 'eur');
    f.set(`line_items[${n}][price_data][unit_amount]`, String(p.price));
    f.set(`line_items[${n}][price_data][product_data][name]`, `${p.name} — ${it.size}`);
    f.set(`line_items[${n}][price_data][product_data][images][0]`, p.image);
    f.set(`line_items[${n}][price_data][product_data][metadata][sku]`, `${it.id}-${it.size}`);
    n++;
  }
  f.set('metadata[items]', meta.join(','));
  const ship = subtotal >= FREE_SHIP_CENTS
    ? [['Free delivery (Ireland)', 0, 2, 3], ['UK & EU tracked', SHIP_EU_CENTS, 4, 7]]
    : [['Ireland — An Post tracked', SHIP_IE_CENTS, 2, 3], ['UK & EU tracked', SHIP_EU_CENTS, 4, 7]];
  ship.forEach(([name, amt, min, max], i) => {
    const k = `shipping_options[${i}][shipping_rate_data]`;
    f.set(`${k}[type]`, 'fixed_amount'); f.set(`${k}[display_name]`, name);
    f.set(`${k}[fixed_amount][amount]`, String(amt)); f.set(`${k}[fixed_amount][currency]`, 'eur');
    f.set(`${k}[delivery_estimate][minimum][unit]`, 'business_day'); f.set(`${k}[delivery_estimate][minimum][value]`, String(min));
    f.set(`${k}[delivery_estimate][maximum][unit]`, 'business_day'); f.set(`${k}[delivery_estimate][maximum][value]`, String(max));
  });
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: f });
  const data = await res.json();
  if (!res.ok) return json({ error: data.error?.message || 'Stripe error' }, 502);
  return json({ url: data.url });
}
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });
