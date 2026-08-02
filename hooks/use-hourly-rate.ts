"use client";

import { useEffect, useState } from "react";
import { HOURLY_RATE_KEY, readStoredNumber } from "@/lib/storage";

export function useHourlyRate(): number | null {
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);

  useEffect(() => {
    const stored = readStoredNumber(HOURLY_RATE_KEY, 0);
    setHourlyRate(stored > 0 ? stored : null);
  }, []);

  return hourlyRate;
}
