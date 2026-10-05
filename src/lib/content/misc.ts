export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "6", label: "Focus programs" },
  { value: "1", label: "County served — expanding" },
  { value: "3", label: "CBE pathways covered" },
  { value: "2026", label: "Year founded" },
];

export type MembershipTier = {
  name: string;
  body: string;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  { name: "Founding", body: "Members who established ECCO and steer its long-term vision." },
  { name: "Ordinary", body: "Individuals actively participating in programs and the AGM." },
  { name: "Associate", body: "Institutions and partners supporting our work in the field." },
  { name: "Honorary", body: "Distinguished persons recognised for outstanding contribution." },
];

export const MEMBERSHIP_BENEFITS = [
  "Full participation in ECCO programs and workshops",
  "Voting rights at the Annual General Meeting",
  "Access to career guidance resources and handbooks",
  "Invitations to mentorship and partnership events",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Portrait shown beside the quote. */
  photo?: string;
};

// Real testimonials only. Add more entries as they come in: with one entry the
// home page shows a featured layout, with two or more it switches to a card grid.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: `For years as a teacher, I have seen the same pain. A learner passes well, leaves school, then comes back asking, "Mwalimu, what next?"

We prepare them for exams, but not always for life after exams. There is a gap between the classroom and career.

That is why I connect with the vision of EduCareer Connect Organization (ECCO) founded by Victoria Wakoli in Wote, Makueni.

ECCO is closing that gap by offering career guidance, counselling and mentorship aligned with CBE. We walk with the learner, the parent and the teacher so that career choices are based on competence and purpose, not confusion.

Young people don't lack potential, they lack direction. When you give them clarity, you transform their future.

Let's close the gap together.`,
    name: "Augustine Ngovi",
    role: "Educator | Youth Mentor",
    photo: "/images/augustine-ngovi.jpg",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Who can join ECCO as a member?",
    answer:
      "Membership is open to anyone who shares our vision of guiding competence and shaping futures — including individuals, schools and institutional partners.",
  },
  {
    question: "Is ECCO affiliated with a religion or political party?",
    answer:
      "No. ECCO is a non-profit, non-political and non-religious organization serving every learner.",
  },
  {
    question: "How do I pay my membership fee?",
    answer:
      "Membership is a one-off KSh 2,000 contribution paid via M-Pesa. See the Membership page for the current payment method.",
  },
  {
    question: "Can my school partner with ECCO?",
    answer:
      "Yes — we work with schools, government bodies, NGOs and employers. Get in touch through the Contact page to start a conversation.",
  },
];
