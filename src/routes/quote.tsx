import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Ironspan Construction" },
      { name: "description", content: "Request a free, no-obligation construction quote from Ironspan. We respond within one business day." },
      { property: "og:title", content: "Get a Quote — Ironspan Construction" },
      { property: "og:description", content: "Tell us about your project and we'll respond within one business day." },
    ],
  }),
  component: QuotePage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  projectType: z.string().min(1),
  package: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  location: z.string().trim().min(1).max(150),
  details: z.string().trim().min(1).max(2000),
});

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message || "Required"));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get a Quote</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold md:text-6xl">
            Tell us about your project.
          </h1>
          <p className="mt-6 max-w-2xl text-primary-foreground/70">
            Share a few details and we'll respond within one business day with next
            steps and a no-obligation estimate.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3">
        <aside className="space-y-6 lg:col-span-1">
          <h2 className="font-display text-2xl font-semibold">What happens next?</h2>
          <ol className="space-y-5">
            {[
              ["1. We review", "Our team reviews your request within one business day."],
              ["2. Discovery call", "A 20-minute call to understand your goals and constraints."],
              ["3. Estimate", "A clear, itemized quote and proposed timeline — no obligation."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-display text-sm font-semibold">{t}</div>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>

        <div className="lg:col-span-2">
          {submitted ? (
            <div className="border border-accent bg-accent/10 p-12 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
              <h2 className="mt-4 font-display text-3xl font-semibold">Request received.</h2>
              <p className="mt-3 text-muted-foreground">Thanks — we'll be in touch within one business day to schedule your discovery call.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 border border-border bg-card p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Full Name" name="name" error={errors.name} />
                <Input label="Email" name="email" type="email" error={errors.email} />
                <Input label="Phone" name="phone" type="tel" error={errors.phone} />
                <Input label="Project Location" name="location" error={errors.location} />
                <Select label="Project Type" name="projectType" error={errors.projectType}
                  options={["Residential — Custom Home", "Residential — Renovation", "Commercial — New Build", "Commercial — Tenant Improvement", "Industrial / Warehouse", "Other"]} />
                <Select label="Preferred Package" name="package" error={errors.package}
                  options={["Silver — Essential", "Gold — Most Popular", "Platinum — Signature", "Custom mix", "Not sure yet"]} />
                <Select label="Estimated Budget" name="budget" error={errors.budget}
                  options={["Under ₹25 Lakh", "₹25L – ₹1 Crore", "₹1 – 5 Crore", "₹5 – 20 Crore", "₹20 Crore+"]} />
                <Select label="Timeline" name="timeline" error={errors.timeline}
                  options={["ASAP", "1–3 months", "3–6 months", "6–12 months", "Just exploring"]} />
              </div>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Details</span>
                <textarea name="details" rows={6} placeholder="Tell us about the scope, site, and any specific requirements..." className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
                {errors.details && <span className="mt-1 block text-xs text-destructive">{errors.details}</span>}
              </label>
              <button type="submit" className="w-full bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground hover:brightness-95">
                Request Quote
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input name={name} type={type} className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Select({ label, name, options, error }: { label: string; name: string; options: string[]; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select name={name} defaultValue="" className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
