import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { services } from '@/data/services';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ServiceRow = ({ service, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className="group border-b border-bg-border"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-8 md:py-10 text-left transition-colors hover:text-accent"
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span className="font-mono text-sm text-ink-soft">{service.number}</span>
          <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tighter">
            {service.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:block font-mono text-sm text-ink-muted">
            From ${service.startingAt}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-bg-border group-hover:border-accent group-hover:bg-accent group-hover:text-bg transition-colors"
          >
            <Plus className="h-5 w-5" />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="overflow-hidden"
      >
        <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1fr] md:pb-14">
          <div>
            <p className="text-sm uppercase tracking-widest text-accent font-mono mb-4">
              {service.tagline}
            </p>
            <p className="text-lg text-ink-muted leading-relaxed">
              {service.description}
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-ink-soft font-mono mb-4">
              What's included
            </p>
            <ul className="space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const headingRef = useScrollReveal();
  const [openId, setOpenId] = useState(services[0].id);

  return (
    <section id="services" className="section-y relative bg-bg-soft">
      <div className="container-x">
        <div ref={headingRef} className="mb-16 md:mb-24 max-w-3xl">
          <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
            (03) Services
          </p>
          <h2 className="display-text text-display">
            How I can <br />
            <span className="italic font-light">help you.</span>
          </h2>
        </div>

        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              isOpen={openId === service.id}
              onToggle={() => setOpenId(openId === service.id ? null : service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
