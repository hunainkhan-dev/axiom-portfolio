/**
 * Static prerender step for the Axiom Web Builder SPA.
 *
 * Vite ships an empty `<div id="root"></div>` shell, which search engines and
 * AI/agentic crawlers that don't run JS see as a blank page. This script boots
 * the built app in headless Chrome, waits for each route to render, and writes
 * a fully-populated static HTML file per route into dist/. The live app then
 * hydrates on top of it (see src/main.jsx), so users get the exact same SPA.
 *
 * Runs automatically after `vite build`. Uses the system Chrome via
 * puppeteer-core (no Chromium download). Override the browser with CHROME_PATH.
 */
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const SITE = process.env.SITE_ORIGIN || 'https://axiomwebbuilder.com';
const PORT = 51789;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ routes */
// Per-route <title> and meta description. Keeps every page unique for SEO
// (previously all 11 pages shared one title/description).
const projectMeta = {
  'bitespeed':       ['BiteSpeed — Premium Cloud Kitchen Platform', 'A full-stack cloud-kitchen platform with live ordering, persistent cart, table reservations and a password-gated kitchen dashboard. React, Express, MongoDB.'],
  'nova-commerce':   ['Nova Commerce — Fashion E-commerce Concept', 'An editorial fashion storefront with a WebGL fabric viewer, GSAP scroll storytelling and a fully working cart. Built with React and React Three Fiber.'],
  'atlas-analytics': ['Atlas Analytics — SaaS Dashboard Concept', 'A SaaS analytics dashboard built around one hero metric, with hand-built SVG charts and a cohort retention heatmap. React and Tailwind.'],
  'kairos-agency':   ['Kairos Studio — Cinematic Creative Studio Site', 'A cinematic creative-studio site with a Three.js particle hero, GSAP-pinned scroll sequences and a context-aware cursor.'],
  'lumen-fintech':   ['Lumen — Neobank Landing Concept', 'A conversion-focused neobank landing page with an interactive product demo, animated explainers and a two-tap waitlist. Framer Motion.'],
  'orbit-portfolio': ['Orbit Studio — Design Studio Portfolio Concept', 'A high-polish design-studio portfolio with a magnetic cursor, buttery Locomotive smooth scroll and GSAP image reveals. Built with Astro.'],
};

const routes = [
  { path: '/',         title: 'Axiom Web Builder — Premium Websites & Web Apps', desc: 'Axiom Web Builder designs and builds premium, custom websites and web apps for businesses worldwide. Fast, secure, and beautifully designed.' },
  { path: '/work',     title: 'Work & Case Studies — Axiom Web Builder', desc: 'Selected projects by Axiom Web Builder: a cloud-kitchen platform, e-commerce, SaaS dashboards, 3D/WebGL sites and more.' },
  { path: '/services', title: 'Services — Web Design, Web Apps & 3D Experiences | Axiom Web Builder', desc: 'Custom website design, web app development, e-commerce storefronts and premium 3D/WebGL experiences. Fast, secure, SEO-ready builds.' },
  { path: '/about',    title: 'About Hunain — Full-Stack Web Developer | Axiom Web Builder', desc: 'Hunain, founder of Axiom Web Builder — a full-stack developer building premium, custom websites and web apps for clients worldwide.' },
  { path: '/contact',  title: 'Contact — Hire Axiom Web Builder', desc: 'Get a quote for a premium website or web app. Email hunain@axiomwebbuilder.com or send a message through the contact form.' },
  ...Object.entries(projectMeta).map(([id, [title, desc]]) => ({
    path: `/work/${id}`, title: `${title} | Axiom Web Builder`, desc,
  })),
];

/* ------------------------------------------------------------------ chrome */
function findChrome() {
  const LOCALAPPDATA = process.env.LOCALAPPDATA || '';
  const PROGFILES = process.env['PROGRAMFILES'] || 'C:/Program Files';
  const PROGFILESX86 = process.env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)';
  const candidates = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    path.join(PROGFILES, 'Google/Chrome/Application/chrome.exe'),
    path.join(PROGFILESX86, 'Google/Chrome/Application/chrome.exe'),
    LOCALAPPDATA && path.join(LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    path.join(PROGFILES, 'Microsoft/Edge/Application/msedge.exe'),
    path.join(PROGFILESX86, 'Microsoft/Edge/Application/msedge.exe'),
    '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p));
}

