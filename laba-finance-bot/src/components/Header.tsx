"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-bg/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-text flex items-center justify-center">
            <span className="text-bg text-xs font-bold font-display">L</span>
          </div>
          <span className="font-display font-bold text-[15px] tracking-tight">
            Finance&nbsp;
            <span className="text-accent-strong">Q&A</span>
          </span>
        </div>
        <Link
          href="/admin"
          className="text-[13px] text-text-muted hover:text-text transition-colors duration-200"
        >
          Správa
        </Link>
      </div>
    </header>
  );
}
