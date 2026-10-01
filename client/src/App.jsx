import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Loader from '@/components/ui/Loader';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import ProjectDetail from '@/pages/ProjectDetail';
import About from '@/pages/About';
import ServicesPage from '@/pages/ServicesPage';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Only show loader on first visit
    if (sessionStorage.getItem('visited')) {
      setShowLoader(false);
    } else {
      sessionStorage.setItem('visited', '1');
      const t = setTimeout(() => setShowLoader(false), 2400);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
