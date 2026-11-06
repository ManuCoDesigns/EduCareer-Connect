import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { NAV, ORG } from "@/lib/content/site";
import type { NavLink } from "@/lib/content/site";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useT } from "@/lib/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const links = NAV.flatMap((n) => ("children" in n ? n.children : [n]));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/images/logo.png"
            alt={`${ORG.name} logo`}
            className="h-11 w-11 shrink-0 object-contain"
          />
          <span className="hidden text-lg font-semibold leading-tight lg:block">
            EduCareer <span className="text-primary">Connect</span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${ORG.phone}`}
            className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-primary lg:flex"
          >
            <Phone className="size-3.5 text-gold" /> {ORG.phoneDisplay}
          </a>
          <LanguageToggle />
          <Button asChild size="sm" variant="outline">
            <Link to="/donate">{t("Donate")}</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/membership">{t("Join ECCO")}</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-10 flex flex-col gap-1 overflow-y-auto">
              {NAV.map((n) =>
                "children" in n ? (
                  <div key={n.label} className="mt-2">
                    <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t(n.label)}
                    </p>
                    {n.children.map((c) => (
                      <MobileLink key={c.href} link={c} pathname={pathname} />
                    ))}
                  </div>
                ) : (
                  <MobileLink key={n.href} link={n} pathname={pathname} />
                ),
              )}
            </nav>
            <LanguageToggle className="mt-6" />
            <SheetClose asChild>
              <Button asChild size="lg" className="mt-4 w-full">
                <Link to="/membership">{t("Join ECCO")}</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      <nav aria-label="Main" className="hidden border-t border-border/60 bg-secondary/40 md:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 lg:gap-x-7">
          {links.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                to={n.href}
                data-active={active}
                className={`nav-link text-sm font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t(n.label)}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function MobileLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const t = useT();
  return (
    <SheetClose asChild>
      <Link
        to={link.href}
        className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary ${
          pathname === link.href ? "text-primary" : "text-foreground"
        }`}
      >
        {t(link.label)}
      </Link>
    </SheetClose>
  );
}
