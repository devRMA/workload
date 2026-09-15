import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { VIEW_HEADINGS } from "@/lib/calculator-view";

const DESCRIPTOR_SOURCES = [
  "app/page.tsx",
  "app/opengraph-image.tsx",
  "app/twitter-image.tsx",
  "lib/og-image.tsx",
  "lib/calculator-view.ts",
];

const SOURCE_ROOTS = ["app", "components", "lib"];

function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

function walkSourceFiles(): string[] {
  const files: string[] = [];
  for (const root of SOURCE_ROOTS) {
    const entries = readdirSync(join(process.cwd(), root), { recursive: true }) as string[];
    for (const entry of entries) {
      if (/\.tsx?$/.test(entry)) {
        files.push(join(root, entry));
      }
    }
  }
  return files;
}

describe("copy guards", () => {
  it("no descriptor names a compensation regime or an accumulation", () => {
    const bannedTerm =
      /compensaç|compensar|acúmul|acumul|banco|crédito de horas|débito de horas|horas a compensar|saldo do mês|saldo mensal|histórico|registro de ponto|controle de ponto|folha de ponto|espelho de ponto/i;

    for (const source of DESCRIPTOR_SOURCES) {
      expect(readSource(source)).not.toMatch(bannedTerm);
    }
  });

  it("every `saldo` in a descriptor is scoped to the day", () => {
    for (const source of DESCRIPTOR_SOURCES) {
      expect(readSource(source).match(/saldo(?!\s+(do dia|diário|de hoje))/gi)).toBeNull();
    }
  });

  it("no descriptor qualifies the night premium as complete", () => {
    const bannedQualifier =
      /completo|todas as regras da CLT|todos os casos|qualquer jornada noturna|Súmula 60|prorrogaç/i;

    for (const source of DESCRIPTOR_SOURCES) {
      expect(readSource(source)).not.toMatch(bannedQualifier);
    }
  });

  it("the two root alts and the JSON-LD descriptor are the same string", () => {
    const expectedDescriptor = `WorkLoad: ${VIEW_HEADINGS.work}`;

    expect(readSource("app/opengraph-image.tsx")).toContain(`alt = "${expectedDescriptor}"`);
    expect(readSource("app/twitter-image.tsx")).toContain(`alt = "${expectedDescriptor}"`);
  });

  it("`lib/` never calls R$ 8.475,55 the contribution", () => {
    expect(readSource("lib/payroll.ts")).not.toContain("teto de contribuição");
    expect(readSource("lib/payroll.ts")).not.toContain("teto do INSS");
  });

  it("no user-visible em-dash or en-dash survives", () => {
    for (const file of walkSourceFiles()) {
      for (const line of readSource(file).split("\n")) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("//") || trimmedLine.startsWith("*")) continue;

        expect(line).not.toMatch(/[—–]/);
      }
    }
  });

  it("no icon comes from the retired library", () => {
    for (const file of walkSourceFiles()) {
      expect(readSource(file)).not.toContain("lucide-react");
    }
  });

  it("no viewport-unit regression", () => {
    for (const file of walkSourceFiles()) {
      const text = readSource(file);
      expect(text).not.toContain("min-h-screen");
      expect(text).not.toContain("h-screen");
    }
  });
});
