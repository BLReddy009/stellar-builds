import { Link } from "@tanstack/react-router";
import { HardHat, Mail, Phone, MapPin } from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center bg-accent text-accent-foreground">
              <HardHat className="h-5 w-5" />
            </span>
            <EditableText contentKey="footer.brand" defaultValue="CHIGURU BUILDERS" />
          </div>
          <EditableText
            as="p"
            multiline
            contentKey="footer.tagline"
            defaultValue="A new Bengaluru construction firm building homes, offices, and commercial spaces with honesty, craft, and modern project management."
            className="mt-4 max-w-sm text-sm text-primary-foreground/70"
          />
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            <EditableText contentKey="footer.company.heading" defaultValue="Company" />
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent"><EditableText contentKey="footer.link.about" defaultValue="About Us" /></Link></li>
            <li><Link to="/services" className="hover:text-accent"><EditableText contentKey="footer.link.services" defaultValue="Services" /></Link></li>
            <li><Link to="/plans" className="hover:text-accent"><EditableText contentKey="footer.link.plans" defaultValue="Build Packages" /></Link></li>
            <li><Link to="/projects" className="hover:text-accent"><EditableText contentKey="footer.link.projects" defaultValue="Projects" /></Link></li>
            <li><Link to="/quote" className="hover:text-accent"><EditableText contentKey="footer.link.quote" defaultValue="Get a Quote" /></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            <EditableText contentKey="footer.contact.heading" defaultValue="Contact" />
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /><EditableText contentKey="footer.contact.address" defaultValue="HSR Layout, Bengaluru — 560102" /></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /><EditableText contentKey="footer.contact.phone" defaultValue="+91 80 4567 8910" /></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /><EditableText contentKey="footer.contact.email" defaultValue="hello@chigurubuilders.in" /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/50 md:flex-row">
          <span>© {new Date().getFullYear()} <EditableText contentKey="footer.copyright" defaultValue="Chiguru Builders Pvt. Ltd. · Bengaluru, India" /></span>
          <span className="flex items-center gap-3">
            <EditableText contentKey="footer.legal" defaultValue="GST Registered · MSME Udyam · Site Insured" />
            <Link to="/login" className="text-primary-foreground/40 hover:text-accent">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
