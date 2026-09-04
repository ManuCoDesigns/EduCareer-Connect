import {
  Compass,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Users,
  Building2,
  type LucideIcon,
} from "lucide-react";

export type Program = {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  body: string;
  audience: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "career-guidance",
    icon: Compass,
    title: "Career Guidance",
    summary:
      "One-on-one and group sessions that help learners map subjects, pathways and careers with confidence.",
    body: "Learners meet with trained guidance officers to assess strengths, interests and CBC pathway options, leaving each session with a concrete next step rather than a generic list of careers.",
    audience: "Grade 7–9 learners preparing for pathway selection",
  },
  {
    slug: "cbc-pathway-support",
    icon: GraduationCap,
    title: "CBC Pathway Support",
    summary:
      "Practical support for learners, parents and teachers navigating Competency-Based Curriculum transitions.",
    body: "Workshops that translate CBC's three pathways — Arts & Sports Science, Social Sciences, and STEM — into plain language, with guidance on subject combinations and what each pathway leads to.",
    audience: "Learners, parents and teachers at transition points",
  },
  {
    slug: "counselling-wellness",
    icon: HeartHandshake,
    title: "Counselling & Wellness",
    summary:
      "Confidential psychosocial support that promotes mental wellness and resilience in school and beyond.",
    body: "A safe, confidential space for learners dealing with academic pressure, family circumstances or personal wellbeing — delivered by trained counsellors under a clear code of conduct.",
    audience: "Any learner or family in need of support",
  },
  {
    slug: "mentorship",
    icon: Users,
    title: "Mentorship Programs",
    summary:
      "Structured mentorship linking learners with professionals who have walked the path before them.",
    body: "Learners are paired with working professionals in fields they're curious about, meeting regularly across a term to build a realistic picture of what a career actually looks like day to day.",
    audience: "Grade 9–10 learners exploring specific careers",
  },
  {
    slug: "learning-resources",
    icon: BookOpen,
    title: "Learning Resources",
    summary: "Career handbooks, assessment tools and workshops developed for Kenyan classrooms.",
    body: "Printed and digital resources — self-assessment tools, pathway comparison guides, and facilitator handbooks — built specifically for the Kenyan CBC context and shared with partner schools.",
    audience: "Teachers and school guidance departments",
  },
  {
    slug: "partnerships",
    icon: Building2,
    title: "Partnerships",
    summary:
      "Collaboration with schools, government, NGOs and industry to bridge education and the job market.",
    body: "ECCO works with county education offices, schools and employers to widen access to guidance programs and create real pathways from classroom to workplace.",
    audience: "Schools, government bodies, NGOs and employers",
  },
];

export const VALUES = [
  "Integrity",
  "Empowerment",
  "Inclusivity",
  "Excellence",
  "Innovation",
  "Confidentiality",
];
