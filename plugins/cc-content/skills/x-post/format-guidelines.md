# X (Twitter) Post Format Guidelines

_Last updated: 2026-08-05_

Format-scope rules for the x-post skill. These constraints apply to every
generated post regardless of campaign briefing or brand voice.

> **On algorithm claims in this document.** X rebuilt its ranking system around a
> Grok-based transformer ("Phoenix"/"Grox") between late 2025 and mid-2026 and
> partially open-sourced it. The architecture (candidate retrieval, transformer
> scoring, author-diversity attenuation, out-of-network discount) is documented;
> the exact numeric weights are withheld or dispute­d. Several widely circulated
> figures (e.g. "a reply is worth 27x a like," "author-reply = 150x") trace to a
> **2023** code release and are explicitly flagged by more rigorous 2026 analyses
> as unconfirmed for the current system. This document therefore states engagement
> _hierarchies_ (what's directionally weighted above what) as guidance, and avoids
> presenting specific multipliers as settled fact.

---

## Layer 1 — Universal Best Practices

These guidelines apply to every X post regardless of audience type, goal, or channel.

### Length and Scope

| Constraint     | Limit                      | Notes                                                     |
| -------------- | -------------------------- | --------------------------------------------------------- |
| Free account   | 280 characters             | Hard limit for standard posts                             |
| X Premium      | ~25,000 characters         | Available for Premium subscribers; long-form posts        |
| Design target  | 280 characters             | Write for 280 even with Premium; default for distribution |
| Counting rules | Every URL = 23 characters  | t.co wrapping applies uniformly                           |
|                | Most emojis = 2 characters | UTF-16 surrogate pairs; some count as 1                   |
|                | @-mentions at thread start | Do not count in reply posts, count in body mentions       |

Aim for 280-character single posts. Longer-form is available but design for the 280-character
constraint as the default distribution target.

**Premium reach advantage.** Large-sample analyses (e.g. an 18.8M-post Buffer study) found
Premium/verified accounts receive roughly an order of magnitude more reach per post than free
accounts, and free-account median engagement has trended toward zero. This is a real
distribution lever, but it amplifies existing content quality — it does not rescue a weak post.
Note this to the owner as context; it does not change how a post is drafted.

### Required Sections

Every X post contains these structural elements in order:

1. **Hook / Opening** (required) — the first line deciding readability; 1–2 sentences max
2. **Body** (varies) — 0 or more lines delivering substance; leave blank for pure hook posts
3. **Call to Action (CTA)** (conditional) — present if post serves a goal beyond pure engagement

### Hook / Opening

The first line is the hook — readers have "about 1 second" to decide whether to keep reading.

Effective hook types:

- Captivating questions (e.g. "What if you could ship code 50% faster?")
- Surprising facts or statistics (e.g. "Posts with links see 50-90% reach reduction")
- Bold or contrarian statements (e.g. "Everything you know about Twitter growth is wrong")
- Specific-result framing (e.g. "I went from 0 to 10,000 followers in 57 days" beats vague goals)

Rules:

- Open with the strongest claim or question first — never bury the lead
- Keep it short — you have about 1 second to grab attention, so lead with your
  strongest claim or question before anything else
- One idea only — avoid compound sentences in the hook
- Avoid clichéd openers: "Just a thought...", "Hot take:", "Unpopular opinion:"
- Use concrete specifics over vague praise

### Call to Action

Replies and genuine conversation are directionally weighted well above passive likes across
independent 2026 analyses of X's ranking system (exact multipliers are contested — see the
note at the top of this document — but the direction is consistent). Conversation-inviting
posts outperform like-optimized posts.

Rules:

- Focus on a **single primary action** — multiple asks in one post compete and typically
  produce zero action
- Make CTAs specific and easy to answer — focused questions drive more engagement than vague asks
- Good CTA examples: "Drop your answer in the comments", "What's your take?", "What's the
  biggest bottleneck you've hit with X?"
- Avoid vague CTAs: "Let me know what you think", "Share if you relate"

**Do not use engagement-bait CTAs.** Phrases like "like if you agree," "follow for more,"
"comment YES to enter," "RT to win," or "tag a friend" are explicitly targeted by X's 2026
bait-detection enforcement — accounts using them risk demonetization and reach suppression.
This mirrors black-hat SEO's trajectory: platforms iterate to detect exactly these tricks,
so they are short-lived by design. Earn the reply or reshare through content worth
responding to, not through a solicitation.

### Thread vs. Single Post

Single post or thread — choose based on content structure, not length.

