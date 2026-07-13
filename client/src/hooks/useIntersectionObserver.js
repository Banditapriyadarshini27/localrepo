import { useEffect } from 'react';

export const useIntersectionObserver = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Support prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      element.classList.add('revealed');
      return;
    }

    // Default configuration matching static site reveals
    const defaultOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px',
      ...options
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('revealed');
        observer.unobserve(element);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options]);
};
