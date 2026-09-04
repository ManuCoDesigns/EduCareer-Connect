import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a numeric stat value once scrolled into view. Non-numeric
 * values (e.g. "2026") render immediately with no animation — only genuine
 * counts get the count-up treatment.
 */
export function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numeric = /^\d+$/.test(value) ? Number(value) : null;
  const [display, setDisplay] = useState(numeric === null ? value : "0");
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(numeric * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-l-2 border-gold pl-4">
      <p ref={ref} className="font-display text-3xl text-primary sm:text-4xl">
        {display}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
