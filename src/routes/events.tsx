import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { CTASection } from "@/components/common/Blocks";
import { ShareButtons } from "@/components/common/ShareButtons";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { EVENT_TYPES, partitionEvents, type EventItem } from "@/lib/content/events";
import { ORG } from "@/lib/content/site";
import { useLang, useT } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => {
    const { upcoming } = partitionEvents();
    return {
      ...pageMeta({
        title: "Events",
        description: `Workshops, mentorship programs, career days and the Annual General Meeting of ${ORG.abbreviation} in ${ORG.location}.`,
        path: "/events",
        ...(upcoming[0]?.image ? { image: `${ORG.siteUrl}${upcoming[0].image}` } : {}),
      }),
      scripts:
        upcoming.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  upcoming.map((e) => ({
                    "@context": "https://schema.org",
                    "@type": "Event",
                    name: `${ORG.abbreviation} ${e.title}`,
                    startDate: e.date,
                    endDate: e.endDate ?? e.date,
                    description: e.summary,
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    ...(e.image ? { image: [`${ORG.siteUrl}${e.image}`] } : {}),
                    location: {
                      "@type": "Place",
                      name: e.venue,
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: e.locality ?? "",
                        addressCountry: "KE",
                      },
                    },
                    organizer: { "@type": "Organization", name: ORG.name, url: ORG.siteUrl },
                  })),
                ),
              },
            ]
          : [],
    };
  },
  component: EventsPage,
});

function formatDates(event: EventItem, locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const start = new Date(event.date);
  if (!event.endDate || event.endDate === event.date) return fmt.format(start);
  return fmt.formatRange(start, new Date(event.endDate));
}

function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const { t, locale } = useLang();
  const type = EVENT_TYPES.find((x) => x.key === event.type);
  return (
    <article
      className={`card-elegant grid overflow-hidden p-0 ${
        event.image ? "md:grid-cols-2" : ""
      } ${past ? "opacity-80" : ""}`}
    >
      {event.image && (
        <img
          src={event.image}
          alt={`${t(event.title)} — ${t("poster")}`}
          loading="lazy"
          className="aspect-square h-auto w-full self-start object-contain"
        />
      )}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-medium text-primary">{type ? t(type.title) : ""}</p>
        <h3 className="mt-1 text-2xl">{t(event.title)}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-gold" />
            {formatDates(event, locale)}
          </li>
          {event.time && (
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" /> {event.time}
            </li>
          )}
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {event.venue}
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(event.summary)}</p>

        {event.focus && event.focus.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-medium text-primary">{t("Our focus")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {event.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground"
                >
                  {t(f)}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-medium text-primary">{t("Meet your mentors")}</p>
            <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {event.speakers.map((s) => (
                <li key={s.name}>
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{t(s.role)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!past && event.registerPhones && event.registerPhones.length > 0 && (
          <div className="mt-6 rounded-xl bg-secondary/50 p-4">
            <p className="flex items-center gap-2 text-xs font-medium text-primary">
              <Phone className="size-3.5" /> {t("For registration & contact")}
            </p>
            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
              {event.registerPhones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="text-foreground hover:text-primary"
                >
                  {p}
                </a>
              ))}
            </p>
          </div>
        )}

        {!past && (
          <div className="mt-6">
            <ShareButtons path="/events" title={`${event.title} — ${ORG.abbreviation}`} />
          </div>
        )}
      </div>
    </article>
  );
}

function EventsPage() {
  const t = useT();
  const { upcoming, past } = partitionEvents();
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
        {upcoming.length > 0 ? (
          <div className="mt-8 space-y-8">
            {upcoming.map((e) => (
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
          lede="Four kinds of gatherings, each with a clear purpose."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {past.length > 0 && (
        <Section>
          <SectionHeading title="Past events" />
          <div className="mt-8 space-y-8">
            {past.map((e) => (
              <EventCard key={e.slug} event={e} past />
            ))}
          </div>
        </Section>
      )}

      <Section tone={past.length > 0 ? "muted" : "default"}>
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
