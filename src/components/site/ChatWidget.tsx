import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQS, MEMBERSHIP_TIERS, MEMBERSHIP_BENEFITS } from "@/lib/content/misc";
import { PROGRAMS } from "@/lib/content/programs";
import { ORG } from "@/lib/content/site";

type ChatMessage = { role: "user" | "bot"; text: string };

type KnowledgeEntry = { keywords: string; answer: string };

function buildKnowledgeBase(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  for (const f of FAQS) {
    entries.push({ keywords: `${f.question} ${f.answer}`.toLowerCase(), answer: f.answer });
  }

  for (const p of PROGRAMS) {
    entries.push({
      keywords: `${p.title} ${p.summary} ${p.body} ${p.audience}`.toLowerCase(),
      answer: `${p.title} — ${p.body}`,
    });
  }

  for (const t of MEMBERSHIP_TIERS) {
    entries.push({
      keywords: `${t.name} member membership tier ${t.body}`.toLowerCase(),
      answer: `${t.name} member — ${t.body}`,
    });
  }

  entries.push({
    keywords: "membership benefits what do i get if i join perks",
    answer: `As a member you get: ${MEMBERSHIP_BENEFITS.join("; ")}.`,
  });

  entries.push({
    keywords: "contact email phone reach location office where based address",
    answer: `You can reach ${ORG.abbreviation} at ${ORG.email} or ${ORG.phoneDisplay}. Our office is in ${ORG.location}.`,
  });

  entries.push({
    keywords: "what is ecco about mission vision who are you organization",
    answer: ORG.description,
  });

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

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of kb) {
    const score = words.reduce((acc, w) => acc + (entry.keywords.includes(w) ? 1 : 0), 0);
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
