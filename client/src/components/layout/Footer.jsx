import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-bg-soft border-t border-bg-border">
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-ink-muted mb-6">
              Have a project?
            </p>
            <h2 className="display-text text-6xl md:text-8xl mb-10">
              Let's build
              <br />
              <span className="text-accent italic font-light">something great.</span>
            </h2>
            <MagneticButton
              as="a"
              href="mailto:axiomwebbuilder@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-bg hover:bg-accent-soft"
              strength={0.2}
            >
              axiomwebbuilder@gmail.com
              <ArrowUpRight className="h-5 w-5" />
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-self-end md:text-right">
            <div>
              <h2 className="mb-6 text-xs uppercase tracking-widest text-ink-muted">
                Navigate
              </h2>
              <ul className="space-y-3">
                {['Home', 'Work', 'Services', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="btn-link text-lg"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-xs uppercase tracking-widest text-ink-muted">
                Connect
              </h2>
              <ul className="space-y-3">
                {[
                  { label: 'Email', href: 'mailto:axiomwebbuilder@gmail.com' },
                  { label: 'Instagram', href: 'https://instagram.com/axiomwebdeveloper' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn-link text-lg">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col-reverse items-start justify-between gap-6 border-t border-bg-border pt-8 md:flex-row md:items-center">
          <p className="font-mono text-xs text-ink-soft">
            © {new Date().getFullYear()} Axiom Web Builder. Built with obsession.
          </p>
          <p className="font-mono text-xs text-ink-soft">
            Based in Pakistan · Working worldwide
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none font-display text-[20vw] font-black leading-none tracking-tighter text-ink/[0.02]"
        style={{ transform: 'translateY(30%)' }}
      >
        AXIOM
      </div>
    </footer>
  );
};

export default Footer;
