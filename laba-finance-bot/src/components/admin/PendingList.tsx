"use client";

import { useState } from "react";
import type { PendingQuestion, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface Props {
  pending: PendingQuestion[];
  onApprove: (
    pendingId: string,
    question: string,
    answer: string,
    category: Category,
    alts: string[]
  ) => void;
  onDismiss: (id: string) => void;
}

export default function PendingList({ pending, onApprove, onDismiss }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState<Category>("fakturace");
  const [alts, setAlts] = useState("");

  if (pending.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-muted text-[15px]">Žádné nové otázky</p>
        <p className="text-text-muted text-[13px] mt-1">Vše je zodpovězeno.</p>
      </div>
    );
  }

  function startEditing(id: string) {
    setEditing(id);
    setAnswer("");
    setCategory("fakturace");
    setAlts("");
  }

  function handleApprove(item: PendingQuestion) {
    onApprove(
      item.id,
      item.question,
      answer,
      category,
      alts.split("\n").map((s) => s.trim()).filter(Boolean)
    );
    setEditing(null);
  }

  return (
    <div className="divide-y divide-border">
      {pending.map((item) => (
        <div key={item.id} className="py-5 first:pt-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[15px] font-medium">{item.question}</p>
              <p className="text-[12px] text-text-muted mt-0.5">
                {new Date(item.submittedAt).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {editing !== item.id && (
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => startEditing(item.id)}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-lg bg-text text-bg hover:opacity-90 transition-all"
                >
                  Odpovědět
                </button>
                <button
                  onClick={() => onDismiss(item.id)}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-lg text-text-muted hover:text-error transition-colors"
                >
                  Smazat
                </button>
              </div>
            )}
          </div>

          {editing === item.id && (
            <div className="space-y-3 pl-0 animate-[fadeUp_0.2s_var(--ease-out-quart)_forwards]">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl bg-bg-surface border border-border text-[14px] focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none resize-y"
                placeholder="Odpověď..."
                autoFocus
              />
              <div className="flex flex-wrap gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="px-3 py-2 rounded-lg bg-bg-surface border border-border text-[13px] focus:border-accent focus:outline-none"
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={alts}
                  onChange={(e) => setAlts(e.target.value)}
                  placeholder="Alternativní formulace (oddělené čárkou)"
                  className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-bg-surface border border-border text-[13px] focus:border-accent focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(item)}
                  disabled={!answer.trim()}
                  className="text-[13px] font-medium px-4 py-2 rounded-lg bg-text text-bg hover:opacity-90 transition-all disabled:opacity-30"
                >
                  Přidat do bota
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="text-[13px] px-4 py-2 rounded-lg text-text-muted hover:text-text transition-colors"
                >
                  Zrušit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
