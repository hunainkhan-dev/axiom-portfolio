import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link to={project.href} className="block">
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-card"
          style={{ '--project-color': project.color }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(180deg, transparent 40%, ${project.color}22 100%)`,
            }}
          />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider backdrop-blur-md"
              style={{ background: `${project.color}22`, border: `1px solid ${project.color}66` }}
            >
              {project.category}
            </span>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
              style={{ background: project.color, color: '#0a0a0a' }}
            >
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-ink transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-ink-soft">{project.year}</span>
        </div>
        <p className="mt-2 text-ink-muted">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-bg-border px-3 py-1 text-xs text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

const Work = () => {
  const headingRef = useScrollReveal();
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="section-y relative">
      <div className="container-x">
        <div ref={headingRef} className="mb-16 md:mb-24 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
              (02) Selected Work
            </p>
            <h2 className="display-text text-display max-w-3xl">
              Recent projects, <br />
              <span className="italic font-light">real outcomes.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="btn-link text-lg"
          >
            View all projects <ArrowUpRight className="h-5 w-5 inline" />
          </Link>
        </div>

        <div className="grid gap-10 md:gap-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
