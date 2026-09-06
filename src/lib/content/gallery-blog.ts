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
  {
    url: "/images/victoria-facilitating-workshop.jpg",
    alt: "Facilitator presenting to a group in a workshop setting",
    caption: "Facilitating a training session",
  },
  {
    url: "/images/victoria-portrait-coffee.jpg",
    alt: "Founder Victoria Wakoli, professional portrait",
    caption: "Founder Victoria Wakoli",
  },
  {
    url: "/images/poster-victoria-philosophy.jpg",
    alt: "Victoria Wakoli — Educator, Mentor, Leader: teaching philosophy and approach",
    caption: "Our founder's teaching philosophy",
  },
  {
    url: "/images/poster-victoria-focused-determined.jpg",
    alt: "Victoria Wakoli — Focused, Determined, Limitless",
    caption: "Focused. Determined. Limitless.",
  },
  {
    url: "/images/poster-top10-teacher-skills.jpg",
    alt: "Top 10 skills modern teachers must master, essential for tech-driven classrooms",
    caption: "Top 10 skills modern teachers must master",
  },
  {
    url: "/images/poster-digital-inclusion.jpg",
    alt: "Promoting digital inclusion in teaching — ensuring no learner is left behind",
    caption: "Promoting digital inclusion in teaching",
  },
  {
    url: "/images/poster-teaching-methods.jpg",
    alt: "Powerful teaching methods — inspire, engage, empower",
    caption: "Powerful teaching methods",
  },
  {
    url: "/images/poster-power-of-demonstration.jpg",
    alt: "The power of demonstration in teaching",
    caption: "The power of demonstration in teaching",
  },
  {
    url: "/images/poster-every-learner-can-grow.jpg",
    alt: "Every learner can grow with the right guidance",
    caption: "Every learner can grow with the right guidance",
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
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-cbc-pathways",
    title: "Understanding the three CBC pathways",
    excerpt:
      "A plain-language breakdown of STEM, Social Sciences, and Arts and Sports Science — and why getting this choice right matters more than it used to.",
    body: `Since January 2026, Kenya's first cohort of learners has moved from Junior School into Senior School — Grades 10 to 12 — under the Competency-Based Curriculum. It's the biggest structural change CBC has introduced so far: from Grade 10, every learner chooses one of three specialised pathways, and that choice shapes their subjects, their day-to-day school experience, and their options after Grade 12.

## The three pathways

STEM (Science, Technology, Engineering and Mathematics) suits learners who are strong in the sciences and mathematics and are aiming toward careers in medicine, engineering, technology, data science and related fields. Elective subjects typically include Biology, Chemistry, Physics, Computer Science, Agriculture, and various technical or applied science options.

Social Sciences suits learners drawn to understanding people, society and governance. It covers humanities, languages, business studies and social studies, with electives such as literature, history and citizenship, geography, business studies, and foreign or indigenous languages. It tends to lead toward careers in law, business, education, governance and community leadership.

Arts and Sports Science is built around creativity, performance and physical talent — covering music, dance, theatre, visual and fine arts, and sports and recreation. It opens routes into creative industries, media, and professional or academic sports.

Every learner also takes core subjects — including English, Kiswahili and Mathematics — regardless of pathway, then selects examinable electives from within their chosen pathway. Senior school learners typically follow 40 lessons a week, 40 minutes each, and most are between 15 and 17 years old when they start Grade 10.

## Why the choice matters more than it used to

Pathway selection happens at the end of Grade 9, guided by KJSEA results, a learner's interests, and their career goals. Unlike subject choices under the old 8-4-4 system, switching pathways after Grade 10 is genuinely difficult — a learner who starts in Social Sciences and later wants to move into STEM will have missed a year of Physics and Chemistry, for example. Not every school offers every pathway either, so for some families the decision also involves which school a learner attends.

## Choosing well, not just quickly

A rushed pathway choice at 15, made under exam-season pressure, can narrow a young person's options for years before they've had a real chance to explore them. The learners who do best with this decision are usually the ones who've had an honest, unhurried conversation about what they're actually good at, what they enjoy, and what each pathway really demands day to day — not just its name.

This is exactly where ECCO's Career Guidance sessions come in. We sit down with learners and parents before the choice is locked in, working through genuine strengths and interests against what STEM, Social Sciences and Arts and Sports Science each actually involve — so the decision is made with clear eyes, not guesswork.`,
    date: "2026-08-15",
    readMinutes: 5,
    category: "CBC Guidance",
  },
  {
    slug: "preparing-for-your-first-guidance-session",
    title: "How to prepare for your first guidance session",
    excerpt:
      "A few simple steps learners and parents can take before meeting an ECCO guidance officer, to get more out of the conversation.",
    body: `A first guidance session works best when it isn't the first time a learner has thought about any of this. You don't need a finished answer walking in — that's what the session is for — but a little preparation turns a vague conversation into a genuinely useful one.

## Before the session

Have the learner jot down, honestly, the school subjects they enjoy most and least — not just the ones they're best at grades-wise, but the ones that actually hold their attention in class. Alongside that, a short list of activities they choose to do outside school (a hobby, a club, something they help with at home) often reveals more about genuine interest than a subject list does.

If a KJSEA result or recent report card is available, bring it. It's one input among several, not the whole picture, but it helps ground the conversation in something concrete rather than pure guesswork.

Parents are welcome and encouraged to attend, especially for the first session. It helps to come with an open question rather than a fixed idea of the "right" answer already decided — the session works better as an exploration than a confirmation.

## What to expect in the room

A guidance officer will usually start by asking about school life broadly before narrowing in on specific subjects or pathways — this isn't small talk, it's how we get an honest read on a learner rather than a rehearsed one. Expect open questions like "what's a lesson you didn't want to end?" more than closed ones like "are you good at science?"

There's no test to pass and no wrong answer to give. The goal of the first session specifically is to understand the learner, not to hand down a pathway decision on the spot — that usually takes at least a second conversation, sometimes more, especially if a learner is genuinely torn between two directions.

## After the session

Guidance is rarely a single event. Expect a follow-up conversation to be suggested, and treat the first session as the start of a process rather than the answer itself. If something a guidance officer said doesn't sit right, say so at the next session — a guidance relationship that only works one way isn't doing its job.

If you haven't booked a first session yet, get in touch through our Contact page and we'll find a time that works.`,
    date: "2026-07-02",
    readMinutes: 4,
    category: "Guidance",
  },
  {
    slug: "why-mentorship-matters",
    title: "Why mentorship matters for career decisions",
    excerpt:
      "What ECCO's mentorship program looks like in practice, and why pairing learners with working professionals changes how they see their future.",
    body: `A career guidance session can tell a learner what a pathway or a career generally involves. A mentor can tell them what it's actually like on a Tuesday afternoon — and that difference matters more than it sounds.

## The gap that guidance alone can't close

Most learners choosing a pathway or a career direction are working from secondhand information: what a subject textbook says a field involves, what a relative does for work, what a career looks like in the abstract. That's a reasonable starting point, but it's thin. A learner interested in engineering, for instance, may have a clear idea of what "engineer" means in principle and almost no idea what the actual day-to-day work is, what the early years of the career feel like, or what the setbacks look like before the wins do.

Mentorship closes that gap by putting a learner in regular contact with someone who's actually doing the work. Not a single career talk, but an ongoing relationship across a term — enough time for a learner to ask the questions that only occur to them after the first or second conversation, once the novelty wears off and the real curiosity starts.

## What ECCO's mentorship program looks like

We pair learners — typically in Grade 9 or 10, once they're seriously exploring specific careers rather than pathways in the abstract — with working professionals in fields they've shown genuine interest in. The pairing is structured but informal: regular check-ins across a term, built around the learner's actual questions rather than a fixed script.

The goal isn't to convince a learner to pursue a particular career, and it isn't a shortcut to a job. It's to replace a secondhand impression with a firsthand one, early enough that the learner is choosing a pathway or a course of study with a realistic picture in mind — including the parts of a career that don't make it into a careers-day pamphlet.

## Why this matters at the age it happens

Grade 9 and 10 is exactly when Kenyan learners are making pathway and subject decisions that are genuinely difficult to reverse later. A mentorship conversation that surfaces a mismatch early — "I thought I wanted this, but hearing how it actually works, I'm not sure" — is far more useful at that stage than the same realisation five years and one qualification later.

If you're a professional interested in mentoring, or a parent who'd like a learner paired with one, reach out through our Contact page and we'll talk through what a good match looks like.`,
    date: "2026-05-20",
    readMinutes: 6,
    category: "Mentorship",
  },
];
