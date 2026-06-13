export interface OfficialKcdEntry {
  code: string
  parent_code: string | null
  chapter_title: string
  chapter_range: string
  sort_order: number
  scope: 'primary-k00-k14' | 'supplemental-dental-related'
  name_ko_official: string
  includes_official: string[]
  excludes_official: string[]
  notes_official: string[]
  raw_block: string[]
  referenced_codes: string[]
  source: {
    file: 'legacy/index.html'
    script_id: 'kcdRawData'
    line_start: number
    line_end: number
  }
}

export interface EnrichedDiseaseEntry {
  code: string
  name_en?: string | null
  synonyms_ko?: string[]
  synonyms_en?: string[]
  icd10_code?: string | null
  icd11_code?: string | null
  definition?: string | null
  pathophysiology?: string | null
  etiology?: string[]
  risk_factors?: string[]
  anatomy_involved?: string[]
  symptoms?: {
    name: string
    severity: 'mild' | 'moderate' | 'severe'
    is_pathognomonic: boolean
  }[]
  diagnostic_criteria?: string[]
  differential_diagnosis?: {
    code: string
    name_ko: string
    key_difference: string
  }[]
  treatment?: {
    approach: string
    description: string
    evidence_level: 'A' | 'B' | 'C' | 'Expert'
    is_insured?: boolean | null
  }[]
  complications?: string[]
  prognosis?: string | null
  prevention?: string[]
  insurance?: {
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
  } | null
  related_drugs?: {
    drug_name: string
    drug_class: string
    usage_context: string
    insurance_code?: string | null
    source_title?: string | null
    source_url?: string | null
  }[]
  learning?: {
    key_points?: string[]
    common_mistakes?: string[]
    memory_tip?: string | null
    case_scenario?: string | null
    case_question?: string | null
    case_answer?: string | null
  } | null
  epidemiology?: {
    prevalence_korea?: string | null
    prevalence_global?: string | null
    peak_age?: string | null
    sex_ratio?: string | null
    trend?: string | null
    source?: string | null
  } | null
  external?: {
    pubmed_query?: string | null
    youtube_query?: string | null
    hira_url?: string | null
    kda_url?: string | null
    who_url?: string | null
    references?: {
      title: string
      url: string
      type: 'guideline' | 'pubmed' | 'textbook' | 'official' | 'hira'
      year?: number
    }[]
  } | null
  kcd_version?: string | null
  previous_code?: string | null
  change_note?: string | null
  patient_friendly_summary?: string | null
  provenance: {
    status: 'official-only' | 'verified' | 'pending'
    updated_at?: string | null
    sources: {
      title: string
      url?: string
      year?: number
      note?: string
    }[]
  }
}

export interface DiseaseViewModel {
  official: OfficialKcdEntry
  enrichment: EnrichedDiseaseEntry | null
}

export interface CategoryMeta {
  slug: string
  code: string
  cluster: 'primary' | 'supplemental'
  label: string
}

export interface FlowchartNode {
  id: string
  label: string
  targetCode?: string | null
}

export interface FlowchartDefinition {
  code: string
  title: string
  status: 'verified' | 'pending'
  note: string
  nodes: FlowchartNode[]
  edges: Array<{ from: string; to: string }>
}

export interface ClaimBillingCode {
  code: string
  name: string
  fee_points?: number | null
  patient_copay_rate?: number | null
  notes?: string | null
}

export interface ClaimRuleEntry {
  code: string
  title: string
  source_title: string
  source_url: string
  effective_date: string
  covered?: boolean | null
  coverage_condition?: string | null
  claim_codes?: ClaimBillingCode[]
  required_documents?: string[]
  denial_risk_factors?: string[]
  claim_tips?: string[]
  age_restrictions?: string | null
  frequency_limit?: string | null
  prior_auth_required?: boolean | null
  notes?: string | null
  historical_reference?: boolean
}

export interface DrugInteractionEntry {
  code: string
  drug_name: string
  warning: string
  source_title: string
  source_url: string
}

export interface KcdChangeEntry {
  code: string
  status: 'added' | 'removed' | 'renamed' | 'moved'
  summary: string
  source_title: string
  source_url: string
  effective_date: string
}

export interface SearchResult {
  code: string
  score: number
  matchType: 'exact-code' | 'prefix-code' | 'exact-name' | 'prefix-name' | 'alias' | 'fuzzy' | 'notes'
}
