# cc-content Distribution-Engine (Atomization) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the "Distribution" gap identified in the value-chain gap analysis — repurposing one core message across formats currently exists only as a conditional branch (Step 1.5) inside `cc-content-text`, triggered only if the owner explicitly names 2+ formats or says "repurpose"/"atomize." Promote it into a first-class `cc-content-atomize` skill that is the natural target for the `brief.md` handoff artifact `cc-concept-campaign-concept` and `cc-concept-gtm` already produce, so a strategy-to-distribution handoff exists without the owner having to remember the right magic phrase.

**Architecture:** One new skill file (`cc-content-atomize/SKILL.md`) that owns the multi-format fan-out logic currently living in `cc-content-text`, and one edit to `cc-content-text` that removes Step 1.5 and replaces it with a one-line delegation. No new `_shared/` files — the new skill reuses `../_shared/storytelling-frameworks.md` and `../_shared/persuasion-principles.md` exactly as `cc-content-text` does today, and reuses the same Tier A/B/C routing logic (moved, not duplicated).

**Tech Stack:** Markdown (skill files), `prettier` (PostToolUse formatter), `python3` (frontmatter/YAML validity checks), `gitleaks` (pre-commit secret scan).

## Global Constraints

- **This is a move, not a rewrite.** Steps 3–10 of `cc-content-text` (campaign-briefing check, framework/persuasion selection, two-pass draft, presentation, feedback) are reused verbatim by the new skill for whichever formats aren't routed to a dedicated skill — copy their exact logic, don't redesign it.
- **Do not duplicate the Tier A/B/C routing rules.** `cc-content-text` Step 2 already defines them correctly; the new skill calls the same logic once per requested format. If a subtlety needs fixing, fix it in one place and make sure both skills reflect it (there is only one place after this plan — `cc-content-text` no longer runs its own atomization branch).
- **`brief.md` consumption is new, not a copy of an existing pattern** — `cc-content-text` Step 3 already reads `brief.md` if present for a _single_ format; the new skill must read it once and reuse it across every format in the batch, same as `cc-content-text`'s existing atomization-mode Step 4 already does for the content idea/audience/proof points.
- **Research-then-draft order is mandatory**, matching the convention set by every other skill-authoring plan in this repo family — run Research Prompt 6 (repurposing/distribution) first, save the output to `docs/research/cc-content-atomize.md`, and cite its specific findings (which formats atomize well from which source formats, what must stay identical vs. what must vary) in the new skill's step content.
- **No secrets committed. No `--force` flags.** Fix root causes.
- **`CLAUDE.md`'s Key Config Files table and the README skill table are never hand-edited for content the pre-commit hook owns** — pre-populate new rows before committing.
- **Learnings tag:** `[cc-content:cc-content-atomize]`.
- **Do not remove `cc-content-text`'s single-format `brief.md` read (Step 3)** — that stays for single-format runs; only the multi-format branch (current Step 1.5 plus the atomization-mode conditionals threaded through Steps 4, 9, 10) moves out.

---

## File Structure

