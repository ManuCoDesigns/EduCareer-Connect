export type GalleryItem = {
  url: string;
  alt: string;
  caption: string;
};

// Real photos — replace/add to as more program and event photos come in.
export const GALLERY: GalleryItem[] = [
  {
    url: "/images/learners-art-activity.jpg",
    alt: "Learners' hands mixing blue paint during a hands-on art activity",
    caption: "Hands-on learning in action",
  },
  {
    url: "/images/victoria-team.jpg",
    alt: "Founder Victoria Wakoli standing outside a partner school",
    caption: "Founder Victoria Wakoli on site at a partner school",
  },
  {
    url: "/images/victoria-candid.jpg",
    alt: "Founder Victoria Wakoli at a school courtyard",
    caption: "Between sessions",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readMinutes: number;
  category: string;
  /** True until this post's placeholder body is replaced with real content.
   * Gates the post out of the sitemap and marks it noindex so search
   * engines don't crawl and rank placeholder text. Flip to false (or
   * remove the field) once real content is in. */
  isPlaceholder?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-cbc-pathways",
    title: "Understanding the three CBC pathways",
    excerpt:
      "A plain-language breakdown of Arts & Sports Science, Social Sciences, and STEM — and how learners choose between them.",
    body: "Placeholder article body — replace with real content. This should walk parents and learners through how CBC pathway selection works, what subjects sit under each pathway, and how ECCO's guidance sessions help learners decide.",
    date: "2026-08-15",
    readMinutes: 5,
    category: "CBC Guidance",
    isPlaceholder: true,
  },
  {
    slug: "preparing-for-your-first-guidance-session",
    title: "How to prepare for your first guidance session",
    excerpt:
      "A few simple steps learners and parents can take before meeting an ECCO guidance officer, to get more out of the conversation.",
    body: "Placeholder article body — replace with real content covering what to bring, what questions to expect, and how to think about strengths and interests ahead of time.",
    date: "2026-07-02",
    readMinutes: 4,
    category: "Guidance",
    isPlaceholder: true,
  },
  {
    slug: "why-mentorship-matters",
    title: "Why mentorship matters for career decisions",
    excerpt:
      "What ECCO's mentorship program looks like in practice, and why pairing learners with working professionals changes how they see their future.",
    body: "Placeholder article body — replace with real content, ideally including a short story or quote from a mentor-mentee pair once the program has real participants.",
    date: "2026-05-20",
    readMinutes: 6,
    category: "Mentorship",
    isPlaceholder: true,
  },
];
