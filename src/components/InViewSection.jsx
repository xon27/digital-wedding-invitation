import { useRef, useState, useEffect } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1,
};

/**
 * Wraps content and adds class "is-in-view" when the wrapper enters the viewport.
 * Use with CSS so sections animate when they scroll into focus.
 */
export default function InViewSection({ children, className = '', ...props }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, defaultOptions);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`in-view-section ${isInView ? 'is-in-view' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
