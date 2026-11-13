import { NextRequest, NextResponse } from "next/server";
import {
  getStore,
  generateId,
  forwardToCloudWebhook,
  PageVisit,
  ButtonClick,
  DiagnosisLog,
  LeadRecord,
} from "@/lib/store";
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

    const { type } = body;
    const store = getStore();
    const { dateIst, hourIst, isoString } = getNowIst();

    // 1. Page Visit
    if (type === "VISIT") {
      const { sessionId, pagePath, referrer, deviceType, browser } = body;
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

      // Keep up to 10,000 visits in memory
      if (store.visits.length > 10000) store.visits.shift();

      forwardToCloudWebhook("VISIT", {
        sessionId: visit.sessionId,
        pagePath: visit.pagePath,
        deviceType: visit.deviceType,
      });

      return NextResponse.json({ success: true, visitId: visit.id });
    }

    // 2. Duration Heartbeat / Beacon
    if (type === "DURATION") {
      const { visitId, sessionId, pagePath, totalSeconds } = body;
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
    }

    // 3. Button Click
    if (type === "CLICK") {
      const { sessionId, buttonId, buttonText, sectionName, pagePath } = body;
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
    }

    // 4. Interactive Self-Diagnosis Log
    if (type === "DIAGNOSIS") {
      const { sessionId, step1Choice, step2Choice } = body;
      const diagnosis: DiagnosisLog = {
        id: generateId(),
        sessionId: sessionId || "anon",
        step1Choice: (step1Choice || "Not Selected").slice(0, 200),
        step2Choice: (step2Choice || "Not Selected").slice(0, 200),
        createdAt: isoString,
        dateIst,
      };
      store.diagnoses.push(diagnosis);

      forwardToCloudWebhook("DIAGNOSIS", {
        step1Choice: diagnosis.step1Choice,
        step2Choice: diagnosis.step2Choice,
      });

      return NextResponse.json({ success: true, diagnosisId: diagnosis.id });
    }

    // 5. Student Lead Capture
    if (type === "LEAD") {
      const { sessionId, name, whatsapp, targetExam, sourceButton } = body;

      const cleanWhatsapp = (whatsapp || "").replace(/\D/g, "");
      const lead: LeadRecord = {
        id: generateId(),
        sessionId: sessionId || "anon",
        name: (name || "").trim().slice(0, 100),
        whatsapp: cleanWhatsapp.slice(-10),
        targetExam: (targetExam || "JEE").slice(0, 60),
        sourceButton: (sourceButton || "checkout_modal").slice(0, 100),
        createdAt: isoString,
        dateIst,
      };
      store.leads.push(lead);

      // Register checkout click
      store.clicks.push({
        id: generateId(),
        sessionId: lead.sessionId,
        buttonId: "modal_proceed_payment_btn",
        buttonText: "Proceed to Instant UPI Access (₹199)",
        sectionName: "Access Modal",
        pagePath: "/",
        clickedAt: isoString,
        dateIst,
      });

      forwardToCloudWebhook("LEAD", {
        name: lead.name,
        whatsapp: lead.whatsapp,
        targetExam: lead.targetExam,
        sourceButton: lead.sourceButton,
      });

      const paymentUrl = store.config.paymentUrl || "/download-vault?key=mindlock2026";
      return NextResponse.json({
        success: true,
        leadId: lead.id,
        paymentUrl,
      });
    }

    return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
  } catch (err) {
    console.error("Analytics track error:", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
