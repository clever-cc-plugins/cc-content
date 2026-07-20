# cc-content Social & PR Content Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four default content-production skills to the `cc-content` plugin —
`cc-content-x-post`, `cc-content-facebook-post`, `cc-content-instagram-post`, and
`cc-content-press-release` — following the exact process the repo's own
`cc-content-new-skill` meta-skill already documents (research → coverage assessment →
three-layer `format-guidelines.md` → `SKILL.md` skeleton), except research is gathered
directly via `WebSearch`/`WebFetch` rather than staged from an external deep-research
tool.

**Architecture:** Four independent skill folders, each with `format-guidelines.md` +
`SKILL.md`, built by following `cc-content-new-skill/SKILL.md`'s own Steps 3–6 verbatim
(read that file first — it is the authoritative process spec, not restated in full
here). Each skill reuses the existing shared files (`_shared/storytelling-frameworks.md`,
`_shared/persuasion-principles.md`, `_shared/context-categories.md`) exactly as
`cc-content-linkedin-post` and `cc-content-blog-article` already do. No new `_shared/`
files.

**Tech Stack:** Markdown (skill files), `prettier` (PostToolUse formatter), `gitleaks`
(pre-commit secret scan), `WebSearch`/`WebFetch` (research gathering).

## Global Constraints

- **Follow `cc-content-new-skill/SKILL.md`'s Steps 3–6 exactly** for the
  `format-guidelines.md` three-layer structure and the `SKILL.md` skeleton's required
  sections (frontmatter shape, @-imports, Steps 0–8). This plan does not restate that
  structure — read the source file.
- **Research is gathered by the controller, not delegated to implementer subagents,
  and saved to a committed `docs/research/cc-content-<format>.md` file before the
  implementer runs** — same provenance pattern as every other plan in this repo family,
  so reviewers have a cross-checkable artifact instead of a self-referential citation
  inside `format-guidelines.md`. Covers the same six areas from
  `_shared/content-skill-research-brief.md`'s six research passes (universal structure;
  B2B vs. B2C; content-goal variations; funnel-stage adaptations; audience-expertise
  adaptations; persuasion principles) via real `WebSearch`/`WebFetch` queries against
  current, authoritative sources (platform help-center docs, established marketing
  research sites, recent industry benchmarks) for each area, per format. Mark any area
  without adequate sourcing as `⚠ KNOWLEDGE-BASED — verify before treating this skill as
production-ready`, exactly as the meta-skill's Step 3 gap-handling requires — never
  silently fill gaps from unstated general knowledge, and never let the implementer
  invent volatile platform facts (character limits, hashtag counts, algorithm behavior)
  — those must trace to the research file.
- **Plugin-dev mode throughout** — every file goes to `plugins/cc-content/skills/<name>/`,
  never `.claude/skills/`. `name:` frontmatter is `cc-content-<format-name>`.
- **No secrets. No `--force` flags.**
- **`CLAUDE.md`'s Key Config Files table and README's skill table are never hand-edited
  for content the pre-commit hook owns** — pre-populate new rows before committing.
- **Learnings tags:** `[cc-content:cc-content-x-post]`, `[cc-content:cc-content-facebook-post]`,
  `[cc-content:cc-content-instagram-post]`, `[cc-content:cc-content-press-release]`
  respectively — never write to another skill's tag.
- **Tasks run sequentially, not in parallel** — all four touch `CLAUDE.md` and
  `README.md`, and the `sync-config-table.sh` pre-commit hook rewrites `CLAUDE.md` on
  every commit; concurrent commits would collide (same lesson as the prior
  atomize-distribution-engine and consultant-gap-closure plans in this repo family).
- **Platform-specific facts must cite a real, current source** — X/Facebook/Instagram
  character limits, algorithm behavior, and press-release distribution norms all change;
  do not rely on pre-training knowledge for numbers that could be stale. Cite the source
  (e.g., platform help-center URL, named report) inline in `format-guidelines.md` where
  a specific limit or benchmark is stated.

---

## File Structure

| Path                                                                       | Responsibility                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| `docs/research/cc-content-x-post.md`                                       | Controller-gathered research, six coverage areas, cited |
| `plugins/cc-content/skills/cc-content-x-post/format-guidelines.md`         | Three-layer guidelines for X (Twitter) posts            |
| `plugins/cc-content/skills/cc-content-x-post/SKILL.md`                     | X post drafting skill                                   |
| `docs/research/cc-content-facebook-post.md`                                | Controller-gathered research, six coverage areas, cited |
| `plugins/cc-content/skills/cc-content-facebook-post/format-guidelines.md`  | Three-layer guidelines for Facebook posts               |
| `plugins/cc-content/skills/cc-content-facebook-post/SKILL.md`              | Facebook post drafting skill                            |
| `docs/research/cc-content-instagram-post.md`                               | Controller-gathered research, six coverage areas, cited |
| `plugins/cc-content/skills/cc-content-instagram-post/format-guidelines.md` | Three-layer guidelines for Instagram posts/captions     |
| `plugins/cc-content/skills/cc-content-instagram-post/SKILL.md`             | Instagram post drafting skill                           |
| `docs/research/cc-content-press-release.md`                                | Controller-gathered research, six coverage areas, cited |
| `plugins/cc-content/skills/cc-content-press-release/format-guidelines.md`  | Three-layer guidelines for press releases               |
| `plugins/cc-content/skills/cc-content-press-release/SKILL.md`              | Press release drafting skill                            |
| `CLAUDE.md`                                                                | +4 rows in Key Config Files table                       |
| `README.md`                                                                | +4 rows in Skills table                                 |

