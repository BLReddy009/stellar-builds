import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/lib/adminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2, Upload, ImagePlus, X, Check, Minus } from "lucide-react";

type Feature = { t: string; on: boolean };
type Pkg = {
  id: string; name: string; tag: string; price: string; unit: string;
  description: string; highlighted: boolean; image_url: string | null;
  features: Feature[]; timeline: string; warranty: string; cta: string; display_order: number;
};

export const Route = createFileRoute("/admin/packages")({
  head: () => ({ meta: [{ title: "Packages — Admin" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPackages,
});

function AdminPackages() {
  const admin = useAdminGuard();
  const [items, setItems] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).from("packages").select("*").order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    setItems((data ?? []).map((p: any) => ({ ...p, features: Array.isArray(p.features) ? p.features : [] })));
    setLoading(false);
  };
  useEffect(() => { if (admin.isAdmin) void load(); }, [admin.isAdmin]);

  const add = async () => {
    const { data, error } = await (supabase as any).from("packages").insert({
      name: "New package", tag: "", price: "", unit: "per sqft", description: "",
      highlighted: false, features: [], timeline: "", warranty: "", cta: "Get started",
      display_order: items.length,
    }).select().single();
    if (error) return toast.error(error.message);
    setItems((x) => [...x, { ...data, features: [] }]);
  };

  if (!admin.isAdmin || loading) {
    return <AdminShell title="Packages"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></AdminShell>;
  }

  return (
    <AdminShell title="Build Packages">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">Packages shown on /plans and the home page.</p>
        <Button onClick={add}><Plus className="mr-1 h-4 w-4" /> Add package</Button>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((p) => (
          <Row key={p.id} item={p}
            onChange={(u) => setItems((arr) => arr.map((x) => x.id === u.id ? u : x))}
            onDelete={() => setItems((arr) => arr.filter((x) => x.id !== p.id))}
          />
        ))}
        {items.length === 0 && (
          <div className="border border-dashed border-border p-12 text-center text-muted-foreground">No packages yet.</div>
        )}
      </div>
    </AdminShell>
  );
}

function Row({ item, onChange, onDelete }: { item: Pkg; onChange: (p: Pkg) => void; onDelete: () => void }) {
  const [d, setD] = useState(item);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newFeat, setNewFeat] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${d.id}/${Date.now()}.${ext}`;
    const { error: e1 } = await supabase.storage.from("package-images").upload(path, file, { upsert: true, contentType: file.type });
    if (e1) { setUploading(false); return toast.error(e1.message); }
    const { data } = supabase.storage.from("package-images").getPublicUrl(path);
    setD((x) => ({ ...x, image_url: data.publicUrl }));
    setUploading(false);
    toast.success("Uploaded — click Save");
  };

  const save = async () => {
    setSaving(true);
    const { error } = await (supabase as any).from("packages").update({
      name: d.name, tag: d.tag, price: d.price, unit: d.unit, description: d.description,
      highlighted: d.highlighted, image_url: d.image_url, features: d.features,
      timeline: d.timeline, warranty: d.warranty, cta: d.cta, display_order: d.display_order,
    }).eq("id", d.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved"); onChange(d);
  };

  const remove = async () => {
    if (!confirm(`Delete "${d.name}"?`)) return;
    const { error } = await (supabase as any).from("packages").delete().eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); onDelete();
  };

  const addFeature = () => {
    if (!newFeat.trim()) return;
    setD({ ...d, features: [...d.features, { t: newFeat.trim(), on: true }] });
    setNewFeat("");
  };

  return (
    <div className="border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {d.image_url ? (
              <img src={d.image_url} alt={d.name} className="h-full w-full object-cover" />
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
            <div><Label>Name</Label><Input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></div>
            <div><Label>Tag</Label><Input value={d.tag} onChange={(e) => setD({ ...d, tag: e.target.value })} placeholder="Most popular" /></div>
            <div><Label>Order</Label><Input type="number" value={d.display_order} onChange={(e) => setD({ ...d, display_order: Number(e.target.value) || 0 })} /></div>
            <div><Label>Price</Label><Input value={d.price} onChange={(e) => setD({ ...d, price: e.target.value })} placeholder="₹2,499" /></div>
            <div><Label>Unit</Label><Input value={d.unit} onChange={(e) => setD({ ...d, unit: e.target.value })} placeholder="per sqft" /></div>
            <div><Label>CTA</Label><Input value={d.cta} onChange={(e) => setD({ ...d, cta: e.target.value })} placeholder="Go with Gold" /></div>
            <div className="sm:col-span-3"><Label>Description</Label><Textarea rows={2} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} /></div>
            <div><Label>Timeline</Label><Input value={d.timeline} onChange={(e) => setD({ ...d, timeline: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Warranty</Label><Input value={d.warranty} onChange={(e) => setD({ ...d, warranty: e.target.value })} /></div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={d.highlighted} onCheckedChange={(v) => setD({ ...d, highlighted: !!v })} />
            Highlight as featured / most popular
          </label>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <Label>Features</Label>
        <ul className="mt-2 space-y-2">
          {d.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 border border-border bg-background p-2">
              <button type="button"
                onClick={() => setD({ ...d, features: d.features.map((x, j) => j === i ? { ...x, on: !x.on } : x) })}
                className="flex h-7 w-7 items-center justify-center border border-border"
                title={f.on ? "Included" : "Not included"}>
                {f.on ? <Check className="h-4 w-4 text-accent" /> : <Minus className="h-4 w-4 text-muted-foreground" />}
              </button>
              <Input className="flex-1" value={f.t}
                onChange={(e) => setD({ ...d, features: d.features.map((x, j) => j === i ? { ...x, t: e.target.value } : x) })} />
              <Button variant="ghost" size="sm" onClick={() => setD({ ...d, features: d.features.filter((_, j) => j !== i) })}>
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex gap-2">
          <Input value={newFeat} onChange={(e) => setNewFeat(e.target.value)}
            placeholder="Add a feature…"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} />
          <Button variant="outline" onClick={addFeature}><Plus className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={remove}><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
        <Button size="sm" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />} Save
        </Button>
      </div>
    </div>
  );
}