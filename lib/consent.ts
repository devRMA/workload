const CONSENT_KEY = "workload_cookie_consent";

export const CONSENT_CHANGED_EVENT = "workload:consent-changed";

function readConsent(category: "telemetry" | "ads"): boolean | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const value = (parsed as Partial<Record<typeof category, unknown>>)[category];
    return typeof value === "boolean" ? value : null;
  } catch {
    return null;
  }
}

export function readTelemetryConsent(): boolean | null {
  return readConsent("telemetry");
}

export function readAdsConsent(): boolean | null {
  return readConsent("ads");
}

export function writeConsent(telemetry: boolean, ads: boolean): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry, ads, timestamp: Date.now() }));
}
