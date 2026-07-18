# Migrating cc-content onto a shared skill contract

**Status:** Written, not executed. This is an instruction doc for a **future** cc-content
task — no code changes here. It was authored at the end of cc-concept Slice 1, once the
shared-contract pattern had been proven by two working cc-concept skills
(`cc-concept-onboarding` and `cc-concept-positioning`).

## Why

Every content-production skill in this repo restates the same run scaffold: recall learnings,
load context, briefing check, … generate, self-review, delimited output, two-phase feedback.
That sequence is duplicated across `cc-content-linkedin-post`, `cc-content-blog-article`,
`cc-content-text`, and the others — and, worst of all, it is **spelled out inline inside the
generator**, `cc-content-new-skill` (`Step 5: Generate SKILL.md skeleton`, the "Required skill
steps" block). Because the generator emits the full sequence verbatim, every skill it produces
inherits a private copy of the scaffold. That is the drift bug in the flesh: fix a step in one
skill and the others — plus every future generated skill — silently fall out of sync.

cc-concept solved this with a single source of truth: `_shared/skill-contract.md` holds the
canonical step order, and each SKILL.md **references** it instead of restating it, adding only
its own specifics (what it gates on, what it generates, where it writes). Port that pattern here.

## What to do

### 1. Extract the canonical sequence into `_shared/skill-contract.md`

Create `plugins/cc-content/skills/_shared/skill-contract.md` as the single definition of the
run sequence. Model it on cc-concept's
`plugins/cc-concept/skills/_shared/skill-contract.md`, but **do not copy it verbatim** — the
cc-content sequence is genuinely longer. Separate two layers:

- **Universal spine** (shared with cc-concept, identical intent): Step 0 recall learnings,
  Step 1 load context (match on the **Summary** column, warn on _semantic absence_), briefing
  check, internal quality check, delimited output, two-phase feedback.
- **Content-production steps** (cc-content-specific, keep in the contract but marked as the
  content-skill spine): infer & confirm audience / goal / funnel stage / expertise, ask for the
  topic, select a storytelling framework, select persuasion principles, generate against
  `format-guidelines.md`. These are the steps a _format_ skill shares with every other format
  skill — they belong in the contract, not restated per format.

Keep truly format-specific detail (e.g. LinkedIn character limits, blog SEO fields) out of the
contract and in each skill's own `format-guidelines.md`, exactly as today.

**Scope the two layers correctly.** The content-production steps apply to **format skills only**
(`cc-content-linkedin-post`, `cc-content-blog-article`, `cc-content-text`, and anything
`cc-content-new-skill` generates). The utility skills — `cc-content-onboarding`,
`cc-content-promote`, `cc-content-research-prompt`, `cc-content-samples-curation`,
`cc-content-session-wrap` — run only the universal spine, not the content-production steps.
Structure the contract so a skill can reference the spine without inheriting the format steps.

### 2. Refactor the existing skills to reference the contract

For each existing content skill, replace the inline step sequence with a reference to
`_shared/skill-contract.md`, leaving only the skill's own gating, generation target, and output
specifics. Preserve the existing `@`-import mechanism and its **mode-specific paths** — skills
use `@./…` and `@../_shared/…` in plugin-dev mode and `@.claude/skills/…` in end-user mode
(see `cc-content-linkedin-post` for the established pattern). The contract import must be added
in the same style, alongside the existing `storytelling-frameworks.md` and
`persuasion-principles.md` imports.

### 3. Update the generator — this is the load-bearing step

`cc-content-new-skill` is what makes this urgent: **it generates skills**, so unless the
generator itself is changed, the drift bug simply reappears through every skill it emits.

- In `Step 5: Generate SKILL.md skeleton`, replace the inline "Required skill steps" block
  (Steps 0–8 written out in full) with an instruction to emit a SKILL.md that **references**
  `_shared/skill-contract.md` and documents only the new format's specifics. The skeleton
  should import the contract, not restate it.
- Update the `@`-imports the skeleton emits (the plugin-dev and end-user blocks) to include the
  contract file.
- In `Step 4`, the **end-user copy list** currently copies `storytelling-frameworks.md` and
  `persuasion-principles.md` into the project's `.claude/skills/_shared/`. Add
  `skill-contract.md` to that `cp -n` set — otherwise an end-user-mode skill will `@`-import a
  contract file that was never copied into the project, and break at load time. (Plugin-dev mode
  needs no copy: the file already lives in the repo's `_shared/`.)

### 4. Verify both modes

After refactoring, generate one skill in each mode and confirm the contract import resolves:
plugin-dev mode against the repo `_shared/`, end-user mode against the copied project
`_shared/`. Then re-run an existing format skill end-to-end to confirm the extracted sequence
still behaves identically — the refactor must be behavior-preserving.

## Scope

This is a separate future task, not part of Slice 1. The goal is a pure refactor: the shared
contract becomes the one place the sequence is defined, existing skills and the generator both
reference it, and no generated skill can drift from the canonical steps again.
