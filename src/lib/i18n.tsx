import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SW } from "@/lib/content/sw";

export type Lang = "en" | "sw";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translates an English string; unknown strings fall back to English. */
  t: (en: string) => string;
  /** Translates then fills {name} placeholders. */
  tf: (en: string, vars: Record<string, string>) => string;
  /** BCP-47 locale for dates and numbers. */
  locale: string;
};

const STORAGE_KEY = "ecco-lang";

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => undefined,
  t: (en) => en,
  tf: (en, vars) => en.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? ""),
  locale: "en-KE",
});

/**
 * The server and first client render are always English so SSR HTML (and SEO)
 * stays stable and hydration matches. A saved Swahili choice is applied right
 * after hydration.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "sw") setLangState("sw");
    } catch {
      /* storage unavailable: stay in English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (en) => (lang === "sw" ? (SW[en] ?? en) : en),
      tf: (en, vars) =>
        (lang === "sw" ? (SW[en] ?? en) : en).replace(
          /\{(\w+)\}/g,
          (_, k: string) => vars[k] ?? "",
        ),
      locale: lang === "sw" ? "sw-KE" : "en-KE",
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useT() {
  return useContext(LangContext).t;
}
