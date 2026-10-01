import { useStaggerReveal } from '@/hooks/useScrollReveal';

const recognitions = [
  { label: 'BiteSpeed', note: 'Full-stack cloud-kitchen app' },
  { label: 'Nova', note: 'E-commerce store, working cart' },
  { label: 'Atlas', note: 'SaaS analytics dashboard' },
  { label: 'Kairos', note: 'Cinematic agency site' },
];

const clients = [
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'Tailwind',
  'GSAP',
];

const Recognition = () => {
  const gridRef = useStaggerReveal(':scope > *', { stagger: 0.1, y: 30 });

  return (
    <section className="section-y border-t border-bg-border">
      <div className="container-x">
        <p className="mb-12 text-sm uppercase tracking-widest text-ink-soft font-mono">
          Recent builds &amp; tools I use
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bg-border bg-bg-border md:grid-cols-4"
        >
          {recognitions.map((r) => (
            <div key={r.label} className="bg-bg p-8 md:p-10">
              <div className="mb-2 font-display text-xl md:text-2xl font-bold tracking-tight text-ink">
                {r.label}
              </div>
              <div className="text-sm text-ink-muted">{r.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 md:gap-x-16">
          {clients.map((c) => (
            <span
              key={c}
              className="font-display text-2xl md:text-3xl font-bold tracking-tighter text-ink/25 transition-colors hover:text-ink/60"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recognition;
