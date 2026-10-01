import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function petzoraTrustCopyPlugin(): Plugin {
  const replacements: Array<[string, string]> = [
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

  return {
    name: 'petzora-trust-copy-cleanup',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/')) return null;
      let output = code;

      // Keep the public homepage out of the large CMS/article fallback bundle.
      // The lightweight modules expose the same names used by HomePage.tsx,
      // so the page source and UI stay unchanged while the initial JS shrinks.
      if (id.includes('/src/pages/HomePage.tsx')) {
        output = output
          .replace(
            "import { petCategories, foodGuideItems, editorialTeam } from '../data/mockData';",
            "import { petCategories, foodGuideItems, editorialTeam } from '../data/homeStaticData';",
          )
          .replace(
            "import { getPublishedArticles } from '../lib/supabase';",
            "import { getPublishedArticles } from '../lib/homeFeed';",
          )
          // Keep the preloaded local hero image as the LCP image. Previously the
          // image switched to the remote featured article after the feed loaded,
          // forcing a second high-priority image request and delaying LCP.
          .replace(
            "src={heroArticle?.featuredImage || '/images/hero-dog-cat.webp'}",
            'src="/images/hero-dog-cat.webp"',
          )
          // Give the critical hero image stable intrinsic dimensions.
          .replace(
            'priority={true}\n                  fallbackSrc="/images/pet-fallback.webp"',
            'priority={true}\n                  width={1200}\n                  height={800}\n                  fallbackSrc="/images/pet-fallback.webp"',
          )
          // Let the first paint and LCP image start before the homepage feed uses
          // network/main-thread time. A short delay is enough to remove contention
          // without making the dynamic sections feel slow to real users.
          .replace(
            "    load();\n    return () => {\n      mounted = false;\n    };",
            "    const feedTimer = window.setTimeout(() => { void load(); }, 350);\n    return () => {\n      mounted = false;\n      window.clearTimeout(feedTimer);\n    };",
          );
      }

      for (const [from, to] of replacements) output = output.split(from).join(to);
      return output === code ? null : { code: output, map: null };
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [petzoraTrustCopyPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
