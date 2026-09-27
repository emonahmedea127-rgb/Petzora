export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  credentials?: string;
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
  | 'pet-care'
  | 'nutrition'
  | 'training'
  | 'health'
  | 'behavior'
  | 'reviews'
  | 'product-guides'
  | 'stories';

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
  subCategory?: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  imageCaption?: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  readingTime: string;
  status: 'published' | 'draft';
  isFeatured?: boolean;
  isPopular?: boolean;
  isEditorPick?: boolean;
  isTrending?: boolean;
  isBehaviorHero?: boolean;
  isDogHighlight?: boolean;
  isCatHighlight?: boolean;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  sections: ArticleSection[];
  tableOfContents: { id: string; text: string; level: number }[];
  faqList: FAQItem[];
  relatedSlugs: string[];
  petType?: 'dog' | 'cat' | 'all';
  sources?: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: PetCategory;
  description: string;
  coverImage: string;
  iconName: string;
  subTopics: string[];
  articleCount?: number;
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
