import { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Lazy-load the 3D scene so the heavy Three.js chunk doesn't block first paint.
const Sphere3D = lazy(() => import('@/components/three/Sphere3D'));

const Hero = () => {
  const sectionRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  // First visit shows the loader (~2.4s); after that, reveal promptly so the
  // hero is never sitting blank on repeat visits.
  const base = typeof window !== 'undefined' && sessionStorage.getItem('visited') ? 0.15 : 1.7;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setSpot({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const reveal = {
    hidden: { y: '110%' },
    visible: (i) => ({
      y: 0,
      transition: { duration: 1.1, delay: base + i * 0.14, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 md:pt-40"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Drifting aurora depth glows */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(212,255,0,0.10), transparent 60%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 right-0 h-[60vh] w-[60vh] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(120,90,255,0.10), transparent 60%)' }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.16, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Film grain — that expensive, tactile texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-200"
        style={{
          background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(212,255,0,0.06), transparent 45%)`,
        }}
      />

      <Suspense fallback={null}>
        <Sphere3D />
      </Suspense>

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base - 0.2 > 0 ? base - 0.2 : 0.1, duration: 0.6 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-2 w-2 animate-glow rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Available for projects · 2026
          </span>
        </motion.div>

        <h1 className="display-text text-hero mb-8 max-w-[16ch]">
          <span className="block overflow-hidden">
            <motion.span variants={reveal} initial="hidden" animate="visible" custom={0} className="block">
              Digital
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={reveal} initial="hidden" animate="visible" custom={1} className="block gradient-text italic font-light">
              craftsman
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={reveal} initial="hidden" animate="visible" custom={2} className="block">
              &amp; developer.
            </motion.span>
          </span>
        </h1>

        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.8, duration: 0.8 }}
            className="max-w-md text-lg text-ink-muted leading-relaxed text-balance"
          >
            I design and build premium websites, web apps, and interactive
            experiences for ambitious brands. Currently helping founders turn
            ideas into products that ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: base + 1, duration: 0.8 }}
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-ink-muted"
          >
            <span>Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;
