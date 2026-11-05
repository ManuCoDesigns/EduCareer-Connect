import { ORG } from "@/lib/content/site";
import { SW_CONTENT } from "@/lib/content/sw-content";

/**
 * Kiswahili translations, keyed by the exact English string used in the UI.
 * Add a line here and wrap the English string with t() to translate it.
 * Please have a Swahili speaker review wording before wide promotion.
 */
export const SW: Record<string, string> = {
  // Navigation
  About: "Kuhusu",
  Programs: "Programu",
  Gallery: "Picha",
  Blog: "Blogu",
  Press: "Habari",
  Membership: "Uanachama",
  Contact: "Wasiliana",
  "Join ECCO": "Jiunge na ECCO",
  Home: "Mwanzo",

  // Footer
  Explore: "Gundua",
  "Reach us": "Wasiliana nasi",
  "Get updates": "Pata taarifa mpya",
  "About us": "Kuhusu sisi",
  Team: "Timu",
  "In the press": "Vyombo vya habari",
  "Book a session": "Weka miadi",
  Events: "Matukio",
  Resources: "Rasilimali",
  Donate: "Changia",
  "Guiding Competence, Shaping Futures": "Kuongoza Umahiri, Kuunda Mustakabali",
  "A non-profit, non-political and non-religious organization serving every learner.":
    "Shirika lisilotafuta faida, lisilo la kisiasi wala kidini, linalomhudumia kila mwanafunzi.",
  "Non-profit, non-political, non-religious.": "Hatutafuti faida, hatuna siasa wala dini.",
  "Contact us": "Wasiliana nasi",

  // Home
  "Guiding competence,": "Kuongoza umahiri,",
  "shaping futures.": "kuunda mustakabali.",
  [ORG.description]:
    "ECCO inatoa mwongozo wa taaluma, ushauri nasaha na ulezi unaoendana na CBE, unaowageuza wanafunzi wa Kenya kuwa wataalamu wenye umahiri na dhamira.",
  "Become a member": "Kuwa mwanachama",
  "Explore programs": "Gundua programu",
  "Who we are": "Sisi ni nani",
  "Read our full story": "Soma hadithi yetu kamili",
  Vision: "Dira",
  Mission: "Dhamira",
  Mandate: "Mamlaka",
  "A leading organization transforming learners into competent, purpose-driven individuals.":
    "Shirika linaloongoza katika kuwageuza wanafunzi kuwa watu wenye umahiri na dhamira.",
  "Accessible and impactful career guidance aligned with the Competency-Based Education.":
    "Mwongozo wa taaluma unaopatikana kwa wote na wenye matokeo, unaoendana na Elimu Inayozingatia Umahiri.",
  "Non-profit, non-political and non-religious — serving every learner.":
    "Hatutafuti faida, hatuna siasa wala dini — tunamhudumia kila mwanafunzi.",
  "What we do": "Tunachofanya",
  "Six focus areas drawn directly from our constitutional objectives.":
    "Maeneo sita ya kipaumbele yanayotokana moja kwa moja na malengo ya katiba yetu.",
  "What our community says": "Jamii yetu inasema nini",
  "Ready to guide your next step?": "Uko tayari kuongozwa hatua yako inayofuata?",
  "Join ECCO as a member, or reach out to bring career guidance to your school.":
    "Jiunge na ECCO kama mwanachama, au wasiliana nasi ili kuleta mwongozo wa taaluma shuleni kwako.",
  "Ways to get involved": "Njia za kushiriki",
  "From booking a session to sponsoring a learner, there is a place for you.":
    "Kuanzia kuweka miadi hadi kumdhamini mwanafunzi, kuna nafasi kwako.",
  "Request one-to-one or group guidance.": "Omba mwongozo wa mmoja-mmoja au wa kikundi.",
  "Workshops, career days and meetings.": "Warsha, siku za taaluma na mikutano.",
  "Free guides and worksheets.": "Miongozo na karatasi za kazi za bure.",
  "Sponsor guidance, career days and mentorship.": "Dhamini mwongozo, siku za taaluma na ulezi.",

  // Events
  "Come and learn with us.": "Karibu ujifunze nasi.",
  "Workshops, career days and member meetings that bring learners, parents, teachers and professionals together.":
    "Warsha, siku za taaluma na mikutano ya wanachama inayowaleta pamoja wanafunzi, wazazi, walimu na wataalamu.",
  "Upcoming events": "Matukio yajayo",
  "What we run": "Tunayoendesha",
  "Three kinds of gatherings, each with a clear purpose.":
    "Aina tatu za mikusanyiko, kila moja ikiwa na lengo wazi.",
  "Want ECCO at your school?": "Unataka ECCO shuleni kwako?",
  "We bring career days and workshops to schools and community groups. Tell us what you have in mind.":
    "Tunaleta siku za taaluma na warsha shuleni na kwa vikundi vya jamii. Tuambie unachofikiria.",

  // Book
  "Guidance sessions": "Vikao vya mwongozo",
  "Book a session.": "Weka miadi.",
  "One-to-one or group guidance for learners, parents and schools. Simple to request, easy to schedule.":
    "Mwongozo wa mmoja-mmoja au wa kikundi kwa wanafunzi, wazazi na shule. Rahisi kuomba, rahisi kupanga.",

  // Donate
  Give: "Changia",
  "Help a young person find direction.": "Msaidie kijana kupata mwelekeo.",
  "Where your gift goes": "Mchango wako unakwenda wapi",

  // Resources
  "Free guides you can keep.": "Miongozo ya bure unayoweza kuhifadhi.",
  "Printable guides and worksheets to help learners and parents prepare for pathway decisions.":
    "Miongozo na karatasi za kazi za kuchapisha zinazowasaidia wanafunzi na wazazi kujiandaa kwa maamuzi ya mkondo.",
  "Prefer to talk it through?": "Unapendelea kuzungumza ana kwa ana?",
  "A guidance session turns these guides into a plan that fits your learner.":
    "Kikao cha mwongozo hugeuza miongozo hii kuwa mpango unaomfaa mwanafunzi wako.",
  "Read our blog": "Soma blogu yetu",

  // Press
  "Our story, told by others.": "Hadithi yetu, kama inavyosimuliwa na wengine.",
  "Covering our work?": "Unaandika kuhusu kazi yetu?",
  "Journalists and partners are welcome to reach out for interviews, photos and facts about ECCO.":
    "Waandishi wa habari na washirika wanakaribishwa kuwasiliana nasi kwa mahojiano, picha na taarifa kuhusu ECCO.",
  "Meet the team": "Kutana na timu",

  ...SW_CONTENT,
};
