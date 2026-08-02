export function readStoredNumber(key: string, fallback: number): number {
  const raw = localStorage.getItem(key);
  if (raw === null || raw.trim() === "") return fallback;

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function readStoredFlag(key: string, fallback: boolean): boolean {
  const raw = localStorage.getItem(key);
  if (raw !== "true" && raw !== "false") return fallback;
  return raw === "true";
}

export function readStoredOptionalNumber(key: string): number | null {
  const raw = localStorage.getItem(key);
  if (raw === null || raw.trim() === "") return null;

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function writeStoredOptionalNumber(key: string, value: number | null): void {
  if (value === null) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, value.toString());
}

export function readStoredList<TItem>(key: string, isItem: (candidate: unknown) => candidate is TItem): TItem[] {
  const raw = localStorage.getItem(key);
  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isItem) : [];
  } catch {
    return [];
  }
}
