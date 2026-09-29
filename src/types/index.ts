export interface Author {
  id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  credentials?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    email?: string;
    website?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type PetCategory =
  | 'dogs'
  | 'cats'
  | 'care'
  | 'pet-care'
  | 'nutrition'
  | 'training'
  | 'health'
  | 'behavior'
  | 'reviews'
  | 'product-guides'
  | 'stories'
  | string;

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'image' | 'list' | 'tipBox' | 'warningBox';
  content?: string;
  headingText?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  imageCaption?: string;
  listItems?: string[];
  tipTitle?: string;
  tipText?: string;
  warningTitle?: string;
  warningText?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: PetCategory;
  categorySlug?: string;
  categoryId?: string;
  subCategory?: string;
  excerpt: string;
  content?: string; // Rich HTML content
  featuredImage: string;
  imageAlt?: string;
  imageCaption?: string;
  author: Author;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  readingTime: string;
  status: 'published' | 'draft';
  isFeatured?: boolean;
  isPopular?: boolean;
  isEditorPick?: boolean;
  isTrending?: boolean;
  isBehaviorHero?: boolean;
  isDogHighlight?: boolean;
  isCatHighlight?: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  ogImage?: string;
  sections?: ArticleSection[];
  tableOfContents?: { id: string; text: string; level: number }[];
  faqList?: FAQItem[];
  relatedSlugs?: string[];
  petType?: 'dog' | 'cat' | 'all';
  sources?: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  iconName?: string;
  subTopics?: string[];
  articleCount?: number;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  storagePath: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string;
  socialLinks?: {
    x?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface ProductReview {
  id: string;
  title: string;
  slug: string;
  category: 'dog-beds' | 'cat-toys' | 'pet-cameras' | 'grooming-tools' | 'leashes' | 'carriers' | 'water-fountains' | 'pet-accessories';
  categoryLabel: string;
  bestFor: string;
  rating?: number;
  featuredImage: string;
  shortDescription: string;
  pros: string[];
  cons: string[];
  priceRange: '$' | '$$' | '$$$';
  affiliateNote?: string;
}

export interface FoodGuideItem {
  name: string;
  petType: 'dog' | 'cat' | 'both';
  safety: 'safe' | 'toxic' | 'moderation';
  notes: string;
  icon: string;
}
