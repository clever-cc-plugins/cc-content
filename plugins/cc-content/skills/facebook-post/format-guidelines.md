# Facebook Post Format Guidelines

_Last updated: 2026-08-05_

Format-scope rules for the facebook-post skill. These constraints apply to every
generated post regardless of campaign briefing, brand voice, or platform channel (Personal
Profile, Professional Mode, Page, or Group).

Word-count guidance in this file is **English-equivalent** — translate proportionally for
other languages (German typically +10–20%, Romance languages roughly equivalent, CJK
languages count characters instead, where ~1.6 CJK characters ≈ 1 English word).
Character limits are platform mechanics and apply identically regardless of language.

> **On algorithm claims in this document.** Facebook does not publish exact ranking
> weights, and 2026 third-party reports vary widely in rigor. One report in this batch
> cites highly specific, unverifiable figures (a named "RankNet-7"/"Andromeda" architecture,
> "4.2 trillion ranking decisions daily," a "+312% reach" multiplier for 5+-comment threads,
> a "5-word rule" for comments) that appear in no other independent report and read as
> overconfident synthesis rather than sourced fact. This document only states a specific
> figure when it is corroborated by at least two independent reports, and otherwise
> describes directional consensus (what's weighted above what) rather than invented
> precision.

---

## Layer 1 — Universal Best Practices

These guidelines apply to every Facebook post regardless of audience type, goal, or channel.

### Length and Scope

| Constraint        | Limit                 | Notes                                                                                                                                           |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Hard max          | 63,206 characters     | Platform max; rarely used for organic content                                                                                                   |
| Mobile truncation | ~125–140 characters   | Feed truncates primary text before "See more" on mobile; exact cutoff varies by surface, so design the opening to stand alone within this range |
| Reach-focused     | Under ~150 characters | Short, punchy copy suits announcements, promotions, and pure-reach goals                                                                        |
| Value-driven      | 200+ characters       | Only performs well when clearly structured (educational, storytelling); unstructured long copy underperforms                                    |

Design the primary hook to stand alone within the mobile truncation window. Longer posts
must be clearly structured and value-driven to overcome reach penalties.

**Sources:** Claude synthesis (SwiftCopy, 2026); Copilot synthesis; DeepSeek synthesis (Buffer, 2026)

### Required Sections

Every Facebook post contains these structural elements in order:

1. **Hook / Opening** (required) — the first line deciding engagement; must earn the "See more" click or stand alone if not expanded
2. **Body** (varies) — 0 or more lines delivering substance; may be omitted for pure hook posts
3. **Call to Action (CTA)** (conditional) — present if post serves a goal beyond pure engagement

### Hook / Opening

The first line is the single most important element — readers decide to expand or scroll within 1 second.

Effective hook families (converging across reports):

- **Questions** — trigger the brain's pattern-completion instinct; readers start answering before consciously deciding to engage (e.g., "Is your current tool slowing you down?")
- **Problem-agitation / pain-point** — name a specific pain point and intensify it before presenting the resolution (e.g., "You're losing 10 hours a week to manual data entry")
- **Specific result framing** — concrete outcomes over vague promises (e.g., "We cut onboarding from 4 weeks to 2 weeks")
- **Curiosity / bold or counter-intuitive statement** — a claim specific enough to be checkable, not a withheld-information tease
- **Story opening** — a first-person or narrative opener, especially effective on personal profiles

Rules:

- State the problem or promise in the first sentence — don't bury the lead; front-load the
  substance, since the truncation window (~125–140 characters) is all most readers see
- Open with your strongest claim or question first
- One idea only — avoid compound sentences in the hook
- Don't open with your brand name — it wastes the highest-value opening words
- Avoid clichéd openers: "Just a thought...", "Hot take:", "Unpopular opinion:"
- Avoid vague curiosity gaps ("You won't believe what happened next") — be specific rather
  than withholding basic information; this reads as clickbait and both hurts trust and is
  actively demoted

**Sources:** Claude synthesis; Copilot synthesis; DeepSeek synthesis

### Call to Action

Facebook's feed prioritizes content that keeps users on-platform. CTAs that invite genuine
engagement (comments, shares, reactions) rank higher than links directing off-platform.

Rules:

- Focus on a **single primary action** — multiple asks in one post reduce conversion via choice overload
- Name the action AND set the expectation for what follows (e.g., "See pricing" vs. "Unlock your potential")
- Direct, specific CTAs consistently outperform vague or aspirational ones
- Good CTA examples: "Share your answer in the comments", "Tell us which step was unclear", "Watch the demo before you try it"
- Avoid vague CTAs: "Let me know what you think", "Share if you relate"

**Do not use engagement-bait CTAs.** Phrases like "Like if you agree," "Comment YES if…,"
"Tag a friend who…," or "Share to win" have been explicitly demoted by Meta since a
December 2017 enforcement action, and Meta's 2025 anti-spam crackdown extended penalties to
fake-engagement networks (roughly 500,000 accounts actioned in H1 2025 per Meta's own
Newsroom reporting). This mirrors black-hat SEO's trajectory: platforms iterate to detect
and penalize exactly these tricks, so they are short-lived by design. Earn the comment or
share through content worth responding to, not through a solicitation.

**Sources:** Claude synthesis (Meta, 2017; Meta Newsroom, 2025); Copilot synthesis; DeepSeek synthesis; Perplexity synthesis

### Formatting Conventions

**Format hierarchy.** Across nearly every 2026 benchmark, native short-form video (Reels)
and native photo/album content outperform link posts, and off-platform links are
consistently the weakest format for reach. Where reports disagree is _why a format wins_:
measured per-follower, video and albums lead on reach/views; measured per-reach or per-
impression, text and images often show the highest engagement rate among people who already
see the post. Treat the practical split as: **Reels and native video for reach and
discovery** (reaching people who don't already follow you), **images, albums, and text for
engagement depth** among an existing audience. One niche single-study report (23 posts,
sustainable-agriculture Pages) found image posts outperforming video and text-only in raw
likes/shares — consistent directionally with "visual beats text-only," even though it
diverges from the reach-vs-engagement split above; treat it as a small-sample data point,
not a contradiction of the broader consensus.

- **Links:** if a link is central to the post's goal, put it directly in the post body and
  measure clicks and conversions rather than judging the post by reactions alone. Off-
  platform links reduce reach — that trade-off is real — but do not hide the link in the
  first comment as a workaround to game the algorithm; that pattern is itself now watched
  for and is not a durable tactic. State the reach trade-off to the owner instead.
- **Hashtags:** use **0–3 relevant tags maximum**. Unlike Instagram or TikTok, hashtags have
  minimal effect on Facebook's ranking or discovery — the platform now relies primarily on
  semantic understanding of the caption itself. Hashtags still have narrow value for
  campaign, event, or location tagging and cross-platform consistency. Avoid stuffing (10+
  tags): it reads as spam and can suppress reach. For accessibility, use CamelCase for
  multi-word tags (`#SmallBusinessTips`, not `#smallbusinesstips`) so screen readers parse
  them correctly.
- **Emojis:** use 0–2 emojis max per post, reserved for punctuation, emphasis, or scan-aid
  at natural pauses — not as bullet-point substitutes.
- **Line breaks:** use short paragraphs (1–3 sentences) and line breaks when the idea
  changes, for scannability. Don't over-fragment into one-line-per-sentence formatting —
  it reads as formulaic and doesn't add clarity beyond a certain point.
- **Accessibility:** add specific, descriptive alt text to images (Facebook's
  auto-generated description is a starting point, not a substitute — review or replace it).
  Add reviewed captions to any video with spoken audio; roughly 85% of Facebook video is
  watched without sound, so captions materially affect completion and comprehension.
  Duplicate any text baked into an image (quote cards, promo graphics) in the caption or
  alt text, since screen readers can't read image-embedded text.

**Sources:** Claude synthesis; Copilot synthesis; DeepSeek synthesis; Perplexity synthesis; Consensus synthesis (Waqas et al., 2025)

### Posting Cadence and Timing

_(Context for the owner — not something this skill controls per single-post generation, but
worth surfacing when relevant.)_

- **Frequency:** Pages generally do best at roughly **3–7 posts per week**, prioritizing
  quality and originality over volume — several 2026 benchmarks note brands reducing
  posting volume while growth held or improved. Personal profiles and Groups can sustain a
  more casual, frequent cadence since relationship-based reach doesn't penalize volume the
  same way.
- **Timing:** published "best time to post" studies disagree meaningfully with each other
  (different studies name different peak days and hours). The one consistent cross-study
  signal is that **Tuesday–Thursday outperforms weekends**. Treat any specific time as a
  hypothesis to test against the account's own Insights data, not a rule to follow blindly.
- **Early engagement matters directionally.** Interaction in the window shortly after
  posting (commonly cited as the first 30–60 minutes) appears to influence a post's
  downstream reach across multiple analyses — a reason to reply to early comments promptly,
  though no specific reach multiplier here is corroborated closely enough to state as fact.

### What Separates High from Low Performers

- **Native, on-platform content** (video, images, text) outperforms content that sends
  readers off-platform; prioritize video/Reels for reach-focused goals, images/albums/text
  for engagement depth among an existing audience
- **Originality** — Meta's 2025–2026 crackdown formally penalizes reused or minimally
  transformed content (reaction clips, re-uploaded viral videos, watermarked cross-posts);
  original, source-identifiable production is now a distribution factor, not just a branding
  preference
- **Engagement hooks** (questions, problem-agitation) drive more comments and shares than
  static announcements
- **Prompt community management** — replying to comments, especially in the first hour,
  correlates with stronger distribution across multiple independent reports, though avoid
  treating any specific reply-count multiplier as settled fact
- **Audience warmth match:** cold/unfamiliar audiences need more context (150–300
  **words** — general ad-copy research applied directionally to Facebook) to build
  understanding; warm/familiar audiences convert better with short, specific copy (30–80
  **words**) that references something they already know

**Sources:** Claude synthesis (Meta Newsroom, 2025–2026); Copilot synthesis; DeepSeek synthesis; Deep Marketing synthesis (prior version)

---

## Layer 2 — Audience-Specific Variations

### Personal Profile vs. Business Page vs. Group vs. Professional Mode

This is the most consequential channel decision on Facebook in 2026 — it changes expected
reach by an order of magnitude and should be confirmed before drafting.

| Dimension                 | Personal Profile                                                            | Professional Mode                                        | Business Page                                                                               | Group                                                                     |
| ------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Typical organic reach** | Highest — friend/family content is prioritized in ranking                   | High — retains person-led ranking advantage while public | **Low, ~1–6% of followers** on average; the algorithm treats it closer to broadcast content | **High, roughly 20–60% of members** — treated as community, not broadcast |
| **Tone**                  | Personal, first-person, conversational                                      | Person-led but public-facing; creator voice              | Branded but human; consistent voice                                                         | Peer-to-peer, community-oriented, less promotional                        |
| **Audience cap**          | Up to 5,000 friends (+ followers)                                           | Unlimited public followers                               | Unlimited followers                                                                         | Group membership size                                                     |
| **Ads / boosting**        | Not available                                                               | Limited post boosting; no full Ads Manager               | Full Ads Manager + boosting                                                                 | Not available on member posts                                             |
| **Best use**              | Individual sharing, personal brand                                          | Creators, consultants, public figures, founders          | Business growth, monetization, customer service, scale                                      | Deep community, peer recommendations, member expertise                    |
| **Common mistake**        | Running a business off this account (violates platform terms, capped reach) | Expecting full Business Suite / multi-admin tools        | Expecting follower-count-proportional reach without paid support                            | Being overtly promotional in a community space                            |

**Practical implication:** a Page cannot be expected to reach most of its followers
organically — for conversion-critical posts, either pair organic Page content with paid
promotion, or route the message through a Group or employee/founder personal-profile shares,
which retain markedly better organic distribution. Employee or founder advocacy (sharing
company content from a personal profile) is a legitimate way to recover some of the reach
gap, not a workaround to flag as gaming.

**Sources:** Claude synthesis; Copilot synthesis; DeepSeek synthesis; Perplexity synthesis; Gemini synthesis (directional reach ranges only — see algorithm-claims note above)

### B2B vs. B2C Tone and Strategy

These B2B/B2C differences inform both language and content approach:

| Dimension               | B2B                                                                | B2C                                                                  |
| ----------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Tone**                | Formal, expertise-signaling, direct                                | Fun, light-hearted, personality-driven                               |
| **Proof type**          | Case studies, performance metrics, client success stories          | Visual appeal, user testimonials, relatable experiences              |
| **Content focus**       | Educate to reassure (builds trust, reputation)                     | Inspire to drive action (awareness, sales, new-customer acquisition) |
| **Posting strategy**    | Moderate frequency; strategic and authoritative                    | Higher frequency; responsive to trends and community input           |
| **Content examples**    | Industry commentary, technical insights, credibility signals       | Brand personality, behind-the-scenes, community moments              |
| **Reputation risk**     | High — avoid unvetted takes or flippant humor                      | Lower — authenticity over polish valued by audience                  |
| **Typical post length** | Can run longer (150–300 chars) with denser, evidence-based content | Shorter, punchier (under ~150 chars) with visual support             |

**B2B sub-variations:** SMB accounts can be friendlier than enterprise; technical buyers expect substantive proof; executive sponsors expect authority signals.

**Sources:** Ready Artwork; 98BuckSocial; Straight North (prior version, unchanged by this refresh)

### Persuasion Principles for Facebook

The following Cialdini principles and cognitive biases are most effective on Facebook:

**Problem-agitation** — Naming and intensifying a specific pain point before presenting the resolution moves the reader from passive scrolling to active problem-solving. Example: "Your team is drowning in spreadsheets" before introducing workflow automation.

**Specificity as persuasion** — Direct, specific CTAs and claims ("See a 3-minute demo") consistently outperform vague, aspirational ones ("Unlock your potential"). Specificity itself functions as a credibility signal.

**Audience-warmth-matched framing** — Warm audiences (repeat visitors, engaged followers) respond to copy that references something specific they already engaged with. Cold audiences need more context (150–300 words, applied directionally); warm audiences convert with short, punchy copy (30–80 words).

**Scarcity and FOMO** — Limited-time or limited-availability framing drives short-form social action.

**Social proof** — Testimonials, user-generated content, and visible engagement metrics all signal credibility.

**Authority** — Credibility signals (credentials, results, client wins) work across B2B and B2C but manifest differently. B2B: cite research, results, or professional credentials. B2C: user testimonials, relatable expertise, or personality credibility.

**Originality as trust signal** — Because Meta now formally penalizes reused/recycled content, source-identifiable, first-person production (a named author, a visible process) doubles as both a distribution factor and a persuasion cue: readers trust content they can trace to a real source.

**Sources:** Claude synthesis; Copilot synthesis; DeepSeek synthesis; prior version (Adligator, AdLibrary, Deep Marketing)

---

## Layer 3 — Goal and Funnel Variations

### By Content Goal

| Goal              | Length             | Proof type             | CTA directness               | Hook strategy                           | Promotional level      |
| ----------------- | ------------------ | ---------------------- | ---------------------------- | --------------------------------------- | ---------------------- |
| **Awareness**     | Under ~150 chars   | Visual/stat            | Low (invite a comment/share) | Surprising stat or bold claim           | Low (pure reach focus) |
| **Consideration** | 150–300 characters | Educational content    | Moderate (engagement)        | Problem hook + value promise            | Medium (educate)       |
| **Conversion**    | Under ~150 chars   | Proof/testimonial      | High (direct CTA)            | Result-specific ("Saved 10 hours/week") | High (specific ask)    |
| **Retention**     | 80–150 characters  | Personal/behind-scenes | Low (community)              | Personality, insider access             | Very low (community)   |
| **Advocacy**      | 80–150 characters  | Social proof           | Moderate (invite a share)    | User wins or peer success               | Medium (amplify wins)  |
| **Education**     | 150–300 characters | Examples, steps        | Low (conversation)           | Problem recognition                     | Low (value-driven)     |

⚠ KNOWLEDGE-BASED for goal-by-goal breakdown — sources establish platform mechanics (hooks, CTAs, format hierarchy) but do not enumerate Facebook-specific tactics per goal. Adapt findings: awareness favors native video/Reels + broad hook; consideration favors longer educational posts (image/album or text); conversion favors short, single-CTA posts; advocacy leans on Group-style community content and genuine peer wins (never a share-to-win solicitation).

### By Channel (Page vs. Group) and Funnel Stage (TOFU / MOFU / BOFU)

**Reach dynamics recap:** Pages reach roughly 1–6% of followers organically; Groups reach
roughly 20–60% of members; personal-profile shares reach a higher share still of the
sharer's own network. This distinction shapes funnel strategy fundamentally.

| Stage             | Page strategy                                 | Group strategy                                      | Vocabulary         | CTA directness    | Optimal length   | Common mistake                  |
| ----------------- | --------------------------------------------- | --------------------------------------------------- | ------------------ | ----------------- | ---------------- | ------------------------------- |
| **TOFU (Top)**    | Paid ads for reach; organic posts for seeding | Community introductions, problem hooks              | Accessible         | Low (follow/join) | Under ~150 chars | Too salesy in a community space |
| **MOFU (Middle)** | Educational content, case studies             | Deep-dive discussions, member expertise sharing     | Domain-familiar    | Moderate (engage) | 150–300 chars    | Overwhelming with options       |
| **BOFU (Bottom)** | Direct CTA posts, testimonials                | Member success stories, direct peer recommendations | Specific/technical | High (direct ask) | Under ~150 chars | Unclear next step               |

⚠ KNOWLEDGE-BASED for TOFU/MOFU/BOFU adaptation per channel — research surfaces Groups'
superior reach dynamics but does not specify funnel stagings. Adaptation: Pages function as
the "storefront" (top-of-funnel) with reliance on paid amplification; Groups function as
the "community living room" (middle/bottom-of-funnel) where organic reach is possible,
member-to-member credibility is high, and peer recommendations drive conversion.

**Sources:** Claude synthesis; Copilot synthesis; DeepSeek synthesis; Perplexity synthesis

### By Audience Expertise

| Expertise level | Vocabulary                                     | Background context depth                | Credibility signals                   | Content density          | Tone                          |
| --------------- | ---------------------------------------------- | --------------------------------------- | ------------------------------------- | ------------------------ | ----------------------------- |
| **Novice**      | Plain language, jargon-free or defined inline  | Provide context; no assumed knowledge   | Personal credibility or peer examples | Light; one idea per post | Encouraging, accessible       |
| **Familiar**    | Domain vocabulary accepted; technical terms OK | Assume basic knowledge; fill gaps       | Authority + social proof              | Moderate; multiple ideas | Peer-to-peer, authoritative   |
| **Expert**      | Insider terminology OK; skip broad context     | Assume deep knowledge; jump to subtlety | Specific results, peer credibility    | Dense; multiple ideas    | Credible, specific, skeptical |

⚠ KNOWLEDGE-BASED — no source directly addressed expertise adaptations for Facebook specifically. Directional inference from B2B/B2C depth findings: novice-audience posts should stay under ~150 characters with plain language and no jargon; expert-audience posts can run longer (200+ characters) with denser, evidence-based content per the "well-structured, value-driven" long-post finding.

---

## Quality Checklist

Before presenting output, verify:

- [ ] Hook grabs attention in the first line and stands alone within ~125–140 characters
- [ ] Length matches goal (under ~150 chars for awareness/conversion, 150–300 for consideration/education)
- [ ] One idea per post
- [ ] CTA is singular and easy to answer (never stack multiple asks)
- [ ] CTA earns the response through content, not engagement-bait phrasing ("Like if you agree", "Comment YES", "Tag a friend", "Share to win")
- [ ] Tone matches audience (B2B: expertise-signaling; B2C: personality-driven)
- [ ] Channel confirmed (Personal Profile / Professional Mode / Page / Group) and reach expectations set accordingly
- [ ] For Page posts: acknowledge lower organic reach (~1–6%); if conversion goal, recommend paid amplification or a Group/personal-profile share alongside it
- [ ] For Group posts: tone adjusted for community context (peer-to-peer, less promotional)
- [ ] No clichéd openers ("Just a thought", "Hot take", "Unpopular opinion") and no vague clickbait curiosity gaps
- [ ] Hashtags: 0–3 max, relevant only — not a discovery mechanism on this platform
- [ ] Emojis: 0–2 max, placed at natural pauses (not as bullet substitutes)
- [ ] If post includes a link: placed directly in the post body (not hidden in the first comment as a reach workaround); reach trade-off noted to the owner
- [ ] If post includes an image or video: alt text / captions planned for accessibility
- [ ] Conversation-inviting element present (question, call for input, or community hook)
- [ ] Audience type, goal, funnel stage, and channel inferences confirmed with user
- [ ] Tone consistent with brand voice (if loaded)
