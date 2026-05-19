import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Construction Plans — Silver, Gold & Platinum | Ironspan Bengaluru" },
      { name: "description", content: "Choose Silver, Gold, or Platinum construction packages. Transparent per-sqft pricing in Bengaluru with varying material grades and service levels." },
      { property: "og:title", content: "Construction Plans — Ironspan Bengaluru" },
      { property: "og:description", content: "Silver, Gold and Platinum build packages with transparent material specs." },
    ],
  }),
  component: PlansPage,
});

const plans = [
  {
    name: "Silver",
    tag: "Essential build",
    price: "₹1,799",
    unit: "per sqft",
    desc: "Honest, durable construction with quality standard-grade materials. Ideal for rental properties and budget-conscious builds.",
    highlight: false,
    cta: "Start with Silver",
    features: [
      { t: "Structural steel: Fe 500 TMT (standard brand)", on: true },
      { t: "Cement: OPC 43 grade (UltraTech / equivalent)", on: true },
      { t: "Bricks: red clay / standard concrete blocks", on: true },
      { t: "Flooring: 2x2 vitrified tiles", on: true },
      { t: "Kitchen: granite counter, basic modular", on: true },
      { t: "Bath fittings: Cera / Parryware standard", on: true },
      { t: "Paint: Asian Paints Tractor Emulsion", on: true },
      { t: "Electrical: Anchor / Polycab standard", on: true },
      { t: "Site supervision: weekly visit", on: true },
      { t: "3D walkthrough & interior styling", on: false },
      { t: "Smart-home pre-wiring", on: false },
      { t: "Dedicated project manager", on: false },
    ],
    timeline: "10–12 months (G+1, 2000 sqft)",
    warranty: "1-year structural warranty",
  },
  {
    name: "Gold",
    tag: "Most popular",
    price: "₹2,499",
    unit: "per sqft",
    desc: "Premium-grade materials, sharper finishes and dedicated project management. Our recommended package for owner-occupied homes.",
    highlight: true,
    cta: "Go with Gold",
    features: [
      { t: "Structural steel: Fe 550D TMT (Tata Tiscon / JSW)", on: true },
      { t: "Cement: OPC 53 grade premium", on: true },
      { t: "Bricks: AAC blocks (Magicrete / Siporex)", on: true },
      { t: "Flooring: large-format vitrified + wooden bedrooms", on: true },
      { t: "Kitchen: quartz counter, premium modular", on: true },
      { t: "Bath fittings: Jaquar / Kohler mid-line", on: true },
      { t: "Paint: Asian Paints Royale interior + Apex exterior", on: true },
      { t: "Electrical: Havells / Legrand premium", on: true },
      { t: "Site supervision: visits every 2 days", on: true },
      { t: "3D walkthrough & interior styling", on: true },
      { t: "Smart-home pre-wiring", on: false },
      { t: "Dedicated project manager", on: true },
    ],
    timeline: "8–10 months (G+1, 2000 sqft)",
    warranty: "3-year structural + 1-year finishing warranty",
  },
  {
    name: "Platinum",
    tag: "Signature build",
    price: "₹3,499",
    unit: "per sqft",
    desc: "Imported finishes, designer-led interiors, and white-glove project management. For homes meant to be landmarks.",
    highlight: false,
    cta: "Reserve Platinum",
    features: [
      { t: "Structural steel: Fe 550D TMT + RCC design audit", on: true },
      { t: "Cement: PPC + waterproofing admixtures", on: true },
      { t: "Bricks: AAC blocks + insulated cavity walls", on: true },
      { t: "Flooring: Italian marble / engineered wood", on: true },
      { t: "Kitchen: imported quartz, Häfele / Bosch appliances", on: true },
      { t: "Bath fittings: Kohler / Grohe / Duravit signature", on: true },
      { t: "Paint: Asian Paints Royale Luxe + textured exteriors", on: true },
      { t: "Electrical: Schneider / Legrand designer range", on: true },
      { t: "Site supervision: daily on-site engineer", on: true },
      { t: "3D walkthrough & interior styling", on: true },
      { t: "Smart-home pre-wiring & automation", on: true },
      { t: "Dedicated project manager + architect", on: true },
    ],
    timeline: "7–9 months (G+1, 2000 sqft)",
    warranty: "5-year structural + 2-year finishing warranty",
  },
];

function PlansPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Build Packages</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            Choose the build that fits your budget.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Three transparent construction packages with itemised material brands and
            service levels. No hidden markups — pay for the quality you actually want.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col border bg-card p-8 ${
                p.highlight ? "border-accent shadow-[0_0_0_2px_var(--accent)]" : "border-border"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-1 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                  <Sparkles className="h-3 w-3" /> {p.tag}
                </span>
              )}
              {!p.highlight && (
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
              )}
              <h2 className="mt-4 font-display text-3xl font-bold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-accent">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.unit}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Indicative — final quote based on scope.</p>

              <Link
                to="/quote"
                className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-accent text-accent-foreground hover:brightness-95"
                    : "border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-8 border-t border-border pt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What's included
                </div>
                <ul className="mt-4 space-y-3">
                  {p.features.map((f) => (
                    <li key={f.t} className="flex items-start gap-2 text-sm">
                      {f.on ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                      )}
                      <span className={f.on ? "text-foreground/85" : "text-muted-foreground/60 line-through"}>
                        {f.t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-2 border-t border-border pt-6 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-muted-foreground">Timeline:</span>{" "}
                  <span className="text-foreground/80">{p.timeline}</span>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-muted-foreground">Warranty:</span>{" "}
                  <span className="text-foreground/80">{p.warranty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          All packages include: structural drawings coordination, BBMP/BDA liaison support,
          weekly progress reports, and an itemised material bill at every stage.
        </p>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Need a custom mix?</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/70">
              Upgrade flooring on a Silver build, or pick Platinum bathrooms with a Gold base.
              We'll tailor the spec to your taste.
            </p>
          </div>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            Build a custom quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
