import { Compass, ListChecks, PenLine, type LucideIcon } from "lucide-react";

/** Files live in public/resources/. Add a PDF there, then add an entry below. */
export type Resource = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  /** Public path, e.g. /resources/example.pdf */
  file: string;
  format: "PDF";
  icon: LucideIcon;
};

export const RESOURCES: Resource[] = [
  {
    slug: "cbe-pathways-guide",
    title: "The three CBE pathways, explained",
    description:
      "STEM, Social Sciences, and Arts and Sports Science side by side: who each suits, where it can lead and typical electives.",
    audience: "Learners in Grade 8–9 and their parents",
    file: "/resources/cbe-pathways-guide.pdf",
    format: "PDF",
    icon: Compass,
  },
  {
    slug: "first-guidance-session-checklist",
    title: "Your first guidance session: checklist",
    description:
      "What to prepare, what to bring and which questions to ask before meeting a guidance officer.",
    audience: "Learners and parents",
    file: "/resources/first-guidance-session-checklist.pdf",
    format: "PDF",
    icon: ListChecks,
  },
  {
    slug: "pathway-reflection-worksheet",
    title: "Pathway reflection worksheet",
    description:
      "A printable worksheet to note favourite subjects, strengths and worries so the guidance conversation starts well.",
    audience: "Learners",
    file: "/resources/pathway-reflection-worksheet.pdf",
    format: "PDF",
    icon: PenLine,
  },
];
