export type Category =
  | "fakturace"
  | "platby"
  | "dph"
  | "refundy"
  | "hubspot"
  | "pojmy";

export const CATEGORY_LABELS: Record<Category, string> = {
  fakturace: "Fakturace",
  platby: "Platby",
  dph: "DPH & VAT",
  refundy: "Refundy",
  hubspot: "HubSpot",
  pojmy: "Pojmy",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  fakturace: "receipt",
  platby: "banknotes",
  dph: "globe",
  refundy: "arrow-uturn-left",
  hubspot: "cog",
  pojmy: "book-open",
};

export interface ContactPerson {
  name: string;
  role: string;
}

export const CONTACTS: Record<string, ContactPerson> = {
  natalie: { name: "Natalie Misova", role: "Finance" },
  michaela: { name: "Michaela Kubalova", role: "Fakturace" },
};

export interface QAEntry {
  id: string;
  question: string;
  alternativeQuestions: string[];
  answer: string;
  category: Category;
  contacts: string[]; // keys into CONTACTS
  source: "base" | "approved";
}

export interface PendingQuestion {
  id: string;
  question: string;
  submittedAt: string;
  suggestedMatches?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  qaMatch?: QAEntry;
  looseSuggestions?: QAEntry[];
  noMatch?: boolean;
  submittedForReview?: boolean;
}
