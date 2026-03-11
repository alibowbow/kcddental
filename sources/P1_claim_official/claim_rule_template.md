# Claim rule entry template

Use this template only for verified claim guidance backed by an official source.
Do not fill unknown fields with guesses.
Leave the field empty or omit it until a source is verified.

## Minimum required metadata

- code: Official KCD code that exists in `lib/data/official-kcd.ts`
- title: Short claim rule label
- source_title: Official source title
- source_url: Stable public URL or document landing page
- effective_date: YYYY-MM-DD or the official effective date string

## Optional verified fields

- covered
- coverage_condition
- claim_codes
- required_documents
- denial_risk_factors
- claim_tips
- age_restrictions
- frequency_limit
- prior_auth_required
- notes
- historical_reference

## Example TypeScript entry

```ts
export const claimRulesData = {
  K02: [
    {
      code: 'K02',
      title: 'Verified claim note title',
      source_title: 'Official HIRA or NHIS source',
      source_url: 'https://example.org/source.pdf',
      effective_date: '2026-01-01',
      covered: true,
      coverage_condition: 'Write the exact condition from the source.',
      claim_codes: [
        {
          code: 'NNN000',
          name: 'Verified fee code name',
          fee_points: 1234,
          patient_copay_rate: 30,
          notes: 'Optional note copied from the source context.',
        },
      ],
      required_documents: ['Only add documents stated in the source.'],
      denial_risk_factors: ['Only add verified denial factors.'],
      claim_tips: ['Only add procedural tips supported by the source.'],
      notes: 'Optional reviewer note.',
    },
  ],
} as const
```

## Guardrails

- KCD classification and claim guidance are separate domains. Do not infer coverage from the code name.
- Fee points, copay rates, and limits must have a dated source.
- Historical documents should set `historical_reference: true` and should not override newer rules.
- If a claim rule is not source-backed yet, keep it out of `lib/data/claim-rules.ts`.