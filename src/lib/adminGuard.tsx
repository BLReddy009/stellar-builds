import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdmin } from "@/lib/useAdmin";

export function useAdminGuard() {
  const admin = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (admin.loading) return;
    if (!admin.userId) navigate({ to: "/login" });
    else if (!admin.isAdmin) navigate({ to: "/admin" });
  }, [admin.loading, admin.userId, admin.isAdmin, navigate]);
  return admin;
}