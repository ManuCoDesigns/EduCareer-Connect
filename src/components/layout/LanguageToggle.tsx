import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

/** Compact EN | SW switch. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const item = (value: "en" | "sw", label: string, full: string) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      aria-label={full}
      className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
        lang === value
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      <Languages className="ml-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
      {item("en", "EN", "English")}
      {item("sw", "SW", "Kiswahili")}
    </div>
  );
}
