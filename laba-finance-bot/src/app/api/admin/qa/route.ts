import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getApprovedQA,
  updateApprovedQA,
  deleteApprovedQA,
} from "@/lib/kv";
import { BASE_QA } from "@/lib/qa-database";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const approved = await getApprovedQA();
  return NextResponse.json({ base: BASE_QA, approved });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...updates } = await req.json();
  await updateApprovedQA(id, updates);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await deleteApprovedQA(id);
  return NextResponse.json({ success: true });
}
