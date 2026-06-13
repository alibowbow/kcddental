import Fuse from 'fuse.js'

import { enrichmentData } from './data/enrichment'
import { officialKcdData } from './data/official-kcd'
import { searchAliases } from './data/search-aliases'
import type { SearchResult } from './types'

interface SearchDocument {
  code: string
  scope: 'primary-k00-k14' | 'supplemental-dental-related'
  officialName: string
  normalizedCode: string
  normalizedName: string
  normalizedJoined: string
  notes: string
  aliases: string[]
  normalizedAliases: string[]
  sortOrder: number
  provenance: 'official-only' | 'verified' | 'pending'
}

const aliasesByCode = searchAliases.reduce<Record<string, string[]>>((acc, alias) => {
  acc[alias.code] = acc[alias.code] ? [...acc[alias.code], alias.term] : [alias.term]
  return acc
}, {})

export interface SearchFilters {
  scope?: 'all' | 'primary' | 'supplemental'
  provenance?: 'all' | 'official-only' | 'verified'
  allowedCodes?: string[] | null
}

function normalize(input: string) {
  return input.toLowerCase().replace(/\s+/g, '')
}

const searchDocuments: SearchDocument[] = officialKcdData.map((entry) => {
  const enrichment = enrichmentData[entry.code]
  const synonyms = [
    ...(enrichment?.synonyms_ko ?? []),
    ...(enrichment?.synonyms_en ?? []),
    ...(enrichment?.name_en ? [enrichment.name_en] : []),
  ]

  const aliases = aliasesByCode[entry.code] ?? []

  const notes = [
    ...entry.includes_official,
    ...entry.excludes_official,
    ...entry.notes_official,
    ...synonyms,
    ...aliases,
  ].join(' ')

  return {
    code: entry.code,
    scope: entry.scope,
    officialName: entry.name_ko_official,
    normalizedCode: normalize(entry.code),
    normalizedName: normalize(entry.name_ko_official),
    normalizedJoined: normalize([entry.code, entry.name_ko_official, notes].join(' ')),
    notes,
    aliases,
    normalizedAliases: aliases.map(normalize),
    sortOrder: entry.sort_order,
    provenance: enrichment?.provenance.status ?? 'official-only',
  }
})

const fuse = new Fuse(searchDocuments, {
  keys: [
    { name: 'code', weight: 4 },
    { name: 'officialName', weight: 4 },
    { name: 'aliases', weight: 3 },
    { name: 'notes', weight: 2 },
  ],
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.33,
})

function matchesFilters(document: SearchDocument, filters: SearchFilters) {
  if (filters.scope === 'primary' && document.scope !== 'primary-k00-k14') {
    return false
  }

  if (filters.scope === 'supplemental' && document.scope !== 'supplemental-dental-related') {
    return false
  }

  if (filters.provenance === 'verified' && document.provenance !== 'verified') {
    return false
  }

  if (filters.provenance === 'official-only' && document.provenance !== 'official-only') {
    return false
  }

  if (filters.allowedCodes && !filters.allowedCodes.includes(document.code)) {
    return false
  }

  return true
}

export function searchOfficialEntries(query: string, filters: SearchFilters = {}): SearchResult[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) {
    return []
  }

  const ranked = new Map<string, SearchResult>()

  for (const document of searchDocuments) {
    if (!matchesFilters(document, filters)) {
      continue
    }

    let candidate: SearchResult | null = null

    if (document.normalizedCode === normalizedQuery) {
      candidate = { code: document.code, score: 0, matchType: 'exact-code' }
    } else if (document.normalizedCode.startsWith(normalizedQuery)) {
      candidate = { code: document.code, score: 10 + document.sortOrder / 1000, matchType: 'prefix-code' }
    } else if (document.normalizedName === normalizedQuery) {
      candidate = { code: document.code, score: 20 + document.sortOrder / 1000, matchType: 'exact-name' }
    } else if (document.normalizedName.startsWith(normalizedQuery)) {
      candidate = { code: document.code, score: 30 + document.sortOrder / 1000, matchType: 'prefix-name' }
    } else if (document.normalizedAliases.some((alias) => alias === normalizedQuery)) {
      candidate = { code: document.code, score: 34 + document.sortOrder / 1000, matchType: 'alias' }
    } else if (document.normalizedAliases.some((alias) => alias.includes(normalizedQuery))) {
      candidate = { code: document.code, score: 44 + document.sortOrder / 1000, matchType: 'alias' }
    } else if (document.normalizedJoined.includes(normalizedQuery)) {
      candidate = { code: document.code, score: 70 + document.sortOrder / 1000, matchType: 'notes' }
    }

    if (candidate) {
      const current = ranked.get(candidate.code)
      if (!current || candidate.score < current.score) {
        ranked.set(candidate.code, candidate)
      }
    }
  }

  for (const result of fuse.search(query)) {
    const document = result.item
    if (!matchesFilters(document, filters)) {
      continue
    }

    const candidate: SearchResult = {
      code: document.code,
      score: 50 + (result.score ?? 0) * 100,
      matchType: 'fuzzy',
    }

    const current = ranked.get(candidate.code)
    if (!current || candidate.score < current.score) {
      ranked.set(candidate.code, candidate)
    }
  }

  return [...ranked.values()].sort((left, right) => left.score - right.score)
}

export function suggestOfficialEntries(query: string, filters: SearchFilters = {}, limit = 8) {
  return searchOfficialEntries(query, filters).slice(0, limit)
}