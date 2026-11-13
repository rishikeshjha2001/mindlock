import { getNowIst, formatSeconds } from "./date-utils";

export interface PageVisit {
  id: string;
  sessionId: string;
  pagePath: string;
  referrer: string | null;
  deviceType: string;
  browser: string;
  visitedAt: string;
  dateIst: string;
  hourIst: number;
  timeSpentSeconds: number;
}

export interface ButtonClick {
  id: string;
  sessionId: string;
  buttonId: string;
  buttonText: string;
  sectionName: string;
  pagePath: string;
  clickedAt: string;
  dateIst: string;
}

export interface DiagnosisLog {
  id: string;
  sessionId: string;
  step1Choice: string;
  step2Choice: string;
  createdAt: string;
  dateIst: string;
}

export interface LeadRecord {
  id: string;
  sessionId: string;
  name: string;
  whatsapp: string;
  targetExam: string;
  sourceButton: string;
  createdAt: string;
  dateIst: string;
}

export interface SiteConfig {
  paymentUrl: string;
  vaultKey: string;
  productPrice: number;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  webhookUrl: string;
  telegramBotToken: string;
  telegramChatId: string;
}

export interface MindlockStore {
  visits: PageVisit[];
  clicks: ButtonClick[];
  diagnoses: DiagnosisLog[];
  leads: LeadRecord[];
  config: SiteConfig;
}

declare global {
  // eslint-disable-next-line no-var
  var __MINDLOCK_STORE__: MindlockStore | undefined;
}

const defaultStore: MindlockStore = {
  visits: [],
  clicks: [],
  diagnoses: [],
  leads: [],
  config: {
    paymentUrl: "/download-vault?key=mindlock2026",
    vaultKey: "mindlock2026",
    productPrice: 199,
    razorpayKeyId: "rzp_live_Tzg3cRYuMD2Dyi",
    razorpayKeySecret: "BlLMQeZ1H7msPRl7IjJbi56V",
    webhookUrl: "",
    telegramBotToken: "",
    telegramChatId: "",
  },
};

export function getStore(): MindlockStore {
  if (!globalThis.__MINDLOCK_STORE__) {
    globalThis.__MINDLOCK_STORE__ = defaultStore;
  }
  return globalThis.__MINDLOCK_STORE__;
}

// Generate unique ID without external libraries
export function generateId(): string {
  return "ml_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// Optional Zero-DB Cloud Webhook Sync
export async function forwardToCloudWebhook(
  eventType: "LEAD" | "CLICK" | "DIAGNOSIS" | "VISIT",
  payload: Record<string, unknown>
) {
  const store = getStore();
  const webhookUrl = store.config.webhookUrl;
  const botToken = store.config.telegramBotToken;
  const chatId = store.config.telegramChatId;

  // 1. Google Sheets / Custom Webhook forward
  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, timestamp: new Date().toISOString(), payload }),
      }).catch(() => {});
    } catch {}
  }

  // 2. Telegram Bot notification forward
  if (botToken && chatId && (eventType === "LEAD" || eventType === "CLICK")) {
    try {
      const message =
        eventType === "LEAD"
          ? `🚨 *MINDLOCK New Lead Captured!*\n\n👤 *Name:* ${payload.name}\n📱 *WhatsApp:* +91 ${payload.whatsapp}\n🎯 *Target Exam:* ${payload.targetExam}\n🔘 *Source:* ${payload.sourceButton}`
          : `⚡ *MINDLOCK Button Click:* \`${payload.buttonId}\` (${payload.buttonText})`;

      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }).catch(() => {});
    } catch {}
  }
}

