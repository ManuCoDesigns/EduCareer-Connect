import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FOR_OPTIONS = ["myself", "my child", "my class or school", "other"] as const;
const MODES = ["in person", "online", "phone call"] as const;
const TOPICS = [
  "Choosing a CBE pathway",
  "Career exploration",
  "Subject and pathway selection",
  "Counselling and wellness",
  "Mentorship",
  "School or group session",
];

const schema = z.object({
  fullName: z.string().trim().min(2, { message: "Enter your name" }).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{9,14}$/, { message: "Enter a valid phone number, e.g. 0712345678" }),
  email: z.string().trim().max(255).email().optional().or(z.literal("")),
  bookingFor: z.enum(FOR_OPTIONS),
  gradeLevel: z.string().trim().max(60).optional().or(z.literal("")),
  topic: z.string().trim().min(2, { message: "Choose a topic" }).max(150),
  mode: z.enum(MODES),
  preferredDate: z.string().optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const parsed = schema.safeParse({
      fullName: f.get("fullName"),
      phone: String(f.get("phone") ?? "").replace(/[\s-]/g, ""),
      email: f.get("email"),
      bookingFor: f.get("bookingFor"),
      gradeLevel: f.get("gradeLevel"),
      topic: f.get("topic"),
      mode: f.get("mode"),
      preferredDate: f.get("preferredDate"),
      notes: f.get("notes"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    const d = parsed.data;
    setLoading(true);
    const { error } = await supabase.from("session_bookings").insert({
      full_name: d.fullName,
      phone: d.phone,
      email: d.email ? d.email : null,
      booking_for: d.bookingFor,
      grade_level: d.gradeLevel ? d.gradeLevel : null,
      topic: d.topic,
      mode: d.mode,
      preferred_date: d.preferredDate ? d.preferredDate : null,
      notes: d.notes ? d.notes : null,
      status: "new",
    });
    setLoading(false);
    if (error) {
      toast.error("We couldn't send your request. Please try again or call us.");
      return;
    }
    form.reset();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-elegant flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="size-8 text-leaf" />
        <h3 className="text-xl">Request received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you. We'll contact you by phone or email to confirm your session time.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Book another session
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-elegant space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" maxLength={120} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (WhatsApp if possible)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="0712 345 678" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input id="email" name="email" type="email" maxLength={255} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bookingFor">This session is for</Label>
          <select id="bookingFor" name="bookingFor" className={selectClass} defaultValue="myself">
            {FOR_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o.charAt(0).toUpperCase() + o.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradeLevel">Grade or level (optional)</Label>
          <Input id="gradeLevel" name="gradeLevel" placeholder="e.g. Grade 9" maxLength={60} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="topic">What would you like help with?</Label>
          <select id="topic" name="topic" className={selectClass} defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mode">How would you like to meet?</Label>
          <select id="mode" name="mode" className={selectClass} defaultValue="in person">
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredDate">Preferred date (optional)</Label>
        <Input id="preferredDate" name="preferredDate" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Anything we should know? (optional)</Label>
        <Textarea id="notes" name="notes" rows={4} maxLength={2000} />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Request a session"
        )}
      </Button>
    </form>
  );
}
