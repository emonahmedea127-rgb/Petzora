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
    readingTime: '8 min read',
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
    tags: ['puppy training', 'housebreaking', 'crate training', 'potty routine', 'dog behavior'],
    seoTitle: 'Puppy Potty Training: 7-Day Routine That Actually Works | Petzora',
    seoDescription:
      'Master puppy potty training in 7 days with this science-backed, positive reinforcement routine. Learn biological timing, trigger signs, and crate training.',
    canonicalPath: '/dogs/puppy-potty-training-7-day-routine',
    canonicalUrl: 'https://petzora.shop/dogs/puppy-potty-training-7-day-routine',
    ogImage: '/images/hero-dog-cat.webp',
    tableOfContents: [
      { id: 'biology', text: '1. The Biological Clock: Canine Bladder Science', level: 2 },
      { id: 'gear', text: '2. Essential Potty Gear Checklist', level: 2 },
      { id: 'schedule', text: '3. Hour-by-Hour Daily Routine', level: 2 },
      { id: 'days-1-2', text: '4. Days 1–2: Mapping Triggers & The Spot', level: 2 },
      { id: 'days-3-4', text: '5. Days 3–4: Verbal Cues & The 3-Second Rule', level: 2 },
      { id: 'days-5-7', text: '6. Days 5–7: Gradual Freedom & Testing Recall', level: 2 },
      { id: 'mistakes', text: '7. Three Fatal Mistakes That Delay Training', level: 2 },
      { id: 'faq', text: '8. Frequently Asked Questions', level: 2 },
    ],
    faqList: [
      {
        question: 'How long can an 8-week-old puppy hold their urine?',
        answer:
          'A general veterinary rule of thumb is their age in months plus one hour. An 8-week-old (2 months) puppy can hold it for roughly 2 to 3 hours maximum during wakeful hours, though after energetic play or drinking, they may need to go within 15 minutes.',
      },
      {
        question: 'Should I rub my puppy’s nose in their accident if I catch them?',
        answer:
          'Never rub your puppy’s nose in urine or feces. This creates profound fear, damages your bond, and teaches the puppy to hide when eliminating, making housebreaking dramatically more difficult.',
      },
      {
        question: 'Are pee pads recommended or should I go straight outside?',
        answer:
          'Whenever possible, take the puppy directly outdoors to real grass or gravel. Pee pads train puppies that soft, absorbent textures inside the home are acceptable toilet surfaces, which often leads to rug and bathmat accidents later.',
      },
      {
        question: 'What should I do if my puppy has an accident right after coming inside?',
        answer:
          'If your puppy does not eliminate outside after 5 minutes of quiet waiting, bring them indoors and place them calmly in their crate or on a short tether for 10 to 15 minutes. Then carry them back to the exact potty spot. This prevents indoor accidents caused by outdoor distraction.',
      },
    ],
    content: `
<div class="lead-paragraph text-xl text-stone-700 dark:text-stone-300 font-serif leading-relaxed mb-8">
  Few moments match the sheer joy of carrying a new puppy over your threshold—until ten minutes later, when you step into a warm, yellowish puddle in the middle of your living room rug. Potty training is the very first mutual language you and your dog develop, and when done through compassionate consistency, it can transform your puppy into a reliable housemate in as little as seven days.
</div>

<div class="my-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
  <h4 class="text-sm font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
    💡 The Golden Rule of Housebreaking
  </h4>
  <p class="text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed mb-0">
    Puppies do not soil indoors out of spite, dominance, or stubbornness. Elimination is a biological impulse governed by an underdeveloped sphincter muscle. Your role during this 7-day sprint is not to punish mistakes, but to make the outdoor spot so predictable and rewarding that the puppy genuinely prefers going outside.
  </p>
</div>

<h2 id="biology" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  1. The Biological Clock: Canine Bladder Science
</h2>
<p>
  Before setting your alarm clock, it helps to understand what is occurring inside your puppy’s digestive tract. A puppy under 16 weeks has immature bladder musculature and cannot voluntarily "hold it" when distracted or excited.
</p>
<p>
  Veterinary behaviorists rely on a simple physiological guideline:
</p>
<div class="p-4 my-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-mono text-center text-sm text-stone-800 dark:text-stone-200">
  <strong>Maximum Holding Time (Hours) = Age in Months + 1</strong><br />
  <span class="text-xs text-stone-500">(e.g., 2 Months Old = 2 to 3 Hours Max while resting)</span>
</div>
<p>
  However, during active daytime hours, digestion is accelerated by physical movement. A puppy will almost always need to eliminate during what trainers call the <strong>Big Four Triggers</strong>:
</p>
<ul class="list-disc pl-6 space-y-2">
  <li><strong>Within 60 seconds of waking up</strong> from any nap, long or short.</li>
  <li><strong>10 to 20 minutes after drinking water or eating</strong> a meal (the gastrocolic reflex stimulates the bowel).</li>
  <li><strong>Immediately following vigorous play</strong> or sudden excitement (like visitors arriving).</li>
  <li><strong>Whenever you notice the "Sniff & Circle" dance</strong>—nose down, tail stiff, pacing in tight circles.</li>
</ul>

<h2 id="gear" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  2. Essential Potty Gear Checklist
</h2>
<p>
  Do not begin your 7-day routine without having these four non-negotiable tools within arm’s reach:
</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
  <div class="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
    <h4 class="font-bold text-stone-900 dark:text-white text-sm mb-1">1. Enzymatic Cleaner</h4>
    <p class="text-xs text-stone-600 dark:text-stone-400">
      Regular household bleach or vinegar removes stains but leaves behind microscopic uric acid crystals. Only true enzymatic cleaners (like Nature's Miracle or Rocco & Roxie) destroy the scent marker that invites repeated soiling.
    </p>
  </div>
  <div class="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
    <h4 class="font-bold text-stone-900 dark:text-white text-sm mb-1">2. Sized Crate with Divider</h4>
    <p class="text-xs text-stone-600 dark:text-stone-400">
      A crate should only be large enough for the pup to stand up, turn around, and lie flat. If it is too large, the puppy will sleep on one side and turn the other side into a bathroom.
    </p>
  </div>
  <div class="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
    <h4 class="font-bold text-stone-900 dark:text-white text-sm mb-1">3. High-Value "Jackpot" Treats</h4>
    <p class="text-xs text-stone-600 dark:text-stone-400">
      Dry kibble will not cut it for housebreaking breakthroughs. Use pea-sized bites of freeze-dried beef liver, cooked hot dog, or real cheddar cheese that are reserved <em>exclusively</em> for outdoor potty success.
    </p>
  </div>
  <div class="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
    <h4 class="font-bold text-stone-900 dark:text-white text-sm mb-1">4. 6-Foot Standard Fixed Leash</h4>
    <p class="text-xs text-stone-600 dark:text-stone-400">
      Never use retractable flexi-leads for housebreaking. A fixed 6-foot nylon or biothane leash keeps the puppy focused on the mission rather than exploring the entire perimeter of your yard.
    </p>
  </div>
</div>

<h2 id="schedule" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  3. Hour-by-Hour Daily Routine
</h2>
<p>
  Predictability is the puppy’s greatest comfort. Here is the exact master timetable to follow during week one:
</p>

<div class="overflow-x-auto my-6 border border-stone-200 dark:border-stone-800 rounded-2xl">
  <table class="w-full text-left text-xs sm:text-sm">
    <thead class="bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-mono uppercase border-b border-stone-200 dark:border-stone-800">
      <tr>
        <th class="p-3 sm:p-4">Time</th>
        <th class="p-3 sm:p-4">Action</th>
        <th class="p-3 sm:p-4">Handler Focus</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-stone-200 dark:divide-stone-800">
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">06:30 AM</td>
        <td class="p-3 sm:p-4">First Outing</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Carry pup directly from crate to grass. Zero talking until they pee.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">07:00 AM</td>
        <td class="p-3 sm:p-4">Breakfast & Water</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Leave bowl down for 15 minutes, then remove it. Note exact time.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">07:20 AM</td>
        <td class="p-3 sm:p-4">Post-Meal Outing</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Gastrocolic reflex activates bowel movements. High jackpot treat.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">08:00 AM</td>
        <td class="p-3 sm:p-4">Structured Crate Nap</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Puppies need 16–18 hours of sleep. A calm crate supports bladder control.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">11:30 AM</td>
        <td class="p-3 sm:p-4">Midday Potty & Play</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Potty trip first, followed by 20 minutes of gentle play and training.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">05:30 PM</td>
        <td class="p-3 sm:p-4">Dinner & Outing</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Repeat 20-minute post-meal outdoor session on the designated spot.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">08:00 PM</td>
        <td class="p-3 sm:p-4">Water Bowl Picked Up</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Withhold large gulps 2 hours before bedtime to avoid 3 AM wakeups.</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">10:30 PM</td>
        <td class="p-3 sm:p-4">Final Nighttime Outing</td>
        <td class="p-3 sm:p-4 text-stone-600 dark:text-stone-400">Calm, boring, dark outing. Straight back to the crate with a quiet "goodnight."</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="days-1-2" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  4. Days 1–2: Mapping Triggers & The Designated Spot
</h2>
<p>
  During the first 48 hours, pick <strong>one exact square yard of terrain</strong> outside—preferably grass or soil sheltered from high-traffic road noise.
</p>
<p>
  Keep your leash short (3 to 4 feet). Stand like a tree trunk. Do not pace or wander around; let the puppy sniff in an arc around your feet. If you walk all over the yard, the puppy enters "adventure play mode" and completely forgets their physiological pressure.
</p>
<blockquote class="p-4 my-6 border-l-4 border-orange-500 bg-stone-50 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 italic">
  "The biggest mistake owners make on Day 1 is talking enthusiastically while the puppy is sniffing. Silence creates space for the puppy to concentrate on eliminating."
</blockquote>

<h2 id="days-3-4" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  5. Days 3–4: Verbal Cues & The 3-Second Reward Rule
</h2>
<p>
  By Day 3, your puppy anticipates visiting the spot. Now, introduce your cue word—such as <em>"Go Potty"</em> or <em>"Hurry Up."</em>
</p>
<p>
  <strong>Crucial timing detail:</strong> Do not utter the cue until the puppy has actually begun squatting. Saying it beforehand means nothing to an untrained brain. Once the flow begins, whisper in a neutral tone: <em>"Go potty... good."</em>
</p>
<p>
  The moment they finish the last drop, trigger the <strong>3-Second Reward Window</strong>:
</p>
<ol class="list-decimal pl-6 space-y-2">
  <li>Mark immediately with a soft, bright marker: <em>"YES!"</em></li>
  <li>Feed three separate pea-sized jackpot treats directly into their mouth one by one (this extends the celebration).</li>
  <li>Follow with thirty seconds of enthusiastic chest scratches or a mini-game of tug.</li>
</ol>

<h2 id="days-5-7" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  6. Days 5–7: Gradual Freedom & Testing Recall
</h2>
<p>
  By Day 5, your puppy should have logged multiple consecutive outdoor successes. The natural temptation now is to grant them full roaming privileges across the house. <strong>Resist this urge!</strong> Unsupervised freedom is the number one cause of housebreaking relapses.
</p>
<p>
  Use the <strong>"Umbilical Cord" Method</strong>: attach a lightweight 6-foot leash to your belt loop while you work at your desk or prepare dinner. If the puppy begins sniffing intensely or backing away into a quiet corner, you will feel the leash tension immediately and can guide them straight out the door.
</p>

<h2 id="mistakes" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  7. Three Fatal Mistakes That Delay Training
</h2>
<div class="space-y-4 my-6">
  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1">❌ Mistake 1: Punishing Accidents Discovered After the Fact</h4>
    <p class="text-xs text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      Dogs possess an episodic memory window of approximately 1.5 seconds for associative learning. Yelling at a puppy for a puddle made 10 minutes ago teaches them that <em>your presence</em> is unpredictable and dangerous, not that peeing on the rug was the issue.
    </p>
  </div>
  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1">❌ Mistake 2: Bringing the Puppy Inside Immediately After Peeing</h4>
    <p class="text-xs text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      If elimination always signals the abrupt end of outdoor fun, clever puppies learn to hold their bladder as long as possible to prolong their yard time. Always grant at least 3 to 5 minutes of playful exploration <em>after</em> they eliminate.
    </p>
  </div>
  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm mb-1">❌ Mistake 3: Over-reliance on Scented Pee Pads</h4>
    <p class="text-xs text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      Puppies develop a strong "substrate preference" before 12 weeks of age. Dogs raised strictly on artificial pads often struggle to eliminate on damp grass, gravel, or snow later in life.
    </p>
  </div>
</div>

<div class="p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 my-8 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
  <p class="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1 font-mono">
    🩺 Veterinary Note on Medical Accidents
  </p>
  <p class="mb-0">
    If your puppy is drinking excessive amounts of water, urinating in very small frequent droplets, or crying during elimination, schedule a veterinary visit immediately. Urinary tract infections (UTIs) and ectopic ureters are common clinical culprits that mimic housebreaking failure.
  </p>
</div>
`,
  },
];
export const petzoraPicks: ProductReview[] = [];

