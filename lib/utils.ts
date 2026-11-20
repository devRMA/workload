import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { extendTailwindMerge } from "tailwind-merge";

const TYPE_STEPS = [
  "numeral",
  "display",
  "title",
  "metric",
  "heading",
  "input",
  "body",
  "body-sm",
  "label",
  "caption",
  "overline",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPE_STEPS] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PLACEHOLDER_CLOCK = "--:--:--";

const NON_DIGITS = /\D/g;

export function digitsOnly(text: string): string {
  return text.replace(NON_DIGITS, "");
}

export function countDigits(text: string): number {
  return digitsOnly(text).length;
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

export function formatTimeLabel(timestamp: string): string {
  const parsed = new Date(timestamp);
  return Number.isNaN(parsed.getTime()) ? "--:--" : format(parsed, "HH:mm");
}

export function formatIsoDate(isoDate: string): string {
  return isoDate.split("-").reverse().join("/");
}

export function parseCurrency(value: string): number {
  const parsed = Number(digitsOnly(value)) / 100;
  return Number.isFinite(parsed) ? parsed : 0;
}
