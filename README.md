# KCD Dental Reference

Static Next.js reference platform for Korean dental KCD codes.

## Overview

This repository turns the legacy single-file viewer into a static GitHub Pages app with:

- official KCD extraction from `legacy/index.html`
- strict separation between official data and optional enrichment
- static-safe search, compare, print, quiz, favorites, and recent views
- GitHub Pages export under `/kcddental`

## Data Provenance

### Official extracted data

The source of truth for official KCD content is:

- `legacy/index.html`
- only the `<script id="kcdRawData" type="text/plain"> ... </script>` block

Generated artifacts:

- `lib/data/official-kcd.ts`
- `public/data/official-kcd.json`
- `public/data/official-kcd.csv`

Official fields preserved verbatim:

- code
- official Korean name
- include / exclude / note lines
- raw block text
- source line ranges
- original order

### Enrichment data

Optional enrichment lives separately from official data:

- `lib/data/enrichment.ts`
- `lib/data/claim-rules.ts`
- `lib/data/drug-interactions.ts`
- `lib/data/kcd-changelog.ts`

Rules:

- official extracted text is never overwritten
- high-stakes content must stay empty unless source-backed
- empty states belong in UI, not in data files
- claim, reimbursement, drug, epidemiology, and changelog content must not be inferred from KCD names alone

## Extraction Workflow

Install dependencies:

```bash
npm ci
```

Extract official data:

```bash
npm run extract:kcd
```

Verify generated output against the legacy snapshot:

```bash
npm run verify:kcd
```

Run extractor tests:

```bash
npm run test:extractor
```

Validate enrichment / claim / changelog safety rules:

```bash
npm run validate:data
```

Common development commands:

```bash
npm run lint
npm run build
```

## Current Verified Scope

Official extraction is complete for all preserved codes.

Verified enrichment is intentionally small and conservative right now:

- `K02` using KDCA public oral-health sources
- `K05` using KDCA public oral-health sources

Everything else remains either:

- official-only
- pending shell UI
- empty until verified sources are added

## GitHub Pages Deployment Notes

Production deployment settings:

- base path: `/kcddental`
- `output: 'export'`
- `trailingSlash: true`
- `images.unoptimized = true`

Deployment workflow:

- `.github/workflows/deploy.yml`
- install dependencies
- extract official data
- verify official data
- run extractor tests
- validate enrichment safety rules
- lint
- build static export
- publish `out/`

## Source Packs

Source pack manifests live under `sources/`.

Current folders:

- `sources/P0_official_kcd`
- `sources/P1_claim_official`
- `sources/P2_patient_public`
- `sources/P3_stats`
- `sources/P4_drug_dur`
- `sources/P5_clinical_curated_notes`

Templates for safe data entry:

- `sources/P1_claim_official/claim_rule_template.md`
- `sources/P5_clinical_curated_notes/verified_enrichment_template.md`

## How To Add Verified Enrichment Safely

1. Do not edit `legacy/index.html`.
2. Do not hand-edit `lib/data/official-kcd.ts`.
3. Add only source-backed content to enrichment files.
4. Keep claim / drug / changelog data separate from general enrichment.
5. Run `npm run validate:data` before committing.
6. Run `npm run verify:kcd` if the extraction layer changed.

## Limitations

- Claim pages are shells until verified HIRA/NHIS data is added.
- Flowcharts are shells until curated local datasets exist.
- Diff pages stay empty until verified changelog entries are added.
- Epidemiology and drug sections stay empty unless verified source datasets are added.
- The app is static-only and does not use runtime APIs or a backend.