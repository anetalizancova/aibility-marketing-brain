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
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-strong">
          {CATEGORY_LABELS[entry.category]}
        </span>
      </div>
      <div className="space-y-2 text-[15px] leading-[1.65] text-text max-w-[60ch]">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {entry.contacts.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
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
      <div
        className="animate-[fadeIn_0.15s_ease-out_forwards]"
      >
        <p className="font-display font-semibold text-base text-text">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-[slideInLeft_0.3s_var(--ease-out-quart)_forwards] opacity-0 space-y-3">
      {/* Direct match */}
      {message.qaMatch && (
        <div className="pl-4 border-l-2 border-accent">
          <AnswerContent entry={message.qaMatch} />
        </div>
      )}

      {/* Plain text (welcome etc.) */}
      {!message.qaMatch && !message.looseSuggestions && !message.noMatch && (
        <p className="text-[15px] leading-[1.65] text-text-secondary max-w-[55ch]">
          {message.content}
        </p>
      )}

      {/* Loose suggestions */}
      {message.looseSuggestions && message.looseSuggestions.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-[14px] text-text-muted">
            Přesnou odpověď nemám. Myslel/a jsi třeba:
          </p>
          <div className="flex flex-col gap-1">
            {message.looseSuggestions.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSuggestionClick?.(entry)}
                className="group text-left text-[14px] py-2 px-3 -mx-3 rounded-lg hover:bg-accent-subtle transition-colors duration-150"
              >
                <span className="text-text group-hover:text-accent-text">
                  {entry.question}
                </span>
                <span className="ml-2 text-text-muted text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={onDismissSuggestions}
            className="text-[13px] text-text-muted hover:text-text transition-colors duration-200 mt-1"
          >
            Nic z toho &darr;
          </button>
        </div>
      )}

      {/* No match */}
      {message.noMatch && (
        <div className="space-y-3">
          <p className="text-[15px] leading-[1.65] text-text-secondary max-w-[55ch]">
            Na tohle zatím odpověď nemám. Zkus se obrátit na:
          </p>
          <SlackBadge contactKey="natalie" />
          {!message.submittedForReview ? (
            <button
              onClick={onSubmitForReview}
              className="block text-[13px] text-accent-strong hover:text-text font-medium transition-colors duration-200"
            >
              Odeslat otázku k doplnění &rarr;
            </button>
          ) : (
            <p className="text-[13px] text-success font-medium flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Zaznamenáno
            </p>
          )}
        </div>
      )}
    </div>
  );
}
