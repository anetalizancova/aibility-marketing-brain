"use client";

import { useState } from "react";
import type { QAEntry, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface Props {
  baseQA: QAEntry[];
  approvedQA: QAEntry[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<QAEntry>) => void;
}

export default function QAManager({ baseQA, approvedQA, onDelete, onUpdate }: Props) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAnswer, setEditAnswer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const all = [...baseQA, ...approvedQA];
  const filtered = filter === "all" ? all : all.filter((e) => e.category === filter);
  const searched = searchQuery
    ? filtered.filter(
        (e) =>
          e.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  function startEdit(entry: QAEntry) {
    setEditingId(entry.id);
    setEditAnswer(entry.answer);
  }

  function saveEdit(id: string) {
    onUpdate(id, { answer: editAnswer });
    setEditingId(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Hledat..."
          className="flex-1 px-3 py-2 rounded-xl bg-bg-surface border border-border text-[14px] focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Category | "all")}
          className="px-3 py-2 rounded-xl bg-bg-surface border border-border text-[13px] focus:border-accent focus:outline-none"
        >
          <option value="all">Vše ({all.length})</option>
          {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div className="divide-y divide-border">
        {searched.map((entry) => (
          <div key={entry.id} className="py-4 first:pt-0 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-strong">
                    {CATEGORY_LABELS[entry.category]}
                  </span>
                  {entry.source === "approved" && (
                    <span className="text-[10px] font-medium text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded">
                      přidáno
                    </span>
                  )}
                </div>
                <p className="text-[15px] font-medium">{entry.question}</p>
              </div>
              {entry.source === "approved" && editingId !== entry.id && (
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(entry)}
                    className="text-[12px] text-text-muted hover:text-text px-2 py-1 rounded transition-colors"
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-[12px] text-text-muted hover:text-error px-2 py-1 rounded transition-colors"
                  >
                    Smazat
                  </button>
                </div>
              )}
            </div>

            {editingId === entry.id ? (
              <div className="space-y-2 animate-[fadeUp_0.2s_var(--ease-out-quart)_forwards]">
                <textarea
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-bg-surface border border-border text-[14px] focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none resize-y"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(entry.id)}
                    className="text-[12px] font-medium px-3 py-1.5 rounded-lg bg-text text-bg hover:opacity-90 transition-all"
                  >
                    Uložit
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-[12px] px-3 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors"
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-line">
                {entry.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
