// POST /api/webhook  ← Stripe "checkout.session.completed"
// Verifies the signature, decrements stock, stores the order in KV ORDERS, emails a confirmation (Resend).
// Stripe dashboard → Developers → Webhooks → endpoint https://yourdomain/api/webhook → copy signing secret to STRIPE_WEBHOOK_SECRET
import { decrement } from '../_stock.js';
import { CATALOG } from '../_catalog.js';

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  if (env.STRIPE_WEBHOOK_SECRET) { const ok = await verify(raw, request.headers.get('stripe-signature') || '', env.STRIPE_WEBHOOK_SECRET); if (!ok) return new Response('bad signature', { status: 400 }); }
  const ev = JSON.parse(raw);
  if (ev.type !== 'checkout.session.completed') return new Response('ignored');
  const s = ev.data.object;
  const lines = (s.metadata?.items || '').split(',').filter(Boolean).map(x => { const [id, size, qty] = x.split('|'); return { id, size, qty: +qty }; });
  await decrement(env, lines);
  const order = { id: s.id, number: 'HT-' + s.id.slice(-8).toUpperCase(), email: s.customer_details?.email, name: s.customer_details?.name, total: s.amount_total, currency: s.currency, lines, shipping: s.shipping_details || s.collected_information?.shipping_details || null, created: new Date(s.created * 1000).toISOString(), status: 'paid' };
  if (env.ORDERS) await env.ORDERS.put(order.id, JSON.stringify(order));
  if (env.RESEND_API_KEY && order.email) await sendEmail(env, order);
  return new Response('ok');
}

async function sendEmail(env, o) {
  const rows = o.lines.map(l => `<tr><td style="padding:6px 0">${l.qty} × ${CATALOG[l.id]?.name || l.id} — ${l.size}</td></tr>`).join('');
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0B0A09"><div style="background:#5E1B26;color:#EDE5D3;padding:20px;font-size:22px;font-weight:900;letter-spacing:-.5px">HUMBLE TIMES</div><div style="padding:24px"><p style="font-size:18px">Go raibh maith agat, ${o.name || ''}.</p><p>Your order <b>${o.number}</b> is confirmed and will ship from Co. Wexford within 1–2 working days. You'll get a tracking number by email when it's on its way.</p><table style="width:100%;border-top:1px solid #ddd;margin:16px 0">${rows}</table><p><b>Total: €${(o.total / 100).toFixed(2)}</b></p><p style="color:#6E6759;font-size:13px">Questions? Reply to this email.</p></div></div>`;
  await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.MAIL_FROM || 'Humble Times <orders@humbletimesapparel.com>', to: o.email, bcc: env.MAIL_NOTIFY || undefined, subject: `Order ${o.number} confirmed — Humble Times`, html }) });
}

async function verify(payload, sigHeader, secret) {
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  if (!parts.t || !parts.v1) return false;
  if (Math.abs(Date.now() / 1000 - +parts.t) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${parts.t}.${payload}`));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === parts.v1;
}
