// POST /api/contact {name,email,message} → forwards to MAIL_NOTIFY via Resend (if configured), else stores in KV CONTACT
export async function onRequestPost({ request, env }) {
  const { name, email, message } = await request.json().catch(() => ({}));
  if (!email || !message) return new Response('Invalid', { status: 400 });
  const safe = s => String(s).slice(0, 2000).replace(/[<>]/g, '');
  if (env.RESEND_API_KEY && env.MAIL_NOTIFY) await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.MAIL_FROM || 'Humble Times <orders@humbletimesapparel.com>', to: env.MAIL_NOTIFY, reply_to: email, subject: `Website message from ${safe(name || email)}`, text: `${safe(name)} <${safe(email)}>\n\n${safe(message)}` }) });
  else if (env.CONTACT) await env.CONTACT.put(`${Date.now()}-${safe(email)}`, JSON.stringify({ name, email, message }));
  return new Response('ok');
}
