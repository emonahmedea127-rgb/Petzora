import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Article, Author, CategoryInfo, MediaFile, SiteSettings } from '../types';
import { allArticles } from '../data/mockData';

export { allArticles };

// Retrieve credentials from environment or runtime localStorage override
export function getSupabaseCredentials(): { url: string; anonKey: string; isConfigured: boolean } {
  let url = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://wrsiehvxrryqsihqirgm.supabase.co').trim();
  let anonKey = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn').trim();

  // Allow browser localStorage overrides for flexible admin onboarding / live setup
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('petzora_supabase_url');
    const savedKey = localStorage.getItem('petzora_supabase_anon_key');
    if (savedUrl && savedKey) {
      url = savedUrl.trim();
      anonKey = savedKey.trim();
    }
  }

  const isConfigured = Boolean(
    url &&
    anonKey &&
    !url.includes('your-project') &&
    url.startsWith('https://')
  );

  return { url, anonKey, isConfigured };
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('petzora_supabase_url', url.trim());
    localStorage.setItem('petzora_supabase_anon_key', anonKey.trim());
    // reload client instance
    initSupabaseClient();
  }
}

export function clearCustomSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('petzora_supabase_url');
    localStorage.removeItem('petzora_supabase_anon_key');
    initSupabaseClient();
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function initSupabaseClient(): SupabaseClient {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();

  // If not configured with a valid URL, use a placeholder URL so createClient doesn't throw on startup
  const validUrl = isConfigured ? url : 'https://placeholder-project.supabase.co';
  const validKey = isConfigured ? anonKey : 'placeholder-anon-key';

  supabaseInstance = createClient(validUrl, validKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseInstance;
}

export const supabase = initSupabaseClient();

export function isSupabaseConfigured(): boolean {
  return getSupabaseCredentials().isConfigured;
}

// ----------------------------------------------------------------------
// DATA MAPPERS
// ----------------------------------------------------------------------

const defaultAuthor: Author = {
  id: 'author-clara',
  name: 'Dr. Clara Vance, DVM',
  slug: 'dr-clara-vance',
  role: 'Veterinary Advisory & Lead Pet Health Editor',
  credentials: 'DVM, 12+ Years Clinical Practice',
  bio: 'Dedicated small animal veterinarian with over twelve years of clinical emergency practice. Empowering pet parents with compassionate, fact-checked health care advice.',
  avatar: '/images/author-clara.webp',
  socialLinks: {
    email: 'clara.vance@petzora.shop',
    website: 'https://petzora.shop',
  },
};

export function mapRowToArticle(row: any): Article {
  const authorData: Author = row.authors
    ? {
        id: row.authors.id,
        name: row.authors.name,
        slug: row.authors.slug,
        role: row.authors.role || 'Editorial Contributor',
        credentials: row.authors.credentials || '',
        bio: row.authors.bio || '',
        avatar: row.authors.avatar_url || '/images/author-clara.webp',
        socialLinks: {
          email: row.authors.email,
          website: row.authors.website,
        },
      }
    : defaultAuthor;

  // Extract table of contents from content if present
  const headings: { id: string; text: string; level: number }[] = [];
  if (row.content) {
    const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    let index = 0;
    while ((match = headingRegex.exec(row.content)) !== null) {
      const level = parseInt(match[1], 10);
      const rawText = match[2].replace(/<[^>]+>/g, '').trim();
      if (rawText) {
        const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `section-${index}`;
        headings.push({ id, text: rawText, level });
        index++;
      }
    }
  }

  const categorySlug = row.category_slug || (row.categories ? row.categories.slug : 'care');
  const fallbackArticle = allArticles.find((a) => a.slug === row.slug);

  // Safeguard: detect truncated/stub content (< 2500 chars), HTML comments or placeholders
  const isInvalidOrTooShortContent =
    !row.content ||
    typeof row.content !== 'string' ||
    row.content.trim().length < 2500 ||
    row.content.trim().startsWith('<!--') ||
    row.content.includes('Full 15,000+ char article content is bundled') ||
    row.content.includes('supabase-seed-articles.sql');

  const resolvedContent = !isInvalidOrTooShortContent
    ? row.content
    : fallbackArticle?.content || row.content || '';

  const resolvedReadingTime =
    row.reading_time && row.reading_time.trim().length > 0 && row.reading_time !== '4 min read'
      ? row.reading_time
      : fallbackArticle?.readingTime || row.reading_time || '14 min read';

  const resolvedTOC =
    headings.length > 0 ? headings : fallbackArticle?.tableOfContents || [];

  const resolvedFAQs =
    fallbackArticle?.faqList && fallbackArticle.faqList.length > 0
      ? fallbackArticle.faqList
      : [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: categorySlug,
    categorySlug,
    categoryId: row.category_id,
    excerpt: row.excerpt || fallbackArticle?.excerpt || '',
    content: resolvedContent,
    featuredImage: row.featured_image || fallbackArticle?.featuredImage || '/images/pet-fallback.webp',
    imageAlt: row.image_alt || row.title,
    imageCaption: row.image_caption || fallbackArticle?.imageCaption || '',
    author: authorData,
    authorId: row.author_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    publishedAt: row.published_at || row.created_at,
    readingTime: resolvedReadingTime,
    status: row.status as 'published' | 'draft',
    isFeatured: Boolean(row.is_featured),
    isEditorPick: Boolean(row.is_editor_pick),
    isPopular: Boolean(row.is_popular),
    tags: Array.isArray(row.tags) && row.tags.length > 0 ? row.tags : fallbackArticle?.tags || [],
    seoTitle: row.seo_title || fallbackArticle?.seoTitle || row.title,
    seoDescription: row.seo_description || fallbackArticle?.seoDescription || row.excerpt,
    canonicalPath: `/${categorySlug}/${row.slug}`,
    canonicalUrl: row.canonical_url || `https://petzora.shop/${categorySlug}/${row.slug}`,
    ogImage: row.og_image || row.featured_image || 'https://petzora.shop/images/hero-dog-cat.webp',
    tableOfContents: resolvedTOC,
    faqList: resolvedFAQs,
    relatedSlugs: [],
    sources: [],
  };
}

// ----------------------------------------------------------------------
// ARTICLES API
// ----------------------------------------------------------------------

export interface GetArticlesOptions {
  limit?: number;
  category?: string;
  tag?: string;
  isFeatured?: boolean;
  status?: 'published' | 'draft' | 'all';
  search?: string;
}

export async function getPublishedArticles(options: GetArticlesOptions = {}): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    let query = supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (options.category && options.category !== 'all') {
      query = query.eq('category_slug', options.category.toLowerCase());
    }

    if (options.isFeatured) {
      query = query.eq('is_featured', true);
    }

    if (options.limit && options.limit > 0) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase getPublishedArticles error:', error.message);
      let fallback = allArticles.filter((a) => a.status === 'published');
      if (options.category && options.category !== 'all') {
        fallback = fallback.filter(
          (a) =>
            a.category === options.category?.toLowerCase() ||
            a.categorySlug === options.category?.toLowerCase()
        );
      }
      if (options.isFeatured) {
        fallback = fallback.filter((a) => a.isFeatured);
      }
      if (options.limit && options.limit > 0) {
        fallback = fallback.slice(0, options.limit);
      }
      return fallback;
    }

    const mapped = (data || []).map(mapRowToArticle);

    // Sync Mode: 'database_only' (strictly sync from database) vs 'hybrid'
    const syncMode =
      typeof window !== 'undefined'
        ? localStorage.getItem('petzora_sync_mode') || 'database_only'
        : 'database_only';

    let combined: Article[];

    if (syncMode === 'database_only') {
      // If database has articles, strictly display ONLY what is in the database!
      // Only fallback if database is completely empty (0 rows)
      combined = mapped.length > 0 ? mapped : allArticles.filter((a) => a.status === 'published');
    } else {
      // Hybrid mode: merge database with in-code articles
      const existingSlugs = new Set(mapped.map((a) => a.slug));
      const unrepresentedFallbacks = allArticles.filter(
        (a) => a.status === 'published' && !existingSlugs.has(a.slug)
      );
      combined = [...mapped, ...unrepresentedFallbacks];
    }

    if (options.category && options.category !== 'all') {
      combined = combined.filter(
        (a) =>
          a.category === options.category?.toLowerCase() ||
          a.categorySlug === options.category?.toLowerCase()
      );
    }

    if (options.isFeatured) {
      combined = combined.filter((a) => a.isFeatured);
    }

    if (options.limit && options.limit > 0) {
      combined = combined.slice(0, options.limit);
    }

    return combined;
  } catch (err) {
    console.error('getPublishedArticles exception:', err);
    let fallback = allArticles.filter((a) => a.status === 'published');
    if (options.category && options.category !== 'all') {
      fallback = fallback.filter(
        (a) =>
          a.category === options.category?.toLowerCase() ||
          a.categorySlug === options.category?.toLowerCase()
      );
    }
    if (options.isFeatured) {
      fallback = fallback.filter((a) => a.isFeatured);
    }
    if (options.limit && options.limit > 0) {
      fallback = fallback.slice(0, options.limit);
    }
    return fallback;
  }
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return allArticles;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getAllArticlesAdmin error:', error.message);
      return allArticles;
    }

    const mapped = (data || []).map(mapRowToArticle);
    return mapped.length > 0 ? mapped : allArticles;
  } catch (err) {
    console.error('getAllArticlesAdmin exception:', err);
    return allArticles;
  }
}

