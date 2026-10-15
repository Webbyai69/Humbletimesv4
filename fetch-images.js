// Downloads every product photo listed in src/data.js (IMAGE_SOURCES) into dist/images/.
// Run automatically by build.js. Writes dist/images/.failed.json with any file it couldn't fetch.
const fs = require('fs'), path = require('path');
const D = require('./src/data.js');
const dir = path.join(__dirname, 'dist', 'images');
fs.mkdirSync(dir, { recursive: true });
(async () => {
  const failed = [];
  for (const [file, url] of Object.entries(D.imageSources || {})) {
    const dest = path.join(dir, file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) continue;
    try {
      const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status);
      fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
      console.log('images: saved', file);
    } catch (e) { console.warn('images: could not fetch', file, '-', e.message); failed.push(file); }
  }
  fs.writeFileSync(path.join(dir, '.failed.json'), JSON.stringify(failed));
})();
