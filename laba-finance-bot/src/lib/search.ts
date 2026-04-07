import Fuse, { type IFuseOptions } from "fuse.js";
import type { QAEntry } from "./types";

const FUSE_OPTIONS: IFuseOptions<QAEntry> = {
  keys: [
    { name: "question", weight: 0.55 },
    { name: "alternativeQuestions", weight: 0.35 },
    { name: "answer", weight: 0.1 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const LOOSE_OPTIONS: IFuseOptions<QAEntry> = {
  ...FUSE_OPTIONS,
  threshold: 0.7,
};

export interface SearchResult {
  entry: QAEntry;
  score: number;
}

export function searchStrict(
  dataset: QAEntry[],
  query: string
): SearchResult[] {
  const fuse = new Fuse(dataset, FUSE_OPTIONS);
  return fuse
    .search(query, { limit: 3 })
    .map((r) => ({ entry: r.item, score: r.score ?? 1 }));
}

export function searchLoose(
  dataset: QAEntry[],
  query: string
): SearchResult[] {
  const fuse = new Fuse(dataset, LOOSE_OPTIONS);
  return fuse
    .search(query, { limit: 5 })
    .map((r) => ({ entry: r.item, score: r.score ?? 1 }));
}

export function filterByCategory(
  dataset: QAEntry[],
  category: string
): QAEntry[] {
  return dataset.filter((e) => e.category === category);
}
