"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import AdminLogin from "@/components/admin/AdminLogin";
import PendingList from "@/components/admin/PendingList";
import QAManager from "@/components/admin/QAManager";
import type { PendingQuestion, QAEntry, Category } from "@/lib/types";

type Tab = "pending" | "qa";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("pending");
  const [pending, setPending] = useState<PendingQuestion[]>([]);
  const [baseQA, setBaseQA] = useState<QAEntry[]>([]);
  const [approvedQA, setApprovedQA] = useState<QAEntry[]>([]);
  const didLoadRef = useRef(false);

  const loadData = useCallback(async () => {
    try {
      const [pendingRes, qaRes] = await Promise.all([
        fetch("/api/admin/pending"),
        fetch("/api/admin/qa"),
      ]);
      if (pendingRes.ok) {
        const d = await pendingRes.json();
        setPending(d.pending ?? []);
      }
      if (qaRes.ok) {
        const d = await qaRes.json();
        setBaseQA(d.base ?? []);
        setApprovedQA(d.approved ?? []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        setAuthed(d.authenticated);
        if (d.authenticated && !didLoadRef.current) {
          didLoadRef.current = true;
          loadData();
        }
      })
      .catch(() => setAuthed(false));
  }, [loadData]);

  async function handleApprove(
    pendingId: string,
    question: string,
    answer: string,
    category: Category,
    alternativeQuestions: string[]
  ) {
    try {
      await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingId, question, answer, category, alternativeQuestions }),
      });
      await loadData();
    } catch {}
  }

  async function handleDismiss(id: string) {
    try {
      await fetch("/api/admin/pending", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setPending((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  }

  async function handleDeleteQA(id: string) {
    try {
      await fetch("/api/admin/qa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setApprovedQA((prev) => prev.filter((q) => q.id !== id));
    } catch {}
  }

  async function handleUpdateQA(id: string, updates: Partial<QAEntry>) {
    try {
      await fetch("/api/admin/qa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      await loadData();
    } catch {}
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-4 h-4 border-2 border-text border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 bg-bg/80 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[13px] text-text-muted hover:text-text transition-colors duration-200"
            >
              &larr; Bot
            </Link>
            <span className="font-display font-bold text-[15px] tracking-tight">
              Správa
            </span>
          </div>
          <div className="flex bg-bg-surface rounded-lg p-0.5">
            <button
              onClick={() => setTab("pending")}
              className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                tab === "pending" ? "bg-text text-bg" : "text-text-muted hover:text-text"
              }`}
            >
              Nové
              {pending.length > 0 && (
                <span className="ml-1.5 text-[10px] bg-accent text-accent-text rounded-full w-4 h-4 inline-flex items-center justify-center font-bold">
                  {pending.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab("qa")}
              className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                tab === "qa" ? "bg-text text-bg" : "text-text-muted hover:text-text"
              }`}
            >
              Všechny Q&A
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-6">
        {tab === "pending" && (
          <PendingList pending={pending} onApprove={handleApprove} onDismiss={handleDismiss} />
        )}
        {tab === "qa" && (
          <QAManager
            baseQA={baseQA}
            approvedQA={approvedQA}
            onDelete={handleDeleteQA}
            onUpdate={handleUpdateQA}
          />
        )}
      </main>
    </div>
  );
}
