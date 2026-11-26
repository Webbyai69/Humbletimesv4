// After a website sale, write the new counts into humble-times-inventory.csv on GitHub so the file always matches
// live stock. Without this, the next stock edit pushed from GitHub re-seeds KV from the file and "undoes" web sales.
// Needs env var GITHUB_TOKEN: a fine-grained token with Contents: Read and write on this repo only.
// Optional: GITHUB_REPO (default below), GITHUB_BRANCH (default main).
// Commits carry [skip ci] so Cloudflare doesn't rebuild the site for every order; live stock is already correct in KV,
// and the next real build reads the up-to-date file.
const FILE = 'humble-times-inventory.csv';

export async function saveSaleToGitHub(env, lines, orderNumber) {
  if (!env.GITHUB_TOKEN) return { ok: false, reason: 'GITHUB_TOKEN not set' };
  const repo = env.GITHUB_REPO || 'Webbyai69/Humbletimesv4', branch = env.GITHUB_BRANCH || 'main';
  const api = `https://api.github.com/repos/${repo}/contents/${FILE}`;
  const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'humble-times-stock', 'X-GitHub-Api-Version': '2022-11-28' };

  for (let attempt = 0; attempt < 4; attempt++) {           // retry if two orders land at once (sha conflict)
    const res = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers });
    if (!res.ok) return { ok: false, reason: `read ${res.status}` };
    const file = await res.json();
    const csv = new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\n/g, '')), c => c.charCodeAt(0)));
    const updated = applySale(csv, lines);
    if (updated === csv) return { ok: true, reason: 'nothing to change' };
    const bytes = new TextEncoder().encode(updated);
    const put = await fetch(api, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({
      message: `Stock: website order ${orderNumber} [skip ci]`,
      content: btoa(String.fromCharCode(...bytes)), sha: file.sha, branch,
    }) });
    if (put.ok) return { ok: true };
    if (put.status !== 409 && put.status !== 422) return { ok: false, reason: `write ${put.status}` };
    await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
  }
  return { ok: false, reason: 'conflict retries exhausted' };
}

// Decrement matching product_slug + size rows; quantity never goes below 0. Other lines are left byte-for-byte as they were.
export function applySale(csv, lines) {
  const nl = csv.includes('\r\n') ? '\r\n' : '\n';
  const rows = csv.split(/\r?\n/);
  const head = split(rows[0]).map(h => h.trim().toLowerCase());
  const iSlug = head.indexOf('product_slug'), iSize = head.indexOf('size'), iQty = head.indexOf('quantity');
  if (iSlug < 0 || iSize < 0 || iQty < 0) return csv;
  for (let r = 1; r < rows.length; r++) {
    if (!rows[r].trim()) continue;
    const c = split(rows[r]);
    const sold = lines.filter(l => l.id === c[iSlug]?.trim() && l.size === c[iSize]?.trim()).reduce((n, l) => n + (l.qty || 0), 0);
    if (!sold) continue;
    c[iQty] = String(Math.max(0, (parseInt(c[iQty], 10) || 0) - sold));
    rows[r] = c.join(',');
  }
  return rows.join(nl);
}

function split(line) {                                      // keeps quoted fields (with their quotes) intact
  const out = []; let cur = '', q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur); return out;
}