| Dimension          | Single Post | Thread                                                                                                 |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| **When to use**    | One idea    | Multi-step process, story, detailed breakdown                                                          |
| **Minimum length** | 1 post      | 5 posts minimum (shorter threads work as single posts)                                                 |
| **Ideal length**   | N/A         | 5-8 posts (sources converge on 5-7 to 6-8; treat as a range, not a fixed number)                       |
| **Avoid**          | N/A         | 10+ posts (sharp completion drop-off)                                                                  |
| **Thread anatomy** | N/A         | Hook post (with "1/N" indicator + value promise) → body posts (1 idea each, self-contained) → CTA post |

Threads shorter than 5 posts usually work better as a single longer post.

**Premium alternative to threads.** For Premium accounts, a single long-form native post (up to
~25,000 characters) can serve the same purpose as a thread for one cohesive, sequential idea —
some 2026 analyses suggest this avoids fragmenting the idea across multiple ranked candidates.
⚠ KNOWLEDGE-BASED / contested — this claim appears in some 2026 reports but not others, and no
source discloses a rigorous comparison; treat threads as the safe default and offer the
long-form alternative only when the account is confirmed Premium and the content is a single
continuous argument rather than a step-by-step sequence.

### Formatting Conventions

- **Line breaks and scannability**: Separate distinct rhetorical functions (claim → support →
  next step) with line breaks rather than dense paragraph blocks — this improves mobile
  readability and keeps readers on the post longer, which most 2026 analyses treat as a
  positive dwell-time signal. Don't over-fragment: 1–3 short paragraphs is the usual range;
  a one-sentence post should stay one paragraph. Excessive line-per-phrase formatting can
  read as engagement bait.
- **Hashtags**: Use **0–2 maximum**. X's content-understanding systems increasingly classify
  posts semantically rather than by hashtag, so hashtags carry little to no independent
  ranking benefit — their main remaining use is joining a specific event, campaign, or
  community hashtag's own discovery stream. Using 3+ hashtags reads as spam and can suppress
  reach. (This is a departure from historical 5–10 hashtag conventions on other platforms.)
- **Links**: X's own statements say there is no explicit coded penalty for links — the effect
  is described as emergent from optimizing for time spent on the platform, since a link
  invites the reader to leave. Empirically, posts with off-platform links consistently show
  the lowest engagement of any format across multiple large studies, and non-Premium accounts
  can see reach reduced sharply. Default to a native summary in the main post with the link in
  the first reply; only put a link directly in the main post if the click itself is the goal
  and reach is secondary. (X has tested changes to link-post visibility — revisit this rule if
  the owner reports links no longer underperforming.)
- **Emojis**: Use 1–2 emojis max per post; reserved for punctuation and emphasis, not
  bullet substitutes. Place at natural pauses.
- **Video and images**: Do not assume video or images automatically win. A large 2026
  cross-platform study (45M+ posts) found **text-only posts had the highest median engagement
  rate on X**, narrowly ahead of images, with video and link posts behind. Native video is
  still valuable for demonstrations, human presence, or when X is actively promoting a format —
  but choose media because it serves the message, not to chase an assumed algorithmic bonus.
  When media is used, native uploads outperform links to external video hosts.

### Posting Cadence and Timing

_(Context for the owner — not something this skill controls per single-post generation, but
worth surfacing when relevant.)_

- **Consistency compounds.** Accounts that post consistently over many weeks see substantially
  higher engagement per post than sporadic posters in large-sample studies; silent stretches
  measurably hurt account-level reach over time. Steady cadence beats bursty posting.
- **Frequency**: a sustainable range is roughly 1–4 original posts per day depending on account
  type and resourcing (brand accounts often lower, active creator accounts often higher);
  sources disagree on the exact optimum, so treat this as a starting range to test, not a rule.
  Space posts out — publishing many posts back-to-back can cause an account's own posts to
  compete with each other in the same followers' feeds.
- **Timing**: weekday mornings (roughly 8–11 AM, audience-local time), especially
  Tuesday–Thursday, converge across independent large-sample studies as strong windows;
  weekends are consistently weaker. These are starting points — account-specific analytics
  should override generic timing charts.
- **First-hour engagement**: the window immediately after posting (commonly cited as the first
  30–60 minutes) appears to disproportionately influence a post's downstream reach across
  several analyses. Replying to early comments in this window is worth prioritizing.

### Community Notes and Accuracy

