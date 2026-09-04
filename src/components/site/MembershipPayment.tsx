import { useState } from "react";
import { Loader2, Smartphone, ShieldCheck, Copy, CheckCircle2, Zap, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AMOUNT = 2000;
export const WALLET_NUMBER = "0796 040 638";
const WALLET_RAW = "0796040638";

function normalize(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return "254" + digits.slice(1);
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  if (/^[17]\d{8}$/.test(digits)) return "254" + digits;
  return null;
}

const schema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Enter your full name" })
    .max(120, { message: "Name is too long" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email is too long" })
    .email({ message: "Enter a valid email address" })
    .optional()
    .or(z.literal("")),
  mpesa_code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{8,20}$/, { message: "Enter the M-Pesa confirmation code, e.g. TJ45KL9QW1" }),
});

export function MembershipPayment() {
  return (
    <div className="card-elegant p-6 sm:p-8">
      <p className="text-xs font-medium text-primary">Membership contribution</p>
      <h3 className="mt-2 text-3xl">KSh 2,000</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        One-off annual membership fee, paid to the official ECCO M-Pesa wallet.
      </p>

      <Tabs defaultValue="manual" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="gap-1.5">
            <Smartphone className="size-4" /> Send &amp; confirm
          </TabsTrigger>
          <TabsTrigger value="stk" className="gap-1.5">
            <Zap className="size-4" /> Instant (STK Push)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="mt-6">
          <ManualPaymentForm />
        </TabsContent>

        <TabsContent value="stk" className="mt-6">
          <StkPushStub />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ManualPaymentForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_RAW);
      toast.success("Wallet number copied");
    } catch {
      toast.error("Could not copy — please dial it manually");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msisdn = normalize(phone);
    if (!msisdn) {
      toast.error("Enter a valid Safaricom number, e.g. 0712 345 678");
      return;
    }
    const parsed = schema.safeParse({ full_name: fullName, email, mpesa_code: code });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("membership_payments").insert({
      full_name: parsed.data.full_name,
      phone: msisdn,
      email: parsed.data.email ? parsed.data.email : null,
      amount: AMOUNT,
      mpesa_code: parsed.data.mpesa_code,
      status: "pending",
    });
    setLoading(false);

    if (error) {
      toast.error("We could not record your payment. Please try again.");
      return;
    }
    setOpen(true);
    setFullName("");
    setEmail("");
    setPhone("");
    setCode("");
    toast.success("Payment submitted for verification");
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <p className="text-xs font-medium text-muted-foreground">ECCO M-Pesa wallet</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xl font-semibold tracking-wide">{WALLET_NUMBER}</span>
          <Button type="button" variant="outline" size="sm" onClick={copyNumber}>
            <Copy className="size-4" /> Copy
          </Button>
        </div>
        <ol className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li>
            1. Open M-Pesa, choose <span className="font-medium text-foreground">Send Money</span>.
          </li>
          <li>
            2. Enter <span className="font-medium text-foreground">{WALLET_NUMBER}</span> (EduCareer
            Connect Organization).
          </li>
          <li>
            3. Enter amount <span className="font-medium text-foreground">KSh 2,000</span> and
            confirm with your PIN.
          </li>
          <li>4. Paste the confirmation code below so we can activate your membership.</li>
        </ol>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Jane Mwikali"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={120}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">M-Pesa number you paid from</Label>
          <div className="relative">
            <Smartphone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              inputMode="tel"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">M-Pesa confirmation code</Label>
          <Input
            id="code"
            placeholder="TJ45KL9QW1"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={20}
            required
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Submitting…
            </>
          ) : (
            <>Submit KSh 2,000 payment</>
          )}
        </Button>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-leaf" /> Funds go directly to the ECCO M-Pesa wallet.
          We never ask for your PIN.
        </p>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-leaf" /> Payment received for review
            </DialogTitle>
            <DialogDescription>
              Thank you. We have logged your KSh {AMOUNT.toLocaleString()} contribution and will
              confirm it against the ECCO M-Pesa wallet ({WALLET_NUMBER}). Your membership is
              activated once the code is verified.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Design-only preview of the future STK Push flow. Not wired to Daraja yet —
 * ships the exact UI/UX so the moment Safaricom credentials are added, only
 * the submit handler needs to call a Supabase Edge Function that triggers
 * the real STK prompt. Submission is intentionally disabled here.
 */
function StkPushStub() {
  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3">
        <Clock className="size-4 shrink-0 text-gold" />
        <p className="text-xs text-foreground">
          Instant checkout is coming soon. Use{" "}
          <span className="font-medium">Send &amp; confirm</span> to pay now — your membership is
          processed the same way either way.
        </p>
      </div>

      <div className="mt-5 space-y-4 opacity-60">
        <div className="space-y-2">
          <Label htmlFor="stk-name">Full name</Label>
          <Input id="stk-name" placeholder="Jane Mwikali" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stk-phone">M-Pesa number</Label>
          <div className="relative">
            <Smartphone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="stk-phone" placeholder="0712 345 678" className="pl-9" disabled />
          </div>
        </div>
        <Button type="button" size="lg" className="w-full" disabled>
          <Zap className="size-4" /> Send KSh 2,000 STK prompt
        </Button>
      </div>
    </div>
  );
}
