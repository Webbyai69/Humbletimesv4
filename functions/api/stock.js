// GET /api/stock → { productId: { size: qty } }  — live KV stock when bound, otherwise the catalog numbers
import { getStock } from '../_stock.js';
export async function onRequestGet({ env }) {
  const { _v, ...stock } = await getStock(env);
  return new Response(JSON.stringify(stock), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
