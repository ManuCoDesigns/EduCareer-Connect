import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { NAV, ORG } from "@/lib/content/site";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useT } from "@/lib/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

        <nav className="hidden items-center gap-3 md:flex lg:gap-6">
          {NAV.map((n) => {
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
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
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
            <nav className="mt-10 flex flex-col gap-1">
              {NAV.map((n) => (
                <SheetClose asChild key={n.href}>
                  <Link
                    to={n.href}
                    className={`rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary ${
                      pathname === n.href ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {t(n.label)}
                  </Link>
                </SheetClose>
              ))}
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
    </header>
  );
}
