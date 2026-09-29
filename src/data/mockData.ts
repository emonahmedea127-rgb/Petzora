import { Author, CategoryInfo, Article, ProductReview, FoodGuideItem } from '../types';

export const editorialTeam: Author[] = [
  {
    id: 'author-clara',
    name: 'Dr. Clara Vance, DVM',
    slug: 'dr-clara-vance',
    role: 'Veterinary Advisory & Lead Pet Health Editor',
    credentials: 'DVM (Doctor of Veterinary Medicine), 12+ Years Clinical & Emergency Practice',
    bio: 'Dedicated small animal veterinarian with over twelve years of clinical emergency and family companion practice. Passionate about empowering pet parents with clear, compassionate, and fact-checked health care advice.',
    avatar: '/images/author-clara.webp',
    socialLinks: {
      email: 'clara.vance@petzora.shop',
      website: 'https://petzora.shop',
    },
  },
  {
    id: 'author-marcus',
    name: 'Marcus Hayes, CPDT-KA',
    slug: 'marcus-hayes',
    role: 'Certified Professional Canine Trainer & Behaviorist',
    credentials: 'CPDT-KA, Fear-Free Certified Animal Behaviorist',
    bio: 'Positive reinforcement dog trainer helping families overcome leash reactivity, puppy biting, separation anxiety, and potty challenges through gentle, science-backed communication.',
    avatar: '/images/author-marcus.webp',
    socialLinks: {
      email: 'marcus.training@petzora.shop',
      website: 'https://petzora.shop',
    },
  },
  {
    id: 'author-elena',
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    role: 'Feline Specialist & Senior Pet Lifestyle Writer',
    credentials: 'Animal Welfare & Feline Enrichment Researcher',
    bio: 'Devoted cat mom of three rescues and longtime animal shelter volunteer. She investigates indoor enrichment, multi-cat household dynamics, and safe pet nutrition.',
    avatar: '/images/author-elena.webp',
    socialLinks: {
      email: 'elena.rostova@petzora.shop',
      website: 'https://petzora.shop',
    },
  },
];

