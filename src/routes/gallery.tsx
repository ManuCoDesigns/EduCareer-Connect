import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { GalleryGrid } from "@/components/common/GalleryGrid";
import { GALLERY } from "@/lib/content/gallery-blog";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMeta({
      title: "Gallery",
      description: `Photos from ${ORG.abbreviation}'s guidance sessions, workshops and community events.`,
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Gallery"
        title="Moments from our work."
        lede="A look at guidance sessions, workshops and community events. Photos are added as programs run — check back often."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />

      <Section>
        <GalleryGrid items={GALLERY} />
      </Section>

      <SiteFooter />
    </div>
  );
}
