import { Link } from "@tanstack/react-router";
import { HardHat, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center bg-accent text-accent-foreground">
              <HardHat className="h-5 w-5" />
            </span>
            IRONSPAN
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            A new Bengaluru construction firm building homes, offices, and commercial
            spaces with honesty, craft, and modern project management.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/plans" className="hover:text-accent">Build Packages</Link></li>
            <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link to="/quote" className="hover:text-accent">Get a Quote</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" />HSR Layout, Bengaluru — 560102</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />+91 80 4567 8910</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />hello@ironspan.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/50 md:flex-row">
          <span>© {new Date().getFullYear()} Ironspan Construction Pvt. Ltd. · Bengaluru, India</span>
          <span>GST Registered · MSME Udyam · Site Insured</span>
        </div>
      </div>
    </footer>
  );
}