export async function getArticleBySlug(slug: string, categorySlug?: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return allArticles.find((a) => a.slug === slug) || null;
  }

  try {
    let query = supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .eq('slug', slug);

    if (categorySlug) {
      query = query.eq('category_slug', categorySlug.toLowerCase());
    }

    // Public visitor can only see published; admin with active session could see preview
    const session = await supabase.auth.getSession();
    const isAdmin = Boolean(session.data.session?.user);

    if (!isAdmin) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query.maybeSingle();
    if (error || !data) {
      // Always fallback to built-in article so visitors never see a blank page or 404
      return allArticles.find((a) => a.slug === slug) || null;
    }

    const mapped = mapRowToArticle(data);
    if (!mapped.content || mapped.content.trim().length < 50 || mapped.content.trim().startsWith('<!--')) {
      const fallback = allArticles.find((a) => a.slug === slug);
      if (fallback) {
        mapped.content = fallback.content;
      }
    }
    return mapped;
  } catch (err) {
    console.error('getArticleBySlug exception:', err);
    return allArticles.find((a) => a.slug === slug) || null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToArticle(data);
  } catch (err) {
    console.error('getArticleById exception:', err);
    return null;
  }
}

export async function createArticle(articleData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  image_alt?: string;
  image_caption?: string;
  category_id?: string;
  category_slug: string;
  author_id?: string;
  status: 'draft' | 'published';
  is_featured?: boolean;
  is_editor_pick?: boolean;
  is_popular?: boolean;
  tags?: string[];
  reading_time?: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  og_image?: string;
  published_at?: string | null;
}): Promise<{ data: Article | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: 'Supabase is not configured yet. Please configure credentials in Settings.' };
  }

  try {
    const insertPayload: any = {
      title: articleData.title.trim(),
      slug: articleData.slug.trim(),
      excerpt: articleData.excerpt || '',
      content: articleData.content || '',
      featured_image: articleData.featured_image || '',
      image_alt: articleData.image_alt || articleData.title,
      image_caption: articleData.image_caption || '',
      category_id: articleData.category_id || null,
      category_slug: articleData.category_slug.toLowerCase(),
      author_id: articleData.author_id || null,
      status: articleData.status,
      is_featured: Boolean(articleData.is_featured),
      is_editor_pick: Boolean(articleData.is_editor_pick),
      is_popular: Boolean(articleData.is_popular),
      tags: articleData.tags || [],
      reading_time: articleData.reading_time || '4 min read',
      seo_title: articleData.seo_title || articleData.title,
      seo_description: articleData.seo_description || articleData.excerpt,
      canonical_url: articleData.canonical_url || `https://petzora.shop/${articleData.category_slug}/${articleData.slug}`,
      og_image: articleData.og_image || articleData.featured_image,
      published_at: articleData.status === 'published' ? (articleData.published_at || new Date().toISOString()) : null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([insertPayload])
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToArticle(data), error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to create article' };
  }
}

