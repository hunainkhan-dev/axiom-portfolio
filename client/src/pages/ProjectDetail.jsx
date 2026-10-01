import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Quote, ExternalLink } from 'lucide-react';
import { getProjectById, projects } from '@/data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = getProjectById(id);

  useEffect(() => {
    if (project) document.title = `${project.title} — Axiom Web Builder`;
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="pt-32 md:pt-40">
      {/* Header */}
      <section className="container-x pb-14">
        <Link to="/work" className="btn-link mb-14 inline-flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted font-mono">
          <span style={{ color: project.color }}>{project.category}</span>
          <span className="text-ink-soft">/</span>
          <span>{project.year}</span>
          <span className="text-ink-soft">/</span>
          <span>{project.role}</span>
        </div>

        <h1 className="display-text text-hero mb-6 max-w-5xl">{project.title}</h1>
        <p className="mb-10 max-w-3xl text-2xl md:text-3xl text-ink-muted leading-snug text-balance">
          {project.tagline}
        </p>

        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-medium text-bg transition-transform hover:scale-[1.03]"
            style={{ background: project.color }}
          >
            View live demo
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </section>

      {/* Hero image */}
      <section className="container-x pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/9] overflow-hidden rounded-3xl"
          style={{ background: `${project.color}15` }}
        >
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `linear-gradient(180deg, transparent 60%, ${project.accent}cc 100%)` }}
          />
        </motion.div>
      </section>

      {/* Meta bar */}
      <section className="border-y border-bg-border bg-bg-soft">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {[
            { label: 'Client', value: project.client },
            { label: 'Timeline', value: project.duration },
            { label: 'Role', value: project.role },
            { label: 'Year', value: String(project.year) },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-soft font-mono">
                {item.label}
              </div>
              <div className="text-lg text-ink">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-24">
          <h2 className="text-sm uppercase tracking-widest text-accent font-mono">Overview</h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-2xl md:text-3xl leading-relaxed text-ink text-balance"
          >
            {project.overview}
          </motion.p>
        </div>
      </section>

      {/* Challenge + Solution */}
      <section className="pb-8">
        <div className="container-x grid gap-14 md:grid-cols-2 md:gap-20">
          {[
            { label: 'The Challenge', body: project.challenge },
            { label: 'The Solution', body: project.solution },
          ].map((block, i) => (
            <motion.div
              key={block.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="rounded-3xl border border-bg-border p-8 md:p-10"
              style={i === 1 ? { borderColor: `${project.color}33`, background: `${project.color}08` } : {}}
            >
              <h3 className="mb-5 text-sm uppercase tracking-widest font-mono" style={{ color: project.color }}>
                {block.label}
              </h3>
              <p className="text-lg text-ink-muted leading-relaxed">{block.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <section className="section-y">
          <div className="container-x space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="aspect-[16/10] overflow-hidden rounded-3xl bg-bg-card"
            >
              <img src={project.gallery[0]} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {project.gallery.slice(1).map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="aspect-[4/3] overflow-hidden rounded-3xl bg-bg-card"
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {project.features?.length > 0 && (
        <section className="section-y border-t border-bg-border">
          <div className="container-x">
            <h2 className="mb-14 md:mb-20 display-text text-display max-w-2xl">
              What I <span className="italic font-light">built.</span>
            </h2>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-bg-border bg-bg-border md:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="group bg-bg p-8 md:p-10 transition-colors hover:bg-bg-card"
                >
                  <div
                    className="mb-6 flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm"
                    style={{ background: `${project.color}18`, color: project.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {project.process?.length > 0 && (
        <section className="section-y bg-bg-soft border-y border-bg-border">
          <div className="container-x">
            <h2 className="mb-14 md:mb-20 display-text text-display max-w-2xl">
              The <span className="italic font-light">process.</span>
            </h2>
            <div className="space-y-0">
              {project.process.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="grid gap-4 border-t border-bg-border py-8 md:grid-cols-[160px_200px_1fr] md:items-baseline md:gap-8"
                >
                  <span className="font-mono text-sm" style={{ color: project.color }}>
                    {step.phase}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg text-ink-muted leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      <section className="section-y">
        <div className="container-x">
          <div
            className="rounded-3xl border p-10 md:p-16"
            style={{ borderColor: `${project.color}33`, background: `${project.color}08` }}
          >
            <h3 className="mb-12 text-sm uppercase tracking-widest font-mono" style={{ color: project.color }}>
              The Impact
            </h3>
            <div className="grid gap-12 md:grid-cols-3">
              {project.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div
                    className="font-display text-6xl md:text-7xl font-bold tracking-tighter mb-3"
                    style={{ color: project.color }}
                  >
                    {m.value}
                  </div>
                  <div className="mb-1 text-base text-ink font-medium uppercase tracking-wide">
                    {m.label}
                  </div>
                  {m.context && <div className="text-sm text-ink-muted">{m.context}</div>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      {project.quote && (
        <section className="section-y border-t border-bg-border">
          <div className="container-x max-w-4xl">
            <Quote className="mb-8 h-12 w-12 rotate-180" style={{ color: `${project.color}44` }} />
            <blockquote className="mb-10 font-display text-3xl md:text-5xl font-medium leading-[1.2] tracking-tight text-ink text-balance">
              "{project.quote.text}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-bold"
                style={{ background: `${project.color}22`, color: project.color }}
              >
                {project.quote.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-ink">{project.quote.author}</div>
                <div className="text-sm text-ink-muted">
                  {project.quote.role ? `${project.quote.role} · ` : ''}
                  {project.quote.company}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-bg-border">
        <Link
          to={nextProject.href}
          className="group container-x flex flex-col justify-between gap-6 py-16 md:flex-row md:items-center md:py-24"
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-ink-muted font-mono">
              Next project
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-ink transition-colors group-hover:text-accent">
              {nextProject.title}
            </h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-bg-border transition-colors group-hover:bg-accent group-hover:text-bg md:h-24 md:w-24">
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45 md:h-8 md:w-8" />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetail;
