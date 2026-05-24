import { type ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";
import { ThreeBackground } from "./ThreeBackground";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <ThreeBackground />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
