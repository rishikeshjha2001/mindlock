"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function trackClientClick(
  buttonId: string,
  buttonText: string,
  sectionName: string,
  pagePath?: string
) {
  if (typeof window === "undefined") return;

  const sessionId = localStorage.getItem("mindlock_session_id") || "ml_anon";
  const currentPath = pagePath || window.location.pathname;

  const payload = JSON.stringify({
    type: "CLICK",
    sessionId,
    buttonId,
    buttonText,
    sectionName,
    pagePath: currentPath,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics/track",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const currentVisitIdRef = useRef<string | null>(null);
  const timeSpentRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // 1. Session initialization
  useEffect(() => {
    let sid = localStorage.getItem("mindlock_session_id");
    if (!sid) {
      sid = "ml_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem("mindlock_session_id", sid);
    }
  }, []);

  // 2. Page visit tracking
  useEffect(() => {
    const sessionId = localStorage.getItem("mindlock_session_id") || "ml_init";
    timeSpentRef.current = 0;

    const ua = navigator.userAgent;
    let deviceType = "Desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      deviceType = "Tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
        ua
      )
    ) {
      deviceType = "Mobile";
    }

    let browser = "Chrome";
    if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
    else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browser = "Edge";
    else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) browser = "Safari";

    const referrer = document.referrer || "";

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "VISIT",
        sessionId,
        pagePath: pathname,
        referrer,
        deviceType,
        browser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.visitId) {
          currentVisitIdRef.current = data.visitId;
        }
      })
      .catch(() => {});

    const sendDurationUpdate = () => {
      const sessionId = localStorage.getItem("mindlock_session_id");
      const visitId = currentVisitIdRef.current;
      const totalSeconds = timeSpentRef.current;

      const payload = JSON.stringify({
        type: "DURATION",
        visitId,
        sessionId,
        pagePath: pathname,
        totalSeconds,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/track",
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    // 10s active heartbeat
    const interval = setInterval(() => {
      if (isVisibleRef.current) {
        timeSpentRef.current += 10;
        sendDurationUpdate();
      }
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
        sendDurationUpdate();
      } else {
        isVisibleRef.current = true;
      }
    };

    const handlePageHide = () => {
      sendDurationUpdate();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      sendDurationUpdate();
    };
  }, [pathname]);

  // 3. Global click listener on [data-track-btn]
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trackElem = target.closest(
        "[data-track-btn], [data-track-id], button, a"
      ) as HTMLElement | null;

      if (!trackElem) return;

      const buttonId =
        trackElem.getAttribute("data-track-btn") ||
        trackElem.getAttribute("data-track-id") ||
        trackElem.id;

      if (buttonId) {
        const buttonText =
          trackElem.getAttribute("data-track-text") ||
          trackElem.innerText?.trim() ||
          trackElem.getAttribute("aria-label") ||
          "Button";
        const sectionName =
          trackElem.getAttribute("data-track-section") ||
          trackElem.closest("section")?.getAttribute("id") ||
          "Page";

        trackClientClick(
          buttonId,
          buttonText.slice(0, 100),
          sectionName.slice(0, 100)
        );
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
