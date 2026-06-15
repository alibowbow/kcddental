# P3 stats note: WHO global oral health 2022

- target codes: `K02`, `K05`, `K08`
- source title: `Oral health | WHO fact sheet`
- source url: `https://www.who.int/news-room/fact-sheets/detail/oral-health`
- year: `2023 (fact sheet, based on Global Oral Health Status Report 2022)`
- supporting source title: `Global Oral Health Status Report 2022 | WHO`
- supporting source url: `https://www.who.int/team/noncommunicable-diseases/global-status-report-on-oral-health-2022`

## Verified takeaways

- Oral diseases affect an estimated 3.5 billion people worldwide and are among the most common health conditions.
- Untreated dental caries of permanent teeth affects about 2 billion people; caries of primary (deciduous) teeth affects about 514 million children.
- Severe periodontal disease is estimated to affect about 19% of the global adult population, representing more than 1 billion cases.
- Complete tooth loss (edentulism) affects roughly 350 million people globally, and prevalence rises sharply with age.

## Scope note

- These are global burden estimates, not Korea-specific figures.
- Map caries figures to `K02`, severe periodontal figures to `K05`, and complete tooth loss figures to `K08`.
- Keep these as `prevalence_global` / epidemiology context only; do not convert them into Korea prevalence or claim figures.
- Korea-specific figures should continue to come from KDCA / KNHANES sources, kept separate from these global numbers.

## Safe fields later

- `epidemiology.prevalence_global`
- `epidemiology.trend`
- `epidemiology.source`
- `external.references`
- `provenance`
