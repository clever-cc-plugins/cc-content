# Analysis criteria

The criteria for describing a voice from samples (Steps 3 and 4). Step 3 checks whether the samples can carry a voice at all: sufficiency, scope fit, clusters, and voice vs. noise. Step 4 analyzes them against criteria I–VIII and presents the result as trait hypotheses the user decides on.

## Grounding rule

The measurement comes first, the interpretation second. Run `measure-text.mjs` per language and text type, then read the samples to explain the numbers. Every finding cites a measurement, a quoted sample, or both. An impression without evidence is not a finding: either find the evidence, or turn it into an interview question (Step 5).

Some sub-questions below have no script field. Answer those by reading and quote the samples that support the answer. Where a quantitative target rests on reading rather than on the script, mark it _estimated_ in the guide; script values are _measured_.

## Before the analysis: sample checks (Step 3)

### Group the corpus

Group the samples by language first, then by text type, and run the script once per group with that group's `--lang`. A pooled run mixes genres, and genre shapes style more than the author does.

### Sufficiency per text type

Use the script's `words` per group.

| Words of samples for one text type | Status          | What to do                                                                                                           |
| ---------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| < ~2,000                           | Low confidence  | Say so. Ask for more fitting samples, or plan interview questions that cover the text type. Record it for section 0. |
| ~2,000–5,000                       | Workable        | Analyze normally.                                                                                                    |
| ≥ ~5,000                           | Comfortable     | Analyze normally.                                                                                                    |
| None (text type in scope)          | No sample basis | Cover it by interview (Step 5) and test drafts (Step 7) only. Record it for section 0.                               |

### Scope fit

If samples come from text types outside the scope (e.g. only LinkedIn posts for a guide that governs whitepapers), name the guide sections that will rest on thin evidence. Section 0 lists them as low-confidence notes.

### Clustering

If the samples split into clearly different voices (different authors, eras, or channels), show the clusters with two or three quoted lines and the key measurements of each. Ask which of three it is:

- **Tone variant** of one voice: keep the cluster; its differences go into section 5 (how the voice shifts per text type).
- **Separate voice:** suggest a separate guide for it.
- **Noise:** exclude it from the analysis.

### Voice vs. noise

These features are not voice, even when they recur:

- Spelling and grammar errors.
- Inconsistent terminology (the same thing called by different names).
- Features that appear only in one author's texts.

For an organizational voice, exclude them from rules. For a personal voice, idiolect _is_ the voice: do not drop such a feature silently; show it with a quoted example and ask whether it is deliberate. Only confirmed features become rules.

## I. Foundation and strategic framework

1. Communication goal and text function: primary and secondary goals, core message, desired effect.
2. Target audience: who reads, with what prior knowledge and values, and how the language adapts to them.
3. Brand identity and personality: appeal, values, unique selling point, attitude.

Added for this skill: the reader relationship (new or familiar readers, and how close the voice gets), because guide section 4.1 asks for it. Compare the findings with registered strategy context (positioning, values, personas); differences feed the stated-vs-actual notes.

## II. Tone and attitude

1. Basic tone and atmosphere: mood, emotionality.
2. Degree of formality and form of address: formal or informal, how direct.
3. Attitude towards the reader: eye level, mentor, empathy.

Added for this skill: a position on each of the four Nielsen Norman Group tone scales (formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic), 1 to 5 between the two poles (1 is the first-named pole, 5 the second), wherever the samples show it.

## III. Language style and word choice (vocabulary and diction)

1. Vocabulary: language level, range, keywords, jargon, foreign words.
2. Parts of speech and style: nominal or verbal style, adjectives, modal verbs, abstract or concrete.
3. Connotation and emotionality of words: positive or negative, word fields.

Added for this skill: preferred and avoided terms. Every avoided term needs a replacement, taken from the samples where they use one.

## IV. Sentence structure and rhythm (syntax)

1. Sentence length and complexity: average length, variation, complexity.
2. Sentence structure and types: preferred types, fragments, active or passive.
3. Text flow and rhythm: effect, variation, punctuation.

## V. Content, argumentation, and rhetoric

1. Information transfer: depth, examples, data, personal details.
2. Argumentation structure: logical or emotional, recurring patterns, deductive or inductive.
3. Rhetorical devices and stylistic figures: which ones, how often, how purposeful.

Added for this skill: how claims are hedged or stated outright (e.g. "hedges in about 4 of 10 claims", counted by reading and marked _estimated_), and what the texts never say or do, as input for the content guardrails in section 4.6.

## VI. Structure, formatting, and layout

1. Macro structure: structural pattern, headings, length of texts and paragraphs.
2. Micro structure and formatting: paragraph length, emphasis, lists, white space, quotes, boxes, emoji.
3. Reader guidance and scannability: teasers, transitions, optimization for the web.

Voice-level habits only. Format mechanics (hook length, press-release structure, subject lines) stay in the format skills.

## VII. Interaction and call to action

1. Calls to action: present or not, wording, placement, frequency.
2. Dialogue orientation: invitations to interact or reflect.

## VIII. Quantitative metrics

1. Readability indices. The script computes none. Name the language's formula as a trend indicator only, as `language-layer.md` describes under the readability target; never present a formula score as measured unless a tool actually computed it.
2. Statistics: average sentence length, passive-voice ratio, pronoun distribution, frequencies. Sentence statistics, pronoun counts, and punctuation frequencies come from the script. The passive-voice ratio does not: estimate it by reading and mark it _estimated_.

