"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { readTelemetryConsent } from "@/lib/consent";

export function AnalyticsWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setShouldLoad(readTelemetryConsent() === true);
  }, []);

  if (!gaId || !shouldLoad) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
