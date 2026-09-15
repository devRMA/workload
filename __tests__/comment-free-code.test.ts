import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SOURCE_DIRECTORIES = ["app", "components", "hooks", "lib", "scripts", "__tests__", "tests"];
const ROOT_CONFIG_FILES = ["playwright.config.ts", "vitest.config.ts", "vitest.setup.ts", "next.config.ts"];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".mjs"]);

const TOOLING_DIRECTIVE = /^(biome-ignore|@ts-expect-error|eslint-disable|v8 ignore|c8 ignore)/;
const NORM_CITATION = /\b(CLT|Lei|Decreto|Portaria|Súmula|OJ|IN RFB|CF\/88)\b/;
const NORM_CITATION_DIRECTORIES = ["lib"];

type Comment = { file: string; line: number; text: string };

function sourceFiles(directory: string): string[] {
  const absolute = join(ROOT, directory);
  const found: string[] = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const path = join(absolute, entry.name);
    if (entry.isDirectory()) found.push(...sourceFiles(relative(ROOT, path)));
    else if (SOURCE_EXTENSIONS.has(extname(entry.name)) && !entry.name.endsWith(".d.ts")) found.push(path);
  }
  return found;
}

function commentsIn(path: string): Comment[] {
  const source = readFileSync(path, "utf8");
  const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  const file = relative(ROOT, path);
  const ranges = new Map<number, ts.CommentRange>();

  const visit = (node: ts.Node) => {
    for (const range of ts.getLeadingCommentRanges(source, node.getFullStart()) ?? []) ranges.set(range.pos, range);
    for (const range of ts.getTrailingCommentRanges(source, node.getEnd()) ?? []) ranges.set(range.pos, range);
    node.forEachChild(visit);
  };
  visit(parsed);

  return [...ranges.values()].map((range) => ({
    file,
    line: parsed.getLineAndCharacterOfPosition(range.pos).line + 1,
    text: source
      .slice(range.pos, range.end)
      .replace(/^\/\/+|^\/\*+|\*+\/$/g, "")
      .trim(),
  }));
}

function isAllowed(comment: Comment): boolean {
  if (TOOLING_DIRECTIVE.test(comment.text)) return true;
  const directory = comment.file.split("/")[0];
  return NORM_CITATION_DIRECTORIES.includes(directory) && NORM_CITATION.test(comment.text);
}

describe("AGENTS.md §8 — shipped code carries no comments", () => {
  it("has no comment outside a tooling directive or a norm citation in lib/", () => {
    const offenders = [
      ...SOURCE_DIRECTORIES.flatMap(sourceFiles),
      ...ROOT_CONFIG_FILES.map((file) => join(ROOT, file)).filter(existsSync),
    ]
      .flatMap(commentsIn)
      .filter((comment) => !isAllowed(comment))
      .map((comment) => `${comment.file}:${comment.line} — ${comment.text.slice(0, 80)}`);

    expect(offenders).toEqual([]);
  });
});
