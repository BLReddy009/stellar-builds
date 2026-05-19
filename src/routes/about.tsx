import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Target, Users, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ironspan Construction" },
      { name: "description", content: "Ironspan Construction is a residential and commercial builder driven by craftsmanship, safety, and accountability." },
      { property: "og:title", content: "About — Ironspan Construction" },
      { property: "og:description", content: "Meet the team behind Ironspan Construction." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">About</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            A builder built on integrity.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Founded in 2008, Ironspan has delivered over 240 residential and commercial
            projects across the region. We believe great construction starts with great
            communication — and ends with a building you're proud of.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        {[
          { Icon: Target, t: "Our Mission", d: "Deliver exceptional buildings that exceed expectations and stand the test of time." },
          { Icon: Users, t: "Our People", d: "120+ in-house carpenters, engineers, and project managers who take pride in their craft." },
          { Icon: Leaf, t: "Our Standards", d: "LEED-certified practices, zero-incident safety culture, and transparent budgets." },
        ].map(({ Icon, t, d }) => (
          <div key={t}>
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-3 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">
            "We treat every project like it's our own — because our name is on it."
          </h2>
          <p className="mt-6 text-primary-foreground/70">— Marcus Vela, Founder & CEO</p>
          <Link to="/quote" className="mt-10 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            Start your project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
