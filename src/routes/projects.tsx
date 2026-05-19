import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import residentialImg from "@/assets/project-residential.jpg";
import commercialImg from "@/assets/project-commercial.jpg";
import industrialImg from "@/assets/project-industrial.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Ironspan Construction" },
      { name: "description", content: "Explore featured residential, commercial, and industrial projects built by Ironspan Construction." },
      { property: "og:title", content: "Projects — Ironspan Construction" },
      { property: "og:description", content: "A portfolio of award-winning residential and commercial builds." },
      { property: "og:image", content: commercialImg },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { img: residentialImg, cat: "Residential", title: "Cliffside Residence", loc: "Pacific Heights", year: "2024", desc: "A 6,400 sqft custom home built into a hillside, featuring full-height glazing and a cantilevered terrace." },
  { img: commercialImg, cat: "Commercial", title: "Foundry Tower", loc: "Downtown Core", year: "2023", desc: "12-story Class A office tower with ground-floor retail and underground parking." },
  { img: industrialImg, cat: "Industrial", title: "Northgate Distribution", loc: "Port District", year: "2023", desc: "180,000 sqft distribution facility with 32-foot clear heights and 28 loading docks." },
  { img: residentialImg, cat: "Residential", title: "Maple Grove Townhomes", loc: "Eastside", year: "2022", desc: "24-unit luxury townhome community with shared green spaces and underground parking." },
  { img: commercialImg, cat: "Commercial", title: "Civic Center Plaza", loc: "Midtown", year: "2022", desc: "Mixed-use development blending retail, office, and public gathering spaces." },
  { img: industrialImg, cat: "Industrial", title: "Westline Manufacturing", loc: "Industrial Park", year: "2021", desc: "Custom manufacturing facility with integrated office wing and clean-room areas." },
];

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Portfolio</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            Built to stand. Designed to inspire.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A selection of projects across residential, commercial, and industrial sectors.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.cat}</span>
                  <span className="text-xs text-muted-foreground">{p.year}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold">{p.title}</h2>
                <p className="text-sm text-muted-foreground">{p.loc}</p>
                <p className="mt-4 text-sm text-foreground/80">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Your project, our next milestone.</h2>
          <Link to="/quote" className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
