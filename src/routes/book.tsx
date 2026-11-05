import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, PhoneCall, UserRoundCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { BookingForm } from "@/components/site/BookingForm";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () =>
    pageMeta({
      title: "Book a guidance session",
      description: `Request a career guidance or counselling session with ${ORG.abbreviation} in ${ORG.location}, online or by phone.`,
      path: "/book",
    }),
  component: BookPage,
});

const STEPS = [
  {
    Icon: CalendarCheck,
    title: "Send your request",
    text: "Tell us who the session is for and what you need.",
  },
  {
    Icon: PhoneCall,
    title: "We contact you",
    text: "We confirm a time by phone, WhatsApp or email.",
  },
  {
    Icon: UserRoundCheck,
    title: "Meet your guide",
    text: "Get clear, CBE-aligned direction for the next step.",
  },
];

function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Guidance sessions"
        title="Book a session."
        lede="One-to-one or group guidance for learners, parents and schools. Simple to request, easy to schedule."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Book a session" }]} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ol className="space-y-6">
            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="icon-badge shrink-0">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-primary">Step {i + 1}</p>
                  <h2 className="text-lg">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
            <li className="rounded-2xl bg-secondary/50 p-5 text-sm text-muted-foreground">
              Prefer to talk first? Call {ORG.phoneDisplay} or email {ORG.email}.
            </li>
          </ol>
          <BookingForm />
        </div>
      </Section>
      <SiteFooter />
    </div>
  );
}
