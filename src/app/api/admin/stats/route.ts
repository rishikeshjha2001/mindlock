import { NextResponse } from "next/server";
import { calculateAnalyticsStats } from "@/lib/store";
import { isUserAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = calculateAnalyticsStats();
    return NextResponse.json({ success: true, ...stats });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