export async function updateArticle(
  id: string,
  articleData: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    image_alt?: string;
    image_caption?: string;
    category_id?: string;
    category_slug: string;
    author_id?: string;
    status: 'draft' | 'published';
    is_featured?: boolean;
    is_editor_pick?: boolean;
    is_popular?: boolean;
    tags?: string[];
    reading_time?: string;
    seo_title?: string;
    seo_description?: string;
    canonical_url?: string;
    og_image?: string;
    published_at?: string | null;
  }>
): Promise<{ data: Article | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: 'Supabase is not configured yet.' };
  }

  try {
    const updatePayload: any = {
      ...articleData,
      updated_at: new Date().toISOString(),
    };

    if (articleData.status === 'published' && !articleData.published_at) {
      updatePayload.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('articles')
      .update(updatePayload)
      .eq('id', id)
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToArticle(data), error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to update article' };
  }
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete article' };
  }
}

export async function checkSlugUnique(slug: string, currentId?: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    let query = supabase.from('articles').select('id').eq('slug', slug);
    if (currentId) {
      query = query.neq('id', currentId);
    }
    const { data } = await query;
    return !data || data.length === 0;
  } catch {
    return true;
  }
}

export async function searchPublishedArticles(searchQuery: string): Promise<Article[]> {
  const term = searchQuery.trim().toLowerCase();
  if (!term) return [];

  const filterFallback = () =>
    allArticles.filter(
      (a) =>
        a.status === 'published' &&
        ((a.title && a.title.toLowerCase().includes(term)) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(term)) ||
          (a.content && a.content.toLowerCase().includes(term)) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(term))))
    );

  if (!isSupabaseConfigured()) {
    return filterFallback();
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .eq('status', 'published')
      .or(`title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error || !data || data.length === 0) {
      return filterFallback();
    }
    return data.map(mapRowToArticle);
  } catch (err) {
    console.error('searchPublishedArticles error:', err);
    return filterFallback();
  }
}

export async function getRelatedArticles(currentSlug: string, categorySlug: string, tags: string[] = [], limit: number = 3): Promise<Article[]> {
  const targetCategory = categorySlug.toLowerCase();
  const fallback = allArticles
    .filter(
      (a) =>
        a.status === 'published' &&
        a.slug !== currentSlug &&
        ((a.category && a.category.toLowerCase() === targetCategory) ||
          (a.categorySlug && a.categorySlug.toLowerCase() === targetCategory) ||
          (a.tags && a.tags.some((t) => tags.includes(t))))
    )
    .slice(0, limit);

  if (!isSupabaseConfigured()) return fallback;

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
      .eq('status', 'published')
      .neq('slug', currentSlug)
      .eq('category_slug', categorySlug.toLowerCase())
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) return fallback;
    return data.map(mapRowToArticle);
  } catch {
    return fallback;
  }
}

// ----------------------------------------------------------------------
// CATEGORIES API
// ----------------------------------------------------------------------

export const fallbackCategories: CategoryInfo[] = [
  { id: 'dogs', name: 'DOGS', slug: 'dogs', description: 'Everything dog parents need: puppy care routines, loose-leash manners, canine nutrition, and lifelong health.', coverImage: '/images/featured-dog.webp' },
  { id: 'cats', name: 'CATS', slug: 'cats', description: 'Inside the captivating world of felines: kitten milestones, subtle body language, stress relief, and nutrition.', coverImage: '/images/featured-cat.webp' },
  { id: 'care', name: 'CARE', slug: 'care', description: 'Everyday hygiene, seasonal routines, gentle bathing, nail trims, and home comfort essentials.', coverImage: '/images/pet-care.webp' },
  { id: 'health', name: 'HEALTH', slug: 'health', description: 'Veterinary-reviewed preventive wellness, symptom checklists, vaccinations, and non-emergency guidance.', coverImage: '/images/pet-health.webp' },
  { id: 'nutrition', name: 'NUTRITION', slug: 'nutrition', description: 'Evidence-based canine & feline nutrition, portion calculators, and human food safety lists.', coverImage: '/images/pet-nutrition.webp' },
  { id: 'training', name: 'TRAINING', slug: 'training', description: 'Gentle, positive reinforcement routines that build mutual trust, focus, and joyful obedience.', coverImage: '/images/dog-training.webp' },
  { id: 'reviews', name: 'REVIEWS', slug: 'reviews', description: 'Hands-on gear testing, orthopedic pet beds, interactive toys, GPS collars, and feeding tools.', coverImage: '/images/pet-reviews.webp' },
  { id: 'stories', name: 'STORIES', slug: 'stories', description: 'Heartwarming rescue transformations, adoption journeys, and uplifting pet moments.', coverImage: '/images/pet-story.webp' },
];

export async function getCategories(): Promise<CategoryInfo[]> {
  if (!isSupabaseConfigured()) {
    return fallbackCategories;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackCategories;
    }

    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      coverImage: getCategoryCoverImage(c.slug),
    }));
  } catch (err) {
    console.warn('getCategories failed, using defaults', err);
    return fallbackCategories;
  }
}

function getCategoryCoverImage(slug: string): string {
  const map: Record<string, string> = {
    dogs: '/images/featured-dog.webp',
    cats: '/images/featured-cat.webp',
    care: '/images/pet-care.webp',
    'pet-care': '/images/pet-care.webp',
    health: '/images/pet-health.webp',
    nutrition: '/images/pet-nutrition.webp',
    training: '/images/dog-training.webp',
    reviews: '/images/pet-reviews.webp',
    stories: '/images/pet-story.webp',
  };
  return map[slug.toLowerCase()] || '/images/hero-dog-cat.webp';
}

export async function createCategory(cat: { name: string; slug: string; description?: string }): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase.from('categories').insert([{
      name: cat.name.trim(),
      slug: cat.slug.trim().toLowerCase(),
      description: cat.description || '',
    }]);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCategory(id: string, cat: { name: string; slug: string; description?: string }): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase.from('categories').update({
      name: cat.name.trim(),
      slug: cat.slug.trim().toLowerCase(),
      description: cat.description || '',
    }).eq('id', id);

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------------------------
// AUTHORS API
// ----------------------------------------------------------------------

export async function getAuthors(): Promise<Author[]> {
  if (!isSupabaseConfigured()) {
    return [defaultAuthor];
  }

  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return [defaultAuthor];
    }

    return data.map((a: any) => ({
      id: a.id,
      name: a.name,
      slug: a.slug,
      role: a.role || 'Contributor',
      credentials: a.credentials || '',
      bio: a.bio || '',
      avatar: a.avatar_url || '/images/author-clara.webp',
      email: a.email,
      website: a.website,
      socialLinks: {
        email: a.email,
        website: a.website,
      },
    }));
  } catch {
    return [defaultAuthor];
  }
}

// ----------------------------------------------------------------------
// MEDIA LIBRARY & STORAGE API
// ----------------------------------------------------------------------

export async function uploadMediaFile(file: File): Promise<{ url: string; name: string; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { url: '', name: '', error: 'Supabase credentials not configured' };
  }

  try {
    // Generate clean unique filename
    const fileExt = file.name.split('.').pop() || 'jpg';
    const cleanName = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `${Date.now()}-${cleanName}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage bucket 'media'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return { url: '', name: '', error: uploadError.message };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(uploadData.path);

    const publicUrl = publicUrlData.publicUrl;

    // Record into media_files table for easy library browsing
    await supabase.from('media_files').insert([{
      name: file.name,
      url: publicUrl,
      size: file.size,
      mime_type: file.type,
      storage_path: uploadData.path,
    }]);

    return { url: publicUrl, name: file.name, error: null };
  } catch (err: any) {
    return { url: '', name: '', error: err.message || 'Image upload failed' };
  }
}

