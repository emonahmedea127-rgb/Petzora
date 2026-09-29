-- ====================================================================
-- PETZORA SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ====================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- It creates all tables, indexes, storage buckets, RLS policies, and default categories/authors.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. AUTHORS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'Editorial Contributor',
    credentials TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    email TEXT DEFAULT '',
    website TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. ARTICLES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT DEFAULT '',
    content TEXT DEFAULT '',
    featured_image TEXT DEFAULT '',
    image_alt TEXT DEFAULT '',
    image_caption TEXT DEFAULT '',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_slug TEXT NOT NULL,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_editor_pick BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    seo_title TEXT DEFAULT '',
    seo_description TEXT DEFAULT '',
    canonical_url TEXT DEFAULT '',
    og_image TEXT DEFAULT '',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    reading_time TEXT DEFAULT '4 min read',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_slug ON public.articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON public.articles(is_featured);

-- --------------------------------------------------------------------
-- 4. TAGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. ARTICLE_TAGS JUNCTION TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.article_tags (
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- --------------------------------------------------------------------
-- 6. MEDIA FILES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    size BIGINT DEFAULT 0,
    mime_type TEXT DEFAULT 'image/jpeg',
    storage_path TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. SITE SETTINGS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    site_name TEXT DEFAULT 'Petzora',
    site_description TEXT DEFAULT 'Better Care. Happier Pets. Practical dog and cat care guides fact-checked by veterinarians.',
    logo_url TEXT DEFAULT '',
    default_seo_title TEXT DEFAULT 'Petzora – Better Care. Happier Pets.',
    default_seo_description TEXT DEFAULT 'Practical pet care advice, puppy training, cat health, canine nutrition, product recommendations, and heartwarming stories for dog and cat owners.',
    default_og_image TEXT DEFAULT 'https://petzora.shop/images/hero-dog-cat.webp',
    social_links JSONB DEFAULT '{"x": "https://x.com", "facebook": "https://facebook.com", "instagram": "https://instagram.com"}'::JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- CATEGORIES: Public can view all, Authenticated can manage
CREATE POLICY "Public categories are viewable by everyone" 
    ON public.categories FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" 
    ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- AUTHORS: Public can view all, Authenticated can manage
CREATE POLICY "Public authors are viewable by everyone" 
    ON public.authors FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage authors" 
    ON public.authors FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ARTICLES: 
-- 1. Public can ONLY view published articles
CREATE POLICY "Public can view published articles" 
    ON public.articles FOR SELECT 
    USING (status = 'published');

-- 2. Authenticated users (admin) can view, insert, update, delete all articles
CREATE POLICY "Authenticated users can select all articles" 
    ON public.articles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert articles" 
    ON public.articles FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" 
    ON public.articles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles" 
    ON public.articles FOR DELETE TO authenticated USING (true);

-- TAGS & ARTICLE_TAGS: Public read, Authenticated manage
CREATE POLICY "Public tags are viewable by everyone" 
    ON public.tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage tags" 
    ON public.tags FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public article tags are viewable by everyone" 
    ON public.article_tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage article tags" 
    ON public.article_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- MEDIA FILES: Public can view, Authenticated can insert/delete
CREATE POLICY "Public can view media records" 
    ON public.media_files FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage media records" 
    ON public.media_files FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SITE SETTINGS: Public read, Authenticated update
CREATE POLICY "Public can view site settings" 
    ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage site settings" 
    ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- --------------------------------------------------------------------
-- 9. STORAGE BUCKET: 'media'
-- --------------------------------------------------------------------
-- Insert bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images from 'media' bucket
CREATE POLICY "Public Media Access" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'media');

-- Authenticated admins can upload images to 'media' bucket
CREATE POLICY "Admin Upload Media" 
    ON storage.objects FOR INSERT TO authenticated 
    WITH CHECK (bucket_id = 'media');

-- Authenticated admins can update images in 'media' bucket
CREATE POLICY "Admin Update Media" 
    ON storage.objects FOR UPDATE TO authenticated 
    USING (bucket_id = 'media');

-- Authenticated admins can delete images from 'media' bucket
CREATE POLICY "Admin Delete Media" 
    ON storage.objects FOR DELETE TO authenticated 
    USING (bucket_id = 'media');

-- --------------------------------------------------------------------
-- 10. SEED DEFAULT CATEGORIES (No demo posts!)
-- --------------------------------------------------------------------
INSERT INTO public.categories (name, slug, description) VALUES
    ('Dogs', 'dogs', 'Puppy care routines, loose-leash manners, canine nutrition, and lifelong health.'),
    ('Cats', 'cats', 'Kitten milestones, feline behavior, indoor enrichment, and cat wellness.'),
    ('Care', 'care', 'Everyday hygiene, seasonal routines, gentle bathing, nail trims, and home comfort essentials.'),
    ('Health', 'health', 'Veterinary-reviewed preventive wellness, symptom checklists, and non-emergency health guidance.'),
    ('Nutrition', 'nutrition', 'Evidence-based canine and feline nutrition, safe foods, and feeding schedules.'),
    ('Training', 'training', 'Gentle, positive reinforcement routines that build mutual trust, focus, and joyful obedience.'),
    ('Reviews', 'reviews', 'In-depth, hands-on evaluations of pet products, orthopedic beds, carriers, and toys.'),
    ('Stories', 'stories', 'Heartwarming rescue transformations, adoption journeys, and uplifting pet moments.')
ON CONFLICT (slug) DO NOTHING;

-- --------------------------------------------------------------------
-- 11. SEED DEFAULT AUTHORS
-- --------------------------------------------------------------------
INSERT INTO public.authors (name, slug, role, credentials, bio, avatar_url, email, website) VALUES
    ('Dr. Clara Vance, DVM', 'dr-clara-vance', 'Veterinary Advisory & Lead Editor', 'DVM, 12+ Years Clinical Practice', 'Dedicated small animal veterinarian passionate about clear, compassionate, and fact-checked health care advice.', '/images/author-clara.webp', 'clara.vance@petzora.shop', 'https://petzora.shop'),
    ('Marcus Hayes, CPDT-KA', 'marcus-hayes', 'Certified Canine Behaviorist', 'CPDT-KA, Fear-Free Certified', 'Positive reinforcement dog trainer helping families overcome leash reactivity, puppy challenges, and separation anxiety.', '/images/author-marcus.webp', 'marcus.training@petzora.shop', 'https://petzora.shop'),
    ('Elena Rostova', 'elena-rostova', 'Feline Enrichment Specialist', 'Animal Welfare Researcher', 'Devoted rescue advocate specializing in multi-cat household harmony and indoor feline wellness.', '/images/author-elena.webp', 'elena.rostova@petzora.shop', 'https://petzora.shop')
ON CONFLICT (slug) DO NOTHING;

-- --------------------------------------------------------------------
-- 12. SEED DEFAULT SITE SETTINGS
-- --------------------------------------------------------------------
INSERT INTO public.site_settings (id, site_name, site_description, default_seo_title, default_seo_description, default_og_image)
VALUES (
    'default',
    'Petzora',
    'Better Care. Happier Pets. Practical dog and cat care guides fact-checked by veterinarians.',
    'Petzora – Better Care. Happier Pets. | Dog & Cat Guides',
    'Practical pet care advice, puppy training, cat health, canine nutrition, product recommendations, and heartwarming stories for dog and cat owners.',
    'https://petzora.shop/images/hero-dog-cat.webp'
)
ON CONFLICT (id) DO NOTHING;
