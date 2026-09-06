import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { TeamCard } from "@/components/common/Blocks";
import { FOUNDER, GOVERNANCE, GOVERNANCE_NOTE } from "@/lib/content/team";
import { VALUES } from "@/lib/content/programs";
import { MEMBERSHIP_TIERS } from "@/lib/content/misc";
import { ORG } from "@/lib/content/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About us",
      description: `Learn about ${ORG.name} (${ORG.abbreviation}) — our mission, values, founder and governance structure.`,
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              ["Home", "/"],
              ["About", "/about"],
            ]),
          ),
        }}
      />
      <SiteHeader />
      <PageHero
        eyebrow="About ECCO"
        title="Closing the gap between classroom and career."
        lede={`${ORG.abbreviation} is a non-profit registered in Kenya, working alongside schools, families and employers so every learner leaves school with a clear, confident next step.`}
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading title="Our story" />
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {ORG.name} ({ORG.abbreviation}) was founded by {ORG.founder} to address a gap many
              Kenyan learners face: strong classroom performance without a clear sense of what comes
              next. Based in {ORG.location}, ECCO delivers career guidance, counselling and
              mentorship aligned with the Competency-Based Curriculum (CBC), helping learners,
              parents and teachers navigate pathway decisions with confidence.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We operate as a non-profit, non-political and non-religious organization, open to any
              learner regardless of background — because we believe every young person deserves a
              real pathway from education into purposeful work.
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
          </div>

          <figure className="card-elegant overflow-hidden p-0">
            <img
              src="/images/victoria-about.jpg"
              alt={`${ORG.founder}, founder of ${ORG.name}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="border-t border-border bg-card px-5 py-4">
              <p className="font-semibold text-primary">{FOUNDER.name}</p>
              <p className="text-sm text-muted-foreground">
                {FOUNDER.role} — {ORG.abbreviation}
              </p>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Vision, mission & mandate"
          lede="The principles that shape every program we run."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
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
            <div key={i.k}>
              <div className="gold-rule" />
              <h3 className="mt-4 text-xl">{i.k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="governance">
        <SectionHeading title="Governance" lede={GOVERNANCE_NOTE} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE.map((g) => (
            <TeamCard key={g.role} member={g} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Membership tiers" lede="How members participate in ECCO's work." />
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {MEMBERSHIP_TIERS.map((t) => (
            <div key={t.name} className="border-l-2 border-gold pl-4">
              <dt className="font-semibold text-primary">{t.name} member</dt>
              <dd className="text-sm text-muted-foreground">{t.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <SiteFooter />
    </div>
  );
}
