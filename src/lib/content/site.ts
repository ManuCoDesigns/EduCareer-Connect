export const ORG = {
  name: "EduCareer Connect Organization",
  shortName: "EduCareer Connect",
  abbreviation: "ECCO",
  tagline: "Guiding Competence, Shaping Futures",
  description:
    "ECCO provides CBE-aligned career guidance, counselling and mentorship that turns Kenyan learners into competent, purpose-driven professionals.",
  founder: "Victoria Wakoli",
  location: "Wote, Makueni County, Kenya",
  email: "victoriawakoli@gmail.com",
  phone: "+254796040638",
  phoneDisplay: "+254 796 040 638",
  siteUrl: "https://www.educareer-connect.org",
};

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

/** Header navigation. Entries with `children` become dropdowns on desktop. */
export const NAV: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "About us", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Programs",
    children: [
      { label: "Programs", href: "/programs" },
      { label: "Book a session", href: "/book" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Press", href: "/press" },
  {
    label: "Get involved",
    children: [
      { label: "Membership", href: "/membership" },
      { label: "Donate", href: "/donate" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns. */
export const FOOTER_GROUPS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Explore",
    links: [
      { label: "About us", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "In the press", href: "/press" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Book a session", href: "/book" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Membership", href: "/membership" },
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Home-page quick links: everything a visitor may want, without scrolling. */
export const QUICK_LINKS: Array<NavLink & { text: string }> = [
  { label: "Book a session", href: "/book", text: "Free career guidance for your child." },
  { label: "Events", href: "/events", text: "Workshops, career days and mentorship programs." },
  { label: "Resources", href: "/resources", text: "Free guides and worksheets to download." },
  { label: "Membership", href: "/membership", text: "Join the ECCO community." },
  { label: "Donate", href: "/donate", text: "Support a learner's future." },
  { label: "Team", href: "/team", text: "Meet the people behind ECCO." },
];

/**
 * Social links — none of these accounts exist yet. Each entry renders as a
 * "coming soon" icon (no navigation) until a real href is added here. Once
 * an account launches, set its href and this becomes a normal working link
 * with no other code changes needed.
 */
export type SocialLink = {
  platform: string;
  href: string | null;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "WhatsApp", href: null },
  { platform: "Twitter", href: null },
  { platform: "Facebook", href: null },
  { platform: "Instagram", href: null },
  { platform: "Telegram", href: null },
  { platform: "YouTube", href: null },
];
