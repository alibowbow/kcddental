import { claimRulesData } from '../lib/data/claim-rules'
import { drugInteractionsData } from '../lib/data/drug-interactions'
import { enrichmentData } from '../lib/data/enrichment'
import { kcdChangelogData } from '../lib/data/kcd-changelog'
import { officialKcdMap } from '../lib/data/official-kcd'

function hasText(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function hasItems<T>(value: T[] | null | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0
}

function hasNumber(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function pushIssue(issues: string[], path: string, message: string) {
  issues.push(`${path}: ${message}`)
}

function requireOfficialCode(issues: string[], path: string, code: string) {
  if (!officialKcdMap[code]) {
    pushIssue(issues, path, `Unknown official code \"${code}\"`)
  }
}

function requireSourceTriplet(
  issues: string[],
  path: string,
  source: {
    source_title?: string | null
    source_url?: string | null
    effective_date?: string | null
  },
) {
  if (!hasText(source.source_title)) {
    pushIssue(issues, path, 'Missing source_title')
  }
  if (!hasText(source.source_url)) {
    pushIssue(issues, path, 'Missing source_url')
  }
  if (!hasText(source.effective_date)) {
    pushIssue(issues, path, 'Missing effective_date')
  }
}

function validateClaimCodes(
  issues: string[],
  path: string,
  claimCodes:
    | {
        code: string
        name: string
        fee_points?: number | null
        patient_copay_rate?: number | null
        notes?: string | null
      }[]
    | undefined,
) {
  if (!hasItems(claimCodes)) {
    return
  }

  claimCodes.forEach((claimCode, index) => {
    const claimPath = `${path}.claim_codes[${index}]`
    if (!hasText(claimCode.code)) {
      pushIssue(issues, claimPath, 'Missing claim code')
    }
    if (!hasText(claimCode.name)) {
      pushIssue(issues, claimPath, 'Missing claim name')
    }
    if (hasNumber(claimCode.fee_points) && claimCode.fee_points < 0) {
      pushIssue(issues, claimPath, 'fee_points must be zero or greater')
    }
    if (hasNumber(claimCode.patient_copay_rate) && (claimCode.patient_copay_rate < 0 || claimCode.patient_copay_rate > 100)) {
      pushIssue(issues, claimPath, 'patient_copay_rate must be between 0 and 100')
    }
  })
}

function insuranceHasVerifiedPayload(
  insurance:
    | {
        covered?: boolean | null
        coverage_condition?: string | null
        claim_codes?: {
          code: string
          name: string
          fee_points?: number | null
          patient_copay_rate?: number | null
          notes?: string | null
        }[]
        required_documents?: string[]
        denial_risk_factors?: string[]
        claim_tips?: string[]
        age_restrictions?: string | null
        frequency_limit?: string | null
        prior_auth_required?: boolean | null
        hira_guideline_url?: string | null
        last_updated_fee?: string | null
        source_title?: string | null
        source_url?: string | null
        effective_date?: string | null
      }
    | null
    | undefined,
) {
  if (!insurance) {
    return false
  }

  return Boolean(
    typeof insurance.covered === 'boolean' ||
      hasText(insurance.coverage_condition) ||
      hasItems(insurance.claim_codes) ||
      hasItems(insurance.required_documents) ||
      hasItems(insurance.denial_risk_factors) ||
      hasItems(insurance.claim_tips) ||
      hasText(insurance.age_restrictions) ||
      hasText(insurance.frequency_limit) ||
      typeof insurance.prior_auth_required === 'boolean' ||
      hasText(insurance.hira_guideline_url) ||
      hasText(insurance.last_updated_fee),
  )
}

const issues: string[] = []

for (const [code, entry] of Object.entries(enrichmentData)) {
  const path = `enrichment.${code}`
  requireOfficialCode(issues, path, code)

  if (entry.code !== code) {
    pushIssue(issues, path, `Entry code \"${entry.code}\" does not match record key`) 
  }

  if (entry.provenance.status !== 'official-only' && entry.provenance.sources.length === 0) {
    pushIssue(issues, path, 'Non-official enrichment requires at least one provenance source')
  }

  if (insuranceHasVerifiedPayload(entry.insurance)) {
    requireSourceTriplet(issues, `${path}.insurance`, entry.insurance ?? {})
    validateClaimCodes(issues, `${path}.insurance`, entry.insurance?.claim_codes)
  }

  if (hasItems(entry.related_drugs)) {
    entry.related_drugs.forEach((drug, index) => {
      const drugPath = `${path}.related_drugs[${index}]`
      if (!hasText(drug.drug_name)) {
        pushIssue(issues, drugPath, 'Missing drug_name')
      }
      if (!hasText(drug.drug_class)) {
        pushIssue(issues, drugPath, 'Missing drug_class')
      }
      if (!hasText(drug.usage_context)) {
        pushIssue(issues, drugPath, 'Missing usage_context')
      }
      if (!hasText(drug.source_title)) {
        pushIssue(issues, drugPath, 'Verified drug entries require source_title')
      }
      if (!hasText(drug.source_url)) {
        pushIssue(issues, drugPath, 'Verified drug entries require source_url')
      }
    })
  }
}

for (const [code, entries] of Object.entries(claimRulesData)) {
  const path = `claimRules.${code}`
  requireOfficialCode(issues, path, code)

  entries.forEach((entry, index) => {
    const claimPath = `${path}[${index}]`
    requireOfficialCode(issues, claimPath, entry.code)

    if (entry.code !== code) {
      pushIssue(issues, claimPath, `Entry code \"${entry.code}\" does not match record key`) 
    }

    if (!hasText(entry.title)) {
      pushIssue(issues, claimPath, 'Missing title')
    }

    requireSourceTriplet(issues, claimPath, entry)
    validateClaimCodes(issues, claimPath, entry.claim_codes)
  })
}

for (const [code, entries] of Object.entries(drugInteractionsData)) {
  const path = `drugInteractions.${code}`
  requireOfficialCode(issues, path, code)

  entries.forEach((entry, index) => {
    const drugPath = `${path}[${index}]`
    requireOfficialCode(issues, drugPath, entry.code)

    if (entry.code !== code) {
      pushIssue(issues, drugPath, `Entry code \"${entry.code}\" does not match record key`) 
    }
    if (!hasText(entry.drug_name)) {
      pushIssue(issues, drugPath, 'Missing drug_name')
    }
    if (!hasText(entry.warning)) {
      pushIssue(issues, drugPath, 'Missing warning')
    }
    if (!hasText(entry.source_title)) {
      pushIssue(issues, drugPath, 'Missing source_title')
    }
    if (!hasText(entry.source_url)) {
      pushIssue(issues, drugPath, 'Missing source_url')
    }
  })
}

kcdChangelogData.forEach((entry, index) => {
  const path = `kcdChangelog[${index}]`
  if (!hasText(entry.code)) {
    pushIssue(issues, path, 'Missing code')
  }
  if (!hasText(entry.summary)) {
    pushIssue(issues, path, 'Missing summary')
  }
  requireSourceTriplet(issues, path, entry)
})

if (issues.length > 0) {
  console.error('Data validation failed:')
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

const claimRuleCount = Object.values(claimRulesData).reduce((total, entries) => total + entries.length, 0)
const drugInteractionCount = Object.values(drugInteractionsData).reduce((total, entries) => total + entries.length, 0)

console.log('Data validation passed.')
console.log(`- official codes: ${Object.keys(officialKcdMap).length}`)
console.log(`- enrichment entries: ${Object.keys(enrichmentData).length}`)
console.log(`- claim rule groups: ${Object.keys(claimRulesData).length}`)
console.log(`- claim rule entries: ${claimRuleCount}`)
console.log(`- drug interaction groups: ${Object.keys(drugInteractionsData).length}`)
console.log(`- drug interaction entries: ${drugInteractionCount}`)
console.log(`- changelog entries: ${kcdChangelogData.length}`)