import { ORG } from "@/lib/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/**
 * Builds a consistent set of <head> meta entries (title, description, OG,
 * Twitter card, canonical) for a TanStack Start route's `head()` config.
 * Every route should call this with a unique title/description — that's
 * what makes multi-page SEO actually work, versus one shared title.
 */
export function pageMeta({ title, description, path, image }: PageMetaInput) {
  const fullTitle = title === ORG.name ? title : `${title} | ${ORG.shortName}`;
  const url = `${ORG.siteUrl}${path}`;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];

  // Only emit og:image / twitter:image once a real image asset is supplied —
  // pointing these at a non-existent file is worse for SEO than omitting them.
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

/** JSON-LD Organization schema — render once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG.name,
    alternateName: ORG.abbreviation,
    url: ORG.siteUrl,
    description: ORG.description,
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wote",
      addressRegion: "Makueni County",
      addressCountry: "KE",
    },
    founder: {
      "@type": "Person",
      name: ORG.founder,
    },
  };
}

/** JSON-LD BreadcrumbList for a given path chain, e.g. [["Home","/"],["About","/about"]] */
export function breadcrumbSchema(crumbs: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${ORG.siteUrl}${path}`,
    })),
  };
}
