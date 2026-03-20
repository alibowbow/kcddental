# Next Batch: Claim Official

## Purpose
Build the first tiny verified claim dataset so the claim hub is no longer all shell.

## Priority codes
- `K02`
- `K05`

## Candidate source files already listed in this pack
- `latest_fee_schedule.pdf`
- `benefit_criteria_and_review_guidelines_2024_07.pdf`
- `claim_writing_guide.pdf`
- `dental_claim_casebook_2014_historical.pdf`

## Capture template
- source title
- source URL
- effective date
- exact rule scope
- covered / not covered
- claim code names and fee points if explicitly stated
- required documents
- denial risk factors
- notes on whether the source is current or historical

## Acceptance criteria before touching lib/data
- At least one rule note is fully attributable.
- Historical references are clearly marked as historical.
- No fee, copay, or coverage rule is inferred from KCD names alone.
- The final candidate can map directly into `ClaimRuleEntry`.
