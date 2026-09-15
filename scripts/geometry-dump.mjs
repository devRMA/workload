#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const ROUTES = ["/", "/custo-da-hora"];
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];
const THEMES = ["light", "dark"];
const ROUND_PRECISION = 2;
const MAX_DELTA_PX = 0.01;

const FIXED_SYSTEM_TIME = "2025-01-06T09:00:00";

function round(value) {
  return Number(value.toFixed(ROUND_PRECISION));
}

function combinationKey(route, viewport, theme) {
  return `${route}__${viewport.width}x${viewport.height}__${theme}`;
}

function isInsideDs1Footer(path) {
  return path.split(">").some((segment) => segment.startsWith("footer:nth-child("));
}

function isAncestorOfADs1FooterPath(path, allPathsInCombination) {
  const prefix = `${path}>`;
  for (const candidate of allPathsInCombination) {
    if (candidate.startsWith(prefix) && isInsideDs1Footer(candidate)) return true;
  }
  return false;
}

function isZeroBox(entry) {
  return entry.width === 0 && entry.height === 0 && entry.x === 0 && entry.y === 0;
}

async function dump(baseUrl) {
  const browser = await chromium.launch();
  const combinations = {};

  try {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        for (const theme of THEMES) {
          const context = await browser.newContext({ viewport, colorScheme: theme });
          await context.clock.setFixedTime(new Date(FIXED_SYSTEM_TIME));
          const page = await context.newPage();
          await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

          const elements = await page.evaluate(() => {
            function pathFor(element) {
              const segments = [];
              let current = element;
              while (current && current !== document.body) {
                const parent = current.parentElement;
                const index = parent ? Array.from(parent.children).indexOf(current) + 1 : 1;
                segments.unshift(`${current.tagName.toLowerCase()}:nth-child(${index})`);
                current = parent;
              }
              return segments.join(">");
            }

            const seen = new Set();
            for (const root of document.querySelectorAll("header, main, footer")) {
              seen.add(root);
              for (const descendant of root.querySelectorAll("*")) {
                seen.add(descendant);
              }
            }

            return [...seen].map((element) => {
              const rect = element.getBoundingClientRect();
              return { path: pathFor(element), x: rect.x, y: rect.y, width: rect.width, height: rect.height };
            });
          });

          combinations[combinationKey(route, viewport, theme)] = elements.map((entry) => ({
            path: entry.path,
            x: round(entry.x),
            y: round(entry.y),
            width: round(entry.width),
            height: round(entry.height),
          }));

          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }

  return combinations;
}

function loadDump(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function diff(beforePath, afterPath) {
  const before = loadDump(beforePath);
  const after = loadDump(afterPath);
  const combinationKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  const permitted = [];
  const rejections = [];

  for (const key of combinationKeys) {
    const beforeByPath = new Map((before[key] ?? []).map((entry) => [entry.path, entry]));
    const afterByPath = new Map((after[key] ?? []).map((entry) => [entry.path, entry]));
    const paths = new Set([...beforeByPath.keys(), ...afterByPath.keys()]);

    for (const path of paths) {
      const beforeEntry = beforeByPath.get(path);
      const afterEntry = afterByPath.get(path);
      const isFooterRelated = isInsideDs1Footer(path) || isAncestorOfADs1FooterPath(path, paths);

      if (!beforeEntry || !afterEntry) {
        const survivingEntry = beforeEntry ?? afterEntry;
        if (isZeroBox(survivingEntry)) continue;
        const record = { combination: key, path, before: beforeEntry ?? null, after: afterEntry ?? null };
        if (isFooterRelated) permitted.push(record);
        else rejections.push(record);
        continue;
      }

      const delta = {
        x: Number((afterEntry.x - beforeEntry.x).toFixed(ROUND_PRECISION)),
        y: Number((afterEntry.y - beforeEntry.y).toFixed(ROUND_PRECISION)),
        width: Number((afterEntry.width - beforeEntry.width).toFixed(ROUND_PRECISION)),
        height: Number((afterEntry.height - beforeEntry.height).toFixed(ROUND_PRECISION)),
      };

      const hasDelta = Object.values(delta).some((value) => Math.abs(value) > MAX_DELTA_PX);
      if (!hasDelta) continue;

      const record = { combination: key, path, before: beforeEntry, after: afterEntry, delta };
      if (isFooterRelated) {
        permitted.push(record);
      } else {
        rejections.push(record);
      }
    }
  }

  return { permitted, rejections };
}

function parseArgs(argv) {
  const args = { flag: null, values: [] };
  for (const token of argv) {
    if (token === "--out" || token === "--diff") {
      args.flag = token;
    } else if (token === "--base-url") {
      args.expectBaseUrl = true;
    } else if (args.expectBaseUrl) {
      args.baseUrl = token;
      args.expectBaseUrl = false;
    } else {
      args.values.push(token);
    }
  }
  return args;
}

async function main() {
  const argv = process.argv.slice(2);
  const { flag, values, baseUrl } = parseArgs(argv);

  if (flag === "--out") {
    const [outPath] = values;
    if (!outPath) throw new Error("--out requires a file path");
    const combinations = await dump(baseUrl ?? "http://localhost:3000");
    writeFileSync(outPath, JSON.stringify(combinations, null, 2));
    console.log(`geometry-dump: wrote ${outPath}`);
    return;
  }

  if (flag === "--diff") {
    const [beforePath, afterPath] = values;
    if (!beforePath || !afterPath) throw new Error("--diff requires <before.json> <after.json>");
    const { permitted, rejections } = diff(beforePath, afterPath);

    console.log(`geometry-dump: ${permitted.length} permitted delta(s) inside the DS1 footer subtree`);
    console.log(JSON.stringify(permitted, null, 2));

    console.log(`geometry-dump: ${rejections.length} rejection(s)`);
    console.log(JSON.stringify(rejections, null, 2));

    process.exit(rejections.length > 0 ? 1 : 0);
  }

  throw new Error("usage: geometry-dump.mjs --out <file.json> [--base-url <url>] | --diff <before.json> <after.json>");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
