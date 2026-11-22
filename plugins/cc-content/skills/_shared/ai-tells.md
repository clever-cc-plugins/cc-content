# AI Tells — Shared Catalog

_Last updated: 2026-11-22_

Shared reference for every content skill that drafts or revises text. It lists the patterns that make text read as machine-written, with an evidence tier, a scope, a status, and sources for each. Drafting skills check it in the readability pass (`readability-patterns.md`); `humanize` counts and fixes what it finds.

Three ground rules:

- **Signs, not proof.** Every pattern here also occurs in human writing. One hit means little; clusters matter. Wikipedia's AI-cleanup editors make the same point, and experienced readers judge by the overall impression, not by single words. Text machine-translated from English shows many of the same signs, so a translated draft produces false positives.
- **Write for readers, not detectors.** The goal is text people trust and want to read. Readers who use AI tools themselves recognize "humanized" text that only swaps words (Russell, Karpinska & Iyyer, ACL 2025), so surface tricks don't help.
- **Don't overcorrect.** Removing one tell must not create another. Swapping every dash for a comma chain, or every claim for a fragment, is a pattern of its own. Use the "Signs of human writing" section as the target.

Tells drift with model generations: a word that marked 2023 output can be rare in 2026 output, while the total number of tells stays roughly stable. That is why each entry carries a status, and why the catalog is refreshed by the repo's maintainer skill rather than frozen.

---

## How to use this catalog

1. **Match the scope.** `all` applies to any text. `marketing` applies to social posts, ads, landing pages, and marketing emails. `social` applies to social posts only.
2. **Count by tier.** Tier A (measured in a corpus or performance study) and tier B (curated by a large editor community, or consistent across several independent sources): each hit counts when the status is `current`, `rising`, or `fading`. Tier C (a single practitioner source) and every `historical` entry: count only when two or more different such entries appear in the same counting unit (rule 4). Rows of the vocabulary table follow rule 3 instead.
3. **Vocabulary needs density.** Rows of the vocabulary table follow only this rule, never rule 2. They count when three or more catalog words, from any vocabulary row, appear in one counting unit, and they are reported as one marker, "AI vocabulary", tagged with the highest tier among the words found.
4. **Counting unit.** A paragraph of prose. In social posts and other line-broken formats, where most paragraphs are one or two sentences, the unit is the whole post (each post of a thread on its own).
5. **Never count `ineffective` entries.**
6. **The brand voice wins.** Words, devices, or punctuation the loaded brand voice or audience uses are not hits.
7. **Dashes count only above the brand voice's rate.** A pair of dashes around one insertion counts as one. If the brand voice names no number, the default is more than one per paragraph of prose (the brand-voice skill's offered default), or more than two per social post. The spaced dash is normal typography in German, Russian, and Serbian.
8. **Hedges and transitions count only as clusters that add no information.** A qualifier that changes what a sentence claims ("may lower the risk") is content, not a tell.
9. **Content-level slop is a separate check.** Drafting skills fix it while drafting, because they own the content. Revision skills such as `humanize` report it without rewriting, because they must not change claims.
10. **Fix toward the "Signs of human writing" targets**, and re-check that the fix created no new catalog entry.

---

## Significance and importance

| Tell                  | Looks like                                                                                                                                             | Tier | Scope | Status  | Sources  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ----- | ------- | -------- |
| Importance flagging   | Announcing that something matters instead of showing it: "This matters because…", "Here's why X matters", "just as important"; „Darum ist das wichtig“ | A    | all   | current | graphite |
| Inflated significance | Puffing up the importance or legacy of ordinary things: "stands as a testament to", "plays a pivotal role in", "setting the stage for"                 | B    | all   | current | wiki-en  |
| Grandiose stakes      | Raising everyday topics to world-changing stakes: "will redefine how we live and work"                                                                 | C    | all   | rising  | tropes   |

## Contrast frames