export async function listMediaFiles(): Promise<MediaFile[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    // Attempt to fetch from media_files table
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((m: any) => ({
        id: m.id,
        name: m.name,
        url: m.url,
        size: m.size,
        mimeType: m.mime_type,
        storagePath: m.storage_path,
        createdAt: m.created_at,
      }));
    }

    // Fallback: list directly from Supabase Storage 'media' bucket
    const { data: storageFiles, error: storageError } = await supabase.storage
      .from('media')
      .list('uploads', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (storageError || !storageFiles) return [];

    return storageFiles.map((f: any) => {
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(`uploads/${f.name}`);
      return {
        id: f.id || f.name,
        name: f.name,
        url: urlData.publicUrl,
        size: f.metadata?.size || 0,
        mimeType: f.metadata?.mimetype || 'image/jpeg',
        storagePath: `uploads/${f.name}`,
        createdAt: f.created_at || new Date().toISOString(),
      };
    });
  } catch (err) {
    console.error('listMediaFiles error:', err);
    return [];
  }
}

export async function deleteMediaFile(id: string, storagePath: string): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  try {
    if (storagePath) {
      await supabase.storage.from('media').remove([storagePath]);
    }
    if (id) {
      await supabase.from('media_files').delete().eq('id', id);
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------------------------
// SITE SETTINGS API
// ----------------------------------------------------------------------

export const defaultSiteSettings: SiteSettings = {
  siteName: 'Petzora',
  siteDescription: 'Better Care. Happier Pets. Practical dog and cat care guides fact-checked by veterinarians.',
  logoUrl: '',
  defaultSeoTitle: 'Petzora – Better Care. Happier Pets. | Dog & Cat Guides',
  defaultSeoDescription: 'Practical pet care advice, puppy training, cat health, canine nutrition, product recommendations, and heartwarming stories for dog and cat owners.',
  defaultOgImage: 'https://petzora.shop/images/hero-dog-cat.webp',
  socialLinks: {
    x: 'https://x.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return defaultSiteSettings;

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) return defaultSiteSettings;

    return {
      siteName: data.site_name || defaultSiteSettings.siteName,
      siteDescription: data.site_description || defaultSiteSettings.siteDescription,
      logoUrl: data.logo_url || defaultSiteSettings.logoUrl,
      defaultSeoTitle: data.default_seo_title || defaultSiteSettings.defaultSeoTitle,
      defaultSeoDescription: data.default_seo_description || defaultSiteSettings.defaultSeoDescription,
      defaultOgImage: data.default_og_image || defaultSiteSettings.defaultOgImage,
      socialLinks: data.social_links || defaultSiteSettings.socialLinks,
    };
  } catch {
    return defaultSiteSettings;
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error: string | null }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  try {
    const payload: any = {
      updated_at: new Date().toISOString(),
    };
    if (settings.siteName !== undefined) payload.site_name = settings.siteName;
    if (settings.siteDescription !== undefined) payload.site_description = settings.siteDescription;
    if (settings.logoUrl !== undefined) payload.logo_url = settings.logoUrl;
    if (settings.defaultSeoTitle !== undefined) payload.default_seo_title = settings.defaultSeoTitle;
    if (settings.defaultSeoDescription !== undefined) payload.default_seo_description = settings.defaultSeoDescription;
    if (settings.defaultOgImage !== undefined) payload.default_og_image = settings.defaultOgImage;
    if (settings.socialLinks !== undefined) payload.social_links = settings.socialLinks;

    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 'default', ...payload });

    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------------------------
// DASHBOARD STATS API
// ----------------------------------------------------------------------

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalCategories: number;
  recentArticles: Article[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured()) {
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalCategories: 0,
      recentArticles: [],
    };
  }

  try {
    const [allArticlesRes, categoriesRes] = await Promise.all([
      supabase
        .from('articles')
        .select('*, categories(id, name, slug), authors(id, name, slug, role, bio, avatar_url, credentials, email, website)')
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('id', { count: 'exact' }),
    ]);

    const allArticles = (allArticlesRes.data || []).map(mapRowToArticle);
    const totalArticles = allArticles.length;
    const publishedArticles = allArticles.filter((a) => a.status === 'published').length;
    const draftArticles = allArticles.filter((a) => a.status === 'draft').length;
    const totalCategories = categoriesRes.count ?? fallbackCategories.length;

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalCategories,
      recentArticles: allArticles.slice(0, 5),
    };
  } catch (err) {
    console.error('getDashboardStats error:', err);
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalCategories: 0,
      recentArticles: [],
    };
  }
}

