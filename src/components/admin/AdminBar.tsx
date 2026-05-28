import { Link } from "@tanstack/react-router";
import { useAdmin } from "@/lib/useAdmin";
import { useEditMode } from "@/lib/cms";
import { Eye, Pencil, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AdminBar() {
  const admin = useAdmin();
  const { enabled, toggle } = useEditMode();

  if (!admin.isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/95 p-1 shadow-lg backdrop-blur">
      <button
        onClick={toggle}
        className={
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition " +
          (enabled
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-muted")
        }
      >
        {enabled ? <Pencil className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {enabled ? "Editing" : "Preview"}
      </button>
      <Link
        to="/admin"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
      >
        <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
      </Link>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
        }}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
        title="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}