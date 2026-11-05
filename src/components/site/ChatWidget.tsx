import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQS, MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS } from "@/lib/content/misc";
import { PROGRAMS } from "@/lib/content/programs";
import { PRESS } from "@/lib/content/press";
import { ORG } from "@/lib/content/site";
import { FOUNDER, GODFREY_CHESA } from "@/lib/content/team";

type ChatMessage = { role: "user" | "bot"; text: string };

/**
 * `title` is what the entry is about (a question, a program name); `body` is the
 * supporting text. A query word found in the title counts for more than one
 * found only in the body, so "can my school partner" lands on the partnership
 * FAQ rather than any answer that merely mentions schools.
 */
type KnowledgeEntry = { title: string; body: string; answer: string };

function buildKnowledgeBase(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];
  const add = (title: string, body: string, answer: string) =>
    entries.push({ title: title.toLowerCase(), body: body.toLowerCase(), answer });

  // Order matters: on a tie the earlier entry wins. Broad entries come first so
  // vague questions ("what is ECCO", "membership", "programs") get the overview.
  add(
    "what is ecco about mission vision organization who we are",
    ORG.description,
    ORG.description,
  );

  add(
    "contact reach email phone call where location office based address",
    `${ORG.email} ${ORG.phoneDisplay} ${ORG.location}`,
    `You can reach ${ORG.abbreviation} at ${ORG.email} or ${ORG.phoneDisplay}. Our office is in ${ORG.location}.`,
  );

  add(
    "membership benefits members get perks",
    `${MEMBERSHIP_BENEFITS.join(" ")} join`,
    `As a member you get: ${MEMBERSHIP_BENEFITS.join("; ")}.`,
  );

  add(
    "programs services offer what do you do",
    PROGRAMS.map((p) => p.title).join(" "),
    `${ORG.abbreviation} runs ${PROGRAMS.length} programs: ${PROGRAMS.map((p) => p.title).join(", ")}. Ask me about any of them, or see the Programs page.`,
  );

  add(
    "team leadership leaders committee executive board runs leads staff people",
    `${FOUNDER.name} ${GODFREY_CHESA.name} ${GODFREY_CHESA.role}`,
    `${ORG.abbreviation} was founded by ${FOUNDER.name} and is guided by an Executive Committee, with ${GODFREY_CHESA.name} as ${GODFREY_CHESA.role}. You can meet the team on our Team page.`,
  );

  add(
    `${GODFREY_CHESA.name} ${GODFREY_CHESA.role} educator counselor pastor minister soccer coach`,
    GODFREY_CHESA.shortBio,
    `${GODFREY_CHESA.name} is ECCO's ${GODFREY_CHESA.role}. ${GODFREY_CHESA.shortBio}`,
  );

  add(
    `${FOUNDER.name} founder started founded`,
    FOUNDER.bio,
    `${FOUNDER.name} is the founder of ${ORG.abbreviation}. ${FOUNDER.bio}`,
  );

  add(
    "book booking appointment session schedule guidance counselling meet request",
    "book a guidance session appointment",
    "You can request a guidance or counselling session on our Book a session page. Tell us who it is for and what you need, and we'll confirm a time by phone, WhatsApp or email.",
  );

  add(
    "events workshop career day agm annual general meeting upcoming calendar",
    "events workshops career days annual general meeting",
    "We run workshops, school career days and an Annual General Meeting for members. See what's coming up on our Events page, or subscribe to our newsletter to be told first.",
  );

  add(
    "donate donation give support sponsor fund contribute gift",
    "donate sponsor support give money mpesa",
    "You can support ECCO by sponsoring guidance sessions, school career days, learning resources or mentorship. Visit our Donate page for the M-Pesa details and to record your gift.",
  );

  add(
    "resources download guide worksheet checklist pdf free printable",
    "free downloadable guides worksheets pathways checklist",
    "Our Resources page has free downloads: a guide to the three CBE pathways, a first guidance session checklist and a pathway reflection worksheet.",
  );

  add(
    "swahili kiswahili language translate",
    "swahili kiswahili language switch",
    "Use the EN | SW switch at the top of the page to read the site's menus and main headings in Kiswahili.",
  );

  const press = PRESS[0];
  if (press) {
    add(
      "press media news featured coverage article interview journalist vvob stem newspaper",
      `${press.headline} ${press.outlet} ${FOUNDER.name}`,
      `${FOUNDER.name} was featured by ${press.outlet} in "${press.headline}" (${press.publication}). Read the summary and original link on our In the press page.`,
    );
  }

  for (const f of FAQS) add(f.question, f.answer, f.answer);

  for (const p of PROGRAMS) {
    add(p.title, `${p.summary} ${p.body} ${p.audience}`, `${p.title} — ${p.body}`);
  }

  for (const t of MEMBERSHIP_TIERS) {
    add(`${t.name} member membership tier`, t.body, `${t.name} member — ${t.body}`);
  }

  return entries;
}

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "do",
  "does",
  "how",
  "what",
  "can",
  "i",
  "my",
  "to",
  "for",
  "of",
  "in",
  "on",
  "and",
  "or",
  "with",
  "about",
  "you",
  "your",
  "me",
  "it",
  "this",
  "that",
  "who",
  "when",
  "why",
  "which",
  "there",
  "tell",
  "please",
  "know",
  "have",
  "has",
  "our",
  "any",
]);

function answerQuery(query: string, kb: KnowledgeEntry[]): string {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  if (words.length === 0) {
    return "Could you rephrase that? Try asking about membership, our programs, or how to reach us.";
  }

  // A word found in many entries (e.g. "ecco") says little; a rare word says a lot.
  const weight = (w: string) => {
    const df = kb.reduce((n, e) => n + ((e.title + " " + e.body).includes(w) ? 1 : 0), 0);
    return df === 0 ? 0 : Math.log(1 + kb.length / df);
  };

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of kb) {
    const score = words.reduce((acc, w) => {
      if (entry.title.includes(w)) return acc + 3 * weight(w);
      if (entry.body.includes(w)) return acc + weight(w);
      return acc;
    }, 0);
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  if (!best) {
    return "I don't have an answer for that yet — please reach out through our Contact page and we'll help directly.";
  }
  return best.entry.answer;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: `Hi! I'm the ${ORG.abbreviation} assistant. Ask me about membership, our programs, or how to get in touch.`,
    },
  ]);
  const [input, setInput] = useState("");
  const kbRef = useRef<KnowledgeEntry[]>(buildKnowledgeBase());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const answer = answerQuery(q, kbRef.current);
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answer }]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="icon-badge fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full text-primary-foreground shadow-elegant transition-transform hover:scale-105"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
          <div className="hero-surface flex items-center gap-2 px-4 py-3">
            <Sparkles className="size-4 text-gold" />
            <p className="text-sm font-semibold">{ORG.abbreviation} Assistant</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "bot"
                    ? "bg-secondary text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about membership, programs…"
              className="flex-1"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
