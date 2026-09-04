import { useEffect, useState } from "react";
import founder1 from "@/assets/founder-1.jpeg.asset.json";
import founder2 from "@/assets/founder-2.png.asset.json";

const slides = [
  {
    url: founder1.url,
    alt: "Victoria Wakoli, founder of EduCareer Connect Organization, at her desk",
  },
  {
    url: founder2.url,
    alt: "Victoria Wakoli, founder of EduCareer Connect Organization, portrait",
  },
];

export function FounderSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <figure className="card-elegant overflow-hidden p-0">
      <div className="relative aspect-[4/5] w-full bg-secondary">
        {slides.map((s, i) => (
          <img
            key={s.url}
            src={s.url}
            alt={s.alt}
            loading="lazy"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-[2500ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <figcaption className="border-t border-border bg-card px-5 py-4">
        <p className="font-semibold text-primary">Victoria Wakoli</p>
        <p className="text-sm text-muted-foreground">Founder — EduCareer Connect Organization</p>
      </figcaption>
    </figure>
  );
}
