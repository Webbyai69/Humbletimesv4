// POST /api/notify {email, sku} → back-in-stock list in KV NOTIFY (key = sku, value = JSON array of emails)
export async function onRequestPost({ request, env }) {
  const { email, sku } = await request.json().catch(() => ({}));
  if (!email || !sku || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response('Invalid', { status: 400 });
  if (env.NOTIFY) { const list = (await env.NOTIFY.get(sku, 'json')) || []; if (!list.includes(email.toLowerCase())) list.push(email.toLowerCase()); await env.NOTIFY.put(sku, JSON.stringify(list)); }
  return new Response('ok');
}
