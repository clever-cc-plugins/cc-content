# cc-content — Design: `brand-voice` skill

**Status:** Draft for review
**Date:** 2026-10-30
**Sources:** brainstorming session with the plugin owner (2026-10-30); the owner's retired n8n workflow `writing-style-guide-based-on-existing-texts-samples` (repo `MichaelvanLaar/n8n-michaelvanlaar-com-vibe-coding`, `workflows/active/`); four guides the owner produced with it and refined by hand (personal voice DE/EN, sepp.med recruiting / non-recruiting); seven deep-research reports on brand voice guidelines (ChatGPT, Claude, Consensus, Copilot, DeepSeek, Gemini, Perplexity); the excerpt of Clark, Martin & Mahowald (2026, arXiv:2610.29162) already distilled into `_shared/readability-patterns.md`.

---

## 1. Intent and why

Marketing teams have wanted a written brand voice guide, the text-side counterpart to the corporate design manual, for decades, and almost none ever got one written. The blocker was the effort of producing it, not the effort of reading it. The owner closed that gap for himself with an n8n workflow that turned text samples into a detailed style guide, and Claude-generated content based on those guides needed little stylistic polishing. The n8n instance is retired.

`brand-voice` brings that capability into cc-content and widens it. It can build a guide from samples, from an interview, or from both. It reuses strategy context the clever-cc-plugins family has already put in the project. It writes in any language. And it tests the guide against drafts before calling it done.

