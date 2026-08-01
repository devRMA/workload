import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { safeGAEvent } from "@/lib/analytics";

describe("safeGAEvent", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		(window as Record<string, unknown>).dataLayer = undefined;
		(window as Record<string, unknown>).gtag = undefined;
	});

	it("does nothing when there is no window to report to", () => {
		vi.stubGlobal("window", undefined);
		const setIntervalSpy = vi.spyOn(global, "setInterval");

		expect(() => safeGAEvent("test_event")).not.toThrow();
		expect(setIntervalSpy).not.toHaveBeenCalled();

		vi.unstubAllGlobals();
	});

	it("sends the event immediately with params when dataLayer already exists", () => {
		(window as Record<string, unknown>).dataLayer = [];
		const gtag = vi.fn();
		(window as Record<string, unknown>).gtag = gtag;

		safeGAEvent("test_event", { foo: "bar" });

		expect(gtag).toHaveBeenCalledWith("event", "test_event", { foo: "bar" });
	});

	it("sends the event immediately without params when dataLayer already exists", () => {
		(window as Record<string, unknown>).dataLayer = [];
		const gtag = vi.fn();
		(window as Record<string, unknown>).gtag = gtag;

		safeGAEvent("test_event");

		expect(gtag).toHaveBeenCalledWith("event", "test_event");
	});

	it("retries until dataLayer becomes available", () => {
		const gtag = vi.fn();
		(window as Record<string, unknown>).gtag = gtag;

		safeGAEvent("test_event");
		expect(gtag).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);
		expect(gtag).not.toHaveBeenCalled();

		(window as Record<string, unknown>).dataLayer = [];
		vi.advanceTimersByTime(500);
		expect(gtag).toHaveBeenCalledWith("event", "test_event");
	});

	it("gives up and clears the interval after the max retries", () => {
		const clearIntervalSpy = vi.spyOn(global, "clearInterval");
		const gtag = vi.fn();
		(window as Record<string, unknown>).gtag = gtag;

		safeGAEvent("test_event");
		vi.advanceTimersByTime(500 * 10);

		expect(gtag).not.toHaveBeenCalled();
		expect(clearIntervalSpy).toHaveBeenCalled();
	});
});
