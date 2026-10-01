import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-screen items-center pt-32">
    <div className="container-x">
      <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
        Error 404
      </p>
      <h1 className="display-text text-hero mb-8">
        Lost in <br />
        <span className="italic font-light gradient-text">the void.</span>
      </h1>
      <p className="mb-10 max-w-lg text-xl text-ink-muted">
        The page you're looking for doesn't exist — maybe it was moved, or maybe
        it never was. Let's get you back somewhere useful.
      </p>
      <Link
        to="/"
        className="btn-link inline-flex items-center gap-2 text-lg"
      >
        <ArrowLeft className="h-5 w-5" /> Back home
      </Link>
    </div>
  </div>
);

export default NotFound;
