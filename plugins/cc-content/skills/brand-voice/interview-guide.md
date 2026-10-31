# Interview guide

Question banks for framing the guide (Step 2), closing gaps (Step 5), and turning reactions to test drafts into rule changes (Step 7). The banks are keyed by gap. They are not a script: pick only the questions whose gap is still open.

## Rules

- **One question at a time.** Wait for the answer before asking the next one.
- **Skip what is already known.** Before asking, check the loaded context files, the samples, the analysis from Step 4, and earlier answers. If they answer a question, do not ask it. If they suggest an answer, propose it and ask for a yes or a correction instead of an open question.
- **Accept "skip".** Move on without pushing. A skipped question leaves its gap open: the guide either rests on sample evidence for that point or leaves the point out. Never fill it with invented content.
- **Omission rule for values and persuasion.** Ask about each once. If the user cannot give useful input, the guide omits section 2 (values) or section 6 (persuasion and ethics), as `guide-template.md` describes. No filler.
- **Ask in the user's language.** The questions below are written in English to state their intent. Ask them in the language the user writes in, idiomatically, in a register that matches the user's own. The user's language can differ from the guide's language; the guide's language decides only the guide.
- **Turn answers into rules.** Every answer ends up as an observable behavior, a scale position, or an "X, not Y" pair (see the rule-writing conventions in `guide-template.md`), never as a bare adjective.
- **Offer choices where the options are known.** For scales and language-layer decisions, give the options with a one-line consequence each and let the user pick.

## Framing (Step 2)

Ask when: the answer is not clear from context, samples, or the user's request. Ask in this order.

1. **Whose voice.** "Is this guide for an organization or for one person? And what name should it carry?" Sets "we" or "I" throughout the guide and the name in the title.
2. **Scope.** "Which kinds of text should the guide cover, and who reads them?" Accept a free answer, then restate it as a short list of text types for confirmation, e.g. "LinkedIn posts, blog articles, newsletters".
3. **Language.** "I would write the guide in {language}, the language of the texts it governs. Is that right?" Suggest the language of the samples or of a registered default-language entry. One guide covers one language; for a second language, offer a second guide (see `language-layer.md`, seeding).
4. **Starting point.** "Do you have texts that already sound the way you want, texts that exist but should change, or no usable texts yet?" Picks describe, reshape, or define mode as a starting point, not a hard switch.

## Define mode

Ask when: there are no usable samples, or a text type in scope has none.

- **Desired impression.** "How do you want to come across, and to whom?"
- **Reader relationship.** "Do your readers mostly know you already, or do they meet you for the first time in these texts?" Informality builds trust with familiar readers and can cost it with unfamiliar ones; the answer sets the formal–casual position and goes into section 4.1.
- **Shift between text types.** "Should the voice sound different between {the text types in scope}, for example more formal on the website than in the newsletter?" Ask only when the scope has more than one text type; each difference becomes a scale position or rule in section 5.
- **Boundaries.** "Complete this sentence: we are ___, but never ___." Collect two to four pairs. They become the "X, not Y" traits in sections 1 and 3.
- **Models and anti-models.** "Whose writing, a brand or a person, do you like or dislike, and why?" Take the reasons, not the voice: the guide must not copy another brand.
- **Wince test.** "What would make you wince if you read it under your name?"
- **Tone scales.** "Quick rating, 1 to 5, for each pair: formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic." Ask the four as one question with the scale shown; this is the one place where a single question has several parts.

## Values

Ask when: no values are in the loaded context.

- "Which two to four values should readers feel in your texts? For each one: what does a text do differently because of it?"

Each usable answer becomes "{value} → {writing consequence}" in section 2. If the user names values without a consequence, ask once for the consequence. No usable answer: omit section 2.

## Persuasion and ethics

Ask when: context and samples do not show what the texts want readers to do, or where the red lines are.

- **Purpose.** "What do your texts usually want readers to do afterwards?"
- **Red lines.** "Are there persuasion techniques you never use, even if they would work? For example false urgency, or promotion that is not marked as such." For each red line, ask what the text does instead.

