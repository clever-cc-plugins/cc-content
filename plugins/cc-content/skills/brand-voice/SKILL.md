---
name: brand-voice
description: >
  Use this skill to build or refine a brand voice guide: the written counterpart to a corporate design manual that tells writers and AI how an organization or a person sounds. Invoke when the user says "create a brand voice guide", "build a writing style guide", "tone of voice guide", "style guide from our texts", "Styleguide erstellen", "update our brand voice guide", or asks to describe, reshape, or define how their texts should sound. Works from text samples, an interview, or both, reuses the strategy context already registered in the project, and writes the guide in any language (the language of the texts it governs). It tests the guide on short drafts and registers it as a context file. Do NOT use it to draft content; it produces the guide that the writing skills follow.
allowed-tools: Read, Write, Edit, Bash, WebFetch
argument-hint: "[optional: sample files/URLs, or path of a guide to refine]"
---

@./guide-template.md **Read when:** drafting the guide in Step 6, and checking an existing guide's structure in refine mode
@./analysis-criteria.md **Read when:** checking samples in Step 3 and analyzing them in Step 4
@./interview-guide.md **Read when:** framing the guide in Step 2, interviewing in Step 5, and turning test-draft reactions into rule changes in Step 7
@./language-layer.md **Read when:** settling the guide's language in Step 2, asking language-layer questions in Step 5, writing sections 4.9 and 4.10 in Step 6, and seeding a guide from another language
@../_shared/readability-patterns.md **Read when:** writing section 4.9 in Step 6 and running the readability pass on test passages in Step 7
@../_shared/persuasion-principles.md **Read when:** writing section 6 in Step 6

# Brand Voice Skill

You are helping the owner build a brand voice guide, or refine an existing one. The guide's primary reader is an LLM: the cc-content writing skills and Claude Code in general load it as a context file. Its secondary readers are humans (copywriters, colleagues, the owner), who get a one-page entry point in section 1. The goal: content written on the basis of the guide needs little manual style polishing.

One flow covers three starting points, and it adapts to what the samples and answers show instead of switching hard between them:

- **Describe:** samples already sound right; the guide captures that voice.
- **Reshape:** samples exist, but some traits should change; the user decides keep / change / drop per trait.
- **Define:** no usable samples; the voice is built from the interview and tested on drafts.

This skill does not draft content. It produces the guide that drafting skills follow.

**Languages.** Talk to the user in the language they write in, and translate the quoted prompts in this skill into it. The guide is written entirely in its target language: headings, rules, examples, and the marks on them. One guide covers one language.

## Step 0: Recall learnings

If `.claude/learnings.md` exists, read it silently. Apply all entries relevant to this run, both `[cc-content:brand-voice]`-tagged entries and entries from other plugins that inform content quality or project constraints. Note entries that concern voice (tone, wording, phrasing, punctuation habits) from any skill, tagged or not: they are input for refine mode. Do not announce this step. If the file is absent, continue normally.

## Step 1: Detect what exists

Read the `## Context files` table from the CLAUDE.md files already loaded into your context window. They may exist at multiple hierarchy levels (workspace root, project root, sub-directory); if multiple tables exist, rows from more specific CLAUDE.md files take precedence over less specific ones. Only if no CLAUDE.md is loaded, read `./CLAUDE.md` directly and stop at the next heading after the table.

