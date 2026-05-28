
-- site_content (key/value text store)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site content readable by everyone" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update site content" ON public.site_content FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete site content" ON public.site_content FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Home',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services readable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update services" ON public.services FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete services" ON public.services FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- portfolio_items
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portfolio readable by everyone" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admins insert portfolio" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update portfolio" ON public.portfolio_items FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete portfolio" ON public.portfolio_items FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- packages
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  unit TEXT NOT NULL DEFAULT 'per sqft',
  description TEXT NOT NULL DEFAULT '',
  highlighted BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  timeline TEXT NOT NULL DEFAULT '',
  warranty TEXT NOT NULL DEFAULT '',
  cta TEXT NOT NULL DEFAULT 'Get started',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Packages readable by everyone" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Admins insert packages" ON public.packages FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update packages" ON public.packages FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete packages" ON public.packages FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- timestamp triggers
CREATE TRIGGER trg_site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_packages_updated BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('package-images', 'package-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Project images public read" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Admins upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Package images public read" ON storage.objects FOR SELECT USING (bucket_id = 'package-images');
CREATE POLICY "Admins upload package images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'package-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update package images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'package-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete package images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'package-images' AND has_role(auth.uid(), 'admin'));
