import React, { useState } from 'react';
import { ListCollapse, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  if (!items || items.length === 0) return null;

  const scrollTo = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-4 transition-colors"
    >
      {/* Mobile Toggle */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-300">
          <ListCollapse className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Table of Contents</span>
        </div>
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-expanded={isOpenMobile}
          className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
        >
          {isOpenMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-3 pb-2 border-b border-stone-200 dark:border-stone-800">
        <ListCollapse className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        <span>Table of Contents</span>
      </div>

      {/* Links List */}
      <div className={`mt-2 md:mt-0 ${isOpenMobile ? 'block' : 'hidden md:block'}`}>
        <ul className="space-y-1.5 text-xs">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}
            >
              <button
                onClick={() => scrollTo(item.id)}
                className={`text-left w-full py-1 transition-colors hover:text-orange-600 dark:hover:text-orange-400 leading-snug ${
                  activeId === item.id
                    ? 'text-orange-600 dark:text-orange-400 font-semibold'
                    : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
