// GET /api/stock → { productId: { size: qty } }  (only when the STOCK KV namespace is bound)
import { getStock } from '../_stock.js';
export async function onRequestGet({ env }) {
  const s = await getStock(env);
  return new Response(JSON.stringify(s || {}), { status: s ? 200 : 204, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
