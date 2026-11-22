# AI-Tells Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One shared, evidence-tiered catalog of AI-writing tells that every cc-content drafting skill checks against, a reworked `humanize` skill that uses it without overcorrecting, and a repo-local maintainer skill that refreshes the catalog manually from Wikipedia (all languages) and other sources as a reviewed proposal.

**Architecture:** `_shared/ai-tells.md` holds the catalog as Markdown tables (tell, examples, tier, scope, status, source). The readability pass in `_shared/readability-patterns.md`, which 31 skills already run after drafting, gains one step that checks the catalog, so no drafting skill needs its own edit. `humanize` counts catalog entries by tier and reports content-level problems without rewriting them. `.claude/skills/refresh-ai-tells/` (not shipped with the plugin) diffs the sources since the last sync and proposes catalog changes on a branch.

**Tech Stack:** Markdown skill files; Node 18 `node:test` (no dependencies) for the catalog structure test; WebFetch for the refresh (the repo denies `curl`/`wget`).

**Spec:** The decisions from the 2026-11-22 session, summarized under "Decisions" below (no separate spec file).

## Decisions

- Scope: cc-content only. No other plugin repo has AI-tell rules; cc-concept delegates drafting to cc-content.
- Refresh: manual, via the maintainer skill. No scheduled routine.
- Evidence tiers: **A** measured in a corpus or performance study (Reinhart, Graphite, SlopBench, Shaib); **B** curated by a large editor community or consistent across several independent sources (Wikipedia); **C** single practitioner source (tropes.fyi, t3n). Humanize counts A/B hits individually and C hits only in clusters.
- Every entry carries its source keys. Entries from this project's own research (`cc-research`) must survive a refresh even if Wikipedia doesn't list them.
- Wikipedia's "Ineffective indicators" and "Historical indicators" are honored: ineffective entries are never counted, historical ones only in clusters.
- The skill targets human readers, not AI detectors (Russell et al.: experienced readers catch "humanized" text anyway).
- Content-level slop (density, relevance, tone; Shaib et al.) is reported, never rewritten, because humanize must not change claims.

## Global Constraints

- Wikipedia text is CC BY-SA, the plugin is MIT: describe every pattern in our own words; only short example phrases may be quoted. Reinhart et al. is CC BY-NC-ND: cite figures, never copy text. tropes.fyi and Shaib et al. are CC BY 4.0: attribute them in the Sources table.
- New Markdown paragraphs are single unbroken lines (no hard wrapping). Unchanged lines in existing files keep their wrapping.
- New `_shared/ai-tells.md` gets `_Last updated: 2026-11-22_` by hand; on modified `_shared/*.md` files the pre-commit stamp script sets the date, so never edit it by hand there.
- Default em-dash threshold is the brand-voice offered default: at most one per paragraph, or the brand voice's own rate. The spaced en dash is normal German typography.
- Commits: Conventional Commits with gitmoji, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Work on branch `feat/ai-tells-catalog` from `origin/main`; never push to `main` (it triggers a release); open a PR.
- Do not touch the files changed in PR #19 (LinkedIn, X, Facebook, Instagram skills, `persuasion-principles.md`, `new-content-skill/SKILL.md`), so both PRs merge independently.

## Review Focus

1. A draft with one paired em dash per paragraph, or German spaced en dashes at the brand-voice rate: humanize must not count or remove them. Pinned by dry-run scenario H1 (Task 3).
2. An honest qualifier that carries meaning ("may" in a health or legal claim): humanize keeps it, because removing it changes the claim. Pinned by H1.
3. A single tier-C hit or a single catalog vocabulary word in a paragraph: not counted. Pinned by H1 and H2.
4. A padded, generic paragraph: listed under "Content findings (unchanged)" while its wording is only style-fixed. Pinned by H1.
5. A refresh in which Wikipedia drops or moves a pattern that also has another source: the entry stays and only its source keys change; `cc-research` entries can never disappear. Pinned by the catalog test `cc-research entries are present` (Task 1) and the maintainer skill's filter rule (Task 4).

