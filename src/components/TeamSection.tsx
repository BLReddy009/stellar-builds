import { GraduationCap, HardHat, Ruler, Paintbrush, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import team1 from "@/assets/team/team-1.jpg";
import team2 from "@/assets/team/team-2.jpg";
import team3 from "@/assets/team/team-3.jpg";
import team4 from "@/assets/team/team-4.jpg";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Ruler,
  HardHat,
  Paintbrush,
};

type Engineer = {
  id: string;
  name: string;
  role: string;
  bio: string;
  img: string;
  iconKey: string;
};

const FALLBACK: Engineer[] = [
  {
    id: "f1",
    name: "Arjun Mehta",
    role: "Founding Partner & Civil Lead",
    bio: "BE Civil (RVCE). 6 years managing G+2 villas in Sarjapur and Whitefield. Obsessed with structural precision and honest billing.",
    img: team1,
    iconKey: "GraduationCap",
  },
  {
    id: "f2",
    name: "Priya Nair",
    role: "Project Architect",
    bio: "M.Arch (IIT-M). Former design lead at a top Bengaluru studio. Bridges blueprints with buildability — and never lets a detail slip.",
    img: team2,
    iconKey: "Ruler",
  },
  {
    id: "f3",
    name: "Karthik Rao",
    role: "Site Supervisor",
    bio: "Diploma Civil + 8 years on ORR commercial sites. Knows every Bengaluru subcontractor worth hiring. Safety-first, always.",
    img: team3,
    iconKey: "HardHat",
  },
  {
    id: "f4",
    name: "Divya Sharma",
    role: "Interior & Finishing Lead",
    bio: "B.Des (NID). Specialises in modular kitchens, bath layouts, and material palettes that look expensive without being so.",
    img: team4,
    iconKey: "Paintbrush",
  },
];

export function TeamSection() {
  const [engineers, setEngineers] = useState<Engineer[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("team_members")
      .select("id,name,role,bio,photo_url,icon,display_order")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        setEngineers(
          data.map((d) => ({
            id: d.id,
            name: d.name,
            role: d.role,
            bio: d.bio,
            img: d.photo_url ?? team1,
            iconKey: d.icon,
          })),
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">The Team</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          A new generation of engineers.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Young, credentialed, and Bengaluru-bred. Our founding team brings fresh
          energy and hard-won site experience to every project we touch.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {engineers.map((e) => {
          const Icon = ICONS[e.iconKey] ?? GraduationCap;
          return (
          <div key={e.id} className="group flex flex-col border border-border bg-card">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={e.img}
                alt={e.name}
                loading="lazy"
                width={512}
                height={640}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{e.role}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{e.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{e.bio}</p>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
