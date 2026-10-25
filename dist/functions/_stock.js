// Live stock lives in KV namespace STOCK (key "stock"), seeded from the catalog (src/data.js + humble-times-inventory.csv).
// STOCK_VERSION changes on every build where the stock numbers change, and a version mismatch re-seeds KV from the
// catalog — so pushing new inventory numbers always wins over what KV holds. Orders decrement KV between pushes.
// If KV is missing or unreadable the catalog numbers are used, so the shop never goes down over stock.
import { CATALOG, STOCK_VERSION } from './_catalog.js';

const fromCatalog = () => { const s = { _v: STOCK_VERSION }; for (const id in CATALOG) s[id] = { ...CATALOG[id].stock }; return s; };
const kv = env => (env && env.STOCK && typeof env.STOCK.get === 'function' && typeof env.STOCK.put === 'function') ? env.STOCK : null;

export async function getStock(env) {                // → { _v, productId: { size: qty } }
  const store = kv(env);
  if (!store) return fromCatalog();
  try {
    const s = await store.get('stock', 'json');
    if (s && typeof s === 'object' && s._v === STOCK_VERSION) return s;
    const fresh = fromCatalog();
    await store.put('stock', JSON.stringify(fresh));
    return fresh;
  } catch (e) { return fromCatalog(); }
}

export async function decrement(env, lines) {        // lines: [{id,size,qty}]
  const store = kv(env);
  if (!store) return;
  try {
    const s = await getStock(env);
    for (const l of lines) if (s[l.id] && s[l.id][l.size] != null) s[l.id][l.size] = Math.max(0, s[l.id][l.size] - l.qty);
    await store.put('stock', JSON.stringify(s));
  } catch (e) { /* a failed decrement must not fail the webhook */ }
}
