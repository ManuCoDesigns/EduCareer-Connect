import { useEffect, useState } from "react";
import logo from "@/assets/Logo.png.asset.json";
import profile from "@/assets/profile.jpeg.asset.json";

const slides = [
  {
    url: logo.url,
    alt: "EduCareer Connect Organization emblem with graduation cap, open book and laurels",
    fit: "object-contain rounded-full scale-[1.02]",
  },
  {
    url: profile.url,
    alt: "Victoria Wakoli, founder of EduCareer Connect Organization, at her desk",
    fit: "object-cover rounded-full",
  },
];

export function HeroRotator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-full bg-background/95 p-6 shadow-elegant sm:p-8">
      <div className="relative size-64 overflow-hidden rounded-full sm:size-80">
        {slides.map((s, i) => (
          <img
            key={s.url}
            src={s.url}
            alt={s.alt}
            className={`absolute inset-0 size-full transition-opacity duration-[2500ms] ease-in-out ${s.fit} ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
