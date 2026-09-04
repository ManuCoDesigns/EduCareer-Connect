import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, { message: "Enter your name" }).max(120),
  email: z.string().trim().min(5).max(255).email({ message: "Enter a valid email address" }),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, { message: "Message is too short" })
    .max(4000, { message: "Message is too long" }),
});

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject ? parsed.data.subject : null,
      message: parsed.data.message,
      status: "new",
    });
    setLoading(false);

    if (error) {
      toast.error("We couldn't send your message. Please try again.");
      return;
    }

    setSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    toast.success("Message sent");
  };

  if (sent) {
    return (
      <div className="card-elegant flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="size-8 text-leaf" />
        <h3 className="text-xl">Message received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. We'll reply to your email as soon as possible.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-elegant space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Jane Mwikali"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={120}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject (optional)</Label>
        <Input
          id="subject"
          placeholder="e.g. School partnership enquiry"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={150}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={4000}
          rows={5}
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
