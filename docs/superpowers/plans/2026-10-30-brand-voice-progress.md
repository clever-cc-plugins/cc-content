# brand-voice — Execution Progress (handoff)

Status on 2026-10-30: **paused after Task 5 of 6**, on branch `feat/brand-voice-skill`. Tasks 1–5 are implemented, reviewed and committed. Task 6 (fixtures, dry runs, fixes) and the final whole-branch review are open.

## How to resume (any machine)

1. `git fetch && git switch feat/brand-voice-skill && git pull`
2. Restore the execution ledger: run the superpowers `subagent-driven-development` skill's `scripts/sdd-workspace docs/superpowers/plans/2026-10-30-brand-voice.md` to get the workspace path, then copy the **Ledger** section below (from its `# SDD ledger` line to the end) into `<workspace>/progress.md`. The skill then resumes at the first task without a `complete` line.
3. Continue with Task 6 as split in the Task 6 ruling below (6a fixtures + README, 6b dry runs A+B, 6c dry runs C+D+no-node, 6d one fix dispatch), then the final whole-branch review, which also triages the deferred minors below. After merge, plan Task 7 removes the private input files.
4. Optional, git hooks: `core.hooksPath` was not set on the original clone, so the pre-commit hook (gitleaks, CLAUDE.md table sync) never ran on this branch. Run `git config core.hooksPath .githooks` if the repo is meant to use them, and run gitleaks once over the branch.

Notes:

