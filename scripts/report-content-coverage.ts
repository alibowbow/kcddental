import { claimRulesData } from '../lib/data/claim-rules'
import { drugInteractionsData } from '../lib/data/drug-interactions'
import { enrichmentData } from '../lib/data/enrichment'
import { flowchartData } from '../lib/data/flowcharts'
import { kcdChangelogData } from '../lib/data/kcd-changelog'
import { officialKcdData } from '../lib/data/official-kcd'
import { searchAliases } from '../lib/data/search-aliases'

type EnrichmentEntry = (typeof enrichmentData)[string]

function countRecordEntries<T>(value: Record<string, T[]>) {
  return Object.values(value).reduce((total, items) => total + items.length, 0)
}

function hasText(value: string | null | undefined) {
  return typeof value === 'string' && value.trim().length > 0
}

function hasItems<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0
}

function missingCoreFields(entry: EnrichmentEntry) {
  const missing: string[] = []

  if (!hasText(entry.pathophysiology)) {
    missing.push('pathophysiology')
  }
  if (!hasItems(entry.anatomy_involved)) {
    missing.push('anatomy_involved')
  }
  if (!hasItems(entry.treatment)) {
    missing.push('treatment')
  }
  if (!entry.epidemiology) {
    missing.push('epidemiology')
  }
  if (!entry.insurance) {
    missing.push('insurance')
  }

  return missing
}

const totalOfficialCodes = officialKcdData.length
const enrichmentEntries = Object.values(enrichmentData)
const verifiedEntries = enrichmentEntries.filter((entry) => entry.provenance.status === 'verified')
const officialOnlyEntries = enrichmentEntries.filter((entry) => entry.provenance.status === 'official-only')

const verifiedWithCoreGaps = verifiedEntries
  .map((entry) => ({ code: entry.code, missing: missingCoreFields(entry) }))
  .filter((entry) => entry.missing.length > 0)

const flowchartShells = Object.values(flowchartData).filter(
  (entry) => entry.status === 'pending' || entry.nodes.length === 0 || entry.edges.length === 0,
)

const claimGroupCount = Object.keys(claimRulesData).length
const claimEntryCount = countRecordEntries(claimRulesData)
const drugGroupCount = Object.keys(drugInteractionsData).length
const drugEntryCount = countRecordEntries(drugInteractionsData)

console.log('KCD Dental content coverage')
console.log(`- official codes: ${totalOfficialCodes}`)
console.log(`- enrichment entries: ${enrichmentEntries.length}`)
console.log(`- verified enrichment entries: ${verifiedEntries.length}`)
console.log(`- official-only enrichment entries: ${officialOnlyEntries.length}`)
console.log(`- claim rule groups: ${claimGroupCount}`)
console.log(`- claim rule entries: ${claimEntryCount}`)
console.log(`- flowchart definitions: ${Object.keys(flowchartData).length}`)
console.log(`- flowchart shells: ${flowchartShells.length}`)
console.log(`- search aliases: ${searchAliases.length}`)
console.log(`- drug interaction groups: ${drugGroupCount}`)
console.log(`- drug interaction entries: ${drugEntryCount}`)
console.log(`- changelog entries: ${kcdChangelogData.length}`)

console.log('')
console.log('Highest-leverage next targets')

if (verifiedWithCoreGaps.length === 0) {
  console.log('- no verified enrichment entries are missing the tracked core fields')
} else {
  verifiedWithCoreGaps.forEach((entry) => {
    console.log(`- ${entry.code}: missing ${entry.missing.join(', ')}`)
  })
}

if (flowchartShells.length > 0) {
  console.log('')
  console.log('Flowchart shells')
  flowchartShells.forEach((entry) => {
    console.log(`- ${entry.code}: ${entry.title}`)
  })
}

if (claimEntryCount === 0) {
  console.log('')
  console.log('Claim lane is still empty: start with K02 or K05 in sources/P1_claim_official.')
}

if (drugEntryCount === 0) {
  console.log('Drug lane is still empty: keep it lower priority until official DUR sources are ready.')
}

if (kcdChangelogData.length === 0) {
  console.log('Changelog lane is still empty: defer until verified version-change sources are collected.')
}
