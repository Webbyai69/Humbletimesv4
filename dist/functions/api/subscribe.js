// POST /api/subscribe → stores newsletter emails in a KV namespace bound as NEWSLETTER
export async function onRequestPost({ request, env }) {
  const { email } = await request.json().catch(() => ({}));
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response('Invalid email', { status: 400 });
  if (env.NEWSLETTER) await env.NEWSLETTER.put(email.toLowerCase(), new Date().toISOString());
  return new Response('ok');
}
