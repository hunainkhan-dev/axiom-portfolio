import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStaggerReveal } from '@/hooks/useScrollReveal';

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  Backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  '3D & Motion': ['Three.js', 'React Three Fiber', 'WebGL', 'Blender', 'Lenis'],
  Tools: ['Git', 'Vite', 'Docker', 'Vercel', 'Figma', 'Postman'],
};

const timeline = [
  {
    year: 'Now',
    title: 'Taking on first client work',
    description: 'Building premium websites and web apps for founders and small businesses, and looking for my first paid projects.',
  },
  {
    year: 'Recently',
    title: 'Building a real portfolio',
    description: 'Built six real, working projects — an e-commerce store, a SaaS dashboard, a full-stack cloud-kitchen app, and more — to prove out what I can do.',
  },
  {
    year: 'Started',
    title: 'Learning to code',
    description: 'Self-taught from scratch, obsessed with web animation and building interfaces that feel considered.',
  },
];

const AboutPage = () => {
  useEffect(() => { document.title = 'About — Axiom Web Builder'; }, []);
  const timelineRef = useStaggerReveal(':scope > *', { stagger: 0.15 });

  return (
    <div className="pt-32 md:pt-40">
      <section className="container-x pb-24">
        <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
          About
        </p>
        <h1 className="display-text text-hero mb-16 max-w-4xl">
          Hi, I'm <span className="italic font-light gradient-text">Hunain</span>.
        </h1>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] overflow-hidden rounded-2xl bg-bg-card"
          >
            <img
              src="/me.jpeg"
              alt="Hunain — founder of Axiom Web Builder"
              className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.style.opacity = '0'; }}
            />
          </motion.div>

          <div className="space-y-8 text-lg text-ink leading-relaxed">
            <p>
              I'm a self-taught full-stack developer based in Pakistan, early in my
              journey and building in public. I design and build websites and web
              apps with the MERN stack, and the projects on this site are real,
              working things I've built to sharpen my craft.
            </p>
            <p className="text-ink-muted">
              I started with a simple obsession: making the web feel more like the
              curated experiences I grew up loving in film, print, and industrial
              design. Websites that respect attention, reward curiosity, and hold
              up to real use.
            </p>
            <p className="text-ink-muted">
              I'm now looking to take on my first client projects. If you're
              weighing whether to work together, know this: I don't do beige. I do
              quiet confidence, deliberate motion, and clean code — and I'll put
              real care into your project because I'm building my reputation on it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-bg-border bg-bg-soft section-y">
        <div className="container-x">
          <h2 className="mb-16 display-text text-display">Skills &amp; toolkit</h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((s) => (
                    <li key={s} className="text-lg text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="mb-16 display-text text-display">The journey</h2>
          <div ref={timelineRef} className="space-y-12">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid gap-6 border-t border-bg-border pt-12 md:grid-cols-[200px_1fr]"
              >
                <div className="font-mono text-2xl text-accent">{item.year}</div>
                <div>
                  <h3 className="mb-3 font-display text-3xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg text-ink-muted max-w-2xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
