import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/adminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2, Upload, ImagePlus } from "lucide-react";

type Project = {
  id: string; category: string; title: string; location: string;
  description: string; image_url: string | null; display_order: number;
};

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "Projects — Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminProjects,
});

function AdminProjects() {
  const admin = useAdminGuard();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("portfolio_items").select("*").order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    setItems(data ?? []); setLoading(false);
  };
  useEffect(() => { if (admin.isAdmin) void load(); }, [admin.isAdmin]);

  const add = async () => {
    const { data, error } = await (supabase as any).from("portfolio_items")
      .insert({ title: "New project", category: "Residential", location: "", description: "", display_order: items.length })
      .select().single();
    if (error) return toast.error(error.message);
    setItems((x) => [...x, data]);
  };

  if (!admin.isAdmin || loading) {
    return <AdminShell title="Projects"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></AdminShell>;
  }

  return (
    <AdminShell title="Projects / Portfolio">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Portfolio cards shown on /projects and the home page.</p>
        <Button onClick={add}><Plus className="mr-1 h-4 w-4" /> Add project</Button>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((p) => (
          <Row key={p.id} item={p}
            onChange={(u) => setItems((arr) => arr.map((x) => x.id === u.id ? u : x))}
            onDelete={() => setItems((arr) => arr.filter((x) => x.id !== p.id))}
          />
        ))}
        {items.length === 0 && (
          <div className="border border-dashed border-border p-12 text-center text-muted-foreground">No projects yet.</div>
        )}
      </div>
    </AdminShell>
  );
}

function Row({ item, onChange, onDelete }: { item: Project; onChange: (p: Project) => void; onDelete: () => void }) {
  const [d, setD] = useState(item);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${d.id}/${Date.now()}.${ext}`;
    const { error: e1 } = await supabase.storage.from("project-images").upload(path, file, { upsert: true, contentType: file.type });
    if (e1) { setUploading(false); return toast.error(e1.message); }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setD((x) => ({ ...x, image_url: data.publicUrl }));
    setUploading(false);
    toast.success("Uploaded — click Save");
  };

  const save = async () => {
    setSaving(true);
    const { error } = await (supabase as any).from("portfolio_items").update({
      category: d.category, title: d.title, location: d.location,
      description: d.description, image_url: d.image_url, display_order: d.display_order,
    }).eq("id", d.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved"); onChange(d);
  };

  const remove = async () => {
    if (!confirm(`Delete "${d.title}"?`)) return;
    const { error } = await (supabase as any).from("portfolio_items").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); onDelete();
  };

  return (
    <div className="grid gap-4 border border-border bg-card p-6 md:grid-cols-[200px_1fr]">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {d.image_url ? (
            <img src={d.image_url} alt={d.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <ImagePlus className="h-8 w-8 opacity-50" />
            </div>
          )}
          {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Loader2 className="h-6 w-6 animate-spin text-white" /></div>}
        </div>
        <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => fileRef.current?.click()}>
          <Upload className="mr-1 h-3 w-3" /> {uploading ? "Uploading…" : "Upload image"}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ""; }} />
      </div>
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-3">
          <div><Label>Category</Label><Input value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label>Title</Label><Input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label>Location</Label><Input value={d.location} onChange={(e) => setD({ ...d, location: e.target.value })} /></div>
          <div><Label>Order</Label><Input type="number" value={d.display_order} onChange={(e) => setD({ ...d, display_order: Number(e.target.value) || 0 })} /></div>
        </div>
        <div><Label>Description</Label><Textarea rows={3} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} /></div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={remove}><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
          <Button size="sm" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />} Save
          </Button>
        </div>
      </div>
    </div>
  );
}