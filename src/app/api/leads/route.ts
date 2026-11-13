import { NextRequest, NextResponse } from "next/server";
import { getStore, generateId, forwardToCloudWebhook, LeadRecord } from "@/lib/store";
import { getNowIst } from "@/lib/date-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, name, whatsapp, targetExam, sourceButton } = body;

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Name and WhatsApp number are required" },
        { status: 400 }
      );
    }

    const cleanWhatsapp = (whatsapp || "").replace(/\D/g, "");
    if (cleanWhatsapp.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian WhatsApp number" },
        { status: 400 }
      );
    }

    const store = getStore();
    const { dateIst, isoString } = getNowIst();

    const lead: LeadRecord = {
      id: generateId(),
      sessionId: sessionId || "anon",
      name: name.trim().slice(0, 100),
      whatsapp: cleanWhatsapp.slice(-10),
      targetExam: (targetExam || "JEE").slice(0, 60),
      sourceButton: (sourceButton || "checkout_modal").slice(0, 100),
      createdAt: isoString,
      dateIst,
    };

    store.leads.push(lead);

    // Record checkout button click
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
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
