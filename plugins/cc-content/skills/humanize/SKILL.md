---
name: humanize
description: >
  Use this skill to remove AI "tells" from an existing draft and make it read as
  human-written, calibrated to the project's brand voice. Invoke when the user says
  "humanize this", "make this sound less AI", "remove AI tells from this", "this
  reads like ChatGPT wrote it", "polish this draft to sound human", or pastes a
  draft and asks for a more authentic-sounding version. Also use it when a draft is
  "hard to read" or "too dense" — it removes the sentence-level patterns LLM text
  overuses (coinages, noun stacks, objects acting like people). Works on drafts from
  any source — the owner's own writing, another tool's output, or a previous
  cc-content skill's draft. Do NOT use it to generate new content from scratch; it
  only revises an existing draft. It revises text for human readers and is not a
  tool for evading AI detectors.
allowed-tools: Read, Write, Edit, Bash
argument-hint: "[optional: path to the draft to humanize]"
---

@../\_shared/readability-patterns.md **Read when:** detecting markers in Step 3 and rewriting in Step 4

@../\_shared/ai-tells.md **Read when:** detecting markers in Step 3 and rewriting in Step 4

# Humanize Skill

You are helping the owner remove AI "tells" from an existing draft and produce a
version that reads as genuinely human-written, calibrated to the company's brand
voice. This skill takes **any** draft regardless of origin — it is not limited to
drafts produced by other `cc-content` skills.

This skill is **format-, language-, industry-, and audience-neutral**. It carries the
detection and rewrite craft below but calibrates every stylistic choice to the loaded
brand voice — a formal-voice project and a casual-voice project get different
rewrites of the same input.

## Step 0: Recall learnings

Read `../_shared/learnings-protocol.md` and follow its **Recall** section.

## Step 1: Load context

Read the context table from all loaded CLAUDE.md files:

```bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
```

CLAUDE.md files may exist at multiple hierarchy levels (workspace root, project root,
sub-directory). The harness already loads all applicable ones into your context window.
If multiple `## Context files` tables exist, rows from more specific CLAUDE.md files
take precedence over less specific ones.

**If no context table is found** in any loaded CLAUDE.md, ask once:

> "I don't see any context files registered. Would you like to:
> (a) Pause and run `/content-onboarding` to set up context
> (b) Continue without project context (humanization will use generic style choices)"

Stop if (a); note "generating without project context" and continue if (b).

**If a context table exists**, read every file listed in the **File** column, and
identify which one covers **brand voice** (writing style, tone, vocabulary, phrasing
rules, things to avoid) by matching against each file's **Summary** entry — this is
the **only** need this skill gates on. Organization background, audience, and output
language are noted silently if present and **never block** — humanization revises
style, not substance, so it doesn't need them to do its job.

**Coverage gap — brand voice:**

If no loaded file plausibly covers brand voice, ask once:

> "I don't see any writing style or brand voice context. Is this intentional, or
> should I pause while you run `/content-onboarding`?"
>
> - **Intentional**: note the gap; label the output `⚠ DEGRADED OUTPUT — no brand voice context` and fall back to generic human-writing conventions (varied rhythm, contractions, concrete detail) without a specific tone target.
> - **Pause**: direct the owner to onboarding and stop.

## Step 2: Get the draft

Resolve the draft to humanize, in this order:

1. If the owner passed a file path as an argument (`$ARGUMENTS`), read it.
2. If the owner pasted text in the request, use that.
3. If neither, ask: _"Paste the draft you want humanized, or give me a file path."_

## Step 3: Detect AI markers (Pass 1)

**Catalog markers.** Scan the draft against `../_shared/ai-tells.md` and count each catalog entry as its own marker type (vocabulary rows together as one), by that file's "How to use this catalog" rules:

- Count entries whose scope fits the draft: `all` always; `marketing` for social posts, ads, landing pages, and marketing emails; `social` for social posts only.
- Tier A and B entries with status `current`, `rising`, or `fading`: every hit counts.
- Counting unit: a paragraph of prose; in social posts and other line-broken formats, the whole post (each thread post on its own).
- Tier C entries and `historical` entries: count only when two or more different such entries appear in the same counting unit. Vocabulary rows are exempt from this rule. Chatbot residue rows always count, whatever their status.
- Vocabulary rows: count only when three or more catalog words, from any vocabulary row, appear in one counting unit. Report them as one marker, `AI vocabulary`, tagged with the highest tier among the words found.
- Never count `ineffective` entries (a lone "Moreover" is not a marker).
- Words, devices, and punctuation the loaded brand voice or audience uses are not hits.
- Dashes count only above the brand voice's rate. A pair of dashes around one insertion counts as one. If the brand voice names no number, the default is more than one per paragraph of prose, or more than two per social post. The spaced dash is normal typography in German, Russian, and Serbian.
- Hedges count only as clusters that add no information. A qualifier that changes what a sentence claims ("may lower the risk", "in most cases") is content, not a marker.
- Read each entry's "Looks like" cell for what is not a hit (for example, an email ask phrased as a question is not a reflex closing question).

