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
    articleCount: 1,
  },
  {
    id: 'health',
    name: 'HEALTH',
    slug: 'health',
    description: 'Veterinary-reviewed preventive wellness, symptom checklists, vaccinations, and non-emergency health guidance.',
    coverImage: '/images/pet-health.webp',
    iconName: 'ShieldCheck',
    subTopics: ['Preventive Care', 'Symptoms', 'Senior Wellness', 'Dental Health', 'Vaccinations'],
    articleCount: 1,
  },
  {
    id: 'nutrition',
    name: 'NUTRITION',
    slug: 'nutrition',
    description: 'Evidence-based canine & feline nutrition, portion calculators, human food safety lists, and hydration tips.',
    coverImage: '/images/pet-nutrition.webp',
    iconName: 'Apple',
    subTopics: ['Feeding Schedules', 'Safe Foods', 'Toxic Ingredients', 'Supplements', 'Hydration'],
    articleCount: 1,
  },
  {
    id: 'training',
    name: 'TRAINING',
    slug: 'training',
    description: 'Gentle, Fear-Free positive reinforcement routines that build mutual trust, focus, and joyful obedience.',
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
    description: 'Independent buying roundups for orthopedic beds, smart water fountains, indestructible toys, and carriers.',
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
  { name: 'Pumpkin (Pure Puree)', petType: 'both', safety: 'safe', notes: 'Excellent source of soluble fiber for digestion & firm stool.', icon: '🎃' },
  { name: 'Cooked Eggs', petType: 'both', safety: 'safe', notes: 'Rich in easily digestible amino acids, biotin, and healthy fats.', icon: '🍳' },
  { name: 'Blueberries', petType: 'both', safety: 'safe', notes: 'Packed with antioxidants, vitamin C, and cellular-protecting anthocyanins.', icon: '🫐' },
  { name: 'Carrots', petType: 'both', safety: 'safe', notes: 'Crunchy low-calorie snack rich in beta-carotene; helps scrape dental plaque.', icon: '🥕' },
  { name: 'Plain Cooked Chicken', petType: 'both', safety: 'safe', notes: 'Lean, bland protein staple ideal for sensitive stomachs (boneless & unseasoned).', icon: '🍗' },
  { name: 'Chocolate & Cocoa', petType: 'both', safety: 'toxic', notes: 'Contains theobromine & caffeine; induces cardiac arrhythmias and neurotoxicity.', icon: '🍫' },
  { name: 'Grapes & Raisins', petType: 'both', safety: 'toxic', notes: 'Can trigger acute, irreversible renal (kidney) failure even in small quantities.', icon: '🍇' },
  { name: 'Onions & Garlic', petType: 'both', safety: 'toxic', notes: 'Contain thiosulfates which cause oxidative damage and hemolytic anemia in red blood cells.', icon: '🧅' },
  { name: 'Xylitol (Birch Sweetener)', petType: 'both', safety: 'toxic', notes: 'Severe rapid insulin spike resulting in life-threatening hypoglycemia and liver necrosis.', icon: '🍬' },
];

export const allArticles: Article[] = allPillarArticles;
export const petzoraPicks: ProductReview[] = [];
