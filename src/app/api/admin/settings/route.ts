import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isUserAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = getStore();
    return NextResponse.json({ success: true, config: store.config });
  } catch (err) {
    console.error("Settings GET error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const store = getStore();

    if (body.paymentUrl !== undefined) store.config.paymentUrl = String(body.paymentUrl).trim();
    if (body.vaultKey !== undefined) store.config.vaultKey = String(body.vaultKey).trim();
    if (body.productPrice !== undefined) store.config.productPrice = Number(body.productPrice) || 199;
    if (body.webhookUrl !== undefined) store.config.webhookUrl = String(body.webhookUrl).trim();
    if (body.telegramBotToken !== undefined) store.config.telegramBotToken = String(body.telegramBotToken).trim();
    if (body.telegramChatId !== undefined) store.config.telegramChatId = String(body.telegramChatId).trim();

    return NextResponse.json({ success: true, config: store.config });
  } catch (err) {
    console.error("Settings POST error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
