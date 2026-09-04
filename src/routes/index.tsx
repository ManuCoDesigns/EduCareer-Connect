import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "@/assets/Logo.png.asset.json";
import profile from "@/assets/profile.jpeg.asset.json";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeading, PageContainer } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { StatStrip, CTASection, TestimonialCard } from "@/components/common/Blocks";
import { PROGRAMS, VALUES } from "@/lib/content/programs";
import { STATS, TESTIMONIALS } from "@/lib/content/misc";
import { ORG } from "@/lib/content/site";
import { pageMeta, organizationSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: ORG.name,
      description: ORG.description,
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <SiteHeader />

      <main>
        {/* Hero — asymmetric, angular photo frame + live-feeling stat strip
            instead of the centered gradient + circular photo pattern. */}
        <section className="hero-surface pattern-topo overflow-hidden">
          <div
            className="gradient-blob gradient-blob-gold -right-10 top-10 size-80"
            aria-hidden="true"
          />
          <div
            className="gradient-blob gradient-blob-leaf -bottom-32 -left-10 size-72"
            aria-hidden="true"
          />
          <PageContainer className="grid items-center gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
            <div>
              <p className="reveal-on-load flex items-center gap-2 text-xs font-medium text-gold">
                <Sparkles className="size-4" /> Registered NGO · Wote, Makueni County
              </p>
              <h1
                className="reveal-on-load mt-5 text-4xl leading-[1.08] sm:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                Guiding competence,
                <br />
                shaping futures.
              </h1>
              <p
                className="reveal-on-load mt-6 max-w-lg text-base leading-relaxed text-primary-foreground/85"
                style={{ animationDelay: "160ms" }}
              >
                {ORG.description}
              </p>
              <div
                className="reveal-on-load mt-9 flex flex-wrap gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <Button asChild size="lg" variant="secondary">
                  <Link to="/membership">Become a member</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gold/60 bg-transparent text-gold hover:bg-gold hover:text-gold-foreground"
                >
                  <Link to="/programs">
                    Explore programs <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className="reveal-on-load relative mx-auto w-full max-w-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute -inset-4 -z-10 rounded-[2rem] border border-gold/25" />
              <div className="overflow-hidden rounded-[1.75rem] shadow-elegant">
                <img
                  src={profile.url}
                  alt={`${ORG.founder}, founder of ${ORG.name}, at her desk`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl bg-background p-3 pr-5 shadow-elegant">
                <img src={logo.url} alt="" className="size-11 object-contain" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{ORG.founder}</p>
                  <p className="text-xs text-muted-foreground">Founder, {ORG.abbreviation}</p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        <section className="border-b border-border bg-secondary/40">
          <PageContainer className="py-12">
            <StatStrip stats={STATS} />
          </PageContainer>
        </section>

        <Section>
          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionHeading title="Who we are" />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {ORG.abbreviation} ({ORG.name}) is a non-profit body registered in Kenya with its
                office in {ORG.location}. We exist to close the gap between classroom learning and
                real career pathways — supporting CBC implementation, nurturing mental wellness, and
                building partnerships that carry learners from school into the job market.{" "}
                {ORG.abbreviation} was founded by {ORG.founder}.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {VALUES.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary"
                  >
                    {v}
                  </span>
                ))}
              </div>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Read our full story <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  k: "Vision",
                  v: "A leading organization transforming learners into competent, purpose-driven individuals.",
                },
                {
                  k: "Mission",
                  v: "Accessible and impactful career guidance aligned with the Competency-Based Curriculum.",
                },
                {
                  k: "Mandate",
                  v: "Non-profit, non-political and non-religious — serving every learner.",
                },
              ].map((i) => (
                <div key={i.k} className="pathway-node relative pl-0 lg:pl-1">
                  <h3 className="text-lg text-primary">{i.k}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeading
            title="What we do"
            lede="Six focus areas drawn directly from our constitutional objectives."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.slug} delayMs={(i % 3) * 80}>
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="card-elegant group block p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg icon-badge text-primary-foreground">
                    <p.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="What our community says" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name + t.role} delayMs={i * 80}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="muted">
          <CTASection
            title="Ready to guide your next step?"
            lede="Join ECCO as a member, or reach out to bring career guidance to your school."
            primaryLabel="Become a member"
            primaryHref="/membership"
            secondaryLabel="Contact us"
            secondaryHref="/contact"
          />
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
