import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addApprovedQA, removePendingQuestion } from "@/lib/kv";
import type { QAEntry, Category } from "@/lib/types";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { pendingId, question, answer, category, alternativeQuestions } = body;

  if (!question || !answer || !category) {
    return NextResponse.json(
      { error: "Vyplň otázku, odpověď a kategorii." },
      { status: 400 }
    );
  }

  const entry: QAEntry = {
    id: `approved-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    question,
    answer,
    category: category as Category,
    alternativeQuestions: alternativeQuestions ?? [],
    contacts: [],
    source: "approved",
  };

  // Extract contacts from answer
  const lower = answer.toLowerCase();
  if (lower.includes("natalie") || lower.includes("natálie"))
    entry.contacts.push("natalie");
  if (lower.includes("michaela")) entry.contacts.push("michaela");

  await addApprovedQA(entry);

  if (pendingId) {
    await removePendingQuestion(pendingId);
  }

  return NextResponse.json({ success: true, entry });
}
