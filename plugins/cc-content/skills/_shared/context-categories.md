# Common Context Patterns

Dev reference for skill authors and the onboarding skill. **Not deployed to target projects.
Not @-imported by any skill.**

This is a guide to patterns commonly seen in content project context — not a formal taxonomy
or required schema. Users register whatever context is relevant for their project, with
free-form labels and file names of their choosing.

---

## Common types of context

### Brand voice / writing style

**What it typically covers:** Tone, vocabulary, phrases to use or avoid, sentence patterns,
reading level, formality, punctuation preferences.

**Why it matters:** Required for output that sounds on-brand. Without it, content skills
produce generic prose.

**Signals in summaries:** Tone descriptors ("authoritative", "conversational"), vocabulary
lists, "words to avoid", examples of preferred phrasing, style rules, language/locale.

**Note:** Projects often have more than one writing style file — for example, one for
recruiting content and another for corporate communications. Each gets a distinct label
and summary so skills can pick the right one for each task.

**Typical file names in target projects:**
`brand-voice.md`, `writing-style.md`, `copy-guidelines.md`, `Schreibstil.md`,
`tone-of-voice.md`, `editorial-guidelines.md`, `recruiting-voice.md`

---

### Organization or author profile

**What it typically covers:** What the company/author does, products or services, mission,
differentiators, values, market positioning.

**Why it matters:** Required for output that speaks accurately about the organization.
Without it, content skills can only produce generic descriptions.

**Signals in summaries:** Company name, product/service list, mission statement,
"what makes us different", competitive positioning.

**Typical file names in target projects:**
`company-profile.md`, `about-us.md`, `Unternehmensprofil.md`, `brand-platform.md`,
`positioning.md`, `author-bio.md`

---

### Audience profiles

**What it typically covers:** Who the content is for — role, goals, challenges, objections,
preferred channels, motivations.

**Why it matters:** Helps skills calibrate language, examples, and CTAs to the right reader.

**Signals in summaries:** Persona names or roles, pain point descriptions, goals,
ICP (ideal customer profile) data, channel preferences.

**Typical file names in target projects:**
`buyer-personas.md`, `target-audience.md`, `Zielgruppen.md`, `icp.md`,
`customer-profiles.md`, `reader-profile-1.md` … `reader-profile-7.md`

---

### Default output language

**What it typically covers:** The project's default language and locale for all content.

**Why it matters:** Without it, content skills default to English. A simple one-liner
prevents this silently wrong default.

**Signals in summaries:** Language names, locale codes (de-DE, en-US, fr-FR).

**Typical file names in target projects:**
`content-defaults.md`, `output-defaults.md` — or embedded as a section within another
context file (e.g. a line in `writing-style.md`)

---

### Storytelling frameworks and persuasion preferences

**What it typically covers:** Named narrative structures or persuasion principles that
the project specifically prefers or wants to avoid.

**Note:** The plugin already includes a comprehensive framework library (`_shared/storytelling-frameworks.md`)
and persuasion principles (`_shared/persuasion-principles.md`). A project-level file here
captures client-specific overrides — e.g. "always StoryBrand and PAS, never AIDA".

**Signals in summaries:** Framework names (PAS, StoryBrand, etc.), preference or avoidance
statements, notes on narrative approach for this client.

---

### Format rules for specific output types

**What it typically covers:** Mandatory structural elements, SEO conventions, author-bio
blocks, link policies, approval workflows — specific to one content format.

**Signals in summaries:** "Blog article rules", "whitepaper structure", "email newsletter
format", "LinkedIn post policy".

**Typical file names in target projects:**
`blog-rules.md`, `whitepaper-template.md`, `newsletter-format.md`,
`linkedin-guidelines.md`

---

### Reference materials

**What it typically covers:** Books, research, or external sources that inform the content
approach — source material that shapes thinking.

**Signals in summaries:** Book titles, author names, key concepts or quotes from external
sources, research findings.

**Typical file names in target projects:**
`presuasion-book.md`, `reference-materials.md`, `Quellen.md`, `<book-title>.md`

---

### Content samples

**What it typically covers:** Curated examples of high-quality past content with annotations.
Managed by the `cc-content:samples-curation` skill; stored at `context/samples.md`
by convention.

**Signals in summaries:** "Gold-standard examples", "curated samples", "reference posts".

---

### Campaign brief

**What it typically covers:** Goals, key messages, constraints, and audience for a specific
campaign. Session-scoped — distinct from company-level context.

**Note:** Skills detect this automatically via `$ARGUMENTS` or by checking for `brief.md`
in the current working directory. It does not need to appear in the `## Context files`
table unless the owner wants it permanently registered.

---

## How to use this reference when authoring a skill

1. Do not enumerate required categories by name. Instead, describe what the skill needs
   in terms of **content needs** (brand voice, audience, organization background, etc.).

2. In the skill's context-loading step, instruct Claude to:
   - Read all files listed in the `## Context files` table
   - Assess each file's **Summary** to understand what it covers
   - Load the file(s) most relevant to the current task
   - When multiple files cover the same need, pick the best match for the specific task

3. Warn on semantic absence, not label absence:
   - "No brand voice context found" (not: "no `writing-style` row")
   - "No organization background found" (not: "no `organization-identity` row")

4. For optional context (audience, language, format rules): use if present, note silently
   if absent, never ask.
