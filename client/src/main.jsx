import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/globals.css';

// The build prerenders each route to static HTML (see prerender.mjs) so crawlers
// and AI/agentic bots get full content without running JS. On the client we mount
// fresh over that HTML with createRoot — this heavily-animated app (framer-motion
// entry animations + intro loader) can't hydrate cleanly, and a fresh mount avoids
// hydration-mismatch errors while the static content still serves SEO.
const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
