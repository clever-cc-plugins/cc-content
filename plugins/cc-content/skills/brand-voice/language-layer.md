# Language layer

The decisions every guide must settle for its target language. The checklist works for any language: where no worked entry exists, fill it from general knowledge of the language. Used when framing the guide's language (Step 2), when asking about open decisions (Step 5, see `interview-guide.md`), and when writing sections 4.9 and 4.10 (Step 6).

## Principles

- **One language per guide:** the language of the texts it governs. Multilingual brands get one guide per language. A second language is a second guide, possibly seeded from the first (see below), never a translation.
- **Each entry applies only where the language has the distinction.** English has no formal "you"; German has no inverted question marks. Skip what does not apply, and say nothing about it in the guide.
- **Settle each decision from evidence first.** Samples settle a decision when they show it consistently (quote them; use the script's fields where they exist). Context files come second. Ask only what remains (Step 5).
- **Write each decision as a rule with an example in the target language,** in section 4.10, or in section 4.9 for the readability target. Never carry English typographic, address, or rhythm conventions into another language.
- **Normative positions are facts with a date.** Where an official body has taken a position, state what it said, what it binds, and that the guide records it as of the guide's date. Report the status; the user makes the decision.

## Checklist

### 1. Address form

- Which form addresses the reader where the language has a choice: du/Sie (German), tu/vous (French), tú/usted (Spanish, with regional vos and ustedes), je/u (Dutch), tu/Lei (Italian), politeness levels (Japanese), speech levels (Korean), and so on.
- Exceptions per text type, e.g. formal in whitepapers and informal on social media. These go into section 5 as explicit overrides.
- Capitalization of address pronouns where the language has rules for it.
- How a group of readers is addressed, where that differs from the single reader.
- "Casual" does not map to one choice across languages. A position on the formal–casual scale becomes an address decision plus vocabulary, contractions, and sentence length in the target language. The address form is a positioning decision, not a translation detail.
- Script support: `address.formal` and `address.informal` for de, fr, es, nl, it. Other languages: _estimated_ by reading.

### 2. Contractions

- English and languages with a comparable optional choice: whether to contract ("we're", "don't"), everywhere or per text type.
- Contractions the grammar requires (such as French elision) are not a style decision; leave them out.
- Script support: `contractionsPer1000` for English only. Other languages: _estimated_ by reading.

### 3. Inclusive-language policy

Record which option the guide follows, with the normative status of the options as of the guide's date. Note practical effects where they matter for the decision: how screen readers read special characters, how machine translation handles them, and whether official or public-sector texts are in scope.

- **German.** Options: generic masculine; pair forms ("Kundinnen und Kunden"); neutral forms ("Studierende", "Lehrkräfte", "das Team"); rephrasing (direct address, verbs instead of person nouns); word-internal characters (gender star, colon, underscore, or internal capital I). Status: in 2024 the Rat für deutsche Rechtschreibung stated that word-internal characters do not belong to the core of German orthography and kept them out of the official rules, citing comprehensibility, readability, reading aloud, and machine translation, while affirming that all people should be addressed with sensitivity. The official rules bind schools and public administration, not companies or individuals; several federal states restrict these characters in official use. Studies of their effect on comprehension report mixed results.
- **French.** Options: generic masculine; doublets ("toutes et tous"); epicene and collective terms; écriture inclusive with the point médian ("client·es"). Status: the Académie française opposes écriture inclusive, and a 2017 circular of the Prime Minister restricts it in official texts.
- **Spanish.** Options: generic masculine; doublets ("los ciudadanos y las ciudadanas"); collective and generic nouns ("el profesorado", "la clientela"); morphological innovations ("-e", "@", "x"). Status: the Real Academia Española rejects these morphological innovations in normative usage and holds that the generic masculine includes all genders. Doublets and collective nouns are widely used alternatives.
- **English.** No official normative body; usage and style guides decide. Common options: singular "they", gender-neutral role nouns ("chair", "firefighter"), plural rephrasing.
- **Other languages.** List the realistic options and any official position known from general language knowledge, and add the item to the native-speaker check.

### 4. Typography

- Quotation marks, including nested ones.
- Dashes: which dash marks a break in thought, spaced or unspaced, and the dash for ranges.
- Spaces before punctuation (French: a non-breaking space before ; : ! ? and inside « »).
- Inverted marks (Spanish ¿ and ¡).
- Number formats: decimal separator, thousands separator, percent sign spacing, currency position.
- Date and time formats.
- Capitalization: of nouns (German), of headings (sentence case or title case, where the language allows both), of brand and product names.
- Spelling variant where one language has several (US or UK English, Swiss German without ß, European or Brazilian Portuguese).

### 5. Readability target

- **Primary target: audience plus CEFR level** (A1–C2), e.g. "general public: B1". CEFR describes what readers can do at each level; as a label for text difficulty it is descriptive, not a validated measurement.
- **Sentence-length proxies:** `sentences.median`, `sentences.p90`, and `sentences.over25Share` from the script. Calibrate the targets per language, because typical sentence lengths in words differ between languages, and on the organization's best texts rather than on generic norms. Passive voice and terms explained on first use are further proxies, estimated by reading.
- **Formula, as a trend indicator only, never a gate:** Amstad or Wiener Sachtextformel for German, Flesch for English, INFLESZ for Spanish, LIX for Nordic languages, none for CJK languages. For other languages, name a formula only where one is established for that language; otherwise leave it out. These formulas measure word and sentence length only, and their scores are not comparable across languages. The script computes none of them.
- Plain-language practice (ISO 24495-1) judges a text by whether readers can find, understand, and use what they need, not by a formula score. For high-stakes content, recommend testing with real readers.

### 6. Readability patterns

Section 4.9 of the guide contains the six patterns from `../_shared/readability-patterns.md`, written out in full and adapted to the target language with native examples. Point to that file while working; do not copy it into this skill.

- **English:** examples from the study.
- **German:** the derived transfer that the shared file already contains (verb bracket, extended participial attributes, long compounds and genitive chains, Denglisch verbs).
- **Any other language:** apply the underlying principle in the language's own grammar, and mark the examples as derived from the English study, not evidenced in that language.

Keep the citation (Clark, Martin & Mahowald 2026, arXiv:2610.29162) in the guide.

## Worked entry: German

How the checklist turns into section 4.10 rules for a fictional organization: Feldmark Heizungsbau, a regional heating installer. Rules are written in German, as in the guide. All examples are _illustrative_.

- **Anrede.** "Wir siezen unsere Leserinnen und Leser in allen Texten. Ausnahme: Instagram, dort duzen wir." Example: „Melden Sie sich bis Freitag, dann planen wir Ihren Termin noch im November.“ Script: `address.formal` vs. `address.informal`; sentence-initial „Sie“ is not counted, so confirm by reading. Capitalization: „Sie“, „Ihnen“, „Ihr“ always capitalized; „du“ lowercase, with „Du“ allowed in letters and emails if used consistently.
- **Verkürzungen.** No contraction choice in the English sense. Colloquial forms such as „geht's“ or „gibt's“ can still be a register decision: "Umgangssprachliche Verkürzungen wie „gibt's“ verwenden wir nur auf Social Media." Not measured by the script: _estimated_.
- **Inklusive Sprache.** Example decision: "Wir verwenden neutrale Formen und Paarformen, keine Sonderzeichen im Wortinneren." Example: „Alle Teilnehmenden erhalten die Unterlagen per E-Mail.“ / „Unsere Kundinnen und Kunden …“. Record the status from section 3 above with the guide's date.
- **Typografie.**
  - Quotation marks „…“, nested ‚…‘ (or »…« if the brand uses them).
  - The Gedankenstrich is a spaced en dash („Wir kommen – auch am Samstag.“). Ranges use an unspaced en dash („9–17 Uhr“).
  - Decimal comma and thousands point („3,5“, „12.000“); a space before the percent sign („50 %“).
  - Dates as „30.10.2026“ or „30. Oktober 2026“; times as „9:30 Uhr“.
- **Lesbarkeit.** Example target: "Allgemeines Publikum, Niveau B1; Median-Satzlänge um 14 Wörter (_measured_ an unseren besten Texten); Amstad als Trendwert, nicht als Grenze." Watch the German-specific patterns from the shared file: verb bracket, participial attributes, compounds, genitive chains. If the audience needs Einfache Sprache or Leichte Sprache, say that these follow their own standards (DIN 8581-1 and DIN SPEC 33429) and are a separate deliverable, not a brand voice setting.

## Worked entry: English

The same checklist for a fictional organization: Tallowby Ledger, an invoicing app for self-employed tradespeople. All examples are _illustrative_.

- **Address.** No T-V choice: the reader is always "you". Formality is set through vocabulary, contractions, and sentence length instead.
- **Contractions.** Example decision: "We use contractions (we're, you'll, don't) in help articles and onboarding emails. In blog posts we use them, but less often." Script: `contractionsPer1000` per text type.
- **Inclusive language.** Example decision: "We use singular 'they' when a person's gender is unknown or irrelevant, and gender-neutral role nouns." Example: "When a customer pays, they get a receipt by email."
- **Typography.**
  - Spelling variant first: US or UK English, and keep it consistent.
  - Quotation marks: “…” in US style, often ‘…’ in UK style. Punctuation inside the closing mark in US style; by sense in UK style.
  - Dash: an unspaced em dash (US) or a spaced en dash (common in UK publishing), with the brand's restraint rule if one is confirmed. Ranges use an unspaced en dash ("9–5").
  - Serial (Oxford) comma: yes or no.
  - Dates: "October 30, 2026" (US) or "30 October 2026" (UK). Numbers: "1,000", "3.5", "50%".
  - Headings: sentence case or title case.
- **Readability.** Example target: "General readers, B1; median sentence about 14 words; under 10% of sentences over 25 words (_measured_); Flesch as a trend indicator only." Plain-English guidance often treats sentences over about 25 words as candidates for splitting, which `sentences.over25Share` tracks. Use the study's English examples for the six patterns.

## Seeding from another language

When the user wants a guide in language B but has samples, or a guide, only in language A:

1. **Carry across the language-independent core:** traits and their "X, not Y" pairs, intensity limits, content priorities, guardrails, terminology decisions as concepts, and the scale positions for serious–funny, respectful–irreverent, and matter-of-fact–enthusiastic.
2. **Rewrite the language layer natively for B:** address form, contractions, inclusive-language policy, typography, and readability target. Convert the formal–casual position into B's address and register decision; do not translate A's rule.
3. **Recalibrate quantitative targets.** Sentence and word lengths do not transfer between languages. Mark A's numbers as _adapted, not observed_ and adjust them to B, or drop them until B has samples.
4. **Write exemplars and phrasing patterns natively in B.** No translations of A's exemplars or phrases. Idioms and humor are rebuilt for B, not translated.
5. **Mark every transferred rule** _adapted, not observed_, and list the carry-over in the low-confidence notes of section 0.
6. **Test drafts in B are mandatory** (Step 7); they cannot be skipped in this case.

When B samples appear later, refine mode replaces adapted rules with observed ones.

## Languages without a worked entry

Any language works: fill the checklist from general knowledge of the language. Then:

- In section 0, note that the language-layer rules were set from general language knowledge and should be checked by a native speaker.
- Where the script has no word list for the language, its report says "not measured"; estimate those features by reading and mark them _estimated_. Coverage: pronouns for en, de, fr, es, nl, it; address forms for de, fr, es, nl, it; contractions for en only.
- Current models follow instructions less reliably in languages other than English. Compensate by writing all rules and examples natively in the target language and by relying more on the exemplars in section 9.
