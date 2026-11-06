import { CalendarDays, HeartHandshake, Presentation, Users, type LucideIcon } from "lucide-react";

/**
 * Add real events to EVENTS. Past events move to "Past events" automatically
 * once their end date has passed. Nothing is invented: with no events the page
 * shows the event types ECCO runs plus a "get notified" prompt.
 */
export type EventItem = {
  slug: string;
  title: string;
  /** Must match one of EVENT_TYPES[].key */
  type: "workshop" | "career-day" | "agm" | "mentorship";
  /** ISO start date, e.g. "2026-12-04" */
  date: string;
  /** ISO end date for multi-day events. */
  endDate?: string | undefined;
  /** Free text, e.g. "9:00 AM – 12:00 PM" */
  time?: string | undefined;
  venue: string;
  /** Town or city, used in structured data. */
  locality?: string | undefined;
  summary: string;
  /** Public path to a poster or photo. */
  image?: string | undefined;
  /** Focus areas shown as chips. */
  focus?: string[] | undefined;
  /** People appearing on the poster / programme. */
  speakers?: Array<{ name: string; role: string }> | undefined;
  /** Phone numbers shown for registration. */
  registerPhones?: string[] | undefined;
};

export type EventType = {
  key: EventItem["type"];
  title: string;
  icon: LucideIcon;
  text: string;
};

export const EVENT_TYPES: EventType[] = [
  {
    key: "workshop",
    title: "Workshops",
    icon: Presentation,
    text: "Hands-on sessions for learners, parents and teachers on CBE pathways, study skills, wellbeing and career exploration.",
  },
  {
    key: "mentorship",
    title: "Mentorship programs",
    icon: HeartHandshake,
    text: "Multi-day programs where learners meet mentors, build their networks and get guidance on careers and life skills.",
  },
  {
    key: "career-day",
    title: "Career days",
    icon: Users,
    text: "School visits where learners meet working professionals, ask questions and see what different careers really involve.",
  },
  {
    key: "agm",
    title: "Annual General Meeting",
    icon: CalendarDays,
    text: "Members review the year, hear from the Directors and vote, as set out in our constitution.",
  },
];

export const EVENTS: EventItem[] = [
  {
    slug: "mentorship-program-december-2026",
    title: "Mentorship Program",
    type: "mentorship",
    date: "2026-12-04",
    endDate: "2026-12-05",
    venue: "Ray of Light Ministry Shanzu Church, Serena Road, Mombasa",
    locality: "Mombasa",
    summary:
      "Two days of mentorship for learners, led by ECCO's Directors with Min. Ruth Kuria as host. Invest in your future.",
    image: "/images/event-mentorship-dec-2026.jpg",
    focus: [
      "Career guidance based on pathways",
      "Building social network",
      "Guidance & counseling",
      "Soft skills enhancement",
    ],
    speakers: [
      { name: "Pst. Chesa Godfrey", role: "Co-Director, ECCO" },
      { name: "Mr. Ngovi Augustine", role: "Co-Director, ECCO" },
      { name: "Min. Ruth Kuria", role: "Host" },
      { name: "Miss Wakoli Victoria", role: "Executive Director" },
      { name: "Mr. Walucho Gregory", role: "Co-Director" },
    ],
    registerPhones: ["+254 796 040 638", "+254 711 520 205"],
  },
];

/** An event is upcoming until the end of its last day. */
export function partitionEvents(now: Date = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((e) => (e.endDate ?? e.date) >= today),
    past: sorted.filter((e) => (e.endDate ?? e.date) < today).reverse(),
  };
}
