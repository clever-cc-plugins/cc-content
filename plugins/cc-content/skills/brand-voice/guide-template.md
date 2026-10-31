# Brand voice guide: template

The section skeleton for every guide this skill writes (Step 6) and the reference it checks an existing guide against (refine mode). It also holds the rule-writing conventions, the offered defaults, and a filled micro-example.

## How to use this template

- **Translate every heading** into the guide's language idiomatically: natural wording a native writer would choose, not a word-for-word rendering. Keep the section numbers. The English names below are the reference names; other files in this skill refer to sections by their numbers (0–10, 4.1–4.10).
- **Section 0 is the title block.** The finished guide has its title as the only `#` heading, followed directly by the section 0 fields. Never emit a visible heading named "Header" (or its translation); "0. Header" is a reference name only.
- **Heading levels.** The skeleton's `###` headings for sections 1–10 become `##` in the guide, and its `####` headings become `###`.
- **Placeholders** look like `{…}`. Replace each with content. The instruction blocks (the quoted **What / Size / Evidence** lines) tell you what to write; they never appear in the guide.
- **Bracketed sections are conditional.** Section 2 (values) and section 6 (persuasion and ethics) are omitted when there is no input for them: no values in context and none from the interview, or no answer on persuasion and red lines. Never fill them with filler. Section 5 is omitted when the scope has a single text type. Drop the brackets in the guide's heading when the section is kept.
- **Omitting a section never renumbers the others.** The guide's numbered headings are stable (spec §5), so rules can be cited by number and refine mode and `session-wrap` can insert a rule into the matching section.
- **No references to omitted sections.** When a section is omitted, drop or rewrite every reference to it elsewhere in the guide, including the "how to use this guide" paragraphs in section 0 (e.g. "sections 2–4, 6, 7" becomes "sections 3, 4, 7" when sections 2 and 6 are omitted).
- **Perspective:** write the guide as "we" for an organization and "I" for an individual, throughout.
- **Length:** no hard cap. Depth is wanted for LLM use. Section 1 stays at about one page; the priority core and the exemplars do most of the work, and the detailed specification (section 4) is where humans look things up.
- **Shared references:** section 4.9 builds on `../_shared/readability-patterns.md` and section 6 on `../_shared/persuasion-principles.md`. The instruction blocks there say what to carry into the guide and what to leave in the shared file.
- Write every rule by the conventions below, and offer the three defaults below in the interview.

## Guide skeleton

### 0. Header

> **What:**
>
> - Title: "Brand voice guide for {name}", in the guide's language.
> - As of: {date}.
> - Language: {language}.
> - Whose voice: {organization or person}.
> - Scope: {text types}, as a short list.
> - Built from: samples ({n texts / words} per text type), context files used ({paths}), interview (yes / no).
> - Owner: {name or role}. Next review: {date}, by default one year after the as-of date.
> - Measurement: _measured_ (the measurement script ran on the samples) or _estimated_ (features estimated by reading because `node` was not available).
> - Low-confidence notes: every text type with fewer than ~2,000 words of samples; text types with no samples, covered by interview and test drafts only; sections that rest on samples from outside the scope; rules carried over from a guide or samples in another language; for languages other than German and English, a note that the language-layer rules were set from general language knowledge and should be checked by a native speaker.
> - **How to use this guide**, two short paragraphs:
>   - _For writers:_ start with section 1, check section 5 for the text type at hand, look up details in section 4, and run the checklist in section 8 before handing in.
>   - _For AI:_ apply the guide in this order of precedence: priority core (section 1) → text-type section (section 5) → detailed rules (sections 2–4, 6, 7) → exemplars (section 9). The priority core applies to every text type except where section 5 explicitly names an override of a numbered core rule or scale position for the text type at hand; core rules marked "fixed across text types" have no overrides. Use the exemplars as style models, not templates: match their voice, never copy their wording or structure.
>
> **Size:** about half a page.
>
> **Evidence:** sample counts and the measurement mode come from Step 3. Leave out a low-confidence line when it does not apply.

