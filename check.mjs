import fs from 'node:fs';
import path from 'node:path';

const slugs = ['','plans','trial','devices','faq','contact','privacy','terms'];
const errors = [];
for (const slug of slugs) {
  const html = fs.readFileSync(path.join('dist',slug,'index.html'),'utf8');
  if (!html.includes('<h1>')) errors.push(`${slug}: missing H1`);
  if (!html.includes('rel="canonical"')) errors.push(`${slug}: missing canonical`);
  for (const match of html.matchAll(/href="(\/[a-z-]*\/?)"/g)) {
    const target = path.join('dist', match[1] === '/' ? '' : match[1], 'index.html');
    if (!fs.existsSync(target)) errors.push(`${slug}: broken ${match[1]}`);
  }
}
const xml = fs.readFileSync('dist/sitemap.xml','utf8');
const count = (xml.match(/<url>/g) || []).length;
if (count !== slugs.length) errors.push(`sitemap count ${count}`);
const prices = fs.readFileSync('dist/plans/index.html','utf8');
for (const amount of ['$15.00','$26.00','$38.00','$65.00','$28.50','$260.00']) {
  if (!prices.includes(amount)) errors.push(`missing price ${amount}`);
}
if (prices.includes('24 Months')) errors.push('unexpected 24 month plan');
const trial = fs.readFileSync('dist/trial/index.html','utf8');
if (!trial.includes('$0.00')) errors.push('missing free trial price');
console.log(`Pages: ${slugs.length}; sitemap URLs: ${count}; errors: ${errors.length}`);
for (const error of errors) console.error(error);
if (errors.length) process.exitCode = 1;