Already present, unmodified: `_shared/storytelling-frameworks.md`,
`_shared/persuasion-principles.md`, `_shared/context-categories.md`,
`cc-content-new-skill/SKILL.md` (the process spec each task follows), every other
existing skill file.

---

## Task 1: `cc-content-x-post`

- [ ] **Step 0 (controller, before dispatch):** Controller gathers research for
      X/Twitter posts across the six coverage areas via real `WebSearch`/`WebFetch`
      queries — character limits and thread conventions, hook/opening patterns for a
      feed skimmed in seconds, B2B vs. B2C tone differences, goal variations,
      funnel-stage adaptations, and which persuasion principles work in a 280-character
      format. Cites sources for hard numbers (character limits, engagement benchmarks).
      Saves findings to `docs/research/cc-content-x-post.md` and commits it before
      dispatching the implementer.
- [ ] **Step 1 (implementer):** Read `cc-content-new-skill/SKILL.md` in full (the
      process spec) and `docs/research/cc-content-x-post.md` (the research — treat as
      given, do not invent additional platform facts from pre-training).
- [ ] **Step 2:** Synthesize `format-guidelines.md` per the meta-skill's Step 4
      three-layer structure, citing the research file's sources for hard numbers. Flag
      any knowledge-based sections the research file already flagged.
- [ ] **Step 3:** Generate `SKILL.md` per the meta-skill's Step 5 skeleton — frontmatter
      `name: cc-content-x-post`, plugin-dev @-imports, Steps 0–8 fully written (not left
      as `[TODO: ...]` placeholders — this is a finished skill, not a skeleton for a user
      to fill in later, since a plugin contribution ships complete). Learnings tag
      `[cc-content:cc-content-x-post]`.
- [ ] **Step 4:** Update `CLAUDE.md` and `README.md` rows (pre-populated, alphabetically
      placed).
- [ ] **Step 5:** Manual fixture test via self-simulation: draft one fictional X post
      end-to-end against the written skill text; confirm the character-count check and
      thread-vs-single-post branching (if the research surfaced one) both work.
- [ ] **Step 6:** Commit (stage explicit files by name).
- [ ] **Reviewer instruction:** independently spot-check every hard number in
      `format-guidelines.md` (character limits, hashtag counts, benchmark figures)
      against the cited source in `docs/research/cc-content-x-post.md` — not just
      structural/format compliance. A number with no traceable source, or one that
      doesn't match its cited source, is a spec failure.

## Task 2: `cc-content-facebook-post`

Same steps as Task 1, for Facebook posts, research saved to
`docs/research/cc-content-facebook-post.md`. Research focus: organic reach realities
(algorithm deprioritizes link posts vs. native content), optimal length, group vs. page
posting differences if the research surfaces them, B2B (company page) vs. B2C tone.
Learnings tag `[cc-content:cc-content-facebook-post]`.

## Task 3: `cc-content-instagram-post`

Same steps, for Instagram posts/captions, research saved to
`docs/research/cc-content-instagram-post.md`. Research focus: caption length vs. actual
read depth, hashtag conventions and current best-practice count (this has changed over
time — cite a current source), carousel vs. single-image copy differences if surfaced,
Stories vs. feed caption differences if surfaced. Learnings tag
`[cc-content:cc-content-instagram-post]`.

## Task 4: `cc-content-press-release`

Same steps, for press releases, research saved to
`docs/research/cc-content-press-release.md`. Research focus: AP style / inverted-pyramid
structure, headline and dateline conventions, boilerplate paragraph conventions, quote
placement and sourcing norms, distribution-channel realities (wire services,
direct-to-journalist, owned-newsroom publishing — note in the guidelines that press
releases today serve SEO/backlink and record-of-announcement functions as much as direct
media pickup, per whatever the research turns up on this point). Learnings tag
`[cc-content:cc-content-press-release]`.

---

## Self-Review

- **Coverage:** one task per requested format; all four follow the identical,
  already-proven meta-skill process rather than inventing a new one.
- **Placeholder scan:** each task names the exact process file to follow and the exact
  research areas to cover; no "handle appropriately" language. `SKILL.md` outputs must
  be complete, not `[TODO: ...]` skeletons — a plugin contribution ships finished.
- **Consistency:** naming (`cc-content-<format>`), learnings tags, and file structure
  all match the conventions every other task in this repo family has used.
- **Ordering:** all four tasks are independent in content but run sequentially due to
  the shared `CLAUDE.md`/`README.md` commit-collision risk already documented as a
  Global Constraint.
