import type { Stat } from "@/lib/content/misc";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  quote?: string;
};

export const FOUNDER: TeamMember = {
  name: "Victoria Wakoli",
  role: "Founder",
  bio: "Victoria founded ECCO to close the gap between classroom learning and real career pathways for Kenyan learners, guiding its vision and day-to-day work since inception.",
  quote:
    "I believe that education is the most powerful tool to transform lives and communities. My purpose as a teacher is to ignite curiosity, build confidence, and empower every learner to reach their full potential.",
};

/** A leader with a full profile section on the Team page. */
export type TeamProfile = {
  name: string;
  role: string;
  /** Square face crop used on small cards (governance grid). */
  photo: string;
  /** Larger portrait used on the Team page profile section. */
  portrait: string;
  credentials: string;
  /** Full biography, one entry per paragraph. */
  paragraphs: string[];
  /** Condensed version for CVs, profiles and the chat assistant. */
  shortBio: string;
  stats: Stat[];
  competencies: string[];
  ministryRoles: string[];
};

export const GODFREY_CHESA: TeamProfile = {
  name: "Godfrey Chesa",
  role: "Secretary",
  photo: "/images/godfrey-chesa-avatar.jpg",
  portrait: "/images/godfrey-chesa.jpg",
  credentials: "B.Ed Arts (Geography / Business Studies), University of Eldoret",
  paragraphs: [
    "Godfrey Chesa is a dedicated Kenyan educator, counselor, youth mentor, and minister of the Gospel, born in Kakamega, Kenya.",
    "He is a trained teacher by profession, holding a **Bachelor’s Degree in Education Arts (Geography / Business Studies)** from the **University of Eldoret**. Since beginning his teaching career in 2019, he has served with distinction in diverse academic environments, including **Kivaywa Boys High School (Kakamega), Kabuyefwe Girls High School (Trans-Nzoia), and The Makueni School (Makueni).**",
    "Beyond the classroom, Mr. Chesa is a passionate advocate for holistic student development. He has served in the **Guidance and Counseling Department** and as a **School Spiritual Leader, Christian Union (C.U.) Patron, and School Pastor** in all institutions he has served. This experience has equipped him with exceptional skills in handling a multicultural population across different genders, cultures, and geographical locations. He is also an active **soccer coach**, using sports as a tool for discipline, teamwork, and talent development.",
    "In ministry and mentorship, his impact extends far beyond the high school. Through his yearly mentorship programs focusing on **Academic Shaping, Career Guidance, Spiritual Mentorship, and Social Counseling**, he has directly influenced and transformed the lives of **over 4,000 youth**.",
    "His university outreach has reached **more than 10 Universities and Tertiary Institutions across Kenya**, including the University of Eldoret, University of Nairobi, Kenyatta University, Maseno University, Makueni University (formerly SEKU Makueni Branch), Pwani University, Masinde Muliro University of Science and Technology, Moi University, Koilel Campus, as well as Wote KMTC, Wote Technical Training Institute, and Sigalagala National Polytechnic.",
    "Furthermore, he has reached out to **over 200 churches** across the nation in youth mobilization, mentorship, and spiritual transformation.",
    "Mr. Chesa is a transformational leader who believes in nurturing the academic, spiritual, and social well-being of the next generation.",
  ],
  shortBio:
    "Godfrey Chesa is a Kenyan educator (B.Ed Arts Geography/Business Studies, University of Eldoret) and youth mentor with service since 2019 at Kivaywa Boys, Kabuyefwe Girls, and The Makueni School. He is a Guidance & Counseling expert, C.U. Patron, School Pastor, and soccer coach. As Praise & Worship Leader (Full Gospel Kakamega East) and Youth Pastor (JCC Wote), he has mentored 4,000+ youth, reached 10+ universities including UoN, KU, Maseno, Pwani, MMUST & Moi, plus Wote KMTC, Wote TTI & Sigalagala Poly, and mobilized over 200 churches for youth mentorship.",
  stats: [
    { value: "4,000+", label: "Youth mentored" },
    { value: "10+", label: "Universities & tertiary institutions reached" },
    { value: "200+", label: "Churches reached" },
    { value: "2019", label: "Teaching since" },
  ],
  competencies: [
    "Education & Pedagogy",
    "Guidance & Counseling",
    "Youth Mentorship & Spiritual Leadership",
    "Career Guidance",
    "University & Church Mobilization",
    "Cross-Cultural Leadership",
    "Sports Coaching",
  ],
  ministryRoles: [
    "Praise and Worship Leader (Full Gospel Churches of Kenya, Kakamega East District)",
    "Youth Pastor (JCC Church Wote)",
  ],
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
    name: GODFREY_CHESA.name,
    role: GODFREY_CHESA.role,
    photo: GODFREY_CHESA.photo,
    bio: "Educator, counselor and youth mentor. Keeps records, correspondence and minutes of all meetings.",
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
