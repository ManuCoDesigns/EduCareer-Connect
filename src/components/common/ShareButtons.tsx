import { useT } from "@/lib/i18n";
import { useState } from "react";
import { Check, Facebook, Link2, MessageCircle, Send, Twitter } from "lucide-react";
import { toast } from "sonner";
import { ORG } from "@/lib/content/site";

type ShareProps = {
  /** Site-relative path, e.g. "/blog/some-post". Absolute URL is built from ORG.siteUrl. */
  path: string;
  title: string;
};

/** Share links for the main networks plus copy-to-clipboard. No third-party scripts. */
export function ShareButtons({ path, title }: ShareProps) {
  const tr = useT();
  const [copied, setCopied] = useState(false);
  const url = `${ORG.siteUrl}${path}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const targets = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      Icon: Twitter,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
    },
    { label: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, Icon: Send },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy the address bar link.");
    }
  };

  const base =
    "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium text-muted-foreground">{tr("Share")}</span>
      {targets.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={base}
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={base}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
