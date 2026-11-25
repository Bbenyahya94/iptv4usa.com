import fs from 'node:fs/promises';
import path from 'node:path';

// Run at build time only. Visitors load the bundled files from this site.
const brands = {
  abc:'abc.com', cbs:'cbs.com', nbc:'nbc.com', fox:'fox.com', pbs:'pbs.org',
  espn:'espn.com', cnn:'cnn.com', 'fox-news':'foxnews.com', tnt:'tntdrama.com',
  'usa-network':'usanetwork.com', hgtv:'hgtv.com', 'food-network':'foodnetwork.com',
  discovery:'discovery.com', hallmark:'hallmarkchannel.com', univision:'univision.com',
  telemundo:'telemundo.com', netflix:'netflix.com', 'prime-video':'primevideo.com',
  'disney-plus':'disneyplus.com', hulu:'hulu.com', 'hbo-max':'hbomax.com',
  peacock:'peacocktv.com', 'paramount-plus':'paramountplus.com',
  'apple-tv':'tv.apple.com', 'youtube-tv':'tv.youtube.com', tubi:'tubitv.com',
  'pluto-tv':'pluto.tv', 'roku-channel':'therokuchannel.roku.com',
  'espn-plus':'plus.espn.com', 'sling-tv':'sling.com'
};
const output = path.resolve('dist/assets/brands');
await fs.mkdir(output,{recursive:true});
const entries = Object.entries(brands);
let current = 0;
const results = [];
async function worker() {
  while (current < entries.length) {
    const [slug,domain] = entries[current++];
    try {
      const url = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
      const response = await fetch(url,{signal:AbortSignal.timeout(15000)});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 100) throw new Error('Empty image');
      const signature = bytes.toString('hex',0,8);
      const extension = signature === '89504e470d0a1a0a' ? 'png' : signature.startsWith('ffd8ff') ? 'jpg' : null;
      if (!extension) throw new Error('Unsupported image');
      const target = path.join(output,`${slug}.${extension}`);
      await fs.writeFile(target,bytes);
      results.push(`${slug}: ${bytes.length} bytes`);
    } catch (error) {
      results.push(`${slug}: FAILED ${error.message}`);
    }
  }
}
await Promise.all(Array.from({length:6},worker));
console.log(results.join('\n'));
