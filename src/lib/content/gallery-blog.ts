import logo from "@/assets/Logo.png.asset.json";
import founder1 from "@/assets/founder-1.jpeg.asset.json";
import founder2 from "@/assets/founder-2.png.asset.json";
import profile from "@/assets/profile.jpeg.asset.json";

export type GalleryItem = {
  url: string;
  alt: string;
  caption: string;
};

// Placeholder gallery using the existing assets — swap for real event/program
// photos once available. Keep captions descriptive for SEO/alt-text quality.
export const GALLERY: GalleryItem[] = [
  { url: founder1.url, alt: "ECCO founder at her desk", caption: "Founder Victoria Wakoli" },
  { url: founder2.url, alt: "ECCO founder portrait", caption: "Founder portrait" },
  { url: profile.url, alt: "ECCO founder profile photo", caption: "At work" },
  { url: logo.url, alt: "EduCareer Connect Organization emblem", caption: "Our emblem" },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readMinutes: number;
  category: string;
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
  },
];
