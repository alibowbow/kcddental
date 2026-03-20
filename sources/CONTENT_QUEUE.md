# Content Execution Queue

This file turns the higher-level strategy into concrete source-pack work.

## Working rules
- Collect source-backed notes in `sources/` first.
- Only move facts into `lib/data` after the source note is reviewable.
- Keep claim, drug, epidemiology, and changelog data in their own lanes.
- Prefer finishing one narrow batch over starting many partial ones.

## Batch 1: Expand patient-public enrichment
- Target pack: `sources/P2_patient_public`
- Target codes: `K04`, `K12`
- Goal: add conservative, patient-safe enrichment entries beyond `K02` and `K05`
- Current status: `K04` and `K12` moved into `lib/data/enrichment.ts` on 2026-03-21, `K06` deferred until a narrower source pack is ready
- Intended output file later: `lib/data/enrichment.ts`
- Safe fields:
  - `definition`
  - `risk_factors`
  - `symptoms`
  - `diagnostic_criteria` only if explicitly source-backed
  - `prevention`
  - `patient_friendly_summary`
  - `external.references`
  - `provenance`
- Done when:
  - each target code has a source note with title, URL, year, and scope
  - at least one target code is ready to move into `enrichment.ts`
  - deferred broad categories are explicitly called out instead of being guessed

## Batch 2: Add the first verified claim slices
- Target pack: `sources/P1_claim_official`
- Target codes: `K02`, `K05`
- Goal: make the claim hub feel real with a tiny but verified dataset
- Intended output file later: `lib/data/claim-rules.ts`
- Safe fields:
  - `title`
  - `source_title`
  - `source_url`
  - `effective_date`
  - `covered`
  - `coverage_condition`
  - `claim_codes`
  - `required_documents`
  - `denial_risk_factors`
  - `claim_tips`
  - `notes`
- Done when:
  - one official claim note exists for `K02` or `K05`
  - every candidate rule has dated source metadata
  - `npm run validate:data` still passes after insertion

## Batch 3: Prepare flowchart-ready clinical notes
- Target pack: `sources/P5_clinical_curated_notes`
- Target codes: `K04`, `K05`, `K06`
- Goal: create structured notes that can later feed `diagnostic_criteria`, `learning`, and `flowchartData`
- Intended output files later:
  - `lib/data/enrichment.ts`
  - `lib/data/flowcharts.ts`
- Safe note content:
  - differential diagnosis
  - treatment approach summaries
  - learning points
  - common mistakes
  - case scenarios
- Done when:
  - each target code has a structured markdown note
  - the notes are conservative and attributable
  - there is enough structure to draw a small verified flowchart

## Review checklist for every batch
- Is the source official, public, or clearly curated?
- Does the content belong in the selected pack?
- Is every non-official fact traceable?
- Are empty fields left empty instead of guessed?
- Is there a clear next move into `lib/data`?
