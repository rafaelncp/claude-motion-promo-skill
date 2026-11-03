// Copies the upstream render template to a separate output directory; never overwrites an existing project.
import { cpSync, copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const target = resolve(process.argv[2] || join(homedir(), 'motion-videos', 'conectamf-dre'));
if (existsSync(target)) {
  console.error('Destination already exists, refusing to overwrite: ' + target);
  process.exit(1);
}
mkdirSync(dirname(target), { recursive: true });
cpSync(join(repo, 'motion-promo', 'template'), target, { recursive: true, force: false, errorOnExist: true });
for (const file of ['scene.js', 'dre.mjs']) copyFileSync(join(here, file), join(target, file));

const page = join(target, 'index.html');
let html = readFileSync(page, 'utf8');
if (!html.includes('width:1920px; height:1080px')) throw new Error('Upstream HTML changed: review layout before rendering.');
html = html.replace('width:1920px; height:1080px', 'width:1080px; height:1920px')
  .replace('<title>Promo</title>', '<title>ConectaMF | DRE em 15 segundos</title>')
  .replace('--brand:#2E1A6E; --brand2:#5A4BB0; --accent:#B8002A; --accent-dark:#7E001D; --hi:#F7D417; --muted:#6B6785;', '--brand:#194B75; --brand2:#3E799A; --accent:#CB593C; --accent-dark:#88301C; --hi:#E2B552; --muted:#475569;')
  .replace('font-size:44px; font-weight:800;', 'font-size:35px; font-weight:800;')
  .replace('font-size:24px; font-weight:500;', 'font-size:22px; font-weight:500;');
writeFileSync(page, html);
console.log('Project ready at: ' + target);
console.log('Next: cd "' + target + '" && npm install && npx playwright install chromium');
console.log('Then preview: node render.mjs preview 0.8,2.8,5.9,8.8,11.8,14.2');
console.log('Then render (macOS/Linux/WSL/Git Bash): bash make.sh 30 "" conectamf-dre');
