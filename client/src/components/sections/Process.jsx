import { useStaggerReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    duration: 'Week 1',
    description:
      'We map your goals, audience, and constraints. I audit your existing site, competitors, and inspiration. You leave with clarity.',
  },
  {
    number: '02',
    title: 'Design',
    duration: 'Week 2-3',
    description:
      'Wireframes → high-fidelity design → interactive prototype. Every screen crafted, every interaction reviewed before a single line of code.',
  },
  {
    number: '03',
    title: 'Build',
    duration: 'Week 3-5',
    description:
      'Production code with animations, integrations, and infrastructure. Weekly demos so you see progress and steer direction.',
  },
  {
    number: '04',
    title: 'Launch',
    duration: 'Week 6',
    description:
      'Testing, optimization, deployment, and handover docs. Two weeks of post-launch support included with every project.',
  },
];

const Process = () => {
  const listRef = useStaggerReveal(':scope > *', { stagger: 0.15 });

  return (
    <section className="section-y relative bg-bg-soft border-y border-bg-border">
      <div className="container-x">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
            (05) Process
          </p>
          <h2 className="display-text text-display">
            Six weeks from <br />
            <span className="italic font-light">brief to launch.</span>
          </h2>
        </div>

        <div ref={listRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-bg-border bg-bg p-8 transition-colors hover:border-accent"
            >
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-mono text-sm text-accent">{step.number}</span>
                <span className="font-mono text-xs text-ink-soft uppercase">{step.duration}</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>

              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
