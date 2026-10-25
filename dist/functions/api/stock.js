// GET /api/stock → { productId: { size: 1|0 } } — in stock / sold out only.
// Real quantities stay server-side so shoppers can't see stock counts.
import { getStock } from '../_stock.js';
export async function onRequestGet({ env }) {
  const { _v, ...stock } = await getStock(env);
  const out = {};
  for (const id in stock) { out[id] = {}; for (const s in stock[id]) out[id][s] = (stock[id][s] || 0) > 0 ? 1 : 0; }
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
