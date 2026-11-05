import { useT } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { CTASection } from "@/components/common/Blocks";
import { Button } from "@/components/ui/button";
import { RESOURCES } from "@/lib/content/resources";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  head: () =>
    pageMeta({
      title: "Free resources",
      description: `Free downloadable guides and worksheets on CBE pathways and guidance sessions from ${ORG.abbreviation}.`,
      path: "/resources",
    }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Resources"
        title="Free guides you can keep."
        lede="Printable guides and worksheets to help learners and parents prepare for pathway decisions."
        actions={
          <Button asChild variant="secondary" size="lg">
            <Link to="/book">{t("Book a session")}</Link>
          </Button>
        }
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.slug} delayMs={i * 80}>
              <article className="card-elegant flex h-full flex-col p-6">
                <span className="icon-badge inline-flex size-11 items-center justify-center rounded-lg text-primary-foreground">
                  <r.icon className="size-5" />
                </span>
                <h2 className="mt-4 text-xl leading-snug">{t(r.title)}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(r.description)}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {t("For")}: {t(r.audience)} · {r.format}
                </p>
                <Button asChild className="mt-4 w-full">
                  <a href={r.file} download>
                    <Download className="size-4" /> {t("Download")}
                  </a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          {t(
            "Guides reflect CBE senior school information as of November 2026. Always confirm details with your school and the Ministry of Education.",
          )}
        </p>
      </Section>

      <Section tone="muted">
        <CTASection
          title="Prefer to talk it through?"
          lede="A guidance session turns these guides into a plan that fits your learner."
          primaryLabel="Book a session"
          primaryHref="/book"
          secondaryLabel="Read our blog"
          secondaryHref="/blog"
        />
      </Section>
      <SiteFooter />
    </div>
  );
}