// ----------------------------------------------------------------------
// BUILT-IN TO SUPABASE CONTENT SYNC
// ----------------------------------------------------------------------

export interface ContentSyncStatus {
  totalBuiltIn: number;
  inSupabaseCount: number;
  unsyncedCount: number;
  unsyncedSlugs: string[];
}

export async function getSyncStatus(): Promise<ContentSyncStatus> {
  const totalBuiltIn = allArticles.length;
  if (!isSupabaseConfigured()) {
    return {
      totalBuiltIn,
      inSupabaseCount: 0,
      unsyncedCount: totalBuiltIn,
      unsyncedSlugs: allArticles.map((a) => a.slug),
    };
  }

  try {
    const { data, error } = await supabase.from('articles').select('slug');
    if (error || !data) {
      return {
        totalBuiltIn,
        inSupabaseCount: 0,
        unsyncedCount: totalBuiltIn,
        unsyncedSlugs: allArticles.map((a) => a.slug),
      };
    }

    const existingSlugs = new Set(data.map((r: any) => r.slug));
    const unsyncedArticles = allArticles.filter((a) => !existingSlugs.has(a.slug));

    return {
      totalBuiltIn,
      inSupabaseCount: existingSlugs.size,
      unsyncedCount: unsyncedArticles.length,
      unsyncedSlugs: unsyncedArticles.map((a) => a.slug),
    };
  } catch (err) {
    console.error('getSyncStatus exception:', err);
    return {
      totalBuiltIn,
      inSupabaseCount: 0,
      unsyncedCount: totalBuiltIn,
      unsyncedSlugs: allArticles.map((a) => a.slug),
    };
  }
}