// Calculate comprehensive dashboard KPIs and intelligence
export function calculateAnalyticsStats() {
  const store = getStore();
  const { dateIst: todayIst } = getNowIst();

  const totalVisits = store.visits.length;
  const todayVisits = store.visits.filter((v) => v.dateIst === todayIst).length;

  const uniqueSessions = new Set(store.visits.map((v) => v.sessionId));
  const uniqueVisitors = uniqueSessions.size;

  const totalClicks = store.clicks.length;
  const todayClicks = store.clicks.filter((c) => c.dateIst === todayIst).length;

  const totalLeads = store.leads.length;
  const todayLeads = store.leads.filter((l) => l.dateIst === todayIst).length;

  const conversionRate =
    uniqueVisitors > 0 ? ((totalLeads / uniqueVisitors) * 100).toFixed(1) : "0.0";

  const totalDurationSeconds = store.visits.reduce(
    (acc, curr) => acc + (curr.timeSpentSeconds || 0),
    0
  );
  const avgTimeSeconds = totalVisits > 0 ? Math.round(totalDurationSeconds / totalVisits) : 0;
  const avgTimeSpent = formatSeconds(avgTimeSeconds);

  // Daily performance breakdown
  const dailyMap: {
    [date: string]: {
      date: string;
      totalVisits: number;
      sessions: Set<string>;
      totalClicks: number;
      totalTime: number;
      leads: number;
      hours: { [h: number]: number };
    };
  } = {};

  store.visits.forEach((v) => {
    if (!dailyMap[v.dateIst]) {
      dailyMap[v.dateIst] = {
        date: v.dateIst,
        totalVisits: 0,
        sessions: new Set<string>(),
        totalClicks: 0,
        totalTime: 0,
        leads: 0,
        hours: {},
      };
    }
    dailyMap[v.dateIst].totalVisits += 1;
    dailyMap[v.dateIst].sessions.add(v.sessionId);
    dailyMap[v.dateIst].totalTime += v.timeSpentSeconds || 0;
    dailyMap[v.dateIst].hours[v.hourIst] = (dailyMap[v.dateIst].hours[v.hourIst] || 0) + 1;
  });

  store.clicks.forEach((c) => {
    if (!dailyMap[c.dateIst]) {
      dailyMap[c.dateIst] = {
        date: c.dateIst,
        totalVisits: 0,
        sessions: new Set<string>(),
        totalClicks: 0,
        totalTime: 0,
        leads: 0,
        hours: {},
      };
    }
    dailyMap[c.dateIst].totalClicks += 1;
  });

  store.leads.forEach((l) => {
    if (!dailyMap[l.dateIst]) {
      dailyMap[l.dateIst] = {
        date: l.dateIst,
        totalVisits: 0,
        sessions: new Set<string>(),
        totalClicks: 0,
        totalTime: 0,
        leads: 0,
        hours: {},
      };
    }
    dailyMap[l.dateIst].leads += 1;
  });

  const dailyAnalytics = Object.values(dailyMap)
    .map((d) => {
      let peakHour = 0;
      let peakCount = -1;
      for (const [hStr, count] of Object.entries(d.hours)) {
        const h = parseInt(hStr, 10);
        if (count > peakCount) {
          peakCount = count;
          peakHour = h;
        }
      }
      const ampm = peakHour >= 12 ? "PM" : "AM";
      const h12 = peakHour % 12 || 12;
      const peakHourFormatted = peakCount > 0 ? `${h12}:00 ${ampm}` : "N/A";
      const avgSecs = d.totalVisits > 0 ? Math.round(d.totalTime / d.totalVisits) : 0;

      return {
        date: d.date,
        totalVisits: d.totalVisits,
        uniqueVisitors: d.sessions.size,
        totalClicks: d.totalClicks,
        avgTimeSpent: formatSeconds(avgSecs),
        avgTimeSeconds: avgSecs,
        leads: d.leads,
        peakHour: peakHourFormatted,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // Button intelligence breakdown
  const buttonMap: {
    [key: string]: {
      buttonId: string;
      buttonText: string;
      sectionName: string;
      totalClicks: number;
      sessions: Set<string>;
      lastClicked: string;
    };
  } = {};

  store.clicks.forEach((c) => {
    const key = `${c.buttonId}_${c.sectionName}`;
    if (!buttonMap[key]) {
      buttonMap[key] = {
        buttonId: c.buttonId,
        buttonText: c.buttonText,
        sectionName: c.sectionName,
        totalClicks: 0,
        sessions: new Set<string>(),
        lastClicked: c.clickedAt,
      };
    }
    buttonMap[key].totalClicks += 1;
    buttonMap[key].sessions.add(c.sessionId);
    if (new Date(c.clickedAt) > new Date(buttonMap[key].lastClicked)) {
      buttonMap[key].lastClicked = c.clickedAt;
    }
  });

  const buttonIntelligence = Object.values(buttonMap)
    .map((b) => ({
      buttonId: b.buttonId,
      buttonText: b.buttonText,
      sectionName: b.sectionName,
      totalClicks: b.totalClicks,
      uniqueUsers: b.sessions.size,
      clickSharePct: totalClicks > 0 ? ((b.totalClicks / totalClicks) * 100).toFixed(1) : "0.0",
      lastClicked: b.lastClicked,
    }))
    .sort((a, b) => b.totalClicks - a.totalClicks);

  // Diagnosis insight breakdown
  const step1Counts: { [key: string]: number } = {};
  const step2Counts: { [key: string]: number } = {};
  store.diagnoses.forEach((diag) => {
    step1Counts[diag.step1Choice] = (step1Counts[diag.step1Choice] || 0) + 1;
    step2Counts[diag.step2Choice] = (step2Counts[diag.step2Choice] || 0) + 1;
  });

  return {
    kpis: {
      totalVisits,
      todayVisits,
      uniqueVisitors,
      totalClicks,
      todayClicks,
      totalLeads,
      todayLeads,
      conversionRate,
      avgTimeSpent,
      avgTimeSeconds,
    },
    dailyAnalytics,
    buttonIntelligence,
    recentVisits: [...store.visits].reverse().slice(0, 250),
    leads: [...store.leads].reverse().slice(0, 500),
    diagnosisInsights: {
      totalDiagnoses: store.diagnoses.length,
      step1Counts,
      step2Counts,
    },
    siteConfig: store.config,
  };
}