| Tell                     | Looks like                                                                                                                       | Tier | Scope | Status  | Sources                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---- | ----- | ------- | ---------------------------- |
| Negative parallelism     | Correcting a misconception nobody voiced: "It's not X, it's Y", "Not just X, but also Y"; „nicht nur … sondern auch“ as a reflex | A    | all   | current | graphite, slopbench, wiki-en |
| "More than an X" frame   | "This is more than a tool, it's a mindset"; „mehr als ein X, es ist ein Y“                                                       | A    | all   | current | graphite                     |
| Corrective "rather than" | Defining something by what it supposedly isn't: "rather than simply…", "Instead, it…"                                            | A    | all   | current | graphite, wiki-en            |
| Not-not-just             | Two negations and a payoff: "Not a feature. Not a trend. Just better work."                                                      | C    | all   | current | tropes                       |

## Structure and rhythm

| Tell                  | Looks like                                                                                                                           | Tier | Scope  | Status  | Sources            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------ | ------- | ------------------ |
| Rule of three         | Reflexive triplets of adjectives, nouns, or clauses to sound complete: "fast, flexible, and future-proof". Saturated in social posts | A    | all    | current | slopbench, wiki-en |
| Template repetition   | The same sentence shape or section template repeated across sections; sentences of near-identical length                             | A    | all    | current | shaib, wiki-de     |
| Punchy fragments      | One short fragment per line for drama: "Then it hit me. Everything changed."                                                         | C    | social | rising  | tropes             |
| Excessive enumeration | Turning every point into a numbered or bulleted list, even when the ideas connect                                                    | C    | all    | rising  | tropes             |
| Question-colon reveal | A self-answered teaser: "The result? A 40% drop."                                                                                    | C    | all    | fading  | tropes             |
| Quotable tie-back     | Ending a section on a slogan-like one-liner that restates the point                                                                  | C    | all    | rising  | tropes             |

## Grammar

| Tell             | Looks like                                                                                                                         | Tier | Scope | Status  | Sources           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---- | ----- | ------- | ----------------- |
| Participial tail | A trailing "-ing" clause that comments on significance: "…, highlighting its role in the region", "…, ensuring lasting impact"     | A    | all   | current | reinhart, wiki-en |
| Nominal style    | Verbs turned into nouns: "the implementation of the optimization" instead of "we optimized"; see readability pattern 4 for the fix | A    | all   | current | reinhart          |
| Copula avoidance | Avoiding plain "is"/"has": "serves as", "stands as", "boasts", "features"                                                          | B    | all   | fading  | wiki-en           |
| Synonym cycling  | Swapping in a new synonym for the same thing every sentence to avoid repetition                                                    | C    | all   | rising  | tropes            |

## Vocabulary (dated)

These rows count only at density: three or more catalog words in one counting unit, reported together as one "AI vocabulary" marker (rule 3). Model families have their own favorites; the dates show when each list was observed.

| Tell                       | Looks like                                                                                             | Tier | Scope | Status     | Sources            |
| -------------------------- | ------------------------------------------------------------------------------------------------------ | ---- | ----- | ---------- | ------------------ |
| Claude-family words (2026) | "dependable", "steady", "thoughtful", "meaningful", "adds another layer", "in practice"; „zuverlässig“ | A    | all   | current    | graphite, t3n      |
| GPT-family words (2026)    | "another dimension", "not simply", "does not establish"; „eine weitere Dimension“                      | A    | all   | current    | graphite, t3n      |
| Magic adverbs              | "quietly", "fundamentally", "remarkably" used for unearned emphasis                                    | C    | all   | current    | tropes             |
| 2023–2024 words            | "delve", "tapestry", "testament", "vibrant", "intricate", "landscape"                                  | A    | all   | historical | wiki-en, slopbench |
| German buzzwords           | „In der heutigen Zeit“, „auf das nächste Level heben“, „revolutionieren“                               | C    | all   | current    | t3n                |

## Openers and closers

