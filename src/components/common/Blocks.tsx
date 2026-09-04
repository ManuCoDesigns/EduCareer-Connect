import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedStat } from "@/components/common/AnimatedStat";
import type { Stat } from "@/lib/content/misc";
import type { TeamMember } from "@/lib/content/team";
import type { Testimonial } from "@/lib/content/misc";
import type { BlogPost } from "@/lib/content/gallery-blog";

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <AnimatedStat key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  );
}

export function CTASection({
  title,
  lede,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  lede: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="hero-surface pattern-topo relative overflow-hidden rounded-2xl p-8 sm:p-12">
      <div
        className="gradient-blob gradient-blob-gold -right-12 -top-12 size-64"
        aria-hidden="true"
      />
      <div className="relative max-w-xl">
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-3 text-primary-foreground/80">{lede}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link to={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold/60 bg-transparent text-gold hover:bg-gold hover:text-gold-foreground"
            >
              <Link to={secondaryHref}>
                {secondaryLabel} <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          className="mb-4 size-16 rounded-full object-cover"
        />
      ) : (
        <div className="icon-badge mb-4 flex size-16 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground">
          {member.role
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
      )}
      <h3 className="text-lg">{member.role}</h3>
      <p className="mt-0.5 text-sm font-medium text-primary">{member.name}</p>
      <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card-elegant flex h-full flex-col p-6">
      <Quote className="size-6 text-gold" />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-border pt-4">
        <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="card-elegant group flex flex-col p-6"
    >
      <p className="text-xs font-medium text-primary">{post.category}</p>
      <h3 className="mt-3 text-xl leading-snug group-hover:text-primary">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{date}</span>
        <span>{post.readMinutes} min read</span>
      </div>
    </Link>
  );
}
