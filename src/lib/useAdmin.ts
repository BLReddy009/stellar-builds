import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
};

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    userId: null,
    email: null,
    isAdmin: false,
  });

  useEffect(() => {
    let cancelled = false;

    const check = async (userId: string | null, email: string | null) => {
      if (!userId) {
        if (!cancelled) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) {
        setState({ loading: false, userId, email, isAdmin: !!data });
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void check(session?.user?.id ?? null, session?.user?.email ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      void check(data.session?.user?.id ?? null, data.session?.user?.email ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}