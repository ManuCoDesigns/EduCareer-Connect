/**
 * Press & media coverage. Third-party articles are never reproduced here —
 * each entry carries our own short summary, full credit and a link to the
 * original, so the publisher keeps the readers and we keep the credibility.
 */
export type PressItem = {
  slug: string;
  headline: string;
  outlet: string;
  publication: string;
  author: string;
  authorRole: string;
  /** Free-text date as the publisher gives it (issue/year), shown as-is. */
  published: string;
  /** ISO date used for sorting and structured data. */
  isoDate: string;
  /** Link to the original article on the publisher's site. */
  url: string;
  /** Our own words — never copied from the article. */
  summary: string;
  /** Short own-words takeaways. */
  highlights: string[];
  /** A very short fragment quoted from the article (under 15 words). */
  pullQuote: string;
  quoteAttribution: string;
};

export const PRESS: PressItem[] = [
  {
    slug: "vvob-her-voice-in-science",
    headline: "Unpacking STEM Careers: Her Voice in Science",
    outlet: "VVOB in Kenya",
    publication: "The Learning Leader, Issue 1: 2025 (pp. 39–40)",
    author: "Dorian Mwangi",
    authorRole: "Communication Advisor, VVOB in Kenya",
    published: "February 2025",
    isoDate: "2025-02-11",
    url: "https://vvob.org/stories-news/unpacking-stem-careers-her-voice-in-science",
    summary:
      "VVOB, the education development organisation, profiled our founder Victoria Wakoli in its newsletter for teachers and education leaders. The feature follows her path from a curious schoolgirl who liked explaining maths and science to classmates, to the only woman on the science team at Makueni School, and shows how she turns that position into encouragement for girls who are told, openly or quietly, that STEM is not for them.",
    highlights: [
      "Teaches mathematics and integrated science at Makueni School, Makueni County.",
      "Helped a struggling learner move from a D- to a B in mathematics by working on mindset as much as method.",
      "Serves as patron of the Red Cross and St. John Ambulance societies and started journalism and mental health clubs at her school.",
      "Took part in the 2025 International Day of Women and Girls in Science and calls for fairer recognition of women in science.",
    ],
    pullQuote: "bring a folding chair",
    quoteAttribution: "Victoria Wakoli, on claiming a seat at the table",
  },
];
