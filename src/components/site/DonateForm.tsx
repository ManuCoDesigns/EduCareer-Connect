import { useState } from "react";
import { CheckCircle2, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { WALLET_NUMBER } from "@/components/site/MembershipPayment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DONATION_PURPOSES = [
  "Where it is needed most",
  "Sponsor a learner's guidance sessions",
  "School career days and workshops",
  "Learning resources",
  "Mentorship programme",
];
const PRESETS = [500, 1000, 2000, 5000];

const schema = z.object({
  donorName: z.string().trim().min(2, { message: "Enter your name" }).max(120),
  phone: z.string().regex(/^\+?\d{9,14}$/, { message: "Enter a valid phone number" }),
  email: z.string().trim().max(255).email().optional().or(z.literal("")),
  amount: z.number().int().min(50, { message: "Minimum donation is KSh 50" }).max(1000000),
  purpose: z.string().min(2).max(150),
  mpesaCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{8,20}$/, { message: "Enter the M-Pesa confirmation code, e.g. TJ45KL9QW1" }),
});

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function DonateForm() {
  const [amount, setAmount] = useState<string>("1000");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_NUMBER.replace(/\s/g, ""));
      toast.success("Wallet number copied");
    } catch {
      toast.error("Couldn't copy the number");
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const parsed = schema.safeParse({
      donorName: f.get("donorName"),
      phone: String(f.get("phone") ?? "").replace(/[\s-]/g, ""),
      email: f.get("email"),
      amount: Number(amount),
      purpose: f.get("purpose"),
      mpesaCode: f.get("mpesaCode"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    const d = parsed.data;
    setLoading(true);
    const { error } = await supabase.from("donations").insert({
      donor_name: d.donorName,
      phone: d.phone,
      email: d.email ? d.email : null,
      amount: d.amount,
      purpose: d.purpose,
      mpesa_code: d.mpesaCode,
      anonymous: f.get("anonymous") === "on",
      status: "pending",
    });
    setLoading(false);
    if (error) {
      toast.error("We couldn't record your donation. Please try again or contact us.");
      return;
    }
    form.reset();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-elegant flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="size-8 text-leaf" />
        <h3 className="text-xl">Thank you for giving</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          We've recorded your donation and will confirm it against the ECCO M-Pesa wallet.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Make another donation
        </Button>
      </div>
    );
  }

  return (
    <div className="card-elegant p-6 sm:p-8">
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <p className="text-xs font-medium text-muted-foreground">ECCO M-Pesa wallet</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xl font-semibold tracking-wide">{WALLET_NUMBER}</span>
          <Button type="button" variant="outline" size="sm" onClick={copy}>
            <Copy className="size-4" /> Copy
          </Button>
        </div>
        <ol className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li>1. Open M-Pesa and choose Send Money.</li>
          <li>2. Send your gift to {WALLET_NUMBER} (EduCareer Connect Organization).</li>
          <li>3. Paste the confirmation code below so we can record it.</li>
        </ol>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (KSh)</Label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <Button
                key={p}
                type="button"
                size="sm"
                variant={amount === String(p) ? "default" : "outline"}
                onClick={() => setAmount(String(p))}
              >
                {p.toLocaleString("en-KE")}
              </Button>
            ))}
          </div>
          <Input
            id="amount"
            type="number"
            inputMode="numeric"
            min={50}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purpose">Support</Label>
          <select
            id="purpose"
            name="purpose"
            className={selectClass}
            defaultValue={DONATION_PURPOSES[0]}
          >
            {DONATION_PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="donorName">Your name</Label>
            <Input id="donorName" name="donorName" maxLength={120} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa number you paid from</Label>
            <Input id="phone" name="phone" type="tel" placeholder="0712 345 678" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional, for a thank-you)</Label>
            <Input id="email" name="email" type="email" maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mpesaCode">M-Pesa confirmation code</Label>
            <Input
              id="mpesaCode"
              name="mpesaCode"
              placeholder="TJ45KL9QW1"
              maxLength={20}
              required
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="anonymous" className="size-4 accent-[var(--primary)]" />
          Keep my gift anonymous
        </label>
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Recording…
            </>
          ) : (
            "Record my donation"
          )}
        </Button>
      </form>
    </div>
  );
}
