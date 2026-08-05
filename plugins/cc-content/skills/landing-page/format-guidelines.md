# Landing Page Format Guidelines

_Last updated: 2026-08-05_

Format-scope rules for the landing-page skill. These constraints apply to every
generated landing page regardless of campaign briefing or brand voice. Synthesized
from six independent research runs (Aug 2026: Claude, Consensus, Copilot, DeepSeek,
Gemini, Perplexity) covering conversion-rate research, UX/accessibility standards,
and EU/German privacy law.

**Primary use case:** short, single-CTA inbound registration pages (gated content
downloads, webinar sign-ups). Sections call out explicitly where longer direct-sales
pages diverge.

**Evidence quality varies across the sources this file draws on.** Many landing-page
"statistics" in circulation are vendor case studies, single unreplicated A/B tests, or
infographics recycled for years — some conflict directly with each other (e.g., form
field counts, CTA button color). Where sources disagree or a figure is a single-study
outlier, this file says so explicitly and gives a directional recommendation rather
than a hard number. Treat every specific percentage as a benchmark to test against,
not a guarantee.

---

## Layer 1 — Universal Best Practices

These apply to every landing page regardless of audience type, goal, or channel. The
throughline across all six research runs: **clarity, message-match, low friction, and
speed beat cosmetic tweaks.** Famous "rules" like the 8-second attention span, a
universal winning button color, or "removing one form field lifts conversion 50%" are
weakly sourced or outright debunked — treat page length, field count, and color as
variables to test, not laws.

### Length and scope

Page length should match offer complexity and traffic intent — not a fixed rule.

| Page type                                        | Typical length                 | Rationale                                                                                                      |
| ------------------------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Short-form registration (gated content, webinar) | ~200–800 words, 1–2 scrolls    | Low-risk, low-commitment offer; visitor already has intent; the form is the conversion mechanism, not the copy |
| Direct product/service sales page                | 800–3,000+ words, 3–5+ scrolls | Higher-consideration purchase; needs objection handling, proof, and pricing justification                      |

For the primary use case (short registration pages), **brevity is a feature, not a
limitation** — multiple controlled studies found a negative correlation between
information volume and opt-in willingness. For direct-sales pages, added length only
helps when it resolves a specific buyer doubt (the well-known Crazy Egg 363% lift came
from added content that answered objections, not from length itself) — a shorter page
has also beaten a longer one in controlled tests. Default to the minimum copy needed to
remove doubt for the stated audience and offer, and treat length as a testable variable.

### Required sections

A single-goal landing page needs, in order:

1. **Header zone** — brand identity only; no global site navigation or competing links
2. **Hero / above-the-fold** — headline, subheadline, primary CTA or form, one visual
   anchor, one trust signal. Users spend roughly half to three-quarters of their
   page-viewing time above the fold and form a stay-or-leave impression within
   seconds — but the fold is not a hard wall; users do scroll when given a reason