Community Notes (X's crowdsourced fact-checking layer) is a reputational and, per some studies,
a distributional risk — posts that receive a publicly visible note show substantial drops in
reposts, likes, replies, and views afterward in causal studies, and X has stated that
Note-corrected posts lose creator-monetization eligibility. Treat any factual, statistical, or
comparative claim in a post as something that should hold up to scrutiny: cite sources, use
correct dates and denominators, and avoid claims likely to be misread out of context. This
matters most for data-backed or contrarian posts, which are otherwise a strong-performing
format (see Layer 2).

### What Separates High from Low Performers

- **Conversation** — replies, and especially sustained back-and-forth — is directionally
  weighted well above passive likes across independent analyses of the ranking system; posts
  that explicitly invite conversation (e.g. "What's your biggest X pain point?") outperform
  like-optimized posts. Treat any specific multiplier claim as unconfirmed (see the note at
  the top of this document).
- **Native content** (staying on-platform, uploading media directly) outperforms content that
  sends readers elsewhere; links to external sites reduce reach unless the click itself is the
  goal. This does not mean video or images automatically beat text — see Formatting
  Conventions above.
- **Premium/verified status** correlates with substantially higher reach in large-sample
  studies, but it amplifies existing content quality rather than substituting for it.
- **Out-of-network reach** on X's algorithm gives early-engagement-velocity boosts to posts
  from new or cold audiences. High early replies/reposts push a post wider even if the
  original account is small. (⚠ KNOWLEDGE-BASED synthesis connecting algorithm mechanics to
  strategic insight — not stated directly by research sources.)

---

## Layer 2 — Audience-Specific Variations

### B2B vs. B2C Tone and Strategy

These B2B/B2C differences inform both the language and the content approach:

| Dimension                 | B2B                                                                    | B2C                                                    |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| **Tone**                  | Formal, expertise-signaling, direct                                    | Conversational, casual, personality-driven             |
| **Primary use case**      | Thought leadership, industry news, real-time participation             | Visual, trend-responsive, shareable content            |
| **Posting cadence**       | Moderate & strategic; quality over quantity                            | Higher frequency; agile/responsive to trends           |
| **Content examples**      | Commentary on industry trends, technical insights, credibility signals | Brand personality, behind-the-scenes, community banter |
| **Reputation protection** | Essential; avoid unvetted takes or flippant humor                      | More permissive; authenticity over polish              |

**B2B sub-variations:** SMB accounts can be friendlier than enterprise; technical buyers
expect substance; executive sponsors may expect authority signals.

**B2C extension:** X is used more for real-time/unfiltered brand voice and community-building
than for polished campaigns. ⚠ KNOWLEDGE-BASED — B2C-specific campaign structure beyond tone
inference only; sources establish mechanics but not explicit B2C framework.

### Persuasion Principles for X

The following Cialdini principles and psychological biases are most effective on X:

**Scarcity & FOMO** — Limited-time or limited-availability framing drives short-form social
action. Effective for:

- Time-limited offers ("Only open for the next 24h")
- Exclusive access ("First 50 get early access")
- Rare or one-time announcements

**Social Proof** — Among the most powerful mental shortcuts. Testimonials, statistics,
authority endorsements, and user-generated content all serve as proof. "The more people we
see doing something, the more likely we are to do the same."

**X-native amplification:** X's own ranking mechanics (reply weighting, retweet-based
redistribution) make social-proof signals structurally reinforcing. A post with visibly
accumulated replies or shares becomes more persuasive by virtue of that visible activity,
independent of the copy itself. ⚠ KNOWLEDGE-BASED synthesis connecting algorithm findings
to persuasion principles — not stated directly by any single source.

**Authority** — Credibility signals (credentials, results, publications, recognized affiliations)
work across B2B and B2C but manifest differently:

- B2B: cite results, research, or professional credentials
- B2C: user testimonials, celebrity endorsements, or relatable expertise

**Implementation differences B2B vs. B2C:** B2B authority relies on institutional or
professional proof; B2C often relies on personality or peer proof (what people like me do).

---

## Layer 3 — Goal and Funnel Variations

### By Content Goal

| Goal              | Length                  | Proof type             | CTA directness              | Hook strategy                          | Promotional level         |
| ----------------- | ----------------------- | ---------------------- | --------------------------- | -------------------------------------- | ------------------------- |
| **Awareness**     | 280 chars (single post) | Visual/stat            | Moderate (invite a reshare) | Surprising stat or bold claim          | Low (pure reach focus)    |
| **Consideration** | Thread (5–8 posts)      | Deep explanation       | Moderate (conversation)     | Problem hook + value promise           | Medium (educate & engage) |
| **Conversion**    | 280 chars (single post) | Proof/testimonial      | High (direct CTA)           | Result-specific ("I went from X to Y") | High (specific ask)       |
| **Retention**     | 280 chars (single post) | Personal/behind-scenes | Low (community)             | Personality, insider access            | Very low (community only) |
| **Advocacy**      | 280 chars (single post) | Social proof           | Moderate (invite a reshare) | User wins or peer success              | Medium (amplify wins)     |
| **Education**     | Thread (5–8 posts)      | Examples, steps        | Low (conversation)          | Problem recognition                    | Low (value-driven)        |

