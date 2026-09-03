import { useEffect, useRef } from 'react';

// Hook for buttery-smooth scroll-triggered reveal animations
export default function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('reveal-active');
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  return ref;
}
