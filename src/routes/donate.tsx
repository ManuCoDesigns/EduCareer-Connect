import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Compass, HeartHandshake, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/common/Reveal";
import { DonateForm } from "@/components/site/DonateForm";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/donate")({
  head: () =>
    pageMeta({
      title: "Donate and sponsor",
      description: `Support ${ORG.abbreviation}: sponsor a learner's guidance sessions, school career days and mentorship in ${ORG.location}.`,
      path: "/donate",
    }),
  component: DonatePage,
});

const WAYS = [
  {
    Icon: Compass,
    title: "Sponsor guidance sessions",
    text: "Cover career guidance for learners whose families cannot.",
  },
  {
    Icon: Users,
    title: "Back school career days",
    text: "Help us take professionals and workshops into more schools.",
  },
  {
    Icon: BookOpen,
    title: "Fund learning resources",
    text: "Guides, worksheets and materials learners can keep.",
  },
  {
    Icon: HeartHandshake,
    title: "Grow mentorship",
    text: "Pair more young people with working professionals.",
  },
];

function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Give"
        title="Help a young person find direction."
        lede={`${ORG.abbreviation} is a non-profit, non-political and non-religious organization. Every gift goes toward guidance, counselling and mentorship for Kenyan learners.`}
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Donate" }]} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading title="Where your gift goes" />
            <ul className="mt-8 space-y-6">
              {WAYS.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delayMs={i * 70}>
                  <li className="flex gap-4">
                    <span className="icon-badge inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
              Organisations and schools that would like to partner or sponsor a programme can{" "}
              <Link to="/contact" className="font-medium text-primary hover:underline">
                contact us
              </Link>{" "}
              to discuss it directly.
            </p>
          </div>
          <DonateForm />
        </div>
      </Section>
      <SiteFooter />
    </div>
  );
}