**Primary reader: LLMs.** The guide is a context file for the cc-content writing skills and for Claude Code in general, in organizational and personal-branding projects alike. **Secondary reader: humans** (freelance copywriters, the owner's colleagues, the user). They get a one-page entry point but never at the cost of depth.

**Success criterion (owner's words, paraphrased):** content that Claude Code writes on the basis of the guide can be used without much manual style polishing.

## 2. Goals, non-goals, anti-goals

**Goals**

- One session takes a user from nothing (or a pile of texts) to a registered, usable voice guide.
- Three starting points in one flow: _describe_ an existing voice from samples, _reshape_ it (keep / change / drop per trait), _define_ a voice that does not exist in writing yet.
- Pull in everything the project already knows: organization background, values, positioning, personas, competitive landscape, curated samples, an existing guide.
- Guides in any language, written in the language of the texts they govern.
- Quality bar: the owner's four guides (depth, concrete rules, quoted examples, quantitative targets, guardrails, readability, persuasion and ethics, phrasing patterns, checklist), improved by the research findings in §9.
- Updating an existing guide is a first-class path, including voice-related learnings promoted from `session-wrap`.

**Non-goals**

- Format mechanics (LinkedIn hook length, press-release structure, email subject lines). These stay in each format skill's `format-guidelines.md`. The guide covers how the brand sounds across formats.
- Visual identity, naming, taglines, positioning work. Positioning belongs to `cc-concept:positioning`; this skill consumes it.
- A machine-only YAML/JSON export. One Markdown file serves both readers (see §10, call C3).
- Translating a guide into another language as a mechanical step. A second language means a second guide (it may be seeded from the first, see §6).
- Ongoing automated monitoring (stylometric drift checks, LLM-judge pipelines on published content).

**Anti-goals (would make it a failure even if it works)**

- A guide of adjectives ("authentic, bold, human") that an LLM cannot act on.
- A guide that copies the samples' accidents (typos, one writer's tics, outdated phrasing) into rules.
- Presenting impressions as findings: rules that claim to be observed in samples but are not.
- Generic AI-sounding prose in the guide's own examples.
- A guide so long or so unprioritized that the rules that matter get diluted.
- An English-centric guide wearing a translation: German or French guides with English typographic, address, or rhythm conventions.

## 3. Placement and files touched

```
plugins/cc-content/skills/brand-voice/SKILL.md                 (new)
plugins/cc-content/skills/brand-voice/guide-template.md        (new: section skeleton + per-section instructions)
plugins/cc-content/skills/brand-voice/analysis-criteria.md     (new: n8n criteria I–VIII, extended)
plugins/cc-content/skills/brand-voice/interview-guide.md       (new: question bank per mode / gap)
plugins/cc-content/skills/brand-voice/language-layer.md        (new: per-language decisions checklist)
plugins/cc-content/skills/brand-voice/measure-text.mjs         (new: dependency-free Node script, see §7)
plugins/cc-content/skills/session-wrap/SKILL.md                (edit: voice guide as promotion target)
plugins/cc-content/skills/content-onboarding/SKILL.md          (edit: hand-off to brand-voice)
plugins/cc-content/skills/_shared/context-categories.md        (edit: mention brand-voice as producer)
README.md, CLAUDE.md config table, plugin.json version          (edit: list the skill; minor version bump)
```

Reused, not copied: `_shared/readability-patterns.md`, `_shared/persuasion-principles.md`, `_shared/context-categories.md`.

Skill name: `brand-voice` (invoked as `/cc-content:brand-voice`). Learnings tag: `[cc-content:brand-voice]`, following the existing `[cc-content:<skill-name>] <text> — <date>` format.

## 4. The flow

The skill follows the conventions of the other cc-content skills (Step 0 recall learnings; context loading via the `## Context files` table; semantic, not label-based, gap detection; feedback step at the end).

### Step 0 — Recall learnings

Read `.claude/learnings.md` silently, as every cc-content skill does. Apply `[cc-content:brand-voice]` entries.

### Step 1 — Detect what exists

Read the `## Context files` table and assess each row's summary.

- **A voice guide already exists** → ask: refine it, or build a separate one (e.g. a second scope or language)? _Refine_ jumps to §5.
- Load everything else that is relevant: organization background, values, positioning, audience personas, competitive landscape, content strategy, `context/samples.md`, author profile / CV for personal brands. Note what is missing; do not ask about it yet.

### Step 2 — Frame the guide

Ask, one question at a time, only what is not already known:

1. **Whose voice?** Organization or individual. Sets "we" vs. "I" throughout the guide (owner's n8n rule) and the name in the title.
2. **Scope:** which kinds of text the guide will govern and for which readers. Free answer; the skill restates it as a short list of text types (e.g. "LinkedIn posts, blog articles, newsletters").
3. **Language** of the guide = language of the texts. Suggest one from samples or a registered default-language entry.
4. **Starting point:** existing texts that represent the voice well / texts that exist but should change / no usable texts. This picks describe / reshape / define, but it is not a hard switch. The flow below adapts to what the samples and answers actually show.

### Step 3 — Gather and check samples (describe, reshape)

Accepted sources, combinable: pasted text, files or folders in the project, URLs (fetched with WebFetch, main content only), `context/samples.md`.

Then:

- **Run `measure-text.mjs`** on the corpus, grouped by text type (§7).
- **Sufficiency check per text type in scope:**
  - < ~2,000 words → that text type is _low confidence_. Say so; ask for more fitting samples or plan interview questions to cover it.
  - ~2,000–5,000 words → workable.
  - ≥ ~5,000 words → comfortable.
  - A text type in scope with no samples at all → covered by interview and test drafts only.
- **Scope fit:** if samples are from text types outside the scope (e.g. only LinkedIn posts for a whitepaper guide), say which guide sections will rest on thin evidence.
- **Clustering:** if samples split into clearly different voices (different authors, eras, or channels), show the clusters and ask whether they are tone variants of one voice, separate voices (→ suggest separate guides), or noise to exclude.
- **Voice vs. noise:** spelling/grammar errors, inconsistent terminology, and features that appear only in one author's texts are not voice. Exclude them from rules (organizational voices) or confirm them with the user (personal voices, where idiolect _is_ the voice).

### Step 4 — Analyze and present hypotheses

Analyze against `analysis-criteria.md` (the n8n criteria I–VIII: strategic frame, tone and attitude, diction, syntax and rhythm, content/argumentation/rhetoric, structure and formatting, interaction/CTA, quantitative metrics), grounded in the measurements: the model explains the numbers, it does not invent impressions.

Present the result as **trait hypotheses with evidence**, not conclusions:

- 4–8 traits, each with a one-line description, a position on the four NN/g tone scales where relevant (formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic), 2–3 quoted samples, and the supporting measurement.
- If strategy context exists (positioning, values), add a **stated-vs-actual note** per trait where they diverge (e.g. positioning says "bold", samples hedge in 40 % of claims).

The user marks each trait **keep / change / drop**. Any _change_ gets a short follow-up ("what should it be instead?"). This is the whole of _reshape mode_. In _describe mode_ the user simply keeps most traits.

### Step 5 — Interview (gaps only)

Use `interview-guide.md`. Only ask what samples and context did not answer. Typical gaps:

- **Define mode** (no or unusable samples): how they want to come across and to whom; reader relationship (new vs. familiar readers: informality builds trust with familiar readers and can cost it with unfamiliar ones); "we are X, but never Y" pairs; brands or people whose writing they like or dislike, and why; what would make them wince; the four tone scales as a quick rating.
- **Values**, if no values exist in context: ask once. If the user cannot give useful input, the values section is omitted, not filled with filler.
- **Persuasion and ethics**: what the texts typically want readers to do; red lines (no false urgency, no undisclosed promotion…). Same omission rule.
- **Language layer**: the decisions in `language-layer.md` that samples did not settle (address form, inclusive-language policy, etc., see §6).
- **Hard bans**: words, phrases, punctuation habits the user never wants.

Ask one question at a time; accept "skip".

### Step 6 — Draft the guide

Write the guide per `guide-template.md` and the rules in §8. In define mode, examples are written fresh and marked _illustrative_.

### Step 7 — Test drafts and self-check

Before finalizing, the skill writes **one short test passage per text type in scope (max. three)**, using only the draft guide as voice context, on a topic plausible for the user (from context or asked).

For each test passage, before showing it:

1. Run `measure-text.mjs` and compare against the guide's quantitative targets.
2. Check it rule by rule against the guide's priority core (§8): pass / fail with the quoted evidence.
3. Run the readability pass from `_shared/readability-patterns.md`.
4. Fix failures, then show the passage.

The user reacts in their own words ("too stiff", "that's me", "I'd never say 'leverage'"). The skill turns each reaction into a concrete rule change, shows the diff of changed rules, and regenerates only if the user wants another round. Test passages the user approves can become exemplar texts in define mode (marked as such).

### Step 8 — Save and register

- Default path: `context/brand-voice.md`. When a project has more than one guide: `context/brand-voice-<scope>-<lang>.md` (only the parts needed to disambiguate, e.g. `brand-voice-recruiting.md`, `brand-voice-en.md`). The user can choose any path.
- Register in the `## Context files` table with a label and a summary that names whose voice, scope, and language (so skills can pick the right guide when several exist), following `register-context` conventions.
- Final message: path, a three-line summary of the voice, low-confidence sections if any, and a hint that `/cc-content:brand-voice` refines it later.

### Step 9 — Feedback

Same pattern as other cc-content skills: ask for corrections, log them to `.claude/learnings.md` tagged `[cc-content:brand-voice]`.

## 5. Refine mode

Entry: an existing guide was found in Step 1, or the user asks to update a guide.

Inputs, any combination: a change request in the user's words; new samples; new or changed strategy context (e.g. a fresh `positioning.md`); voice-related entries in `.claude/learnings.md`; a guide not produced by this skill (an imported PDF-turned-Markdown or a team wiki page).

Process:

1. Read the guide. If it does not follow the template, offer to restructure it into the template (content preserved) or to apply changes in its existing structure.
2. Propose a **short numbered list of changes** (rule added / changed / removed, with reason). The user accepts or rejects each.
3. Apply accepted changes; update "As of"; append a change-log entry (date, what changed, why).
4. Optional: one test draft for the most affected text type (Step 7 logic).

Small manual edits by the user remain the normal way to fix single rules. The guide's structure (stable numbered headings, one rule per bullet) is designed to make that easy.

## 6. Languages

- **One language per guide**, the language of the texts it governs. Multilingual brands get one guide per language.
- **Language-specific rules are part of every guide.** `language-layer.md` is a checklist of decisions the skill must settle for the target language. Each entry applies only where the language has the distinction:
  - address form (du/Sie, tu/vous, tú/usted, Japanese politeness levels, Korean speech levels…), including exceptions per text type;
  - contractions (English and similar);
  - inclusive-language policy, with the realistic options for that language and the current normative status (e.g. the 2024 statement of the Rat für deutsche Rechtschreibung on word-internal gender characters; Académie française and RAE positions);
  - typography: quotation marks, dashes, spaces before punctuation, inverted marks, number and date formats, capitalization;
  - readability target: audience + CEFR level as primary target; language-appropriate sentence-length proxies; a language-specific formula (Amstad/Wiener Sachtextformel for German, Flesch for English, INFLESZ for Spanish, LIX for Nordic languages, none for CJK) only as a trend indicator, never a gate.
- **Readability patterns.** The guide includes the six patterns from `_shared/readability-patterns.md`, adapted to the target language with native examples. English examples come from the study; German examples are the existing derived transfer; for any other language the guide marks its examples as derived from the English study, not evidenced in that language. The citation stays in the guide.
- **Seeding from another language.** If the user wants a guide in language B but only has samples in language A (or a guide in A), the skill carries traits and core rules across, rewrites all language-layer rules natively for B, writes native exemplars rather than translations, and marks transferred rules as _adapted, not observed_. Test drafts in B are mandatory in this case.
- **Depth per language in v1.** Any language works, because the model fills the `language-layer.md` checklist from its own knowledge of the target language. German and English get worked examples in the reference files and are the tested languages. The script's address-form word lists cover de, fr, es, nl and it; for other languages it reports "not measured". For languages beyond German and English, the guide's header notes that language-layer rules were set from general language knowledge and should be checked by a native speaker.
- **Non-English instruction following is weaker** in current models. The skill compensates by writing all rules and examples natively in the target language and by relying more on exemplars.

## 7. Measurement script

`measure-text.mjs`: a dependency-free Node.js script. Node is common in Claude Code environments but not guaranteed (the native installer does not need it), so the script is an enhancement, not a requirement: the skill checks for `node` first and falls back as described below. It takes text from files or stdin, plus an optional language code, and prints a compact report:

- word count; sentence-length distribution (mean, median, 90th percentile, share > 25 words); paragraph-length distribution;
- shares of questions, exclamations;
- counts per 1,000 words of: em/en dashes, colons, semicolons, parentheses, emoji, bullet/numbered list lines;
- first/second-person pronoun rates and, where the language has a T-V distinction, address-form counts (small per-language word lists for de, fr, es, nl, it at least; others report "not measured");
- English only: contraction rate.

It is deliberately simple. Sentence splitting is heuristic and the report says so. It runs on the corpus per text type (Step 3) and on test drafts (Step 7). If `node` is not available, the skill estimates the same features by reading and labels them _estimated_ in the guide's header and wherever a quantitative target relies on them. Both paths must produce a complete guide.

This is the first non-Markdown file in the plugin; that is a conscious exception (§10, call C4).

## 8. The guide

### 8.1 Structure

All headings are written in the guide's language. Sections in brackets are conditional.

0. **Header:** title ("Brand voice guide for X" in the target language); as-of date; language; whose voice; scope (text types); built from (samples: n texts / words per text type; context files used; interview); owner and next review date; low-confidence notes; **how to use this guide** (two short paragraphs: for writers, for AI). The AI paragraph states the precedence order: priority core → text-type section → detailed rules → exemplars as style models, not templates.
1. **Voice at a glance / priority core** (≈ one page): 3–5 traits, each as "X, not Y" with one-line meaning; tone-scale positions; 10–20 rules marked **must / should / may**, most important first; a do/don't table (every "don't" paired with what to do instead); 2–3 before/after rewrites. This is both the human quick reference and the always-on rule set for LLMs.
2. **[How our values shape the writing]**: value → concrete writing consequence (owner's pattern). Omitted if no values available.
3. **Core principles of the voice:** the traits in full, each with definition, scale position, intensity limit ("ironic, at most once per piece; never about the reader"), 2–3 checkable rules, one quoted or illustrative example.
4. **Detailed specification:**
   - 4.1 Strategic frame (goals, audience, identity, reader relationship)
   - 4.2 Tone and attitude (incl. formality and address)
   - 4.3 Diction (vocabulary, preferred/avoided terms with replacements, jargon policy)
   - 4.4 Syntax and rhythm (quantitative targets from measurement)
   - 4.5 Content, argumentation, rhetoric
   - 4.6 Content guardrails (always / never; each "never" paired with the alternative)
   - 4.7 Structure and formatting (voice-level, not format-specific)
   - 4.8 Interaction and calls to action
   - 4.9 Readability (target + the six patterns, language-adapted)
   - 4.10 Language conventions (the `language-layer.md` decisions)
5. **[How the voice shifts per text type]**: one block per text type in scope: which scale positions and rules change, what stays fixed. Omitted if the scope has one text type.
6. **[Persuasion and ethics]**: which principles from `_shared/persuasion-principles.md` fit this voice and how they show up in its texts, plus an ethics test (owner's pattern: truth, benefit, transparency). Brand-specific application only; the library itself is not copied. Omitted if no input.
7. **Phrasing patterns:** openings, reasoning, transitions, common ground, CTAs, quoted where possible.
8. **Checklist:** short, mirrors the priority core and readability patterns.
9. **Exemplar texts:** 3–6 complete texts per text type, chosen for diversity and quality from the samples (or approved test drafts in define mode), each with a one-line note on what it exemplifies. Trimmed to a reasonable length for long formats (e.g. intro + one section of a whitepaper).
10. **Change log.**

### 8.2 Rule-writing conventions

- **One rule = one observable behavior + scope + example.** No adjective-only rules. Every trait word is converted into scale position + rules + "X, not Y".
- **Positive phrasing first.** Hard bans stay, but every ban names its replacement.
- **Measurable where possible** ("median sentence ≤ 18 words", "address the reader as 'Sie'"), from the measured corpus or the user's decision.
- **Priority marks** (must / should / may) on the priority core; detailed rules default to _should_ unless marked.
- **Evidence marks on examples:** _quoted_ (from samples), _illustrative_ (written by the skill), _approved test draft_. Rules transferred from another language: _adapted, not observed_.
- **Perspective:** "we" for organizations, "I" for individuals (n8n rule).
- **Self-consistency:** the guide's own prose follows the voice's language-layer rules and the readability patterns. Its examples must not contain AI tells.
- **Owner's taste points carried over** as defaults the skill offers (not imposes): no social-media cringe patterns, em-dash restraint in German and English, no formulaic antitheses. These come from the owner's guides and the existing readability/humanize work. The interview confirms or drops them.

### 8.3 Length

No hard cap. Depth is wanted for LLM use. The priority core and the exemplars do most of the work; the detailed specification is where humans look things up. Expected size: comparable to the owner's guides plus the exemplar section.

## 9. Research basis (what changed the design)

The seven reports agree on most points. Those that shaped the design, with evidence status as the reports give it:

| Finding                                                                                                                                             | Status                                 | Design consequence                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- |
| Few-shot examples improve LLM style imitation far more than descriptions; gains flatten after ~4–6; LLM free-text style descriptions are unreliable | peer-reviewed + preprints              | Exemplar section; measurement-grounded analysis; traits presented as hypotheses |
| Instruction compliance falls with rule count; earlier rules are followed better                                                                     | preprints                              | Priority core first, must/should/may                                            |
| Negated instructions are followed less reliably (mixed, model-dependent)                                                                            | mixed                                  | Bans paired with replacements                                                   |
| Adjective-only attributes invite caricature                                                                                                         | opinion from persona research          | "X, not Y" pairs, intensity limits                                              |
| Voice constant, tone varies by context; informality's effect depends on reader familiarity                                                          | practitioner + peer-reviewed           | Text-type section; reader relationship in interview                             |
| Reliable profiles need thousands of words per genre; genre shapes style more than author                                                            | peer-reviewed                          | Sufficiency thresholds; per-text-type grouping                                  |
| Stated vs. actual voice diverge; decision must be explicit                                                                                          | opinion                                | Reshape mode: keep / change / drop                                              |
| Language-independent core + per-language layer; address, inclusive language, typography, readability are per-language                               | practitioner + linguistics + standards | `language-layer.md`; one guide per language; native exemplars                   |
| Readability formulas are language-specific surface proxies; ISO 24495-1 targets reader outcomes                                                     | standards                              | CEFR + proxies; formulas as trend indicators only                               |
| Deterministic checks are the most reliable self-check layer; LLM judges have biases                                                                 | peer-reviewed                          | Test drafts checked by script + rule-by-rule check                              |
| Named owner, versioning, revision triggers                                                                                                          | practitioner                           | Header owner/review date; change log; refine mode                               |

## 10. Calls made (by me, not by the owner — check these)

- **C1** Skill name `brand-voice`; default path `context/brand-voice.md`.
- **C2** Exemplar texts live inside the guide (owner agreed with "OK" to my recommendation).
- **C3** One Markdown file for both readers; no separate YAML/JSON layer. Research finds no universally best format; one file keeps loading simple for all skills.
- **C4** Measurement as a Node script shipped with the skill (first non-Markdown file in the plugin), optional at runtime with an _estimated_ fallback.
- **C11** v1 language depth: any language via the checklist; German and English with worked examples and tests; address-form word lists for de, fr, es, nl, it.
- **C12** The owner's guides and the research reports stay out of the public repo; fixtures are written fresh.
- **C5** Test drafts capped at three per run; checked before the user sees them.
- **C6** `session-wrap` gets a third promotion target (below). `content-onboarding`'s brand-voice path offers the hand-off (below).
- **C7** Change log at the end of the guide; owner and next review date (default: one year) in the header.
- **C8** Owner's personal taste rules (no cringe patterns, em-dash restraint, no formulaic antitheses) are offered as defaults, not built in silently.
- **C9** Readability patterns are included in every guide although drafting skills already run the readability pass, because the guide is also used outside cc-content (freelancers, other agents).
- **C10** cc-concept's `strategy-orchestrator` is not changed in this slice; adding `brand-voice` to its sequences is a follow-up.

### Changes to existing skills

**`session-wrap`, Step 5 promotion options.** When a detected pattern concerns voice (tone, wording, phrasing, punctuation habits) rather than format, and a voice guide is registered, offer an additional option: "Add a rule to the brand voice guide `<path>`". On yes: draft the rule per §8.2, insert it into the matching guide section, add a change-log entry. With several guides, ask which one.

**`content-onboarding`, brand-voice interview path.** Before the five quick questions, offer: build a full guide with `/cc-content:brand-voice` (recommended when samples exist or the voice matters for ongoing content), or a quick five-question voice note now. The quick path stays as is.

**`_shared/context-categories.md`.** One line under "Brand voice / writing style": produced by `brand-voice`.

## 11. Left to the builder

- Exact wording of `SKILL.md`, the template, the interview bank and the language layer, within the conventions of existing cc-content skills.
- The script's sentence-splitting heuristics and per-language word lists.
- How to trim long exemplar texts.
- Test approach for the skill itself (a few fixture corpora: German org website texts, English personal LinkedIn posts, a define-mode run with no samples).

**Reference material is not committed.** The owner's four guides and the research reports live outside the repo (`~/Git-Repos/temp/`). They cover a former employer and the owner's personal voice and are used during the build as a local quality bar only. Test fixtures in the public repo are written fresh or taken from openly licensed text, never from those guides.
