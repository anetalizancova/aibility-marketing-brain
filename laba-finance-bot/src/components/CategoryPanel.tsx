"use client";

import { CATEGORY_LABELS, type Category } from "@/lib/types";

interface Props {
  activeCategory: Category | null;
  onSelect: (category: Category | null) => void;
}

export default function CategoryPanel({ activeCategory, onSelect }: Props) {
  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(activeCategory === cat ? null : cat)}
          className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeCategory === cat
              ? "bg-accent text-accent-text shadow-[0_2px_8px_oklch(92%_0.19_98/0.35)]"
              : "text-text-muted hover:text-text hover:bg-bg-surface"
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
