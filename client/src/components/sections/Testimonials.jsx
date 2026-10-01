import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Testimonials = () => {
  const headingRef = useScrollReveal();
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-x">
        <div ref={headingRef} className="mb-16 md:mb-24 max-w-3xl">
          <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
            (04) Testimonials
          </p>
          <h2 className="display-text text-display">
            Words from <br />
            <span className="italic font-light">the founders.</span>
          </h2>
        </div>

        <div className="relative">
          <Quote className="absolute -top-8 -left-4 md:-top-12 md:-left-8 h-24 md:h-32 w-24 md:w-32 text-accent/10 rotate-180" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <blockquote className="mb-12 max-w-4xl">
                <p className="font-display text-3xl md:text-5xl font-medium tracking-tight leading-[1.2] text-ink">
                  "{current.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/40"
                />
                <div>
                  <div className="font-medium text-ink">{current.author}</div>
                  <div className="text-sm text-ink-muted">
                    {current.role} · {current.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-12 bg-accent' : 'w-6 bg-bg-border'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bg-border hover:border-accent hover:bg-accent hover:text-bg transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bg-border hover:border-accent hover:bg-accent hover:text-bg transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
