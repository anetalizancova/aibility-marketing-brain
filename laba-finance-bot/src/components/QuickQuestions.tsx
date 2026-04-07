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
    <div className="flex flex-wrap gap-1.5">
      {POPULAR.map((q, i) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          style={{ animationDelay: `${300 + i * 40}ms` }}
          className="opacity-0 animate-[fadeUp_0.35s_var(--ease-out-quart)_forwards] text-[13px] px-3 py-1.5 rounded-full bg-bg-surface text-text-secondary hover:text-text hover:bg-bg-elevated border border-transparent hover:border-border-strong transition-all duration-200 cursor-pointer"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
