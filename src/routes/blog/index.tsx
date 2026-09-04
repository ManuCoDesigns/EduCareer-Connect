import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { BlogCard } from "@/components/common/Blocks";
import { BLOG_POSTS } from "@/lib/content/gallery-blog";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageMeta({
      title: "Blog",
      description: `Guidance articles, CBC explainers and mentorship stories from ${ORG.abbreviation}.`,
      path: "/blog",
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Blog"
        title="Guidance, explained."
        lede="Practical articles on CBC pathways, guidance sessions and mentorship — written for learners, parents and teachers."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
