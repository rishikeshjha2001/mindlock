"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Lock,
  LogOut,
  Users,
  Eye,
  MousePointerClick,
  FileSpreadsheet,
  Clock,
  Settings,
  Calendar,
  Layers,
  Search,
  MessageCircle,
  Download,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  BarChart3,
  Flame,
  Brain,
  Copy,
  Check,
  Send,
  Link as LinkIcon,
} from "lucide-react";

interface KPIs {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  todayClicks: number;
  totalLeads: number;
  todayLeads: number;
  conversionRate: string;
  avgTimeSpent: string;
  avgTimeSeconds: number;
}

interface DailyRow {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  avgTimeSpent: string;
  leads: number;
  peakHour: string;
}

interface ButtonRow {
  buttonId: string;
  buttonText: string;
  sectionName: string;
  totalClicks: number;
  uniqueUsers: number;
  clickSharePct: string;
  lastClicked: string;
}

interface VisitLog {
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

interface LeadRow {
  id: string;
  sessionId: string;
  name: string;
  whatsapp: string;
  targetExam: string;
  sourceButton: string;
  createdAt: string;
  dateIst: string;
}

interface DiagnosisInsights {
  totalDiagnoses: number;
  step1Counts: { [key: string]: number };
  step2Counts: { [key: string]: number };
}

interface SiteConfig {
  paymentUrl: string;
  vaultKey: string;
  productPrice: number;
  webhookUrl: string;
  telegramBotToken: string;
  telegramChatId: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<
    "daily" | "buttons" | "visits" | "diagnosis" | "leads" | "settings"
  >("daily");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard data
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyRow[]>([]);
  const [buttonIntelligence, setButtonIntelligence] = useState<ButtonRow[]>([]);
  const [recentVisits, setRecentVisits] = useState<VisitLog[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [diagnosisInsights, setDiagnosisInsights] = useState<DiagnosisInsights | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Filters for Visits
  const [visitSearchPath, setVisitSearchPath] = useState("");
  const [visitDateFilter, setVisitDateFilter] = useState("all");

  // Settings form state
  const [paymentUrl, setPaymentUrl] = useState("");
  const [vaultKey, setVaultKey] = useState("mindlock2026");
  const [price, setPrice] = useState(199);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        setIsAuthenticated(false);
        setIsLoadingStats(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setKpis(data.kpis);
        setDailyAnalytics(data.dailyAnalytics || []);
        setButtonIntelligence(data.buttonIntelligence || []);
        setRecentVisits(data.recentVisits || []);
        setLeads(data.leads || []);
        setDiagnosisInsights(data.diagnosisInsights || null);
        if (data.siteConfig) {
          setSiteConfig(data.siteConfig);
          setPaymentUrl(data.siteConfig.paymentUrl);
          setVaultKey(data.siteConfig.vaultKey || "mindlock2026");
          setPrice(data.siteConfig.productPrice || 199);
          setWebhookUrl(data.siteConfig.webhookUrl || "");
          setTelegramBotToken(data.siteConfig.telegramBotToken || "");
          setTelegramChatId(data.siteConfig.telegramChatId || "");
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        await fetchStats();
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Login failed. Please retry.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentUrl,
          vaultKey,
          productPrice: price,
          webhookUrl,
          telegramBotToken,
          telegramChatId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSiteConfig(data.config);
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const copyVaultRedirectUrl = () => {
    const currentOrigin = origin || (typeof window !== "undefined" ? window.location.origin : "");
    const redirectUrl = `${currentOrigin}/download-vault?key=${vaultKey}`;
    navigator.clipboard.writeText(redirectUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredVisits = useMemo(() => {
    return recentVisits.filter((v) => {
      const matchesPath = visitSearchPath
        ? v.pagePath.toLowerCase().includes(visitSearchPath.toLowerCase())
        : true;
      const matchesDate =
        visitDateFilter === "all" ? true : v.dateIst === visitDateFilter;
      return matchesPath && matchesDate;
    });
  }, [recentVisits, visitSearchPath, visitDateFilter]);

  const uniqueVisitDates = useMemo(() => {
    const dates = Array.from(new Set(recentVisits.map((v) => v.dateIst)));
    return dates.sort().reverse();
  }, [recentVisits]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-slateText-muted">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 animate-spin text-crimson" />
          <span className="font-mono text-xs">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#121212] border border-[#222222] rounded-3xl p-7 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-crimson/20 border border-crimson/40 text-crimson flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center text-white tracking-tight">
            MINDLOCK Command Center
          </h2>
          <p className="text-xs text-center text-slateText-secondary mt-1">
            Zero-Database First-Party Intelligence
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slateText-muted uppercase tracking-wider mb-1.5 font-mono">
                Admin ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@bookify"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slateText-muted uppercase tracking-wider mb-1.5 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
              />
            </div>

            {loginError && (
              <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-crimson/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? "Verifying..." : "Sign In to Admin Panel"}
            </button>
          </form>

          <div className="mt-6 text-center text-[10px] text-slateText-muted font-mono">
            Authorized Personnel Only • Vercel Zero-DB Engine
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slateText-primary pb-16 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-[#222222] bg-[#121212] px-4 sm:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson font-mono font-bold text-sm">
            ML
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
              MINDLOCK Command Center
            </h1>
            <p className="text-[11px] text-slateText-muted hidden sm:block font-mono">
              Zero-Database Live Analytics & Lead Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            title="Refresh Data"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slateText-secondary hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoadingStats ? "animate-spin text-crimson" : ""}`}
            />
          </button>
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* TOP KPI CARDS */}
        {kpis && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {/* Total Visits */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slateText-muted mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Page Views
                </span>
                <Eye className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {kpis.totalVisits.toLocaleString()}
              </div>
              <div className="text-[11px] text-slateText-muted mt-1 flex items-center gap-1">
                <span className="text-sky-400 font-bold">+{kpis.todayVisits}</span>
                <span>today</span>
              </div>
            </div>

            {/* Unique Visitors */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slateText-muted mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Unique Aspirants
                </span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {kpis.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-[11px] text-slateText-muted mt-1">Unique Sessions</div>
            </div>

            {/* Total Button Clicks */}
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slateText-muted mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Button Clicks
                </span>
                <MousePointerClick className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {kpis.totalClicks.toLocaleString()}
              </div>
              <div className="text-[11px] text-slateText-muted mt-1 flex items-center gap-1">
                <span className="text-amber-400 font-bold">+{kpis.todayClicks}</span>
                <span>today</span>
              </div>
            </div>

            {/* Leads Captured */}
            <div className="bg-[#121212] border border-crimson/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-[0_0_20px_rgba(225,29,72,0.1)]">
              <div className="flex items-center justify-between text-slateText-muted mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-crimson">
                  Leads Captured
                </span>
                <FileSpreadsheet className="w-4 h-4 text-crimson" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
                <span>{kpis.totalLeads}</span>
                <span className="text-xs font-sans font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  {kpis.conversionRate}% CVR
                </span>
              </div>
              <div className="text-[11px] text-slateText-muted mt-1">
                +{kpis.todayLeads} leads today
              </div>
            </div>

            {/* Average Time Spent */}
            <div className="col-span-2 lg:col-span-1 bg-[#121212] border border-[#222222] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="flex items-center justify-between text-slateText-muted mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                  Avg Time on Site
                </span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {kpis.avgTimeSpent}
              </div>
              <div className="text-[11px] text-slateText-muted mt-1">
                Per active session
              </div>
            </div>
          </div>
        )}

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-[#222222] pb-3 mb-6 overflow-x-auto">
          {[
            { id: "daily", label: "Traffic & Time Per Day", icon: Calendar },
            { id: "buttons", label: "Button Click Intelligence", icon: MousePointerClick },
            { id: "visits", label: "Page Visit Logs", icon: Layers },
            { id: "diagnosis", label: "Aspirant Diagnosis Insights", icon: Brain },
            { id: "leads", label: `Captured Leads (${leads.length})`, icon: FileSpreadsheet },
            { id: "settings", label: "Payment & Vault Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-crimson text-white shadow-md shadow-crimson/25"
                    : "bg-[#121212] text-slateText-secondary hover:text-white hover:bg-white/5 border border-[#222222]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DAILY TRAFFIC & TIME PER DAY */}
        {activeTab === "daily" && (
          <div className="space-y-6">
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-crimson" />
                    Daily Traffic & Visitor Velocity
                  </h3>
                  <p className="text-xs text-slateText-muted mt-0.5">
                    Day-by-day visitor volume and interactions
                  </p>
                </div>
                <span className="text-xs text-slateText-muted font-mono">
                  {dailyAnalytics.length} days recorded
                </span>
              </div>

              {dailyAnalytics.length > 0 ? (
                <div className="mt-4">
                  <div className="h-44 w-full flex items-end gap-2 pt-6 pb-2 border-b border-white/5">
                    {dailyAnalytics.slice(0, 14).reverse().map((day, idx) => {
                      const maxVisits = Math.max(
                        ...dailyAnalytics.map((d) => d.totalVisits),
                        1
                      );
                      const heightPercent = Math.max(
                        10,
                        Math.round((day.totalVisits / maxVisits) * 100)
                      );
                      return (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center gap-1.5 group relative"
                        >
                          <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap pointer-events-none z-20 shadow-xl">
                            {day.date}: {day.totalVisits} visits • {day.totalClicks} clicks
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-rose-900 to-crimson rounded-t-md hover:brightness-125 transition-all"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-[10px] text-slateText-muted font-mono truncate w-full text-center">
                            {day.date.slice(5)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-slateText-muted font-mono">
                  No visits logged yet. Real-time visits will appear here automatically.
                </div>
              )}
            </div>

            {/* Daily Performance Table */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-white/5">
                <h3 className="text-sm font-bold text-white">
                  Daily Performance Table (IST)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#18181A] text-slateText-muted font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-3.5 pl-5">Date (IST)</th>
                      <th className="p-3.5">Total Visits</th>
                      <th className="p-3.5">Unique Visitors</th>
                      <th className="p-3.5">Button Clicks</th>
                      <th className="p-3.5">Avg Time Spent</th>
                      <th className="p-3.5">Leads</th>
                      <th className="p-3.5 pr-5">Peak Hour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slateText-secondary">
                    {dailyAnalytics.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-slateText-muted">
                          No daily data yet.
                        </td>
                      </tr>
                    ) : (
                      dailyAnalytics.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 pl-5 font-mono text-white font-medium">
                            {row.date}
                          </td>
                          <td className="p-3.5 text-white font-semibold">{row.totalVisits}</td>
                          <td className="p-3.5 font-mono">{row.uniqueVisitors}</td>
                          <td className="p-3.5 font-mono text-amber-400">{row.totalClicks}</td>
                          <td className="p-3.5 font-mono text-emerald-400">
                            {row.avgTimeSpent}
                          </td>
                          <td className="p-3.5 font-mono text-crimson font-bold">
                            {row.leads}
                          </td>
                          <td className="p-3.5 pr-5 font-mono text-slate-300">
                            {row.peakHour}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUTTON CLICK INTELLIGENCE */}
        {activeTab === "buttons" && (
          <div className="bg-[#121212] border border-[#222222] rounded-3xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-crimson" />
                  Button Click Intelligence & Heatmap
                </h3>
                <p className="text-xs text-slateText-muted mt-0.5">
                  Ranked by total click volume. Detect which buttons drive highest conversion.
                </p>
              </div>
              <a
                href="/api/leads/export?type=clicks"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Clicks CSV</span>
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#18181A] text-slateText-muted font-mono uppercase text-[11px]">
                  <tr>
                    <th className="p-3.5 pl-5">Button ID</th>
                    <th className="p-3.5">Button Label</th>
                    <th className="p-3.5">Section</th>
                    <th className="p-3.5">Total Clicks</th>
                    <th className="p-3.5">Unique Users</th>
                    <th className="p-3.5">Click Share</th>
                    <th className="p-3.5 pr-5">Last Clicked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slateText-secondary">
                  {buttonIntelligence.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slateText-muted">
                        No button clicks recorded yet.
                      </td>
                    </tr>
                  ) : (
                    buttonIntelligence.map((btn, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          idx === 0 ? "bg-crimson/5" : ""
                        }`}
                      >
                        <td className="p-3.5 pl-5 font-mono text-white font-bold flex items-center gap-1.5">
                          {btn.buttonId}
                          {idx === 0 && (
                            <span className="text-[10px] bg-crimson text-white px-1.5 py-0.2 rounded font-sans font-semibold">
                              TOP CTA
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-200">{btn.buttonText}</td>
                        <td className="p-3.5 text-slate-400">{btn.sectionName}</td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          {btn.totalClicks}
                        </td>
                        <td className="p-3.5 font-mono">{btn.uniqueUsers}</td>
                        <td className="p-3.5 font-mono text-amber-400">
                          {btn.clickSharePct}%
                        </td>
                        <td className="p-3.5 pr-5 text-xs text-slateText-muted font-mono">
                          {new Date(btn.lastClicked).toLocaleTimeString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PAGE-BY-PAGE VISIT LOGS */}
        {activeTab === "visits" && (
          <div className="bg-[#121212] border border-[#222222] rounded-3xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  Individual Page Visit Stream
                </h3>
                <p className="text-xs text-slateText-muted mt-0.5">
                  Detailed log of individual visits including /download-vault access
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slateText-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Filter by page path..."
                    value={visitSearchPath}
                    onChange={(e) => setVisitSearchPath(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-crimson"
                  />
                </div>

                <select
                  value={visitDateFilter}
                  onChange={(e) => setVisitDateFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-xs text-white focus:outline-none focus:border-crimson"
                >
                  <option value="all">All Dates</option>
                  {uniqueVisitDates.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#18181A] text-slateText-muted font-mono uppercase text-[11px]">
                  <tr>
                    <th className="p-3.5 pl-5">Page Visited</th>
                    <th className="p-3.5">Exact Date & Time (IST)</th>
                    <th className="p-3.5">Time Spent</th>
                    <th className="p-3.5">Device</th>
                    <th className="p-3.5">Browser</th>
                    <th className="p-3.5">Referrer</th>
                    <th className="p-3.5 pr-5">Session ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slateText-secondary">
                  {filteredVisits.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slateText-muted">
                        No visits match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredVisits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5 pl-5 font-mono text-white font-medium">
                          {visit.pagePath}
                        </td>
                        <td className="p-3.5 text-xs text-slate-300 font-mono">
                          {new Date(visit.visitedAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                          {visit.timeSpentSeconds}s
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              visit.deviceType === "Mobile"
                                ? "bg-amber-950/60 text-amber-300 border border-amber-800/40"
                                : "bg-blue-950/60 text-blue-300 border border-blue-800/40"
                            }`}
                          >
                            {visit.deviceType}
                          </span>
                        </td>
                        <td className="p-3.5 text-xs text-slate-400">{visit.browser}</td>
                        <td className="p-3.5 text-xs text-slate-400 truncate max-w-[120px]">
                          {visit.referrer || "Direct"}
                        </td>
                        <td className="p-3.5 pr-5 font-mono text-[11px] text-slate-500 truncate max-w-[100px]">
                          {visit.sessionId}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ASPIRANT DIAGNOSIS INSIGHTS */}
        {activeTab === "diagnosis" && (
          <div className="space-y-6">
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2 text-crimson font-bold">
                <Brain className="w-5 h-5" />
                <h3 className="text-base text-white">
                  Aspirant Pain & Cognitive Bottleneck Insights
                </h3>
              </div>
              <p className="text-xs text-slateText-muted mb-6">
                Data submitted by visitors in the 20-Second Self-Diagnosis widget. Identifies which psychological trigger converts highest.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Step 1 Struggles */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200 mb-4">
                    Desk Friction Trigger (Question 1)
                  </h4>
                  {diagnosisInsights &&
                  Object.keys(diagnosisInsights.step1Counts).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(diagnosisInsights.step1Counts).map(
                        ([choice, count]) => {
                          const total = diagnosisInsights.totalDiagnoses || 1;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={choice}>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-300">{choice}</span>
                                <span className="font-mono text-crimson font-bold">
                                  {count} ({pct}%)
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                                <div
                                  className="h-full bg-crimson rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slateText-muted">
                      No diagnosis data captured yet.
                    </p>
                  )}
                </div>

                {/* Step 2 Guilt Moments */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200 mb-4">
                    Heaviest Guilt Moment (Question 2)
                  </h4>
                  {diagnosisInsights &&
                  Object.keys(diagnosisInsights.step2Counts).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(diagnosisInsights.step2Counts).map(
                        ([choice, count]) => {
                          const total = diagnosisInsights.totalDiagnoses || 1;
                          const pct = Math.round((count / total) * 100);
                          return (
                            <div key={choice}>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-300">{choice}</span>
                                <span className="font-mono text-purple-400 font-bold">
                                  {count} ({pct}%)
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                                <div
                                  className="h-full bg-purple-500 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slateText-muted">
                      No diagnosis data captured yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CAPTURED LEADS & CSV EXPORT */}
        {activeTab === "leads" && (
          <div className="bg-[#121212] border border-[#222222] rounded-3xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-crimson" />
                  Captured Student Leads ({leads.length})
                </h3>
                <p className="text-xs text-slateText-muted mt-0.5">
                  Students who initiated checkout with their 10-digit WhatsApp numbers
                </p>
              </div>

              <a
                href="/api/leads/export?type=leads"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-crimson/25 transition-all cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export All Leads to CSV</span>
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#18181A] text-slateText-muted font-mono uppercase text-[11px]">
                  <tr>
                    <th className="p-3.5 pl-5">Student Name</th>
                    <th className="p-3.5">WhatsApp Number</th>
                    <th className="p-3.5">Target Exam</th>
                    <th className="p-3.5">Source Button</th>
                    <th className="p-3.5">Date (IST)</th>
                    <th className="p-3.5 pr-5">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slateText-secondary">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-slateText-muted">
                        No student leads captured yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5 pl-5 font-bold text-white">{lead.name}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-semibold">
                          +91 {lead.whatsapp}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-200">
                            {lead.targetExam}
                          </span>
                        </td>
                        <td className="p-3.5 text-xs text-slate-400 font-mono">
                          {lead.sourceButton}
                        </td>
                        <td className="p-3.5 text-xs text-slate-300 font-mono">
                          {new Date(lead.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td className="p-3.5 pr-5">
                          <a
                            href={`https://wa.me/91${lead.whatsapp}?text=Hi%20${encodeURIComponent(
                              lead.name
                            )}%2C%20this%20is%20MINDLOCK%20Team%20regarding%20your%20${encodeURIComponent(
                              lead.targetExam
                            )}%20access.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-black" />
                            <span>Chat</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PAYMENT & PRODUCT VAULT SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            {/* Box 1: Post-Payment Redirect URL with 1-Click Copy */}
            <div className="bg-[#121212] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
                <LinkIcon className="w-4 h-4" />
                <span>Your Post-Payment Vault URL (For Razorpay / SuperProfile)</span>
              </div>
              <p className="text-xs text-slateText-muted mb-4 leading-relaxed">
                Paste this URL as your Redirect / Thank-You URL in your payment gateway. Paying students are automatically authenticated and granted instant 1-click access to their downloads:
              </p>

              <div className="flex items-center gap-2 bg-black/60 border border-[#2a2a2a] p-3 rounded-2xl font-mono text-xs text-emerald-300">
                <span className="truncate flex-1">
                  {origin ? `${origin}/download-vault?key=${vaultKey}` : `/download-vault?key=${vaultKey}`}
                </span>
                <button
                  type="button"
                  onClick={copyVaultRedirectUrl}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Box 2: Configuration Form */}
            <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-crimson/20 border border-crimson/30 flex items-center justify-center text-crimson">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Live System & Cloud Backup Settings
                  </h3>
                  <p className="text-xs text-slateText-muted">
                    Zero external DB required. Server-side memory + instant cloud webhook sync.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-2 font-mono">
                    Payment Gateway URL (SuperProfile / Razorpay)
                  </label>
                  <input
                    type="text"
                    value={paymentUrl}
                    onChange={(e) => setPaymentUrl(e.target.value)}
                    placeholder="https://pages.razorpay.com/... or /download-vault?key=mindlock2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                  />
                  <p className="text-[11px] text-slateText-muted mt-1.5">
                    When student submits the modal, they are instantly redirected here.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-2 font-mono">
                      Vault Access Key
                    </label>
                    <input
                      type="text"
                      value={vaultKey}
                      onChange={(e) => setVaultKey(e.target.value)}
                      placeholder="mindlock2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-2 font-mono">
                      Display Price (₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Optional Zero-DB Cloud Webhook Sync */}
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400 font-bold">
                    <Send className="w-3.5 h-3.5" />
                    <span>Optional Zero-DB Cloud Sync (Google Sheets / Telegram)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1.5 font-mono">
                      Google Apps Script Webhook URL (For auto-syncing to Google Sheets)
                    </label>
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1.5 font-mono">
                        Telegram Bot Token (Optional)
                      </label>
                      <input
                        type="text"
                        value={telegramBotToken}
                        onChange={(e) => setTelegramBotToken(e.target.value)}
                        placeholder="123456789:ABCdef..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slateText-secondary uppercase tracking-wider mb-1.5 font-mono">
                        Telegram Chat ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={telegramChatId}
                        onChange={(e) => setTelegramChatId(e.target.value)}
                        placeholder="e.g. 987654321"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#2a2a2a] text-white focus:outline-none focus:border-crimson text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {settingsSaved && (
                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Configuration updated live!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="py-3 px-6 rounded-xl bg-crimson hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-crimson/30 cursor-pointer disabled:opacity-50"
                >
                  {isSavingSettings ? "Saving..." : "Save Settings"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
