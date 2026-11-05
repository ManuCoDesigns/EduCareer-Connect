import { useLang, useT } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { CTASection } from "@/components/common/Blocks";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { EVENT_TYPES, PAST, UPCOMING, type EventItem } from "@/lib/content/events";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => ({
    ...pageMeta({
      title: "Events",
      description: `Workshops, career days and the Annual General Meeting of ${ORG.abbreviation} in ${ORG.location}.`,
      path: "/events",
    }),
    scripts:
      UPCOMING.length > 0
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(
                UPCOMING.map((e) => ({
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: e.title,
                  startDate: e.date,
                  description: e.summary,
                  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                  location: { "@type": "Place", name: e.venue },
                  organizer: { "@type": "Organization", name: ORG.name, url: ORG.siteUrl },
                })),
              ),
            },
          ]
        : [],
  }),
  component: EventsPage,
});

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const { t, locale } = useLang();
  const type = EVENT_TYPES.find((t) => t.key === event.type);
  return (
    <article className={`card-elegant p-6 ${past ? "opacity-80" : ""}`}>
      <p className="text-xs font-medium text-primary">{type ? t(type.title) : ""}</p>
      <h3 className="mt-1 text-xl">{event.title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <CalendarDays className="size-4 text-gold" /> {formatDate(event.date, locale)}
        </li>
        {event.time && (
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-gold" /> {event.time}
          </li>
        )}
        <li className="flex items-center gap-2">
          <MapPin className="size-4 text-gold" /> {event.venue}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
    </article>
  );
}

function EventsPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Events"
        title="Come and learn with us."
        lede="Workshops, career days and member meetings that bring learners, parents, teachers and professionals together."
        actions={
          <Button asChild variant="secondary" size="lg">
            <Link to="/book">{t("Book a session")}</Link>
          </Button>
        }
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Events" }]} />

      <Section>
        <SectionHeading title="Upcoming events" />
        {UPCOMING.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {UPCOMING.map((e) => (
              <Reveal key={e.slug}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="card-elegant mt-8 grid items-center gap-6 p-6 sm:p-10 md:grid-cols-2">
              <div>
                <h3 className="text-xl">{t("No dates announced yet")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "We announce events here and to our email list first. Subscribe and we'll tell you as soon as the next workshop, career day or meeting is set.",
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-primary">{t("Get notified")}</p>
                <NewsletterForm tone="light" />
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="What we run"
          lede="Three kinds of gatherings, each with a clear purpose."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {EVENT_TYPES.map((type, i) => (
            <Reveal key={type.key} delayMs={i * 80}>
              <div className="card-elegant h-full p-6">
                <span className="icon-badge inline-flex size-11 items-center justify-center rounded-lg text-primary-foreground">
                  <type.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{t(type.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(type.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {PAST.length > 0 && (
        <Section>
          <SectionHeading title="Past events" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {PAST.map((e) => (
              <EventCard key={e.slug} event={e} past />
            ))}
          </div>
        </Section>
      )}

      <Section tone={PAST.length > 0 ? "muted" : "default"}>
        <CTASection
          title="Want ECCO at your school?"
          lede="We bring career days and workshops to schools and community groups. Tell us what you have in mind."
          primaryLabel="Contact us"
          primaryHref="/contact"
          secondaryLabel="Book a session"
          secondaryHref="/book"
        />
      </Section>
      <SiteFooter />
    </div>
  );
}