| Tell                       | Looks like                                                                                                                                                                                                                                                                                                                                   | Tier | Scope | Status  | Sources             |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----- | ------- | ------------------- |
| Rhetorical question opener | A generic question in body copy whose answer is obvious or irrelevant, used as a hook: "Ever wondered…?", "Struggling with X?", "What if you could…?", "Imagine a world where…". Not a hit: a specific question the text answers right away; titles, headlines, and subject lines (the format guidelines decide those); FAQ sections; quotes | B    | all   | current | cc-research, tropes |
| Reflex closing question    | A generic engagement prompt not tied to an answer the author needs: "What about you?", "Thoughts?", "Let me know in the comments". Not a hit: an email ask phrased as a question (yes/no, a choice of options, a date), which is the call to action                                                                                          | B    | all   | current | cc-research         |
| Preamble                   | Announcing what comes instead of saying it: "Let's break this down", "Here's the thing"                                                                                                                                                                                                                                                      | C    | all   | fading  | tropes              |
| Stock outlook ending       | A formulaic look-ahead or challenges paragraph: "Looking ahead…", "Despite these challenges…", "What comes next…"                                                                                                                                                                                                                            | A    | all   | current | graphite, wiki-en   |
| Signposted summary         | Summaries that repeat the section just read: "In summary,", "Overall,", a recap after every section                                                                                                                                                                                                                                          | C    | all   | current | tropes              |

## Attribution and hedging

| Tell                | Looks like                                                                                                                                           | Tier | Scope | Status  | Sources         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----- | ------- | --------------- |
| Vague attribution   | Unnamed authorities: "Experts argue", "Studies show", "Industry reports suggest"                                                                     | B    | all   | current | wiki-en, tropes |
| Empty hedge cluster | Stacked qualifiers or disclaimers that add no information: "may potentially", "based on available information". Varies by model; count clusters only | B    | all   | current | wiki-en         |
| Didactic disclaimer | Lecturing asides: "It's important to note that", "It's worth noting"                                                                                 | B    | all   | fading  | wiki-en, tropes |

## Formatting

| Tell                    | Looks like                                                                                                                                                                                                                                    | Tier | Scope  | Status  | Sources                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------ | ------- | ------------------------------------------- |
| Dash overuse            | Dashes above the brand voice's rate (rule 7: a pair counts as one; default more than one per paragraph or two per social post), often where a comma, colon, or parentheses would do                                                           | A    | all    | fading  | slopbench, wiki-en                          |
| Dash-avoidance chains   | Text that avoids dashes entirely and strings clauses together with commas and full stops instead. Newer models are often tuned to avoid dashes, so this is becoming its own sign                                                              | B    | all    | rising  | wiki-en                                     |
| Bold overuse            | Bolded phrases throughout prose, or every bullet opening with a bold label                                                                                                                                                                    | B    | all    | current | wiki-en, tropes                             |
| Emoji decoration        | Emoji as bullets or in front of headings                                                                                                                                                                                                      | B    | all    | current | wiki-en, wiki-de                            |
| Title-case headings     | Headings in English-style Title Case: in English where the house style uses sentence case, and in languages that don't capitalize every word in headings (Finnish, French, Portuguese, Serbian)                                               | B    | all    | current | wiki-en, wiki-fi, wiki-fr, wiki-pt, wiki-sr |
| Foreign quotation marks | English curly quotes or a mix of curly and straight apostrophes in a language with other conventions: "…" instead of Serbian „…“, mixed ’ and ' in French. Not a hit in English text, where word processors insert curly quotes automatically | B    | all    | current | wiki-sr, wiki-fr, wiki-th                   |
| Unicode decoration      | Fake bold or italic letters, decorative arrows and symbols                                                                                                                                                                                    | C    | social | fading  | tropes                                      |

## Chatbot residue

