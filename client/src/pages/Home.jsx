import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Recognition from '@/components/sections/Recognition';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';

const Home = () => {
  useEffect(() => {
    document.title = 'Axiom Web Builder — Premium Websites & Web Apps';
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Recognition />
      <Services />
      <Process />
    </>
  );
};

export default Home;
