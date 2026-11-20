import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { CURRENT_LEGAL_YEAR, type NormSource } from "@/lib/legal-tables";

const ROOT = join(__dirname, "..");
const CITATION_ROOTS = ["app", "components", "lib", "hooks", "__tests__", "tests"];
const CITATION_EXTENSIONS = new Set([".ts", ".tsx"]);
const AGGREGATOR_PATTERN = /legisweb|jusbrasil|normaslegais|guiatrabalhista|contabeis\.com/i;
const AGGREGATOR_EXEMPT_PATH = "__tests__/citation-guards.test.ts";

function citationSourceFiles(root: string): string[] {
  const absolute = join(ROOT, root);
  const found: string[] = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const path = join(absolute, entry.name);
    if (entry.isDirectory()) found.push(...citationSourceFiles(relative(ROOT, path)));
    else if (CITATION_EXTENSIONS.has(extname(entry.name))) found.push(path);
  }
  return found;
}

const ALLOWED_HOSTS = new Set([
  "planalto.gov.br",
  "www.planalto.gov.br",
  "in.gov.br",
  "www.in.gov.br",
  "gov.br",
  "www.gov.br",
  "camara.leg.br",
  "www2.camara.leg.br",
  "senado.leg.br",
  "www12.senado.leg.br",
  "legis.senado.leg.br",
  "normas.leg.br",
  "tst.jus.br",
  "www.tst.jus.br",
]);

describe("citation guards", () => {
  it("resolves every source URL to an official Brazilian public host", () => {
    const normSources = Object.values(CURRENT_LEGAL_YEAR.sources)
      .flat()
      .filter((entry): entry is NormSource => "norm" in entry);

    expect(normSources.length).toBe(9);
    for (const entry of normSources) {
      expect(ALLOWED_HOSTS.has(new URL(entry.url).hostname)).toBe(true);
    }
  });

  it("fails an aggregator URL disguised as an official one", () => {
    expect(ALLOWED_HOSTS.has(new URL("https://legisweb.com.br/gov.br/x").hostname)).toBe(false);
  });

  it("has no citation anywhere in the tree pointing at a commercial aggregator", () => {
    const files = CITATION_ROOTS.flatMap(citationSourceFiles);
    const total = files.length;

    expect(total).toBeGreaterThanOrEqual(130);
    for (const root of CITATION_ROOTS) {
      expect(files.some((file) => relative(ROOT, file).startsWith(`${root}/`))).toBe(true);
    }

    const exempt = files.filter((file) => relative(ROOT, file) === AGGREGATOR_EXEMPT_PATH);
    const checked = files.filter((file) => relative(ROOT, file) !== AGGREGATOR_EXEMPT_PATH);

    expect(exempt.length).toBe(1);
    expect(checked.length + 1).toBe(total);

    const offenders = checked
      .filter((file) => AGGREGATOR_PATTERN.test(readFileSync(file, "utf8")))
      .map((file) => relative(ROOT, file));

    expect(offenders).toEqual([]);
  });
});
