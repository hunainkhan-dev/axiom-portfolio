# Hunain — Portfolio

### 🔗 [**View Live Site →**](https://axiomwebbuilder.com)

Premium full-stack developer portfolio. Built with React 18, Vite, Tailwind, GSAP, Framer Motion, Three.js, and an Express + MongoDB backend for the contact form.

## Features

- **Cinematic hero** with animated 3D distorted icosahedron (React Three Fiber)
- **Custom cursor** with hover state morphing
- **Smooth scroll** via Lenis
- **Page transitions** with Framer Motion `AnimatePresence`
- **Loading screen** with progress counter on first visit
- **Scroll-driven reveals** via GSAP ScrollTrigger
- **Magnetic buttons** that follow the cursor
- **Marquee tech stack** strip
- **Interactive service accordion** with pricing
- **Testimonials carousel**
- **Project detail pages** with next-project navigation
- **Contact form** with Zod validation, rate limiting, and MongoDB persistence
- **Fully responsive** mobile → tablet → desktop
- **Custom scrollbar + selection colors**
- **Accessible** — semantic HTML, keyboard navigation, ARIA labels

## Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS 3
- React Router 6
- Framer Motion (component animations, page transitions)
- GSAP + ScrollTrigger (scroll reveals)
- React Three Fiber + Drei (3D hero)
- Lenis (smooth scroll)
- Axios (API client)
- react-hot-toast (notifications)
- lucide-react (icons)

**Backend**
- Express.js
- MongoDB + Mongoose
- Zod (validation)
- Helmet (security headers)
- express-rate-limit (rate limiting)
- express-mongo-sanitize

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (optional — server falls back to in-memory storage if MongoDB is unavailable)

### Install

```bash
# Clone or open the folder
cd portfolio

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Environment

Copy `.env.example` to `.env` in the root:

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB URI (optional for local dev).

### Run

Open two terminals:

**Terminal 1 — Frontend**
```bash
cd client
npm run dev
```
Frontend runs at http://localhost:5173

**Terminal 2 — Backend**
```bash
cd server
npm run dev
```
Backend runs at http://localhost:5000

The Vite dev server proxies `/api/*` requests to the backend automatically.

## Project Structure

```
portfolio/
├── client/                        # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # Button, CustomCursor, Loader, MagneticButton
│   │   │   ├── layout/            # Header, Footer, Layout
│   │   │   ├── sections/          # Hero, About, Work, Services, Process, Testimonials, Marquee
│   │   │   └── three/             # Sphere3D — React Three Fiber scene
│   │   ├── pages/                 # Home, Work, ProjectDetail, About, ServicesPage, Contact, NotFound
│   │   ├── hooks/                 # useLenis, useScrollReveal
│   │   ├── lib/                   # api.js, utils.js
│   │   ├── data/                  # projects, services, testimonials
│   │   ├── styles/                # globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                        # Express backend
│   ├── config/db.js
│   ├── controllers/contactController.js
│   ├── middleware/
│   ├── models/Contact.js
│   ├── routes/contactRoutes.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

## Pages

- `/` — Home (Hero, Marquee, About, Work, Services, Process, Testimonials)
- `/work` — All projects grid
- `/work/:id` — Project detail (case study)
- `/services` — Services + Process
- `/about` — About + Skills + Journey timeline
- `/contact` — Contact form with budget + project type selectors
- `/*` — 404 Not Found

## Customization

**Personal info** — Update in:
- `client/index.html` (meta tags)
- `client/src/components/layout/Header.jsx`, `Footer.jsx`
- `client/src/pages/About.jsx`, `Contact.jsx`

**Projects** — Edit `client/src/data/projects.js`

**Services + pricing** — Edit `client/src/data/services.js`

**Testimonials** — Edit `client/src/data/testimonials.js`

**Colors + fonts** — Edit `client/tailwind.config.js`

## Live demos (bundled)

Every case study links to a real, runnable demo. The six demo projects live in
sibling folders on the Desktop (`../BiteSpeed`, `../nova-commerce`,
`../atlas-analytics`, `../kairos-studio`, `../lumen`, `../orbit-studio`). They are
built as static sites and bundled into `client/public/demos/<name>/`, so a single
Vercel deploy serves the portfolio **and** all demos at `/demos/<name>/`.

**Rebuild the bundled demos anytime** (run from the `portfolio` folder):
```bash
node build-demos.mjs
```
This builds each demo with `base=/demos/<name>/` and copies the output into
`client/public/demos/`. Re-run it whenever you change a demo, then rebuild the
portfolio.

> The bundled demos are static, so BiteSpeed's menu, cart, filters and
> reservation UI all work client-side. Order/reservation *persistence* needs its
> Express backend deployed separately — link BiteSpeed's own deployment if you
> want live persistence.

## Deploy

**Frontend + demos (Vercel — one deploy)**
1. From `portfolio/`, run `node build-demos.mjs` (bundles the demos).
2. In Vercel, set the project **Root Directory** to `client`.
3. Build command `npm run build`, output `dist`.
4. `client/vercel.json` is already configured: SPA routes fall back to
   `index.html`, static `/demos/*` files are served directly, and BiteSpeed's
   client routes resolve under `/demos/bitespeed/`.
5. Set env var `VITE_API_URL` to your deployed backend URL (for the contact form).

**Backend (Railway / Render)**
- Root: `server`
- Build: `npm install`
- Start: `npm start`
- Env vars: `PORT`, `MONGODB_URI`, `CLIENT_URL`, `NODE_ENV=production`

## License

MIT — free to use as a starter for your own portfolio.
