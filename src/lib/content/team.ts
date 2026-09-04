export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export const FOUNDER: TeamMember = {
  name: "Victoria Wakoli",
  role: "Founder",
  bio: "Victoria founded ECCO to close the gap between classroom learning and real career pathways for Kenyan learners, guiding its vision and day-to-day work since inception.",
};

export const GOVERNANCE: TeamMember[] = [
  {
    name: "Position open",
    role: "Chairperson",
    bio: "Leads the Executive Committee and represents the organization.",
  },
  {
    name: "Position open",
    role: "Vice Chairperson",
    bio: "Deputises the Chairperson and supports oversight.",
  },
  {
    name: "Position open",
    role: "Secretary",
    bio: "Keeps records, correspondence and minutes of all meetings.",
  },
  {
    name: "Position open",
    role: "Treasurer",
    bio: "Safeguards funds; accounts are audited annually.",
  },
  {
    name: "Position open",
    role: "Programs Coordinator",
    bio: "Plans and delivers guidance and mentorship programs.",
  },
  {
    name: "Position open",
    role: "Communications Officer",
    bio: "Manages outreach, advocacy and public engagement.",
  },
];

export const GOVERNANCE_NOTE =
  "ECCO is led by an Executive Committee. The AGM is held annually, executive meetings quarterly, with a quorum of 50%.";
