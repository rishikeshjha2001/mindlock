import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { isUserAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const type = req.nextUrl.searchParams.get("type") || "leads";
    const store = getStore();

    if (type === "leads") {
      const header = ["ID", "Name", "WhatsApp", "Target Exam", "Source Button", "Date (IST)", "Created At"];
      const rows = store.leads.map((l) => [
        `"${l.id}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.whatsapp}"`,
        `"${l.targetExam.replace(/"/g, '""')}"`,
        `"${l.sourceButton}"`,
        `"${l.dateIst}"`,
        `"${l.createdAt}"`,
      ]);

      const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="mindlock_leads_${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    if (type === "clicks") {
      const header = ["ID", "Button ID", "Button Label", "Section", "Page Path", "Session ID", "Date (IST)", "Timestamp"];
      const rows = store.clicks.map((c) => [
        `"${c.id}"`,
        `"${c.buttonId}"`,
        `"${c.buttonText.replace(/"/g, '""')}"`,
        `"${c.sectionName.replace(/"/g, '""')}"`,
        `"${c.pagePath}"`,
        `"${c.sessionId}"`,
        `"${c.dateIst}"`,
        `"${c.clickedAt}"`,
      ]);

      const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="mindlock_clicks_${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
