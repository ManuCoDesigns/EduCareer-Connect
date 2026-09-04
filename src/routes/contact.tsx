import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Breadcrumb, PageHero, Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { ORG } from "@/lib/content/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta({
      title: "Contact us",
      description: `Get in touch with ${ORG.abbreviation} — ${ORG.location}.`,
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        lede="Whether you're a learner, parent, teacher or partner — we'd like to hear from you."
      />
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-leaf" />
              <div>
                <p className="text-sm font-semibold text-foreground">Office</p>
                <p className="text-sm text-muted-foreground">{ORG.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-leaf" />
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <a
                  href={`mailto:${ORG.email}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {ORG.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-leaf" />
              <div>
                <p className="text-sm font-semibold text-foreground">Phone</p>
                <a
                  href={`tel:${ORG.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {ORG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