**Arguments.** If `$ARGUMENTS` names the path of a voice guide, that is the guide to refine: go to [Refine mode](#refine-mode). Sample files or URLs in `$ARGUMENTS` are kept for Step 3.

**Existing voice guides.** Assess each row by its **Summary**, not by its label: does the file govern how texts sound (writing style, tone, vocabulary, phrasing rules)? That includes guides built by this skill, short voice notes from onboarding, and imported guides.

- **One guide found:** if the user asked to update or refine a guide, refine this one without asking. Otherwise ask

  > "There is already a voice guide: `{path}` ({whose voice, scope, language, from its summary}). Should I refine it, or build a separate guide, for example for another scope or language?"

- **Several guides found:** list them with whose voice, scope, and language from their summaries, then ask which one. If the user asked to update or refine a guide, ask only

  > "Which of these guides should I refine?"

  Otherwise ask

  > "Which of these guides should I refine, or should I build a new one?"

- **No guide found, but the user asked to update or refine one:** say so, then ask

  > "I can't find a registered voice guide. Should I build a new one, or is there a guide file I should refine? If so, give me its path."

- **Refine** → go to [Refine mode](#refine-mode) with the chosen guide. **Separate or new** → continue with Step 2 and keep the existing guide paths in mind for the file name in Step 8. An existing guide in another language can seed the new one (Step 2).

**Everything else.** Read the files whose summaries cover any of these: organization background, values, positioning, audience personas, competitive landscape, content strategy, `context/samples.md` (or another registered samples file), and for personal brands an author profile or CV. Note a registered default-language entry for Step 2. Note what is missing, but do not ask about it now: Steps 2–5 cover the gaps.

If no context table exists, continue without one. This skill can build a guide from samples and the interview alone.

## Step 2: Frame the guide

Ask the framing questions from `interview-guide.md`, one at a time and in this order, and only those that the request, context, and samples do not already answer. Where they suggest an answer, propose it and ask for a yes or a correction.

1. **Whose voice:** an organization or one person, and the name the guide carries. This sets "we" or "I" throughout the guide.
2. **Scope:** which kinds of text the guide governs and for which readers. Take the free answer and restate it as a short list of text types for confirmation, e.g. "LinkedIn posts, blog articles, newsletters".
3. **Language:** the language of the texts the guide governs. Suggest it from the samples, the default-language entry, or (in define mode) the language the user writes in. If the user wants a guide in a language for which only samples or a guide in another language exist, follow "Seeding from another language" in `language-layer.md`: carry the core across, write the language layer natively, mark transferred rules _adapted, not observed_, and plan mandatory test drafts in Step 7.
4. **Starting point:** texts that already sound right (describe), texts that exist but should change (reshape), or no usable texts (define).

With no usable samples at all, skip Steps 3 and 4 and continue with Step 5 in define mode. With samples for some text types only, run Steps 3 and 4 on those, and cover the others with define-mode questions in Step 5.

## Step 3: Gather and check samples (describe, reshape)

**Collect.** Sources can be combined:

- pasted text;
- files or folders in the project;
- URLs: fetch each with WebFetch and keep the main content only (the text itself, without navigation, footer, cookie notices, sidebars, or comments);
- the registered samples file (`context/samples.md` by default): use the sample texts themselves as the corpus. Take each entry's content out of the file (not its `Output type` / `Key qualities` / `Caveats` lines), assign it to a language and text type from those lines, and pipe each group on stdin; do not pass the samples file itself to the script, which skips fenced code and would count the metadata lines instead.

If the user has not offered samples yet, ask:

> "Which texts represent the voice? Paste them, give me files or folders, or send URLs. More is better: about 2,000 words per text type is the minimum for a reliable picture."

**Group.** Group the samples by language first, then by text type in scope (see "Group the corpus" in `analysis-criteria.md`). Propose a text type for each file and let the user correct it before measuring; file names rarely say. If some samples are in another language than the guide's, show which ones and ask:

> "These texts are in {other language}: {list}. Do they belong to this guide, or should I leave them out? (A guide covers one language; they could seed or support a separate {other language} guide.)"

**Measure.** `${CLAUDE_SKILL_DIR}` below is the directory of this `SKILL.md`; if the variable is empty in your environment, use that path. Check for Node first:

```bash
command -v node >/dev/null 2>&1 && echo "node available" || echo "node missing"
```

- **Node available:** run the measurement script once per group, with that group's language code:

  ```bash
  node "${CLAUDE_SKILL_DIR}/measure-text.mjs" --lang <code> --json <file> [<file> ...]
  ```

  The script reads files only: expand a folder into its text files (`.md`, `.txt`) first. For pasted or fetched text, pipe the group's text in on stdin instead of files (`... --lang <code> --json <<'EOF'` … `EOF`). The script exits 1 with "no text" when the input is empty: check the group's input and fix it before going on. Treat its numbers as approximate (sentence splitting is heuristic) and read the `notes` field.

- **Node missing:** do not stop and do not ask the user to install anything. Estimate the same features by reading (word count; sentence and paragraph lengths; shares of questions and exclamations; dashes, colons, semicolons, parentheses, emoji, and list lines per 1,000 words; pronoun and address-form use; contractions in English) and label every one of them _estimated_. Count at least 20 consecutive sentences per group, drawing them from each file of the group in turn (not a sample of the most striking ones), state targets as ranges, and prefer the lower figure when unsure: reading overestimates sentence length. Record the measurement mode for the guide's section 0. Both paths must lead to a complete guide.

**Check.** Apply the sample checks from `analysis-criteria.md`, using `words` per group:

- **Sufficiency per text type in scope:** under ~2,000 words (anything below 2,000 counts) is _low confidence_ (say so; ask for more fitting samples or plan interview questions for that text type); ~2,000–5,000 is workable; ~5,000 or more is comfortable. A text type in scope with no samples is covered by the interview and test drafts only.
- **Scope fit:** if samples come from text types outside the scope, name the guide sections that will rest on thin evidence.
- **Clustering:** if the samples split into clearly different voices (authors, eras, channels), show the clusters with quoted lines and key measurements and ask whether each is a tone variant of one voice, a separate voice (suggest a separate guide), or noise to exclude.
- **Voice vs. noise:** spelling and grammar errors, inconsistent terminology, and features found in one author's texts only are not voice. Exclude them for an organizational voice. For a personal voice, show each with a quoted example and ask whether it is deliberate; only confirmed features become rules. Look for recurring openers and closers ("Hot take:", "P.S.", a closing question), sign-offs, and punctuation habits, and check each against the offered defaults in `guide-template.md`: where a sample habit breaks a default, ask whether to keep the habit as a rule, or follow the default.

Show a short sample report: per group the language, text type, number of texts, words, and status. Record every low-confidence finding for section 0.

## Step 4: Analyze and present hypotheses

Analyze each group against criteria I–VIII in `analysis-criteria.md`, using its mapping table to tie each criterion to the script fields and guide sections. The measurement comes first: explain the numbers by reading the samples, and quote the samples. Never invent an impression without evidence. A finding cites a measurement, a quoted sample, or both; an impression you cannot back up becomes an interview question for Step 5 instead.

Present the result as **trait hypotheses with evidence**, not conclusions, in the format of "Presenting the hypotheses" in `analysis-criteria.md`: 4–8 traits, most distinctive first (section 1 takes the top five; further traits appear only in section 3), each with

- name and one-line description;
- a position on the four tone scales where the trait moves one (formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic). On every scale, 1 is the first-named (left) pole and 5 the second pole; say so when you show the positions;
- 2–3 quoted samples;
- the supporting measurement, marked _measured_ or _estimated_;
- a **stated-vs-actual note** where registered strategy context (positioning, values) diverges from the samples;
- "Your call: keep / change / drop?"

Let the user mark each trait. For each _change_, ask one short follow-up, one trait at a time:

> "What should it be instead?"

The answer becomes the trait's target; examples of the new target in the guide are _illustrative_, and quoted samples may still serve as the "before" of a before/after rewrite. This decision round is the whole of reshape mode. In describe mode the user simply keeps most traits.

## Step 5: Interview (gaps only)

Use the question banks in `interview-guide.md`. Ask only what the samples, the analysis, and the context did not answer. Ask one question at a time, in the user's language, and accept "skip": a skipped question leaves its point to the sample evidence or out of the guide, never filled with invented content.

- **Define mode** (no usable samples, or text types without samples): desired impression and readers; reader relationship (new or familiar readers); whether the voice shifts between the text types in scope; "we are ___, but never ___" pairs; models and anti-models, and why; the wince test; the four tone scales. Targets the user sets here are marked as set by the owner (in the guide's language), not _measured_ or _estimated_.
- **Tone-scale rating:** the one explicit exception to one question at a time. Ask the four scales as one question, and state the direction: 1 = the first-named (left) pole, 5 = the second pole (e.g. formal–casual: 1 formal, 5 casual).
- **Values**, if none are in context: ask once. Without a usable answer, the guide omits section 2.
- **Persuasion and ethics:** what the texts want readers to do, and the red lines, each with what the text does instead. Without a usable answer, the guide omits section 6.
- **Language layer:** the decisions from `language-layer.md` that samples and context did not settle (address form and its exceptions per text type, contractions, inclusive-language policy, open typography choices, readability target).
- **Hard bans:** (including whole classes such as "anglicisms where a German word exists") ask once in **every** run (no answer: record "no bans named" in section 0), near the end of this step, even when samples and context cover everything else, unless the user already named bans in this session. Every ban gets its replacement:

  > "Are there words, phrases, or punctuation habits you never want to see in your texts?"

- **Offered defaults:** after the hard bans, offer the three defaults from "Offered defaults" in `guide-template.md`, one at a time and as written there, translated idiomatically into the guide's language with the marks kept. Skip any default already decided in Step 3. The user confirms or drops each; the em-dash default applies to German and English guides only.

Turn every answer into an observable behavior, a scale position, or an "X, not Y" pair, never a bare adjective.

## Step 6: Draft the guide

Write the guide per `guide-template.md`: its skeleton (sections 0–10), its instruction blocks, and its rule-writing conventions. The points that are easiest to lose:

- **Title block:** the title is the only `#` heading, followed by the section 0 fields; no visible "Header" heading. Translate every heading idiomatically and keep the section numbers.
- **Conditional sections:** omit section 2 without values, section 6 without persuasion input, section 5 when the scope has one text type. Never renumber the other sections, and drop or rewrite every reference to an omitted section, including in section 0's "how to use this guide".
- **Section 0:** sample counts and the measurement mode from Step 3, context files used, whether an interview took place, low-confidence notes, and the precedence order for AI. Owner: ask once who owns the guide (a name or a role) if neither context nor conversation says; for a personal voice it is the person. Next review: one year after the as-of date unless the user names another date. In define mode the measurement mode is _set by owner_ (in the guide's language), plus _measured_ for the test passages if Node ran. For languages other than German and English, note that the language-layer rules were set from general language knowledge and should be checked by a native speaker.
- **Perspective:** "we" for an organization, "I" for an individual, throughout.
- **Marks in the target language.** Evidence marks, priority marks, and measurement marks are written in the guide's language. The English reference names are _quoted_ / _illustrative_ / _approved test draft_ / _adapted, not observed_; **must** / **should** / **may**; _measured_ / _estimated_ / _set by owner_; _stated in context_; "fixed across text types". German forms of all marks: `guide-template.md`, "Rule-writing conventions". In a German guide, for example: _zitiert_ / _illustrativ_ / _freigegebener Testentwurf_ / _übertragen, nicht beobachtet_; **MUSS** / **SOLL** / **KANN**; _gemessen_ / _geschätzt_.
- **Evidence by mode:** in describe and reshape mode, examples are quoted from the samples where possible. In define mode, and for traits the user changed, examples are written fresh and marked _illustrative_. Rules carried over from another language are marked _adapted, not observed_.
- **Section 4.9:** the readability target plus the six patterns from `../_shared/readability-patterns.md`, written out in full and adapted to the target language with native examples, with the citation kept.
- **Section 4.10:** every applicable decision from `language-layer.md`, each as a rule with an example in the target language.
- **Section 6:** only the principles from `../_shared/persuasion-principles.md` that fit this voice, applied to the brand, plus the ethics test and red lines. Never copy the library itself.
- **Section 9:** 3–6 exemplars per text type from the samples, chosen for diversity and quality, each with a one-line note. Copy the body without the source's headings, which would break the guide's numbering. When a text type has fewer than three usable samples (describe or reshape mode), use all of them and note the count in section 0's low-confidence notes. In define mode, section 9 is filled in Step 7 from test passages the user approves; if none is approved for a text type, list that in section 0's low-confidence notes.
- **Section 10:** the first change-log entry records the creation and how the guide was built.
- **Self-consistency:** the guide's own prose follows its language-layer rules and the readability patterns, its examples contain no AI tells, and it breaks none of its own hard bans (check material imported from the shared files, such as the readability patterns, against them).

Keep the draft in the conversation until Step 8 writes it. Do not show the whole draft before Step 7 tests it; afterwards offer to show it before saving, or save it and point to the file.

## Step 7: Test drafts and self-check

Write **one short test passage per text type in scope, three at most**, using only the draft guide as voice context, not the samples. With more than three text types, pick the three with the least sample evidence. Take a topic plausible for the user from the context or the samples; if none fits, ask:

> "What topic should the test passages be about? Something you would really write about works best."

Work through the passages one at a time: finish the steps below and the reaction round for one passage before starting the next. Before showing a passage:

1. **Measure it.** If Node was not checked yet (define mode), check it as in Step 3. Write the passage to a temporary file or pipe it on stdin, run `node "${CLAUDE_SKILL_DIR}/measure-text.mjs" --lang <code> --json`, and compare the results with the guide's quantitative targets; a value outside a target range is a failure. Greeting and sign-off lines count as sentences: judge the passage without them. For the sentence-length percentile and the over-25 share, judge a passage only when it has at least 10 sentences, and judge rates per 1,000 words (colons, dashes, and so on) only at 200 words or more; below that, check the median and the rules instead. Without Node, estimate the same features by reading, and check them against the sample evidence as well as the guide's targets, so that a biased estimate cannot confirm itself.
2. **Check it rule by rule** against the priority core (section 1): pass or fail for each rule, with the quoted evidence from the passage.
3. **Run the readability pass** from `../_shared/readability-patterns.md`.
4. **Fix every failure**, then show the passage with a one-line check result (e.g. "core rules: all pass; median sentence 13 words, target ≤ 14").

Then ask for the user's reaction in their own words:

> "Does this sound like you? Tell me in your own words what fits and what doesn't, e.g. 'too stiff', 'that's me', or 'I'd never say that word'."

Turn each reaction into a concrete rule change, as described in "Test-draft reactions" in `interview-guide.md`: pin a vague reaction down with one question, change the rule, scale position, or target (not the passage), and **show the diff of every changed rule** with its section number, and carry each change to every place the guide mirrors it (the trait text in section 3, section 5 overrides, the section 8 checklist, cited rule numbers). Regenerate a passage only if the user wants another round. After a changed core rule, re-check the passages already shown against it; if one now fails, say so and ask whether to keep it.

In define mode, a passage the user approves ("that's me") can become an exemplar in section 9, marked _approved test draft_ in the guide's language; ask before adding it.

If the user wants to skip testing, skip it, except for a guide seeded from another language: there the test drafts are mandatory. A skipped test round goes into section 0's low-confidence notes.

## Step 8: Save and register

**Path.** Propose a path and let the user confirm or choose any other:

- Default: `context/brand-voice.md`.
- When the project has more than one guide: `context/brand-voice-<scope>-<lang>.md`, using only the parts needed to tell the guides apart, e.g. `context/brand-voice-recruiting.md` or `context/brand-voice-en.md`.

Never overwrite an existing file without the user's explicit consent. Write the guide.

**Register.** Add a row to the `## Context files` table following the conventions of `/cc-content:register-context` (its Steps 4–5): pick the target CLAUDE.md as it does, make the path relative to that CLAUDE.md's directory, show the row and ask "Proceed? (yes / edit / skip)", and create the `## Context files` section with its standard intro if it is missing.

- **Label:** short and specific, e.g. "Brand voice – recruiting" or "Brand voice – EN".
- **Summary:** one sentence (10–25 words) in the guide's language that names whose voice, the scope, and the language, so skills can pick the right guide when several exist. Example: "German brand voice guide for Feldmark Heizungsbau: website, blog articles, newsletters; priority core, detailed rules, exemplars."

**Final message.** Tell the user:

- the path of the guide;
- a three-line summary of the voice;
- the low-confidence sections, if any;
- that `/cc-content:brand-voice` refines the guide later, and that small manual edits to single rules are fine.

## Step 9: Feedback

**Auto-store phase.** Before asking for feedback, review this run. For each qualifying observation, append one tagged line to `.claude/learnings.md` (create with the standard header if missing):

```text
[cc-content:brand-voice] <concise observation> — <YYYY-MM-DD>
```

Qualifies: preferences about how the guide is built that are not already in a loaded context file or `CLAUDE.md` (e.g. "owner wants test passages on recruiting topics only"); corrections the owner made to the flow or the draft; project-specific facts that would change a future run of this skill.

Does not qualify: voice rules themselves (they belong in the guide, which is now a context file); standard behavior applied without deviation; facts already in context files or `CLAUDE.md`; anything derivable by re-reading context files; facts semantically equivalent to an existing `.claude/learnings.md` entry under any plugin tag. When in doubt, skip: redundancy is worse than a missed entry.

Check for the file before appending:

```bash
ls .claude/learnings.md 2>/dev/null && echo "exists" || echo "missing"
```

Standard header when creating the file:

```markdown
# Learnings

Corrections and feedback collected during content sessions.
Entries are tagged by skill and dated.

---
```

**Explicit feedback.** After the auto-store phase, ask:

> "Did the guide and the way we built it work for you? Any corrections or notes for future runs, or press Enter to finish."

- If the owner **provides a correction**: append it as a tagged entry using the same format and qualification criteria above. Confirm: "✓ N learning(s) saved to `.claude/learnings.md`."
- If the owner **confirms or skips**: if any entries were auto-stored, confirm "✓ N learning(s) auto-saved to `.claude/learnings.md`." Then exit. If nothing was stored, exit directly.

## Refine mode

Entry: Step 1 selected the guide to refine: a path passed as an argument, the single registered guide, or the one the user picked.

First load the context files listed under "Everything else" in Step 1, so changed strategy context can be compared with the guide.

**Inputs**, in any combination:

- a change request in the user's words;
- new samples (handled with the Step 3 and Step 4 logic, compared against the guide's current rules and targets);
- new or changed strategy context, e.g. a fresh positioning file;
- voice-related entries in `.claude/learnings.md` (tone, wording, phrasing, punctuation habits) noted in Step 0 that the guide does not cover yet;
- a guide not produced by this skill, such as an imported PDF turned into Markdown or a team wiki page.

If it is unclear what should change, ask:

> "What should change in the guide? You can describe the change, give me new samples, or I can check it against the current context and the learnings."

**Process:**

1. **Read the guide.** Compare its structure with `guide-template.md`. If it does not follow the template, ask:

   > "This guide doesn't follow the template structure. Should I restructure it into the template, keeping all its content, or apply the changes within its current structure?"

   A yes to restructuring is the consent to write the restructured guide. Ask once for section 0 fields the guide lacks (owner, scope) before restructuring. Mark rules the owner stated but samples do not show _stated in context_ (in the guide's language).

   Restructuring moves content without adding any. Template sections that stay empty are named as gaps; filling one needs input (samples or interview answers) and goes through the change proposals below.

2. **Propose a short numbered list of changes.** Each item: rule added, changed, or removed; the section number; the before and after wording; the reason and its source (change request, sample measurement, context file, learning). Follow the rule-writing conventions in `guide-template.md` and write the rules in the guide's language with its marks. The user accepts or rejects each item by number.

3. **Apply the accepted changes only**, with Edit. Never overwrite the guide, or write a restructured version over it, without the user's explicit consent. Keep the numbered headings stable. Update the as-of date in section 0, and append a change-log entry to section 10: date, what changed, why. If the guide keeps its own structure (no sections 0 and 10), put an "As of" line at the top and a "Change log" section at the end instead. If whose voice, scope, or language changed, or a section 0 field such as scope or owner was filled in, update the guide's summary in the `## Context files` table and show the new row first.

4. **Optional test draft.** Offer one test passage for the text type most affected by the changes, using the Step 7 logic.

Close with the list of applied changes, then continue with Step 9.
