"use client";

import { useEffect } from "react";
import { GoogleAd } from "@/components/atoms/google-ad";

export function AdManager() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  useEffect(() => {
    if (!adClient || !enableAds) return;
    if (document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [adClient, enableAds]);

  if (!adClient || !enableAds) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8">
      <GoogleAd slot="footer_slot" />
    </div>
  );
}