---

### Task 1: Catalog file and structure test

**Files:**

- Create: `plugins/cc-content/skills/_shared/ai-tells.md`
- Create: `tests/ai-tells/catalog.test.mjs`
- Modify: `CLAUDE.md` (section "Tests": add `node --test tests/ai-tells/`)

**Interfaces:**

- Produces: the catalog format every later task relies on. Each category is a `##` section containing one table with exactly this header: `| Tell | Looks like | Tier | Scope | Status | Sources |`. Allowed values: Tier `A`/`B`/`C`; Scope `all` (any text), `marketing` (social posts, ads, landing pages, marketing emails), `social` (social posts only); Status `current`, `rising`, `fading`, `historical`, `ineffective`; Sources = comma-separated keys defined in the `## Sources` table (`| Key | Source | Type | License | Last checked |`).
- Produces section names later tasks reference: `## How to use this catalog`, `## Content-level slop (report only)`, `## Ineffective indicators (never count)`, `## Signs of human writing (rewrite targets)`, `## Language notes`, `## Sources`.

- [ ] **Step 1: Write the failing test** `tests/ai-tells/catalog.test.mjs` with these tests:
  - `catalog exists and has a Last updated line`: file matches `/^_Last updated: \d{4}-\d{2}-\d{2}_$/m`.
  - `every catalog row is well-formed`: for every table with the header above, each body row has 6 cells, a non-empty Tell and Looks like, Tier in `{A,B,C}`, Scope in `{all,marketing,social}`, Status in the five allowed values.
  - `every source key is defined`: every key in a Sources cell appears in the Key column of the `## Sources` table.
  - `cc-research entries are present`: at least one row has `cc-research` among its sources and the tell names "Reflex closing question" and "Rhetorical question opener" both exist.
  - `required sections exist`: all six section names listed under Interfaces are present.
