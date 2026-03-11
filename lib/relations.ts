import { officialKcdData, officialKcdMap } from './data/official-kcd'
import type { OfficialKcdEntry } from './types'

const childrenMap = new Map<string, OfficialKcdEntry[]>()
for (const entry of officialKcdData) {
  if (!entry.parent_code) {
    continue
  }
  const current = childrenMap.get(entry.parent_code) ?? []
  current.push(entry)
  childrenMap.set(entry.parent_code, current)
}

const sortOrderMap = new Map(officialKcdData.map((entry) => [entry.code, entry.sort_order]))

function resolveReferenceToken(token: string) {
  if (officialKcdMap[token]) {
    return officialKcdMap[token]
  }

  if (token.endsWith('.-')) {
    const prefix = token.slice(0, -2)
    return officialKcdData.find((entry) => entry.code === prefix) ?? null
  }

  return null
}

export function getChildren(code: string) {
  return childrenMap.get(code) ?? []
}

export function getSiblings(code: string) {
  const entry = officialKcdMap[code]
  if (!entry?.parent_code) {
    return []
  }
  return getChildren(entry.parent_code).filter((child) => child.code !== code)
}

export function getPreviousEntry(code: string) {
  const entry = officialKcdMap[code]
  if (!entry) {
    return null
  }
  return officialKcdData[entry.sort_order - 1] ?? null
}

export function getNextEntry(code: string) {
  const entry = officialKcdMap[code]
  if (!entry) {
    return null
  }
  return officialKcdData[entry.sort_order + 1] ?? null
}

export function getReferencedEntries(code: string) {
  const entry = officialKcdMap[code]
  if (!entry) {
    return []
  }

  const resolved: OfficialKcdEntry[] = []
  const seen = new Set<string>()
  for (const token of entry.referenced_codes) {
    const target = resolveReferenceToken(token)
    if (target && !seen.has(target.code)) {
      seen.add(target.code)
      resolved.push(target)
    }
  }
  return resolved
}

export function getRelationBundle(code: string) {
  const entry = officialKcdMap[code]
  if (!entry) {
    return null
  }

  return {
    parent: entry.parent_code ? officialKcdMap[entry.parent_code] ?? null : null,
    children: getChildren(code),
    siblings: getSiblings(code),
    previous: getPreviousEntry(code),
    next: getNextEntry(code),
    references: getReferencedEntries(code),
    sameChapter: officialKcdData.filter((candidate) => candidate.chapter_range === entry.chapter_range && candidate.code !== code),
    sortOrder: sortOrderMap.get(code) ?? 0,
  }
}