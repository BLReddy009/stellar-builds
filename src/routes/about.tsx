import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Testimonials } from "@/components/Testimonials";
import { TeamSection } from "@/components/TeamSection";
import { EditableText } from "@/components/admin/EditableText";
import { ArrowRight, Target, Users, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Chiguru Builders" },
      { name: "description", content: "Chiguru Builders is a residential and commercial builder driven by craftsmanship, safety, and accountability." },
      { property: "og:title", content: "About — Chiguru Builders" },
      { property: "og:description", content: "Meet the team behind Chiguru Builders." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            <EditableText contentKey="about.hero.eyebrow" defaultValue="About" />
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            <EditableText contentKey="about.hero.title" defaultValue="A builder built on integrity." />
          </h1>
          <EditableText
            as="p"
            multiline
            contentKey="about.hero.desc"
            defaultValue="Chiguru Builders is a new Bengaluru construction firm founded by a team with deep on-site experience across residential villas, office fit-outs, and warehouse builds. We're actively searching for our first projects — and we're ready to over-deliver to earn our reputation."
            className="mt-6 max-w-2xl text-muted-foreground"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        {[
          { Icon: Target, t: "Our Mission", d: "Bring honest pricing, modern project management, and uncompromising craft to every Bengaluru build we take on." },
          { Icon: Users, t: "Our Team", d: "A small founding crew of civil engineers, site supervisors, and finishing specialists with hands-on Bengaluru experience." },
          { Icon: Leaf, t: "Our Standards", d: "Documented site safety, weekly client updates, and itemised material billing — no markups, no surprises." },
        ].map(({ Icon, t, d }, i) => (
          <div key={t}>
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-display text-xl font-semibold">
              <EditableText contentKey={`about.pillar.${i}.t`} defaultValue={t} />
            </h3>
            <p className="mt-3 text-muted-foreground">
              <EditableText contentKey={`about.pillar.${i}.d`} defaultValue={d} multiline />
            </p>
          </div>
        ))}
      </section>

      <TeamSection />

      <Testimonials variant="dark" />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="max-w-3xl font-display text-3xl font-bold md:text-4xl">
            <EditableText contentKey="about.quote.text" defaultValue={'"We\u2019re new — and that\u2019s exactly why your first project will be our most important one."'} multiline />
          </h2>
          <p className="mt-6 text-primary-foreground/70">
            <EditableText contentKey="about.quote.attr" defaultValue="— Founding Team, Chiguru Builders Bengaluru" />
          </p>
          <Link to="/quote" className="mt-10 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            <EditableText contentKey="about.quote.cta" defaultValue="Start your project" /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
