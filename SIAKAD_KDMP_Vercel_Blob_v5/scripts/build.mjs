import { mkdir, copyFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
await mkdir('public/vendor', { recursive: true });
for (const [from,to] of [
  ['node_modules/chart.js/dist/chart.umd.js','public/vendor/chart.umd.js'],
  ['node_modules/dompurify/dist/purify.min.js','public/vendor/purify.min.js'],
  ['lib/merge.js','public/shared-merge.js'], ['lib/errors.js','public/errors.js']
]) await copyFile(from,to);
execFileSync(process.execPath, ['node_modules/tailwindcss/lib/cli.js','-i','scripts/styles.css','-o','public/app.css','--minify'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check','public/app.js'], { stdio: 'inherit' });
const { size } = await stat(path.join(root,'public/index.html'));
console.log(`Static application prepared (${size} bytes HTML). Only public/ is exposed as static files.`);
