"use client";

import { useEffect, useState } from "react";
import { grossHourlyRate } from "@/lib/payroll";
import { GROSS_SALARY_KEY, LEGACY_HOURLY_RATE_KEY, MONTHLY_HOURS_KEY, readStoredNumber } from "@/lib/storage";

export function useGrossHourlyRate(): number | null {
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);

  useEffect(() => {
    localStorage.removeItem(LEGACY_HOURLY_RATE_KEY);

    const rate = grossHourlyRate(readStoredNumber(GROSS_SALARY_KEY, 0), readStoredNumber(MONTHLY_HOURS_KEY, 0));
    setHourlyRate(rate > 0 ? rate : null);
  }, []);

  return hourlyRate;
}
