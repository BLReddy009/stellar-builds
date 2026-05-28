import { createElement, useEffect, useRef, useState, type ElementType } from "react";
import { useEditableEnabled, useSiteContent } from "@/lib/cms";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

type Props = {
  contentKey: string;
  defaultValue: string;
  as?: ElementType;
  multiline?: boolean;
  className?: string;
};

export function EditableText({
  contentKey,
  defaultValue,
  as,
  multiline,
  className,
}: Props) {
  const Tag: ElementType = as ?? (multiline ? "p" : "span");
  const { get, set, loaded } = useSiteContent();
  const canEdit = useEditableEnabled();
  const value = loaded ? get(contentKey, defaultValue) : defaultValue;

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  const save = async () => {
    if (draft === value) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await set(contentKey, draft);
      toast.success("Saved");
      setEditing(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return multiline ? (
      <textarea
        ref={inputRef as any}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void save();
        }}
        rows={Math.max(2, Math.min(8, draft.split("\n").length + 1))}
        className={
          (className ?? "") +
          " w-full resize-y border-2 border-accent bg-background/95 p-2 text-foreground outline-none"
        }
        disabled={saving}
      />
    ) : (
      <input
        ref={inputRef as any}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
          if (e.key === "Enter") void save();
        }}
        className={
          (className ?? "") +
          " w-full border-2 border-accent bg-background/95 p-1 text-foreground outline-none"
        }
        disabled={saving}
      />
    );
  }

  if (canEdit) {
    return createElement(
      Tag,
      {
        className:
          (className ?? "") +
          " group relative cursor-text rounded-sm outline outline-1 outline-dashed outline-accent/40 transition hover:outline-accent",
        onClick: (e: any) => {
          e.stopPropagation();
          e.preventDefault();
          setEditing(true);
        },
        title: "Click to edit",
      },
      value,
      createElement(
        "span",
        {
          key: "icon",
          className:
            "pointer-events-none absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground shadow group-hover:flex",
        },
        createElement(Pencil, { className: "h-3 w-3" }),
      ),
    );
  }

  return createElement(Tag, { className }, value);
}