import { useEffect, useMemo, useState } from "react";
import {
  calculateIncomeTax,
  calculateSocialSecurity,
  sanitizeAmount,
  WORK_REGIMES,
  type WorkRegime,
} from "@/lib/payroll";
import { amountForPeriod, SALARY_PERIODS, type SalaryPeriod } from "@/lib/salary-period";
import { readStoredList, readStoredNumber } from "@/lib/storage";

export interface ExtraItem {
  id: string;
  name: string;
  value: number;
}

export type ExtraKind = "gain" | "deduction";

const DEFAULT_GROSS_SALARY = 5000;
const DEFAULT_MONTHLY_HOURS = 220;
const DEFAULT_DAILY_HOURS = 8;
const DEFAULT_REGIME: WorkRegime = "clt";
const DEFAULT_PERIOD: SalaryPeriod = "hour";

const STORAGE_KEYS = {
  grossSalary: "grossSalary",
  monthlyHours: "monthlyHours",
  dailyHours: "dailyHours",
  dependents: "dependents",
  regime: "workRegime",
  period: "salaryPeriod",
  extraDeductions: "extraDeductions",
  extraGains: "extraGains",
} as const;

function readStoredOption<TOption extends string>(
  key: string,
  allowed: readonly TOption[],
  fallback: TOption,
): TOption {
  const stored = localStorage.getItem(key);
  return allowed.find((option) => option === stored) ?? fallback;
}

function isExtraItem(candidate: unknown): candidate is ExtraItem {
  if (typeof candidate !== "object" || candidate === null) return false;

  const { id, name, value } = candidate as Partial<ExtraItem>;
  return typeof id === "string" && typeof name === "string" && typeof value === "number" && Number.isFinite(value);
}

function sumValues(items: readonly ExtraItem[]): number {
  return items.reduce((total, item) => total + item.value, 0);
}

export function useSalaryCalculator(initialSalary = DEFAULT_GROSS_SALARY, initialHours = DEFAULT_MONTHLY_HOURS) {
  const [grossSalary, setGrossSalary] = useState(initialSalary);
  const [monthlyHours, setMonthlyHours] = useState(initialHours);
  const [dailyHours, setDailyHours] = useState(DEFAULT_DAILY_HOURS);
  const [dependents, setDependents] = useState(0);
  const [regime, setRegime] = useState<WorkRegime>(DEFAULT_REGIME);
  const [period, setPeriod] = useState<SalaryPeriod>(DEFAULT_PERIOD);
  const [manualInss, setManualInss] = useState<number | null>(null);
  const [manualIrrf, setManualIrrf] = useState<number | null>(null);
  const [extraDeductions, setExtraDeductions] = useState<ExtraItem[]>([]);
  const [extraGains, setExtraGains] = useState<ExtraItem[]>([]);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    setGrossSalary(readStoredNumber(STORAGE_KEYS.grossSalary, initialSalary));
    setMonthlyHours(readStoredNumber(STORAGE_KEYS.monthlyHours, initialHours));
    setDailyHours(readStoredNumber(STORAGE_KEYS.dailyHours, DEFAULT_DAILY_HOURS));
    setDependents(readStoredNumber(STORAGE_KEYS.dependents, 0));
    setRegime(readStoredOption(STORAGE_KEYS.regime, WORK_REGIMES, DEFAULT_REGIME));
    setPeriod(readStoredOption(STORAGE_KEYS.period, SALARY_PERIODS, DEFAULT_PERIOD));
    setExtraDeductions(readStoredList(STORAGE_KEYS.extraDeductions, isExtraItem));
    setExtraGains(readStoredList(STORAGE_KEYS.extraGains, isExtraItem));
    setIsRestored(true);
  }, [initialSalary, initialHours]);

  useEffect(() => {
    if (!isRestored) return;

    localStorage.setItem(STORAGE_KEYS.grossSalary, grossSalary.toString());
    localStorage.setItem(STORAGE_KEYS.monthlyHours, monthlyHours.toString());
    localStorage.setItem(STORAGE_KEYS.dailyHours, dailyHours.toString());
    localStorage.setItem(STORAGE_KEYS.dependents, dependents.toString());
    localStorage.setItem(STORAGE_KEYS.regime, regime);
    localStorage.setItem(STORAGE_KEYS.period, period);
    localStorage.setItem(STORAGE_KEYS.extraDeductions, JSON.stringify(extraDeductions));
    localStorage.setItem(STORAGE_KEYS.extraGains, JSON.stringify(extraGains));
  }, [isRestored, grossSalary, monthlyHours, dailyHours, dependents, regime, period, extraDeductions, extraGains]);

  const autoInss = useMemo(() => calculateSocialSecurity(grossSalary, regime), [grossSalary, regime]);
  const autoIrrf = useMemo(
    () => calculateIncomeTax(grossSalary, manualInss ?? autoInss, dependents),
    [grossSalary, manualInss, autoInss, dependents],
  );

  const stats = useMemo(() => {
    const inss = sanitizeAmount(manualInss ?? autoInss);
    const irrf = sanitizeAmount(manualIrrf ?? autoIrrf);
    const totalExtraDeductions = sumValues(extraDeductions);
    const totalExtraGains = sumValues(extraGains);

    const netSalary = sanitizeAmount(grossSalary) - inss - irrf - totalExtraDeductions;
    const totalValue = netSalary + totalExtraGains;

    const billableHours = monthlyHours > 0 ? monthlyHours : 1;
    const hourlyRate = totalValue / billableHours;

    return {
      inss,
      irrf,
      totalExtraDeductions,
      totalExtraGains,
      netSalary,
      totalValue,
      hourlyRate,
      minuteRate: hourlyRate / 60,
      periodValue: amountForPeriod(totalValue, period, monthlyHours, dailyHours),
    };
  }, [
    grossSalary,
    monthlyHours,
    dailyHours,
    period,
    manualInss,
    autoInss,
    manualIrrf,
    autoIrrf,
    extraDeductions,
    extraGains,
  ]);

  const addExtra = (kind: ExtraKind) => {
    const newItem: ExtraItem = {
      id: crypto.randomUUID(),
      name: "",
      value: 0,
    };
    const setItems = kind === "gain" ? setExtraGains : setExtraDeductions;
    setItems((items) => [...items, newItem]);
  };

  const updateExtra = (id: string, kind: ExtraKind, field: "name" | "value", nextValue: string | number) => {
    const setItems = kind === "gain" ? setExtraGains : setExtraDeductions;
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "value" ? sanitizeAmount(Number(nextValue)) : nextValue,
            }
          : item,
      ),
    );
  };

  const removeExtra = (id: string, kind: ExtraKind) => {
    const setItems = kind === "gain" ? setExtraGains : setExtraDeductions;
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return {
    grossSalary,
    setGrossSalary,
    monthlyHours,
    setMonthlyHours,
    dailyHours,
    setDailyHours,
    dependents,
    setDependents,
    regime,
    setRegime,
    period,
    setPeriod,
    manualInss,
    setManualInss,
    manualIrrf,
    setManualIrrf,
    extraDeductions,
    extraGains,
    autoInss,
    autoIrrf,
    stats,
    addExtra,
    updateExtra,
    removeExtra,
  };
}
