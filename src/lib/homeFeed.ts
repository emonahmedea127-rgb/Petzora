import type { Article, Author } from '../types';

const DEFAULT_SUPABASE_URL = 'https://wrsiehvxrryqsihqirgm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_koPbRs1lun2YdNT5ei-OZg_3viY5Mkn';

function getConfig() {
  const url = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL).trim().replace(/\/$/, '');
  const anonKey = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY).trim();
  return { url, anonKey };
}

const defaultAuthor: Author = {
  id: 'emon-ahmed',
  name: 'Emon Ahmed',
  slug: 'emon-ahmed',
  role: 'Author & Editor',
  credentials: '',
  bio: 'Emon Ahmed is the author and editor of Petzora.',
  avatar: '/images/emon-ahmed.webp',
};

function categoryFallbackImage(category: string) {
  if (category === 'cats') return '/images/featured-cat.webp';
  if (category === 'dogs') return '/images/featured-dog.webp';
  if (category === 'nutrition') return '/images/pet-nutrition.webp';
  if (category === 'health') return '/images/pet-health.webp';
  if (category === 'training') return '/images/dog-training.webp';
  if (category === 'stories') return '/images/pet-story.webp';
  if (category === 'reviews') return '/images/pet-reviews.webp';
  return '/images/pet-care.webp';
}

function mapHomeArticle(row: any): Article {
  const category = row.category_slug || 'pet-care';
  const authorRow = Array.isArray(row.authors) ? row.authors[0] : row.authors;
  const author: Author = authorRow
    ? {
        id: authorRow.id,
        name: authorRow.name || 'Emon Ahmed',
        slug: authorRow.slug || 'emon-ahmed',
        role: authorRow.role || 'Author & Editor',
        credentials: authorRow.credentials || '',
        bio: authorRow.bio || '',
        avatar: authorRow.avatar_url || '/images/emon-ahmed.webp',
        socialLinks: {
          email: authorRow.email,
          website: authorRow.website,
        },
      }
    : defaultAuthor;

  const featuredImage = row.featured_image || categoryFallbackImage(category);
  const tags = Array.isArray(row.tags) ? row.tags : [];
  const text = `${row.title || ''} ${category} ${tags.join(' ')}`.toLowerCase();
  const petType: 'dog' | 'cat' | 'all' =
    category === 'cats' || text.includes('cat') || text.includes('kitten') || text.includes('feline')
      ? 'cat'
      : category === 'dogs' || text.includes('dog') || text.includes('puppy') || text.includes('canine')
        ? 'dog'
        : 'all';

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category,
    categorySlug: category,
    categoryId: row.category_id,
    excerpt: row.excerpt || '',
    featuredImage,
    imageAlt: row.image_alt || row.title,
    author,
    authorId: row.author_id,
    createdAt: row.created_at || row.published_at || new Date().toISOString(),
    updatedAt: row.updated_at || row.created_at || row.published_at || new Date().toISOString(),
    publishedAt: row.published_at || row.created_at,
    readingTime: row.reading_time || '8 min read',
    status: 'published',
    isFeatured: Boolean(row.is_featured),
    isEditorPick: Boolean(row.is_editor_pick),
    isPopular: Boolean(row.is_popular),
    tags,
    canonicalPath: `/${category}/${row.slug}`,
    canonicalUrl: `https://www.petzora.shop/${category}/${row.slug}`,
    ogImage: featuredImage,
    tableOfContents: [],
    faqList: [],
    relatedSlugs: [],
    sources: [],
    petType,
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { url, anonKey } = getConfig();

  try {
    const params = new URLSearchParams({
      select: 'id,title,slug,excerpt,featured_image,image_alt,category_id,category_slug,author_id,is_featured,is_editor_pick,is_popular,tags,reading_time,published_at,created_at,updated_at,authors(id,name,slug,role,bio,avatar_url,credentials,email,website)',
      status: 'eq.published',
      order: 'published_at.desc.nullslast',
      limit: '60',
    });

    const response = await fetch(`${url}/rest/v1/articles?${params.toString()}`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Homepage feed request failed: ${response.status}`);
    }

    const rows = await response.json();
    return Array.isArray(rows) ? rows.map(mapHomeArticle) : [];
  } catch (error) {
    console.warn('Homepage feed unavailable:', error);
    return [];
  }
}
