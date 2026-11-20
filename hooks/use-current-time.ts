"use client";

import { useEffect, useState } from "react";

const TICK_INTERVAL_MS = 1000;

const subscribers = new Set<(time: Date) => void>();
let timer = 0;

function subscribe(listener: (time: Date) => void): () => void {
  subscribers.add(listener);
  if (timer === 0) {
    timer = window.setInterval(() => {
      const now = new Date();
      for (const notify of subscribers) notify(now);
    }, TICK_INTERVAL_MS);
  }

  return () => {
    subscribers.delete(listener);
    if (subscribers.size === 0) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}

export function useCurrentTime(): Date | null {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    return subscribe(setCurrentTime);
  }, []);

  return currentTime;
}