- [ ] **Step 2: Run it to verify it fails.** Run: `node --test tests/ai-tells/` Expected: FAIL (file not found).
- [ ] **Step 3: Write `_shared/ai-tells.md`.** Intro (purpose, "signs, not proof: count clusters", readers not detectors, don't overcorrect), `## How to use this catalog` (the counting rules from Task 3 Step 3 in short form, so drafting skills apply the same rules, plus the general exemption: words or devices the loaded brand voice or audience uses are not hits), then these category tables (examples in our own words; German examples where known):
  - **Significance and importance:** importance flagging ("this matters", "why X matters") A/all/current/graphite; inflated significance ("stands as a testament", "plays a pivotal role") B/all/current/wiki-en; grandiose stakes C/all/rising/tropes.
  - **Contrast frames:** negative parallelism ("It's not X, it's Y"; „nicht nur … sondern auch") A/all/current/graphite,slopbench,wiki-en; "more than an X" frame („mehr als ein X, es ist ein Y") A/all/current/graphite; corrective "rather than simply"/"instead, it" A/all/current/graphite,wiki-en; "Not X. Not Y. Just Z." C/all/current/tropes.
  - **Structure and rhythm:** rule of three A/all/current/slopbench,wiki-en (note: saturated in social posts); template repetition and uniform sentence rhythm A/all/current/shaib,wiki-de; short punchy fragments C/social/rising/tropes; excessive enumeration C/all/rising/tropes; question-colon reveal ("The result? A 40% drop.") C/all/fading/tropes; quotable one-liner tie-backs C/all/rising/tropes.
  - **Grammar:** present participial tails ("…, highlighting its role") A/all/current/reinhart,wiki-en; nominal style A/all/current/reinhart (point to readability pattern 4 for the fix); copula avoidance ("serves as", "boasts") B/all/fading/wiki-en; synonym cycling C/all/rising/tropes.
  - **Vocabulary (dated):** current Claude-family words ("dependable", "steady", "thoughtful", "meaningful", "adds another layer"; „zuverlässig") A/all/current/graphite; current GPT-family words ("another dimension", "not simply"; „eine weitere Dimension") A/all/current/graphite; "quietly" and similar magic adverbs C/all/current/tropes; 2023–2024 words ("delve", "tapestry", "testament", "vibrant", "intricate") A/all/historical/wiki-en,slopbench; German buzzwords („In der heutigen Zeit“, „auf das nächste Level heben“) C/all/current/t3n.
  - **Openers and closers:** rhetorical question opener B/all/current/cc-research,tropes (counts: a generic question in body copy whose answer is obvious or irrelevant, used as a hook: "Ever wondered…?", "Struggling with X?", "What if you could…?", "Imagine a world where…"; not a hit: a specific question the text answers right away, titles/headlines/subject lines (format guidelines decide), FAQ sections, quotes); reflex closing question B/all/current/cc-research (counts: a generic engagement prompt not tied to an answer the author needs: "What about you?", "Thoughts?", "Let me know in the comments"; not a hit: an email ask phrased as a question, such as yes/no, a choice of options or a date, which is the CTA) — scope `all` per the user's decision after the format research; preamble ("Let's break this down", "Here's the thing") C/all/fading/tropes; stock outlook ending ("Looking ahead", "Despite these challenges") A/all/current/graphite,wiki-en; signposted or repeated summaries ("In summary", "Overall,") C/all/current/tropes.
  - **Attribution and hedging:** vague attributions ("Experts argue", "Studies show") B/all/current/wiki-en,tropes; empty hedge clusters and hedging disclaimers ("may potentially", "based on available information") B/all/current/wiki-en (note: hedging varies by model, count clusters only); didactic disclaimers ("It's important to note") B/all/fading/wiki-en,tropes.
  - **Formatting:** dash overuse above the brand-voice rate A/all/fading/slopbench,wiki-en; dash avoidance turned into comma or full-stop chains B/all/rising/wiki-en; bold-first bullets and bold overuse B/all/current/wiki-en,tropes; emoji as bullets or heading decoration B/all/current/wiki-en,wiki-de; title-case headings in English B/all/current/wiki-en; Unicode decoration C/social/fading/tropes.
  - **Chatbot residue:** chatbot meta-talk addressed to whoever requested the draft, not to the reader ("Certainly! Here is your post:", "I hope this helps" after a delivered draft; „Natürlich! Hier ist …“) B/all/current/wiki-en,wiki-de (the same phrases written by a sender to a recipient, e.g. in a personal email, are not hits); placeholders ("[Your Name]", "2025-XX-XX") B/all/current/wiki-en; knowledge-cutoff statements B/all/historical/wiki-en.
  - `## Content-level slop (report only)`: low information density A/all/current/shaib; generic content that could fit any company A/all/current/shaib; tone mismatch (uniform positivity, stacked enthusiasm) A/all/current/shaib.
  - `## Ineffective indicators (never count)`: transition words on their own, perfect grammar or formal prose alone, a single AI-vocabulary word; all B/all/ineffective/wiki-en.
  - `## Signs of human writing (rewrite targets)` (prose list, not a table): plain "is/has", plain verbs ("wrote", not "authored"), honest qualifiers, agentless passive where natural, clausal coordination, varied sentence length, details only the author knows. Sources: wiki-en, reinhart.
  - `## Language notes`: German (spaced en dash is normal typography, count overuse only; "darüber hinaus"/"außerdem" overuse; calqued chatbot phrases; nominal style; no German corpus study exists, so German entries are lower confidence). Other languages: filled by the first refresh (Task 6).
  - `## Sources` table with keys `wiki-en`, `wiki-de`, `graphite`, `reinhart`, `shaib`, `slopbench`, `tropes`, `t3n`, `cc-research` (type, license, last checked 2026-11-22).
- [ ] **Step 4: Run the test.** Run: `node --test tests/ai-tells/` Expected: PASS, 5 tests.
- [ ] **Step 5: Add `node --test tests/ai-tells/` to the "Tests" section of `CLAUDE.md`.**
- [ ] **Step 6: Commit** `✨ feat(shared): add evidence-tiered AI-tells catalog` with the three files plus this plan (`docs/superpowers/plans/2026-11-22-ai-tells-catalog.md`), on `feat/ai-tells-catalog` created from `origin/main` (the plan file is currently untracked on PR #19's branch and must not go into #19).

### Task 2: Wire the catalog into the readability pass; align em-dash rules

**Files:**

- Modify: `plugins/cc-content/skills/_shared/readability-patterns.md` (section "The readability pass", after step 3)
- Modify: `plugins/cc-content/skills/long-tail-copy/SKILL.md:252-255` (self-edit item 5)
- Modify: `plugins/cc-content/skills/atomize/SKILL.md:268-270` (em-dash clause in self-edit pass 2)

**Interfaces:**

- Consumes: catalog sections and counting rules from Task 1.

- [ ] **Step 1: Add step 4 to the readability pass:** "AI-tell check: scan the draft against `ai-tells.md` using its 'How to use this catalog' rules (scope matching the format; tier C, historical entries and single vocabulary words only in clusters; never the ineffective indicators). Fix hits with the 'Signs of human writing' targets; a fix must not create another catalog entry." Keep the pass silent by default, as it already states.
- [ ] **Step 2: Replace long-tail-copy item 5** ("AI tells — em-dash insertions", which removes every dash-set-off insertion) with: "AI tells — run the AI-tell check from `../_shared/ai-tells.md`; dashes count only above the brand voice's rate (default: more than one per paragraph)."
- [ ] **Step 3: Replace the atomize clause** "em-dash-set-off parenthetical insertions … rewritten as clean sentences — a frequent AI tell" with the same rule in one clause.
- [ ] **Step 4: Verify** with `grep -n "em-dash\|em dash" plugins/cc-content/skills/long-tail-copy/SKILL.md plugins/cc-content/skills/atomize/SKILL.md` Expected: no rule that removes every dash; and `grep -n "ai-tells.md" plugins/cc-content/skills/_shared/readability-patterns.md` Expected: one hit.
- [ ] **Step 5: Commit** `♻️ refactor(skills): check AI tells via shared catalog in readability pass`.

### Task 3: Rework humanize; dry-run scenarios

**Files:**

- Modify: `plugins/cc-content/skills/humanize/SKILL.md` (frontmatter description, Step 3, Step 4, Step 5)
- Create: `tests/humanize/README.md`
- Create: `tests/humanize/fixtures/en-social-post.md`, `tests/humanize/fixtures/de-blog-paragraphs.md`, `tests/humanize/fixtures/en-personal-email.md`

**Interfaces:**

- Consumes: catalog format and sections from Task 1.

- [ ] **Step 1: Write the fixtures and `tests/humanize/README.md`** with three dry-run scenarios (run in a scratch project with a short brand-voice note registered, follow `SKILL.md` literally):
  - **H1, English LinkedIn post** (fixture planted with): "this matters" and "is more than a tool, it's a…" (must count, tier A); a reflex closing question (must count, marketing scope); exactly one paired em dash per paragraph (must not count); "may lower the risk" in a health claim (must stay); a single "tapestry" (must not count); one generic padded paragraph (must appear under "Content findings (unchanged)").
  - **H2, German blog paragraphs:** spaced en dashes at one per paragraph (must not count); „nicht nur … sondern auch“ (must count); „zuverlässig“, „eine weitere Dimension“ and „In der heutigen Zeit“ in one paragraph (cluster, must count); one paragraph with a single „Darüber hinaus“ (must not count). Then rerun H2 with a brand-voice note that prescribes „zuverlässig“ as a core term: it must not count, and the cluster drops below the threshold.
  - **H3, personal email:** a short personal-email draft that ends "I hope this helps" addressed to the recipient: the line must stay and must not count.
- [ ] **Step 2: Run H1–H3 against the current skill** and note the failures (expected: dashes counted, the hedge removed, catalog tells missed). This is the failing baseline.
- [ ] **Step 3: Rewrite Step 3 (detection).** Read `../_shared/ai-tells.md`. Count entries whose scope fits the draft (`all` always; `marketing` for marketing and social drafts; `social` for social posts). Tier A/B with status current/rising/fading: each hit counts. Tier C and historical entries: count only when two or more different such entries appear in the same paragraph. Vocabulary entries: count only when three or more catalog words appear in one paragraph. Never count `ineffective` entries. Dashes count only above the brand voice's rate (default: more than one per paragraph). Hedges and transitions count only as clusters that add no information. Keep the existing cross-section template procedure and the six readability patterns unchanged. Remove the old fixed marker list (em-dash parentheticals, overused transitions, generic AI phrases, colons/semicolons, hedge words) except where the catalog does not cover a marker: keep "excessive colons/semicolons" and "formulaic structure" as they are.
- [ ] **Step 4: Rewrite Step 4 rule 2:** fix every counted marker using "Signs of human writing" as targets; a replacement must not create another catalog entry (for example dashes turned into comma chains or fragments). Add to rule 1: qualifiers that carry meaning stay, since removing them changes the claim.
- [ ] **Step 5: Change the Step 5 output:** marker lines become `<marker> [<tier>]: <count> — <brief example>`; add a block "Content findings (unchanged)" after the humanized draft, listing catalog content-level slop with one example each, or "none".
- [ ] **Step 6: Add to the frontmatter description** one sentence: it revises text for human readers and is not a tool for evading AI detectors.
- [ ] **Step 7: Run H1–H3 again.** Expected: every "must count", "must not count" and "must stay" expectation holds.
- [ ] **Step 8: Commit** `✨ feat(humanize): detect tells by catalog tier and report content findings`.

### Task 4: Maintainer skill for the manual refresh

**Files:**

- Create: `.claude/skills/refresh-ai-tells/SKILL.md`
- Create: `.claude/skills/refresh-ai-tells/sync-state.md`
- Modify: `CLAUDE.md` (Key Config Files row for the new SKILL.md, which the pre-commit sync adds with "TODO: add description")

**Interfaces:**

- Consumes: catalog format, allowed values and Sources table from Task 1.
- Produces: `sync-state.md` table `| Source | Identifier | Last synced revision | Date |`, one row per Wikipedia language (en, de, fi, fr, he, pt, ru, sr, th, zh, with page titles from the langlinks API), plus rows for tropes.fyi (snapshot of tags) and Graphite (latest report URL). Initial values: en `1387041075`, de `272281177`, the others `none` (first run reads the full page).

- [ ] **Step 1: Write `SKILL.md`** (frontmatter `name: refresh-ai-tells`, description "Manually refresh plugins/cc-content/skills/_shared/ai-tells.md from its sources as a reviewed proposal"). Steps:
  1. Create branch `chore/refresh-ai-tells-<YYYY-MM-DD>` from `origin/main`; stop if the working tree is dirty.
  2. Read `sync-state.md` and the catalog.
  3. For each Wikipedia language: get the current revision via WebFetch of `https://<lang>.wikipedia.org/w/api.php?action=query&titles=<title>&prop=revisions&rvprop=ids|timestamp&format=json`. If unchanged, skip. If changed, read only the changes via `action=compare&fromrev=<last>&torev=<current>`, asking WebFetch for the verbatim added and removed lines plus their section headings (not a summary), so proposals rest on the actual text; if `none`, read the whole page. Also re-read the English langlinks to catch new language versions.
  4. tropes.fyi: compare tags and entries with the snapshot. Graphite: check its research list for AI-tells reports newer than the recorded one.
  5. Filter (reuse the gaming-tactics filter in `plugins/cc-content/skills/new-content-skill/SKILL.md`): skip Wikipedia-specific signs (citations, wiki markup, notability, article sections); respect "ineffective" and "historical" moves; check context flips (a human sign in an encyclopedia can be puffery in marketing); from non-English pages take only language-specific tells; never remove an entry that still has another source, and never remove `cc-research` entries.
  6. Present a numbered proposal (add, change tier/status/sources, move to historical or ineffective, language notes), each with source and evidence. Apply only the items the user approves; write in our own words (license rule).
  7. Update `sync-state.md` and the Sources table's "Last checked" column, run `node --test tests/ai-tells/`, commit, push the branch, open a PR. Never push to `main`, never merge.
- [ ] **Step 2: Write `sync-state.md`** with the initial values above.
- [ ] **Step 3: Commit;** the pre-commit hook adds the CLAUDE.md row. Replace its "TODO: add description" with "Maintainer skill: manual, reviewed refresh of the AI-tells catalog (not shipped)" and amend.
- [ ] **Step 4: Verify** `grep -n "refresh-ai-tells" CLAUDE.md` Expected: one row, no "TODO".

### Task 5: Blog and landing-page question headlines

**Files:**

- Modify: `plugins/cc-content/skills/blog-article/format-guidelines.md:63-67` (Headline zone)
- Modify: `plugins/cc-content/skills/landing-page/format-guidelines.md` (headline rules around line 68)

**Interfaces:**

- Consumes: the catalog entry "Rhetorical question opener" (Task 1), which leaves titles and headlines to the format guidelines.

- [ ] **Step 1: Blog headline zone.** Replace "how-to / question-style headlines empirically over-perform on traffic and backlinks" with a qualified rule: list and how-to headlines over-perform; question titles are contested (Backlinko: +23% shares across 912M posts; Fang & Wheeler 2026, _Journal of Consumer Psychology_, four studies incl. news-headline A/B tests: question titles lower engagement because they read as less informative). A specific question that matches a real search query ("How long does a heat pump install take?") can work; a rhetorical one ("Is your marketing broken?") cannot.
- [ ] **Step 2: Landing-page headline rule.** Add: prefer a benefit statement to a question headline; in the published A/B comparisons question headlines lost (MarketingSherpa: statement +167% conversions; Unbounce: question last in three tests; vendor case studies, consistent direction).
- [ ] **Step 3: Verify** `grep -n "question" plugins/cc-content/skills/blog-article/format-guidelines.md plugins/cc-content/skills/landing-page/format-guidelines.md` Expected: no unqualified claim that question headlines over-perform; the landing-page rule present.
- [ ] **Step 4: Commit** `📝 docs(blog-article,landing-page): qualify question headlines with current evidence`.

### Task 6: First refresh run (baseline for all languages)

**Files:**

- Modify: `plugins/cc-content/skills/_shared/ai-tells.md` (language notes and any approved entries)
- Modify: `.claude/skills/refresh-ai-tells/sync-state.md`

**Interfaces:**

- Consumes: the maintainer skill from Task 4 (run it on the feature branch instead of a new branch, since this is the baseline).

- [ ] **Step 1: Run the maintainer skill's steps 2–6.** Expected: full reads for fi, fr, he, pt, ru, sr, th, zh; a diff read for en and de if they changed since 2026-11-22; a numbered proposal.
- [ ] **Step 2: Present the proposal to the user** and apply only the approved items.
- [ ] **Step 3: Verify** `node --test tests/ai-tells/` Expected: PASS; `sync-state.md` has a revision for all 10 languages.
- [ ] **Step 4: Commit** `📝 docs(shared): baseline AI-tells catalog from all Wikipedia languages`, push `feat/ai-tells-catalog`, open the PR.