export async function syncBuiltInArticlesToSupabase(): Promise<{
  success: boolean;
  syncedCount: number;
  totalBuiltIn: number;
  alreadySyncedCount: number;
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      syncedCount: 0,
      totalBuiltIn: allArticles.length,
      alreadySyncedCount: 0,
      error: 'Supabase credentials are not configured.',
    };
  }

  try {
    // 1. Get existing articles in Supabase to avoid duplicates
    const { data: existingRows, error: fetchErr } = await supabase
      .from('articles')
      .select('slug');

    if (fetchErr) {
      return {
        success: false,
        syncedCount: 0,
        totalBuiltIn: allArticles.length,
        alreadySyncedCount: 0,
        error: fetchErr.message,
      };
    }

    const existingSlugs = new Set((existingRows || []).map((r: any) => r.slug));

    // 2. Fetch categories and authors from Supabase for foreign key mapping
    const [categoriesRes, authorsRes] = await Promise.all([
      supabase.from('categories').select('id, slug'),
      supabase.from('authors').select('id, slug'),
    ]);

    const categoryMap = new Map<string, string>();
    (categoriesRes.data || []).forEach((c: any) => {
      categoryMap.set(c.slug.toLowerCase(), c.id);
    });

    const authorMap = new Map<string, string>();
    (authorsRes.data || []).forEach((a: any) => {
      authorMap.set(a.slug.toLowerCase(), a.id);
    });

    // 3. Filter articles that need insertion
    const missingArticles = allArticles.filter((a) => !existingSlugs.has(a.slug));

    if (missingArticles.length === 0) {
      return {
        success: true,
        syncedCount: 0,
        totalBuiltIn: allArticles.length,
        alreadySyncedCount: existingSlugs.size,
        error: null,
      };
    }

    // 4. Insert each missing article with mapped IDs
    let totalInserted = 0;
    const errors: string[] = [];

    for (const art of missingArticles) {
      const catSlug = (art.categorySlug || art.category || 'care').toLowerCase();
      const authorSlug = (art.author?.slug || 'dr-clara-vance').toLowerCase();

      const payload = {
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt || '',
        content: art.content || '',
        featured_image: art.featuredImage || '/images/pet-fallback.webp',
        image_alt: art.imageAlt || art.title,
        image_caption: art.imageCaption || '',
        category_id: categoryMap.get(catSlug) || null,
        category_slug: catSlug,
        author_id: authorMap.get(authorSlug) || null,
        status: (art.status || 'published') as 'published' | 'draft',
        is_featured: Boolean(art.isFeatured),
        is_editor_pick: Boolean(art.isEditorPick),
        is_popular: Boolean(art.isPopular),
        tags: art.tags || [],
        reading_time: art.readingTime || '4 min read',
        seo_title: art.seoTitle || art.title,
        seo_description: art.seoDescription || art.excerpt,
        canonical_url: art.canonicalUrl || `https://petzora.shop/${catSlug}/${art.slug}`,
        og_image: art.ogImage || art.featuredImage || 'https://petzora.shop/images/hero-dog-cat.webp',
        published_at: art.publishedAt || new Date().toISOString(),
        created_at: art.createdAt || new Date().toISOString(),
        updated_at: art.updatedAt || new Date().toISOString(),
      };

      const { error: insertErr } = await supabase.from('articles').insert([payload]);

      if (insertErr) {
        console.warn(`Failed to insert ${art.slug}:`, insertErr.message);
        errors.push(`${art.title}: ${insertErr.message}`);
      } else {
        totalInserted++;
      }
    }

    return {
      success: totalInserted > 0,
      syncedCount: totalInserted,
      totalBuiltIn: allArticles.length,
      alreadySyncedCount: existingSlugs.size,
      error: errors.length > 0 ? errors.join(', ') : null,
    };
  } catch (err: any) {
    console.error('syncBuiltInArticlesToSupabase exception:', err);
    return {
      success: false,
      syncedCount: 0,
      totalBuiltIn: allArticles.length,
      alreadySyncedCount: 0,
      error: err.message || 'Failed to sync articles',
    };
  }
}