3. **Value/proof section** — 2–4 concise benefit blocks or bullets with supporting
   proof (what the offer contains, what the visitor gets, why it's credible)
4. **Social proof** — specific, attributed, recent proof placed near the decision point
5. **Closing CTA** — repeats the primary action; on longer pages, repeat the same CTA
   at each major section break rather than introducing a new one

### Hook / opening

- The headline is the single highest-leverage copy element. State the specific,
  concrete value the visitor gets — clarity beats cleverness. A useful test: the
  headline must produce appeal ("I want this"), clarity ("I understand this"), and
  credibility ("I believe this") within seconds of landing
- **Message match is one of the highest-leverage changes available.** Align the
  headline (and hero visual) with the exact wording of the ad, email, or link that
  drove the click — mismatch is one of the most common causes of high bounce rate
- Lead with benefits ("what's in it for me"), support with features as proof — not
  the reverse
- Useful headline template: `[Achieve outcome] without [pain point]`, or name the
  audience + the specific outcome + the obstacle removed
- Avoid vague curiosity-gap teases; lead with a real number, a named outcome, or a
  precise claim

### Call to action

- **One goal, one action, repeated** — not multiple different CTAs competing for
  attention. Every research run that tested this converges on single-CTA pages
  outperforming multi-CTA pages, though the cited magnitude varies by source
  (figures ranging from roughly 30% to 370%+ have been reported — treat the
  direction as robust, the exact multiplier as source-dependent)
- Use first-person, specific, benefit-led copy ("Get my free guide", "Reserve my
  seat") over generic instructions ("Submit", "Click here", "Learn more")
- **Button color is a persistent myth.** The famous "red beats green" result measured
  contrast against a specific page's palette, not an inherent property of red — no
  color has been shown to consistently win across contexts. What's robust is the
  **Von Restorff (isolation) effect**: whichever color contrasts most with its
  surroundings wins. Test copy and placement before testing color
- Place the primary CTA above the fold; on longer pages, repeat the identical CTA
  copy at each major section and keep every button pointed at the same action

### Formatting conventions

- Remove header navigation and all links that don't serve the conversion goal —
  every extra link is a competing exit path and a documented conversion drag
- Follow F-pattern visual scanning: users scan the top horizontally, then track down
  the left margin — place essential elements along this path
- Visual hierarchy: largest type for the headline, high-contrast CTA button, generous
  white space, directional cues (arrows, lines, gaze) pointing toward the CTA
- Write at a 6th–8th grade reading level (English-equivalent; adapt proportionally for
  other languages) — simpler language correlates with meaningfully higher conversion
  across multiple independent large-sample studies
- Short sentences (15–20 words max), short paragraphs (2–3 sentences), scannable
  bullets over dense prose
- Video is optional, not a guaranteed lift — for lead-capture/form-fill pages
  specifically, multiple analyses found no measurable conversion difference between
  pages with and without video. If used, keep it short, muted by default, and
  directly reinforcing the value proposition — never autoplaying with sound or
  competing with the CTA

### What separates high from low performers

- A tight, message-matched headline over a clever one
- One CTA, repeated, over several competing CTAs
- Minimum-necessary form friction over maximum data capture
- Specific, attributed, recent social proof over generic testimonial sliders or logo
  walls
- Fast load time and a fully mobile-usable layout, since the majority of landing-page
  traffic now arrives on mobile
- Honest, verifiable scarcity/urgency over fabricated countdowns or fake stock claims
- Removed navigation and competing links over a page that lets visitors wander off

---

## Layer 2 — Audience-Specific Variations

### B2B vs. B2C

| Dimension                 | B2B                                                                                                                                                                 | B2C                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Typical length            | Often longer / more form fields when the offer is high-value (demo, quote); short for top-of-funnel gated content                                                   | Shorter, lower-friction; fewer fields the norm                                                                       |
| Tone                      | Professional, outcome- and ROI-focused                                                                                                                              | More casual, benefit- and identity-focused                                                                           |
| Evidence / proof type     | Named-customer case studies with quantified outcomes ("Reduced CAC by 34% in 90 days"), verified logos, job titles                                                  | Aggregate ratings and review counts ("4.8/5 from 12,381 reviews"), user-generated content, volume-based social proof |
| Decision-maker psychology | Often a committee or multiple stakeholders; risk-aversion and internal justification matter; authority and named ROI outweigh emotional appeal                      | Often a single decision-maker; emotional/identity framing and immediacy matter more than committee-proof detail      |
| Buying-cycle impact       | Longer cycle — lead-nurture handoff matters more than one-shot conversion; more form fields may be justified if they improve downstream lead quality and close rate | Shorter cycle — optimize for immediate conversion; fewer fields, faster path to action                               |
| CTA approach              | "Request a demo", "Book a consultation", "Get the report" — often a qualification step, not a purchase                                                              | "Buy now", "Start free trial", "Get my discount" — direct action, immediate gratification                            |
| Reading context           | Often read during work hours on desktop, sometimes shared internally                                                                                                | Often read on mobile, in shorter attention windows, higher likelihood of impulse abandonment                         |

B2B sub-variation: for SMB buyers, keep the page closer to the B2C pattern (shorter,
single decision-maker, faster path to action); for enterprise buyers, expect a longer
consideration path where the landing page's job shifts from "convert now" to "convert
to a qualified next step" (demo, call, or gated deeper content) — add named,
quantified proof and reduce urgency-driven CTA language, which reads as inappropriate
for a considered, multi-stakeholder purchase.

### Persuasion principles

Cialdini's principles map cleanly onto landing-page elements. The underlying research
behind each principle is robust; the specific "% lift" figures attached to any single
case study are not — treat every number below as directional.

| Principle                    | Landing-page application                                                                                                                       | B2B vs. B2C note                                                                                                                                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reciprocity**              | The gated asset itself (guide, webinar, template) is the reciprocity engine — deliver genuine value before or instead of asking for a purchase | Especially load-bearing for B2B top-of-funnel pages, where the "ask" (contact info) is small relative to the value of research/tools offered                                                                                         |
| **Social proof**             | Specific, attributed, recent proof placed near the CTA/decision point outperforms generic praise                                               | B2B: named companies, job titles, quantified outcomes. B2C: aggregate counts, star ratings, volume language                                                                                                                          |
| **Authority**                | Credentials, certifications, press mentions, named frameworks, expert speaker bios (webinars)                                                  | More load-bearing in B2B, where trust in the vendor's expertise directly affects willingness to engage a sales process                                                                                                               |
| **Scarcity / urgency**       | Real deadlines only — a genuine webinar date, a genuine cohort cap, real inventory limits                                                      | Overuse risk is high in B2C impulse contexts; fabricated urgency ("Only 2 left" on unlimited digital goods, resetting countdowns) is now explicitly named as a deceptive dark pattern by the FTC and EU regulators — never fabricate |
| **Commitment / consistency** | A small first "yes" — starting a multi-step form, a micro-interaction — increases completion of the rest                                       | Works in both contexts; most tested via multi-step forms (see Forms section)                                                                                                                                                         |
| **Liking / unity**           | Relatable imagery, in-group language ("for marketers like you"), real people over generic stock photos                                         | B2C leans harder on liking (relatable, aspirational imagery); B2B leans harder on unity (peer identity, "teams like yours")                                                                                                          |

**Overuse risk:** stacking all seven principles on one page increases cognitive load
and can read as manipulative. Practitioner guidance converges on prioritizing 1–3
principles per page based on where the specific page is weakest — most landing pages
underuse social proof and authority relative to their potential, so those are a
reasonable default starting point.

---

## Layer 3 — Goal and Funnel Variations

### By content goal

| Goal               | Length / depth                                                                                                           | Proof type                                                                                   | CTA directness                                            | Promotional level                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------- |
| Thought leadership | Medium — enough to establish a credible point of view (e.g., a research-report or original-data gated download)          | Original data, named expert authorship, citations                                            | Soft — "Get the report", not "Buy now"                    | Low — informational framing, minimal sales language |
| Awareness          | Short — a single clear hook and value statement                                                                          | Light — one trust signal, no deep proof needed                                               | Soft — "Learn more", "See how it works"                   | Low                                                 |
| Lead generation    | Short (primary use case) — 200–800 words, minimal form                                                                   | Reciprocity-driven: the free asset itself is the proof of value                              | Direct but low-commitment — "Download now", "Get my copy" | Medium                                              |
| Nurturing          | Short–medium; page usually targets known/returning contacts (e.g., second-touch content offer)                           | Personalized or segment-specific proof where available; continuation of a prior relationship | Direct — "Continue reading", "Get the next guide"         | Medium                                              |
| Conversion         | Medium–long, scaling with price/complexity; full objection handling                                                      | Heaviest proof: named case studies, guarantees, pricing detail, FAQs                         | Very direct — "Buy now", "Start my trial", "Book a call"  | High                                                |
| Retention          | Short, usually behind a login or in an owned channel rather than public acquisition; not a typical landing-page use case | Account-specific proof (usage data, renewal value)                                           | Direct — "Renew now", "Upgrade my plan"                   | Medium–High                                         |

### By funnel stage

This table reflects the strongest, most consistently supported evidence across all six
research runs — every source independently converged on this same TOFU/MOFU/BOFU
pattern for gated content vs. webinar vs. direct-sales pages.

| Stage                                              | Vocabulary level                                                   | Claim specificity                                                  | Proof type                                                                           | CTA directness                                   | Optimal length                                                   | Reader mindset                                                           | Common mistake                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| TOFU (gated content: eBook, checklist, whitepaper) | Plain, jargon-free                                                 | Broad, outcome-oriented                                            | Minimal — the asset itself is the reciprocity engine; light trust signal             | Low-commitment: "Download now", "Get the guide"  | Shortest — ~200–500 words, 1–3 form fields (often email only)    | Exploring a problem, low trust in any single vendor yet                  | Over-asking for data before value is proven; burying the value prop under jargon                     |
| MOFU (webinar registration, demo request)          | Slightly more specific — names the mechanism, not just the outcome | More specific — agenda, speaker credentials, concrete takeaways    | Speaker/author authority, past-attendee proof, genuine scarcity (real date/seat cap) | Medium: "Save my seat", "Reserve my spot"        | Short–medium — 3–5 fields (name, email, company/role)            | Evaluating whether this specific vendor/topic is worth a time investment | Vague "what you'll learn" copy; failing to state date/time/timezone clearly                          |
| BOFU (direct product/service sale, paid trial)     | Precise, includes pricing/technical specifics as needed            | Highly specific — pricing, guarantees, named outcomes with numbers | Heaviest — case studies, testimonials with metrics, guarantees, FAQs, risk reversal  | High: "Buy now", "Start my trial", "Book a call" | Longest — scales with price/complexity, can run 800–3,000+ words | Ready to commit but needs objections resolved                            | Insufficient objection handling; hiding price or terms; too few proof points for the size of the ask |

### By audience expertise

| Expertise | Vocabulary                                                                | Background context depth                                                                          | Credibility signals                                                                          | Content density                                                                   | Tone calibration                                                                     |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Novice    | Plain language, define any necessary term inline, avoid acronyms entirely | Explain the problem before the solution — don't assume the visitor already knows why this matters | Broad, easy-to-verify signals: recognizable brand logos, simple ratings, "trusted by X"      | Low — fewer, larger chunks; more whitespace                                       | Warm, reassuring, explains rather than assumes                                       |
| Familiar  | Category vocabulary is fine, avoid deep jargon                            | Brief context is enough — assume the visitor understands the problem space                        | Mid-depth: named case studies, specific metrics, peer comparisons                            | Medium — standard bullet/section density                                          | Peer-to-peer, practical                                                              |
| Expert    | Full domain vocabulary and acronyms acceptable                            | Skip problem framing — go straight to mechanism and differentiation                               | Deep, technical signals: methodology detail, benchmarks, named integrations, technical specs | Higher — can support denser copy, technical tables, links to deeper documentation | Direct, technical, respects the reader's existing knowledge; avoid explaining basics |

---

## Forms and Field Design

The single highest-leverage — and most inconsistently reported — surface on a
lead-gen landing page. Sources agree on direction (fewer fields generally help
conversion) but disagree sharply on magnitude, and several credible sources document
cases where reducing fields _lowered_ conversion or lead quality. Treat field count as
a variable to test against downstream lead quality and close rate, not a fixed number.

- **Default for short registration pages:** the minimum needed to route the lead —
  often just email, or name + email + company for B2B. Collect qualifying data later
  via nurture email, a scheduling step, or progressive profiling
- **Higher-intent offers** (demo requests, quotes, enterprise trials) can justify more
  fields — more data can improve lead quality even at some conversion-rate cost;
  decide based on downstream close rate, not raw opt-in rate
- Use visible, permanent labels above each field — never placeholder-only labels,
  which disappear on input and fail accessibility standards
- Single-column layout for forms of 8 fields or fewer
- Inline validation on blur, not on every keystroke; never auto-submit on selection
- Radio buttons over dropdowns for small option sets; native input types (email, tel)
  to trigger correct mobile keyboards
- For longer data needs, use multi-step forms with a visible progress indicator —
  multiple independent sources report this outperforming an equally long single-page
  form because perceived effort, not actual field count, drives abandonment
- Avoid the phone-number field on top-of-funnel offers unless sales follow-up
  genuinely requires it — it is consistently one of the highest-friction fields across
  every source that measured field-level impact
- Place privacy/consent microcopy immediately adjacent to the submit button — this is
  where the visitor makes their final decision

---

## Mobile and Technical UX

- **Mobile-first is mandatory, not optional.** The large majority of landing-page
  traffic arrives on mobile across every source that measured it (estimates commonly
  range from roughly 60% to over 80% depending on source and vertical), even though
  desktop often still converts at a somewhat higher rate — meaning the mobile
  experience disproportionately determines blended conversion
- Design for the thumb zone (mid-screen, lower half) for primary CTAs; large tap
  targets — 44×44px minimum (Apple HIG / WCAG 2.2 SC 2.5.8), ideally 48×48px
  (Material Design)
- Single-column, large inputs, minimal scrolling to reach the form
- **Speed is a genuine, heavily-replicated revenue lever** — multiple independent
  large-sample studies (Google/Deloitte, Portent, and others) converge on roughly a
  4–8% conversion loss per additional second of load time, with pages loading in
  ~1 second converting several times higher than pages loading in 5+ seconds. Target
  Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Speed optimization priorities: compress/convert images to next-gen formats (WebP),
  minimize third-party scripts and HTTP requests, implement browser caching, avoid
  heavy autoplay video

### Accessibility (WCAG 2.2)

Accessible forms measurably reduce abandonment for everyone, not only assistive-tech
users — and label failures remain one of the most common accessibility failures on the
web (independent large-scale audits have found roughly half of surveyed home pages
have missing or improperly associated form-input labels).

- Every input has a programmatically associated, **visible** label (WCAG 1.3.1,
  4.1.2, 3.3.2) — never placeholder-as-label
- Required fields and errors marked with text/icons, not color alone (WCAG 1.4.1)
- Errors identified in text, positioned next to the relevant field, and announced to
  screen readers via `aria-live`/`role="alert"` with `aria-describedby` (WCAG 3.3.1,
  3.3.3)
- Full keyboard operability with a visible focus indicator (WCAG 2.4.11–2.4.13); no
  positive `tabindex` overrides
- Text and form-field-border contrast of at least 4.5:1 (WCAG 1.4.3)
- Avoid inaccessible CAPTCHAs — prefer honeypots or invisible challenges
- Do not rely on third-party accessibility overlay widgets — they do not fix
  underlying DOM defects and do not satisfy legal accessibility obligations; build
  accessibility into the markup directly

---

## Privacy, Consent, and Compliance (EU/German Focus)

This section is a design constraint, not optional guidance, for any page targeting
EU/German visitors. **This is not legal advice** — confirm current requirements with
qualified counsel before launch; case law and regulator guidance evolve.

### GDPR consent baseline

Where consent is the legal basis (Art. 4(11), 6(1)(a), 7 GDPR), it must be:

- **Freely given** — a genuine choice with no detriment for refusing
- **Specific and granular** — separate consent per purpose (delivering the asset vs.
  newsletter vs. any third-party sharing)
- **Informed and named** — the controller (and any third parties) named
- **Unambiguous / active** — pre-ticked boxes are invalid (confirmed by the CJEU
  _Planet49_ ruling)
- **Withdrawable** — as easily as it was given

### Koppelungsverbot (prohibition of tying)

Per Art. 7(4) and Recital 43, consent is presumed _not_ freely given if a service is
made conditional on consent to processing not necessary to fulfill the request. In
practice: you may generally require an email address to **deliver** the requested
asset (that processing is necessary), but you may **not** force separate
marketing/newsletter consent as a condition of receiving the download. Marketing
consent must be a distinct, optional, unticked checkbox — never bundled with the
delivery of the asset itself.

### German specifics (UWG §7, BDSG, TTDSG/TDDDG)

- **Double opt-in is the defensible standard** for email marketing. Neither GDPR nor
  UWG literally names "double opt-in," but German case law (including BGH rulings)
  and DPA guidance treat single opt-in as insufficient proof of consent. Implement
  verifiable logging: timestamp, IP address, confirmation-email record
- Fines can reach up to €300,000 under UWG §7 and up to €20M / 4% of global turnover
  under GDPR Art. 83
- TTDSG (now TDDDG) governs cookie/tracking consent for anything beyond strictly
  necessary storage

### Effect of compliant consent on conversion

Well-designed, minimal, honest consent preserves most conversions; lawyer-drafted
checkbox walls and dense legalese depress them. Practical patterns:

- A single, well-worded, optional checkbox rather than a wall of boxes
- Combine consent with clear value ("Get the guide + occasional tips; unsubscribe
  anytime") rather than dense legal language
- A clear, concise privacy-policy link near the form — not the sole disclosure
- Toggles or granular options only where genuinely needed

---

## Common Mistakes and Outdated / Penalized Tactics

### Now discouraged or legally risky (dark patterns)

- **Fake urgency/scarcity** — resetting countdown timers, "only 2 left" on unlimited
  digital goods, false "limited-time" claims. Explicitly named as deceptive by the
  FTC's "Bringing Dark Patterns to Light" report and treated similarly under EU
  consumer law and the Digital Services Act. Independent international sweeps have
  found dark patterns present on a large majority of audited commercial sites — this
  is now an actively enforced area, not a gray zone
- **Pre-ticked consent boxes** — illegal under GDPR (_Planet49_)
- **Confirmshaming** ("No thanks, I don't like saving money"), hidden opt-outs,
  forced continuity, bundled/tied consent (violates Art. 7(4))
- **Manipulative pop-ups without a clear close**, or more than one-to-two overlays per
  session — both correlate with materially higher bounce rates
- **Accessibility overlay widgets** as a substitute for real remediation

### Debunked or overstated "best practices"

- **The "8-second attention span"** — originated from an uncredited marketing report,
  publicly debunked; do not build strategy on it, though the underlying truth (users
  decide fast, scan rather than read) is real
- **"The best CTA button color is X"** — contrast against the surrounding page, not
  any specific hue, is what's robust
- **"Removing one form field always lifts conversion ~50%"** — the viral version of
  this claim traces to vendor marketing and a single ~2007 A/B test recycled for
  nearly two decades; field reduction can just as easily reduce lead quality or even
  reduce conversion in some documented cases
- **"Everything must be above the fold"** — users scroll when given a reason; cramming
  the whole page above the fold to avoid an assumed unwillingness to scroll increases
  cognitive load and can backfire, especially for higher-consideration offers
- **"Video always increases conversions"** — for lead-capture/form-fill pages
  specifically, the evidence shows no consistent lift; test rather than assume

### Durable, user-aligned practices

Clarity over cleverness; tight message match; genuine, specific social proof; honest
and verifiable scarcity; minimal-necessary friction; fast, accessible, mobile-first
pages; transparent and minimal consent; continuous testing measured on downstream
value (qualified leads, closed revenue, show-up rate) rather than vanity opt-in rate.

---

## Quality Checklist

Before presenting output, verify:

- [ ] Headline matches the ad/email/link that drove the click (message match)
- [ ] Value proposition is understandable within seconds; benefits lead, features
      support
- [ ] Page has exactly one goal and one repeated CTA — no competing links, no site
      navigation
- [ ] Form asks for the minimum fields needed to route the lead for this offer's
      funnel stage; every field beyond that is justified by a stated downstream need
- [ ] CTA copy is first-person, specific, and benefit-led — not "Submit" or "Click
      here"
- [ ] At least one specific, attributed, recent social-proof element is placed near
      the CTA or form
- [ ] Any scarcity/urgency claim is genuine and verifiable — never fabricated
- [ ] Copy is written at a 6th–8th grade reading level (English-equivalent); short
      sentences and scannable structure
- [ ] Mobile layout is single-column with thumb-reachable CTA placement and
      44×44px-minimum tap targets
- [ ] Forms use visible labels, inline-on-blur validation, and non-color-only error
      states (WCAG-aligned)
- [ ] For EU/German audiences: marketing consent is a separate, unticked, optional
      checkbox never bundled with asset delivery; double opt-in noted for German email
      marketing
- [ ] Layer 2/3 variation applied (B2B/B2C, goal, funnel stage, audience expertise) is
      explicitly stated and matches the confirmed audience/goal/funnel inputs
- [ ] Audience type, goal, and funnel stage inferences confirmed with user
- [ ] Tone consistent with brand voice (if loaded)
- [ ] CTA is singular and matches the stated goal
