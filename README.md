# build-presentation-experience

An agent skill that turns an existing PowerPoint, PDF, or Word document into a **single-file HTML
interactive presentation that a speaker operates while explaining**.

Press a figure and its basis opens. Switch the comparison and the ordering changes. Move a
condition and the result recalculates — **from a formula the document itself states**. It sits
between a presentation and an operable business application: it has to work as an explanatory
document untouched, and get better when it is operated.

> ### ⚠ Status: `DRAFT_SKILL_SKELETON_NOT_YET_PROVEN`
>
> **This is not proven.** It has been run on two real documents. The direction improved; neither
> run established that it reaches presentable quality repeatably. Treat it as a working method
> under revision, not a finished tool, and do not copy any output of it as a success template.

## What it is not for

Summarising or translating a document · editing slides in place · building an ordinary website or
landing page · building a dashboard · producing video or voice narration · authoring a new deck
with no source document.

It also will not manufacture interaction where the source affords none. A document that is an
argument rather than a model is a legitimate outcome, reported as such.

## Install

Copy the skill folder into your agent's skills directory.

**Codex**

```bash
cp -r build-presentation-experience ~/.codex/skills/
```

**Claude Code**

```bash
cp -r build-presentation-experience ~/.claude/skills/
```

Then verify:

```bash
node build-presentation-experience/scripts/validate-skill.mjs
```

It should report `"ok": true` with no errors.

## Use

Give it a document and say what you want.

```
この提案書をインタラクティブなHTMLプレゼンにして。
段階ごとにレビューしたいので REVIEW_FIRST で。
```

```
Turn this deck into an interactive presentation I can present from.
```

Three modes:

- **CONTINUOUS_BUILD** (default) — runs through to a finished result without interrupting for
  internal decisions.
- **REVIEW_FIRST** — stops three times: the direction, the central mechanism built and working,
  then the whole experience.
- **QUICK_BUILD** — less depth, same guardrails, and it tells you what it skipped.

In every mode, **the skill never decides that the result is ready to show people.** That is
yours. A passing check, a clean console, and a working build are not evidence of quality, and the
skill is written to say so rather than imply otherwise.

## What is in here

| Path | |
|---|---|
| `build-presentation-experience/SKILL.md` | the contract: modes, stopping points, guardrails |
| `references/` | how to judge source fidelity, wording, visual meaning, and which mechanisms a document has earned |
| `assets/mechanisms/` | worked implementations of Reveal, Compare, Calculate, Inspect — two forms each, on invented data |
| `assets/runtime/` | navigation, keyboard and clicker input, reset, reduced motion. Behaviour only |
| `scripts/` | structural validation, and browser verification when Playwright is available |

There is deliberately **no shared renderer**. What is reused across documents is the production
process and the interaction techniques; composition, layout, motion, and brand are designed for
each document. An earlier version of this project did build a common renderer, and every document
came out looking like the renderer.

## Requirements

Node.js for the validation scripts. `scripts/verify.mjs` additionally needs Playwright; without
it, the same checks are performed against the DOM by hand, and the skill is expected to say which
route it took rather than claim the script ran.

No API key. No network access at build time or view time. The output opens offline from the
filesystem.

## License

MIT — see [LICENSE](LICENSE).
