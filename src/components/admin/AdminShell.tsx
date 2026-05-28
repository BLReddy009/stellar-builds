import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin"><ArrowLeft className="mr-1 h-4 w-4" /> Dashboard</Link>
            </Button>
            <h1 className="font-display text-xl font-bold">{title}</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/"><Eye className="mr-1 h-4 w-4" /> View site</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}