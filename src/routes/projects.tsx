import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditableText } from "@/components/admin/EditableText";
import residentialImg from "@/assets/project-residential.jpg";
import commercialImg from "@/assets/project-commercial.jpg";
import industrialImg from "@/assets/project-industrial.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Chiguru Builders" },
      { name: "description", content: "Explore featured residential, commercial, and industrial projects built by Chiguru Builders." },
      { property: "og:title", content: "Projects — Chiguru Builders" },
      { property: "og:description", content: "A portfolio of residential and commercial builds by a new generation of engineers." },
      { property: "og:image", content: commercialImg },
    ],
  }),
  component: ProjectsPage,
});

const capabilities = [
  { img: residentialImg, cat: "Residential", title: "Independent Homes & Villas", loc: "G+1, G+2 builds across Bengaluru", desc: "Plot evaluation, structural design coordination, full civil and finishing work — handover-ready independent homes." },
  { img: residentialImg, cat: "Residential", title: "Home Renovations & Interiors", loc: "Apartments and independent homes", desc: "Full interior refits, kitchen and bath upgrades, structural modifications with proper engineering sign-off." },
  { img: commercialImg, cat: "Commercial", title: "Office Fit-outs", loc: "ORR, Whitefield, Koramangala", desc: "Bare-shell to plug-and-play office spaces — civil, MEP coordination, partitions, flooring and finishing." },
  { img: commercialImg, cat: "Commercial", title: "Retail & F&B Build-outs", loc: "High-street and mall locations", desc: "Fast-tracked retail interiors and restaurant build-outs with strict fire and safety compliance." },
  { img: industrialImg, cat: "Industrial", title: "Warehouse & Light Industrial", loc: "Peripheral ring-road belt", desc: "Pre-engineered building coordination, civil foundations, and supporting infrastructure for warehouses." },
  { img: industrialImg, cat: "Industrial", title: "Compound & Site Development", loc: "Bengaluru & surrounding districts", desc: "Site grading, compound walls, internal roads, and utility infrastructure for new developments." },
];

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            <EditableText contentKey="projects.hero.eyebrow" defaultValue="What we can build" />
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            <EditableText contentKey="projects.hero.title" defaultValue="Our portfolio starts with you." />
          </h1>
          <EditableText
            as="p"
            multiline
            contentKey="projects.hero.desc"
            defaultValue="We're a new Bengaluru firm with no completed projects yet — but a clear scope of work our founding team is ready to deliver. Be our first case study."
            className="mt-6 max-w-2xl text-muted-foreground"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {capabilities.map((p, i) => (
            <article key={p.title} className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    <EditableText contentKey={`projects.card.${i}.cat`} defaultValue={p.cat} />
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <EditableText contentKey={`projects.card.${i}.tag`} defaultValue="Reference image" />
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold">
                  <EditableText contentKey={`projects.card.${i}.title`} defaultValue={p.title} />
                </h2>
                <p className="text-sm text-muted-foreground">
                  <EditableText contentKey={`projects.card.${i}.loc`} defaultValue={p.loc} />
                </p>
                <p className="mt-4 text-sm text-foreground/80">
                  <EditableText contentKey={`projects.card.${i}.desc`} defaultValue={p.desc} multiline />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            <EditableText contentKey="projects.cta.title" defaultValue="Be our founding client." />
          </h2>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            <EditableText contentKey="projects.cta.btn" defaultValue="Get a Quote" /> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
