import { NextRequest, NextResponse } from "next/server";
import { addPendingQuestion } from "@/lib/kv";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = body.question?.trim();
    if (!question || question.length < 3) {
      return NextResponse.json(
        { error: "Otázka je příliš krátká." },
        { status: 400 }
      );
    }
    const entry = await addPendingQuestion(question);
    return NextResponse.json({ success: true, id: entry.id });
  } catch {
    return NextResponse.json(
      { error: "Nepodařilo se uložit otázku." },
      { status: 500 }
    );
  }
}
