#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillPath = path.join(root, "SKILL.md");
const refsDir = path.join(root, "references");
const errors = [];
// Several checks match phrases that span a hard-wrapped line. Git may check this repository out
// with CRLF endings, so normalise on read and keep those checks platform-independent.
const read = (file) => fs.readFileSync(file, "utf8").split("\r\n").join("\n");
const skill = read(skillPath);
const referenceFiles = fs.readdirSync(refsDir).filter((name) => name.endsWith(".md")).sort();
const references = referenceFiles.map((name) => ({
  name,
  text: read(path.join(refsDir, name)),
}));

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(skill.includes("CONTINUOUS_BUILD — default"), "SKILL.md must define the default mode.");
expect(skill.includes("### REVIEW_FIRST"), "SKILL.md must define REVIEW_FIRST.");
for (const stop of ["Stop 1 — Direction", "Stop 2 — Mechanism", "Stop 3 — Full experience"]) {
  expect(skill.includes(stop), "Missing authoritative stop: " + stop);
}
expect(skill.includes("Audience and evidence policy — authoritative"), "Missing evidence policy.");
expect(skill.includes("ask for all missing\ncontext in one consolidated question"),
  "Missing single-intake context rule.");

const forbiddenReferencePhrases = [
  /Only after approval/i,
  /own stopping point/i,
  /At step 11/i,
  /STOP 1\s*\//i,
  /three stopping points defined/i,
];
for (const { name, text } of references) {
  for (const pattern of forbiddenReferencePhrases) {
    if (pattern.test(text)) errors.push(name + " contains stale contract language: " + pattern);
  }
}

const mdLink = /\[[^\]]+\]\(([^)]+\.md)\)/g;
for (const file of [skillPath, ...referenceFiles.map((name) => path.join(refsDir, name))]) {
  const text = read(file);
  for (const match of text.matchAll(mdLink)) {
    const target = path.resolve(path.dirname(file), match[1]);
    expect(fs.existsSync(target), path.relative(root, file) + " has broken link: " + match[1]);
  }
}

const yaml = read(path.join(root, "agents", "openai.yaml"));
expect(yaml.includes("完成版まで連続して制作"), "Default prompt must match CONTINUOUS_BUILD.");
expect(fs.existsSync(path.join(root, "references", "craft.md")), "Missing craft.md.");
expect(fs.existsSync(path.join(root, "scripts", "verify.mjs")), "Missing browser verifier.");
expect(fs.existsSync(path.join(root, "assets", "production-record-template.md")), "Missing record template.");
expect(fs.existsSync(path.join(root, "assets", "feedback-log-template.md")), "Missing feedback template.");

const gates = read(path.join(refsDir, "quality-gates.md"));
for (const phrase of [
  "selected state is treated as a recommendation",
  "coherent explanatory document without interaction",
  "not an admin console",
  "false precision",
  "During questions",
]) expect(gates.includes(phrase), "Missing restored quality rule: " + phrase);

const verifier = read(path.join(root, "scripts", "verify.mjs"));
for (const phrase of [
  "BROWSER_NOT_AVAILABLE",
  "back to cue",
  "reset from",
  "ArrowRight",
  "reduced-motion end state",
  "notChecked",
]) expect(verifier.includes(phrase), "Verifier is missing coverage: " + phrase);

// ---- ceiling, fit, and speed rules (added with the signature-moment revision) ----
expect(skill.includes("### QUICK_BUILD"), "SKILL.md must define QUICK_BUILD.");
expect(skill.includes("## Fit check — authoritative"), "SKILL.md must define the fit check.");
for (const fit of ["STRONG_FIT", "PARTIAL_FIT", "NARRATIVE_ONLY", "Guided Narrative"]) {
  expect(skill.includes(fit), "Fit check is missing: " + fit);
}
expect(skill.includes("## Signature moment — authoritative"), "SKILL.md must define the signature moment.");
expect(skill.includes("three concepts"), "Signature moment must require three concepts.");
expect(skill.includes("ambition review"), "SKILL.md must require the ambition review.");
// the signature moment must name an understanding change, not only an effect
for (const phrase of ["not visible before the operation and understood after it",
  "is spectacle, not a signature moment"]) {
  expect(skill.includes(phrase), "Signature moment is missing its understanding-change test: " + phrase);
}
// NARRATIVE_ONLY must be evidenced, and a Guided Narrative still changes understanding in stages
for (const phrase of ["A fit class\nwithout that record is not a finding", "not a licence to\nstop designing",
  "Traverse or Accumulate"]) {
  expect(skill.includes(phrase), "Fit check is missing the anti-escape rule: " + phrase);
}
for (const phrase of ["## Ambition conditions", "16. There is a signature moment",
  "Only the human may pass conditions 8 and 18"]) {
  expect(gates.includes(phrase), "quality-gates.md is missing: " + phrase);
}
const workflow = read(path.join(refsDir, "workflow.md"));
for (const heading of ["## 3b. Signature moment", "## 7b. Ambition review"]) {
  expect(workflow.includes(heading), "workflow.md is missing: " + heading);
}
expect(fs.existsSync(path.join(refsDir, "judgment-cases.md")), "Missing judgment-cases.md.");

const runtimePath = path.join(root, "assets", "runtime", "presentation-runtime.js");
expect(fs.existsSync(runtimePath), "Missing assets/runtime/presentation-runtime.js.");
if (fs.existsSync(runtimePath)) {
  const runtime = read(runtimePath);
  for (const phrase of ["PageDown", "later(", "initialState", "data-verify-settle-ms", "prefers-reduced-motion"]) {
    expect(runtime.includes(phrase), "Runtime is missing: " + phrase);
  }
  // behaviour only: no styling, layout, or remote loading
  for (const pattern of [/\.style\./, /innerHTML/, /https?:\/\//, /fetch\(/]) {
    expect(!pattern.test(runtime), "Runtime must stay behaviour-only; found " + pattern);
  }
}

const feedback = read(path.join(root, "assets", "feedback-log-template.md"));
expect(feedback.includes("What would have made it impressive?"), "Feedback log must ask what would make it impressive.");

// Mechanism parts: worked implementations, two forms each, and each still a part rather than a
// screen. One example would become the answer; the second is what keeps the choice open.
const mechDir = path.join(root, "assets", "mechanisms");
let mechFiles = [];
try { mechFiles = fs.readdirSync(mechDir); } catch { /* reported by the next expect */ }
expect(mechFiles.includes("README.md"), "assets/mechanisms/README.md is missing.");
for (const name of ["reveal", "compare", "calculate", "inspect"]) {
  const file = `${name}.md`;
  if (!mechFiles.includes(file)) { errors.push(`Missing mechanism part: ${file}`); continue; }
  const text = read(path.join(mechDir, file));
  expect(/^## Form A —/m.test(text) && /^## Form B —/m.test(text),
    `${file} must document two forms (Form A and Form B).`);
  expect(/^## Choosing between them/m.test(text),
    `${file} must say when to choose each form.`);
  expect(text.includes("**Must not assert:**"),
    `${file} must state what the mechanism may not assert.`);
  expect(text.includes("**Needs from the source:**"),
    `${file} must state the source basis it requires.`);
  // The condition that makes the mechanism itself the wrong choice, sitting next to the code
  // that implements it — otherwise a worked example becomes a route around the guardrails.
  expect(text.includes("**Stops at:**"),
    `${file} must state when the mechanism is the wrong choice.`);
}

const result = {
  ok: errors.length === 0,
  skill: path.basename(root),
  referenceFiles: referenceFiles.length,
  errors,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
