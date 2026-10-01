// Builds every case-study demo as a static site and bundles it into the
// portfolio at client/public/demos/<name>/ so a single Vercel deploy serves
// the portfolio AND all live demos.
//
// Run from the portfolio folder:   node build-demos.mjs
//
// Each demo is built with base=/demos/<name>/ so its asset URLs resolve when
// served under that subpath. Vite copies public/ into dist/ on the portfolio
// build, so the demos ship automatically.

import { execSync } from 'node:child_process';
import { existsSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const demosOut = join(root, 'client', 'public', 'demos');

// name = the /demos/<name>/ path segment; src = the project folder to build.
const demos = [
  { name: 'bitespeed', src: join(root, '..', 'BiteSpeed', 'client') },
  { name: 'nova-commerce', src: join(root, '..', 'nova-commerce') },
  { name: 'atlas-analytics', src: join(root, '..', 'atlas-analytics') },
  { name: 'kairos-studio', src: join(root, '..', 'kairos-studio') },
  { name: 'lumen', src: join(root, '..', 'lumen') },
  { name: 'orbit-studio', src: join(root, '..', 'orbit-studio') },
];

mkdirSync(demosOut, { recursive: true });

for (const { name, src } of demos) {
  if (!existsSync(src)) {
    console.warn(`! skipping ${name} — source not found at ${src}`);
    continue;
  }
  console.log(`\n=== building ${name} ===`);

  if (!existsSync(join(src, 'node_modules'))) {
    console.log(`  installing deps for ${name}...`);
    execSync('npm install --no-audit --no-fund', { cwd: src, stdio: 'inherit' });
  }

  execSync(`npx vite build --base=/demos/${name}/`, { cwd: src, stdio: 'inherit' });

  const dist = join(src, 'dist');
  const dest = join(demosOut, name);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(dist, dest, { recursive: true });
  console.log(`  bundled -> client/public/demos/${name}/`);
}

console.log('\nAll demos bundled. Run `npm run build` in client/ to produce the final deploy.');
