#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const COMPONENTS_ROOT = "components";

const PREFIX = "(p|px|py|pt|pb|m|mb|mt|gap|space-y|bottom|left|right)";
const SUBSTITUTIONS = [
  [new RegExp(`\\b${PREFIX}-3xl\\b`, "g"), "$1-16"],
  [new RegExp(`\\b${PREFIX}-2xl\\b`, "g"), "$1-12"],
  [new RegExp(`\\b${PREFIX}-hair\\b`, "g"), "$1-0.5"],
  [new RegExp(`\\b${PREFIX}-xs\\b`, "g"), "$1-2"],
  [new RegExp(`\\b${PREFIX}-sm\\b`, "g"), "$1-3"],
  [new RegExp(`\\b${PREFIX}-md\\b`, "g"), "$1-4"],
  [new RegExp(`\\b${PREFIX}-lg\\b`, "g"), "$1-6"],
  [new RegExp(`\\b${PREFIX}-xl\\b`, "g"), "$1-8"],
  [/max\(var\(--spacing-lg\)/g, "max(calc(var(--spacing)*6)"],
  [/max\(var\(--spacing-md\)/g, "max(calc(var(--spacing)*4)"],
  [/var\(--spacing-xl\)/g, "var(--spacing)*8"],
];

function forward(line) {
  return SUBSTITUTIONS.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), line);
}

function walkComponentFiles() {
  const files = [];
  const entries = readdirSync(join(process.cwd(), COMPONENTS_ROOT), { recursive: true });
  for (const entry of entries) {
    if (/\.tsx$/.test(entry)) {
      files.push(join(COMPONENTS_ROOT, entry));
    }
  }
  return files;
}

function readAtRef(ref, path) {
  return execFileSync("git", ["show", `${ref}:${path}`], { encoding: "utf8" });
}

function parseArgs(argv) {
  const refIndex = argv.indexOf("--ref");
  return refIndex === -1 ? "HEAD" : argv[refIndex + 1];
}

function main() {
  const ref = parseArgs(process.argv.slice(2));
  const deviations = [];

  for (const path of walkComponentFiles()) {
    const before = readAtRef(ref, path).split("\n");
    const after = readFileSync(path, "utf8").split("\n");

    if (before.length !== after.length) {
      deviations.push(`${path}: line count changed (${before.length} → ${after.length})`);
      continue;
    }

    for (let index = 0; index < before.length; index += 1) {
      const expected = forward(before[index]);
      const actual = after[index];
      if (expected !== actual) {
        deviations.push(`${path}:${index + 1}\n  expected: ${expected}\n  actual:   ${actual}`);
      }
    }
  }

  if (deviations.length > 0) {
    console.error(deviations.join("\n"));
    process.exit(1);
  }

  console.log("PROOF OK — every changed line is exactly the sanctioned substitution");
}

main();
