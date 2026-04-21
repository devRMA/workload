"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const CONSENT_KEY = "workload_cookie_consent";

export function AnalyticsWrapper() {
	const [shouldLoad, setShouldLoad] = useState(false);
	const gaId = process.env.NEXT_PUBLIC_GA_ID;

	useEffect(() => {
		const consent = localStorage.getItem(CONSENT_KEY);
		if (consent) {
			const { telemetry } = JSON.parse(consent);
			if (telemetry) {
				setShouldLoad(true);
			}
		}
	}, []);

	if (!gaId || !shouldLoad) return null;

	return <GoogleAnalytics gaId={gaId} />;
}
