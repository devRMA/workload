"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  className?: string;
}

export function GoogleAd({ slot, className }: GoogleAdProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (isAdPushed.current) return;
    isAdPushed.current = true;

    try {
      const globalScope = window as Record<string, unknown>;
      const queue = (globalScope.adsbygoogle as Array<Record<string, unknown>> | undefined) ?? [];
      globalScope.adsbygoogle = queue;
      queue.push({});
    } catch {}
  }, []);

  return (
    <ins
      className={cn("adsbygoogle min-h-25 w-full overflow-hidden rounded-md bg-surface-sunken", className)}
      style={{ display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
