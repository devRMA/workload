export function safeGAEvent(
	eventName: string,
	params?: Record<string, string | number>,
) {
	if (typeof window === "undefined") return;

	const send = () => {
		const dataLayer = (window as Record<string, unknown>).dataLayer as
			| Array<Record<string, unknown>>
			| undefined;

		if (dataLayer) {
			if (params) {
				(
					window as Record<string, unknown> & {
						gtag?: (...args: unknown[]) => void;
					}
				).gtag?.("event", eventName, params);
			} else {
				(
					window as Record<string, unknown> & {
						gtag?: (...args: unknown[]) => void;
					}
				).gtag?.("event", eventName);
			}
			return true;
		}
		return false;
	};

	if (!send()) {
		const maxRetries = 10;
		let retries = 0;
		const interval = setInterval(() => {
			retries++;
			if (send() || retries >= maxRetries) {
				clearInterval(interval);
			}
		}, 500);
	}
}
