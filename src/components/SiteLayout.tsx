import { type ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";
import { ThreeBackground } from "./ThreeBackground";
import { CMSProvider } from "@/lib/cms";
import { AdminBar } from "./admin/AdminBar";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CMSProvider>
      <div className="relative flex min-h-screen flex-col bg-background">
        <ThreeBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingContact />
        <AdminBar />
        <Toaster />
      </div>
    </CMSProvider>
  );
}
