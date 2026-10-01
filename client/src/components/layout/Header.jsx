import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.65, 0, 0.35, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-6'
        )}
      >
        <div
          className={cn(
            'container-x flex items-center justify-between transition-all duration-500',
            scrolled && 'rounded-full border border-white/[0.08] bg-bg/60 backdrop-blur-xl py-3 px-6 max-w-4xl mx-auto'
          )}
        >
          <Link to="/" className="font-display text-xl font-bold tracking-tighter text-ink">
            Axiom<span className="text-accent">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink',
                    isActive && 'text-ink'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              as="a"
              href="/contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-soft"
              strength={0.25}
            >
              Let's talk
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden rounded-full border border-white/10 p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="container-x flex items-center justify-between py-6">
                <span className="font-display text-xl font-bold text-ink">
                  Axiom<span className="text-accent">.</span>
                </span>
                <button onClick={() => setOpen(false)} className="rounded-full border border-white/10 p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="container-x flex flex-1 flex-col justify-center gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-5xl font-bold tracking-tighter text-ink hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="container-x py-8 text-sm text-ink-muted">
                <p>axiomwebbuilder@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
