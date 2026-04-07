"use client";

import Link from "next/link";

interface Props {
  showReset?: boolean;
  onReset?: () => void;
}

export default function Header({ showReset, onReset }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
            <span className="text-accent-text text-sm font-extrabold font-display">L</span>
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            Finance&nbsp;
            <span className="text-accent-strong">Q&A</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {showReset && (
            <button
              onClick={onReset}
              className="text-sm text-text-muted hover:text-text font-medium transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Nový dotaz
            </button>
          )}
          <Link
            href="/admin"
            className="text-sm text-text-muted hover:text-text transition-colors duration-200"
          >
            Správa
          </Link>
        </div>
      </div>
    </header>
  );
}
