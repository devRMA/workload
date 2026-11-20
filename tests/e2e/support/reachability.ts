import type { Locator, Page } from "@playwright/test";
import { CURRENT_LEGAL_YEAR } from "../../../lib/legal-tables";

export interface Box {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export interface FixedBox extends Box {
  tag: string;
  position: string;
  label: string;
}

export const REACHABILITY_VIEWPORT = { width: 390, height: 844 } as const;
export const LR42A_VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const;
export const ROUTES = ["/", "/custo-da-hora"] as const;
export const THEMES = ["dark", "light"] as const;
export const STORAGE_STATES = ["empty", "seeded", "monthlyHours=0", "incoherent"] as const;

const CONSENT_STORAGE_KEY = "workload_cookie_consent";

export const STORAGE_SEEDS: Record<(typeof STORAGE_STATES)[number], Record<string, string>> = {
  empty: {},
  seeded: { grossSalary: "4200", monthlyHours: "220", workMinutes: "528" },
  "monthlyHours=0": { grossSalary: "4200", monthlyHours: "0", workMinutes: "528" },
  incoherent: { grossSalary: "4200", monthlyHours: "240", workMinutes: "480" },
};

export const EXPECTED_LINES_ON_FIRST_SCREEN: Record<(typeof ROUTES)[number], { sighted: number; assistive: number }> = {
  "/": { sighted: 8, assistive: 1 },
  "/custo-da-hora": { sighted: 9, assistive: 1 },
};

export const EXPECTED_LR42A_CONTROL_COUNT = 6;

export const EXPECTED_LR35_SURFACE_COUNT: Record<(typeof ROUTES)[number], number> = {
  "/": 4,
  "/custo-da-hora": 4,
};

const ANSWER_PANEL_ANCHORS: Record<(typeof ROUTES)[number], readonly string[]> = {
  "/": ["Saída Prevista", "Saída Real"],
  "/custo-da-hora": ["Valor por Hora"],
};

export async function seedStorage(page: Page, route: string, state: (typeof STORAGE_STATES)[number]): Promise<void> {
  const seed = STORAGE_SEEDS[state];
  if (Object.keys(seed).length > 0) {
    await page.goto(route, { waitUntil: "load" });
    await page.evaluate((values) => {
      for (const [key, value] of Object.entries(values)) {
        localStorage.setItem(key, value);
      }
    }, seed);
  }
  await page.goto(route, { waitUntil: "load" });
}

export async function clearConsent(page: Page): Promise<void> {
  await page.addInitScript((key) => localStorage.removeItem(key), CONSENT_STORAGE_KEY);
}

export async function fixedBoxes(page: Page): Promise<FixedBox[]> {
  return page.evaluate(() => {
    const elements = [...document.querySelectorAll("body *")];
    return elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          (style.position === "fixed" || style.position === "sticky") && element.getBoundingClientRect().height > 0
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          position: getComputedStyle(element).position,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          label: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30),
        };
      });
  });
}

export function intersects(a: Box, b: Box): boolean {
  return !(b.bottom <= a.top || b.top >= a.bottom || b.right <= a.left || b.left >= a.right);
}

export interface ScrollRange {
  from: number;
  to: number;
}

export interface ClearingRangeInput {
  docTop: number;
  height: number;
  left: number;
  right: number;
  viewportHeight: number;
  maxScroll: number;
  fixed: readonly Box[];
}

const round1 = (value: number) => Math.round(value * 10) / 10;

export function clearingScrollRanges(input: ClearingRangeInput): ScrollRange[] {
  const { docTop, height, left, right, viewportHeight, maxScroll, fixed } = input;
  const from = Math.max(0, docTop + height - viewportHeight);
  const to = Math.min(maxScroll, docTop);
  if (to < from) return [];

  let ranges: ScrollRange[] = [{ from, to }];
  for (const box of fixed) {
    if (box.right <= left || box.left >= right) continue;
    const blockedFrom = docTop - box.bottom;
    const blockedTo = docTop + height - box.top;
    ranges = ranges.flatMap((range) => {
      if (blockedTo <= range.from || blockedFrom >= range.to) return [range];
      const kept: ScrollRange[] = [];
      if (range.from < blockedFrom) kept.push({ from: range.from, to: Math.min(range.to, blockedFrom) });
      if (range.to > blockedTo) kept.push({ from: Math.max(range.from, blockedTo), to: range.to });
      return kept;
    });
  }
  return ranges.map((range) => ({ from: round1(range.from), to: round1(range.to) }));
}

export async function answerPanelLines(
  page: Page,
  route: string,
): Promise<{ text: string; top: number; bottom: number; occludedBy: string[]; assistiveOnly: boolean }[]> {
  const anchorLabels = ANSWER_PANEL_ANCHORS[route as (typeof ROUTES)[number]];
  return page.evaluate((labels) => {
    const isVisuallyHidden = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return rect.width <= 1 && rect.height <= 1;
    };

    const all = [...document.querySelectorAll("body *")];
    const findLeaf = (label: string) =>
      all.find(
        (element) =>
          (element.textContent ?? "").includes(label) &&
          ![...element.children].some((child) => (child.textContent ?? "").includes(label)),
      );

    let anchor: Element | undefined;
    for (const label of labels) {
      anchor = findLeaf(label);
      if (anchor) break;
    }
    if (!anchor) throw new Error(`no answer panel anchor found among: ${labels.join(", ")}`);

    let host: Element = anchor;
    while (host.parentElement && host.parentElement !== document.body) {
      const parent = host.parentElement;
      const parentPosition = getComputedStyle(parent).position;
      if (parentPosition === "fixed" || parentPosition === "sticky") break;
      if (parent.getBoundingClientRect().height > innerHeight * 1.2) break;
      host = parent;
    }

    const fixed = all
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          (style.position === "fixed" || style.position === "sticky") && element.getBoundingClientRect().height > 0
        );
      })
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        label: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30),
        rect: element.getBoundingClientRect(),
      }));

    const occludingLabels = (rect: DOMRect) =>
      fixed
        .filter(
          (entry) =>
            !(
              entry.rect.bottom <= rect.top ||
              entry.rect.top >= rect.bottom ||
              entry.rect.right <= rect.left ||
              entry.rect.left >= rect.right
            ),
        )
        .map((entry) => `${entry.tag}/${entry.label}`);

    const isAssistiveOnly = (element: Element) => {
      let node: Element | null = element;
      while (node) {
        if (isVisuallyHidden(node)) return true;
        if (node === host) break;
        node = node.parentElement;
      }
      return false;
    };

    return [...host.querySelectorAll("*")]
      .filter((element) => element.children.length === 0 && (element.textContent ?? "").trim())
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40),
          top: Math.round(rect.top * 10) / 10,
          bottom: Math.round(rect.bottom * 10) / 10,
          occludedBy: occludingLabels(rect),
          assistiveOnly: isAssistiveOnly(element),
        };
      })
      .filter((line) => line.top < innerHeight && line.bottom > 0);
  }, anchorLabels);
}

export function citationParagraph(page: Page): Locator {
  return page
    .locator("p")
    .filter({ has: page.getByRole("link", { name: CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm }) });
}
