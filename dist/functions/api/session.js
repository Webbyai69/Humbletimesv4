// GET /api/session?id=cs_… → order summary for the thank-you page (no card data ever returned)
export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !/^cs_/.test(id) || !env.STRIPE_SECRET_KEY) return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}?expand[]=line_items`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
  const s = await r.json();
  if (!r.ok) return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
  const out = { number: 'HT-' + s.id.slice(-8).toUpperCase(), email: s.customer_details?.email, total: s.amount_total, items: (s.line_items?.data || []).map(l => ({ name: l.description, qty: l.quantity, amount: l.amount_total })) };
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
