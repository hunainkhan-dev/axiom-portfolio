import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

// Submissions are emailed straight to your inbox via Web3Forms (free, no backend,
// reliable CORS). Get a free access key at https://web3forms.com (enter your
// email, the key is emailed instantly) and paste it below — nothing else needed.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = 'ecd103e7-b81e-4dbb-8dbf-84ec41261762';

const budgetOptions = [
  { value: '<1k', label: 'Less than $1,000' },
  { value: '1k-3k', label: '$1,000 – $3,000' },
  { value: '3k-6k', label: '$3,000 – $6,000' },
  { value: '6k+', label: '$6,000+' },
];

const projectTypes = [
  'Website',
  'Web App',
  'E-commerce',
  'Portfolio',
  'Landing Page',
  'Other',
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Contact — Axiom Web Builder'; }, []);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in the required fields');
      return;
    }
    setLoading(true);
    try {
      // Send as FormData (multipart) with NO application/json Content-Type.
      // That makes it a "simple" CORS request — no preflight — which is what
      // Formsubmit's AJAX endpoint accepts (JSON triggers a preflight it rejects).
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_KEY);
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('company', form.company || '—');
      fd.append('project_type', form.projectType || '—');
      fd.append('budget', form.budget || '—');
      fd.append('message', form.message);
      fd.append('subject', `New enquiry from ${form.name} — Axiom Web Builder`);
      fd.append('from_name', 'Axiom Web Builder');
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });
      const data = await res.json();
      if (res.ok && String(data.success) === 'true') {
        toast.success('Message sent! I\'ll reply within 24 hours.');
        setForm({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
      } else {
        throw new Error(data.message || 'failed');
      }
    } catch (err) {
      toast.error('Something went wrong — please email axiomwebbuilder@gmail.com directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 md:pt-40">
      <section className="container-x pb-24">
        <p className="mb-6 text-sm uppercase tracking-widest text-accent font-mono">
          Contact
        </p>
        <h1 className="display-text text-hero mb-8 max-w-4xl">
          Have a project? <br />
          <span className="italic font-light gradient-text">Let's talk.</span>
        </h1>
        <p className="max-w-xl text-xl text-ink-muted leading-relaxed">
          Tell me a bit about what you're building. I reply within 24 hours,
          usually with a proposal and a rough timeline.
        </p>
      </section>

      <section className="container-x pb-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <div className="space-y-8 text-lg">
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-soft font-mono">Email</div>
              <a href="mailto:axiomwebbuilder@gmail.com" className="btn-link">
                axiomwebbuilder@gmail.com
              </a>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-soft font-mono">Response time</div>
              <div>Within 24 hours</div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-soft font-mono">Availability</div>
              <div>Booking Q3 2026</div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-soft font-mono">Based in</div>
              <div>Pakistan · Working worldwide</div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={onSubmit}
            className="space-y-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Name*" value={form.name} onChange={onChange('name')} />
              <Field label="Email*" type="email" value={form.email} onChange={onChange('email')} />
            </div>
            <Field label="Company" value={form.company} onChange={onChange('company')} />

            <div>
              <label className="mb-4 block text-xs uppercase tracking-widest text-ink-soft font-mono">
                Project type
              </label>
              <div className="flex flex-wrap gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, projectType: type }))}
                    className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                      form.projectType === type
                        ? 'border-accent bg-accent text-bg'
                        : 'border-bg-border text-ink-muted hover:border-ink hover:text-ink'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-4 block text-xs uppercase tracking-widest text-ink-soft font-mono">
                Budget
              </label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, budget: opt.value }))}
                    className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                      form.budget === opt.value
                        ? 'border-accent bg-accent text-bg'
                        : 'border-bg-border text-ink-muted hover:border-ink hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs uppercase tracking-widest text-ink-soft font-mono">
                Tell me about your project*
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={onChange('message')}
                className="w-full resize-none rounded-2xl border border-bg-border bg-bg-soft p-5 text-ink placeholder-ink-soft focus:border-accent focus:outline-none transition-colors"
                placeholder="What are you building, what stage are you at, and what does success look like?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-bg hover:bg-accent-soft disabled:opacity-60 transition-colors"
            >
              {loading ? 'Sending...' : 'Send message'}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

const Field = ({ label, ...props }) => (
  <div>
    <label className="mb-3 block text-xs uppercase tracking-widest text-ink-soft font-mono">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-2xl border border-bg-border bg-bg-soft px-5 py-4 text-ink placeholder-ink-soft focus:border-accent focus:outline-none transition-colors"
    />
  </div>
);

export default Contact;
