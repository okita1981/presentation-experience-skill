#!/usr/bin/env node
// Browser verification for a presenter-led HTML experience.
// Checks, at 1440px and 375px:
//   - every cue: collisions between [data-verify-box] elements
//   - back navigation restores each earlier cue's state exactly
//   - Reset returns to the opening state from the end AND from a middle cue
//   - keyboard advance works from the opening and after clicking a control
//   - reduced motion reaches the same end state with no collisions
//   - no console/page errors and no non-local requests
// Honest blockers: PLAYWRIGHT_NOT_AVAILABLE, BROWSER_NOT_AVAILABLE, HTML_NOT_FOUND.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const target = process.argv[2];
if (!target || target === "--help") {
  console.log("Usage: node scripts/verify.mjs path/to/experience.html");
  console.log("Requires playwright (or playwright-core) with an installed Chromium.");
  console.log("Optional: PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chrome");
  process.exit(target ? 0 : 1);
}

const blocker = (code, extra = {}) => {
  console.log(JSON.stringify({ ok: false, blocker: code, ...extra,
    note: "Run the same checks with an available browser tool; do not claim automated verification." }, null, 2));
  process.exit(2);
};

const absolute = path.resolve(target);
if (!fs.existsSync(absolute)) blocker("HTML_NOT_FOUND", { path: absolute });

let chromium;
for (const name of ["playwright", "playwright-core"]) {
  try { ({ chromium } = await import(name)); break; } catch {}
}
if (!chromium) blocker("PLAYWRIGHT_NOT_AVAILABLE");

let browser;
try {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;
  browser = await chromium.launch({ headless: true, executablePath });
} catch (error) {
  blocker("BROWSER_NOT_AVAILABLE", { detail: String(error.message || error).split("\n")[0] });
}

const report = { ok: true, file: absolute, viewports: [], errors: [], warnings: [] };
const fail = (msg) => { report.errors.push(msg); report.ok = false; };
const MAX_CUES = 250;

// ---------- page helpers ----------

const snapshot = (page) => page.evaluate(() => {
  const root = document.querySelector("[data-presentation-root]") || document.body;
  const explicit = root.getAttribute("data-state-hash");
  if (explicit) return explicit;
  // data-motion is the runtime's reduced-motion flag; it legitimately differs between modes.
  const IGNORE = new Set(["data-state-hash", "data-verify-settle-ms", "data-motion", "tabindex"]);
  const walk = (node) => ({
    tag: node.tagName,
    attrs: [...node.attributes]
      // class="" left behind by classList.remove() means the same as no class attribute
      .filter((a) => !IGNORE.has(a.name) && !((a.name === "class" || a.name === "style") && !a.value.trim()))
      .map((a) => a.name === "class" ? [a.name, [...node.classList].sort().join(" ")] : [a.name, a.value])
      .sort(),
    disabled: node.disabled === true,
    text: node.children.length ? "" : (node.textContent || "").trim(),
    children: [...node.children].map(walk),
  });
  return JSON.stringify(walk(root));
});

const cueId = (page) => page.evaluate(() =>
  (document.querySelector("[data-presentation-root]") || document.body).getAttribute("data-cue"));

const collisions = (page) => page.evaluate(() => {
  const visible = [...document.querySelectorAll("[data-verify-box]")].filter((el) => {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05 &&
      r.width > 1 && r.height > 1;
  });
  const hits = [];
  for (let i = 0; i < visible.length; i += 1) {
    for (let j = i + 1; j < visible.length; j += 1) {
      const a = visible[i]; const b = visible[j];
      if (a.contains(b) || b.contains(a)) continue; // nesting is not a collision
      if (a.closest("[data-verify-overlap='allow']") || b.closest("[data-verify-overlap='allow']")) continue;
      const x = a.getBoundingClientRect(); const y = b.getBoundingClientRect();
      const w = Math.min(x.right, y.right) - Math.max(x.left, y.left);
      const h = Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top);
      if (w > 2 && h > 2) hits.push({
        a: a.id || a.getAttribute("data-verify-box") || a.tagName,
        b: b.id || b.getAttribute("data-verify-box") || b.tagName,
        overlap: [Math.round(w), Math.round(h)],
      });
    }
  }
  return { candidates: visible.length, hits };
});

async function settle(page) {
  const ms = await page.evaluate(() => Number(
    (document.querySelector("[data-presentation-root]") || document.body)
      .getAttribute("data-verify-settle-ms") || 900));
  await page.waitForTimeout(Math.min(Math.max(ms, 50), 3000));
}

async function press(page, selector) {
  const el = page.locator(selector).first();
  if (!(await el.count())) return "missing";
  if (await el.isDisabled().catch(() => false)) return "disabled";
  if (!(await el.isVisible().catch(() => false))) return "hidden";
  try { await el.click({ timeout: 3000 }); } catch { return "unclickable"; }
  await settle(page);
  return "clicked";
}

async function open(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await settle(page);
}

