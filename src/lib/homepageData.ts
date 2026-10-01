import { Article } from '../types';

const SUPABASE_URL = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://wrsiehvxrryqsihqirgm.supabase.co').trim();
const SUPABASE_ANON_KEY = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn').trim();

interface HomepageArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  image_alt: string | null;
  category_slug: string | null;
  author_id: string | null;
  status: 'published' | 'draft';
  is_featured: boolean | null;
  is_editor_pick: boolean | null;
  is_popular: boolean | null;
  tags: string[] | null;
  reading_time: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
}

function categoryFallbackImage(category: string): string {
  if (category === 'cats') return '/images/featured-cat.webp';
  if (category === 'dogs') return '/images/featured-dog.webp';
  if (category === 'nutrition') return '/images/pet-nutrition.webp';
  if (category === 'health') return '/images/pet-health.webp';
  if (category === 'training') return '/images/dog-training.webp';
  if (category === 'stories') return '/images/pet-story.webp';
  return '/images/pet-care.webp';
}

function mapHomepageRow(row: HomepageArticleRow): Article {
  const category = row.category_slug || 'pet-care';
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category,
    categorySlug: category,
    excerpt: row.excerpt || '',
    featuredImage: row.featured_image || categoryFallbackImage(category),
    imageAlt: row.image_alt || row.title,
    author: {
      id: row.author_id || 'emon-ahmed',
      name: 'Emon Ahmed',
      slug: 'emon-ahmed',
      role: 'Author & Editor',
    },
    authorId: row.author_id || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    publishedAt: row.published_at || row.created_at,
    readingTime: row.reading_time || '8 min read',
    status: 'published',
    isFeatured: Boolean(row.is_featured),
    isEditorPick: Boolean(row.is_editor_pick),
    isPopular: Boolean(row.is_popular),
    tags: Array.isArray(row.tags) ? row.tags : [],
    petType: category === 'cats' ? 'cat' : category === 'dogs' ? 'dog' : 'all',
  };
}

/**
 * Homepage-only query intentionally avoids the article `content` column and
 * avoids importing the full static article fallback library. This keeps the
 * initial JS and API payload substantially smaller while preserving the cards,
 * featured guide, category sections, tags and timestamps the homepage needs.
 */
export async function getHomepageArticles(): Promise<Article[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

  const select = [
    'id',
    'title',
    'slug',
    'excerpt',
    'featured_image',
    'image_alt',
    'category_slug',
    'author_id',
    'status',
    'is_featured',
    'is_editor_pick',
    'is_popular',
    'tags',
    'reading_time',
    'published_at',
    'created_at',
    'updated_at',
  ].join(',');

  const url = new URL(`${SUPABASE_URL}/rest/v1/articles`);
  url.searchParams.set('select', select);
  url.searchParams.set('status', 'eq.published');
  url.searchParams.set('order', 'published_at.desc');
  url.searchParams.set('limit', '80');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Homepage article metadata request failed:', response.status);
      return [];
    }

    const rows = (await response.json()) as HomepageArticleRow[];
    return rows.map(mapHomepageRow);
  } catch (error) {
    console.warn('Homepage article metadata request failed:', error);
    return [];
  }
}
