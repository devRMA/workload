"use client";

import { useEffect, useState } from "react";
import { GoogleAd } from "@/components/atoms/google-ad";
import { CONSENT_CHANGED_EVENT, readAdsConsent } from "@/lib/consent";

export function AdManager() {
  const [hasConsent, setHasConsent] = useState(false);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  useEffect(() => {
    const loadAds = () => {
      const allowed = readAdsConsent() === true;
      setHasConsent(allowed);
      if (!adClient || !enableAds || !allowed) return;
      if (document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) return;

      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    loadAds();
    window.addEventListener(CONSENT_CHANGED_EVENT, loadAds);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, loadAds);
  }, [adClient, enableAds]);

  if (!adClient || !enableAds || !hasConsent) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8">
      <GoogleAd slot="footer_slot" />
    </div>
  );
}
