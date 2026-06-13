import { claimRulesData } from './data/claim-rules'
import { enrichmentData } from './data/enrichment'
import { flowchartData } from './data/flowcharts'
import { kcdChangelogData } from './data/kcd-changelog'
import { officialKcdData, officialKcdMap } from './data/official-kcd'
import { primaryCategoryMeta, supplementalClusterMeta } from './data/category-meta'
import { drugInteractionsData } from './data/drug-interactions'
import { getRelationBundle } from './relations'
import type { DiseaseViewModel, OfficialKcdEntry } from './types'

export function getAllOfficialEntries() {
  return officialKcdData
}

export function getOfficialEntry(code: string) {
  return officialKcdMap[code] ?? null
}

export function getDiseaseViewModel(code: string): DiseaseViewModel | null {
  const official = getOfficialEntry(code)
  if (!official) {
    return null
  }
  return {
    official,
    enrichment: enrichmentData[code] ?? null,
  }
}

export function getAllViewModels() {
  return officialKcdData.map((entry) => ({
    official: entry,
    enrichment: enrichmentData[entry.code] ?? null,
  }))
}

export function getPrimaryCategories() {
  return primaryCategoryMeta
    .map((meta) => getOfficialEntry(meta.code))
    .filter((entry): entry is OfficialKcdEntry => Boolean(entry))
}

export function getCategoryBySlug(slug: string) {
  return primaryCategoryMeta.find((item) => item.slug === slug) ?? null
}

export function getCategoryEntries(slug: string) {
  const category = getCategoryBySlug(slug)
  if (!category) {
    return []
  }
  return officialKcdData.filter(
    (entry) => entry.code === category.code || entry.code.startsWith(`${category.code}.`),
  )
}

export function getSupplementalClusters() {
  return supplementalClusterMeta.map((cluster) => ({
    ...cluster,
    entries: officialKcdData.filter((entry) =>
      cluster.prefixes.some((prefix) => entry.code === prefix || entry.code.startsWith(`${prefix}.`)),
    ),
  }))
}

export function getSupplementalCluster(slug: string) {
  return getSupplementalClusters().find((cluster) => cluster.slug === slug) ?? null
}

export function getClaimEntries(code: string) {
  return claimRulesData[code] ?? []
}

export function getDrugEntries(code: string) {
  return drugInteractionsData[code] ?? []
}

export function getFlowchart(code: string) {
  return flowchartData[code] ?? null
}

export function getChangeEntries() {
  return kcdChangelogData
}

export function getCodeRelations(code: string) {
  return getRelationBundle(code)
}

export function getContentCoverage() {
  const enrichmentEntries = Object.values(enrichmentData)
  const verifiedEnrichment = enrichmentEntries.filter((entry) => entry.provenance.status === 'verified').length
  const claimGroups = Object.keys(claimRulesData).length
  const flowcharts = Object.keys(flowchartData).length
  const primaryCategories = primaryCategoryMeta.length
  const supplementalCodes = officialKcdData.filter((entry) => entry.scope === 'supplemental-dental-related').length

  return {
    officialCodes: officialKcdData.length,
    primaryCategories,
    supplementalCodes,
    enrichmentEntries: enrichmentEntries.length,
    verifiedEnrichment,
    claimGroups,
    flowcharts,
    changelog: kcdChangelogData.length,
  }
}