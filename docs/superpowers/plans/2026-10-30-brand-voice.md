# brand-voice Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `brand-voice` skill to cc-content that builds and refines brand voice guides (from samples, interview, and existing project context, in any language) and wire it into `session-wrap` and `content-onboarding`.

**Architecture:** A Markdown skill (`SKILL.md`) orchestrates the flow and loads four companion reference files on demand. A dependency-free Node script measures observable text features. The skill runs it when `node` exists and estimates the same features otherwise. The output is one Markdown guide per voice and language, registered in the project's `## Context files` table.

**Tech Stack:** Claude Code skill Markdown (frontmatter + `@` imports with **Read when:**), Node.js ESM (built-in `node:test`, no npm dependencies), prettier (runs automatically via the repo's PostToolUse hook).

**Spec:** `docs/superpowers/specs/2026-10-30-brand-voice-design.md`. Read it before any task; section numbers below (§n) refer to it.

## Global Constraints

- New Markdown files: no hard-wrapped paragraphs (one line per paragraph). In existing hard-wrapped files, write new paragraphs unwrapped and do not reflow existing text.
- Do not edit `plugin.json` versions; the release workflow bumps versions on merge to `main` (supersedes the spec's "minor version bump" in §3).
- Commits: Conventional Commits with gitmoji, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Run `git status --short` before each commit.
- `measure-text.mjs`: ESM, zero dependencies, Node ≥ 18 APIs only. It must never be required: the skill's fallback path labels features _estimated_ (§7).
- Companion files are referenced as `${CLAUDE_SKILL_DIR}/<file>` in Bash commands and as `@<file>` / `@../_shared/<file>` imports with a **Read when:** note, matching `humanize/SKILL.md`.
- Reuse, never copy: `_shared/readability-patterns.md`, `_shared/persuasion-principles.md`, `_shared/context-categories.md`.
- Learnings tag: `[cc-content:brand-voice] <text> — <date>`.
- Default guide path `context/brand-voice.md`; disambiguated names `context/brand-voice-<scope>-<lang>.md` using only the needed parts (§4 Step 8).
- Never commit the owner's guides or research reports from `~/Git-Repos/temp/`. Test fixtures are written fresh (§11).
- Reference files and `SKILL.md` are written in English; the guide the skill produces is written entirely in the target language.

## Review Focus

- Samples in mixed languages (a German site with a few English pages): the skill groups samples by language, measures each group with its own `--lang`, and asks whether off-language texts belong to this guide. Pinned in Task 4 (Step 3 wording check) and Task 6 (scenario A includes one English page).
- Samples pasted or fetched with Markdown structure (headings, bullet lists, code): headings and code blocks must not distort sentence statistics; list items count as sentences. Pinned in Task 1 (`markdown structure` test).
- A project with a hand-written or onboarding-created voice note that does not follow the template: refine mode offers restructuring or in-place changes and never silently overwrites. Pinned in Task 6 (scenario D).
- Several registered voice guides: `brand-voice` Step 1 and the `session-wrap` promotion option both ask which guide. Pinned in Task 5 (grep check) and Task 6 (scenario D registers a second guide).
- A tiny corpus (one short post) or empty input: the script returns sane numbers for one sentence and exits 1 with "no text" for empty input; the skill flags low confidence. Pinned in Task 1 (`single sentence`, `empty input` tests) and Task 6 (scenario B has one text type under 2,000 words).

---

### Task 1: Measurement script

**Files:**

- Create: `plugins/cc-content/skills/brand-voice/measure-text.mjs`
- Test: `tests/brand-voice/measure-text.test.mjs`

**Interfaces:**

- Produces: `export function measure(text: string, lang?: string): Report` and a CLI `node measure-text.mjs [--lang <code>] [--json] [file ...]` (reads stdin when no files are given; multiple files are concatenated with a blank line between them).
- `Report`:
  ```
  { lang: string|null, words: number,
    sentences: { count, mean, median, p90, over25Share },
    paragraphs: { count, mean, median, p90 },          // lengths in words
    questionShare: number, exclamationShare: number,    // share of sentences, 2 decimals
    per1000: { emDash, enDash, colon, semicolon, parenthesis, emoji, listLine },  // 1 decimal
    pronouns: { firstSingular, firstPlural, second } | null,   // raw counts
    address: { formal, informal } | null,               // raw counts
    contractionsPer1000: number | null,                 // English only, 1 decimal
    notes: string[] }
  ```
  Means, medians, p90 are rounded to 1 decimal. p90 is nearest-rank (`ceil(0.9·n)`-th smallest).

Measurement rules the tests pin:

- Words: `/[\p{L}\p{N}]+(?:['’]\p{L}+)*/gu` ("don't" = 1 word; dashes and emoji are not words).
- Lines starting with `#` and fenced code blocks are excluded from everything. Each list line (`-`, `*`, `•`, or `\d+[.)]` at line start) is its own sentence and counts toward `listLine`.
- Sentence split: after `[.!?…]+` followed by whitespace and an uppercase letter or end of text, plus line ends of list items. No split before a lowercase letter, and no split after a single-letter token (together these protect "z. B. für", "e.g. the", "J. Smith").
- Paragraphs: blocks separated by blank lines, ignoring blocks that contain only excluded lines.
- `parenthesis` counts `(`.
- Pronoun lists exist for en, de, fr, es, nl, it. For other languages `pronouns` is `null` and `notes` contains `pronouns: not measured for <lang>`. English contraction tokens are matched on the part before the apostrophe ("We'll" → "we").
- Address forms exist for de, fr, es, nl, it (en → `null`, no note; others → `null` plus note `address forms: not measured for <lang>`). German: formal = capitalized `Sie|Ihnen|Ihr|Ihre|Ihrem|Ihren|Ihrer|Ihres` **not** at sentence start; informal = case-insensitive `du|dich|dir|dein|deine|deinem|deinen|deiner|deines|euch|euer|eure|eurem|euren|eurer|eures`. Add a note that sentence-initial "Sie" is excluded as ambiguous. Lists for fr/es/nl/it are the builder's (spec §11), following the same pattern (Italian formal = capitalized `Lei|La|Le|Suo|Sua|Suoi|Sue` not at sentence start; French `vous` counts as formal with a note that it is also the plural).
- Contractions (en only): tokens ending in `n't`, `'re`, `'ve`, `'ll`, `'d`, `'m` (straight or curly apostrophe); `'s` is excluded as ambiguous.
- No `lang` → `lang: null`, pronouns and address `null`, notes say "language not given".

- [ ] **Step 1: Write the failing tests** in `tests/brand-voice/measure-text.test.mjs` (`node:test` + `node:assert/strict`, importing `measure` from `../../plugins/cc-content/skills/brand-voice/measure-text.mjs`):

````js
test("basic counts", () => {
  const r = measure(
    "One two three. Four five six seven? Eight!\n\nNine ten.",
    "en",
  );
  assert.equal(r.words, 10);
  assert.deepEqual(r.sentences, {
    count: 4,
    mean: 2.5,
    median: 2.5,
    p90: 4,
    over25Share: 0,
  });
  assert.deepEqual(r.paragraphs, { count: 2, mean: 5, median: 5, p90: 8 });
  assert.equal(r.questionShare, 0.25);
  assert.equal(r.exclamationShare, 0.25);
});
test("punctuation per 1000 words", () => {
  const r = measure("Alpha — beta: gamma; delta (epsilon) zeta – eta.", "en");
  assert.equal(r.words, 7);
  for (const k of ["emDash", "enDash", "colon", "semicolon", "parenthesis"])
    assert.equal(r.per1000[k], 142.9);
});
test("emoji", () => {
  assert.equal(measure("Great launch 🚀 today 🎉.", "en").per1000.emoji, 666.7);
});
test("german address forms", () => {
  const r = measure(
    "Sie erhalten heute Ihr Angebot. Wir melden uns bei Ihnen, wenn Sie Fragen haben. Du bist dran.",
    "de",
  );
  assert.deepEqual(r.address, { formal: 3, informal: 1 });
});
test("abbreviation does not split", () => {
  const r = measure("Das gilt z. B. für alle. Ende.", "de");
  assert.equal(r.sentences.count, 2);
  assert.equal(r.words, 7);
});
test("english contractions and pronouns", () => {
  const r = measure(
    "I don't think it's ready. We'll see, won't we? You're right.",
    "en",
  );
  assert.equal(r.words, 11);
  assert.equal(r.contractionsPer1000, 363.6);
  assert.deepEqual(r.pronouns, { firstSingular: 1, firstPlural: 2, second: 1 });
  assert.equal(r.address, null);
});
test("unsupported language", () => {
  const r = measure("これはテストです。", "ja");
  assert.equal(r.pronouns, null);
  assert.equal(r.address, null);
  assert.ok(r.notes.some((n) => n.includes("not measured for ja")));
});
test("markdown structure", () => {
  const r = measure(
    "# Heading\n\n- item one\n- item two\n\nBody text here.\n\n```\ncode here\n```",
    "en",
  );
  assert.equal(r.words, 7);
  assert.equal(r.sentences.count, 3);
  assert.equal(r.paragraphs.count, 2);
  assert.equal(r.per1000.listLine, 285.7);
});
test("single sentence", () => {
  const r = measure("Just one.", "en");
  assert.deepEqual(r.sentences, {
    count: 1,
    mean: 2,
    median: 2,
    p90: 2,
    over25Share: 0,
  });
});
test("empty input throws", () => {
  assert.throws(() => measure("  \n "), /no text/);
});
test("cli: files, --json, empty stdin", () => {
  /* spawnSync process.execPath on two temp files with --json --lang en:
  status 0, JSON.parse(stdout).words === sum of both files' words;
  spawnSync with input "" and no files: status 1, stderr matches /no text/ */
});
````

The CLI test's body is the builder's, with exactly those three assertions.

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `node --test tests/brand-voice/`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `measure(text, lang)` and the CLI in `measure-text.mjs`**

Export `measure`; run the CLI only when `import.meta.url === pathToFileURL(process.argv[1]).href`. Text output (without `--json`) is a compact, labelled block the skill can paste into its analysis (one line per metric group; exact layout is the builder's). The first line always reads `measure-text: heuristic sentence splitting, numbers are approximate`.

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `node --test tests/brand-voice/`
Expected: all tests pass, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add plugins/cc-content/skills/brand-voice/measure-text.mjs tests/brand-voice/measure-text.test.mjs
git commit -m "✨ feat(brand-voice): add text measurement script"   # plus Co-Authored-By trailer
```

---

### Task 2: Guide template

**Files:**

- Create: `plugins/cc-content/skills/brand-voice/guide-template.md`

**Interfaces:**

- Produces: the section skeleton the skill fills in Step 6 and checks in refine mode. Section numbers 0–10 and their names (English, translated at generation time) are exactly those in spec §8.1. Task 4 refers to sections by these numbers.

- [ ] **Step 1: Write the template**

Contents, in this order:

1. A short "How to use this template" for the skill: every heading is translated into the guide's language; bracketed sections are conditional, with the omission rule from §8.1 (values and persuasion sections are omitted when there is no input, never filled with filler; section 5 is omitted for a single text type).
2. The skeleton of sections 0–10 per §8.1. Under each heading, give an instruction block saying what goes there, its size, and its evidence requirements. Section 1 must state: 3–5 "X, not Y" traits, NN/g tone-scale positions, 10–20 rules marked **must / should / may** in priority order, a do/don't table where every don't has an "instead", and 2–3 before/after rewrites. Section 0 must include the two "how to use" paragraphs (writers / AI) with the AI precedence order from §8.1, the owner and next review date (default +1 year), the measurement mode (_measured_ or _estimated_), and the low-confidence notes.
3. The rule-writing conventions of §8.2, verbatim in substance (one rule = behavior + scope + example; positive first, bans with replacement; measurable where possible; priority marks; evidence marks _quoted_ / _illustrative_ / _approved test draft_ / _adapted, not observed_; "we" vs. "I"; self-consistency).
4. The three owner-taste defaults from §8.2 as **offered defaults**, each phrased as a rule the interview confirms or drops.
5. A filled micro-example (English, a fictional company) of one trait in section 3 and three rules in section 1, showing the conventions in practice. Fictional only, not taken from the owner's guides.

- [ ] **Step 2: Verify structure**

Run: `grep -nE '^#{2,3} ' plugins/cc-content/skills/brand-voice/guide-template.md`
Expected: headings for sections 0 through 10 with the §8.1 names, plus the conventions and defaults sections.

Run: `grep -ciE 'must|should|may' plugins/cc-content/skills/brand-voice/guide-template.md` → non-zero; `grep -c 'instead' …` → non-zero.

- [ ] **Step 3: Commit** — `📝 docs(brand-voice): add guide template`

---

### Task 3: Analysis, interview and language references

**Files:**

- Create: `plugins/cc-content/skills/brand-voice/analysis-criteria.md`
- Create: `plugins/cc-content/skills/brand-voice/interview-guide.md`
- Create: `plugins/cc-content/skills/brand-voice/language-layer.md`

**Interfaces:**

- Produces: the files Task 4 imports with **Read when:** notes: analysis (Step 4), interview (Step 5), language layer (Steps 2, 5, 6).

- [ ] **Step 1: Write `analysis-criteria.md`**

The n8n criteria I–VIII (§4 Step 4), each group with its sub-questions (taken from the n8n prompt and recorded in the spec), plus:

- a mapping table criterion → guide section (Task 2 numbering) → which `measure-text` fields ground it;
- the voice-vs-noise filters from §4 Step 3 (errors, inconsistent terms, single-author features; idiolect rule for personal voices);
- the hypothesis presentation format from §4 Step 4 (4–8 traits; one-line description; tone-scale position; 2–3 quoted samples; supporting measurement; stated-vs-actual note; keep / change / drop);
- the sufficiency thresholds (< ~2,000 / 2,000–5,000 / ≥ ~5,000 words per text type) and the clustering decision (tone variant / separate voice / exclude).

- [ ] **Step 2: Write `interview-guide.md`**

Question banks keyed by gap, not a script. Groups: framing (whose voice, scope, language, starting point; §4 Step 2), define mode, values, persuasion and ethics, language-layer decisions, hard bans, test-draft reactions (how to turn "too stiff" into a rule change). Rules at the top: one question at a time; skip what context or samples already answered; accept "skip"; omission rule for values and persuasion. Questions are written so the skill asks them in the user's language.

- [ ] **Step 3: Write `language-layer.md`**

The per-language checklist from §6: address form, contractions, inclusive-language policy (options plus normative status, including the 2024 Rat für deutsche Rechtschreibung statement, the Académie française and RAE positions), typography, readability target (CEFR + sentence-length proxies; formulas only as trend indicators: Amstad/WSTF de, Flesch en, INFLESZ es, LIX Nordic, none CJK), and the readability-pattern adaptation rule pointing to `../_shared/readability-patterns.md`. Then worked entries for German and English (the tested languages), the seeding-from-another-language procedure, and the native-speaker check note for other languages (§6 "Depth per language in v1").

- [ ] **Step 4: Verify**

Run: `grep -c 'Rat für deutsche Rechtschreibung\|CEFR\|readability-patterns.md' plugins/cc-content/skills/brand-voice/language-layer.md` → ≥ 3.
Run: `grep -nE '^## ' plugins/cc-content/skills/brand-voice/analysis-criteria.md` → I–VIII present.

- [ ] **Step 5: Commit** — `📝 docs(brand-voice): add analysis, interview and language references`

---

### Task 4: SKILL.md

**Files:**

- Create: `plugins/cc-content/skills/brand-voice/SKILL.md`

**Interfaces:**

- Consumes: the Task 1 CLI (`node "${CLAUDE_SKILL_DIR}/measure-text.mjs" --lang <code> <files>`); Task 2 section numbers; Task 3 files.
- Produces: a skill invoked as `/cc-content:brand-voice`; a guide file registered in `## Context files`; learnings tagged `[cc-content:brand-voice]`.

- [ ] **Step 1: Write frontmatter and imports**

```yaml
name: brand-voice
description:
  > # builder writes it; must include triggers: "create a brand voice guide", "build a writing style guide",
  # "tone of voice guide", "style guide from our texts", "Styleguide erstellen", "update our brand voice guide",
  # and say it works from samples, an interview, or both, in any language. State that it does not draft content.
allowed-tools: Read, Write, Edit, Bash, WebFetch
argument-hint: "[optional: sample files/URLs, or path of a guide to refine]"
```

Imports with **Read when:** for the four companion files plus `../_shared/readability-patterns.md` and `../_shared/persuasion-principles.md`.

- [ ] **Step 2: Write the flow**

Headings `## Step 0` … `## Step 9` and `## Refine mode`, implementing §4 and §5 exactly, in the house style of `humanize/SKILL.md` (quoted prompts in `>` blocks, one question at a time). Points that must be explicit because they are easy to lose:

- Step 1: detect existing guides semantically (via summaries); with several, ask which one to refine or whether to create a new one.
- Step 3: group samples by language and text type; run the script per group with its `--lang`; check `command -v node` first and use the _estimated_ fallback otherwise; fetch URLs with WebFetch, main content only.
- Step 4: the model explains the measurements and quotes samples; it never invents an impression without evidence.
- Step 7: max. three test passages; script + rule-by-rule check + readability pass before showing; each user reaction becomes a shown rule diff.
- Step 8: path rules, registration row (label + summary naming whose voice, scope, language), final message contents.
- Refine mode: numbered change proposals, accept/reject each, "As of" + change log; template-restructure offer for foreign guides; never overwrite without consent.

- [ ] **Step 3: Verify structure**

Run: `grep -nE '^## (Step [0-9]|Refine mode)' plugins/cc-content/skills/brand-voice/SKILL.md`
Expected: Steps 0–9 and Refine mode, in order.

Run: `grep -c 'measure-text.mjs\|command -v node\|estimated\|\[cc-content:brand-voice\]' plugins/cc-content/skills/brand-voice/SKILL.md` → ≥ 4.

- [ ] **Step 4: Commit** — `✨ feat(brand-voice): add brand-voice skill`. The pre-commit hook adds a Key Config Files row with "TODO: add description". Replace it in `CLAUDE.md` with `Skill: Build or refine a brand voice guide from samples, interview, and project context` and amend before moving on.

---

### Task 5: Integrations and docs

**Files:**

- Modify: `plugins/cc-content/skills/session-wrap/SKILL.md` (Step 5, the promotion options block)
- Modify: `plugins/cc-content/skills/content-onboarding/SKILL.md` (Step 4, "For brand voice / writing style:")
- Modify: `plugins/cc-content/skills/_shared/context-categories.md` ("Brand voice / writing style" section)
- Modify: `README.md` (skills table), `CLAUDE.md` (`## Skills` table)

**Interfaces:**

- Consumes: skill name `brand-voice`; guide section numbering from Task 2; rule conventions §8.2.

- [ ] **Step 1: session-wrap.** Add a promotion option shown only when the pattern concerns voice (tone, wording, phrasing, punctuation habits) and at least one voice guide is registered: "(c) Add a rule to the brand voice guide `<path>`". Dismiss becomes (d). Its handler drafts the rule per §8.2, shows it, inserts it into the matching guide section, appends a change-log entry with today's date, and asks which guide when several are registered. Update the existing "(a)/(b)/(c)" references in that step accordingly.

- [ ] **Step 2: content-onboarding.** Directly under "**For brand voice / writing style:**", before question 1, insert the hand-off offer from spec §10 ("Changes to existing skills"): full guide via `/cc-content:brand-voice` (recommended when samples exist or the voice matters for ongoing content) vs. the quick five questions. The quick path continues unchanged.

- [ ] **Step 3: context-categories, README, CLAUDE.md.** One line in context-categories ("Produced by `cc-content:brand-voice`; …"). README row: `/cc-content:brand-voice` — builds or refines a brand voice guide from your texts, an interview, or both, in any language, for writers and AI. CLAUDE.md `## Skills` row in the same style as its neighbours.

- [ ] **Step 4: Verify**

Run: `grep -n 'brand voice guide\|brand-voice' plugins/cc-content/skills/session-wrap/SKILL.md plugins/cc-content/skills/content-onboarding/SKILL.md plugins/cc-content/skills/_shared/context-categories.md README.md CLAUDE.md`
Expected: hits in all five files; in session-wrap, options (a)–(d) appear once each in Step 5.

- [ ] **Step 5: Commit** — `✨ feat: route voice learnings and onboarding to brand-voice`

---

### Task 6: Fixtures and end-to-end dry runs

**Files:**

- Create: `tests/brand-voice/fixtures/de-org/` (5–7 German website-style texts of a **fictional** mid-size B2B company, ≥ 2,500 words total, Sie-form, one of them an English product page)
- Create: `tests/brand-voice/fixtures/en-personal/` (8–10 English LinkedIn-style posts of a **fictional** person, ≥ 2,000 words total, plus one 300-word newsletter intro as a second, thin text type)
- Create: `tests/brand-voice/README.md` (how to run the script tests and the dry-run scenarios, acceptance checklist)

**Interfaces:**

- Consumes: everything above.

- [ ] **Step 1: Write the fixtures.** Fictional names and companies only. Give each corpus a deliberate, detectable voice (e.g. the German one: matter-of-fact, Sie, short sentences, no exclamation marks, colons before explanations; the English one: first person, contractions, ironic asides, question endings), so the dry run can check that the guide finds it.

- [ ] **Step 2: Run the script on both corpora**

Run: `node plugins/cc-content/skills/brand-voice/measure-text.mjs --lang de tests/brand-voice/fixtures/de-org/*.md` (and `--lang en` for the other corpus)
Expected: exit 0; for de-org `address.formal > 0` and `address.informal == 0`; for en-personal `contractionsPer1000 > 0`.

- [ ] **Step 3: Dry-run scenarios.** In a scratch project outside the repo (empty `CLAUDE.md`, plus a minimal `context/positioning.md` for scenario A), follow `SKILL.md` literally, playing the user with scripted answers recorded in `tests/brand-voice/README.md`:
  - **A — describe, German org:** de-org corpus, scope "website and blog", language de. Expect: the English page is flagged and excluded, traits match the planted voice, and the guide is in German throughout with Sie rules, German typography, and German readability examples.
  - **B — reshape, English personal:** en-personal corpus, scope "LinkedIn posts and newsletters"; mark one trait "change". Expect: the newsletter is flagged low-confidence, the changed trait is reflected in the rules, and "I" perspective is used.
  - **C — define, no samples, German:** interview only. Expect: all examples marked _illustrative_, approved test drafts land in section 9, and the values/persuasion sections are omitted when the scripted answers give nothing.
  - **D — refine:** a scratch project with a five-line onboarding-style voice note registered, then run the skill. Expect: restructure offer, numbered change proposals, a change-log entry, and nothing overwritten without a yes. Then create a second guide and confirm Step 1 asks which guide to refine.
  - Repeat scenario A once with `node` hidden from `PATH`. Expect: a complete guide with _estimated_ labels.

- [ ] **Step 4: Acceptance check** of every produced guide against `tests/brand-voice/README.md`'s checklist: sections per §8.1 (conditionals correct); priority core has 10–20 rules with must/should/may; every don't has an instead; examples carry evidence marks; header complete; exemplar texts 3–6 per text type (or fewer only in define mode with a note); registered row present. Then compare one guide side by side with the owner's local guides in `~/Git-Repos/temp/` (do not copy anything from them) and note gaps in depth.

- [ ] **Step 5: Fix what the dry runs found** in Tasks 2–5 files, re-run the affected scenario, and repeat until the checklist passes.

- [ ] **Step 6: Commit** — `✅ test(brand-voice): add fixtures and dry-run scenarios` (fixtures, README, and any fixes as separate commits with their own types).
