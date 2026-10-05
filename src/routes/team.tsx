import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { RichText } from "@/components/common/RichText";
import { StatStrip, TeamCard } from "@/components/common/Blocks";
import { FOUNDER, GODFREY_CHESA, GOVERNANCE, GOVERNANCE_NOTE } from "@/lib/content/team";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  head: () =>
    pageMeta({
      title: "Our team",
      description: `Meet the people behind ${ORG.abbreviation}: founder ${FOUNDER.name}, ${GODFREY_CHESA.role} ${GODFREY_CHESA.name}, and the Executive Committee.`,
      path: "/team",
    }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Our team"
        title="The people behind ECCO."
        lede="A founder-led organization guided by a volunteer Executive Committee, accountable to members at each Annual General Meeting."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Team" }]} />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <figure className="card-elegant overflow-hidden p-0">
            <img
              src="/images/victoria-team.jpg"
              alt={`${FOUNDER.name}, ${FOUNDER.role} of ${ORG.name}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div>
            <p className="text-xs font-medium text-primary">{FOUNDER.role}</p>
            <h2 className="mt-2 text-3xl">{FOUNDER.name}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{FOUNDER.bio}</p>
            {FOUNDER.quote && (
              <blockquote className="mt-6 border-l-2 border-gold pl-4 text-sm italic leading-relaxed text-foreground">
                “{FOUNDER.quote}”
              </blockquote>
            )}
          </div>
        </div>
      </Section>

      <Section id="secretary" tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Reveal>
            <p className="text-xs font-medium text-primary">{GODFREY_CHESA.role}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{GODFREY_CHESA.name}</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {GODFREY_CHESA.credentials}
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              {GODFREY_CHESA.paragraphs.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </Reveal>

          {/* Sticky wrapper is separate from the card: .card-elegant sets its own
              position, which would override a sticky utility on the same element. */}
          <div className="order-first lg:sticky lg:top-24 lg:order-none">
            <figure className="card-elegant overflow-hidden p-0">
              <img
                src={GODFREY_CHESA.portrait}
                alt={`${GODFREY_CHESA.name}, ${GODFREY_CHESA.role} of ${ORG.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </figure>
          </div>
        </div>

        <div className="mt-14">
          <StatStrip stats={GODFREY_CHESA.stats} />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h3 className="text-lg">Core competencies</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {GODFREY_CHESA.competencies.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <h3 className="text-lg">Ministry roles</h3>
            <ul className="mt-4 space-y-3">
              {GODFREY_CHESA.ministryRoles.map((r) => (
                <li
                  key={r}
                  className="border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Executive Committee" lede={GOVERNANCE_NOTE} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE.map((g) => (
            <TeamCard key={g.role} member={g} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Interested in serving on the Executive Committee?{" "}
          <a href={`mailto:${ORG.email}`} className="font-medium text-primary hover:underline">
            Get in touch
          </a>
          .
        </p>
      </Section>

      <SiteFooter />
    </div>
  );
}