The answers feed section 6, and the red lines also feed sections 4.6 and 4.8. Section 6 then applies the fitting principles from `../_shared/persuasion-principles.md`; the interview does not walk the user through that library. No usable answer: omit section 6.

## Language-layer decisions

Ask when: an item on the `language-layer.md` checklist applies to the guide's language and neither samples nor context settle it.

- **Address form** (languages with the distinction). "Should the texts address readers as {formal form} or {informal form}? Is there a text type where that changes?" If the samples show one form clearly, confirm it instead.
- **Contractions** (English and similar). "Should the texts use contractions such as {examples}? Everywhere, only in some text types, or not at all?"
- **Inclusive language.** Present the realistic options for the language with their normative status from `language-layer.md` and ask which one the guide follows. Record the choice, not a lecture.
- **Typography.** Ask only about choices the language leaves open (e.g. US or UK spelling and punctuation in English, dash style), never about fixed conventions.
- **Readability target.** "Who is the reader who finds your texts hardest? Roughly how well do they read this language?" Propose a CEFR level from the answer and the audience context, and ask for a yes or a correction.

## Hard bans

Ask when: always, once, near the end of Step 5, unless the user has already named bans.

- "Are there words, phrases, or punctuation habits you never want to see in your texts?"
- Class-level bans count, e.g. "no anglicisms where a German word exists" or "no sales jargon". Write them as a rule with the class, two examples, and the replacement habit.
- For each ban: "What should we write instead?" Every ban in the guide names its replacement. If the user has none, propose one and ask for a yes.

Then offer the three defaults from the section "Offered defaults" in `guide-template.md`, one at a time and as written there. The user confirms or drops each. The em-dash default applies only to German and English guides.

## Test-draft reactions (Step 7)

The user reacts to a test passage in their own words. Turn each reaction into a concrete rule change:

1. **Locate it.** If the reaction is vague, ask one question to pin it down, e.g. for "too stiff": "Is it the words, the sentence length, or the way the text addresses the reader?" Quote the passage line the reaction is about if the user points at one.
2. **Change a rule, not the passage.** Adjust the rule, scale position, or target that produced the effect. Name the section number.
3. **Show the diff** of changed rules before anything else happens.
4. **Regenerate only if the user wants another round.**

Common reactions and where they usually point:

| Reaction                                        | Usual levers                                                                                                                                                                                             | Sections          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| "Too stiff", "too formal"                       | Formal–casual position up; contractions (English); shorter median sentence; verbs instead of nominal phrases. Changing the address form is a positioning decision: propose it, never switch it silently. | 1, 4.2, 4.4, 4.10 |
| "Too casual", "too chummy"                      | Formal–casual position down; fewer contractions; no slang; fewer direct questions to the reader.                                                                                                         | 1, 4.2, 4.8       |
| "Too salesy", "too loud"                        | Matter-of-fact–enthusiastic position down; ban superlatives with replacements; lower exclamation share; softer calls to action.                                                                          | 1, 4.3, 4.8, 6    |
| "Too bland", "too corporate", "could be anyone" | Concrete examples and numbers; preferred terms; a rule on stating opinions; phrasing patterns from the samples.                                                                                          | 4.3, 4.5, 7       |
| "Too long", "too dense"                         | Cut content, not signposts (the core rule in `../_shared/readability-patterns.md`); paragraph and sentence targets.                                                                                      | 4.4, 4.7, 4.9     |
| "Sounds like AI"                                | The six readability patterns; the offered defaults if they were dropped; quoted phrasing patterns instead of generic ones.                                                                               | 4.3, 4.9, 7       |
| "I'd never say '{word}'"                        | A ban with its replacement. If the user calls it critical, add it to the do/don't table in section 1.                                                                                                    | 4.3 (1)           |
| "That's me", "that's us"                        | No change. In define mode, ask whether the passage may become an exemplar, marked _approved test draft_.                                                                                                 | 9                 |

Diff format, one block per changed rule (fictional example):

> **Section 4.4, sentence-length rule** (reaction: "too stiff", test passage for blog articles)
>
> - Before: Keep the median sentence at 18 words or fewer.
> - After: Keep the median sentence at 14 words or fewer; follow a long sentence with a short one.
