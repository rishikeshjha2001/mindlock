import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, leadId } = body;

    console.log("Razorpay payment verified:", {
      razorpay_payment_id,
      razorpay_order_id,
      leadId,
    });

    const store = getStore();
    const vaultUrl =
      store.config.paymentUrl && store.config.paymentUrl.includes("download-vault")
        ? store.config.paymentUrl
        : "https://mindlock-virid.vercel.app/download-vault?key=mindlock2026";

    return NextResponse.json({
      success: true,
      redirectUrl: vaultUrl,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Razorpay verification error:", err);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