### 1. Voice at a glance / priority core

> **What:**
>
> - 3–5 traits, each as "X, not Y" with a one-line meaning (e.g. "Direct, not curt: …").
> - Tone-scale positions on the four Nielsen Norman Group scales: formal–casual, serious–funny, respectful–irreverent, matter-of-fact–enthusiastic. Give each a position from 1 to 5 between the two poles plus a one-line note.
> - 10–20 numbered rules marked **must / should / may**, in priority order: the most important rule first. Mark a rule "fixed across text types" when section 5 must not change it for any text type.
> - A do/don't table with the columns Do / Don't / Instead. Every "don't" has an "instead": the concrete wording to use in its place.
> - 2–3 before/after rewrites, each one or two sentences, showing several rules at once.
>
> **Size:** about one page. This is both the human quick reference and the always-on rule set for LLMs, so every rule here must earn its place.
>
> **Evidence:** every rule follows the conventions below. Examples carry an evidence mark. A "before" may be _quoted_ (reshape mode) or _illustrative_.

### 2. [How our values shape the writing]

> **What:** one bullet per value: **{value} → {concrete writing consequence}**, followed by one or two sentences on what that means in a text.
>
> **Size:** one bullet per value, usually 3–6.
>
> **Evidence:** values come from a registered context file or the interview. Omit the section if neither gave usable values.

### 3. Core principles of the voice

> **What:** the traits from section 1 in full. Per trait:
>
> - Definition: what the trait means in this voice and what it does not mean.
> - Scale position: which of the four scales the trait moves and where.
> - Intensity limit: how much is too much (e.g. "ironic, at most once per piece; never about the reader").
> - 2–3 checkable rules.
> - One example, marked _quoted_ or _illustrative_.
>
> **Size:** about a third of a page per trait.
>
> **Evidence:** in describe and reshape mode, the trait rests on the measurements and quoted samples from Step 4. In define mode, examples are _illustrative_.

### 4. Detailed specification

> **What:** the full rule set, one subsection per area. Rules here default to _should_ unless marked otherwise. Do not repeat section 1 word for word; refer to it and add the detail.
>
> **Size:** the bulk of the guide; as long as the rules need.
>
> **Evidence:** quantitative targets carry _measured_ or _estimated_. Examples carry an evidence mark.

#### 4.1 Strategic frame

> **What:** goals of the texts, audience, identity of the speaker, and the reader relationship (new or familiar readers, and how close the voice gets).

#### 4.2 Tone and attitude

> **What:** the attitude towards reader and topic, including formality and the form of address.

#### 4.3 Diction

> **What:** vocabulary; preferred and avoided terms, each avoided term with its replacement (a two-column table works well); jargon policy (which technical terms stay, which get explained, which are replaced).

#### 4.4 Syntax and rhythm

> **What:** quantitative targets from the measurement: sentence length (median, 90th percentile, share over 25 words), paragraph length, share of questions, punctuation habits (dashes, colons, semicolons, parentheses), list use. State each target as a number or range and mark it _measured_ or _estimated_. Add how rhythm varies, e.g. where short sentences land.

#### 4.5 Content, argumentation, rhetoric

> **What:** how claims are made and supported (evidence, examples, numbers), how opinion and hedging are handled, which rhetorical devices the voice uses and how often.

#### 4.6 Content guardrails

> **What:** "always" and "never" lists. Every "never" names the alternative to use instead.

#### 4.7 Structure and formatting

> **What:** voice-level habits only: how texts open and close, paragraphing, use of headings, lists and emphasis. Format mechanics (hook length, press-release structure, subject lines) stay in the format skills' `format-guidelines.md`.

#### 4.8 Interaction and calls to action

> **What:** how the voice speaks to the reader directly, asks questions, invites replies, and phrases calls to action, including what pressure it never applies.

