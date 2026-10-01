import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const WorkPage = () => {
  useEffect(() => {
    document.title = 'Work — Axiom Web Builder';
  }, []);

  return (
    <div className="pt-32 md:pt-40">
      <section className="container-x pb-16">
        <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
          Selected Projects
        </p>
        <h1 className="display-text text-hero max-w-4xl">
          Work I'm <br />
          <span className="italic font-light gradient-text">proud of.</span>
        </h1>
      </section>

      <section className="container-x pb-32">
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              className={`grid gap-10 md:gap-16 md:grid-cols-2 md:items-center ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Link to={project.href} className="group block">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{ background: `${project.color}15` }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(45deg, ${project.color}44, transparent)` }}
                  />
                </div>
              </Link>

              <div>
                <div className="mb-4 flex items-center gap-4 text-sm text-ink-muted font-mono">
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.category}</span>
                </div>
                <h2 className="mb-4 font-display text-4xl md:text-6xl font-bold tracking-tighter">
                  {project.title}
                </h2>
                <p className="mb-6 text-lg text-ink-muted leading-relaxed max-w-lg">
                  {project.overview}
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-bg-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Link to={project.href} className="btn-link text-lg">
                    View case study <ArrowUpRight className="inline h-5 w-5" />
                  </Link>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg transition-colors hover:text-accent"
                      style={{ color: project.color }}
                    >
                      Live demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
