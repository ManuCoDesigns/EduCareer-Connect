import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, Section } from "@/components/layout/Section";
import { BLOG_POSTS } from "@/lib/content/gallery-blog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta({
          title: loaderData.title,
          description: loaderData.excerpt,
          path: `/blog/${loaderData.slug}`,
        })
      : {},
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const date = new Date(post.date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium text-primary">{post.category}</p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {date} · {post.readMinutes} min read
          </p>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground">
            {post.body.split("\n\n").map((block) => {
              const heading = block.match(/^## (.+)$/);
              if (heading) {
                return (
                  <h2 key={block} className="!mt-8 text-xl">
                    {heading[1]}
                  </h2>
                );
              }
              return <p key={block}>{block}</p>;
            })}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-block text-sm font-medium text-primary hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