Also note every entry from the catalog's "Content-level slop (report only)" table that applies. These are reported in Step 5, never rewritten in Step 4.

**Structural markers.** Then scan for these, which the catalog doesn't cover. Too-perfect parallel structure replaces the catalog's "Template repetition" entry, so count that pattern only here:

- **Formulaic structure** — a rigid intro–3 points–conclusion shape with no
  variation.
- **Excessive colons/semicolons** — used as a crutch for list-like sentences instead
  of natural prose.
- **Too-perfect parallel structure** — this marker has two cases; scan for both:
  - _Within-passage:_ every sentence in a single passage sharing the exact same
    grammatical shape.
  - _Cross-section template repetition:_ the same sentence-opening template — same
    opening words, same clause shape, but not necessarily identical wording after
    that (e.g. "delivers"/"scales"/"provides" filling the same slot still counts)
    — reused across multiple otherwise-unrelated parallel sections (sibling
    subsections, comparison blocks, FAQ answers). This case is invisible when scanning any one paragraph in isolation —
    it only surfaces by comparing sentence openers across the whole document. After
    the within-passage scan, run a second, document-wide pass in two stages:
    1. **Candidate grouping:** group sentences by their opening span — the first
       2–3 words for whitespace-delimited languages, or the comparable
       clause-initial unit (e.g. the first few characters or morphemes) for
       languages without whitespace word boundaries such as Chinese, Japanese, or
       Thai. This is a structural check, not a vocabulary list — it applies the
       same way regardless of language.
    2. **Confirmation:** within each candidate group, compare clause shape (same
       grammatical construction following the opener, not just the same opening
       words) and discard groups that only share a prefix by coincidence (e.g.
       "The report describes…" next to "The report is…"). A confirmed group needs
       2 or more sentences sharing the same clause shape — a single matching
       sentence is not repetition. Count a confirmed group under this marker only
       when those 2+ sentences also sit in _separate_ structurally parallel
       sections — sibling subsections, rows, or list items that are themselves
       distinct passages, each playing the same repeated structural role. Heading
       level is one signal for this but not a requirement: unheaded rows or list
       items count too if they share the role, as long as they're separate
       passages. Repeated list items or table rows sitting inside one single
       passage are within-passage, not cross-section, regardless of this wording.
       Favor _distinctive_
       templates: a short, generic opener with an equally generic continuation
       (e.g. "This means…" followed by an unremarkable clause) can recur by
       coincidence in genuine human writing and isn't on its own a strong signal —
       only count it when the full template (opener plus clause shape together) is
       specific enough that independent drafting would be unlikely to reproduce it
       verbatim. Each confirmed group counts as one cross-section hit, regardless of
       how many sentences or sections it spans — that detail belongs in the Step 5
       example, not in the count itself. A sentence already counted toward a
       within-passage hit doesn't also count toward a cross-section group, so the
       two counts never overlap.

    This cross-section pass matters most on documents with multiple sibling
    sections (subsections, comparison blocks, FAQ entries): a low per-passage
    marker count can still hide a document that reads as "too polished" once
    repeated section templates are counted.

Then scan for the six **readability patterns** defined in
`../_shared/readability-patterns.md`, each counted as its own marker type:

- **Unusual word combinations** — coinages and pairings a human writer wouldn't use.
- **Long dependencies** — subject and verb (or the halves of a German verb bracket)
  far apart.
- **Dropped signpost words** — missing "that"/„dass“/„um … zu“, long participial
  attributes.
- **Noun stacks** — three or more nouns in a row, overlong compounds, long genitive
  chains.
- **Ad-hoc noun-verbs** — nouns used as verbs on the fly, including Denglisch.
- **Acting objects** — inanimate things doing what living beings do.

Apply that file's "don't overcorrect" limits while counting: terms the loaded audience
or brand voice uses are established, not unusual; a single pointed metaphor or
technical compound isn't a hit unless it stalls the reader. Count clusters and
genuine stalls, not every compound.

