import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { TeamCard } from "@/components/common/Blocks";
import { FOUNDER, GOVERNANCE, GOVERNANCE_NOTE } from "@/lib/content/team";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";
import founder2 from "@/assets/founder-2.png.asset.json";

export const Route = createFileRoute("/team")({
  head: () =>
    pageMeta({
      title: "Our team",
      description: `Meet the founder and Executive Committee leading ${ORG.abbreviation}.`,
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
              src={founder2.url}
              alt={`${FOUNDER.name}, ${FOUNDER.role} of ${ORG.name}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div>
            <p className="text-xs font-medium text-primary">{FOUNDER.role}</p>
            <h2 className="mt-2 text-3xl">{FOUNDER.name}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{FOUNDER.bio}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
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
