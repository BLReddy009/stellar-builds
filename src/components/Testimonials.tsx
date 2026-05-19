import { Quote, ShieldCheck, IndianRupee, Hammer } from "lucide-react";

const promises = [
  {
    Icon: Hammer,
    quote:
      "Our founding team has spent years on Bengaluru sites — from villas in Sarjapur to office fit-outs on ORR. We're bringing that craft to our own firm.",
    name: "Founding Partner",
    role: "Site & Execution",
  },
  {
    Icon: IndianRupee,
    quote:
      "Every quote is itemised in writing. No hidden material markups, no surprise change orders — just transparent pricing you can take to the bank.",
    name: "Our Pricing Pledge",
    role: "Founding Commitment",
  },
  {
    Icon: ShieldCheck,
    quote:
      "As a new firm, our reputation is everything. We'll over-communicate, document everything, and treat your first walkthrough like our most important meeting.",
    name: "Our Service Pledge",
    role: "Founding Commitment",
  },
];

export function Testimonials({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <section className={isDark ? "bg-primary text-primary-foreground" : "bg-secondary"}>
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Why trust a new firm
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            No testimonials yet — but a clear set of promises.
          </h2>
          <p className={`mt-4 ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            We won't fake reviews we haven't earned. Instead, here's exactly what
            every founding client of our Bengaluru firm can count on from day one.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {promises.map((t) => (
            <figure
              key={t.name}
              className={`relative flex flex-col border p-8 ${
                isDark
                  ? "border-primary-foreground/15 bg-primary-foreground/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <t.Icon className="h-7 w-7 text-accent" />
                <Quote className="h-5 w-5 text-accent/50" />
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
            ["GST", "Registered Business"],
            ["MSME", "Udyam Recognised"],
            ["Insured", "Site & Liability Cover"],
            ["Bengaluru", "Local Team On-Site"],
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
