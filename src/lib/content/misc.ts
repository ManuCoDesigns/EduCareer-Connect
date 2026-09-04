export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "6", label: "Focus programs" },
  { value: "1", label: "County served — expanding" },
  { value: "3", label: "CBC pathways covered" },
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
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Placeholder — replace with a real quote from a learner, parent or teacher once available.",
    name: "Name pending",
    role: "Learner, partner school",
  },
  {
    quote:
      "Placeholder — replace with a real quote describing how a guidance session helped someone choose a pathway.",
    name: "Name pending",
    role: "Parent",
  },
  {
    quote: "Placeholder — replace with a real quote from a teacher or school administrator.",
    name: "Name pending",
    role: "Teacher",
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
