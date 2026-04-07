"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage, QAEntry, Category } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import QuickQuestions from "./QuickQuestions";
import CategoryPanel from "./CategoryPanel";
import Header from "./Header";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [categoryResults, setCategoryResults] = useState<QAEntry[] | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 60);
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  function handleReset() {
    setMessages([]);
    setHasInteracted(false);
    setActiveCategory(null);
    setCategoryResults(null);
    setInput("");
    inputRef.current?.focus();
  }

  async function handleSearch(query: string) {
    if (!query.trim() || loading) return;
    setHasInteracted(true);

    const userMsg: ChatMessage = { id: uid(), role: "user", content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      let botMsg: ChatMessage;
      if (data.mode === "match" && data.results.length > 0) {
        botMsg = { id: uid(), role: "bot", content: "", qaMatch: data.results[0] };
      } else if (data.mode === "suggestions" && data.results.length > 0) {
        botMsg = { id: uid(), role: "bot", content: "", looseSuggestions: data.results };
      } else {
        botMsg = { id: uid(), role: "bot", content: "", noMatch: true };
      }
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "bot", content: "Něco se pokazilo. Zkus to znovu." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSuggestionClick(msgId: string, entry: QAEntry) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, looseSuggestions: undefined, qaMatch: entry } : m
      )
    );
  }

  function handleDismissSuggestions(msgId: string) {
    const msgIndex = messages.findIndex((m) => m.id === msgId);
    const userMsg = msgIndex > 0 ? messages[msgIndex - 1] : null;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, looseSuggestions: undefined, noMatch: true } : m
      )
    );

    if (userMsg?.content) {
      fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.content }),
      }).catch(() => {});
    }
  }

  async function submitForReview(msgId: string) {
    const msgIndex = messages.findIndex((m) => m.id === msgId);
    const userMsg = msgIndex > 0 ? messages[msgIndex - 1] : null;
    if (!userMsg) return;

    try {
      await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.content }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, submittedForReview: true } : m))
      );
    } catch {}
  }

  async function handleCategorySelect(cat: Category | null) {
    setActiveCategory(cat);
    if (!cat) {
      setCategoryResults(null);
      return;
    }
    try {
      const res = await fetch(`/api/search?category=${cat}`);
      const data = await res.json();
      setCategoryResults(data.results ?? []);
    } catch {
      setCategoryResults([]);
    }
  }

  function handleCategoryQuestionClick(entry: QAEntry) {
    setHasInteracted(true);
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: entry.question },
      { id: uid(), role: "bot", content: "", qaMatch: entry },
    ]);
    setActiveCategory(null);
    setCategoryResults(null);
    scrollToBottom();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(input);
  }

  return (
    <>
      <Header showReset={hasInteracted} onReset={handleReset} />

      <div className="max-w-3xl mx-auto px-5 flex flex-col h-[calc(100dvh-56px)]">
        {/* Conversation area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Hero / Welcome */}
          {!hasInteracted && (
            <div className="pt-[min(14vh,100px)] pb-10 space-y-8">
              <div className="space-y-3">
                <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-tight">
                  Ahoj, co potřebuješ
                  <br />
                  <span className="relative inline-block">
                    vědět?
                    <span className="absolute -bottom-1.5 left-0 w-full h-3 bg-accent/60 -z-10 rounded-sm" />
                  </span>
                </h2>
                <p className="text-text-secondary text-lg max-w-[42ch] leading-relaxed">
                  Fakturace, platby, DPH, HubSpot &mdash; najdi odpověď nebo napiš otázku.
                </p>
              </div>

              <QuickQuestions onSelect={handleSearch} />
            </div>
          )}

          {/* Messages */}
          {hasInteracted && (
            <div className="py-8 space-y-10">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSuggestionClick={(entry) => handleSuggestionClick(msg.id, entry)}
                  onSubmitForReview={() => submitForReview(msg.id)}
                  onDismissSuggestions={() => handleDismissSuggestions(msg.id)}
                />
              ))}

              {loading && (
                <div className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-[pulse-dot_1.2s_ease-in-out_infinite]" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-[pulse-dot_1.2s_ease-in-out_0.2s_infinite]" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-[pulse-dot_1.2s_ease-in-out_0.4s_infinite]" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pb-6 pt-3 space-y-3">
          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <CategoryPanel activeCategory={activeCategory} onSelect={handleCategorySelect} />
          </div>

          {/* Category results dropdown */}
          {categoryResults && categoryResults.length > 0 && (
            <div className="bg-white rounded-2xl border border-border shadow-lg shadow-black/[0.04] p-1.5 max-h-[35vh] overflow-y-auto">
              {categoryResults.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleCategoryQuestionClick(entry)}
                  className="w-full text-left text-sm font-medium py-3 px-4 rounded-xl hover:bg-accent-subtle transition-colors duration-150 text-text-secondary hover:text-text"
                >
                  {entry.question}
                </button>
              ))}
            </div>
          )}

          {/* Search input */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Zeptej se na cokoliv..."
                className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white border border-border text-base font-medium transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none placeholder:text-text-muted shadow-sm"
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent text-accent-text flex items-center justify-center transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_4px_14px_oklch(92%_0.19_98/0.4)] hover:scale-105 active:scale-95 disabled:opacity-25 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
