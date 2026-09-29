import { Article } from '../../types';
import { editorialTeam } from '../authors';

export const nutritionArticle: Article = {
  id: 'art-toxic-foods-dogs-cats-complete',
  title: 'The Definitive Pet Toxicology Guide: 15 Lethal Human Foods for Dogs & Cats (With Safe Whole-Food Swaps)',
  slug: 'toxic-foods-dogs-cats-complete-list',
  category: 'nutrition',
  categorySlug: 'nutrition',
  subCategory: 'Pet Nutrition',
  excerpt:
    'Sharing table scraps feels like an act of love, but canine and feline liver enzymes metabolize human foods very differently. Learn the clinical dosages, emergency symptoms, and safe whole-food superfood swaps.',
  readingTime: '13 min read',
  status: 'published',
  isFeatured: true,
  isEditorPick: false,
  isPopular: true,
  isTrending: true,
  petType: 'all',
  createdAt: '2026-09-29T12:00:00Z',
  updatedAt: '2026-09-29T12:00:00Z',
  publishedAt: '2026-09-29T12:00:00Z',
  featuredImage: '/images/pet-nutrition.webp',
  imageAlt: 'Table with toxic human food items and safe pet treat alternatives arranged in veterinary clinic',
  imageCaption: 'Human digestive enzymes handle methylxanthines, allium compounds, and persin that companion animals cannot metabolize.',
  author: editorialTeam[0], // Dr. Clara Vance, DVM
  tags: ['pet nutrition', 'toxic foods', 'dog safety', 'cat safety', 'pet emergency', 'nutrition'],
  seoTitle: '15 Toxic Foods for Dogs and Cats: Full Safety Guide | Petzora',
  seoDescription:
    'Comprehensive veterinary toxicology guide on toxic foods for dogs and cats. Clinical emergency symptoms, toxic dosages, and safe treats.',
  canonicalPath: '/nutrition/toxic-foods-dogs-cats-complete-list',
  canonicalUrl: 'https://petzora.shop/nutrition/toxic-foods-dogs-cats-complete-list',
  ogImage: '/images/pet-nutrition.webp',
  tableOfContents: [
    { id: 'biochemistry', text: '1. Why Pet Metabolism Differs: Hepatic Glucuronidation & Enzyme Pathways', level: 2 },
    { id: 'big-five', text: '2. The Big 5 Immediate Lethal Threats (Xylitol, Grapes, Chocolate, Alliums & Bones)', level: 2 },
    { id: 'toxic-dosages', text: '3. Clinical Toxic Dosages: How Much Is Dangerous?', level: 2 },
    { id: 'allium-anemia', text: '4. The Allium Family: Onions, Garlic, Leeks & Hemolytic Anemia', level: 2 },
    { id: 'emergency-protocol', text: '5. Emergency Toxicology Protocol: What to Do in the First 60 Minutes', level: 2 },
    { id: 'superfood-swaps', text: '6. Ten Vet-Approved Human Superfoods You Can Safely Share', level: 2 },
    { id: 'faq', text: '7. Frequently Asked Questions', level: 2 },
  ],
  faqList: [
    {
      question: 'Why are grapes and raisins toxic to dogs when other fruits are safe?',
      answer:
        'Groundbreaking veterinary toxicology research at the ASPCA Animal Poison Control Center identified tartaric acid and potassium bitartrate as the specific nephrotoxins in grapes. Dogs exhibit unique acute renal sensitivity, triggering necrosis of the proximal renal tubules and acute anuric kidney failure.',
    },
    {
      question: 'Is peanut butter completely safe for dogs?',
      answer:
        'Only if it contains 100% roasted peanuts (and salt). Many low-sugar, keto, or "natural" peanut butter brands now replace sugar with xylitol (also labeled as birch bark sweetener, wood sugar, or E967), which is acutely lethal to dogs even in tiny licking doses.',
    },
    {
      question: 'Can I induce vomiting at home if my dog ate chocolate?',
      answer:
        'Never induce vomiting without calling a veterinary emergency line or poison control first. Inducing vomiting with hydrogen peroxide is contraindicated if the pet is lethargic, seizing, ate sharp bones, or swallowed corrosive chemicals, as it can cause fatal esophageal aspiration or severe hemorrhagic gastritis.',
    },
    {
      question: 'What is the poison control phone number for pets?',
      answer:
        'In North America, the ASPCA Animal Poison Control Center (APCC) operates 24/7 at (888) 426-4435, and the Pet Poison Helpline operates at (855) 764-7661. Fees may apply, but their toxicologists provide direct case numbers and treatment regimens directly to your local ER vet.',
    },
  ],
  content: `
<div class="lead-paragraph text-xl text-stone-700 dark:text-stone-300 font-serif leading-relaxed mb-8">
  It is a Sunday morning routine in millions of households: you are preparing breakfast, your dog gazes up with soulful, liquid brown eyes, and you casually toss a scrap of onion-seasoned sausage or a cluster of grapes across the kitchen. It feels like an innocent act of affection. But inside your companion’s gastrointestinal tract, liver, and kidneys, biological enzymes differ profoundly from human physiology. What provides pleasant nourishment for a human can induce acute, catastrophic organ failure in a dog or cat within mere hours.
</div>

<p class="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
  During my years running veterinary emergency shifts, more than a third of weekend toxicity admissions stemmed from well-meaning family members sharing common pantry staples. Understanding the exact biochemical mechanisms behind food toxicities is the single best way to safeguard your companion.
</p>

<div class="my-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm">
  <div class="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-bold font-mono text-sm uppercase tracking-wider mb-2">
    <span>💡 The Toxicology Rule of Thumb</span>
  </div>
  <p class="text-sm sm:text-base text-amber-950 dark:text-amber-100 leading-relaxed mb-0">
    Toxicity is a function of dosage and biological clearance pathways. Never wait for clinical symptoms (such as vomiting, tremors, or collapse) to manifest before calling a veterinarian; once clinical symptoms appear, the toxin has already crossed into systemic circulation.
  </p>
</div>

<h2 id="biochemistry" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  1. Why Pet Metabolism Differs: Hepatic Glucuronidation & Enzyme Pathways
</h2>
<p>
  Why can an adult human consume dark chocolate, onions, and garlic without injury while a small dog or cat risks death? The answer lies inside the liver's cytochrome P450 enzyme family.
</p>
<p>
  Humans are opportunistic omnivores whose evolutionary ancestors consumed a staggering variety of wild flora, roots, and botanicals containing complex plant alkaloids. In response, human livers developed robust metabolic detoxification pathways—specifically <strong>glucuronidation</strong> and rapid xanthine oxidase pathways.
</p>
<p>
  In contrast, cats are strict obligate carnivores whose ancestral diet was almost purely animal tissue; their livers naturally lack several crucial glucuronosyltransferase enzyme pathways (especially UGT1A6). Dogs possess some omnivorous capacity, but their elimination half-life for methylxanthines (the chemical class containing chocolate and caffeine) is roughly <strong>17.5 hours</strong>, compared to just <strong>2 to 3 hours</strong> in humans. When a dog ingests chocolate, the chemical remains actively circulating in their bloodstream at peak concentrations for nearly an entire day, relentlessly overstimulating cardiac beta-receptors.
</p>

<h2 id="big-five" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  2. The Big 5 Immediate Lethal Threats
</h2>

<div class="space-y-4 my-8">
  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h3 class="text-base font-bold text-rose-800 dark:text-rose-300 mb-1 font-mono uppercase">
      1. Xylitol (Birch Bark Extract / Wood Sugar / E967)
    </h3>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      <strong>The Danger:</strong> The absolute #1 most urgent toxin in veterinary medicine. In humans, xylitol does not stimulate pancreatic insulin. In dogs, however, xylitol is absorbed into the bloodstream within 15 minutes, triggering an explosive, catastrophic release of insulin up to 6 times greater than normal. This causes profound, life-threatening <strong>hypoglycemia</strong> (blood sugar dropping below 30 mg/dL) within 30 minutes, leading to ataxia, seizures, and acute hepatic liver necrosis.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h3 class="text-base font-bold text-rose-800 dark:text-rose-300 mb-1 font-mono uppercase">
      2. Grapes, Raisins, Sultanas & Currants
    </h3>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      <strong>The Danger:</strong> Tartaric acid in grapes causes acute proximal tubular necrosis in canine kidneys. There is no known safe dosage; individual idiosyncratic sensitivity varies wildly. A single raisin has caused fatal acute renal failure in a 65-pound Golden Retriever, while another dog ate a handful without apparent symptoms. Signs begin with vomiting within 12 hours, progressing to anuria (total cessation of urine output) within 36 to 48 hours.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h3 class="text-base font-bold text-rose-800 dark:text-rose-300 mb-1 font-mono uppercase">
      3. Baking Cocoa, Dark Chocolate & Espresso Beans
    </h3>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      <strong>The Danger:</strong> Theobromine and caffeine block cellular adenosine receptors and inhibit phosphodiesterase, dramatically increasing intracellular calcium in heart muscle cells. This triggers severe tachycardia, dangerous ventricular premature contractions (arrhythmias), muscle rigidity, and fatal seizures. Baking cocoa is 10 times more potent than milk chocolate!
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h3 class="text-base font-bold text-rose-800 dark:text-rose-300 mb-1 font-mono uppercase">
      4. The Allium Family (Onions, Garlic, Leeks, Chives & Shallots)
    </h3>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      <strong>The Danger:</strong> Allium plants contain n-propyl disulfide and sodium thiosulfate. These organosulfur compounds induce oxidative denaturation of hemoglobin inside red blood cells, forming clumped precipitates called <strong>Heinz bodies</strong>. The spleen identifies these damaged red blood cells and destroys them in mass waves, causing acute hemolytic anemia. Garlic is roughly 5 times more concentrated than onion!
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
    <h3 class="text-base font-bold text-rose-800 dark:text-rose-300 mb-1 font-mono uppercase">
      5. Cooked Poultry, Rib & Chop Bones
    </h3>
    <p class="text-xs sm:text-sm text-rose-900/90 dark:text-rose-200/90 leading-relaxed mb-0">
      <strong>The Danger:</strong> While raw bones are soft and pliable, cooking desiccates the organic collagen matrix, making bones brittle. When chewed, cooked bones splinter into razor-sharp shards that puncture the esophagus, lacerate stomach linings, or become wedged in the intestinal lumen, causing fatal septic peritonitis.
    </p>
  </div>
</div>

<h2 id="toxic-dosages" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  3. Clinical Toxic Dosages: How Much Is Dangerous?
</h2>
<p>
  Veterinary emergency triage utilizes precise dosage thresholds based on body weight:
</p>

<div class="overflow-x-auto my-6 border border-stone-200 dark:border-stone-800 rounded-2xl">
  <table class="w-full text-left text-xs sm:text-sm">
    <thead class="bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-mono uppercase">
      <tr>
        <th class="p-3 sm:p-4">Toxic Food</th>
        <th class="p-3 sm:p-4">Mild Toxic Dosage</th>
        <th class="p-3 sm:p-4">Severe / Lethal Dosage</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">Xylitol</td>
        <td class="p-3 sm:p-4">0.1 grams / kg (Hypoglycemia)</td>
        <td class="p-3 sm:p-4 font-bold text-rose-600">&gt; 0.5 grams / kg (Hepatic Failure)</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">Milk Chocolate</td>
        <td class="p-3 sm:p-4">0.5 to 1.0 oz / pound</td>
        <td class="p-3 sm:p-4 font-bold text-rose-600">&gt; 2.0 oz / pound</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">Dark Chocolate (70%+)</td>
        <td class="p-3 sm:p-4">0.1 oz / pound</td>
        <td class="p-3 sm:p-4 font-bold text-rose-600">&gt; 0.3 oz / pound</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">Garlic / Onion Powder</td>
        <td class="p-3 sm:p-4">0.5% of body weight in onion</td>
        <td class="p-3 sm:p-4 font-bold text-rose-600">Just 1 tsp of powdered garlic for 10-lb dog</td>
      </tr>
      <tr>
        <td class="p-3 sm:p-4 font-mono font-bold text-orange-600">Macadamia Nuts</td>
        <td class="p-3 sm:p-4">1 nut per 2 pounds of weight</td>
        <td class="p-3 sm:p-4 font-bold text-rose-600">&gt; 5 nuts per 10 pounds (Paralysis)</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="emergency-protocol" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  5. Emergency Toxicology Protocol: What to Do in the First 60 Minutes
</h2>
<p>
  If your pet consumes a suspected toxin, follow this immediate 4-step emergency action plan:
</p>
<ol class="list-decimal pl-6 space-y-3 text-sm sm:text-base text-stone-700 dark:text-stone-300 my-4">
  <li><strong>Confiscate the Remaining Item & Preserve Packaging:</strong> Take the candy wrapper, baking chocolate box, or vitamin bottle. The exact ingredient list and net weight are critical for calculating toxic milligrams.</li>
  <li><strong>Estimate Ingestion Time and Animal Weight:</strong> Note exactly when the pet was left unattended and your pet's current body weight.</li>
  <li><strong>Call the Poison Helpline or Emergency Vet Immediately:</strong> Do not search Reddit or social media forums. Call the ASPCA Animal Poison Control Center ((888) 426-4435) or drive directly to your nearest 24/7 veterinary emergency hospital.</li>
  <li><strong>Do NOT Induce Vomiting Without Explicit Veterinary Instruction:</strong> Administering hydrogen peroxide or salt can cause fatal chemical aspiration, salt poisoning, or esophageal burning if the toxin was corrosive or foaming.</li>
</ol>

<h2 id="superfood-swaps" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  6. Ten Vet-Approved Human Superfoods You Can Safely Share
</h2>
<p>
  You do not have to banish all table treats! Here are ten wholesome, nutrient-dense human foods that promote canine and feline health:
</p>
<ul class="list-disc pl-6 space-y-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 my-4">
  <li><strong>100% Pure Canned Pumpkin:</strong> Rich in soluble fiber; soothes both constipation and acute diarrhea.</li>
  <li><strong>Steamed Sweet Potatoes (Skin Removed):</strong> Excellent source of beta-carotene, vitamin B6, and potassium.</li>
  <li><strong>Fresh Blueberries:</strong> Potent cellular antioxidants that support canine brain health and cognitive vitality.</li>
  <li><strong>Raw Baby Carrots:</strong> Crunchy, zero-fat dental treat that gently massages gums and satisfies chewing impulses.</li>
  <li><strong>Cooked Whole Eggs:</strong> The gold standard of bioavailable protein, rich in choline and amino acids.</li>
  <li><strong>Plain Cooked Skinless Chicken Breast:</strong> Hypoallergenic, lean protein reward ideal for sensitive stomachs.</li>
  <li><strong>Steamed Green Beans:</strong> High-fiber, low-calorie filler ideal for weight management in overweight dogs.</li>
  <li><strong>Fresh Apple Slices (Core & Seeds Removed):</strong> High in dietary fiber and vitamin C. (Always discard seeds, which contain cyanogenic glycosides).</li>
  <li><strong>Plain Canned Sardines in Water (No Salt):</strong> Omega-3 EPA/DHA powerhouse that reduces joint inflammation and enhances coat luster.</li>
  <li><strong>Unsalted Simmered Bone Broth:</strong> A savory source of collagen, glucosamine, and gut-healing glycine.</li>
</ul>

<h2 id="faq" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  7. Final Veterinary Advice
</h2>
<p>
  Knowledge is your pet’s greatest armor. Keep your pantry securely latched, educate children and houseguests on forbidden human foods, and always keep emergency poison control numbers posted on your refrigerator. When in doubt, stick to clean, whole-food superfoods that celebrate your companion’s health!
</p>
`,
};