/* ------------------------------------------------ tiny static file server */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.txt': 'text/plain',
  '.xml': 'application/xml', '.map': 'application/json', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(DIST, urlPath);
      const ext = path.extname(filePath);
      if (ext && existsSync(filePath)) {
        const buf = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        return res.end(buf);
      }
      // SPA fallback: every route serves the original shell so the client renders it
      const shell = await readFile(path.join(DIST, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(shell);
    } catch (e) {
      res.writeHead(500);
      res.end('prerender server error: ' + e.message);
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/* ------------------------------------------------------------- html rewrite */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rewriteHead(html, route) {
  const url = SITE + (route.path === '/' ? '/' : route.path);
  const t = esc(route.title);
  const d = esc(route.desc);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);
  html = html.replace(/(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${d}$2`);
  html = html.replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${t}$2`);
  html = html.replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${d}$2`);
  html = html.replace(/(<meta\s+property="og:url"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${url}$2`);
  html = html.replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${t}$2`);
  html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${d}$2`);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[\s\S]*?("\s*\/?>)/i, `$1${url}$2`);

  // Breadcrumb structured data for the deep work/* pages
  if (route.path.startsWith('/work/')) {
    const id = route.path.split('/').pop();
    const name = (projectMeta[id]?.[0] || 'Project').split('—')[0].trim();
    const crumb = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Work', item: SITE + '/work' },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    };
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(crumb)}</script>\n</head>`);
  }
  return html;
}

/* ------------------------------------------------------------------- crawl */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        const h = document.body.scrollHeight;
        y += Math.max(400, window.innerHeight * 0.9);
        window.scrollTo(0, y);
        if (y >= h) { window.scrollTo(0, 0); resolve(); }
        else setTimeout(step, 120);
      };
      step();
    });
  });
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const chrome = findChrome();
  if (!chrome) {
    // On Vercel/CI (no Chrome) skip prerender — the SPA still works for users.
    // Run locally (`npm run build`) to generate prerendered pages for SEO.
    console.warn('\n[prerender] No Chrome found — skipping prerender (CI/serverless environment).\n');
    process.exit(0);
  }
  console.log('[prerender] using browser:', chrome);

  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--hide-scrollbars', '--mute-audio',
      '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    ],
  });

  // Home is written last so the SPA-fallback shell stays original during the crawl.
  const pending = [];
  let done = 0, failed = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });
    // Skip the intro loader so it never gets baked into the static HTML
    await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem('visited', '1'); } catch (e) {} });
    // Block external images/fonts/media: the tags stay in the HTML (crawlable),
    // but we never hang waiting on slow third-party (Unsplash/Fontshare) requests.
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      const type = r.resourceType();
      const external = !r.url().startsWith(ORIGIN);
      if (external && (type === 'image' || type === 'font' || type === 'media' || type === 'stylesheet')) r.abort().catch(() => {});
      else r.continue().catch(() => {});
    });
    try {
      await page.goto(ORIGIN + route.path, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForSelector('footer', { timeout: 20000 }).catch(() => {});
      await page.waitForFunction(() => !document.querySelector('[class*="z-[9999]"]'), { timeout: 5000 }).catch(() => {});
      await autoScroll(page);
      await sleep(600);
      await page.evaluate(() => {
        document.querySelectorAll('[class*="z-[9999]"]').forEach((el) => el.remove());
      });
      let html = await page.content();
      const textLen = await page.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim().length);
      html = rewriteHead(html, route);
      const ok = textLen > 400;
      if (!ok) failed++;
      console.log(`[prerender] ${ok ? 'OK ' : 'THIN'} ${route.path.padEnd(22)} text=${textLen}`);
      if (route.path === '/') pending.push({ route, html });
      else {
        const outDir = path.join(DIST, route.path);
        await mkdir(outDir, { recursive: true });
        await writeFile(path.join(outDir, 'index.html'), html, 'utf-8');
        done++;
      }
    } catch (e) {
      failed++;
      console.error(`[prerender] FAIL ${route.path}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  for (const { html } of pending) { await writeFile(path.join(DIST, 'index.html'), html, 'utf-8'); done++; }
  server.close();

  console.log(`[prerender] wrote ${done}/${routes.length} pages${failed ? `, ${failed} thin/failed` : ''}.`);
  if (done === 0) process.exit(1);
}

main().catch((e) => { console.error('[prerender] fatal:', e); process.exit(1); });
