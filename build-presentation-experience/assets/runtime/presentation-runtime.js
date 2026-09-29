/*
 * presentation-runtime.js — behaviour plumbing for a presenter-led experience.
 *
 * This file carries BEHAVIOUR ONLY: cue navigation, keyboard and clicker input, reset, timers,
 * reduced motion, and the data-verify-* markers that scripts/verify.mjs reads. It contains no
 * layout, styling, colour, scene type, or copy. Composition is designed per document.
 *
 * Paste this file into an inline <script> in the delivered HTML. Do not load it from a URL.
 *
 * Core rule: the screen for a cue is a pure function of (cue index, mechanism state).
 * `render` must set EVERYTHING that can differ between cues — never "add the next thing".
 * Rendering from state is what makes back navigation and Reset correct by construction.
 *
 *   const deck = PresentationRuntime.create({
 *     root: document.querySelector("[data-presentation-root]"),
 *     cues: ["opening", "premise", "compare", "closing"],   // ids, in speaking order
 *     initialState: { plan: null },                         // mechanism state; restored by Reset
 *     render({ index, cue, state, reduced, later }) {
 *       // set classes / attributes / text for the whole stage from index + state
 *     },
 *     settleMs: 700,                                        // longest transition, for verify.mjs
 *   });
 *   deck.setState({ plan: "b" });   // a mechanism control changes state -> render runs
 *
 * Controls: give buttons data-verify-next / data-verify-prev / data-verify-reset and the runtime
 * wires them. Mechanism controls call deck.setState() and carry data-verify-action="<name>".
 * Keys: ArrowRight / PageDown -> next; ArrowLeft / PageUp -> previous (presentation clickers
 * send PageDown / PageUp); Home -> reset. Keys are ignored while focus is in a text field,
 * select, slider, or any element with data-own-keys.
 */
(function (global) {
  "use strict";

  function create(options) {
    const root = options.root;
    if (!root) throw new Error("PresentationRuntime: root element is required.");
    const cues = options.cues || [];
    if (!cues.length) throw new Error("PresentationRuntime: at least one cue is required.");
    const render = options.render;
    if (typeof render !== "function") throw new Error("PresentationRuntime: render() is required.");

    const clone = (value) => JSON.parse(JSON.stringify(value === undefined ? {} : value));
    const initialState = clone(options.initialState);
    const motionQuery = global.matchMedia ? global.matchMedia("(prefers-reduced-motion: reduce)") : null;

    let index = 0;
    let state = clone(initialState);
    let timers = [];

    root.setAttribute("data-presentation-root", "");
    if (options.settleMs) root.setAttribute("data-verify-settle-ms", String(options.settleMs));

    function clearTimers() {
      timers.forEach((id) => global.clearTimeout(id));
      timers = [];
    }

    // Timers scheduled through later() are cancelled by any navigation or reset, so no stray
    // advance can survive a Reset in front of an audience.
    function later(fn, ms) {
      const id = global.setTimeout(() => {
        timers = timers.filter((t) => t !== id);
        fn();
      }, reduced() ? 0 : ms);
      timers.push(id);
      return id;
    }

    function reduced() {
      return Boolean(motionQuery && motionQuery.matches);
    }

    function syncControls() {
      root.setAttribute("data-cue", cues[index]);
      root.setAttribute("data-cue-index", String(index));
      root.setAttribute("data-motion", reduced() ? "reduce" : "full");
      document.querySelectorAll("[data-verify-prev]").forEach((el) => { el.disabled = index === 0; });
      document.querySelectorAll("[data-verify-next]").forEach((el) => { el.disabled = index === cues.length - 1; });
    }

    function draw() {
      clearTimers();
      syncControls();
      render({ index, cue: cues[index], state, reduced: reduced(), later });
      if (typeof options.onChange === "function") options.onChange({ index, cue: cues[index], state });
    }

    function go(target) {
      const next = Math.max(0, Math.min(cues.length - 1, target));
      if (next === index) return false;
      index = next;
      draw();
      return true;
    }

    function reset() {
      index = 0;
      state = clone(initialState);
      draw();
    }

    function setState(patch) {
      state = Object.assign({}, state, clone(patch));
      draw();
    }

    function ownsKeys(el) {
      if (!el || el === document.body) return false;
      if (el.isContentEditable || (el.closest && el.closest("[data-own-keys]"))) return true;
      const tag = el.tagName;
      if (tag === "TEXTAREA" || tag === "SELECT") return true;
      if (tag === "INPUT") return !["button", "submit", "reset", "checkbox", "radio"].includes(el.type);
      return false;
    }

    function onKey(event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (ownsKeys(event.target)) return;
      const key = event.key;
      let handled = true;
      if (key === "ArrowRight" || key === "PageDown") go(index + 1);
      else if (key === "ArrowLeft" || key === "PageUp") go(index - 1);
      else if (key === "Home") reset();
      else handled = false;
      if (handled) event.preventDefault();
    }

    // Listen on document, not on the stage, so keyboard advance keeps working after a
    // control button has been clicked and holds focus.
    document.addEventListener("keydown", onKey);
    document.querySelectorAll("[data-verify-next]").forEach((el) => el.addEventListener("click", () => go(index + 1)));
    document.querySelectorAll("[data-verify-prev]").forEach((el) => el.addEventListener("click", () => go(index - 1)));
    document.querySelectorAll("[data-verify-reset]").forEach((el) => el.addEventListener("click", reset));
    if (motionQuery && motionQuery.addEventListener) motionQuery.addEventListener("change", draw);

    draw();

    return {
      next: () => go(index + 1),
      prev: () => go(index - 1),
      goTo: (id) => go(typeof id === "number" ? id : cues.indexOf(id)),
      reset,
      setState,
      get index() { return index; },
      get cue() { return cues[index]; },
      get state() { return clone(state); },
    };
  }

  global.PresentationRuntime = { create };
})(typeof window !== "undefined" ? window : globalThis);
