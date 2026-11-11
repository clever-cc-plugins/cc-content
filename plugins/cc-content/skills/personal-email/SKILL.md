---
name: personal-email
description: >
  Use this skill when the owner wants to write, draft, or reply to a personal email —
  one person writing to one recipient or a few named recipients, professionally or
  privately. Invoke when the user says "write an email to", "draft a reply to this
  email", "help me answer this email", "write a thank-you email", "ask for an
  introduction", "follow up on my email", "decline this request politely", "write a
  networking email", or "invite friends to dinner by email". Covers networking and
  introductions, asks and favours, career emails, speaker/podcast/journalist pitches,
  stakeholder and status emails, saying no, thanks, congratulations, condolences,
  apologies, and private invitations. Do NOT use for bulk campaigns, newsletters,
  nurture sequences or sales outreach — that is marketing-email.
allowed-tools: Read, Write, Edit, Bash
argument-hint: "[optional: path to the email you're replying to, or to a briefing/notes file]"
---

@./format-guidelines.md **Read when:** starting this skill
@../\_shared/storytelling-frameworks.md **Read when:** the email runs past ~300 words in Step 5
@../\_shared/persuasion-principles.md **Read when:** selecting persuasion principles in Step 6
@../\_shared/readability-patterns.md **Read when:** running the readability pass in Step 7

# Personal Email Skill

You are helping the owner write a personal email they will send under their own name: a message to one recipient or a few named recipients that reaches a concrete outcome and protects the relationship. The email must follow the format guidelines in this skill folder, sound like the owner, and — if the owner is replying — answer the email they received.

This skill serves personal-branding projects (the email is part of how the owner is known) as well as personal-assistant use (everyday professional and private correspondence). It is **language- and culture-neutral**: it works in any output language, with dedicated guidance for German-speaking countries in `format-guidelines.md`. Calibration happens through the loaded context files, the incoming email or notes (if any), and the owner's answers.

Two rules hold for every run:

- **Never invent the human core.** Do not make up memories, feelings, compliments, shared history or facts about the recipient. Ask the owner for them; if they stay unknown, mark the gap in the draft as an inline `[TODO: …]`.
- **Never send.** This skill drafts. Sending stays with the owner.

## Step 0: Recall learnings

Read `../_shared/learnings-protocol.md` and follow its **Recall** section.

## Step 1: Load context

Check for a `## Context files` table in CLAUDE.md via:

```bash
grep -A 200 '## Context files' CLAUDE.md 2>/dev/null || echo "(no context table)"
```

CLAUDE.md files may exist at multiple hierarchy levels (workspace root, project root, sub-directory) and the harness loads all applicable ones. Where multiple tables exist, rows from more specific CLAUDE.md files take precedence.

**Do not enumerate required categories by name.** Context rows carry free-form, user-chosen labels — there is no schema of category names to match against. Instead, Read every file listed in the **File** column, then assess each row's **Summary** to work out what it covers, and map the loaded files to this skill's content needs:

| Need                       | What to look for in the Summary                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| Sender voice               | Personal writing style, tone, vocabulary, phrasing rules, things to avoid                      |
| Sender profile             | Who the owner is: name, role, organisation, background, current projects                       |
| Personal-brand positioning | How the owner wants to be known, key themes, target communities (optional)                     |
| Output language            | Default language, locale, or region; default formality (e.g. Sie or Du)                        |
| Email-specific rules       | Signature block, default sign-offs per register, working hours or time zone, email conventions |

Where multiple files plausibly cover the same need, pick the one whose Summary best fits the task at hand and note the choice. A company brand-voice file is a weaker match for sender voice than a personal one: use it only when no personal voice file exists, and note that.

Warn on **semantic absence, not label absence** — "No sender voice context found", never "no `writing-style` row". Gate on two needs only: if no loaded file plausibly covers **sender voice**, or none covers **sender profile**, ask once. If the request is clearly private (an invitation, a note to friends, family or neighbours), gate on sender voice only — the owner's name is enough as a profile there:

> "I don't see any [personal writing style / sender profile] context. Is this intentional, or should I pause while you run `/content-onboarding`?"
>
> - **Intentional**: note the gap; label the final output `⚠ DEGRADED OUTPUT — no [sender voice / sender profile] context`
> - **Pause**: direct the owner to onboarding and stop.

For absent positioning, language, or email-specific rules: note silently and continue — never ask.

See `../_shared/context-categories.md` for the full guide to common context patterns and the authoring rules this step follows.

## Step 2: Check for the incoming email or a briefing

Determine the source material:

1. If the owner passed a file path as an argument (`$ARGUMENTS`), read that file.
2. If the owner pasted an email or a thread into the conversation, use it.
3. Otherwise, check for `brief.md` in the current working directory:

```bash
ls brief.md 2>/dev/null && echo "found" || echo "missing"
```