⚠ KNOWLEDGE-BASED for goal-by-goal breakdown — sources establish universal mechanics
(hooks, CTAs, conversation-weighting, thread structure) but do not enumerate X-specific
tactics per goal. Adapt universal-structure findings: awareness favors a broad, shareable hook
(media optional — see Formatting Conventions); consideration favors thread-form explainers;
conversion favors a single clear-CTA post (not a thread, since threads dilute a single action's
prominence); advocacy earns reshares through a genuinely shareable win, not a solicitation
(see the engagement-bait caution under Call to Action).

### By Funnel Stage (TOFU / MOFU / BOFU)

| Stage             | Vocabulary                  | Claim specificity | Proof type          | CTA directness       | Optimal length             | Reader mindset        | Common mistake                   |
| ----------------- | --------------------------- | ----------------- | ------------------- | -------------------- | -------------------------- | --------------------- | -------------------------------- |
| **TOFU (Top)**    | Accessible, problem-focused | Broad/provocative | Story or stat       | Low (invite a reply) | 280 chars (single)         | Unaware, passive      | Too technical or feature-focused |
| **MOFU (Middle)** | Domain-familiar             | Specific options  | Comparison or depth | Moderate (engage)    | 280–1400 chars (thread OK) | Considering, active   | Overwhelming with options        |
| **BOFU (Bottom)** | Technical/specific          | High specificity  | Proof, testimonial  | High (direct ask)    | 280 chars (single)         | Ready, decision-maker | Unclear next step or friction    |

⚠ KNOWLEDGE-BASED — no research source directly addressed TOFU/MOFU/BOFU staging for X.
Adaptation: TOFU posts lead with a hook for cold out-of-network reach (bold statement,
surprising stat) since X's algorithm gives boosts to high early-engagement posts; MOFU
posts can use thread form for deeper engagement; BOFU posts should be single, single-CTA,
low-friction.

### By Audience Expertise

| Expertise level | Vocabulary                                     | Background context depth                | Credibility signals                   | Content density                    | Tone                                |
| --------------- | ---------------------------------------------- | --------------------------------------- | ------------------------------------- | ---------------------------------- | ----------------------------------- |
| **Novice**      | Plain language, jargon-free or defined inline  | Provide context; no assumed knowledge   | Personal credibility or peer examples | Light; one idea per post           | Encouraging, accessible             |
| **Familiar**    | Domain vocabulary accepted; technical terms OK | Assume basic knowledge; fill gaps       | Authority + social proof              | Moderate; multiple facets per post | Peer-to-peer, authoritative         |
| **Expert**      | Insider terminology OK; skip broad context     | Assume deep knowledge; jump to subtlety | Specific results, peer credibility    | Dense; multiple ideas per post     | Credible, specific, contrarian-safe |

⚠ KNOWLEDGE-BASED — no research source directly addressed expertise adaptations for X.
Given X's 280-character brevity constraint, adaptation is more about assumed context
than depth: novice posts should define jargon inline or skip it (no room in 280 chars);
expert posts can use insider terminology and skip a broad hook in favor of a specific,
credible claim.

---

## Quality Checklist

Before presenting output, verify:

- [ ] Hook grabs attention in the first line (strong opening in ~1 second, no clichés)
- [ ] Character count appropriate for goal (280 chars for single posts, 5–8 posts for threads)
- [ ] One idea per post (single post) or one idea per thread post
- [ ] CTA is singular and easy to answer (never stack multiple asks)
- [ ] CTA earns the response through content, not engagement-bait phrasing ("like if you
      agree", "follow for more", "comment YES", "tag a friend", "RT to win")
- [ ] Hashtags: 0–2 only (not 3+)
- [ ] Links omitted from the main post (or placed in the first reply) unless the click itself
      is the goal
- [ ] No clichéd openers ("Just a thought", "Hot take", "Unpopular opinion")
- [ ] Media (if any) chosen because it serves the message, not assumed to auto-win over text
- [ ] Any factual, statistical, or comparative claim would hold up to a Community Note
- [ ] Tone matches audience (B2B: expertise-signaling; B2C: personality-driven)
- [ ] If thread: 5–8 posts max, with hook post (1/N), body posts (one idea each), CTA post
- [ ] Conversation-inviting elements present (a specific, answerable question or similar)
- [ ] Emojis: 1–2 max, placed at natural pauses (not as bullet substitutes)
