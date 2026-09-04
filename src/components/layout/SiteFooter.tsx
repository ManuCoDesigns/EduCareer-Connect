import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/Logo.png.asset.json";
import { FOOTER_LINKS, ORG } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="hero-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-12 w-12 object-contain" />
            <span className="text-lg font-semibold">EduCareer Connect</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            {ORG.tagline}. A non-profit, non-political and non-religious organization serving every
            learner.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/60">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/60">
            Reach us
          </p>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {ORG.location}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${ORG.email}`} className="hover:text-gold">
                {ORG.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`tel:${ORG.phone}`} className="hover:text-gold">
                {ORG.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-primary-foreground/55">
          © {new Date().getFullYear()} EduCareer Connect Organization. Non-profit, non-political,
          non-religious.
        </div>
      </div>
    </footer>
  );
}
