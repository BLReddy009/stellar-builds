import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/adminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
};

const ICONS = ["Home", "Building2", "Factory", "Hammer", "Ruler", "Wrench", "ShieldCheck", "Zap", "Clock"];

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services — Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminServices,
});

function AdminServices() {
  const admin = useAdminGuard();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("services").select("*").order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { if (admin.isAdmin) void load(); }, [admin.isAdmin]);

  const add = async () => {
    const { data, error } = await (supabase as any).from("services")
      .insert({ title: "New service", description: "", icon: "Home", display_order: items.length })
      .select().single();
    if (error) return toast.error(error.message);
    setItems((x) => [...x, data]);
  };

  if (!admin.isAdmin || loading) {
    return <AdminShell title="Services"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></AdminShell>;
  }

  return (
    <AdminShell title="Services">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Services shown on the /services page and home page.</p>
        <Button onClick={add}><Plus className="mr-1 h-4 w-4" /> Add service</Button>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((s) => (
          <Row key={s.id} item={s}
            onChange={(u) => setItems((arr) => arr.map((x) => x.id === u.id ? u : x))}
            onDelete={() => setItems((arr) => arr.filter((x) => x.id !== s.id))}
          />
        ))}
        {items.length === 0 && (
          <div className="border border-dashed border-border p-12 text-center text-muted-foreground">No services yet.</div>
        )}
      </div>
    </AdminShell>
  );
}

function Row({ item, onChange, onDelete }: { item: Service; onChange: (s: Service) => void; onDelete: () => void }) {
  const [d, setD] = useState(item);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await (supabase as any).from("services").update({
      title: d.title, description: d.description, icon: d.icon, display_order: d.display_order,
    }).eq("id", d.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved"); onChange(d);
  };

  const remove = async () => {
    if (!confirm(`Delete "${d.title}"?`)) return;
    const { error } = await (supabase as any).from("services").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); onDelete();
  };

  return (
    <div className="grid gap-3 border border-border bg-card p-6 md:grid-cols-[1fr_180px_100px_auto]">
      <div className="grid gap-3">
        <div>
          <Label>Title</Label>
          <Input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea rows={2} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} />
        </div>
      </div>
      <div>
        <Label>Icon</Label>
        <select className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
          value={d.icon} onChange={(e) => setD({ ...d, icon: e.target.value })}>
          {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <Label>Order</Label>
        <Input type="number" value={d.display_order}
          onChange={(e) => setD({ ...d, display_order: Number(e.target.value) || 0 })} />
      </div>
      <div className="flex items-end gap-2">
        <Button variant="outline" size="sm" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
        <Button size="sm" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}