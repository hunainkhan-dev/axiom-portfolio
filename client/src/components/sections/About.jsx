import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const stats = [
  { value: 'MERN', label: 'Core stack' },
  { value: '100%', label: 'Custom-built' },
  { value: '96', label: 'Best Lighthouse' },
  { value: '24h', label: 'Reply time' },
];

const About = () => {
  const headingRef = useScrollReveal();
  const statsRef = useStaggerReveal();

  return (
    <section className="section-y relative">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div ref={headingRef}>
            <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
              (01) About
            </p>
            <h2 className="display-text text-display mb-8">
              I build <span className="italic font-light">things</span> that feel <span className="italic font-light">alive.</span>
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              I'm a self-taught developer just getting started. I build websites
              and web apps with the MERN stack, and I care a lot about interfaces
              that feel intentional and animations that respect attention.
            </p>
          </div>

          <div>
            <div className="mb-16 space-y-6 text-lg leading-relaxed text-ink-muted">
              <p>
                I care about the small stuff — the easing curve on a hover,
                the way a headline lands, the millisecond a form validates.
                Because that's what separates a website from{' '}
                <span className="text-ink">an experience.</span>
              </p>
              <p>
                I work with Next.js, React, Node, and MongoDB by default,
                with GSAP and Three.js when a project asks for craft. But my
                real toolkit is judgement — knowing what to build, what to
                cut, and what will still feel fresh in three years.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-8 border-t border-bg-border pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-ink">
                    {stat.value}
                  </div>
                  <div className="text-sm text-ink-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
