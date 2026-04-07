import { NextRequest, NextResponse } from "next/server";
import { BASE_QA } from "@/lib/qa-database";
import { getApprovedQA } from "@/lib/kv";
import { searchStrict, searchLoose } from "@/lib/search";
import type { QAEntry } from "@/lib/types";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim();
  const category = req.nextUrl.searchParams.get("category")?.trim();

  let approved: QAEntry[] = [];
  try {
    approved = await getApprovedQA();
  } catch {
    /* KV unavailable, use base only */
  }
  const dataset = [...BASE_QA, ...approved];

  if (category) {
    const filtered = dataset.filter((e) => e.category === category);
    return NextResponse.json({ results: filtered, mode: "category" });
  }

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], mode: "empty" });
  }

  const strict = searchStrict(dataset, query);

  if (strict.length > 0 && strict[0].score < 0.4) {
    return NextResponse.json({
      results: strict.map((r) => r.entry),
      mode: "match",
    });
  }

  const loose = searchLoose(dataset, query);
  if (loose.length > 0) {
    return NextResponse.json({
      results: loose.map((r) => r.entry),
      mode: "suggestions",
    });
  }

  return NextResponse.json({ results: [], mode: "no_match" });
}
