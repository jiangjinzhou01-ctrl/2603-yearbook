import { build } from 'esbuild';
import { copyFile } from 'node:fs/promises';
await build({ entryPoints: ['src/app.js'], outfile: 'assets/app.js', bundle: true, minify: true, format: 'esm', target: ['es2020'], legalComments: 'eof' });
await copyFile('node_modules/motion/LICENSE.md', 'assets/MOTION-LICENSE.txt');
console.log('Built self-hosted animation bundle. No external CDN requests.');