| Tell                        | Looks like                                                                                                                                                                                                                                                              | Tier | Scope | Status     | Sources          |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ----- | ---------- | ---------------- |
| Chatbot meta-talk           | Text addressed to whoever requested the draft, not to the reader: "Certainly! Here is your post:", "I hope this helps" after a delivered draft; „Natürlich! Hier ist …“. The same phrases written by a sender to a recipient, such as in a personal email, are not hits | B    | all   | current    | wiki-en, wiki-de |
| Placeholders                | Unfilled template slots: "[Your Name]", "[Company]", "2025-XX-XX", "INSERT_LINK"                                                                                                                                                                                        | B    | all   | current    | wiki-en          |
| Knowledge-cutoff statements | "As of my last update…", "I don't have access to current data"                                                                                                                                                                                                          | B    | all   | historical | wiki-en          |

---

## Content-level slop (report only)

What makes readers call a text "slop" is mostly its substance: relevance, information density, and tone weigh more than surface wording (Shaib et al., 2026).

| Tell                    | Looks like                                                                           | Tier | Scope | Status  | Sources |
| ----------------------- | ------------------------------------------------------------------------------------ | ---- | ----- | ------- | ------- |
| Low information density | Paragraphs that could be cut without losing anything; padding around one point       | A    | all   | current | shaib   |
| Generic content         | Statements that would fit any company or topic; no specific number, name, or example | A    | all   | current | shaib   |
| Tone mismatch           | Uniform positivity, stacked enthusiasm, or a register that doesn't fit the audience  | A    | all   | current | shaib   |

---

## Ineffective indicators (never count)

Listed so that nobody counts them. They feel like AI signs but don't reliably separate machine from human text.

| Tell                   | Looks like                                                                                   | Tier | Scope | Status      | Sources |
| ---------------------- | -------------------------------------------------------------------------------------------- | ---- | ----- | ----------- | ------- |
| Transition words alone | A single "Moreover" or "Additionally"; style guides accept them, and only a few are overused | B    | all   | ineffective | wiki-en |
| Polish alone           | Perfect grammar, formal register, or "bland" prose on its own                                | B    | all   | ineffective | wiki-en |
| Single AI word         | One catalog word in isolation                                                                | B    | all   | ineffective | wiki-en |

---

## Signs of human writing (rewrite targets)

Patterns that are more common in human text than in model text. Use them as targets when fixing a tell, within the brand voice's limits. Sources: wiki-en, reinhart.

- Plain "is" and "has" instead of "serves as" or "boasts"
- Plain verbs: "wrote", not "authored"; "use", not "leverage"
- Honest qualifiers where the claim needs them: "perhaps", "tends to", "in most cases"
- An agentless passive where the actor doesn't matter ("the plant was built in 1998"); models use it about half as often as people
- Clauses joined with "and", "but", "so" instead of noun phrases strung together
- Varied sentence length, including the occasional long sentence
- Details only the author knows: a date, a name, a number, a first-hand observation
- A clear opinion, stated once, without a "not X but Y" setup

---

## Language notes

**German.** The spaced en dash („Wir kommen – auch am Samstag.“) is the standard Gedankenstrich; count only overuse. Watch for reflexive „darüber hinaus“ and „außerdem“ as connectors, calques of English chatbot phrases („Ich hoffe, das hilft“, „Natürlich!“), and a heavier nominal style than the brand voice uses. German uses Partizip-I constructions less often than English uses "-ing" clauses, so a trailing participle stands out more in German text (wiki-de). No German corpus study exists yet, so treat German entries as lower confidence than English ones.