| Path                                                    | Responsibility                                                                                                                                                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/research/cc-content-atomize.md`                   | Saved deep-research output feeding this plan                                                                                                                                              |
| `plugins/cc-content/skills/cc-content-atomize/SKILL.md` | New skill: takes one core message or `brief.md`, fans it out across N named formats, routing each through Tier A/B/C exactly as `cc-content-text` does today                              |
| `plugins/cc-content/skills/cc-content-text/SKILL.md`    | Edited: Step 1.5 removed; replaced with a one-line delegation when 2+ formats are requested; atomization-mode conditionals removed from Steps 4, 9, 10 (single-format logic only remains) |
| `CLAUDE.md`                                             | +1 row for the new skill                                                                                                                                                                  |
| `README.md`                                             | +1 row for the new skill                                                                                                                                                                  |

Already present, unmodified: `_shared/storytelling-frameworks.md`, `_shared/persuasion-principles.md`, every other skill file.

---

## Task 1: Extract atomization into `cc-content-atomize`

Deliverable: a standalone skill that owns everything `cc-content-text`'s atomization mode does today, plus native `brief.md`-driven invocation so `cc-concept-campaign-concept`/`cc-concept-gtm`'s handoff artifact routes here without the owner needing to ask for "repurposing" by name.

**Files:**

- Research: `docs/research/cc-content-atomize.md` (Research Prompt 6)
- Create: `plugins/cc-content/skills/cc-content-atomize/SKILL.md`
- Modify: `plugins/cc-content/skills/cc-content-text/SKILL.md` (remove Step 1.5 and atomization-mode branches; add delegation line)
- Reference (read, do not modify): `plugins/cc-content/skills/cc-content-text/SKILL.md` lines 99–118 (current atomization Step 1.5), 191–202 (atomization-mode Step 4 opening), 281–287 (atomization-mode Step 9 opening), 318–322 (atomization-mode Step 10 opening) — this is the exact logic being relocated

**Interfaces:**

- Consumes: `brief.md` in the working directory (read automatically, not just on `$ARGUMENTS`) or a manually described core message; the project's `## Context files` table (brand voice, organization background, audience, language) exactly as `cc-content-text` Step 1 does.
- Produces: one delimited draft per requested format (identical block format to `cc-content-text`'s existing output), plus a routing summary line; no new context file.

- [ ] **Step 1: Read the research output and confirm what must stay invariant across formats**

Confirm `docs/research/cc-content-atomize.md` documents which elements of a piece must remain byte-identical across every atomized format (core claim, key proof points) versus which must vary per format's own conventions (structure, length, tone, CTA placement) — this is the design axis the whole skill turns on, and it should come from the research, not be assumed.

- [ ] **Step 2: Write the SKILL.md frontmatter**

```markdown
---
name: cc-content-atomize
description: >
  Use this skill to repurpose one core message across multiple content formats in a
  single run — e.g. turning a campaign brief or a single piece into a LinkedIn post,
  newsletter, and blog post at once, each properly adapted to its own conventions
  while keeping the core claim and proof points identical. Invoke when the user
  names 2+ target formats, says "repurpose this," "atomize this," "turn this into
  multiple formats," or when a brief.md is present and the user wants it distributed
  across channels. For a single format, use the dedicated format skill (e.g.
  cc-content-blog-article) or cc-content-text instead — this skill is for the
  fan-out case specifically.
allowed-tools: Read, Write, Bash
argument-hint: "[optional: path to campaign briefing; defaults to brief.md if present]"
---
```

- [ ] **Step 3: Write Steps 0–2, adding native `brief.md` detection**

```markdown
# Distribution Engine (Atomization) Skill

Takes one core message — either a `brief.md` campaign handoff or a manually
described idea — and produces properly-adapted drafts for every named format in a
single run, keeping the core claim and proof points identical across all of them
while letting structure, length, and tone vary per format's own conventions.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently, `[cc-content:*]` tags plus any
cross-plugin entries relevant to distribution/repurposing. Never announce.

## Step 1: Load context

[identical to cc-content-text Step 1 — same context table read, same two gated
needs (brand voice, organization background), same degrade-and-continue behavior]

## Step 2: Resolve the format list and the core message source

Check for `brief.md` in the working directory first:

\`\`\`bash
ls brief.md 2>/dev/null && echo "found" || echo "missing"
\`\`\`

- **Found:** read it. If it names a channel mix (as `cc-concept-campaign-concept`'s
  and `cc-concept-gtm`'s output does), propose that list as the target formats and
  ask the owner to confirm or adjust before continuing.
- **Missing:** ask: "Which formats do you want this in? (e.g. LinkedIn post,
  newsletter, blog post) I'll draft each from the same core message." Then ask for
  the core message/idea directly, same prompt `cc-content-text` uses today.
```

- [ ] **Step 4: Write Steps 3–10, relocating `cc-content-text`'s per-format routing and drafting logic verbatim**

For each step, copy the corresponding logic from `cc-content-text` lines 120–370 (Tier A/B/C routing, campaign-briefing/inspiration check, framework selection, persuasion selection, two-pass draft, self-edit, delimited presentation with a routing summary, feedback) — run the routing and drafting once per format in the resolved list, sharing the core message/audience/proof-points across all formats per the research file's "what stays invariant" findings from Step 1 above. Do not re-derive this logic from scratch; the goal is relocation with a native `brief.md` entry point, not a redesign.

- [ ] **Step 5: Edit `cc-content-text` to delegate**

Replace lines 99–118 (Step 1.5) with:

```markdown
## Step 1.5: Detect multi-format requests

If the owner's request names 2 or more target formats, or explicitly asks to
"repurpose," "atomize," or "turn this into multiple formats," stop and say:
"That's a multi-format request — `/cc-content-atomize` handles fan-out across
formats from one core message. Switching you there." Do not continue this skill's
own drafting steps for a multi-format request.
```

Remove the atomization-mode conditionals from Step 4 (lines 193–197), Step 9 (lines 283–287), and Step 10 (lines 320–322) — those branches no longer have a caller once Step 1.5 always delegates instead of switching modes internally.

- [ ] **Step 6: Manual fixture test**

Run `/cc-content-text` naming 2 formats — confirm it now delegates to `/cc-content-atomize` instead of drafting both itself. Run `/cc-content-atomize` directly against a fixture `brief.md` (reuse the campaign-concept fixture output from the `cc-concept` plan's Task 4 fixture, copied manually since these are separate repos) and confirm it proposes the brief's channel mix as the format list, then drafts each. Run `/cc-content-atomize` a second time with no `brief.md` present, naming formats manually, and confirm the manual path still works.

- [ ] **Step 7: Update CLAUDE.md/README.md, then commit**

```bash
git add plugins/cc-content/skills/cc-content-atomize/SKILL.md plugins/cc-content/skills/cc-content-text/SKILL.md CLAUDE.md README.md docs/research/cc-content-atomize.md
git commit -m "feat: promote atomization to standalone cc-content-atomize skill with brief.md handoff"
```

---

## Self-Review

- **Coverage:** the single gap this plan targets (Distribution/repurposing engine) has one task covering extraction, delegation edit, native `brief.md` entry point, and fixture verification.
- **Placeholder scan:** every step names exact line ranges being moved, exact frontmatter, exact bash checks; no "handle appropriately" language.
- **Consistency:** the delegation message in `cc-content-text` names the real skill (`cc-content-atomize`) it now points to; the new skill's `argument-hint` and Step 2 both describe the same `brief.md`-first resolution order.
