/**
 * Helper utilities for formatting and calculating Asia/Kolkata (IST) time
 */

export function getNowIst(): {
  dateIst: string; // YYYY-MM-DD
  hourIst: number; // 0-23
  formattedIst: string; // e.g. "13 Nov 2026, 06:55 PM"
  isoString: string;
} {
  const now = new Date();

  // Create an Intl formatter for Asia/Kolkata timezone
  const istFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dateIst = istFormatter.format(now); // Produces YYYY-MM-DD

  const hourFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  });
  const hourIst = parseInt(hourFormatter.format(now), 10) % 24;

  const displayFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedIst = displayFormatter.format(now);

  return {
    dateIst,
    hourIst,
    formattedIst,
    isoString: now.toISOString(),
  };
}

export function formatTimeAgo(date: Date | string): string {
  const past = new Date(date).getTime();
  const now = Date.now();
  const diffSecs = Math.floor((now - past) / 1000);

  if (diffSecs < 60) return "Just now";
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function formatSeconds(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}
