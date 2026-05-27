import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/lib/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Save, LogOut, Upload, ImagePlus, X } from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  icon: string;
  display_order: number;
};

const ICON_OPTIONS = ["GraduationCap", "Ruler", "HardHat", "Paintbrush"];

export const Route = createFileRoute("/admin/team")({
  head: () => ({
    meta: [
      { title: "Manage Team — Chiguru Builders" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminTeamPage,
});

function AdminTeamPage() {
  const admin = useAdmin();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin.loading) return;
    if (!admin.userId) {
      navigate({ to: "/login" });
      return;
    }
    void load();
  }, [admin.loading, admin.userId, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    setMembers((data as Member[]) ?? []);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const addMember = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        name: "New Engineer",
        role: "Role",
        bio: "",
        icon: "GraduationCap",
        display_order: members.length,
      })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setMembers((m) => [...m, data as Member]);
  };

  if (admin.loading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!admin.isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <Toaster />
        <h1 className="font-display text-2xl font-bold">Admin access required</h1>
        <p className="mt-2 text-muted-foreground">
          You're signed in as <span className="font-medium text-foreground">{admin.email}</span>,
          but you don't have admin privileges yet.
        </p>
        <p className="mt-4 rounded border border-border bg-muted/40 p-4 text-left text-sm text-muted-foreground">
          To grant yourself admin access, ask the project owner to run this once in the
          Lovable Cloud SQL editor:
          <pre className="mt-2 overflow-x-auto rounded bg-background p-3 text-xs">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${admin.userId}', 'admin');`}
          </pre>
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={signOut}>Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold">Team Manager</h1>
            <p className="text-xs text-muted-foreground">Signed in as {admin.email}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/about">View page</Link></Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Team Members</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit, or remove engineers shown on the About page.
            </p>
          </div>
          <Button onClick={addMember}>
            <Plus className="mr-1 h-4 w-4" /> Add member
          </Button>
        </div>

        <div className="mt-8 grid gap-6">
          {members.length === 0 && (
            <div className="rounded border border-dashed border-border p-12 text-center text-muted-foreground">
              No team members yet. Click "Add member" to create one.
            </div>
          )}
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              onChange={(updated) =>
                setMembers((arr) => arr.map((x) => (x.id === updated.id ? updated : x)))
              }
              onDelete={() => setMembers((arr) => arr.filter((x) => x.id !== m.id))}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function MemberCard({
  member,
  onChange,
  onDelete,
}: {
  member: Member;
  onChange: (m: Member) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState(member);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("team_members")
      .update({
        name: draft.name,
        role: draft.role,
        bio: draft.bio,
        photo_url: draft.photo_url,
        icon: draft.icon,
        display_order: draft.display_order,
      })
      .eq("id", draft.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    onChange(draft);
  };

  const remove = async () => {
    if (!confirm(`Delete ${draft.name}?`)) return;
    const { error } = await supabase.from("team_members").delete().eq("id", draft.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    onDelete();
  };

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${draft.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("team-photos")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) {
      setUploading(false);
      return toast.error(upErr.message);
    }
    const { data } = supabase.storage.from("team-photos").getPublicUrl(path);
    setDraft((d) => ({ ...d, photo_url: data.publicUrl }));
    setUploading(false);
    toast.success("Photo uploaded — click Save to apply.");
  };

  return (
    <div className="grid gap-6 border border-border bg-card p-6 md:grid-cols-[200px_1fr]">
      <div>
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          {draft.photo_url ? (
            <img src={draft.photo_url} alt={draft.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No photo
            </div>
          )}
        </div>
        <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-muted">
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
          {uploading ? "Uploading…" : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadPhoto(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
          </div>
          <div>
            <Label>Icon</Label>
            <select
              className="mt-1 h-10 w-full border border-input bg-background px-3 text-sm"
              value={draft.icon}
              onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            >
              {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <Label>Display order</Label>
            <Input
              type="number"
              value={draft.display_order}
              onChange={(e) => setDraft({ ...draft, display_order: Number(e.target.value) || 0 })}
            />
          </div>
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea
            rows={3}
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={remove}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
          <Button size="sm" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}