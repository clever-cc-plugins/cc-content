# brand-voice tests

## Script tests

Run `node --test tests/brand-voice/` from the repo root. Needs Node 18 or newer, no dependencies.

## Fixtures

All fixtures are fictional. Do not add real client texts or the owner's private guides.

- `fixtures/de-org/`: seven German website-style texts of a fictional machinery company (Brenner & Kollmann Anlagentechnik GmbH), about 2,650 words in total. One text (`06-product-conveyor.md`) is an English product page. Planted voice: matter-of-fact, formal Sie, short sentences, no exclamation marks, colons before explanations, honest limits ("what we do not do").
- `fixtures/en-personal/`: ten LinkedIn-style posts and one newsletter intro of a fictional product designer (Dana), about 2,050 words in total. Planted voice: first person, contractions, ironic asides, posts that end with a question. The newsletter intro (about 270 words) is the thin second text type.

## Script check on the fixtures

- `node plugins/cc-content/skills/brand-voice/measure-text.mjs --lang de tests/brand-voice/fixtures/de-org/0[1-5]*.md tests/brand-voice/fixtures/de-org/07*.md`: exit 0, `address.formal > 0`, `address.informal == 0`.
- `node plugins/cc-content/skills/brand-voice/measure-text.mjs --lang en tests/brand-voice/fixtures/en-personal/*.md`: exit 0, `contractionsPer1000 > 0`.

## Dry-run scenarios

Run each in a scratch project outside the repo (empty `CLAUDE.md`) and follow `SKILL.md` literally, answering as the scripted user.

- **A, describe, German org.** Corpus `de-org`, scope "website and blog", language de, owner "Brenner & Kollmann". Add a minimal `context/positioning.md` first. Answers: accept the hypotheses as shown, keep all traits, confirm Sie, exclude the English page. Expect: the English page is flagged and excluded, traits match the planted voice, and the guide is in German throughout (Sie rules, German typography, German readability examples).
- **B, reshape, English personal.** Corpus `en-personal`, scope "LinkedIn posts and newsletters", language en. Mark the trait "ironic asides" as "change" (answer: "less irony, more warmth"). Expect: the newsletter is flagged low confidence, the changed trait is reflected in the rules, "I" perspective is used.
- **C, define, German, no samples.** Interview only. Answers: a small consulting firm, du-Ansprache, warm but precise, no anglicisms where a German word exists; for values and persuasion answer "skip". Expect: all examples marked illustrative, approved test drafts land in section 9, values and persuasion sections omitted.
- **D, refine.** Scratch project with a five-line onboarding-style voice note registered under `## Context files`. Run the skill. Expect: restructure offer, numbered change proposals, a change-log entry, nothing overwritten without a yes. Then register a second guide and confirm Step 1 asks which guide to refine.
- **A, no node.** Repeat A with `node` hidden from `PATH`. Expect: a complete guide whose measurements are labelled estimated.

## Acceptance checklist for every produced guide

- [ ] Sections follow spec §8.1; conditional sections are present or omitted correctly.
- [ ] The priority core has 10 to 20 rules, each marked must, should or may (in the guide's language).
- [ ] Every don't has an instead.
- [ ] Examples carry evidence marks (quoted, illustrative, approved test draft, adapted).
- [ ] The header is complete: owner, next review date, measurement mode, low-confidence notes.
- [ ] 3 to 6 exemplar texts per text type (fewer only in define mode, with a note).
- [ ] The guide is registered in the `## Context files` table with a summary naming whose voice, scope and language.
- [ ] The guide is written entirely in the target language.
