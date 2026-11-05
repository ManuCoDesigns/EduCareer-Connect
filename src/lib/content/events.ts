import { CalendarDays, Presentation, Users, type LucideIcon } from "lucide-react";

/**
 * Add real events to UPCOMING (newest first once passed, move them to PAST).
 * Nothing is invented: while both lists are empty the page shows the event
 * types ECCO runs plus a "get notified" prompt.
 */
export type EventItem = {
  slug: string;
  title: string;
  /** Must match one of EVENT_TYPES[].key */
  type: "workshop" | "career-day" | "agm";
  /** ISO date, e.g. "2026-12-05" */
  date: string;
  /** Free text, e.g. "9:00 AM – 12:00 PM" */
  time?: string | undefined;
  venue: string;
  summary: string;
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
    key: "career-day",
    title: "Career days",
    icon: Users,
    text: "School visits where learners meet working professionals, ask questions and see what different careers really involve.",
  },
  {
    key: "agm",
    title: "Annual General Meeting",
    icon: CalendarDays,
    text: "Members review the year, hear from the Executive Committee and vote, as set out in our constitution.",
  },
];

export const UPCOMING: EventItem[] = [];
export const PAST: EventItem[] = [];
