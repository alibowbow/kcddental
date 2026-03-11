# Verified enrichment template

Use this template for structured clinical notes that have already been checked by a human.
Do not paste copyrighted source documents directly when the license or usage terms are restrictive.
Summaries should be conservative, source-backed, and clearly attributable.

## Minimum required metadata

- code: Official KCD code that exists in `lib/data/official-kcd.ts`
- provenance.status: `verified` or `pending`
- provenance.sources: At least one real source for any non-official content

## Safe entry outline

```ts
export const enrichmentData = {
  K02: {
    code: 'K02',
    name_en: 'Dental caries',
    definition: 'Short verified definition written from permitted sources.',
    symptoms: [
      {
        name: 'Verified symptom',
        severity: 'mild',
        is_pathognomonic: false,
      },
    ],
    treatment: [
      {
        approach: 'Verified treatment approach',
        description: 'Keep this source-backed and neutral.',
        evidence_level: 'B',
        is_insured: false,
      },
    ],
    external: {
      pubmed_query: 'Dental caries K02',
      youtube_query: 'Dental caries lecture',
      references: [
        {
          title: 'Verified reference title',
          url: 'https://example.org/reference',
          type: 'guideline',
          year: 2025,
        },
      ],
    },
    provenance: {
      status: 'verified',
      updated_at: '2026-03-11',
      sources: [
        {
          title: 'Verified source title',
          url: 'https://example.org/source',
          year: 2025,
          note: 'Optional note about scope or limitations.',
        },
      ],
    },
  },
} as const
```

## Guardrails

- Never overwrite `name_ko_official` or other official extracted fields.
- If a field is not verified, omit it instead of writing placeholder medical content.
- Insurance, reimbursement, epidemiology, drug, and crosswalk data should stay empty unless independently verified.
- Outbound links are acceptable even when live integrations are not.
- The 2025 AAE/ESE pulpal and periapical diagnostic tables should not be pasted as raw source files; use human-written structured notes only if licensing permits.