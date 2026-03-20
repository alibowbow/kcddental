# Next Batch: Patient Public

## Purpose
Expand conservative patient-facing enrichment beyond the current `K02` and `K05` examples.

## Priority codes
- `K04`
- `K12`
- `K06` only after a narrower public-health source pack is collected

## What to collect
- short verified definition
- patient-facing symptom description
- common risk or trigger factors
- practical prevention or self-care guidance
- one clear patient summary
- public reference links

## Source quality bar
- Prefer KDCA, MOHW, or similar public-health institutions.
- Avoid clinic marketing pages, blogs, and unattributed summaries.
- If a public page is too broad, record the scope limits in the note.

## Acceptance criteria before touching lib/data
- The note contains title, URL, year, and scope.
- Only safe fields are filled.
- The summary is conservative and avoids treatment or insurance claims unless independently sourced.
- The final note can map directly into `EnrichedDiseaseEntry`.
- Broad umbrella codes stay deferred when the source does not support a safe summary.
