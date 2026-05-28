import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdmin } from "@/lib/useAdmin";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Layers, Package, ArrowRight, LogOut, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Chiguru Builders" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const admin = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin.loading && !admin.userId) navigate({ to: "/login" });
  }, [admin.loading, admin.userId, navigate]);

  if (admin.loading) return <div className="p-12 text-center text-muted-foreground">Loading…</div>;

  if (!admin.isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <Toaster />
        <h1 className="font-display text-2xl font-bold">Admin access required</h1>
        <p className="mt-2 text-muted-foreground">
          You're signed in as <span className="font-medium text-foreground">{admin.email}</span>.
          Ask the project owner to grant admin access.
        </p>
        <pre className="mt-4 overflow-x-auto rounded bg-muted/40 p-3 text-left text-xs">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${admin.userId}', 'admin');`}
        </pre>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  const cards = [
    { to: "/admin/team", title: "Team", desc: "Photos, roles, bios", Icon: Users },
    { to: "/admin/services", title: "Services", desc: "Service cards & descriptions", Icon: Briefcase },
    { to: "/admin/projects", title: "Projects", desc: "Portfolio items & images", Icon: Layers },
    { to: "/admin/packages", title: "Packages", desc: "Plans, prices, features, image", Icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">{admin.email}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/"><Eye className="mr-1 h-4 w-4" /> View site</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Inline text editing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Go to any page on the site, click the <span className="font-medium text-foreground">Preview / Editing</span> toggle at the bottom of the screen, then click any text outlined in yellow to edit it live. Press <kbd className="rounded border border-border bg-muted px-1 text-xs">Enter</kbd> to save, <kbd className="rounded border border-border bg-muted px-1 text-xs">Esc</kbd> to cancel.
          </p>
        </div>
        <h2 className="mt-10 font-display text-lg font-semibold">Manage content</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex items-center justify-between border border-border bg-card p-6 transition hover:border-accent"
            >
              <div className="flex items-center gap-4">
                <c.Icon className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-display text-base font-semibold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.desc}</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}