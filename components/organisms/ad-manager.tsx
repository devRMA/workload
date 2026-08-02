"use client";

import { useCallback, useEffect, useState } from "react";
import { AdBlockModal } from "@/components/molecules/ad-block-modal";
import { SideAds } from "@/components/molecules/side-ads";
import { VideoAdModal } from "@/components/molecules/video-ad-modal";

const SIDE_AD_KEY = "workload_side_ads_last_view";
const VIDEO_AD_KEY = "workload_video_ad_last_view";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function AdManager() {
  const [showAdBlockModal, setShowAdBlockModal] = useState(false);
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
      setShowAdBlockModal(true);
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
    if (enableAds && canShowVideoAd && !isAdBlockActive) {
      const timer = setTimeout(() => {
        setShowVideoModal(true);
      }, 120000);
      return () => clearTimeout(timer);
    }
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
    setShowAdBlockModal(false);
    window.location.reload();
  };

  if (!adClient) return null;

  return (
    <>
      <AdBlockModal
        isOpen={showAdBlockModal}
        onClose={() => setShowAdBlockModal(false)}
        onConfirm={handleAdBlockConfirm}
      />

      <VideoAdModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} onComplete={handleVideoComplete} />

      {canShowSideAds && !isAdBlockActive && <SideAds onClose={handleSideAdsClose} />}
    </>
  );
}
