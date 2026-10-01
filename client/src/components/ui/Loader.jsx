import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] flex items-end justify-between px-6 pb-10 pt-6 md:px-12 md:pb-16 bg-bg noise-bg"
        >
          <div className="flex items-baseline gap-3">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-ink"
            >
              HUNAIN
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-2 w-2 rounded-full bg-accent"
            />
          </div>

          <div className="flex items-baseline gap-4">
            <motion.span
              key={Math.min(100, Math.round(progress))}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-4xl md:text-6xl font-bold text-ink"
            >
              {Math.min(100, Math.round(progress)).toString().padStart(3, '0')}
            </motion.span>
            <span className="text-lg text-ink-muted">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
