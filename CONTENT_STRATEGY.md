# KCD Dental Content Strategy

## Goals
- Make `kcddental` the fastest trustworthy reference for Korean dental KCD lookups.
- Fill the current shell sections with source-backed, useful content without weakening provenance rules.
- Turn the app from "code browser" into a daily workflow tool for search, compare, print, claim, and study.

## Content Principles
- Source first: every non-official claim must trace to a named, reviewable source pack.
- Small and useful: prefer narrow, high-confidence content over broad but shallow coverage.
- Separate facts from help: official code data stays intact; enrichment lives in dedicated files.
- Empty is allowed: if a section cannot be verified, leave a clean shell instead of guessing.
- Repeatable structure: every code page should feel like the same product, not a one-off article.

## Phased Roadmap

### Phase 1: Make the app feel complete
- Add content to the currently empty or shell-like views for `claim`, `flowchart`, `diff`, and the supplemental sections.
- Expand `K02` and `K05` first because they already have verified enrichment and are the best pattern references.
- Add short educational content for the home page and category pages so users understand how to use the app in under 30 seconds.

### Phase 2: Build trusted depth
- Add more verified claim rules from `P1_claim_official`.
- Add a small set of practical learning notes and common mistakes for high-traffic dental codes.
- Add more flowchart shells only when the supporting source pack is ready.

### Phase 3: Turn content into a workflow
- Connect related codes with stronger cross-links: disease -> claim -> print -> flowchart -> compare.
- Add "what to do next" guidance on code pages.
- Introduce lightweight editorial summaries that help users move faster, not more content for its own sake.

## Source Policy
- `P0_official_kcd` is the source of truth for code structure, labels, and official text.
- `P1_claim_official` is the only place for claim coverage, billing codes, required documents, and claim caveats.
- `P2_patient_public` may be used for patient-facing explanations and summaries.
- `P3_stats` may be used for epidemiology and trend data.
- `P4_drug_dur` may be used for drug warnings and DUR-related context.
- `P5_clinical_curated_notes` may be used for study tips, common mistakes, and carefully curated notes.
- Never infer insurance, treatment, prevalence, or clinical facts from the code name alone.
- If a source is weak, incomplete, or hard to verify, keep the content out of the product.

## Weekly Cadence
- Monday: review which sections are still shells and choose one small content target.
- Tuesday to Wednesday: gather source-backed notes and draft the content in the right pack.
- Thursday: validate against repo rules and verify the content does not overwrite official data.
- Friday: ship one small batch and review what users actually used.
- Every week: keep one priority code cluster, one patient-facing improvement, and one workflow improvement.

## Initial Prioritized Backlog
1. Expand the `claim` experience with verified rule entries for the most used codes.
2. Add `flowchart` content for `K02`, `K04`, and `K05` only after the source pack is ready.
3. Add short learning notes for the highest-traffic codes and common exam / study mistakes.
4. Improve supplemental section content so it is no longer just a shell UI.
5. Add stronger cross-links and "related content" prompts on code detail pages.
6. Add one small monthly editorial pass to remove stale, repetitive, or low-value text.

## Definition Of Done
- Every new entry has a clear source path and a reviewable note.
- The UI has fewer empty states, but the app still protects unsafe content from being guessed.
- A new contributor can tell what to fill next without reading the whole repo history.
