import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Home, Building2, Factory, Hammer, Ruler, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ironspan Construction" },
      { name: "description", content: "Residential, commercial, and industrial construction services: design-build, general contracting, renovations, and more." },
      { property: "og:title", content: "Services — Ironspan Construction" },
      { property: "og:description", content: "Design-build, general contracting, and renovations for residential and commercial projects." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { Icon: Home, title: "Residential Construction", desc: "Custom single-family homes, multi-family developments, and luxury estates built to last." },
  { Icon: Building2, title: "Commercial Construction", desc: "Office buildings, retail centers, hospitality, and mixed-use developments." },
  { Icon: Factory, title: "Industrial & Warehouse", desc: "Distribution centers, manufacturing facilities, and large-span structures." },
  { Icon: Ruler, title: "Design-Build", desc: "Single-point accountability from concept and architecture through final handover." },
  { Icon: Hammer, title: "Renovations & Tenant Improvements", desc: "Adaptive reuse, structural upgrades, and modern interior fit-outs." },
  { Icon: Wrench, title: "Pre-Construction & Estimating", desc: "Feasibility, budgeting, value engineering, and scheduling before shovels hit the ground." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Services</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            Full-service construction, start to finish.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Whether you're planning a custom home or a multi-story commercial build,
            our integrated teams cover every phase with precision.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, desc }) => (
            <div key={title} className="border border-border bg-card p-8 transition hover:border-accent">
              <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Don't see your project type?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
