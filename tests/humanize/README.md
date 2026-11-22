# humanize tests

`humanize` has no script, so it is tested with dry-run scenarios. Re-run them after changing `plugins/cc-content/skills/humanize/SKILL.md` or the counting rules in `plugins/cc-content/skills/_shared/ai-tells.md`.

## Fixtures

All fixtures are fictional. Do not add real client texts.

- `fixtures/en-social-post.md`: a LinkedIn post for a fictional sleep-tracking ring.
- `fixtures/de-blog-paragraphs.md`: four German blog paragraphs for a fictional conveyor manufacturer.
- `fixtures/en-personal-email.md`: a short personal email between colleagues.

## Dry-Run Scenarios

Run each in a scratch project outside the repo. Register a short brand-voice note under `## Context files` in the scratch `CLAUDE.md` (for H1 and H3: "plain, friendly English, contractions OK, at most one dash per paragraph"; for H2: „sachlich, Sie-Ansprache, Gedankenstriche sparsam“). Run `/cc-content:humanize <fixture path>` and follow `SKILL.md` literally.

### H1, English LinkedIn post

- **Must count:** importance flagging ("This matters because"); "more than an X" frame ("more than a tracker, it's a partner"); rule of three ("our lives, our work, and our wellbeing"); reflex closing question ("What about you?").
- **Must not count:** the paired dash in paragraph 2 (a pair around one insertion counts as one, within the brand voice's one per paragraph); the single "tapestry" (one vocabulary word, below the density threshold).
- **Must stay:** "may lower the risk" and "it is not a medical device" (qualifiers that carry the claim).
- **Content findings (unchanged):** the "In a world where everyone is busy…" paragraph is listed as low density or generic content. Only its counted style marker (the rule of three) is fixed; the paragraph is not shortened.
- Marker lines show the tier, e.g. `Importance flagging [A]: 1 — …`.

### H2, German blog paragraphs

- **Must count:** reflexive "not only… but also" („nicht nur schneller, sondern auch sparsamer“, tier B); the vocabulary cluster in paragraph 3 („In der heutigen Zeit“, „zuverlässig“, „eine weitere Dimension“: three catalog words in one paragraph), reported as one line `AI vocabulary [A]: 1`.
- **Must not count:** the spaced en dashes (one per paragraph; the brand voice says „sparsam“ without a number, so the default of one per paragraph applies); the single „Darüber hinaus“ in paragraph 4 (transition word alone is an ineffective indicator).
- **Variant:** add „Wir verwenden ‚zuverlässig‘ bewusst als Kernbegriff“ to the brand-voice note and rerun. „zuverlässig“ must not count, and the paragraph-3 cluster drops to two words, so the vocabulary marker disappears.

### H3, personal email

- **Must stay and must not count:** "I hope this helps." It is written by the sender to the recipient, not chatbot meta-talk.
- **Must not count:** the offer "If you want, I can introduce you…" (a real next step); the ask "Would Thursday at 10 work for a short call?" (an email ask phrased as a question is the call to action, not a reflex closing question).
- Expected result: few or no markers; the draft comes back nearly unchanged.
