# Readability Patterns — Shared Reference

_Last updated: 2026-10-30_

Shared reference for every content skill that drafts or revises text in a brand voice.
It names six sentence-level patterns that make LLM-written text harder to read than
human-written text, and defines a **readability pass** that removes them after
drafting. It complements, not replaces, the brand voice: the voice decides tone and
vocabulary; this file decides how much grammatical work the reader has to do.

**Source:** Clark, Martin & Mahowald (2026), _Why is AI-generated language so hard to
understand?_, arXiv:2610.29162 (preprint, not peer-reviewed). Models used these
patterns more often than meaning-preserving paraphrases of their own sentences, i.e. an
easier alternative was available and not chosen. Against comparable human text, the
picture depends on the pattern: all nine frontier models overused unusual word
combinations and acting objects; most also overused long dependencies, noun stacks,
and dropped function words in conversation; results vary across model families. The
authors propose that optimizing models for math, code, and reasoning favors
information density over communication, and support it with a small length-penalty
experiment. That cause is a hypothesis, not established.

**Evidence status — apply directionally, not as hard numbers:**

- The data is **English only**. German examples below are a derived transfer, not study
  findings. For other languages, apply the underlying principle (keep related words
  close, keep signpost words, don't stack nouns) in the language's own grammar.
- The study measured the patterns, **not reading speed**. The link to reading difficulty
  comes from earlier psycholinguistic research on each pattern.
- Whether prompt instructions reduce the patterns was **not tested**. That's why this
  file asks for a separate revision pass instead of only a drafting rule.

---

## The core rule: compress content, not grammar

Every one of the six patterns packs more meaning into fewer words. Human writers spread
information evenly: they add optional words where a sentence would otherwise get too
dense, and drop them where context already makes things clear. Models under brevity
pressure drop them almost always.

- **Cut:** repetition, empty openers, throat-clearing, stock phrases, filler sentences,
  points that don't serve the piece.
- **Keep:** grammatical signposts — "that", "which", "so that", "in order to"; in German
  "dass", "um … zu", relative pronouns; prepositions that break up noun chains; the
  named actor of a sentence.

A sentence that is two words longer and understood on the first read is more concise
than a short sentence the reader has to read twice.

---

## The six patterns

For each: what it is, why it costs the reader, and how to fix it. Fixes are usually a
second sentence, a relative clause, a preposition, or a named actor.

### 1. Unusual word combinations

Word pairs and coinages a human writer wouldn't produce. Predictable words are read
faster; every surprising combination costs a moment of processing. One of the two most
robust findings in the study.

- ✗ "This is a classic reader-patience-budget problem." → ✓ "This tests the reader's
  patience."
- ✗ (de) „Das belastet das Aufmerksamkeitskonto der Zielgruppe.“ → ✓ „Das überfordert
  die Leser.“ Also watch for coinages like „Vertrauenshebel“, „Klarheitsgewinn-Moment“.

**Fix:** use the established phrase. Don't coin a term to save a clause.

### 2. Long dependencies

Large distance between words that belong together grammatically, e.g. subject and verb.
Working memory has to hold the start of the sentence until its partner arrives.
Especially relevant in German because of the verb bracket (Verbklammer).

- ✗ "The results, which the team collected over three sprints at two sites under
  difficult conditions, were analyzed."
- ✗ (de) „Wir haben die Ergebnisse, die das Team in drei Sprints an zwei Standorten
  erhoben hat, ausgewertet.“ (13 words sit between „haben“ and „ausgewertet“.)
- ✓ (de) „Wir haben die Ergebnisse ausgewertet. Das Team hat sie in drei Sprints an
  zwei Standorten erhoben.“

**Fix:** keep subject and verb, and both halves of a German verb bracket, close. Move
long insertions to the end of the sentence or into their own sentence.

### 3. Dropped function words

Omitting optional words that show how parts of a sentence connect.

- **English:** relative clauses without "that" ("the report the team wrote"), object
  clauses without "that", "to" instead of "in order to" / "so that" where the purpose
  link isn't obvious.
- **German:** relative pronouns can't be dropped, so the compressing equivalent is the
  **extended participial attribute** — ✗ „die von unserem Team im Projekt entwickelte
  und seitdem mehrfach erweiterte Testumgebung“ → ✓ „die Testumgebung, die unser Team
  im Projekt entwickelt und seitdem mehrfach erweitert hat“. Also watch for a dropped
  „dass“ and „zu“ where „um … zu“ is meant.

**Fix:** put the signpost word back; turn long participial attributes into relative
clauses (or a second sentence, if the format wants short sentences).

### 4. Stacked nouns

Three or more nouns modifying each other. The reader has to work out the bracketing
alone: a generator for horror-movie soundtracks, or a soundtrack generator for horror
movies?

- **English:** open noun stacks of three or more — ✗ "cloud security compliance
  assessment framework" → ✓ "a framework for checking whether cloud environments meet
  security requirements".
- **German:** compounds are written closed, so they're less ambiguous; the problem
  shifts to length (✗ „Testautomatisierungsrahmenwerkmigration“) and to genitive chains
  (✗ „die Optimierung der Prozesse der Qualitätssicherung der Abteilung“). Denglisch
  stacks behave like English ones.

**Fix:** at most three nouns in a row, at most three-part newly formed compounds, at
most two-link genitive chains. Break longer ones up with prepositions or a verb.

### 5. Ad-hoc verbs made from nouns

Nouns used as verbs on the fly: "calendar it", "let's whiteboard the funnel". The
change of word class forces the reader to re-parse.

- (de) Mostly Denglisch: ✗ „Das scopen wir noch.“ → ✓ „Den Umfang klären wir noch.“
  Also „timeboxen“, „upstreamen“.

**Fix:** use an established verb. Established conversions are fine — "to email", "to
google", „googeln“, „priorisieren“. The problem is the spontaneous one.

### 6. Inanimate things that act

Objects, processes, or abstractions as subjects of verbs normally reserved for living
beings. Readers use animacy as a parsing cue; breaking it triggers re-analysis. The
other most robust finding in the study, likely another compression trick: "bites" stands
in for "causes a problem".

- ✗ "The error message swallows the real cause." → ✓ "The error message doesn't show
  the real cause."
- ✗ (de) „Der Prozess frisst die Marge.“ / „Die Daten erzählen eine andere Geschichte.“
  → ✓ „Der Prozess kostet so viel, dass kaum Marge bleibt.“ / „Die Daten zeigen etwas
  anderes.“

**Fix:** name who or what actually causes the effect, with a plain verb. Common idioms
the audience already uses are fine; freshly invented personifications are not.

---

## Reading brand-voice rules without falling into the traps

Brand voices often ask for qualities that, read literally by a model, produce exactly
these patterns. Interpret them as follows unless the brand voice says otherwise in
those exact terms.

- **"Concise", "short", "punchy", "no filler", „prägnant“, „auf den Punkt“:** cut
  redundancy, not signposts (see the core rule). The brevity-for-grammar trade is the
  mechanism the study suspects behind all six patterns.
- **"Vivid", "metaphorical", "colorful", „bildhaft“:** use concrete examples, real
  scenes, numbers with a referent, and idioms the audience already knows. Invented
  images and personifications stay rare — at most an occasional one, and only when it
  is understood instantly.
- **Short-sentence and low-subordination rules** (common in social formats): when a
  pattern fix would add a subordinate clause the format doesn't want, split it into two
  sentences instead. Short sentences help readability; dense sentences hurt it.
- **Hard character limits** (X posts, hooks before the fold, subject lines): when the
  text doesn't fit, cut a point, a qualifier, or an example — not the function words.
  If it still doesn't fit, move the material into the body, a reply, or a thread.

---

## Don't overcorrect

- **Look for clusters, not single hits.** One compound technical term or one pointed
  metaphor per paragraph doesn't make a text hard to read. Fix the places where patterns
  pile up, and any single hit that genuinely stalls the reader.
- **Audience vocabulary is not an unusual combination.** Terms the target audience uses
  every day are established for them — e.g. "software lifecycle process" for a
  medical-device audience. Check against the loaded audience context, not general
  usage.
- **Brand vocabulary wins.** A term the brand voice explicitly lists as its own is
  established by definition.
- **The goal is human variation, not maximum length.** People switch between short and
  long forms depending on context. Don't pad every sentence with "that" or replace
  every compound; guard against both extremes.

---

## The readability pass

Run this as its **own step after the draft is complete** and before the skill's format
checklist. Read the finished text start to finish the way a reader would, before
weighing it against the briefing. A rule that only runs while drafting is less
reliable than a separate pass.

1. Scan the draft for the six patterns:
   - [ ] Word combinations or coinages a human writer wouldn't use
   - [ ] Subject and verb, or the halves of a German verb bracket, far apart
   - [ ] Dropped signpost words ("that", „dass“, „um … zu“) or long participial
         attributes
   - [ ] Chains of three or more nouns, overlong compounds, genitive chains of three or
         more links
   - [ ] Ad-hoc verbs made from nouns (including Denglisch)
   - [ ] Inanimate things doing what living beings do
2. Change **only** the passages with a hit, applying the fixes above and the
   "don't overcorrect" limits. Content, claims, tone, and audience terms stay as they
   are; the substance survives simplification. Never edit verbatim material:
   quotes attributed to people, cited text, legal or compliance wording, and product
   or entity names stay exactly as given.
3. Re-check anything the fix touched against the format's own constraints (length,
   hook, character limits) and against the brand voice.

The pass is silent by default: don't list the changes unless the owner asks or the
calling skill's output format includes a diagnosis (as `humanize` does).

**Long sessions (hypothesis):** several patterns were weaker in single-shot essays than
in chats and coding sessions, and the authors speculate that long back-and-forth
conversations add density. This wasn't tested. If a final text was drafted late in a
long working session, a `/humanize` pass in a fresh session is a cheap precaution.
