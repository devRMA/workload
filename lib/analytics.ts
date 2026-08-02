type EventParams = Record<string, string | number>;

interface AnalyticsWindow {
  dataLayer?: unknown[];
  gtag?: (command: "event", eventName: string, params?: EventParams) => void;
}

const MAX_RETRIES = 10;
const RETRY_INTERVAL_MS = 500;

export function safeGAEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const send = () => {
    const { dataLayer, gtag } = window as Window & AnalyticsWindow;
    if (!dataLayer) return false;

    if (params) gtag?.("event", eventName, params);
    else gtag?.("event", eventName);

    return true;
  };

  if (send()) return;

  let retries = 0;
  const interval = setInterval(() => {
    retries += 1;
    if (send() || retries >= MAX_RETRIES) clearInterval(interval);
  }, RETRY_INTERVAL_MS);
}