// Walk forward from the current state; return [{cue, state, collisions}] including the start.
async function walkForward(page, label) {
  const states = [];
  for (let i = 0; i <= MAX_CUES; i += 1) {
    const state = await snapshot(page);
    const cue = await cueId(page);
    const overlap = await collisions(page);
    states.push({ cue, state, overlap });
    for (const hit of overlap.hits) fail(`${label} cue ${cue ?? i}: overlap ${JSON.stringify(hit)}`);
    const result = await press(page, "[data-verify-next]");
    if (result !== "clicked") break;
    if ((await snapshot(page)) === state) break;
  }
  return states;
}

// ---------- run ----------

const url = pathToFileURL(absolute).href;

for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
  const vw = `${viewport.width}px`;
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const consoleErrors = []; const pageErrors = []; const externalRequests = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  page.on("request", (r) => {
    const u = r.url();
    if (!/^(file|data|blob|about):/.test(u)) externalRequests.push(u);
  });

  await open(page, url);
  if (!(await page.locator("[data-presentation-root]").count())) fail(`${vw}: missing data-presentation-root.`);
  const hasNext = await page.locator("[data-verify-next]").count();
  const hasPrev = await page.locator("[data-verify-prev]").count();
  const hasReset = await page.locator("[data-verify-reset]").count();
  if (!hasNext) report.warnings.push(`${vw}: no data-verify-next; navigation not exercised.`);

  // 1. forward through every cue, checking collisions at each
  const forward = await walkForward(page, vw);
  const opening = forward[0].state;
  if (!forward.some((s) => s.overlap.candidates)) report.warnings.push(`${vw}: no data-verify-box markers.`);
  if (hasNext && forward.length < 2) fail(`${vw}: next control did not change state.`);

  // 2. back through every cue, comparing to the recorded forward state
  if (hasPrev && forward.length > 1) {
    for (let i = forward.length - 2; i >= 0; i -= 1) {
      const result = await press(page, "[data-verify-prev]");
      if (result !== "clicked") { fail(`${vw}: prev control ${result} while returning to cue ${forward[i].cue ?? i}.`); break; }
      if ((await snapshot(page)) !== forward[i].state) {
        fail(`${vw}: back to cue ${forward[i].cue ?? i} does not restore the forward state.`);
      }
    }
  } else if (!hasPrev) report.warnings.push(`${vw}: no data-verify-prev control.`);

  // 3. reset from the end and from a middle cue
  if (hasReset && forward.length > 1) {
    const mid = Math.max(1, Math.floor((forward.length - 1) / 2));
    for (const [name, steps] of [["end", forward.length - 1], ["middle", mid]]) {
      await open(page, url);
      for (let k = 0; k < steps; k += 1) await press(page, "[data-verify-next]");
      await press(page, "[data-verify-reset]");
      const afterReset = await snapshot(page);
      if (afterReset !== opening) fail(`${vw}: reset from ${name} does not restore the opening state.`);
      // a reset must not leave a pending advance behind
      await page.waitForTimeout(1500);
      if ((await snapshot(page)) !== afterReset) fail(`${vw}: state changed after reset from ${name} (stray timer?).`);
    }
  } else if (!hasReset) report.warnings.push(`${vw}: no data-verify-reset control.`);

  // 4. keyboard: from the opening, and after clicking a control
  if (hasNext && forward.length > 1) {
    await open(page, url);
    await page.keyboard.press("ArrowRight"); await settle(page);
    if ((await snapshot(page)) === opening) fail(`${vw}: ArrowRight does not advance from the opening.`);
    await open(page, url);
    await press(page, "[data-verify-next]");
    const afterClick = await snapshot(page);
    if (forward.length > 2) {
      await page.keyboard.press("ArrowRight"); await settle(page);
      if ((await snapshot(page)) === afterClick) fail(`${vw}: ArrowRight stops working after a control is clicked.`);
    }
  }

  // 5. reduced motion: same end state, no collisions
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page, url);
  const reduced = await walkForward(page, `${vw} reduced-motion`);
  if (reduced.length !== forward.length) {
    fail(`${vw}: reduced motion reaches ${reduced.length} cues vs ${forward.length} normally.`);
  } else if (reduced.at(-1).state !== forward.at(-1).state) {
    fail(`${vw}: reduced-motion end state differs from the normal end state.`);
  }

  if (consoleErrors.length) fail(`${vw} console errors: ${[...new Set(consoleErrors)].join(" | ")}`);
  if (pageErrors.length) fail(`${vw} page errors: ${[...new Set(pageErrors)].join(" | ")}`);
  if (externalRequests.length) fail(`${vw} external requests: ${[...new Set(externalRequests)].join(", ")}`);

  report.viewports.push({
    ...viewport,
    cuesObserved: forward.map((s, i) => s.cue ?? String(i)),
    collisionsByCue: forward.filter((s) => s.overlap.hits.length)
      .map((s) => ({ cue: s.cue, hits: s.overlap.hits })),
    externalRequests: [...new Set(externalRequests)],
  });
  await context.close();
}

await browser.close();
report.notChecked = [
  "Visual quality, copy, and meaning — these need human and audit review.",
  "Controls without data-verify-* markers (tabs, sliders, reveals) are not exercised.",
];
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ok ? 0 : 1;
