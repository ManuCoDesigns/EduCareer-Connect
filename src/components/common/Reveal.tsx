import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps children in a scroll-triggered fade/slide-up reveal. Visible by
 * default (no JS / IntersectionObserver support just means no animation,
 * never hidden content). Stagger multiple Reveals in the same view with the
 * `delayMs` prop for a single orchestrated moment, not per-card randomness.
 */
export function Reveal({
  children,
  delayMs = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  as?: "div" | "li";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={visible ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
