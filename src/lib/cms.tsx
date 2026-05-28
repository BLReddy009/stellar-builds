import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/lib/useAdmin";

// ---- Edit mode ------------------------------------------------------------

type EditModeCtx = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
};
const EditModeContext = createContext<EditModeCtx>({
  enabled: false,
  toggle: () => {},
  setEnabled: () => {},
});

// ---- Site content ---------------------------------------------------------

type ContentMap = Record<string, string>;
type ContentCtx = {
  values: ContentMap;
  get: (key: string, fallback: string) => string;
  set: (key: string, value: string) => Promise<void>;
  loaded: boolean;
};
const ContentContext = createContext<ContentCtx>({
  values: {},
  get: (_k, f) => f,
  set: async () => {},
  loaded: false,
});

export function CMSProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [values, setValues] = useState<ContentMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await (supabase as any)
        .from("site_content")
        .select("key,value");
      if (cancelled) return;
      const m: ContentMap = {};
      (data ?? []).forEach((r: { key: string; value: string }) => {
        m[r.key] = r.value;
      });
      setValues(m);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const get = useCallback(
    (key: string, fallback: string) =>
      values[key] !== undefined ? values[key] : fallback,
    [values],
  );

  const set = useCallback(async (key: string, value: string) => {
    const { error } = await (supabase as any)
      .from("site_content")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    setValues((v) => ({ ...v, [key]: value }));
  }, []);

  const editMode = useMemo<EditModeCtx>(
    () => ({ enabled, toggle: () => setEnabled((v) => !v), setEnabled }),
    [enabled],
  );
  const content = useMemo<ContentCtx>(
    () => ({ values, get, set, loaded }),
    [values, get, set, loaded],
  );

  return (
    <EditModeContext.Provider value={editMode}>
      <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

export function useSiteContent() {
  return useContext(ContentContext);
}

export function useEditableEnabled() {
  const admin = useAdmin();
  const { enabled } = useEditMode();
  return admin.isAdmin && enabled;
}