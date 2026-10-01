import { useEffect } from 'react';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';

const ServicesPage = () => {
  useEffect(() => { document.title = 'Services — Axiom Web Builder'; }, []);

  return (
    <div className="pt-32 md:pt-40">
      <section className="container-x pb-16">
        <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
          What I do
        </p>
        <h1 className="display-text text-hero max-w-4xl">
          Services &amp; <br />
          <span className="italic font-light gradient-text">pricing.</span>
        </h1>
      </section>

      <Services />
      <Process />
    </div>
  );
};

export default ServicesPage;
