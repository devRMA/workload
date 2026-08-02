"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { CONSENT_CHANGED_EVENT, readTelemetryConsent } from "@/lib/consent";

export function AnalyticsWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const syncConsent = () => setShouldLoad(readTelemetryConsent() === true);

    syncConsent();
    window.addEventListener(CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  if (!gaId || !shouldLoad) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
