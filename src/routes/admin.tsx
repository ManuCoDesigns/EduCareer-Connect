import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section } from "@/components/layout/Section";
import { AdminDashboard } from "@/components/site/AdminDashboard";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () =>
    pageMeta({
      title: "Admin",
      description: "Private ECCO administration.",
      path: "/admin",
      noindex: true,
    }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section>
        <AdminDashboard />
      </Section>
      <SiteFooter />
    </div>
  );
}
