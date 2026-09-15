import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const NUMERIC_SCALE_RULE_MESSAGE =
  "--spacing-<name> silently overrides the container-scale entry of the same name; see DESIGN.md, the Numeric Scale Rule";

const SOURCE_ROOTS = ["app", "components"];
const NAMED_SPACING_DECLARATION_PATTERN = /--spacing-([a-zA-Z0-9.]+)\s*:/g;
const NAMED_SPACING_OCCURRENCE_PATTERN = /--spacing-([a-zA-Z0-9.]+)\b/g;
const NAMED_SPACING_VAR_READ_PATTERN = /var\(--spacing-([a-zA-Z0-9.]+)\)/g;
const NAMED_SPACING_UTILITY_PATTERN =
  /\b(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-y|space-x|inset|inset-x|inset-y|top|right|bottom|left)-(hair|xs|sm|md|lg|xl|2xl|3xl)\b/g;

function isNumericSuffix(suffix: string): boolean {
  return /^\d+(\.\d+)?$/.test(suffix);
}

function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

function walkFiles(extensionPattern: RegExp): string[] {
  const files: string[] = [];
  for (const root of SOURCE_ROOTS) {
    const entries = readdirSync(join(process.cwd(), root), { recursive: true }) as string[];
    for (const entry of entries) {
      if (extensionPattern.test(entry)) {
        files.push(join(root, entry));
      }
    }
  }
  return files;
}

function findNamedSpacingDeclarations(content: string): string[] {
  return [...content.matchAll(NAMED_SPACING_DECLARATION_PATTERN)]
    .map((match) => match[1])
    .filter((suffix) => !isNumericSuffix(suffix));
}

function findNamedSpacingOccurrences(content: string): string[] {
  return [...content.matchAll(NAMED_SPACING_OCCURRENCE_PATTERN)]
    .map((match) => match[1])
    .filter((suffix) => !isNumericSuffix(suffix));
}

function findNamedSpacingVarReads(content: string): string[] {
  return [...content.matchAll(NAMED_SPACING_VAR_READ_PATTERN)]
    .map((match) => match[1])
    .filter((suffix) => !isNumericSuffix(suffix));
}

function findNamedSpacingUtilities(content: string): string[] {
  return [...content.matchAll(NAMED_SPACING_UTILITY_PATTERN)].map((match) => `${match[1]}-${match[2]}`);
}

function extractFrontmatterSpacingKeys(designMarkdown: string): string[] {
  const lines = designMarkdown.split("\n");
  const spacingLineIndex = lines.indexOf("spacing:");
  if (spacingLineIndex === -1) return [];

  const keys: string[] = [];
  for (let index = spacingLineIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^ {2}([^:]+):/);
    if (!match) break;
    keys.push(match[1].trim().replace(/^"(.*)"$/, "$1"));
  }
  return keys;
}

describe("spacing guards", () => {
  it(`app/globals.css declares no --spacing-<name> key (${NUMERIC_SCALE_RULE_MESSAGE})`, () => {
    const namedKeys = findNamedSpacingDeclarations(readSource("app/globals.css"));
    expect(namedKeys, NUMERIC_SCALE_RULE_MESSAGE).toEqual([]);
  });

  it("no var(--spacing-<name>) read survives anywhere under app/ or components/", () => {
    const violations: string[] = [];
    for (const file of walkFiles(/\.(ts|tsx|css)$/)) {
      for (const suffix of findNamedSpacingVarReads(readSource(file))) {
        violations.push(`${file}: var(--spacing-${suffix})`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("no spacing utility with a named suffix survives anywhere under app/ or components/", () => {
    const violations: string[] = [];
    for (const file of walkFiles(/\.(ts|tsx|css)$/)) {
      for (const utility of findNamedSpacingUtilities(readSource(file))) {
        violations.push(`${file}: ${utility}`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("DESIGN.md contains no --spacing-<non-numeric> occurrence anywhere in the file", () => {
    const occurrences = findNamedSpacingOccurrences(readSource("DESIGN.md"));
    expect(occurrences).toEqual([]);
  });

  it("every key under DESIGN.md's frontmatter spacing: block parses as a number", () => {
    const keys = extractFrontmatterSpacingKeys(readSource("DESIGN.md"));
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expect(Number.isNaN(Number(key)), `spacing key "${key}" does not parse as a number`).toBe(false);
    }
  });
});
