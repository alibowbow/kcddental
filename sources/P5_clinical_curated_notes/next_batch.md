# Next Batch: Clinical Curated Notes

## Purpose
Prepare structured notes that can later power richer enrichment and flowcharts.

## Priority codes
- `K04`
- `K05`
- `K06`

## What to capture
- differential diagnosis pointers
- treatment approach overview
- learning key points
- common mistakes
- mini case scenario
- flowchart candidate steps

## Guardrails
- Write structured human notes, not pasted copyrighted tables.
- Keep notes attributable and conservative.
- Leave insurance, epidemiology, and drug claims out unless separately verified.

## Acceptance criteria before touching lib/data
- Each code has a clear markdown note.
- The note can feed either `learning` fields or `flowchartData`.
- Any recommendation-like content is framed as a structured summary, not as unsourced advice.
