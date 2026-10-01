import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal a single element on scroll.
 * Uses gsap.context + fromTo so React 18 StrictMode double-mounts revert
 * cleanly and never leave elements stuck at opacity:0.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: options.y ?? 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 1,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 88%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Reveal direct children with a stagger on scroll.
 */
export const useStaggerReveal = (childSelector = ':scope > *', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y: options.y ?? 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.9,
          stagger: options.stagger ?? 0.1,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 82%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Split a heading into words and reveal them with a mask-up stagger.
 * Pass a ref'd element containing plain text.
 */
export const useTextReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('[data-word]');
      if (!words.length) return;
      gsap.fromTo(
        words,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 85%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};
