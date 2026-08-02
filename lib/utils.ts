import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const AMOUNT_FORMATTER = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const TIME_FORMATTER = new Intl.DateTimeFormat("pt-BR", { timeStyle: "medium" });

export function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

export function formatCurrencySimple(value: number): string {
  return AMOUNT_FORMATTER.format(value);
}

export function formatClockTime(date: Date): string {
  return TIME_FORMATTER.format(date);
}

export function parseCurrency(value: string): number {
  const digitsOnly = value.replace(/\D/g, "");
  const parsed = Number(digitsOnly) / 100;
  return Number.isFinite(parsed) ? parsed : 0;
}
