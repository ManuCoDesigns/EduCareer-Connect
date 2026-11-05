import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Row = Record<string, string | number | boolean | null>;
type Result<T> = Promise<{ data: T | null; error: { message: string } | null }>;
type LooseTable = {
  select: (cols: string) => {
    order: (col: string, o: { ascending: boolean }) => { limit: (n: number) => Result<Row[]> };
  };
  update: (v: Row) => {
    eq: (col: string, v: string) => Promise<{ error: { message: string } | null }>;
  };
};
// The dashboard handles five tables generically, so it uses a loose view of the typed client.
const loose = supabase as unknown as { from: (t: string) => LooseTable };

type TableConfig = {
  table: string;
  label: string;
  columns: Array<{ key: string; label: string }>;
  statuses: string[];
};

const TABLES: TableConfig[] = [
  {
    table: "contact_messages",
    label: "Messages",
    columns: [
      { key: "created_at", label: "Date" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "message", label: "Message" },
    ],
    statuses: ["new", "read", "replied"],
  },
  {
    table: "session_bookings",
    label: "Bookings",
    columns: [
      { key: "created_at", label: "Date" },
      { key: "full_name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "booking_for", label: "For" },
      { key: "grade_level", label: "Grade" },
      { key: "topic", label: "Topic" },
      { key: "mode", label: "Mode" },
      { key: "preferred_date", label: "Preferred date" },
      { key: "notes", label: "Notes" },
    ],
    statuses: ["new", "contacted", "scheduled", "done", "cancelled"],
  },
  {
    table: "membership_payments",
    label: "Membership",
    columns: [
      { key: "created_at", label: "Date" },
      { key: "full_name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "amount", label: "KSh" },
      { key: "mpesa_code", label: "M-Pesa code" },
    ],
    statuses: ["pending", "verified", "rejected"],
  },
  {
    table: "donations",
    label: "Donations",
    columns: [
      { key: "created_at", label: "Date" },
      { key: "donor_name", label: "Donor" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "amount", label: "KSh" },
      { key: "purpose", label: "Purpose" },
      { key: "mpesa_code", label: "M-Pesa code" },
      { key: "anonymous", label: "Anonymous" },
    ],
    statuses: ["pending", "confirmed", "rejected"],
  },
  {
    table: "newsletter_subscribers",
    label: "Subscribers",
    columns: [
      { key: "created_at", label: "Date" },
      { key: "email", label: "Email" },
    ],
    statuses: ["subscribed", "unsubscribed"],
  },
];

function cell(key: string, value: Row[string]) {
  if (value === null || value === "") return "—";
  if (key === "created_at") return new Date(String(value)).toLocaleString("en-KE");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function toCsv(config: TableConfig, rows: Row[]) {
  const keys = [...config.columns.map((c) => c.key), "status"];
  const esc = (v: Row[string]) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = [...config.columns.map((c) => c.label), "Status"].map((h) => esc(h)).join(",");
  return [head, ...rows.map((r) => keys.map((k) => esc(r[k] ?? "")).join(","))].join("\n");
}

function TablePanel({ config }: { config: TableConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await loose
      .from(config.table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) {
      toast.error(`Couldn't load ${config.label.toLowerCase()}: ${error.message}`);
      return;
    }
    setRows(data ?? []);
  }, [config]);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    const { error } = await loose.from(config.table).update({ status }).eq("id", id);
    if (error) {
      toast.error("Couldn't update status");
      return;
    }
    setRows((prev) => prev.map((r) => (r["id"] === id ? { ...r, status } : r)));
  };

  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(config, rows)], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.table}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading…" : `${rows.length} record${rows.length === 1 ? "" : "s"}`}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void load()}>
            <RefreshCw className="size-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={rows.length === 0}>
            <Download className="size-4" /> CSV
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-secondary/60 text-xs text-muted-foreground">
            <tr>
              {config.columns.map((c) => (
                <th key={c.key} className="px-3 py-2 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  Nothing here yet.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={String(r["id"])} className="border-t border-border align-top">
                {config.columns.map((c) => (
                  <td key={c.key} className="max-w-xs px-3 py-2 break-words">
                    {cell(c.key, r[c.key] ?? null)}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <select
                    aria-label="Status"
                    value={String(r["status"])}
                    onChange={(e) => void setStatus(String(r["id"]), e.target.value)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                  >
                    {config.statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type Phase = "checking" | "signed-out" | "not-admin" | "admin";

export function AdminDashboard() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const evaluate = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setPhase("signed-out");
      return;
    }
    const { data: isAdmin } = await supabase.rpc("is_admin");
    setPhase(isAdmin === true ? "admin" : "not-admin");
  }, []);

  useEffect(() => {
    void evaluate();
    const { data } = supabase.auth.onAuthStateChange(() => {
      void evaluate();
    });
    return () => data.subscription.unsubscribe();
  }, [evaluate]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) toast.error("Sign-in failed. Check your email and password.");
    else setPassword("");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setPhase("signed-out");
  };

  if (phase === "checking") {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (phase === "signed-out") {
    return (
      <form onSubmit={signIn} className="card-elegant mx-auto max-w-sm space-y-4 p-6 sm:p-8">
        <h2 className="text-2xl">Admin sign in</h2>
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    );
  }

  if (phase === "not-admin") {
    return (
      <div className="card-elegant mx-auto max-w-md space-y-3 p-8 text-center">
        <h2 className="text-xl">No admin access</h2>
        <p className="text-sm text-muted-foreground">
          This account is signed in but isn't on the admin list.
        </p>
        <Button variant="outline" onClick={() => void signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl">Submissions</h2>
        <Button variant="outline" size="sm" onClick={() => void signOut()}>
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>
      <Tabs defaultValue={TABLES[0]?.table ?? ""}>
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          {TABLES.map((t) => (
            <TabsTrigger key={t.table} value={t.table}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABLES.map((t) => (
          <TabsContent key={t.table} value={t.table} className="mt-4">
            <TablePanel config={t} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