- Private input files (the owner's four voice guides, seven research reports, readability study excerpt) are never committed, because the repo is public. They are in a secret gist on the owner's GitHub account (description starts with "cc-content brand-voice skill: private input files"). On another machine, fetch them outside the repo with the owner's `gh` login: `gh gist list --secret | grep brand-voice`, then `gh gist clone <id> ~/Git-Repos/temp`. Never paste the gist URL or ID into the repo.
- After the skill is finished and merged, plan Task 7 deletes the gist and all local copies (with the owner's confirmation).
- Task briefs, reports and review packages from the original run were scratch files and are not needed; the commits and this ledger carry the state.

## Ledger

# SDD ledger — plan: docs/superpowers/plans/2026-10-30-brand-voice.md

Spec: docs/superpowers/specs/2026-10-30-brand-voice-design.md
Branch: feat/brand-voice-skill (merge base 60a4052)

## Pre-flight scan

| Pair / task | Produces vs consumes | Finding |
|---|---|---|
| T1 ↔ T4 | CLI `node measure-text.mjs [--lang] [--json] files` → SKILL Step 3/7 invocation | consistent |
| T1 ↔ T6 | script → run on fixtures; de-org contains one EN page, run with --lang de | formal>0 / informal==0 still holds; consistent |
| T2 ↔ T4 | section numbers 0–10 (§8.1) → SKILL Steps 6/refine | consistent |
| T2 ↔ T5 | guide sections → session-wrap inserts rule into "matching section" | consistent |
| T3 ↔ T4 | analysis-criteria / interview-guide / language-layer → @imports | names consistent |
| T4 ↔ T5 | both touch CLAUDE.md (T4: Key Config row; T5: Skills table) | different tables; consistent |
| T6 ↔ T2–T5 | fixes during dry runs | allowed by T6 Step 5 |
| T1 self | tests vs measurement rules | values recomputed by controller: all consistent (abbrev rule fixed pre-commit with single-letter clause) |
| T1 self | CLI test body given as comment | rubric would flag an empty test → Ruling below |
| T2 self | creates template only | consistent |
| T3 self | three files, verify greps | consistent |
| T4 self | Step 4 amends commit after hook row | consistent (unpushed branch) |
| T5 self | edits 5 files | consistent |
| T6 self | fixtures + dry runs + fixes | consistent |
| Plan vs spec | spec §3 says minor version bump; plan Global Constraints forbids manual bump | Ruling below |

- Ruling: CLI test must be a real test with the three listed assertions, not a comment — the plan left the body to the builder, not the assertions — cost if wrong: none.
- Ruling: no manual plugin.json bump, release workflow bumps on merge — repo's release.yml does version bump; manual bump would double-bump — cost if wrong: one manual version edit later.

## Progress
Task 1: review 9ef763e..6763ea0 — spec ❌ (1 Important: paragraph lengths count list markers), quality Approved
Task 1: minor (deferred): German closing quote “ (U+201C) missing from closing-quote class → „…“ sentences don't split (measure-text.mjs:135); sentences starting with quote/digit never split (plan-mandated uppercase rule)
Task 1: minor (deferred): ordinal dates "am 3. Oktober" split falsely (plan-mandated single-letter guard only)
Task 1: minor (deferred): ZWJ emoji sequences counted per part, flags as 0
Task 1: minor (deferred): unterminated code fence silently drops rest of text, no note
Task 1: minor (deferred): `--lang` with no value proceeds as "language not given" instead of erroring
Task 1: minor (deferred): no tests for fr/es/nl/it tables, locale normalization (en-US), lang:null notes
Task 1: minor (deferred): splitProse rescans `before` per match (fine at this scale)
Task 1: fix round 1/5 (1 addressed, 0 open; commits 6763ea0..a8f247c)
Task 1: complete (commits 9ef763e..a8f247c, review clean)
Task 2: Ruling: AI precedence order (spec §8.1 "priority core → text-type section → detailed rules → exemplars") means core applies everywhere EXCEPT where section 5 explicitly names an override for that text type; core rules can be marked "fixed across text types" and then section 5 cannot override them — spec §8.1 section 5 says "which scale positions and rules change, what stays fixed", so overrides are intended; literal reading would make section 5 inert — cost if wrong: one paragraph in template + SKILL.md wording.
Task 2: Ruling: section 0 "Header" is the guide's title block, not a visible heading literally named "Header"; all headings are translated idiomatically (natural wording in the target language), keeping the numbering — a literal "0 Kopfzeile" would read oddly and nothing downstream depends on the word — cost if wrong: trivial.
Task 2: review a8f247c..6e5ec1e — spec ✅, quality Needs fixes (2 Important: dangling refs to omitted sections; section 5 vs precedence [spec-mandated, ruled above])
Task 2: minor (deferred): tone-scale direction undefined (1 = left pole?) guide-template.md:61
Task 2: minor (deferred): micro-example scope mismatch median ≤14 help articles vs rule 2 incl. onboarding emails (:221 vs :227)
Task 2: minor (deferred): section 1 table row lacks evidence mark (:233); section 3 Rules bullet lacks per-rule scope/example (:221)
Task 2: minor (deferred): "Close with a question you want answered" (:205) is a new recommendation not in spec
Task 2: minor (deferred): section 1 "about one page" vs contents — no trim priority guidance (:66)
Task 2: fix round 1/5 (3 addressed, 0 open; commits 6e5ec1e..58c2696)
Task 2: minor (deferred): rules scoped to a text type inside the priority core vs "core applies to every text type" — a rule's own Scope line limits where it applies; clarify (guide-template.md:215–217)
Task 2: minor (deferred): micro-example doesn't demonstrate "fixed across text types" or "Overrides core rule N"
Task 2: complete (commits a8f247c..58c2696, review clean)
Task 3: review 58c2696..0a65bf9 — spec ✅, quality Approved (minors only)
Task 3: minor (deferred): scale direction undefined (analysis-criteria.md:167, interview-guide.md:211, guide-template.md:46) — Ruling: 1 = first-named (left) pole, 5 = second; state once in template + analysis + interview in final fix wave — cost if wrong: trivial
Task 3: minor (deferred): German worked rule mixes English evidence marks (language-layer.md:362) — Ruling: evidence marks and priority marks are written in the target language in produced guides (e.g. zitiert / illustrativ; MUSS / SOLL / KANN); SKILL.md (Task 4) states it; reference files fixed in final wave — spec §1/§8 "guide entirely in target language" — cost if wrong: mark vocabulary differs from English guides, harmless
Task 3: minor (deferred): RAE status on doublets incomplete (language-layer.md:318)
Task 3: minor (deferred): unsourced "studies report mixed results" (language-layer.md:316)
Task 3: minor (deferred): fr/es/nl address caveats (vous plural, ustedes, je generic) not carried into analysis-criteria.md:145–147
Task 3: minor (deferred): tone-scale rating is an explicit exception to one-question-at-a-time (interview-guide.md:211)
Task 3: minor (deferred): hard bans asked every run (interview-guide.md:242) — SKILL.md should state it
Task 3: minor (deferred): additions beyond spec (reaction→lever table, DIN note, federal states claim, 25-word heuristic, US/UK typography, VIII required) — judged harmless elaboration
Task 3: complete (commits 58c2696..0a65bf9, review clean)
Task 4: note: core.hooksPath unset on this clone → pre-commit (gitleaks, table sync) never ran for this branch; tell user at finish
Task 4: review 0a65bf9..d60f2a4 — spec ❌ (1 Important: direct refine request bypasses guide selection), quality Needs fixes
Task 4: minor (deferred): skipped test round leaves no trace in section 0 low-confidence notes (SKILL.md:191)
Task 4: minor (deferred): define mode never runs `command -v node`; Step 7.1 runs node unchecked; section 0 Measurement field undefined in define mode (SKILL.md:71,104,178)
Task 4: minor (deferred): Step 3 accepts folders but script readFileSync on a folder → EISDIR; expand folders to files first (SKILL.md:78, measure-text.mjs:264)
Task 4: minor (deferred): test passages shown all at once vs one-by-one unclear (SKILL.md:176-187)
Task 4: minor (deferred): "define mode" rules should also cover text types without samples in mixed runs (SKILL.md:164,189)
Task 4: minor (deferred): refine on foreign guide kept in own structure — where as-of + change log go (SKILL.md:278)
Task 4: minor (deferred): "do not show the whole draft yet" never resolved (SKILL.md:168)
Task 4: minor (deferred): Step 7 rule changes don't propagate to mirrored places (section 8 checklist, section 3) (SKILL.md:187)
Task 4: fix round 1/5 (1 addressed, 0 open; commits d60f2a4..660de5c)
Task 4: complete (commits 0a65bf9..660de5c, review clean)
Task 5: review 660de5c..182864e — spec ✅, quality Approved with 1 Important (handler (c) assumes numbered sections; quick voice notes lack them)
Task 5: minor (deferred): session-wrap handler (c) doesn't update section 0 as-of date or section 8 checklist (session-wrap/SKILL.md:265)
Task 5: minor (deferred): content-onboarding hand-off "continue with the next context file" ambiguous vs Step 3 loop prompt
Task 5: minor (deferred): session-wrap prompt block shows (c) unconditionally; hiding rule only after it
Task 6: Ruling: split into sequential dispatches — 6a fixtures + tests/brand-voice/README.md + script check (Steps 1–2); 6b dry runs A+B; 6c dry runs C+D+no-node; dry-run agents write guides + findings to scratchpad and do NOT edit skill files; 6d one fix dispatch for all dry-run findings (Step 5), then re-run affected scenario checks; single task review over the whole Task 6 range — one agent running five full skill simulations would exhaust its context; separating simulation from fixing keeps findings honest — cost if wrong: more dispatches.
Task 5: fix round 1/5 (1 addressed, 0 open; commits 182864e..5da7dc9)
Task 5: complete (commits 660de5c..5da7dc9, review clean)
PAUSED by user after Task 5 (2026-10-30). Task 6a dispatch stopped before writing files; working tree clean. Resume at Task 6a (split per ruling above), then final whole-branch review.
