import { NextRequest, NextResponse } from "next/server";
import { getStore, generateId, forwardToCloudWebhook, ButtonClick } from "@/lib/store";
import { getNowIst } from "@/lib/date-utils";

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

    const { sessionId, buttonId, buttonText, sectionName, pagePath } = body;
    const store = getStore();
    const { dateIst, isoString } = getNowIst();

    const click: ButtonClick = {
      id: generateId(),
      sessionId: sessionId || "anon",
      buttonId: (buttonId || "unknown_btn").slice(0, 100),
      buttonText: (buttonText || "Button").slice(0, 150),
      sectionName: (sectionName || "Page").slice(0, 100),
      pagePath: (pagePath || "/").slice(0, 255),
      clickedAt: isoString,
      dateIst,
    };

    store.clicks.push(click);
    if (store.clicks.length > 15000) store.clicks.shift();

    forwardToCloudWebhook("CLICK", {
      buttonId: click.buttonId,
      buttonText: click.buttonText,
      sectionName: click.sectionName,
      pagePath: click.pagePath,
    });

    return NextResponse.json({ success: true, clickId: click.id });
  } catch (err) {
    console.error("Click tracking error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
