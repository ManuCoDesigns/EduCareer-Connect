import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { CTASection } from "@/components/common/Blocks";
import { PROGRAMS } from "@/lib/content/programs";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/programs/")({
  head: () =>
    pageMeta({
      title: "Programs",
      description: `The six career guidance, counselling and mentorship programs delivered by ${ORG.abbreviation} for Kenyan learners under CBC.`,
      path: "/programs",
    }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Our programs"
        title="Six ways we support learners, families and schools."
        lede="Every program traces back to ECCO's constitutional objectives — practical support at each step of a learner's CBC journey."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Programs" }]} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.slug} delayMs={(i % 3) * 80}>
              <Link
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="card-elegant group flex h-full flex-col p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-lg icon-badge text-primary-foreground">
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <CTASection
          title="Bring guidance to your school"
          lede="ECCO partners with schools and county offices to run these programs directly with learners."
          primaryLabel="Get in touch"
          primaryHref="/contact"
          secondaryLabel="Become a member"
          secondaryHref="/membership"
        />
      </Section>

      <SiteFooter />
    </div>
  );
}
