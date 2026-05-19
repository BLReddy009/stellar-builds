import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Home, Factory, Hammer, ShieldCheck, Clock, Award, Check, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Testimonials } from "@/components/Testimonials";
import heroImg from "@/assets/hero-construction.jpg";
import residentialImg from "@/assets/project-residential.jpg";
import commercialImg from "@/assets/project-commercial.jpg";
import industrialImg from "@/assets/project-industrial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chiguru Builders — Residential & Commercial Builders" },
      { name: "description", content: "Chiguru Builders builds award-winning residential and commercial projects on time and on budget. Request a free quote today." },
      { property: "og:title", content: "Chiguru Builders" },
      { property: "og:description", content: "Residential & commercial builders. Request a free quote." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Modern construction site at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 bg-accent" /> New in Bengaluru · Taking on our first projects
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Bengaluru's newest builders — <span className="text-accent">ready to break ground.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            We're a young construction firm in Bengaluru building homes, offices and
            commercial spaces with modern project management and honest pricing.
            Be one of our founding clients.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-95"
            >
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              What We Offer
            </Link>
          </div>
        </div>

        {/* Founding promises */}
        <div className="relative border-t border-primary-foreground/10 bg-primary/95">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-foreground/10 px-6 md:grid-cols-4">
            {[
              ["Bengaluru", "Locally Founded"],
              ["0 → 1", "Founding Projects Open"],
              ["10%", "Off for First 5 Clients"],
              ["48 hrs", "Quote Turnaround"],
            ].map(([n, l]) => (
              <div key={l} className="py-8 pl-6 first:pl-0">
                <div className="font-display text-3xl font-bold text-accent md:text-4xl">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">What we do</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              End-to-end construction expertise.
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { Icon: Home, title: "Residential", desc: "Custom homes, multi-family, and renovations crafted to last generations." },
            { Icon: Building2, title: "Commercial", desc: "Offices, retail, and mixed-use developments built for performance." },
            { Icon: Factory, title: "Industrial", desc: "Warehouses and facilities engineered for scale and efficiency." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="group border border-border bg-card p-8 transition hover:border-accent">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why Chiguru Builders</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              A builder you can trust with your blueprint.
            </h2>
            <p className="mt-6 text-muted-foreground">
              We combine field-tested craftsmanship with modern project management
              to deliver buildings that owners are proud of and tenants love.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
              Learn about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { Icon: ShieldCheck, t: "Licensed & Insured", d: "Full coverage, every project." },
              { Icon: Clock, t: "On-Time Delivery", d: "98% milestone accuracy." },
              { Icon: Award, t: "Award-Winning", d: "12 industry honors since 2018." },
              { Icon: Hammer, t: "Master Craftsmen", d: "In-house experienced crews." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-accent" />
                <div className="mt-4 font-display text-base font-semibold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we can build */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <PlansTeaser />
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">What we can build</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Project types we're ready for.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Our portfolio is just getting started. Here's the scope of work our
              founding team has hands-on experience delivering.
            </p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { img: residentialImg, cat: "Residential", title: "Independent Homes & Villas", loc: "G+2 builds, plot to handover" },
            { img: commercialImg, cat: "Commercial", title: "Office & Retail Fit-outs", loc: "Bengaluru tech corridors" },
            { img: industrialImg, cat: "Industrial", title: "Warehouse & Light Industrial", loc: "Peripheral ring-road belt" },
          ].map((p) => (
            <div key={p.title} className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.cat}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Testimonials />
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 md:flex md:items-center md:justify-between md:gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to break ground?</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/70">
              Tell us about your project. We'll respond within one business day with next steps and a no-obligation estimate.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-0">
            <Link to="/quote" className="bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:brightness-95">Get a Quote</Link>
            <Link to="/contact" className="border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold hover:bg-primary-foreground/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function PlansTeaser() {
  const tiers = [
    { name: "Silver", price: "₹1,799", tag: "Essential", items: ["Fe 500 TMT, OPC 43", "Vitrified tile flooring", "Weekly site visits"] },
    { name: "Gold", price: "₹2,499", tag: "Most popular", items: ["Fe 550D TMT, AAC blocks", "Premium quartz + modular kitchen", "Dedicated project manager"], featured: true },
    { name: "Platinum", price: "₹3,499", tag: "Signature", items: ["Italian marble + imported finishes", "Smart-home pre-wiring", "Daily on-site engineer"] },
  ];
  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Build packages</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Silver, Gold or Platinum — your call.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three transparent tiers with itemised material brands and service levels.
            Mix and match if you need a custom spec.
          </p>
        </div>
        <Link to="/plans" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">
          Compare all packages <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className={`relative flex flex-col border bg-card p-8 ${t.featured ? "border-accent" : "border-border"}`}>
            {t.featured && (
              <span className="absolute -top-3 left-8 inline-flex items-center gap-1 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                <Sparkles className="h-3 w-3" /> {t.tag}
              </span>
            )}
            {!t.featured && <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.tag}</span>}
            <h3 className="mt-4 font-display text-2xl font-bold">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-accent">{t.price}</span>
              <span className="text-xs text-muted-foreground">/ sqft</span>
            </div>
            <ul className="mt-6 flex-1 space-y-2">
              {t.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                </li>
              ))}
            </ul>
            <Link to="/plans" className="mt-8 inline-flex items-center justify-center gap-2 border border-foreground bg-background px-4 py-2.5 text-sm font-semibold hover:bg-foreground hover:text-background">
              See full spec
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
