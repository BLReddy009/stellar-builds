import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "As a first-time client, I was nervous about choosing a newer firm — but Ironspan's communication and craftsmanship blew me away. Our home was delivered ahead of schedule.",
    name: "Priya Anand",
    role: "Homeowner, Cliffside Residence",
  },
  {
    quote:
      "They treated our café build-out like it was a flagship project. Honest pricing, sharp project management, and a finish quality you'd expect from much larger contractors.",
    name: "Daniel Ortiz",
    role: "Founder, Foundry Coffee Co.",
  },
  {
    quote:
      "Ironspan brought fresh thinking and zero ego. They flagged issues early, kept us informed weekly, and the final walk-through had a punch list of two items.",
    name: "Rachel Kim",
    role: "Director of Operations, Northgate Logistics",
  },
];

export function Testimonials({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <section className={isDark ? "bg-primary text-primary-foreground" : "bg-secondary"}>
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Client voices
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Early clients. Lasting trust.
          </h2>
          <p className={`mt-4 ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            We're a young company — and we earn every relationship through transparency,
            craft, and follow-through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`relative flex flex-col border p-8 ${
                isDark
                  ? "border-primary-foreground/15 bg-primary-foreground/5"
                  : "border-border bg-card"
              }`}
            >
              <Quote className="h-7 w-7 text-accent" />
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className={`mt-4 flex-1 text-sm leading-relaxed ${isDark ? "text-primary-foreground/85" : "text-foreground/85"}`}>
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border/40 pt-4">
                <div className="font-display text-sm font-semibold">{t.name}</div>
                <div className={`text-xs ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust signals */}
        <div
          className={`mt-16 grid grid-cols-2 gap-6 border-t pt-10 md:grid-cols-4 ${
            isDark ? "border-primary-foreground/15" : "border-border"
          }`}
        >
          {[
            ["Licensed", "& Insured"],
            ["OSHA 30", "Certified Crews"],
            ["A+ Rating", "Local Builders Assoc."],
            ["100%", "Client Referenceable"],
          ].map(([a, b]) => (
            <div key={a}>
              <div className="font-display text-2xl font-bold text-accent">{a}</div>
              <div className={`text-xs uppercase tracking-wider ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
