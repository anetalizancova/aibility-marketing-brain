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
          className={`text-[12px] font-medium px-2.5 py-1 rounded-md transition-all duration-200 ${
            activeCategory === cat
              ? "bg-text text-bg"
              : "text-text-muted hover:text-text hover:bg-bg-surface"
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
