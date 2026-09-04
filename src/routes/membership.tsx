import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { MembershipPayment } from "@/components/site/MembershipPayment";
import { MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS, FAQS } from "@/lib/content/misc";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/membership")({
  head: () =>
    pageMeta({
      title: "Membership",
      description: `Join ${ORG.abbreviation} for a one-off KSh 2,000 contribution — full program access and AGM voting rights.`,
      path: "/membership",
    }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Membership"
        title="Join ECCO."
        lede="Members enjoy full participation in our programs, voting rights at the Annual General Meeting, and access to our career resources."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Membership" }]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl">What you get</h2>
            <ul className="mt-5 space-y-3">
              {MEMBERSHIP_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl">Membership tiers</h2>
            <dl className="mt-5 space-y-5">
              {MEMBERSHIP_TIERS.map((t) => (
                <div key={t.name} className="border-l-2 border-gold pl-4">
                  <dt className="font-semibold text-primary">{t.name} member</dt>
                  <dd className="text-sm text-muted-foreground">{t.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <MembershipPayment />
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="text-2xl">Frequently asked questions</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.question}>
              <h3 className="text-base font-semibold text-foreground">{f.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
