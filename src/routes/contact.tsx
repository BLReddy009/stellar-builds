import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Chiguru Builders" },
      { name: "description", content: "Get in touch with Chiguru Builders. Office, phone, email, and contact form." },
      { property: "og:title", content: "Contact — Chiguru Builders" },
      { property: "og:description", content: "Reach out to our team — we respond within one business day." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</span>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">Let's talk.</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Questions, partnerships, or just want to chat about a project? We typically respond within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          {[
          { Icon: MapPin, t: "Office", d: "HSR Layout, Bengaluru — 560102" },
            { Icon: Phone, t: "Phone", d: "+91 80 4567 8910" },
            { Icon: Mail, t: "Email", d: "hello@chigurubuilders.in" },
            { Icon: Clock, t: "Hours", d: "Mon–Sat, 9am–7pm IST" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4 border border-border bg-card p-6">
              <Icon className="h-5 w-5 text-accent" />
              <div>
                <div className="font-display text-sm font-semibold uppercase tracking-wider">{t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          {submitted ? (
            <div className="border border-accent bg-accent/10 p-10 text-center">
              <h2 className="font-display text-2xl font-semibold">Message received.</h2>
              <p className="mt-3 text-muted-foreground">Thanks for reaching out — our team will respond within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 border border-border bg-card p-8">
              <Field label="Your Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Subject" name="subject" error={errors.subject} />
              <Field label="Message" name="message" textarea error={errors.message} />
              <button type="submit" className="w-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:brightness-95">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", textarea, error }: { label: string; name: string; type?: string; textarea?: boolean; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
      ) : (
        <input name={name} type={type} className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
      )}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
