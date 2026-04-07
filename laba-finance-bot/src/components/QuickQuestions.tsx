"use client";

const POPULAR = [
  "Přišla tato platba?",
  "Co je reverse charge?",
  "Změna fakturačních údajů",
  "Co je IČ DPH?",
  "Payment type v HubSpot",
  "Faktura se nevygenerovala",
  "Upravit cenu na faktuře",
  "VAT do zahraničí",
];

interface Props {
  onSelect: (question: string) => void;
}

export default function QuickQuestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {POPULAR.map((q, i) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          style={{ animationDelay: `${300 + i * 45}ms` }}
          className="opacity-0 animate-[fadeUp_0.35s_var(--ease-out-quart)_forwards] text-sm font-medium px-4 py-2 rounded-full bg-white text-text-secondary hover:text-accent-text hover:bg-accent border border-border hover:border-accent hover:shadow-[0_2px_12px_oklch(92%_0.19_98/0.3)] transition-all duration-200 cursor-pointer"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