- **An incoming email or thread:** this is the main input. Note the sender, their register (formal or informal, Sie or Du, length), every question they asked and in what order, and any deadline. Confirm: "✓ Replying to <sender> — <n> question(s) to answer."
- **A briefing or notes file:** note the recipient, purpose, constraints and deadlines. Confirm: "✓ Briefing loaded from `<path>`." If the file was only found as `brief.md` in the working directory (not passed or named by the owner), it may belong to unrelated marketing work: ask once whether it is meant for this email, and ignore it if not.
- **Nothing found:** note "No incoming email or briefing — working from your description." and continue.

## Step 3: Infer and confirm the email profile

This is the content-production-specific step for personal email. It replaces the B2B/B2C, goal and funnel inference of the marketing skills with the axes in `format-guidelines.md`.

1. Use the source material, loaded context and the owner's request to infer:
   - **Family**: networking & introductions, asks & favours, career move, visibility pitch, stakeholder communication, status/decision/handover, saying no, relationship upkeep, or private life (plus the sub-type, e.g. "reference request")
   - **Relationship**: tie strength (stranger, weak or dormant tie, warm contact, close), power direction (upward, peer, downward), and setting (professional or private; internal or external)
   - **Position in the exchange**: first contact, reply, follow-up after silence (and which one), ongoing thread, reconnecting after a gap, or closing the loop after a favour
   - **Recipient's topic familiarity**: newcomer, informed generalist, or expert
   - **Language and register**: output language and formality — for German, Sie or Du and the salutation level; take it from the incoming email if there is one

   If the material genuinely does not support a confident inference on any of these, ask the owner the missing question directly rather than guessing. **Never switch from a formal to an informal register (e.g. Sie to Du) on your own** — only if the recipient already did or the owner says so.

2. Present a one-line inference summary, for example: "Family: asks & favours (reference request) · Tie: dormant, upward · Position: reconnecting after a gap · Topic: expert · Language: de, Sie, 'Liebe Frau Dr. Weber'"

3. Ask the owner to confirm or correct before generating. Do not silently apply assumptions. Include any missing inputs from Step 4 in this same message; when Step 4 has nothing to ask, this confirmation is the only question round before the draft.

4. Based on the confirmed values, state which variations from `format-guidelines.md` you are applying and why (e.g., "Applying the reference-request pattern — ask whether they can give a _strong_ reference, supply materials, 2–4 weeks' lead time — with the upward-power adjustments: recommendation first, binary ask").

## Step 4: Collect the missing inputs

Check what the email still needs and ask for everything missing in **one** consolidated question — never a series of questions. If Step 3 already has to ask the owner something, put these questions in the same message so a quick reply costs one round trip, not two. If the request and source material already cover everything below, skip this step. Typical gaps:

- **Recipient**: name, title, and how the owner knows them (if not clear from the material)
- **Purpose or ask**: the one thing the email should achieve — or confirmation that it deliberately has no ask (thanks, congratulations, condolences)
- **Deadline and its real reason** (if there is a deadline)
- **The human detail**: one specific thing only the owner knows — the shared moment, what exactly the recipient did, the concrete effect of their help, a memory. Required for relationship upkeep, introductions, thanks, apologies and condolences; strongly recommended for first contact

For **condolences, apologies and other deeply personal messages**, ask the owner for their own words first (a few rough sentences are enough) and build the email around them — tighten and structure, do not replace the emotional core.

If the owner cannot or does not want to provide a detail, continue and mark the gap in the draft with an inline `[TODO: …]` rather than inventing it.

## Step 5: Choose the structural spine

Personal emails are usually far shorter than the ~300 words at which `../_shared/storytelling-frameworks.md` applies, so the default spine is **BLUF**: ask or bottom line → reason → minimal context → easy out → thanks. Use the family's spine from the table in `format-guidelines.md` (Layer 3); relationship emails lead with the sentiment instead of an ask.

Only when the email will run past ~300 words — a handover, a detailed brief, a long personal letter — read `../_shared/storytelling-frameworks.md` and follow its selection process. State the choice in working notes.

## Step 6: Select persuasion principles

Skip this step when the email deliberately has no ask (thanks, congratulations, condolences, no-strings sharing).

Otherwise read `../_shared/persuasion-principles.md` and follow its selection process, then filter the choice through the personal-email persuasion table in `format-guidelines.md` (Layer 2): prefer direct asking with a real reason, specific gratitude, genuine shared context, unconditional reciprocity and a sincere easy out. Pick 1–2 principles. **Never use scarcity, loss framing, door-in-the-face as a tactic, or manufactured urgency** — in a written, forwardable record they read as pressure. Note the choices in working notes; never expose the technique in the email.

## Step 7: Generate the email

Produce a complete email that:

- Has a subject line that summarises the content or action (with deadline where relevant) — or, for a reply, keeps the thread's subject unless the topic changed
- Opens with the greeting that fits the confirmed language and register, then puts the ask or bottom line in the first two lines (sentiment first for relationship emails); for strangers and weak ties, the shared context or mutual connection goes in line 1
- Applies the confirmed family, relationship, exchange-position and familiarity variations from `format-guidelines.md`
- For replies: answers every question in the order asked, in the first lines, and mirrors the sender's register and length
- Has exactly one primary ask, numbered independent questions, or deliberately no ask
- Contains one explicit warmth or intent signal and, where there is an ask, a sincere easy out
- Includes the owner's human detail from Step 4 — never an invented one
- Ends with the sign-off that matches the register: the owner's default from the email-specific rules context or learnings if one exists, otherwise the conventional one for the language and register
- Ends with the signature block from the email-specific rules context if one exists; otherwise only the owner's name — do not invent role lines, phone numbers or links

**Resolve mandatory elements at runtime.** If the email-specific rules context names required elements (a signature, a disclaimer, a fixed sign-off), include them. If a genuinely required element is unresolved — the recipient's correct title, a date, a name — and the owner has not supplied it, ask once; only if it stays unresolved, mark it inline as `[TODO: …]`.

**Add a recipients note** when the recipient fields matter: a double opt-in introduction (new thread, both in To), moving an introducer to BCC, a private group email (BCC), or a CC that should be announced in the text.

**Legal check (EU/DACH).** If the recipient has not consented and the email promotes the owner's or their employer's paid goods or services — e.g. "networking" that ends with an offer of paid services, or pitching paid work to a stranger — or asks a customer for satisfaction feedback or a testimonial, flag the potential advertising risk before presenting the draft. Point to the legal-boundaries section in `format-guidelines.md` and, where it fits, suggest reframing the email as genuinely non-commercial, asking for a non-commercial warm introduction, or using `/cc-content:marketing-email` if it is in fact sales outreach. A warm introduction alone is not consent to advertising. This is a risk flag, not legal advice.

Before the checklist, run the **readability pass** from `../_shared/readability-patterns.md` on the finished draft as its own step: scan for the six patterns and fix only the passages with a hit, keeping content, tone and names intact. Then remove AI tells named in `format-guidelines.md` (stacked enthusiasm, adjective triads, generic praise, stiff transitions) — the email must not be sendable unchanged to someone else.

Internally verify against the quality checklist in `format-guidelines.md`. For every unchecked gate, revise the draft and re-check — do not present until every gate passes or the failure genuinely cannot be fixed (e.g. a missing human detail), in which case surface it in the output rather than hiding it.

Present the output in a clearly delimited block:

```
─────────────────────────────────────────────
Email draft — <family> · <position in the exchange>
─────────────────────────────────────────────
To: <recipient>   [CC/BCC note, only if relevant]
Subject: <subject line>

<greeting>

<email body>

<sign-off>
<signature or name>
─────────────────────────────────────────────
Word count: <N> | Subject length: <N> characters
```

If output is degraded (a required context need is uncovered), prepend:

```
⚠ DEGRADED OUTPUT — generated without: <list of missing needs>
```

If the email has an ask, add one line after the block with the follow-through plan from `format-guidelines.md`: when to follow up if there is no reply (3–5 business days, at most two follow-ups to a stranger, then close the loop), or — after a favour — a reminder to report the outcome later.

## Step 8: Feedback

This step has two phases:

**Auto-store phase.** Read `../_shared/learnings-protocol.md` and follow its **Writing** section. Tag entries `[cc-content:personal-email]`; the source is `inferred` unless the user said it. Worth recording in this skill: the owner's preferences and defaults — sign-offs per register, default formality, signature conventions, phrases they always or never use, how they like asks framed — corrections the owner made to the output, and accepted or rejected deviations from best practice. Example of a good entry: `[cc-content:personal-email] Owner signs off with "Viele Grüße" to Sie contacts and "Liebe Grüße" only to friends (stated) — <date>`. **Do not record personal data about third parties** (a recipient's allergies, family situation, health, or whom the owner is on first-name terms with): it is not the owner's preference, and the learnings file is shared project memory.

**Explicit feedback.** Ask whether the output met expectations.

- If the user provides a correction or states a standing preference, record it per the protocol's **Writing** section, with source `corrected` for a correction and `stated` for a preference.
- If the correction changes the draft, apply it, re-run the readability pass and the quality checklist from Step 7, and present the revised draft in the same delimited block before continuing.
- Then follow the protocol's **Confirming** section. Then deliver a closing line and exit. Derive it from the run: if the session has an email tool or connector available, offer to save the email there as a draft (never to send it); otherwise close with `Ready to paste into your email client — sending stays with you.` If the Step 7 legal check raised a flag, repeat it in one line.
