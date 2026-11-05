import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper, Quote } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { CTASection } from "@/components/common/Blocks";
import { ShareButtons } from "@/components/common/ShareButtons";
import { Button } from "@/components/ui/button";
import { PRESS } from "@/lib/content/press";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/press")({
  head: () => ({
    ...pageMeta({
      title: "In the press",
      description: `${ORG.abbreviation} and founder ${ORG.founder} in the news — coverage from VVOB in Kenya and other partners.`,
      path: "/press",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: PRESS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "NewsArticle",
              headline: p.headline,
              url: p.url,
              datePublished: p.isoDate,
              author: { "@type": "Person", name: p.author },
              publisher: { "@type": "Organization", name: p.outlet },
              about: { "@type": "Person", name: ORG.founder },
            },
          })),
        }),
      },
    ],
  }),
  component: PressPage,
});

function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="In the press"
        title="Our story, told by others."
        lede={`Independent coverage of ${ORG.abbreviation} and the work of our founder, ${ORG.founder}.`}
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "In the press" }]} />

      <Section>
        <div className="space-y-10">
          {PRESS.map((item) => (
            <Reveal key={item.slug}>
              <article className="card-elegant grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <Newspaper className="size-4" />
                    {item.outlet} · {item.published}
                  </p>
                  <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">{item.headline}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    By {item.author}, {item.authorRole} · {item.publication}
                  </p>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{item.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Read the original <ArrowUpRight className="ml-1 size-4" />
                      </a>
                    </Button>
                    <ShareButtons path="/press" title={item.headline} />
                  </div>
                </div>

                <div className="space-y-6">
                  <figure className="rounded-2xl bg-secondary/50 p-6">
                    <Quote className="size-6 text-gold" aria-hidden="true" />
                    <blockquote className="mt-3 text-xl font-medium leading-snug">
                      “…{item.pullQuote}.”
                    </blockquote>
                    <figcaption className="mt-3 text-xs text-muted-foreground">
                      {item.quoteAttribution}
                    </figcaption>
                  </figure>
                  <div>
                    <p className="text-xs font-medium text-primary">Key points</p>
                    <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Summaries are written by {ORG.abbreviation}. All rights in the original articles remain
          with their publishers; please follow the link to read them in full.
        </p>
      </Section>

      <Section tone="muted">
        <CTASection
          title="Covering our work?"
          lede="Journalists and partners are welcome to reach out for interviews, photos and facts about ECCO."
          primaryLabel="Contact us"
          primaryHref="/contact"
          secondaryLabel="Meet the team"
          secondaryHref="/team"
        />
      </Section>
      <SiteFooter />
    </div>
  );
}
