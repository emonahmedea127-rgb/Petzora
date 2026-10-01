import { Article } from '../../types';
import { editorialTeam } from '../authors';

export const emergencyFirstAidArticle: Article = {
  id: 'art-canine-first-aid-emergency-triage',
  title: 'The Essential Canine First Aid & Emergency Triage Handbook: Life-Saving Actions Every Dog Parent Must Know',
  slug: 'canine-first-aid-emergency-triage-handbook',
  category: 'health',
  categorySlug: 'health',
  subCategory: 'Emergency Care',
  excerpt:
    'When a medical crisis strikes your dog, the first 10 minutes determine survival. Master veterinary triage vitals, at-home CPR protocols, choking relief (the canine Heimlich maneuver), bleeding control, and heatstroke resuscitation.',
  readingTime: '15 min read',
  status: 'published',
  isFeatured: true,
  isEditorPick: true,
  isPopular: true,
  isTrending: true,
  petType: 'dog',
  createdAt: '2026-09-29T16:00:00Z',
  updatedAt: '2026-09-29T16:00:00Z',
  publishedAt: '2026-09-29T16:00:00Z',
  featuredImage: '/images/canine-emergency-vet-triage.jpg',
  imageAlt: 'Veterinarian team demonstrating emergency canine vital sign examination on dog in clinical setting',
  imageCaption: 'Immediate recognition of abnormal canine vitals—gum color, pulse rate, and respiratory effort—enables life-saving pre-hospital triage.',
  author: editorialTeam[0], // Dr. Clara Vance, DVM
  tags: ['dog first aid', 'canine CPR', 'emergency vet', 'dog choking', 'dog vitals', 'heatstroke relief'],
  seoTitle: 'Canine First Aid & Emergency Triage Handbook | Petzora Vet Guide',
  seoDescription:
    'Life-saving emergency canine first aid handbook by Dr. Clara Vance, DVM. Step-by-step dog CPR, choking clearance, trauma wound pressure, and heatstroke protocols.',
  canonicalPath: '/health/canine-first-aid-emergency-triage-handbook',
  canonicalUrl: 'https://petzora.shop/health/canine-first-aid-emergency-triage-handbook',
  ogImage: '/images/canine-emergency-vet-triage.jpg',
  tableOfContents: [
    { id: 'golden-ten-minutes', text: '1. The Golden 10 Minutes: Pre-Hospital Veterinary Triage', level: 2 },
    { id: 'vital-signs-baseline', text: '2. Normal Canine Vital Signs Baseline (Pulse, Respiration, Temp)', level: 2 },
    { id: 'choking-heimlich', text: '3. Choking & Airway Obstruction: The Canine Heimlich Maneuver', level: 2 },
    { id: 'canine-cpr-protocol', text: '4. Step-by-Step Canine Cardiopulmonary Resuscitation (CPR)', level: 2 },
    { id: 'hemorrhage-control', text: '5. Severe Hemorrhage & Deep Lacerations: Direct Pressure & Bandaging', level: 2 },
    { id: 'heatstroke-cooling', text: '6. Heatstroke Emergency: Safe Evaporative Cooling Without Shock', level: 2 },
    { id: 'first-aid-kit-checklist', text: '7. The Essential Home & Travel Pet First Aid Kit Checklist', level: 2 },
    { id: 'faq', text: '8. Frequently Asked Questions', level: 2 },
  ],
  faqList: [
    {
      question: 'What is the normal resting heart rate for dogs?',
      answer:
        'Small dogs and puppies naturally have faster heart rates, typically between 100 to 140 beats per minute (BPM). Medium dogs average 80 to 120 BPM, while large and giant breeds rest comfortably between 60 to 100 BPM. To check, place your palm on the lower chest wall directly behind your dog’s left elbow.',
    },
    {
      question: 'Can I give human ibuprofen, aspirin, or Tylenol to my dog in an emergency?',
      answer:
        'Never administer human over-the-counter painkillers to dogs. Ibuprofen (Advil, Motrin) and naproxen cause acute stomach ulceration, severe gastrointestinal perforation, and fatal renal failure within hours. Acetaminophen (Tylenol) causes lethal liver toxicity and destroys red blood cells (methemoglobinemia).',
    },
    {
      question: 'How do I know if my dog is in genuine hypovolemic shock?',
      answer:
        'The primary indicators of shock are pale porcelain-white or grey gums, a weak thready pulse, cold paws and ear tips, delayed capillary refill time (greater than 2.5 seconds), rapid shallow breathing, and sudden collapse. Wrap your dog in a warm fleece blanket and transport them immediately to an emergency hospital.',
    },
    {
      question: 'What is the correct way to cool a dog experiencing severe heatstroke?',
      answer:
        'Never submerge a hyperthermic dog in ice-cold water, as extreme cold causes peripheral vasoconstriction, trapping lethal heat inside core organs. Instead, use room-temperature or cool tap water, apply damp towels to the groin, armpits, and paw pads, and point an electric fan directly at them while en route to the clinic.',
    },
  ],
  content: `
<div class="lead-paragraph text-xl text-stone-700 dark:text-stone-300 font-serif leading-relaxed mb-8">
  In a veterinary critical care unit, we operate under a solemn truth: <strong>the outcome of a catastrophic pet emergency is frequently determined before the patient ever crosses our hospital threshold.</strong> Whether your dog encounters an arterial laceration on a wilderness trail, chokes on a foreign ball in the backyard, or collapses from acute hyperthermia, the actions you take in the first ten minutes can be the single difference between irreversible organ demise and full recovery.
</div>

<p class="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
  When faced with sudden trauma or physical distress, human adrenaline surges into panic. Hands shake, voices tremble, and precious minutes evaporate. The antidote to panic is clinical muscle memory. By mastering foundational triage assessment, hands-on canine CPR mechanics, choking clearance, and shock stabilization, you transition from a helpless bystander into your pet’s primary life-support provider.
</p>

<div class="my-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm">
  <div class="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-bold font-mono text-sm uppercase tracking-wider mb-2">
    <span>⚠️ Rule Zero: Human Safety Precedes Pet Care</span>
  </div>
  <p class="text-sm sm:text-base text-amber-950 dark:text-amber-100 leading-relaxed mb-0">
    A critically injured or suffocating dog experiences intense sympathetic fight-or-flight panic. Even the gentlest, sweetest family companion may reflexively bite down with immense jaw pressure when in severe pain. Always approach cautiously, speak in low calm tones, and fashion a temporary soft muzzle from gauze or a leash before manipulating painful fractures (unless your dog is actively vomiting or in respiratory distress).
  </p>
</div>

<h2 id="golden-ten-minutes" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  1. The Golden 10 Minutes: Pre-Hospital Veterinary Triage
</h2>
<p>
  Triage is the clinical sorting of patients based on urgency. In an emergency, do not waste time examining superficial scratches when central oxygenation is compromised. Veterinary emergency doctors evaluate patients using the <strong>A-B-C Protocol</strong>:
</p>

<ul class="space-y-4 my-6 list-none pl-0">
  <li class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <strong class="text-orange-600 dark:text-orange-400 font-mono text-base block mb-1">A – AIRWAY:</strong>
    Ensure the trachea and oral cavity are patent. Look inside the mouth for lodged balls, rawhide sticks, thick saliva, blood clots, or vomit obstructing airflow.
  </li>
  <li class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <strong class="text-orange-600 dark:text-orange-400 font-mono text-base block mb-1">B – BREATHING:</strong>
    Observe chest excursion. Is the dog breathing effortlessly, or are their ribs heaving frantically? Listen for stridor (harsh high-pitched wheezing) or paradoxical abdominal effort.
  </li>
  <li class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <strong class="text-orange-600 dark:text-orange-400 font-mono text-base block mb-1">C – CIRCULATION:</strong>
    Assess mucous membrane color and peripheral pulses. Pink gums indicate adequate capillary perfusion; pale, blue, or muddy purple gums indicate severe cardiac hypoxia or hypovolemic shock.
  </li>
</ul>

<h2 id="vital-signs-baseline" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  2. Normal Canine Vital Signs Baseline
</h2>
<p>
  To recognize when your pet is in mortal jeopardy, you must know what their healthy resting parameters look like. Practice measuring these three vitals while your dog is calm and sleeping:
</p>

<div class="overflow-x-auto my-8">
  <table class="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
    <thead>
      <tr class="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-white font-mono text-xs uppercase">
        <th class="p-4 border-b border-stone-200 dark:border-stone-800">Vital Parameter</th>
        <th class="p-4 border-b border-stone-200 dark:border-stone-800">Normal Range</th>
        <th class="p-4 border-b border-stone-200 dark:border-stone-800">Emergency Red Flag</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
      <tr>
        <td class="p-4 font-semibold">Rectal Temperature</td>
        <td class="p-4">100.2°F – 102.8°F (37.9°C – 39.3°C)</td>
        <td class="p-4 text-red-600 dark:text-red-400 font-semibold">&lt; 99.0°F (Hypothermia) or &gt; 104.0°F (Heatstroke)</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Heart Rate / Pulse</td>
        <td class="p-4">60 – 140 BPM (depends on breed size)</td>
        <td class="p-4 text-red-600 dark:text-red-400 font-semibold">&gt; 160 BPM at rest or weak thready pulse</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Respiratory Rate</td>
        <td class="p-4">15 – 30 breaths per minute at rest</td>
        <td class="p-4 text-red-600 dark:text-red-400 font-semibold">&gt; 50 BPM resting, gasping, or open-mouth breathing</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Capillary Refill Time (CRT)</td>
        <td class="p-4">1.0 – 1.5 seconds</td>
        <td class="p-4 text-red-600 dark:text-red-400 font-semibold">&gt; 2.5 seconds (Shock) or flash-red (Sepsis)</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Gum & Tongue Color</td>
        <td class="p-4">Salmon Pink, moist to the touch</td>
        <td class="p-4 text-red-600 dark:text-red-400 font-semibold">Pale white (blood loss), Cyanotic blue (hypoxia), Jaundiced yellow</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="choking-heimlich" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  3. Choking & Airway Obstruction: The Canine Heimlich Maneuver
</h2>
<p>
  Choking is an acute physical emergency that will cause irreversible hypoxic brain damage within four to six minutes. Common culprits include rubber balls, chew sticks, compressed rawhide, and small stones.
</p>

<h3 class="text-xl font-serif font-bold text-stone-900 dark:text-white mt-6 mb-3">
  Step 1: Check the Pharynx (Oral Sweep)
</h3>
<p>
  Open the jaws wide by pressing the upper lips inward over the canine teeth (this forces their lips between their teeth, making an accidental bite less likely). Pull the tongue forward and shine a smartphone flashlight down the throat. If you can clearly see the object and grab it with needle-nose pliers or fingers, extract it immediately. <strong>Never push down blindly</strong>—you risk lodging the object tighter past the epiglottis into the subglottic trachea.
</p>

<h3 class="text-xl font-serif font-bold text-stone-900 dark:text-white mt-6 mb-3">
  Step 2: The Canine Heimlich Maneuver
</h3>
<ul class="space-y-3 list-disc pl-6 text-stone-700 dark:text-stone-300">
  <li><strong>For Medium to Large Dogs:</strong> Stand behind your dog with their front paws on the floor and lift their hind legs like a wheelbarrow, or stand behind them if they are on their feet. Wrap your arms around their abdomen directly behind the last rib cage. Form a firm fist, cup it with your opposite hand, and apply 3 to 5 rapid, upward-and-forward abdominal thrusts. The pneumatic pressure created in the diaphragm will pop the obstruction out through the larynx.</li>
  <li><strong>For Small Dogs & Puppies:</strong> Place the dog on their side or hold them with their spine against your chest. Locate the soft depression immediately beneath the rib cage. Using the palm of your hand or two fingers, deliver 3 to 5 quick compressions inward toward the throat.</li>
</ul>

<h2 id="canine-cpr-protocol" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  4. Step-by-Step Canine CPR Protocol (RECOVER Guidelines)
</h2>
<p>
  Cardiopulmonary Resuscitation (CPR) in veterinary medicine adheres to the international evidence-based <strong>RECOVER Initiative</strong> guidelines. If your dog collapses unconscious, does not respond to vocal stimulation, and has no detectable femoral pulse, initiate CPR immediately:
</p>

<div class="my-6 p-6 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800">
  <h4 class="text-orange-400 font-mono font-bold uppercase tracking-wider text-sm mb-3">
    The 30:2 CPR Ratio Formula
  </h4>
  <p class="text-sm leading-relaxed mb-4">
    Position the dog in <strong>right lateral recumbency</strong> (lying on their right side, heart side facing upward). Extend the neck into a straight line with the spine to align the trachea.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
    <div class="p-3 rounded-xl bg-stone-950 border border-stone-800">
      <span class="text-orange-300 block font-bold mb-1">Compression Rate:</span>
      100 to 120 compressions per minute (to the rhythm of the Bee Gees song "Stayin'' Alive"). Compress chest depth by 1/3 to 1/2 of total chest width.
    </div>
    <div class="p-3 rounded-xl bg-stone-950 border border-stone-800">
      <span class="text-orange-300 block font-bold mb-1">Rescue Breathing:</span>
      Deliver 2 rescue breaths after every 30 compressions. Close the dog''s muzzle tightly with both hands, place your mouth completely over their nostrils, and blow gently until you see the chest wall rise.
    </div>
  </div>
</div>

<h2 id="hemorrhage-control" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  5. Severe Hemorrhage & Deep Lacerations
</h2>
<p>
  Puncture wounds, dog bites, and broken glass can sever arterial branches. Bright red blood spurting in rhythm with the heartbeat indicates arterial bleeding; dark oozing blood indicates venous damage.
</p>
<ul class="space-y-3 list-decimal pl-6 text-stone-700 dark:text-stone-300">
  <li><strong>Direct Uninterrupted Pressure:</strong> Place sterile gauze pads (or a clean cotton towel) directly over the bleeding site. Press firmly with your palm for a full 5 to 7 continuous minutes without lifting the pad to peek. Lifting disrupts the delicate fibrin mesh clot forming underneath.</li>
  <li><strong>Layering Pads:</strong> If blood soaks through the dressing, never remove the primary gauze. Place additional absorbent pads directly on top of the soaked layer and maintain continuous pressure.</li>
  <li><strong>Pressure Bandage:</strong> Wrap the dressing firmly with an elastic cohesive bandage (Vetrap). Ensure you do not wrap so tightly that you cut off venous return to the paw (check that the paws remain warm and pink).</li>
</ul>

<h2 id="heatstroke-cooling" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  6. Heatstroke Emergency: Safe Evaporative Cooling
</h2>
<p>
  Canine heatstroke (severe hyperthermia above 105.0°F / 40.5°C) leads to systemic inflammatory response syndrome (SIRS), disseminated intravascular coagulation (DIC), and acute cerebral edema. Dogs possess sweat glands only in their paw pads; their sole cooling mechanism is evaporative panting.
</p>
<p>
  <strong>The Fatal Mistake:</strong> Never submerge your dog into an ice bath or pack ice directly onto their skin. Rapid severe cold triggers peripheral vasoconstriction, driving hot blood away from the skin surface and concentrating it into internal vital organs, worsening brain hyperthermia.
</p>
<p>
  <strong>The Veterinary Protocol:</strong> Move your dog into shade or air conditioning. Pour cool (not cold) tap water continuously over their back, neck, and abdomen. Place damp washcloths on the inguinal groin and armpit regions where femoral and axillary vessels run close to the skin. Point a vehicle air conditioner or electric fan directly over them. Stop active cooling the moment rectal temperature reaches 103.5°F to prevent dangerous hypothermic rebound.
</p>

<h2 id="first-aid-kit-checklist" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  7. The Essential Home & Travel Pet First Aid Kit Checklist
</h2>
<p>
  Keep this dedicated waterproof medical kit in your vehicle and home pantry:
</p>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs sm:text-sm">
  <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase">Wound & Bandage Gear</h4>
    <ul class="space-y-1 text-stone-600 dark:text-stone-400 list-disc pl-4">
      <li>Sterile non-stick gauze pads (4x4 inches)</li>
      <li>Cohesive flexible self-adhering tape (Vetrap)</li>
      <li>Chlorhexidine 2% antiseptic wound flush</li>
      <li>Medical blunt-tip bandage scissors</li>
      <li>Medical nitrile gloves (latex-free)</li>
    </ul>
  </div>
  <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-stone-900 dark:text-white mb-2 font-mono uppercase">Diagnostic & Emergency Tools</h4>
    <ul class="space-y-1 text-stone-600 dark:text-stone-400 list-disc pl-4">
      <li>Fast digital rectal thermometer & lubricant gel</li>
      <li>Fleece emergency thermal space blanket</li>
      <li>Tick removal twister tool & fine tweezers</li>
      <li>Sterile saline eye wash solution (isotonic)</li>
      <li>24/7 Pet Poison Helpline phone number: (888) 426-4435</li>
    </ul>
  </div>
</div>

<h2 id="faq" class="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white mt-12 mb-6">
  8. Frequently Asked Questions
</h2>
<div class="space-y-4 my-6">
  <div class="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-stone-900 dark:text-white text-base mb-2">
      How can I induce vomiting if my dog ate rat poison or toxic dark chocolate?
    </h4>
    <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-0">
      Never induce vomiting without explicit authorization from an emergency veterinarian or animal poison control center. If the ingested substance was caustic, acidic, a battery, or a petroleum distillate, bringing it back up will burn the esophagus and risk lethal lung aspiration. When authorized, 3% hydrogen peroxide (1 ml per pound of body weight, max 45 ml) is administered orally.
    </p>
  </div>
  <div class="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
    <h4 class="font-bold text-stone-900 dark:text-white text-base mb-2">
      What should I do if my dog is having a grand mal seizure?
    </h4>
    <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-0">
      Do not try to hold your dog down or grab their tongue—dogs cannot swallow their tongues, and you will get severely bitten by involuntary jaw spasms. Clear away sharp furniture, dim lights, turn off loud music, and place soft blankets around their head. Time the seizure precisely with your phone timer. If the seizure lasts longer than 3 minutes, or if they suffer multiple cluster seizures in a 24-hour window, transport them immediately to an emergency hospital to prevent irreversible brain hyperthermia.
    </p>
  </div>
</div>
`,
};