**French.** Watch for mixed apostrophe styles (’ next to '), capitalized words in headings copied from English title case, and hollow, cautious officialese ("langue de bois") (wiki-fr).

**Portuguese.** Calques such as "serve como" and "refere-se a" in place of "é"; gerund tails like "destacando sua importância"; chatbot phrases ("espero que isto ajude", "claro!", "certamente!"). Brazilian, European, or African Portuguese is not a sign (wiki-pt).

**Russian.** Stock phrases such as «важно отметить», «стоит отметить», «В заключение», «В целом»; chatbot phrases («Конечно», «Безусловно», «Надеюсь, это помогло»); long chains of adverbial participles, often dangling, which are the Russian form of the participial tail. «Ёлочки» quotes and the spaced dash are normal Russian typography; count only overuse (wiki-ru).

**Chinese.** Negative parallelism 「這不是……而是……」; repeated connectors 此外, 同時, 另一方面; hedges such as 「但這並不意味著……」; chatbot phrases 「當然可以」, 「希望這對你有幫助」. Full-width punctuation, 「」 quotes, and the "——" dash are normal. Whether Chinese model output shows the same patterns as English output is unproven, so treat these as lower confidence (wiki-zh).

**Hebrew.** The em dash is not customary in Hebrew, so any em dash stands out more than in English. Stock phrases include «חשוב לציין כי» (it is important to note that), «לסיכום» (in summary), and «לא רק… אלא גם…» (not only… but also) (wiki-he).

**Serbian.** English curly quotes instead of Serbian „…“; avoidance of plain „је/су“ through „служи као“ (serves as); „Не само X, већ и Y“. The spaced dash is standard Serbian orthography; count only overuse (wiki-sr).

**Thai.** A dash with spaces around it; curly quotes, which some models (ChatGPT, DeepSeek) use more than others (Gemini, Claude); the stock phrase «ทำหน้าที่เป็น» (serves as) (wiki-th).

**Finnish.** English-style title case in headings; inflection errors left over from translation; "ei ole vain A, vaan B" (not just A, but B) as negative parallelism (wiki-fi).

Other languages: notes are added by the refresh from the corresponding Wikipedia pages.

---

## Sources

| Key           | Source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Type                       | License                                              | Last checked |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------- | ------------ |
| `wiki-en`     | [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) (WikiProject AI Cleanup)                                                                                                                                                                                                                                                                                                                                                                   | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-de`     | [Wikipedia: Anzeichen für KI-generierte Inhalte](https://de.wikipedia.org/wiki/Wikipedia:Anzeichen_f%C3%BCr_KI-generierte_Inhalte)                                                                                                                                                                                                                                                                                                                                                       | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-fi`     | [Wikipedia (fi): Merkkejä tekoälyn kirjoittamasta tekstistä](https://fi.wikipedia.org/wiki/Wikipedia:Merkkej%C3%A4_teko%C3%A4lyn_kirjoittamasta_tekstist%C3%A4) (draft)                                                                                                                                                                                                                                                                                                                  | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-fr`     | [Wikipédia (fr): Identifier l'usage d'une IA générative](https://fr.wikipedia.org/wiki/Aide:Identifier_l%27usage_d%27une_IA_g%C3%A9n%C3%A9rative)                                                                                                                                                                                                                                                                                                                                        | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-he`     | [Wikipedia (he): סימנים לכתיבה מבוססת בינה מלאכותית](https://he.wikipedia.org/wiki/%D7%95%D7%99%D7%A7%D7%99%D7%A4%D7%93%D7%99%D7%94:%D7%A1%D7%99%D7%9E%D7%A0%D7%99%D7%9D_%D7%9C%D7%9B%D7%AA%D7%99%D7%91%D7%94_%D7%9E%D7%91%D7%95%D7%A1%D7%A1%D7%AA_%D7%91%D7%99%D7%A0%D7%94_%D7%9E%D7%9C%D7%90%D7%9B%D7%95%D7%AA%D7%99%D7%AA) (draft)                                                                                                                                                    | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-pt`     | [Wikipédia (pt): Sinais de texto gerado por inteligência artificial](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Sinais_de_texto_gerado_por_intelig%C3%AAncia_artificial) (translation of the English page)                                                                                                                                                                                                                                                                             | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-ru`     | [Википедия (ru): Признаки сгенерированности текста](https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F:%D0%9F%D1%80%D0%B8%D0%B7%D0%BD%D0%B0%D0%BA%D0%B8_%D1%81%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8_%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0)                                                                                                                                                   | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-sr`     | [Википедија (sr): Како препознати текст вештачке интелигенције](https://sr.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%98%D0%B0:%D0%9A%D0%B0%D0%BA%D0%BE_%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%BD%D0%B0%D1%82%D0%B8_%D1%82%D0%B5%D0%BA%D1%81%D1%82_%D0%B2%D0%B5%D1%88%D1%82%D0%B0%D1%87%D0%BA%D0%B5_%D0%B8%D0%BD%D1%82%D0%B5%D0%BB%D0%B8%D0%B3%D0%B5%D0%BD%D1%86%D0%B8%D1%98%D0%B5)                                                                         | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-th`     | [วิกิพีเดีย (th): สัญญาณของการเขียนด้วยปัญญาประดิษฐ์](https://th.wikipedia.org/wiki/%E0%B8%A7%E0%B8%B4%E0%B8%81%E0%B8%B4%E0%B8%9E%E0%B8%B5%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2:%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%93%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B4%E0%B8%A9%E0%B8%90%E0%B9%8C) | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `wiki-zh`     | [維基百科 (zh): AI生成文的特徵](https://zh.wikipedia.org/wiki/Wikipedia:AI%E7%94%9F%E6%88%90%E6%96%87%E7%9A%84%E7%89%B9%E5%BE%B5)                                                                                                                                                                                                                                                                                                                                                        | Editor-curated guide       | CC BY-SA 4.0; described in our own words, not copied | 2026-11-22   |
| `graphite`    | [Graphite: AI Tells – Opus 5.5 Update](https://graphite.io/five-percent/research/ai-tells-opus-5-5-update) (Oct 2026; 9,974 topics, model vs. pre-ChatGPT human text)                                                                                                                                                                                                                                                                                                                    | Agency corpus study        | Figures cited                                        | 2026-11-22   |
| `reinhart`    | [Reinhart et al., Do LLMs write like humans?](https://arxiv.org/abs/2410.16107) (PNAS 2025; 66 grammatical features)                                                                                                                                                                                                                                                                                                                                                                     | Peer-reviewed corpus study | CC BY-NC-ND 4.0; figures cited only                  | 2026-11-22   |
| `shaib`       | [Shaib et al., Measuring AI "Slop" in Text](https://arxiv.org/abs/2509.19163) (2026; expert annotation of news and Q&A text)                                                                                                                                                                                                                                                                                                                                                             | Annotation study           | CC BY 4.0                                            | 2026-11-22   |
| `slopbench`   | [SlopBench](https://arxiv.org/abs/2609.33905) (Sep 2026; 18 models, 4 domains; vendor preprint with declared conflict of interest)                                                                                                                                                                                                                                                                                                                                                       | Benchmark                  | Figures cited                                        | 2026-11-22   |
| `tropes`      | [tropes.fyi](https://tropes.fyi/) by ossama.is (curated, AI-assisted, no stated method)                                                                                                                                                                                                                                                                                                                                                                                                  | Practitioner catalog       | CC BY 4.0 (gist version)                             | 2026-11-22   |
| `t3n`         | [t3n: KI-Texte erkennen](https://t3n.de/news/ki-texte-erkennen-phrasen-chatgpt-claude-1766310/) (Nov 2026, reporting Graphite's German findings)                                                                                                                                                                                                                                                                                                                                         | Journalism                 | Cited                                                | 2026-11-22   |
| `cc-research` | This plugin's research of 2026-11-22: LinkedIn within-creator hook and closing-question data (Flypost, AuthoredUp, MagicPost, LinkPost), Fang & Wheeler 2026 (_Journal of Consumer Psychology_), Fortune and NCC Group on rhetorical questions, landing-page and email A/B evidence                                                                                                                                                                                                      | Synthesis                  | Own                                                  | 2026-11-22   |
