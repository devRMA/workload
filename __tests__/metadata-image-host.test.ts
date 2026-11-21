import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const APP_ROOT = "app";
const ORIGIN_DECLARATION_FILE = "lib/structured-data.ts";
const IMAGE_ROUTE_FILES = ["opengraph-image.tsx", "twitter-image.tsx"];
const DEPLOYMENT_HOST = "vercel.app";
const DECLARED_ORIGIN = "https://workload.devrma.com";
const FALLBACK_MECHANISM =
  "Next's getSocialImageMetadataBaseFallback overrides metadataBase for file-convention image routes, so the segment must declare openGraph.images and twitter.images itself";

const OPEN_GRAPH_IMAGES_PATTERN = /openGraph:\s*\{[\s\S]*?\bimages:\s*\[/;
const TWITTER_IMAGES_PATTERN = /\btwitter:\s*\{[\s\S]*?\bimages:\s*\[/;

function appFiles(): string[] {
  const entries = readdirSync(join(process.cwd(), APP_ROOT), { recursive: true }) as string[];
  return entries.filter((entry) => entry.endsWith(".tsx")).map((entry) => join(APP_ROOT, entry));
}

function appSourceFiles(): string[] {
  const entries = readdirSync(join(process.cwd(), APP_ROOT), { recursive: true }) as string[];
  return entries
    .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
    .map((entry) => join(APP_ROOT, entry));
}

function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

function imageRouteDirectories(): string[] {
  const directories = appFiles()
    .filter((file) => IMAGE_ROUTE_FILES.includes(file.split("/").pop() ?? ""))
    .map(dirname);
  return [...new Set(directories)];
}

describe("metadata image host", () => {
  it("gives every route that ships an image route a page that declares its own social images", () => {
    const directories = imageRouteDirectories();
    expect(directories.length).toBeGreaterThan(0);

    const violations: string[] = [];
    for (const directory of directories) {
      const page = join(directory, "page.tsx");
      if (!appFiles().includes(page)) {
        violations.push(`${directory} has an image route but no page.tsx: ${FALLBACK_MECHANISM}`);
        continue;
      }

      const source = readSource(page);
      if (!OPEN_GRAPH_IMAGES_PATTERN.test(source)) {
        violations.push(`${directory} declares no openGraph.images: ${FALLBACK_MECHANISM}`);
      }
      if (!TWITTER_IMAGES_PATTERN.test(source)) {
        violations.push(`${directory} declares no twitter.images: ${FALLBACK_MECHANISM}`);
      }
    }

    expect(violations).toEqual([]);
  });

  it("names no deployment host anywhere under app/", () => {
    const offenders = appSourceFiles().filter((file) => readSource(file).includes(DEPLOYMENT_HOST));

    expect(offenders).toEqual([]);
  });

  it("declares the origin once, in lib/, and nowhere under app/", () => {
    const offenders = appSourceFiles().filter((file) => readSource(file).includes(DECLARED_ORIGIN));

    expect(offenders).toEqual([]);
    expect(readSource(ORIGIN_DECLARATION_FILE)).toContain(DECLARED_ORIGIN);
  });
});