export const petCategories: CategoryInfo[] = [
  {
    id: 'dogs',
    name: 'DOGS',
    slug: 'dogs',
    description: 'Everything dog parents need: puppy care routines, loose-leash manners, canine nutrition, and lifelong health.',
    coverImage: '/images/featured-dog.webp',
    iconName: 'Dog',
    subTopics: ['Puppies', 'Training', 'Behavior', 'Nutrition', 'Health', 'Grooming'],
    articleCount: 0,
  },
  {
    id: 'cats',
    name: 'CATS',
    slug: 'cats',
    description: 'Inside the captivating world of felines: kitten milestones, subtle body language, stress relief, and nutrition.',
    coverImage: '/images/featured-cat.webp',
    iconName: 'Cat',
    subTopics: ['Kittens', 'Cat Behavior', 'Indoor Life', 'Cat Nutrition', 'Feline Health', 'Litter Care'],
    articleCount: 0,
  },
  {
    id: 'care',
    name: 'PET CARE',
    slug: 'care',
    description: 'Everyday hygiene, seasonal routines, gentle bathing, nail trims, and home comfort essentials.',
    coverImage: '/images/pet-care.webp',
    iconName: 'Sparkles',
    subTopics: ['Grooming', 'Bathing', 'Dental Care', 'Senior Pet Care', 'Home Setup'],
    articleCount: 0,
  },
  {
    id: 'health',
    name: 'HEALTH',
    slug: 'health',
    description: 'Veterinary-reviewed preventive wellness, symptom checklists, vaccinations, and non-emergency health guidance.',
    coverImage: '/images/pet-health.webp',
    iconName: 'ShieldCheck',
    subTopics: ['Preventive Care', 'Symptoms', 'Senior Wellness', 'Dental Health', 'Vaccinations'],
    articleCount: 0,
  },
  {
    id: 'nutrition',
    name: 'NUTRITION',
    slug: 'nutrition',
    description: 'Evidence-based canine & feline nutrition, portion calculators, human food safety lists, and hydration tips.',
    coverImage: '/images/pet-nutrition.webp',
    iconName: 'Apple',
    subTopics: ['Feeding Schedules', 'Safe Foods', 'Toxic Ingredients', 'Supplements', 'Hydration'],
    articleCount: 0,
  },
  {
    id: 'training',
    name: 'TRAINING',
    slug: 'training',
    description: 'Gentle, Fear-Free positive reinforcement routines that build mutual trust, focus, and joyful obedience.',
    coverImage: '/images/dog-training.webp',
    iconName: 'Award',
    subTopics: ['Puppy Training', 'Loose Leash', 'Crate Training', 'Barking', 'Separation Anxiety'],
    articleCount: 0,
  },
  {
    id: 'behavior',
    name: 'BEHAVIOR',
    slug: 'behavior',
    description: 'Decode why your dog or cat stares, kneads, tilts their head, follows you, or gets midnight zoomies.',
    coverImage: '/images/dog-behavior.webp',
    iconName: 'HelpCircle',
    subTopics: ['Curious Habits', 'Body Language', 'Nighttime Behavior', 'Bonding Signs', 'Anxiety'],
    articleCount: 0,
  },
  {
    id: 'reviews',
    name: 'PRODUCT GUIDES',
    slug: 'reviews',
    description: 'Independent buying roundups for orthopedic beds, smart water fountains, indestructible toys, and carriers.',
    coverImage: '/images/pet-reviews.webp',
    iconName: 'ShoppingBag',
    subTopics: ['Dog Beds', 'Cat Toys', 'Pet Cameras', 'Grooming Tools', 'Leashes', 'Carriers', 'Fountains'],
    articleCount: 0,
  },
  {
    id: 'stories',
    name: 'STORIES',
    slug: 'stories',
    description: 'Heartwarming rescue transformations, adoption journeys, and uplifting pet moments.',
    coverImage: '/images/pet-story.webp',
    iconName: 'Heart',
    subTopics: ['Adoption', 'Rescue Stories', 'Bonding Moments'],
    articleCount: 0,
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

export const allArticles: Article[] = [
  {
    id: 'art-puppy-potty-training-7-day',
    title: 'The Ultimate Puppy Potty Training Guide: 7-Day Routine That Actually Works',
    slug: 'puppy-potty-training-7-day-routine',
    category: 'dogs',
    categorySlug: 'dogs',
    subCategory: 'Puppy Training',
    excerpt:
      'Bringing a new puppy home is joyful, but indoor potty accidents can quickly become overwhelming. Here is the veterinary-approved, 7-day housebreaking routine built on canine biological timing, positive reinforcement, and zero punishment.',
    readingTime: '14 min read',
    status: 'published',
    isFeatured: true,
    isEditorPick: true,
    isPopular: true,
    isTrending: true,
    petType: 'dog',
    createdAt: '2026-09-29T10:00:00Z',
    updatedAt: '2026-09-29T10:00:00Z',
    publishedAt: '2026-09-29T10:00:00Z',
    featuredImage: '/images/hero-dog-cat.webp',
    imageAlt: 'Golden retriever puppy learning outdoor potty routine on grass with gentle owner',
    imageCaption: 'Consistency, structured timing, and immediate high-value praise are the three pillars of successful puppy housebreaking.',
    author: editorialTeam[1], // Marcus Hayes, CPDT-KA
    tags: ['puppy training', 'housebreaking', 'crate training', 'potty routine', 'dog behavior', 'puppy care'],
    seoTitle: 'The Ultimate Puppy Potty Training Guide: 7-Day Routine That Actually Works | Petzora',
    seoDescription:
      'Master puppy potty training in 7 days with this science-backed, positive reinforcement routine. Learn biological timing, trigger signs, crate training, and troubleshooting.',
    canonicalPath: '/dogs/puppy-potty-training-7-day-routine',
    canonicalUrl: 'https://petzora.shop/dogs/puppy-potty-training-7-day-routine',
    ogImage: '/images/hero-dog-cat.webp',
    tableOfContents: [
      { id: 'biology', text: '1. The Canine Biological Clock & Sphincter Science', level: 2 },
      { id: 'gear', text: '2. The Pre-Training Arsenal: 5 Essential Tools', level: 2 },
      { id: 'master-schedule', text: '3. Hour-by-Hour Master Timetable (Daytime & Night)', level: 2 },
      { id: 'day-1', text: '4. Day 1: Spot Imprinting & The First Night Protocol', level: 2 },
      { id: 'day-2', text: '5. Day 2: Mapping Triggers & The 15-Minute Rule', level: 2 },
      { id: 'day-3', text: '6. Day 3: Conditioning the Cue Word & The 3-Second Window', level: 2 },
      { id: 'day-4', text: '7. Day 4: Crate Acclimation & Nap-to-Grass Transitions', level: 2 },
      { id: 'day-5', text: '8. Day 5: Supervised Freedom via the Umbilical Cord Method', level: 2 },
      { id: 'day-6', text: '9. Day 6: Weather Proofing (Rain, Snow & Distractions)', level: 2 },
      { id: 'day-7', text: '10. Day 7: Testing Recall to the Door & Long-Term Maintenance', level: 2 },
      { id: 'apartments', text: '11. Apartment & High-Rise Special Strategies', level: 2 },
      { id: 'fatal-mistakes', text: '12. Five Critical Mistakes That Ruin Training', level: 2 },
      { id: 'medical-red-flags', text: '13. Veterinary Red Flags: When It Is a Medical Issue', level: 2 },
      { id: 'faq', text: '14. Frequently Asked Questions', level: 2 },
    ],
    faqList: [
      {
        question: 'How long can an 8-week-old puppy physically hold their bladder?',
        answer:
          'A general veterinary rule of thumb is their age in months plus one hour while sleeping, but during wakeful activity it is much shorter. An 8-week-old (2 months) puppy can hold urine for roughly 2 to 3 hours maximum during deep sleep, but after energetic play, drinking, or eating, they may need to eliminate within 10 to 15 minutes.',
      },
      {
        question: 'Should I rub my puppy’s nose in their accident if I catch them?',
        answer:
          'Never rub your puppy’s nose in urine or feces. Dogs do not connect physical punishment with past biological functions. Doing this induces acute fear, damages handler trust, and teaches the puppy to hide behind furniture to eliminate in secret.',
      },
      {
        question: 'Are indoor pee pads recommended or should I train directly outside?',
        answer:
          'Unless you live on the 30th floor of a high-rise without rapid outdoor access, trainers strongly advise skipping indoor pee pads. Pee pads teach puppies that soft, absorbent indoor surfaces (such as bathmats, carpets, and blankets) are valid toilet zones, creating chronic confusion later.',
      },
      {
        question: 'What if my puppy sniffs outside for 15 minutes, does nothing, and pees the second we come inside?',
        answer:
          'This is known as the "sensory overload distraction loop." Outdoors is full of thrilling sights and scents. If your puppy does not go within 5 minutes, pick them up, bring them inside, and place them directly in their crate or on a short lap tether for 10 to 15 minutes. Then carry them right back outside. Do not let them wander the house until they have eliminated outside.',
      },
      {
        question: 'How do I stop my puppy from crying in the crate at night?',
        answer:
          'Place the crate right next to your bed during the first week so the puppy smells and hears your breathing. When they whine in the middle of the night, carry them outside calmly on a short leash, give them 3 minutes to potty without talking or playing, and put them straight back into the crate. This teaches them night outings are purely functional, not play parties.',
      },
      {
        question: 'What is the best way to clean up puppy urine from carpets?',
        answer:
          'Use an enzymatic bio-cleaner (such as Nature’s Miracle or Rocco & Roxie). Standard household soaps and ammonia-based cleaners leave behind microscopic uric acid crystals that human noses miss, but canine noses detect as an invitation to re-soil the exact same spot.',
      },
      {
        question: 'When can I finally trust my puppy with full run of the house?',
        answer:
          'Full unsupervised freedom should generally not be granted until a puppy has gone at least 4 to 8 consecutive weeks without a single indoor accident, typically between 5 to 7 months of age. Expand freedom gradually room-by-room using baby gates.',
      },
      {
        question: 'How do I teach my puppy to ring a bell by the door to go outside?',
        answer:
          'Hang a bell at puppy nose level near the door. Every single time you take them out for a scheduled potty break, gently tap their nose or paw to the bell so it chimes, say "outside," and immediately open the door. Within 5 to 7 days, they will associate ringing the bell with the door opening.',
      },
    ],
    content: `
<div class="lead-paragraph text-xl text-stone-700 dark:text-stone-300 font-serif leading-relaxed mb-8">
  Few life experiences rival the pure, unbridled joy of bringing an eight-week-old puppy home. The floppy ears, the velvety paws, the sweet puppy breath—it feels like stepping into a dream. But fast-forward forty-eight hours: you have stepped into three cold puddles of urine in your socks, found a pile of feces hidden behind the sofa, and your expensive living room rug is beginning to smell like a barnyard. 
</div>

<p class="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
  Frustration mounts quickly, and sleep deprivation makes every accident feel like a personal failure. But here is the comforting truth: <strong>potty training is not a battle of wills; it is a predictable exercise in biological timing and compassionate communication.</strong> Dogs are den animals by evolutionary design. They possess an innate, instinctual aversion to soiling their primary sleeping quarters. When housebreaking fails, it is almost never because the puppy is "stubborn" or "dominant"—it is because the human handler has not yet aligned their household rhythm with the puppy’s digestive clock.
</p>

<div class="my-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm">
  <div class="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-bold font-mono text-sm uppercase tracking-wider mb-2">
    <span>💡 The Fundamental Law of Housebreaking</span>
  </div>
  <p class="text-sm sm:text-base text-amber-950 dark:text-amber-100 leading-relaxed mb-0">
    Puppies do not learn where <em>not</em> to go through scolding; they learn where <em>to go</em> through repeated, highly rewarded successes in the exact same location. Every outdoor success builds muscle memory; every indoor accident resets the clock. Your entire goal during this 7-day routine is <strong>environmental management</strong>: preventing indoor opportunities while providing frictionless outdoor triumphs.
  </p>
</div>

<h2 id="biology" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  1. The Canine Biological Clock & Sphincter Science
</h2>
<p>
  To successfully housebreak a puppy in seven days, you must stop thinking like a frustrated homeowner and start thinking like a veterinary physiologist. An eight-week-old puppy is essentially an infant in a fur coat. Their external urethral sphincter—the voluntary muscle ring that clamps the bladder neck shut—is neurologically immature. When a puppy’s bladder fills, the stretch receptors trigger an immediate, involuntary contraction reflex.
</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
    <h3 class="text-base font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase tracking-wide">
      🕒 The Sleep Holding Formula
    </h3>
    <p class="text-sm text-stone-600 dark:text-stone-400 mb-3">
      While resting or sleeping soundly, a puppy's kidneys reduce filtration rate. Veterinary medicine uses this standard formula for maximum resting bladder capacity:
    </p>
    <div class="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-900 dark:text-orange-200 font-mono text-center font-bold text-sm">
      Age in Months + 1 = Maximum Hours (Resting)
    </div>
    <ul class="text-xs text-stone-500 dark:text-stone-400 space-y-1 mt-3 list-disc pl-4">
      <li><strong>2 Months Old:</strong> 2 to 3 hours maximum</li>
      <li><strong>3 Months Old:</strong> 3 to 4 hours maximum</li>
      <li><strong>4 Months Old:</strong> 4 to 5 hours maximum</li>
    </ul>
  </div>

  <div class="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
    <h3 class="text-base font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase tracking-wide">
      ⚡ The Wakeful Activity Rule
    </h3>
    <p class="text-sm text-stone-600 dark:text-stone-400 mb-3">
      The moment a puppy stands up, stretches, runs, or wrestles with a chew toy, blood pressure increases and intestinal peristalsis accelerates. The holding formula drops dramatically:
    </p>
    <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 font-mono text-center font-bold text-sm">
      Active Awake Puppy = Bathroom Trip Every 20–30 Mins
    </div>
    <p class="text-xs text-stone-500 dark:text-stone-400 mt-3">
      During energetic play, an 8-to-12-week puppy may need to eliminate two or three times within a single hour. Expecting an awake puppy to hold their urine for 3 hours is physiologically impossible.
    </p>
  </div>
</div>

<p>
  Furthermore, digestive kinetics follow the <strong>Gastrocolic Reflex</strong>: within 5 to 20 minutes of ingesting food or water, stretch receptors in the puppy's stomach trigger mass peristaltic waves throughout the colon. When new fuel enters the top, old waste must immediately exit the bottom. If you feed your puppy breakfast at 7:00 AM, you should expect a bowel movement between 7:15 AM and 7:30 AM without fail.
</p>

<h2 id="gear" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  2. The Pre-Training Arsenal: 5 Essential Tools
</h2>
<p>
  Embarking on a 7-day housebreaking challenge without the right equipment is setting yourself up for failure. Before Day 1 begins, assemble this dedicated toolkit:
</p>

<div class="space-y-4 my-8">
  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
    <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold font-mono shrink-0 text-base">
      1
    </div>
    <div class="space-y-1.5 flex-1">
      <h3 class="text-base font-bold text-stone-900 dark:text-white">True Enzymatic Bio-Cleaner (Not Ammonia or Bleach)</h3>
      <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        Urine contains insoluble uric acid crystals that bond to carpet fibers and floor seams. Standard household dish soap, vinegar, and bleach wipe away the surface stain, but as soon as humidity rises, the uric acid continues emitting chemical markers. Because canine olfactory receptors are 10,000 times more sensitive than human noses, your dog smells an illuminated neon sign saying: <em>"Bathroom spot right here!"</em> True enzymatic cleaners (e.g., Rocco & Roxie or Nature's Miracle) use living bacterial enzymes that feed on uric acid, neutralizing the scent on a biochemical level.
      </p>
    </div>
  </div>

  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
    <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold font-mono shrink-0 text-base">
      2
    </div>
    <div class="space-y-1.5 flex-1">
      <h3 class="text-base font-bold text-stone-900 dark:text-white">Properly Sized Wire Crate with Adjustable Divider Panel</h3>
      <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        The crate is your greatest ally because of the puppy's natural instinct to keep their bed clean. However, buying a crate meant for a 70-pound adult dog and putting an 8-pound puppy inside destroys this instinct. The puppy will sleep on one side, walk three feet to the other side, eliminate, and return to sleep. Use the divider panel so the puppy has <strong>just enough room to stand up, turn completely around, and stretch out flat</strong>—no more.
      </p>
    </div>
  </div>

  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
    <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold font-mono shrink-0 text-base">
      3
    </div>
    <div class="space-y-1.5 flex-1">
      <h3 class="text-base font-bold text-stone-900 dark:text-white">High-Tier "Jackpot" Training Treats</h3>
      <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        Your puppy’s everyday kibble represents minimum wage. For housebreaking, you must pay in gold bullion. Keep a pouch filled with <strong>freeze-dried beef liver, cooked skinless chicken breast, string cheese, or nitrate-free hot dog slivers</strong> cut down to the size of a green pea. These treats must never be fed indoors; they exist solely as an explosive outdoor reward when urine or feces hits the grass.
      </p>
    </div>
  </div>

  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
    <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold font-mono shrink-0 text-base">
      4
    </div>
    <div class="space-y-1.5 flex-1">
      <h3 class="text-base font-bold text-stone-900 dark:text-white">6-Foot Standard Nylon or Biothane Leash</h3>
      <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        Never use retractable "flexi" leashes or open-yard free roaming during week one. A retractable leash provides constant tension, encouraging pulling, and allows the puppy to wander 15 feet away chasing butterflies or fallen leaves instead of concentrating on bodily relief.
      </p>
    </div>
  </div>

  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
    <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold font-mono shrink-0 text-base">
      5
    </div>
    <div class="space-y-1.5 flex-1">
      <h3 class="text-base font-bold text-stone-900 dark:text-white">A Paper or Phone Elimination Log Sheet</h3>
      <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        You cannot manage what you do not measure. A simple notes app or paper log recording the exact time of: <em>Water In, Food In, Pee Out, Poop Out</em> will reveal your puppy’s personal biological pattern within 48 hours with uncanny precision.
      </p>
    </div>
  </div>
</div>

<h2 id="master-schedule" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  3. Hour-by-Hour Master Timetable (Daytime & Night)
</h2>
<p>
  Puppies thrive on rigorous structure. When a puppy knows exactly when food, outdoor access, and sleep arrive, their nervous system relaxes, reducing stress-induced elimination. Here is the field-tested master timetable for an 8-to-14-week-old puppy:
</p>

<div class="overflow-x-auto my-8 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm">
  <table class="w-full text-left text-xs sm:text-sm">
    <thead class="bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-mono uppercase border-b border-stone-200 dark:border-stone-800">
      <tr>
        <th class="p-3.5 sm:p-4">Time</th>
        <th class="p-3.5 sm:p-4">Scheduled Event</th>
        <th class="p-3.5 sm:p-4">Handler Focus & Strategy</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">06:00 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Morning First Outing</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Do not allow puppy paws to touch the rug. Carry them straight from crate to grass. Stay quiet until pee + poop happens.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">06:45 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Breakfast & Fresh Water</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Serve meal in crate or kitchen. Leave down for exactly 15 minutes, then lift bowl regardless of leftover food.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">07:05 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Post-Breakfast Outing</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Gastrocolic reflex activates within 20 mins of eating. Stand at the designated spot. Jackpot reward on success.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">07:30 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Supervised Interactive Play</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Tug-of-war, gentle fetch, or basic cue training in a non-carpeted room under 100% active supervision.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">08:15 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Quick Transition Outing</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Quick 3-minute bladder empty before settling down for morning nap.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">08:30 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Morning Crate Nap (2 hrs)</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Puppies need 16–18 hours of daily sleep. A safe chew toy (e.g., puppy KONG) can be left inside.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">11:00 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Post-Nap Outing & Water</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Open crate, lift puppy immediately, carry to outdoor spot. Offer small water drink, followed by garden play.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">12:30 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Lunch (if on 3x/day schedule)</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Feed lunch; take puppy out 15 minutes later. Log stool consistency.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">01:30 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Afternoon Nap (2 hrs)</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Dark, quiet environment to encourage deep regenerative sleep.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">04:30 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Post-Nap Outing & Socialization</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Carry outside, reward elimination, then practice leash walking and handling paws/ears.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">06:00 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Evening Dinner</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Final full meal of the day. Take outside promptly at 6:20 PM.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">07:30 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Water Curfew</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm"><strong>Pick up the water bowl for the night.</strong> (Puppy may have an ice cube if hot, but no large bowl drinking).</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">09:30 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Pre-Bed Outing</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Calm, low-energy trip to the designated spot.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">11:00 PM</td>
        <td class="p-3.5 sm:p-4 font-medium">Final Night Outing & Crate Bedtime</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">Completely dark, silent trip. No treats, no talking. Purely business, then into bedside crate.</td>
      </tr>
      <tr class="hover:bg-stone-50 dark:hover:bg-stone-900/40">
        <td class="p-3.5 sm:p-4 font-mono font-bold text-orange-600 whitespace-nowrap">02:30 AM</td>
        <td class="p-3.5 sm:p-4 font-medium">Middle-of-the-Night Potty Trip</td>
        <td class="p-3.5 sm:p-4 text-xs sm:text-sm">(Required for puppies under 12 weeks). Keep lights off, carry to grass, wait 3 minutes, carry straight back to bed.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="day-1" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  4. Day 1: Spot Imprinting & The First Night Protocol
</h2>
<p>
  Day 1 is all about <strong>establishing spatial boundaries and odor footprints</strong>. Do not give your puppy an open tour of the entire home. Every new room is a potential bathroom. Restrict the puppy strictly to one puppy-proofed zone (kitchen with tile or playpen with linoleum).
</p>

<div class="my-6 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
  <h3 class="text-base font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase tracking-wide">
    📍 The "Statue Technique" for Outdoor Trips
  </h3>
  <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
    When you walk outside, proceed directly to <strong>one exact 6x6 foot square of grass or dirt</strong>. Once you arrive at this spot, plant your feet like a statue.
  </p>
  <ul class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 space-y-2 list-disc pl-5">
    <li><strong>Do not walk around the yard:</strong> If you walk, the puppy follows your legs and enters exploration mode. Standing still makes the puppy bored with you and forces them to sniff the ground around them.</li>
    <li><strong>Maintain absolute silence:</strong> Do not repeat "go potty, go potty, go potty" 40 times. Human chatter is distracting. Remain silent while they sniff.</li>
    <li><strong>Keep the leash short (4 feet):</strong> This prevents the puppy from chasing leaves or sniffing fence lines.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-stone-900 dark:text-white mt-8 mb-4">
  The First Night Crate Protocol
</h3>
<p>
  The most common mistake new owners make on Night 1 is putting the puppy in the laundry room or basement. An 8-week-old puppy was sleeping curled against their warm mother and littermates 48 hours ago. Being abandoned in a cold, isolated room induces genuine survival terror; the resulting panic barking has nothing to do with needing to pee.
</p>
<p>
  <strong>Place the crate right next to your bed at mattress height</strong> (on a nightstand or chair). When the puppy whimpers, you can simply reach your fingers through the wire mesh. Feeling your touch and hearing your breathing calms their amygdala immediately.
</p>
<p>
  If the puppy whines at 2:30 AM with an urgent, rhythmic intensity:
</p>
<ol class="list-decimal pl-6 space-y-2 text-sm sm:text-base text-stone-700 dark:text-stone-300">
  <li>Do not turn on bright bedroom lights or speak cheerfully.</li>
  <li>Scoop the puppy up in your arms so their feet never touch the floor.</li>
  <li>Carry them directly to the outdoor potty spot in the dark.</li>
  <li>Set them down; wait quietly for 3 minutes.</li>
  <li>When they eliminate, give a gentle whisper: <em>"Good job,"</em> and carry them straight back into the crate. No games, no play, no treats. Night outings must be boring.</li>
</ol>

<h2 id="day-2" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  5. Day 2: Mapping Triggers & The 15-Minute Rule
</h2>
<p>
  By Day 2, you are maintaining your elimination log. You will begin to notice your puppy's subtle "pre-potty micro-cues." Very few puppies squat out of nowhere without warning. Look closely for these telltale signs:
</p>
<ul class="list-disc pl-6 space-y-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 my-4">
  <li><strong>The Sudden Disconnect:</strong> The puppy is actively playing with a toy and abruptly drops it to walk toward a corner or wall.</li>
  <li><strong>Intense Vacuum Sniffing:</strong> Their nose drops glued to the floor, sniffing with rapid, audible snorts.</li>
  <li><strong>The Tilted Pacing:</strong> Walking sideways or pacing in a tight circle with their tail held slightly horizontal.</li>
  <li><strong>Backing Away:</strong> Backing away from you or seeking privacy under a dining table.</li>
</ul>

<div class="my-6 p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-950 dark:text-orange-100">
  <h4 class="font-bold text-sm uppercase font-mono tracking-wider text-orange-800 dark:text-orange-300 mb-1">
    ⏱️ The 15-Minute Rule for Stubborn Trips
  </h4>
  <p class="text-xs sm:text-sm leading-relaxed mb-0">
    What if you take your puppy outside for 10 minutes, they sniff every dandelion, but produce zero pee or poop? <strong>Do not let them walk back into the living room!</strong> If you do, they will pee on your carpet within 90 seconds. Instead, carry them inside, place them in their crate or on your lap on a short leash for exactly 15 minutes, and then carry them straight back out to the designated spot. Repeat this loop until they go outside.
  </p>
</div>

<h2 id="day-3" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  6. Day 3: Conditioning the Cue Word & The 3-Second Window
</h2>
<p>
  Now that the puppy has successfully eliminated outside 10 to 15 times, it is time to attach a verbal cue—such as <em>"Go Potty," "Do Your Business,"</em> or <em>"Hurry Up."</em>
</p>

<h3 class="text-xl font-bold text-stone-900 dark:text-white mt-6 mb-3">
  The Golden Timing of Classical Conditioning
</h3>
<p>
  Novice trainers make the error of standing outside chanting <em>"Go potty! Go potty!"</em> while the puppy is sniffing. To the puppy, that phrase just means: <em>"My human makes noise while I smell grass."</em>
</p>
<p>
  Instead, use <strong>Capture Conditioning</strong>:
</p>
<ol class="list-decimal pl-6 space-y-2 text-sm sm:text-base text-stone-700 dark:text-stone-300">
  <li>Wait silently until the puppy actually begins squatting and the stream starts.</li>
  <li>The split-second the stream begins, say in a calm, melodic tone: <em>"Go Potty."</em></li>
  <li>Say it once or twice gently while they are going. This pairs the neurological sensation of bladder release with the sound of the words.</li>
</ol>

<h3 class="text-xl font-bold text-stone-900 dark:text-white mt-8 mb-3">
  The 3-Second Dopamine Window
</h3>
<p>
  A dog's brain connects a reward to the behavior that occurred within a <strong>1.5 to 3.0 second window</strong>. If your puppy pees on the grass, you walk inside, open the refrigerator, get a piece of cheese, and hand it to them in the kitchen, you have just rewarded them for <em>walking into the kitchen</em>, not for peeing on the grass!
</p>
<div class="p-5 my-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
  <h4 class="font-bold text-emerald-900 dark:text-emerald-200 text-sm font-mono uppercase tracking-wide mb-1">
    ✅ The 3-Step Outdoor Jackpot Delivery
  </h4>
  <p class="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed mb-0">
    The second the final drop leaves their body: mark with a clear <strong>"YES!"</strong> &rarr; instantly deliver pea-sized treat #1 &rarr; immediately deliver treat #2 &rarr; deliver treat #3 with lavish praise. Delivering three small treats in succession feels like winning three jackpots in a row and cements the behavior three times faster than a single biscuit.
  </p>
</div>

<h2 id="day-4" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  7. Day 4: Crate Acclimation & Nap-to-Grass Transitions
</h2>
<p>
  By Day 4, fatigue sets in. Puppies begin testing boundaries, and handlers get sloppy about supervision. This is where crate mechanics become critical.
</p>
<p>
  The crate must never be used as a punishment cell. Feed meals inside the crate with the door open. Toss high-value treats into the crate throughout the day so the puppy associates the den with unexpected treasure.
</p>
<p>
  <strong>The Critical "Nap-to-Grass" Transition:</strong> When a puppy wakes up from a 90-minute nap, their body temperature rises, heart rate spikes, and their bladder instantly reaches capacity. <strong>Do not open the crate and let the puppy trot toward the door on their own paws.</strong> A puppy walking across a warm carpet while their bladder is full will squat right in the hallway.
</p>
<p class="font-semibold text-stone-900 dark:text-white">
  The Rule: Open the crate &rarr; Scoop the puppy straight into your arms &rarr; Carry them directly to the outdoor spot &rarr; Set paws down only on the grass.
</p>

<h2 id="day-5" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  8. Day 5: Supervised Freedom via the Umbilical Cord Method
</h2>
<p>
  By Day 5, many owners celebrate because they have had 24 hours without an accident. Feeling confident, they let the puppy wander into the dining room while they scroll on their phone. Ten minutes later: a puddle.
</p>
<p>
  <strong>You cannot give an 8-to-12-week puppy free run of the house.</strong> Their attention span is too short, and their geography is too small. If they are five rooms away from the back door, they do not have the cognitive map or physical stamina to hold their bladder, navigate hallways, and ask to go out.
</p>

<div class="my-6 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
  <h3 class="text-base font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase tracking-wide">
    🔗 How to Execute the "Umbilical Cord" System
  </h3>
  <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
    Clip a lightweight 6-foot leash to your puppy’s flat collar or harness. Loop the handle through your belt or hold it while sitting at your laptop, cooking dinner, or watching television. 
  </p>
  <ul class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 space-y-2 list-disc pl-5 mt-3">
    <li>The puppy is always within 6 feet of your body.</li>
    <li>They cannot sneak behind the sofa or wander into the guest bedroom.</li>
    <li>The moment they squat, circle, or become restless, you will feel the leash vibrate and can intervene instantly.</li>
  </ul>
</div>

<h2 id="day-6" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  9. Day 6: Weather Proofing (Rain, Snow & Distractions)
</h2>
<p>
  Inevitably, on Day 6 it will pour rain, blow gusty winds, or freeze. Puppies are close to the ground; wet grass touches their sensitive bellies, and raindrops feel like pelting stones. Many puppies will sit at the doorway shivering, refusing to step one foot onto damp turf, only to run inside and pee on your entryway rug.
</p>

<h3 class="text-xl font-bold text-stone-900 dark:text-white mt-6 mb-3">
  How to Weather-Proof Your Housebreaking
</h3>
<ul class="list-disc pl-6 space-y-3 text-sm sm:text-base text-stone-700 dark:text-stone-300">
  <li><strong>Dress for the storm yourself:</strong> If you are standing in slippers holding an umbrella over yourself while shivering, your puppy senses your urgency. Put on waterproof boots and a raincoat so you are prepared to stand outside patiently for 10 minutes without rushing.</li>
  <li><strong>Create a sheltered canopy:</strong> Hold a wide golf umbrella low over your puppy to create a dry 4-foot bubble of grass where they can sniff without rain hitting their head.</li>
  <li><strong>Keep a dry mulch or covered patio corner:</strong> If you have severe winters or torrential rains, build a small covered patch of pine shavings, pea gravel, or artificial turf under an awning.</li>
  <li><strong>Triple the reward:</strong> Eliminating in adverse weather requires immense canine courage. When they pee in pouring rain, upgrade the treat to pure cooked bacon or warm roast beef!</li>
</ul>

<h2 id="day-7" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  10. Day 7: Testing Recall to the Door & Long-Term Maintenance
</h2>
<p>
  On Day 7, your puppy understands the routine. Now, you begin bridging the gap toward <strong>autonomous signaling</strong>—teaching your puppy how to tell you they need to go out.
</p>

<h3 class="text-xl font-bold text-stone-900 dark:text-white mt-6 mb-3">
  The Potty Bell / Chime Protocol
</h3>
<p>
  Hanging potty bells (or a low-pressure wall button chime) by the exit door gives non-verbal dogs a clear communication mechanism that replaces destructive scratching or silent pacing:
</p>
<ol class="list-decimal pl-6 space-y-2 text-sm sm:text-base text-stone-700 dark:text-stone-300">
  <li>Hang the bells from the doorknob at the exact height of your puppy's nose.</li>
  <li>On every scheduled outing, hold a tiny smear of peanut butter on the bell. When the puppy licks it, the bell chimes.</li>
  <li>Immediately say: <em>"Outside!"</em> and open the door wide.</li>
  <li>Within 5 days, the puppy connects: <em>Bell Chime = Door Opens</em>.</li>
  <li><strong>Crucial warning:</strong> In the beginning, whenever they ring the bell, you MUST take them out on leash for business only. If they ring it just to go chew sticks in the sun, bring them back inside after 2 minutes. The bell is a bathroom key, not an amusement park pass.</li>
</ol>

<h2 id="apartments" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  11. Apartment & High-Rise Special Strategies
</h2>
<p>
  Housebreaking an 8-week puppy from the 14th floor of an apartment complex presents unique hurdles: elevator waits, communal hallways, and parvo risks in shared urban pet relief zones before complete vaccination.
</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-sm text-stone-900 dark:text-white mb-2 font-mono uppercase">
      🌿 Balcony Real-Grass Substrates
    </h4>
    <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
      Instead of plastic pee pads, order a living hydroponic grass delivery service (e.g., DoggieLawn or Fresh Patch) placed on your balcony. This preserves natural grass substrate preference, making the eventual transition to outdoor park grass seamless.
    </p>
  </div>
  <div class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-sm text-stone-900 dark:text-white mb-2 font-mono uppercase">
      🛗 The Elevator Carry Rule
    </h4>
    <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
      Never let an untrained puppy walk through apartment hallways or ride the elevator standing up. The vibration of the elevator frequently triggers urination on the carpet. Carry them in your arms until your feet are firmly on the sidewalk outside.
    </p>
  </div>
</div>

<h2 id="fatal-mistakes" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  12. Five Critical Mistakes That Ruin Training
</h2>
<p>
  Avoid these five widespread human errors that derail housebreaking and damage puppy trust:
</p>

<div class="space-y-4 my-6">
  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1 font-mono uppercase">
      ❌ Mistake 1: Punishing Accidents Discovered Later
    </h4>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      Rubbing a dog's nose in urine or yelling hours after an accident does not teach house manners. It teaches the dog that you are an unstable, dangerous predator who attacks them around bodily fluids. The puppy responds by hiding behind couches to eliminate in secret where you cannot see them.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1 font-mono uppercase">
      ❌ Mistake 2: Abruptly Ending Outdoor Time The Second They Finish
    </h4>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      If peeing always means the end of fun and an immediate trip back into a crate, clever puppies learn to hold their urine as long as possible just to stay outside. <strong>Always give 3 to 5 minutes of joyful sniffing, ball tossing, or strolling after they eliminate.</strong>
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1 font-mono uppercase">
      ❌ Mistake 3: Free-Feeding Kibble All Day
    </h4>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      Leaving a bowl of kibble out 24/7 creates randomized digestion. When food goes in at random intervals, stool comes out at random intervals. Feed on strict, scheduled meal times so you can predict bowel movements to the exact minute.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1 font-mono uppercase">
      ❌ Mistake 4: Interrupting an Accident with Shrieking Panic
    </h4>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      If you catch your puppy mid-squat inside, do not scream <em>"NOOOOO!"</em> Screaming causes them to clamp their bladder in terror and scatter urine across the floor. Instead, give a calm, neutral clap: <em>"Oops, outside!"</em>, scoop them up swiftly, and carry them to the grass to finish.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1 font-mono uppercase">
      ❌ Mistake 5: Over-Reliance on Synthetic Pee Pads
    </h4>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      Scented chemical pee pads feel remarkably similar to rugs, bathmats, and pile carpets under canine paw pads. Raising a dog on pee pads frequently causes chronic lifelong carpet confusion.
    </p>
  </div>
</div>

<h2 id="medical-red-flags" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  13. Veterinary Red Flags: When It Is a Medical Issue
</h2>
<p>
  Sometimes, despite flawless management and timer precision, a puppy cannot hold their urine. Before assuming behavioral stubbornness, consider clinical pathology:
</p>

<div class="my-6 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
  <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold font-mono text-sm uppercase">
    <span>🩺 Clinical Symptoms Warranting Immediate Urinalysis</span>
  </div>
  <ul class="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2 list-disc pl-5">
    <li><strong>Extreme Frequency:</strong> Urinating 8 to 10 times in an hour with only tiny dribbles or drops produced.</li>
    <li><strong>Vocal Distress:</strong> Whimpering, crying, or hunching painfully while trying to urinate.</li>
    <li><strong>Excessive Genital Licking:</strong> Obsessively licking the vulva or prepuce after attempting to pee.</li>
    <li><strong>Discolored Urine:</strong> Cloudiness, strong foul odor, or visible pinkish/reddish blood tinge.</li>
    <li><strong>Incontinence While Sleeping:</strong> Waking up soaked in urine without having woken up to ask out (a classic sign of ectopic ureters or juvenile sphincter mechanism incompetence).</li>
  </ul>
  <p class="text-xs text-stone-500 dark:text-stone-400 mb-0 italic">
    *Urinary tract infections (UTIs), Giardia, and coccidiosis are extraordinarily common in shelter and breeder puppies. A quick veterinary urinalysis and fecal float test can save weeks of needless training heartbreak.
  </p>
</div>

<h2 id="faq" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  14. Final Words from the Behaviorist
</h2>
<p>
  Take a deep breath. Housebreaking is a marathon run in small, seven-day sprint increments. There will be good days where you feel like a master dog trainer, followed by days where you step into an accident and feel like crying.
</p>
<p>
  When accidents happen, take a paper towel, spray your enzymatic cleaner, wipe the floor without saying a word, and remind yourself: <strong>your puppy is not giving you a hard time; your puppy is having a hard time.</strong> Stick to the schedule, guard the doors, reward like a slot machine, and by day seven, you will look down at a happy, confident dog who happily bounds to the back door, looks you in the eye, and asks to go out.
</p>
`,
  },
];
export const petzoraPicks: ProductReview[] = [];


