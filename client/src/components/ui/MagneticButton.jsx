import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const MagneticButton = ({ children, className, strength = 0.35, as: Tag = 'button', ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <Tag
      ref={ref}
      className={cn('transition-transform duration-300 ease-out will-change-transform', className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
