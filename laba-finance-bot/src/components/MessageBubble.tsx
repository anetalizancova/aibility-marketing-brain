"use client";

import type { ChatMessage, QAEntry } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import SlackBadge from "./SlackBadge";

interface Props {
  message: ChatMessage;
  onSuggestionClick?: (entry: QAEntry) => void;
  onSubmitForReview?: () => void;
  onDismissSuggestions?: () => void;
}

function AnswerContent({ entry }: { entry: QAEntry }) {
  const lines = entry.answer.split("\n").filter(Boolean);

  return (
    <div className="space-y-3">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent-strong bg-accent-subtle px-2.5 py-1 rounded-full">
        {CATEGORY_LABELS[entry.category]}
      </span>
      <div className="space-y-2 text-base leading-[1.7] text-text max-w-[58ch]">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {entry.contacts.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {entry.contacts.map((c) => (
            <SlackBadge key={c} contactKey={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({
  message,
  onSuggestionClick,
  onSubmitForReview,
  onDismissSuggestions,
}: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="animate-[fadeIn_0.15s_ease-out_forwards]">
        <p className="font-display font-bold text-lg text-text tracking-tight">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-[slideInLeft_0.3s_var(--ease-out-quart)_forwards] opacity-0 space-y-3">
      {/* Direct match */}
      {message.qaMatch && (
        <div className="pl-5 border-l-[3px] border-accent">
          <AnswerContent entry={message.qaMatch} />
        </div>
      )}

      {/* Plain text (welcome etc.) */}
      {!message.qaMatch && !message.looseSuggestions && !message.noMatch && (
        <p className="text-base leading-[1.7] text-text-secondary max-w-[52ch]">
          {message.content}
        </p>
      )}

      {/* Loose suggestions */}
      {message.looseSuggestions && message.looseSuggestions.length > 0 && (
        <div className="space-y-3">
          <p className="text-base text-text-muted">
            Přesnou odpověď nemám. Myslel/a jsi třeba:
          </p>
          <div className="flex flex-col gap-1.5">
            {message.looseSuggestions.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSuggestionClick?.(entry)}
                className="group text-left text-sm font-medium py-2.5 px-4 rounded-xl bg-white border border-border hover:border-accent hover:bg-accent-subtle hover:shadow-[0_2px_12px_oklch(92%_0.19_98/0.25)] transition-all duration-200"
              >
                <span className="text-text group-hover:text-accent-text">
                  {entry.question}
                </span>
                <span className="ml-2 text-text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={onDismissSuggestions}
            className="text-sm text-text-muted hover:text-text font-medium transition-colors duration-200"
          >
            Nic z toho
          </button>
        </div>
      )}

      {/* No match */}
      {message.noMatch && (
        <div className="space-y-3">
          <p className="text-base leading-[1.7] text-text-secondary max-w-[52ch]">
            Na tohle zatím odpověď nemám. Zkus se obrátit na:
          </p>
          <SlackBadge contactKey="natalie" />
          {!message.submittedForReview ? (
            <button
              onClick={onSubmitForReview}
              className="block text-sm text-accent-strong hover:text-text font-semibold transition-colors duration-200"
            >
              Odeslat otázku k doplnění &rarr;
            </button>
          ) : (
            <p className="text-sm text-success font-semibold flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Zaznamenáno
            </p>
          )}
        </div>
      )}
    </div>
  );
}