#### 4.9 Readability

> **What:**
>
> - The readability target: audience plus CEFR level as the primary target, language-appropriate sentence-length proxies, and the language's readability formula (e.g. Amstad / Wiener Sachtextformel for German, Flesch for English, INFLESZ for Spanish, LIX for Nordic languages, none for CJK) as a trend indicator only, never a gate.
> - The six patterns from `../_shared/readability-patterns.md`, written into the guide in full and adapted to the target language with native examples. The guide is also used outside cc-content, so a bare pointer to the shared file is not enough.
>
> **Evidence:** keep the citation (Clark, Martin & Mahowald 2026, arXiv:2610.29162). English examples come from the study, German examples are the existing derived transfer, and for any other language mark the examples as derived from the English study, not evidenced in that language.

#### 4.10 Language conventions

> **What:** every decision from `language-layer.md` that applies to the language: form of address (with exceptions per text type), contractions, inclusive-language policy with its normative status, and typography (quotation marks, dashes, spaces before punctuation, number and date formats, capitalization). Write each as a rule with an example.
>
> **Evidence:** rules carried over from another language are marked _adapted, not observed_.

### 5. [How the voice shifts per text type]

> **What:** one block per text type in scope, with two parts:
>
> - _Changes:_ each changed scale position or rule, stated as an explicit override of the numbered core rule (e.g. "Overrides core rule 4: …"). Only these overrides take precedence over the priority core for that text type. Rules marked "fixed across text types" cannot be overridden.
> - _Stays fixed:_ the core rules and scale positions that apply unchanged, referenced by number instead of repeated.
>
> **Size:** a few lines to half a page per text type.
>
> **Evidence:** text types flagged low confidence in section 0 say so in their block. Omit the section if the scope has one text type.

### 6. [Persuasion and ethics]

> **What:**
>
> - Which principles from `../_shared/persuasion-principles.md` fit this voice, and how each shows up in its texts, with one example per principle.
> - An ethics test with three questions: truth (is every claim accurate?), benefit (does the reader gain from acting?), transparency (would the reader still agree if they saw the technique?). Add the red lines from the interview, each with the alternative.
>
> Brand-specific application only. Do not copy the library itself into the guide.
>
> **Size:** about half a page to one page.
>
> **Evidence:** examples carry an evidence mark. Omit the section if the interview gave no input on persuasion and red lines.

### 7. Phrasing patterns

> **What:** typical wordings for openings, reasoning, transitions, establishing common ground, and calls to action; 2–4 per category.
>
> **Evidence:** quoted from the samples where possible (_quoted_), otherwise _illustrative_.

### 8. Checklist

> **What:** short yes/no questions that mirror the priority core and the readability patterns, for a final check of a draft.
>
> **Size:** 10–15 items.

### 9. Exemplar texts

> **What:** 3–6 complete texts per text type, chosen for diversity and quality, each with a one-line note on what it exemplifies. When a text type has fewer usable samples, include all of them and note the count in section 0. Trim long formats to a representative part (e.g. intro plus one section of a whitepaper).
>
> **Evidence:** taken from the samples (_quoted_) or, in define mode, from test drafts the user approved (_approved test draft_).

### 10. Change log

> **What:** one entry per change: date, what changed, why. The first entry records the creation of the guide and how it was built.

## Rule-writing conventions

