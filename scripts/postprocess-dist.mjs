import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const textExtensions = new Set(['.html', '.js', '.css', '.xml', '.txt', '.json']);

const replacements = [
  ['https://petzora.shop', 'https://www.petzora.shop'],
  ['Veterinary-reviewed guides', 'Practical pet care guides'],
  ['veterinary-reviewed guides', 'practical pet care guides'],
  ['Evidence-based veterinary insights', 'Practical pet care insights'],
  ['High-impact veterinary guides', 'Practical pet care guides'],
  ['45,000+ Caring Pet Parents', 'Join the Petzora Community'],
  ['Get weekly veterinary-reviewed care checklists, training breakdowns, safe food alerts, and wholesome adoption stories directly to your inbox.', 'Get practical pet care checklists, training breakdowns, safe food alerts, and wholesome pet stories directly to your inbox.'],
  ['Related Veterinary Guides', 'Related Petzora Guides'],
  ['Veterinary Health Alert', 'Pet Health Alert'],
  ['This article was drafted and reviewed to provide safe, fact-based companion animal advice. Always consult your primary veterinarian for medical emergencies.', 'This article provides general educational information based on reputable references. For medical concerns or emergencies, contact a qualified veterinarian.'],
  ['Dr. Clara Vance, DVM', 'Emon Ahmed'],
  ['dr-clara-vance', 'emon-ahmed'],
  ['Veterinary Advisory & Lead Pet Health Editor', 'Author & Editor'],
  ['DVM, 12+ Years Clinical Practice', ''],
  ['Dedicated small animal veterinarian with over twelve years of clinical emergency practice. Empowering pet parents with compassionate, fact-checked health care advice.', 'Emon Ahmed is the author and editor of Petzora, creating practical pet-care guides, training tips, stories, and research-based educational content for pet owners.'],
  ['clara.vance@petzora.shop', 'contact@petzora.shop'],
  ['/images/author-clara.webp', '/images/emon-ahmed.webp'],
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (textExtensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

async function main() {
  try {
    const files = await walk(distDir);
    let changedFiles = 0;

    for (const file of files) {
      let source = await fs.readFile(file, 'utf8');
      let output = source;

      for (const [from, to] of replacements) {
        output = output.split(from).join(to);
      }

      output = output.replace(
        /"author":\{"@type":"Organization","name":"Emon Ahmed"/g,
        '"author":{"@type":"Person","name":"Emon Ahmed"',
      );

      if (output !== source) {
        await fs.writeFile(file, output, 'utf8');
        changedFiles += 1;
      }
    }

    console.log(`[postprocess-dist] Trust/canonical cleanup applied to ${changedFiles} generated file(s).`);
  } catch (error) {
    console.warn('[postprocess-dist] Skipped cleanup:', error instanceof Error ? error.message : error);
  }
}

await main();
