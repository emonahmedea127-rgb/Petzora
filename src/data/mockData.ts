import { CategoryInfo, Article, ProductReview, FoodGuideItem } from '../types';
import { editorialTeam } from './authors';
import { allPillarArticles } from './articles';

export { editorialTeam };

export const petCategories: CategoryInfo[] = [
  {
    id: 'dogs',
    name: 'DOGS',
    slug: 'dogs',
    description: 'Everything dog parents need: puppy care routines, loose-leash manners, canine nutrition, and lifelong health.',
    coverImage: '/images/featured-dog.webp',
    iconName: 'Dog',
    subTopics: ['Puppies', 'Training', 'Behavior', 'Nutrition', 'Health', 'Grooming'],
    articleCount: 1,
  },
  {
    id: 'cats',
    name: 'CATS',
    slug: 'cats',
    description: 'Inside the captivating world of felines: kitten milestones, subtle body language, stress relief, and nutrition.',
    coverImage: '/images/featured-cat.webp',
    iconName: 'Cat',
    subTopics: ['Kittens', 'Cat Behavior', 'Indoor Life', 'Cat Nutrition', 'Feline Health', 'Litter Care'],
    articleCount: 1,
  },
  {
    id: 'care',
    name: 'PET CARE',
    slug: 'care',
    description: 'Everyday hygiene, seasonal routines, gentle bathing, nail trims, and home comfort essentials.',
    coverImage: '/images/pet-care.webp',
    iconName: 'Sparkles',
    subTopics: ['Grooming', 'Bathing', 'Dental Care', 'Senior Pet Care', 'Home Setup'],
    articleCount: 2,
  },
  {
    id: 'pet-care',
    name: 'PET CARE',
    slug: 'pet-care',
    description: 'Comprehensive daily pet care routines, grooming blueprints, stress-aware bathing, and hygiene essentials.',
    coverImage: '/images/pet-care.webp',
    iconName: 'Sparkles',
    subTopics: ['Daily Routines', 'Grooming', 'Bathing', 'Dental Care', 'Nail Trimming'],
    articleCount: 2,
  },
  {
    id: 'health',
    name: 'HEALTH',
    slug: 'health',
    description: 'Preventive wellness explainers, symptom checklists, vaccinations, and non-emergency pet health information.',
    coverImage: '/images/pet-health.webp',
    iconName: 'ShieldCheck',
    subTopics: ['Preventive Care', 'Symptoms', 'Senior Wellness', 'Dental Health', 'Vaccinations'],
    articleCount: 1,
  },
  {
    id: 'nutrition',
    name: 'NUTRITION',
    slug: 'nutrition',
    description: 'Practical canine and feline nutrition guides, portion planning, human food safety lists, and hydration tips.',
    coverImage: '/images/pet-nutrition.webp',
    iconName: 'Apple',
    subTopics: ['Feeding Schedules', 'Safe Foods', 'Toxic Ingredients', 'Supplements', 'Hydration'],
    articleCount: 1,
  },
  {
    id: 'training',
    name: 'TRAINING',
    slug: 'training',
    description: 'Gentle, reward-based routines that support trust, focus, and everyday manners.',
    coverImage: '/images/dog-training.webp',
    iconName: 'Award',
    subTopics: ['Puppy Training', 'Loose Leash', 'Crate Training', 'Barking', 'Separation Anxiety'],
    articleCount: 1,
  },
  {
    id: 'behavior',
    name: 'BEHAVIOR',
    slug: 'behavior',
    description: 'Decode why your dog or cat stares, kneads, tilts their head, follows you, or gets midnight zoomies.',
    coverImage: '/images/dog-behavior.webp',
    iconName: 'HelpCircle',
    subTopics: ['Curious Habits', 'Body Language', 'Nighttime Behavior', 'Bonding Signs', 'Anxiety'],
    articleCount: 1,
  },
  {
    id: 'reviews',
    name: 'PRODUCT GUIDES',
    slug: 'reviews',
    description: 'Buying guides for orthopedic beds, smart water fountains, durable toys, carriers, and everyday pet gear.',
    coverImage: '/images/pet-reviews.webp',
    iconName: 'ShoppingBag',
    subTopics: ['Dog Beds', 'Cat Toys', 'Pet Cameras', 'Grooming Tools', 'Leashes', 'Carriers', 'Fountains'],
    articleCount: 1,
  },
  {
    id: 'stories',
    name: 'STORIES',
    slug: 'stories',
    description: 'Heartwarming rescue transformations, adoption journeys, and uplifting pet moments.',
    coverImage: '/images/pet-story.webp',
    iconName: 'Heart',
    subTopics: ['Adoption', 'Rescue Stories', 'Bonding Moments'],
    articleCount: 1,
  },
];

export const foodGuideItems: FoodGuideItem[] = [
  { name: 'Pumpkin (Pure Puree)', petType: 'both', safety: 'safe', notes: 'A source of soluble fiber often used in small amounts for digestive support.', icon: '🎃' },
  { name: 'Cooked Eggs', petType: 'both', safety: 'safe', notes: 'A protein-rich food that should be served plain and fully cooked.', icon: '🍳' },
  { name: 'Blueberries', petType: 'both', safety: 'safe', notes: 'A small, low-calorie treat that contains fiber and antioxidants.', icon: '🫐' },
  { name: 'Carrots', petType: 'both', safety: 'safe', notes: 'A crunchy, low-calorie snack that can be served in pet-safe portions.', icon: '🥕' },
  { name: 'Plain Cooked Chicken', petType: 'both', safety: 'safe', notes: 'Plain, boneless, unseasoned cooked chicken can be suitable for many pets in moderation.', icon: '🍗' },
  { name: 'Chocolate & Cocoa', petType: 'both', safety: 'toxic', notes: 'Contains methylxanthines such as theobromine and caffeine and can be dangerous to pets.', icon: '🍫' },
  { name: 'Grapes & Raisins', petType: 'both', safety: 'toxic', notes: 'Can cause serious kidney injury in dogs. Treat exposure as urgent and contact a veterinarian.', icon: '🍇' },
  { name: 'Onions & Garlic', petType: 'both', safety: 'toxic', notes: 'Allium foods can damage red blood cells in dogs and cats and should be avoided.', icon: '🧅' },
  { name: 'Xylitol (Birch Sweetener)', petType: 'both', safety: 'toxic', notes: 'Can cause severe hypoglycemia and liver injury in dogs. Seek urgent veterinary help after exposure.', icon: '🍬' },
];

export const allArticles: Article[] = allPillarArticles;
export const petzoraPicks: ProductReview[] = [];