- **One rule = one observable behavior + scope + example.** No adjective-only rules. Convert every trait word into a scale position, rules, and an "X, not Y" pair.
- **Positive phrasing first.** Say what to do. Hard bans stay, but every ban names its replacement ("instead: …").
- **Measurable where possible**, e.g. "median sentence ≤ 18 words", "address the reader as 'Sie'". Numbers come from the measured corpus or from the user's decision.
- **Priority marks:** every rule in the priority core (section 1) carries **must**, **should**, or **may**. Detailed rules default to _should_ unless marked.
- **Evidence marks on examples**, including examples in tables: _quoted_ (from the samples), _illustrative_ (written by the skill), _approved test draft_ (a test draft the user approved). Rules transferred from another language: _adapted, not observed_. Rules the owner stated that no sample shows: _stated in context_. All marks are written in the guide's language, for example German _zitiert_ / _illustrativ_ / _freigegebener Testentwurf_ / _übertragen, nicht beobachtet_ / _im Kontext genannt_, and **MUSS** / **SOLL** / **KANN**, _gemessen_ / _geschätzt_.
- **Measurement marks on quantitative targets:** _measured_ (from the measurement script) or _estimated_ (estimated by reading).
- **Perspective:** "we" for organizations, "I" for individuals.
- **Self-consistency:** the guide's own prose follows the voice's language-layer rules and the readability patterns. Its examples must not contain AI tells.

## Offered defaults

Three rules carried over from the plugin owner's taste. Offer each in the interview as written; the user confirms or drops it. A confirmed default becomes an ordinary rule in the matching section; a dropped one leaves no trace in the guide.

1. **should** Write without social-media cringe patterns: no bait openers ("Unpopular opinion:", "Nobody talks about this."), no one-sentence-per-line drama, no engagement bait ("Comment YES below"), no emoji used as bullet points. Instead, open with the actual point and close with a question you want answered, or with no question at all.
2. **should** (German and English only) Use em dashes, or spaced en dashes in German, sparingly: at most one per paragraph, or the measured rate if it is lower (a measured rate of 0 makes the rule "none"). Instead, use a comma, a colon, parentheses, or a full stop.
3. **should** Avoid formulaic antitheses such as "It's not X, it's Y", "Not just X, but Y", or "This isn't about X. It's about Y." Instead, state Y directly, and name X only when readers actually believe it. If the samples use the pattern as a deliberate device, scope the rule to the forms the samples avoid (for example the "It's not X, it's Y" setup) instead of banning the device. (The "X, not Y" trait labels in sections 1 and 3 are a guide device, not prose, and are not affected.)

## Micro-example (fictional)

Shows the format only. The company, its voice, and every example are invented; do not reuse the content.

Tallowby Ledger is a fictional invoicing app for self-employed tradespeople. Its guide is in English and covers help articles, onboarding emails, and blog posts.

**Excerpt from section 3, one trait:**

> **Plain-spoken, not blunt.** We say what the reader needs to know in the words they use on site. Plain does not mean short-tempered: we explain the why when a step could surprise someone.
>
> - Scale position: formal–casual 4 of 5 (casual, never slangy); matter-of-fact–enthusiastic 2 of 5.
> - Intensity limit: at most one trade metaphor per piece; never a joke about late-paying customers.
> - Rules: name the task, not the feature ("send an invoice", not "use the invoicing module"). Explain a required step in one sentence before the step itself. Keep help-article sentences to a median of 14 words or fewer (_measured_: 13 across 42 texts).
> - Example (_quoted_): "You can send the invoice from your phone before you leave the driveway. We'll email your customer a copy and a payment link."

**Excerpt from section 1, three rules and one table row:**

> 1. **must** Name the job the reader is doing, in their words. Scope: all text types. Never write "solution", "streamline", or "empower"; instead say what changes in the reader's day. Example (_quoted_): "Your quote turns into an invoice with one tap."
> 2. **should** Keep the median sentence at 14 words or fewer (_measured_: 13). Scope: help articles and onboarding emails. Example (_illustrative_): "Add your bank details once. Every invoice after that shows them."
> 3. **may** Use one picture from the trade when it makes a feature easier to grasp. Scope: blog posts. Example (_illustrative_): "Think of recurring invoices like a service contract. You set it up once and it runs."
>
> | Do                                    | Don't                                                            | Instead                                                            |
> | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
> | Lead with what the reader can do now. | "Our platform empowers trades businesses to streamline billing." | "Send the invoice from the van, before you drive to the next job." |
