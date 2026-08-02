"use client";

import { useCallback, useEffect, useState } from "react";
import { AdBlockNotice } from "@/components/molecules/ad-block-notice";
import { SideAds } from "@/components/molecules/side-ads";
import { VideoAdModal } from "@/components/molecules/video-ad-modal";

const SIDE_AD_KEY = "workload_side_ads_last_view";
const VIDEO_AD_KEY = "workload_video_ad_last_view";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const VIDEO_AD_DELAY_MS = 120000;
const REQUIRED_IDLE_MS = 30000;
const INTERACTION_EVENTS = ["keydown", "pointerdown"] as const;
const FOCUSED_FORM_FIELD_SELECTOR = "input:focus, textarea:focus, select:focus, [contenteditable]:focus";

function isFormFieldFocused() {
  return document.querySelector(FOCUSED_FORM_FIELD_SELECTOR) !== null;
}

export function AdManager() {
  const [showAdBlockNotice, setShowAdBlockNotice] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [canShowSideAds, setCanShowSideAds] = useState(false);
  const [canShowVideoAd, setCanShowVideoAd] = useState(false);
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  const checkAdBlock = useCallback(async () => {
    if (!enableAds) return;

    try {
      await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
      });
      setIsAdBlockActive(false);
    } catch (_error) {
      setIsAdBlockActive(true);
      setShowAdBlockNotice(true);
    }
  }, [enableAds]);

  const checkCooldowns = useCallback(() => {
    if (!enableAds) return;
    const now = Date.now();

    const lastSideView = localStorage.getItem(SIDE_AD_KEY);
    if (!lastSideView || now - Number(lastSideView) > ONE_WEEK_MS) {
      setCanShowSideAds(true);
    }

    const lastVideoView = localStorage.getItem(VIDEO_AD_KEY);
    if (!lastVideoView || now - Number(lastVideoView) > ONE_WEEK_MS) {
      setCanShowVideoAd(true);
    }
  }, [enableAds]);

  useEffect(() => {
    checkAdBlock();
    checkCooldowns();
  }, [checkAdBlock, checkCooldowns]);

  useEffect(() => {
    if (!enableAds || !canShowVideoAd || isAdBlockActive) return;

    let lastInteractionAt = Date.now();
    const registerInteraction = () => {
      lastInteractionAt = Date.now();
    };
    for (const eventName of INTERACTION_EVENTS) {
      window.addEventListener(eventName, registerInteraction);
    }

    let timer: ReturnType<typeof setTimeout>;
    const openWhenIdle = (delay: number) => {
      timer = setTimeout(() => {
        if (Date.now() - lastInteractionAt < REQUIRED_IDLE_MS || isFormFieldFocused()) {
          openWhenIdle(REQUIRED_IDLE_MS);
          return;
        }
        setShowVideoModal(true);
      }, delay);
    };
    openWhenIdle(VIDEO_AD_DELAY_MS);

    return () => {
      clearTimeout(timer);
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, registerInteraction);
      }
    };
  }, [canShowVideoAd, isAdBlockActive, enableAds]);

  useEffect(() => {
    if (!adClient || !enableAds) return;
    const existingScript = document.querySelector(`script[src*="pagead2.googlesyndication.com"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, [adClient, enableAds]);

  const handleVideoComplete = () => {
    localStorage.setItem(VIDEO_AD_KEY, Date.now().toString());
    setCanShowVideoAd(false);
  };

  const handleSideAdsClose = () => {
    localStorage.setItem(SIDE_AD_KEY, Date.now().toString());
    setCanShowSideAds(false);
  };

  const handleAdBlockConfirm = () => {
    setShowAdBlockNotice(false);
    window.location.reload();
  };

  if (!adClient) return null;

  return (
    <>
      <AdBlockNotice
        isOpen={showAdBlockNotice}
        onClose={() => setShowAdBlockNotice(false)}
        onConfirm={handleAdBlockConfirm}
      />

      <VideoAdModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} onComplete={handleVideoComplete} />

      {canShowSideAds && !isAdBlockActive && <SideAds onClose={handleSideAdsClose} />}
    </>
  );
}
