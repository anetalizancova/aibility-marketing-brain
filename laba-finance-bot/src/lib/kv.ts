import { Redis } from "@upstash/redis";
import type { QAEntry, PendingQuestion } from "./types";

function getClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const KV_APPROVED_KEY = "qa:approved";
const KV_PENDING_KEY = "qa:pending";

// ── Approved Q&A ──

export async function getApprovedQA(): Promise<QAEntry[]> {
  const kv = getClient();
  if (!kv) return [];
  const data = await kv.get<QAEntry[]>(KV_APPROVED_KEY);
  return data ?? [];
}

export async function addApprovedQA(entry: QAEntry): Promise<void> {
  const kv = getClient();
  if (!kv) return;
  const existing = await getApprovedQA();
  existing.push(entry);
  await kv.set(KV_APPROVED_KEY, existing);
}

export async function updateApprovedQA(
  id: string,
  updates: Partial<QAEntry>
): Promise<void> {
  const kv = getClient();
  if (!kv) return;
  const existing = await getApprovedQA();
  const idx = existing.findIndex((e) => e.id === id);
  if (idx === -1) return;
  existing[idx] = { ...existing[idx], ...updates };
  await kv.set(KV_APPROVED_KEY, existing);
}

export async function deleteApprovedQA(id: string): Promise<void> {
  const kv = getClient();
  if (!kv) return;
  const existing = await getApprovedQA();
  await kv.set(
    KV_APPROVED_KEY,
    existing.filter((e) => e.id !== id)
  );
}

// ── Pending Questions ──

export async function getPendingQuestions(): Promise<PendingQuestion[]> {
  const kv = getClient();
  if (!kv) return [];
  const data = await kv.get<PendingQuestion[]>(KV_PENDING_KEY);
  return data ?? [];
}

export async function addPendingQuestion(
  question: string
): Promise<PendingQuestion> {
  const kv = getClient();
  const entry: PendingQuestion = {
    id: `pending-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    question,
    submittedAt: new Date().toISOString(),
  };
  if (!kv) return entry;
  const existing = await getPendingQuestions();
  existing.push(entry);
  await kv.set(KV_PENDING_KEY, existing);
  return entry;
}

export async function removePendingQuestion(id: string): Promise<void> {
  const kv = getClient();
  if (!kv) return;
  const existing = await getPendingQuestions();
  await kv.set(
    KV_PENDING_KEY,
    existing.filter((e) => e.id !== id)
  );
}
