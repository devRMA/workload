const CONSENT_KEY = "workload_cookie_consent";

export function readTelemetryConsent(): boolean | null {
	try {
		const raw = localStorage.getItem(CONSENT_KEY);
		if (raw === null) return null;

		const parsed: unknown = JSON.parse(raw);
		if (typeof parsed !== "object" || parsed === null) return null;

		const { telemetry } = parsed as { telemetry?: unknown };
		return typeof telemetry === "boolean" ? telemetry : null;
	} catch {
		return null;
	}
}

export function writeTelemetryConsent(telemetry: boolean): void {
	localStorage.setItem(
		CONSENT_KEY,
		JSON.stringify({ telemetry, timestamp: Date.now() }),
	);
}
