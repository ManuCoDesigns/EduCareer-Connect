import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryItem } from "@/lib/content/gallery-blog";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.url + item.caption}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary"
          >
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0">
          <DialogTitle className="sr-only">{active?.caption}</DialogTitle>
          {active && (
            <div className="relative">
              <img
                src={active.url}
                alt={active.alt}
                className="max-h-[80vh] w-full object-contain"
              />
              <p className="p-4 text-sm text-muted-foreground">{active.caption}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 rounded-full bg-background/90 p-1.5 shadow"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
