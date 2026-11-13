import { NextRequest, NextResponse } from "next/server";
import { getStore, generateId, forwardToCloudWebhook, PageVisit } from "@/lib/store";
import { getNowIst } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, pagePath, referrer, deviceType, browser } = body;

    const store = getStore();
    const { dateIst, hourIst, isoString } = getNowIst();

    const visit: PageVisit = {
      id: generateId(),
      sessionId: sessionId || "anon",
      pagePath: (pagePath || "/").slice(0, 255),
      referrer: referrer || null,
      deviceType: deviceType || "Desktop",
      browser: browser || "Unknown",
      visitedAt: isoString,
      dateIst,
      hourIst,
      timeSpentSeconds: 0,
    };

    store.visits.push(visit);
    if (store.visits.length > 10000) store.visits.shift();

    forwardToCloudWebhook("VISIT", {
      sessionId: visit.sessionId,
      pagePath: visit.pagePath,
      deviceType: visit.deviceType,
    });

    return NextResponse.json({ success: true, visitId: visit.id });
  } catch (err) {
    console.error("Visit tracking error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