Present the counts and one brief example per marker type found, **before**
rewriting — the owner should see the diagnosis first, in the single-line-per-marker
format Step 5 defines. Catalog markers carry their tier in brackets (`Importance flagging [A]`); structural markers and readability patterns carry no tier. For too-perfect parallel structure: if the cross-section
count is zero, report a plain `<count>`, same as every other marker. Otherwise
keep the two cases visible instead of collapsing them into one number — report
`<count>` as `<total> (N within-passage, M cross-section)` — and use the
`<brief example>` slot for the cross-section case: the repeated opener plus the
sections it recurs in, e.g. "'A good solution' opens the closing sentence of 3
subsections: §2.1, §2.2, §2.3" (avoid an em dash inside the example itself — it
collides with Step 5's own `<count> — <brief example>` separator). That still
fits on Step 5's one line.

## Step 4: Rewrite (Pass 2)

Produce the rewritten draft. Rules:

1. **Preserve every factual claim and the original structure's intent.** This is a style pass, not a content rewrite — do not add, remove, or change what the draft asserts. Qualifiers that carry meaning ("may", "in most cases", "not a medical device") stay, because removing them changes the claim. Content-level slop from Step 3 stays as it is; Step 5 reports it.
2. **Fix every marker counted in Step 3.** None should remain in the output. Fix catalog markers toward the catalog's "Signs of human writing" targets, and check that no replacement creates another catalog entry (for example, dashes turned into comma chains, or claims cut into fragments). Fix readability patterns with the fixes in `readability-patterns.md` — usually a second sentence, a relative clause, a preposition, or a named actor. Only what Step 3 counted is a marker: under that file's "don't overcorrect" limits, single compounds, audience terms, and verbatim quotes aren't hits and stay as they are.
3. **Compress content, not grammar.** When cutting the hedges and transitions Step 3 counted, keep the grammatical signpost words ("that", „dass“, relative pronouns, prepositions that break up noun chains). Removing one AI tell must not create another. Don't shorten a padded paragraph that Step 3 noted as content-level slop; fix only its counted style markers and leave the rest to Step 5's content findings.
4. **Calibrate reintroduced human texture to the loaded brand voice:**
   - If the brand voice allows casualness: use contractions, allow sentences to start with "And" or "But" where it reads naturally, vary sentence length, and use concrete times and specific details where the draft or the loaded context supplies them ("last Tuesday" instead of "recently" only if the date is known). Never invent a detail; list a missing one under Step 5's content findings.
   - If the brand voice is formal: keep contractions and casual openers out, but still vary sentence length, use specific details the draft or context supplies (never invented ones), and remove the same AI markers — formality and human-sounding prose are not opposites.
   - If no brand voice is loaded (degraded per Step 1): default to varied sentence length, concrete detail only where the draft supplies it, and marker removal only — do not guess a tone.
5. **Intervene as much as necessary but as little as possible.** Preserve what already works in the draft; change only what a marker-removal or tone-calibration rule requires.

## Step 5: Delimited output

```
─────────────────────────────────────────────
AI markers detected
─────────────────────────────────────────────
<marker type> [<tier>]: <count> — <brief example from the draft>
[one line per marker type found; omit types with zero occurrences; the [<tier>]
tag only for catalog markers]
─────────────────────────────────────────────
Humanized draft
─────────────────────────────────────────────
<the rewritten text only — no preamble, no commentary inside the block>
─────────────────────────────────────────────
Content findings (unchanged)
─────────────────────────────────────────────
<content-level slop type>: <brief example from the draft>
[one line per type from the catalog's content-level table, or "none"]
─────────────────────────────────────────────
```

Content findings name problems a style pass must not fix, such as padding or statements that could fit any company. The owner decides whether to cut or rewrite them, or to rerun the drafting skill.

If the output is degraded (no brand voice context), prepend:

```
⚠ DEGRADED OUTPUT — generated without brand voice context; used generic
human-writing conventions only
```

## Step 6: Feedback

**Auto-store phase.** Read `../_shared/learnings-protocol.md` and follow its **Writing** section. Tag entries `[cc-content:humanize]`; the source is `inferred` unless the user said it. Worth recording in this skill: humanization preferences (e.g. "owner always wants contractions even in the formal-voice project"), corrections the owner made to the rewritten draft, and project-specific facts that would change future humanization passes.

**Explicit feedback.** After the auto-store phase, ask:

> "Did this humanized version work for you? Any corrections or notes for future
> passes — or press Enter to finish."

- If the user provides a correction or states a standing preference, record it per the protocol's **Writing** section, with source `corrected` for a correction and `stated` for a preference.
- Then follow the protocol's **Confirming** section. Then exit.
