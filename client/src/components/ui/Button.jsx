import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

const variants = {
  primary:
    'bg-accent text-bg hover:bg-accent-soft',
  secondary:
    'bg-white/[0.08] text-ink hover:bg-white/[0.14] border border-white/10',
  outline:
    'bg-transparent text-ink border border-white/20 hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-ink hover:bg-white/[0.06]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

const Button = forwardRef(
  ({ children, variant = 'primary', size = 'md', className, icon = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {icon && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
