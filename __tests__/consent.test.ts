import { beforeEach, describe, expect, it } from "vitest";
import { readTelemetryConsent, writeTelemetryConsent } from "@/lib/consent";

const CONSENT_KEY = "workload_cookie_consent";

describe("readTelemetryConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when the key is missing", () => {
    expect(readTelemetryConsent()).toBeNull();
  });

  it("returns true when telemetry is true", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: true }));
    expect(readTelemetryConsent()).toBe(true);
  });

  it("returns false when telemetry is false", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: false }));
    expect(readTelemetryConsent()).toBe(false);
  });

  it("returns null when the stored value is malformed JSON", () => {
    localStorage.setItem(CONSENT_KEY, "{not-json");
    expect(readTelemetryConsent()).toBeNull();
  });

  it("returns null when the stored value is JSON null", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(null));
    expect(readTelemetryConsent()).toBeNull();
  });

  it("returns null when the stored value is a JSON array", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify([1, 2, 3]));
    expect(readTelemetryConsent()).toBeNull();
  });

  it("returns null when telemetry is not a boolean", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ telemetry: "yes" }));
    expect(readTelemetryConsent()).toBeNull();
  });
});

describe("writeTelemetryConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("writes both telemetry and a numeric timestamp", () => {
    writeTelemetryConsent(true);
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) as string);
    expect(stored.telemetry).toBe(true);
    expect(typeof stored.timestamp).toBe("number");
  });
});
