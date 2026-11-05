import { useT } from "@/lib/i18n";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.string().trim().min(5).max(255).email();

/** Compact signup for the dark footer. Duplicate emails are treated as success so addresses aren't revealed. */
export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Enter a valid email address");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase(), status: "subscribed" });
    setLoading(false);
    // 23505 = unique violation: already subscribed, which is fine for the visitor.
    if (error && error.code !== "23505") {
      toast.error("We couldn't subscribe you. Please try again.");
      return;
    }
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <p
        className={`mt-4 flex items-center gap-2 text-sm ${tone === "dark" ? "text-gold" : "text-primary"}`}
      >
        <Check className="size-4" /> {t("You're on the list. Thank you!")}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 flex max-w-xs gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("Email address")}
      </label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={255}
        required
        className={
          tone === "dark"
            ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            : ""
        }
      />
      <Button type="submit" variant={tone === "dark" ? "secondary" : "default"} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : t("Join")}
      </Button>
    </form>
  );
}
