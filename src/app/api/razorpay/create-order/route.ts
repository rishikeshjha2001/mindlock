import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, targetExam } = body;

    const store = getStore();
    const amountInPaise = (store.config.productPrice || 199) * 100;
    const razorpayKeyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

    // If Razorpay API keys are configured, create server-side order
    if (razorpayKeyId && razorpayKeySecret) {
      const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `ml_rcpt_${Date.now()}`,
          notes: {
            name: name || "",
            whatsapp: whatsapp || "",
            targetExam: targetExam || "",
          },
        }),
      });

      if (rzpRes.ok) {
        const orderData = await rzpRes.json();
        return NextResponse.json({
          success: true,
          orderId: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          keyId: razorpayKeyId,
        });
      }
    }

    // Default response with configured payment URL / vault redirect
    return NextResponse.json({
      success: true,
      keyId: razorpayKeyId || null,
      amount: amountInPaise,
      currency: "INR",
      paymentUrl: store.config.paymentUrl || "https://mindlock-virid.vercel.app/download-vault?key=mindlock2026",
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: "Failed to initialize payment gateway" },
      { status: 500 }
    );
  }
}
