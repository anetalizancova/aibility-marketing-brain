"use client";

import { CONTACTS } from "@/lib/types";

export default function SlackBadge({ contactKey }: { contactKey: string }) {
  const person = CONTACTS[contactKey];
  if (!person) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-strong">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M15 10l5 0a2 2 0 0 1 0 4l-5 0" />
        <path d="M15 10l0-5a2 2 0 0 1 4 0" />
        <path d="M9 14l-5 0a2 2 0 0 1 0-4l5 0" />
        <path d="M9 14l0 5a2 2 0 0 1-4 0" />
        <path d="M14 15l0 5a2 2 0 0 0 4 0l0-5" />
        <path d="M14 15l5 0a2 2 0 0 0 0-4" />
        <path d="M10 9l0-5a2 2 0 0 0-4 0l0 5" />
        <path d="M10 9l-5 0a2 2 0 0 0 0 4" />
      </svg>
      {person.name}
      <span className="text-text-muted font-normal">&middot; {person.role}</span>
    </span>
  );
}
