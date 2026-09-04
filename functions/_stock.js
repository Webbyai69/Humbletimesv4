// Live stock lives in KV namespace STOCK (key "stock"). Seeded from the catalog on first read.
import { CATALOG } from './_catalog.js';
export async function getStock(env) {
  if (!env.STOCK) return null;                       // no KV bound → static stock from data.js is used client-side
  let s = await env.STOCK.get('stock', 'json');
  if (!s) { s = {}; for (const id in CATALOG) s[id] = { ...CATALOG[id].stock }; await env.STOCK.put('stock', JSON.stringify(s)); }
  return s;
}
export async function decrement(env, lines) {       // lines: [{id,size,qty}]
  if (!env.STOCK) return;
  const s = await getStock(env);
  for (const l of lines) if (s[l.id] && s[l.id][l.size] != null) s[l.id][l.size] = Math.max(0, s[l.id][l.size] - l.qty);
  await env.STOCK.put('stock', JSON.stringify(s));
}
