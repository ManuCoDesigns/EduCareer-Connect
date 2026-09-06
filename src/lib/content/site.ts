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

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
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
