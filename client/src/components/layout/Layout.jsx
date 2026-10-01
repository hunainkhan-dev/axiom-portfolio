import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { useLenis } from '@/hooks/useLenis';

const Layout = () => {
  const location = useLocation();
  useLenis();

  // Recalculate ScrollTrigger positions after each route's content mounts.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-bg noise-bg">
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#151515',
            color: '#f5f5f5',
            border: '1px solid #1f1f1f',
          },
        }}
      />
    </div>
  );
};

export default Layout;
