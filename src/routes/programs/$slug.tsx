import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { CTASection } from "@/components/common/Blocks";
import { PROGRAMS } from "@/lib/content/programs";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = PROGRAMS.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return program;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta({
          title: loaderData.title,
          description: loaderData.summary,
          path: `/programs/${loaderData.slug}`,
        })
      : {},
  component: ProgramDetailPage,
});

function ProgramDetailPage() {
  const program = Route.useLoaderData();
  const others = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="Program" title={program.title} lede={program.summary} />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: program.title },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-lg icon-badge text-primary-foreground">
              <program.icon className="size-6" />
            </span>
            <h2 className="mt-6 text-2xl">How it works</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{program.body}</p>
          </div>
          <aside className="card-elegant h-fit p-6">
            <p className="text-xs font-medium text-primary">Who it's for</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{program.audience}</p>
            <div className="mt-6 border-t border-border pt-6">
              <Link to="/contact" className="text-sm font-medium text-primary hover:underline">
                Ask about this program →
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="text-2xl">Other programs</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="card-elegant p-5"
            >
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <CTASection
          title="Ready to get involved?"
          lede={`Join ${ORG.abbreviation} as a member or reach out to bring this program to your school.`}
          primaryLabel="Become a member"
          primaryHref="/membership"
          secondaryLabel="Contact us"
          secondaryHref="/contact"
        />
      </Section>

      <SiteFooter />
    </div>
  );
}