In the retired workflow this group was optional. Here it is required, because the script makes it cheap and every quantitative target in section 4.4 rests on it.

## Mapping: criterion → guide section → measurement

Section numbers follow `guide-template.md`. Field names are those of the script's `--json` report.

| Criterion                               | Guide sections                       | `measure-text` fields that ground it                                                                                                                                                                                                     |
| --------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Foundation and strategic framework   | 4.1; feeds 1, 2, 3                   | `pronouns.firstSingular` vs. `pronouns.firstPlural` (who speaks: "I" or "we"); `pronouns.second` (how much the texts address the reader). Everything else by reading.                                                                    |
| II. Tone and attitude                   | 1 (tone scales), 3, 4.2, 4.10        | `address.formal`, `address.informal`; `pronouns.second`; `contractionsPer1000`; `exclamationShare`; `per1000.emoji`.                                                                                                                     |
| III. Language style and word choice     | 4.3, 7                               | None. By reading, with quoted terms.                                                                                                                                                                                                     |
| IV. Sentence structure and rhythm       | 4.4, 4.9                             | `sentences.count`, `sentences.mean`, `sentences.median`, `sentences.p90`, `sentences.over25Share`; `questionShare`; `exclamationShare`; `per1000.emDash`, `per1000.enDash`, `per1000.colon`, `per1000.semicolon`, `per1000.parenthesis`. |
| V. Content, argumentation, and rhetoric | 4.5, 4.6, 6, 7                       | `questionShare` (rhetorical questions, checked by reading). Everything else by reading.                                                                                                                                                  |
| VI. Structure, formatting, and layout   | 4.7, 4.9                             | `paragraphs.count`, `paragraphs.mean`, `paragraphs.median`, `paragraphs.p90`; `per1000.listLine`; `per1000.emoji`.                                                                                                                       |
| VII. Interaction and call to action     | 4.8, 7                               | `pronouns.second`; `questionShare`.                                                                                                                                                                                                      |
| VIII. Quantitative metrics              | 4.4, 4.9, 4.10                       | All of the above.                                                                                                                                                                                                                        |
| Sample checks (Step 3)                  | 0 (built from, low-confidence notes) | `words` per group; `notes`.                                                                                                                                                                                                              |

Reading the report:

- `pronouns` and `address` are raw counts. Compare them with each other, or convert them to a rate per 1,000 words with `words`, before stating a target.
- `contractionsPer1000` leaves out `'s` (it's, what's), which is ambiguous with the possessive.
- `pronouns`, `address`, and `contractionsPer1000` are `null` when the script has no word list or measure for the language (address forms: de, fr, es, nl, it; pronouns: en, de, fr, es, nl, it; contractions: en only). For a missing word list, `notes` says "not measured". Estimate the feature by reading where the language has it, and mark it _estimated_.
- For German and Italian, `address.formal` skips formal forms at the start of a sentence, where capitalization says nothing (a sentence-initial German "Sie" could mean "they"). The count is a lower bound; confirm the address form by reading.
- For French, Spanish and Dutch the counts carry the caveats in `notes`: `vous` is also the plural, `ustedes` is the neutral plural in Latin America, and Dutch `je` is also the generic "one". Confirm the address form by reading.
- For German and Italian, `pronouns.second` counts only the informal forms; formal address ("Sie", "Lei") shows up only in `address.formal`. Add `pronouns.second` and `address.formal` before judging how much the texts address the reader.
- The script splits sentences heuristically. Treat its numbers as approximate and round targets accordingly ("median about 14 words", not "13.6").
- If `node` is not available, estimate the same features by reading and mark every number _estimated_.

## Presenting the hypotheses (Step 4)

Present the analysis as hypotheses with evidence, not as conclusions. Show 4–8 traits, most distinctive first. Per trait:

- **Name and one-line description.**
- **Tone-scale position**, where the trait moves one of the four scales: the scale and a position from 1 to 5.
- **2–3 quoted samples** that show the trait.
- **Supporting measurement:** the field and its value, compared across groups where that helps (e.g. "`sentences.median` 11 in posts, 19 in articles").
- **Stated-vs-actual note**, only where strategy context exists (positioning, values) and diverges from the samples, e.g. "Positioning says bold; the samples hedge in about 4 of 10 claims (_estimated_)."
- **Your call: keep / change / drop.**

The user marks each trait. For every _change_, ask one short follow-up: "What should it be instead?" The answer becomes the trait's target. The samples no longer count as evidence for the new target, so examples of it in the guide are _illustrative_; quoted samples can still serve as the "before" in a before/after rewrite. That decision round is the whole of reshape mode. In describe mode the user simply keeps most traits.

Fictional example of one trait as presented:

> **3. Plain numbers, not big claims.** The texts prove a point with one concrete figure instead of an adjective.
>
> - Tone scale: matter-of-fact–enthusiastic, 2 of 5.
> - Samples: "The new boiler used 410 litres less oil last winter." / "Two technicians, one afternoon, no second visit."
> - Measurement: a concrete figure in about 30 of 38 texts (_estimated_, counted by reading); `exclamationShare` 0.01 (_measured_), in line with the low enthusiasm position.
> - Stated vs. actual: the positioning file calls the brand "passionate"; the samples show almost no enthusiasm markers.
> - Your call: keep / change / drop?
