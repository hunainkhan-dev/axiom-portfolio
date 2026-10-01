const words = [
  'React',
  'Next.js',
  'Node.js',
  'MongoDB',
  'Three.js',
  'GSAP',
  'Framer Motion',
  'PostgreSQL',
  'TypeScript',
  'Tailwind',
];

const Marquee = () => {
  return (
    <section className="relative overflow-hidden border-y border-bg-border py-8 md:py-12">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="mx-8 md:mx-14 font-display text-3xl md:text-5xl font-bold text-ink/30 tracking-tighter flex items-center gap-8 md:gap-14"
          >
            {w}
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
