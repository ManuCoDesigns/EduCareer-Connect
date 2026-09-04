import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  tone = "default",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "default" | "muted";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 ${tone === "muted" ? "bg-secondary/40" : ""} ${className}`}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

export function SectionHeading({
  title,
  lede,
  align = "left",
}: {
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`gold-rule ${align === "center" ? "mx-auto" : ""}`} />
      <h2 className="mt-4 text-3xl sm:text-4xl">{title}</h2>
      {lede && <p className="mt-3 text-muted-foreground">{lede}</p>}
    </div>
  );
}

/** Simple SEO + wayfinding breadcrumb, rendered below the header on inner pages. */
export function Breadcrumb({ trail }: { trail: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-secondary/30">
      <PageContainer className="flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
        {trail.map((t, i) => (
          <span key={t.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5" />}
            {t.href ? (
              <Link to={t.href} className="hover:text-primary">
                {t.label}
              </Link>
            ) : (
              <span className="text-foreground">{t.label}</span>
            )}
          </span>
        ))}
      </PageContainer>
    </nav>
  );
}

/** Asymmetric inner-page hero: eyebrow, headline, optional lede + actions. */
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="hero-surface">
      <PageContainer className="py-16 sm:py-20">
        {eyebrow && <p className="text-xs font-medium text-gold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
        {lede && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
            {lede}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </PageContainer>
    </section>
  );
}
