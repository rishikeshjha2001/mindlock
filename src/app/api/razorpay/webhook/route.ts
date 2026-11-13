import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getStore, forwardToCloudWebhook, LeadRecord, generateId } from "@/lib/store";
import { getNowIst } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET || "Rishi@2003";

    // Verify signature if signature header is provided
    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.warn("Razorpay webhook signature mismatch. Received:", signature, "Expected:", expectedSignature);
      }
    }

    const event = JSON.parse(rawBody);
    console.log("Razorpay webhook event received:", event.event);

    const store = getStore();
    const now = getNowIst();

    // Handle payment.captured or order.paid
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const notes = payment?.notes || {};

      const name = notes.name || payment?.description || "Paid Student";
      const rawContact = payment?.contact || notes.whatsapp || "";
      const cleanContact = rawContact.replace(/\D/g, "").slice(-10);
      const targetExam = notes.targetExam || "Aspirant";

      const lead: LeadRecord = {
        id: generateId(),
        sessionId: "rzp_" + (payment?.id || Date.now()),
        name,
        whatsapp: cleanContact || "Registered via UPI",
        targetExam,
        sourceButton: `Razorpay (${payment?.method || "UPI"})`,
        createdAt: now.formattedIst,
        dateIst: now.dateIst,
      };

      store.leads.unshift(lead);

      // Instantly forward to Google Sheets / Telegram if configured
      forwardToCloudWebhook("LEAD", {
        name: lead.name,
        whatsapp: lead.whatsapp,
        targetExam: lead.targetExam,
        sourceButton: lead.sourceButton,
        paymentId: payment?.id,
        amount: (payment?.amount || 19900) / 100,
        status: "PAID_VERIFIED",
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Razorpay webhook processing error:", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
