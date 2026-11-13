import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let body;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { visitId, sessionId, pagePath, totalSeconds } = body;
    const store = getStore();

    if (visitId) {
      const found = store.visits.find((v) => v.id === visitId);
      if (found) {
        found.timeSpentSeconds = Math.max(0, Math.round(totalSeconds || 0));
      }
    } else if (sessionId && pagePath) {
      const matching = store.visits
        .filter((v) => v.sessionId === sessionId && v.pagePath === pagePath)
        .slice(-1)[0];
      if (matching) {
        matching.timeSpentSeconds = Math.max(0, Math.round(totalSeconds || 0));
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Duration update error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
