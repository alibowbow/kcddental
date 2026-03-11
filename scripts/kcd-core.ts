import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { OfficialKcdEntry } from '../lib/types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const SCRIPT_ID = 'kcdRawData'
const LEGACY_FILE = path.join(projectRoot, 'legacy', 'index.html')
const OFFICIAL_TS_FILE = path.join(projectRoot, 'lib', 'data', 'official-kcd.ts')
const OFFICIAL_JSON_FILE = path.join(projectRoot, 'public', 'data', 'official-kcd.json')
const OFFICIAL_CSV_FILE = path.join(projectRoot, 'public', 'data', 'official-kcd.csv')

const CODE_LINE_REGEX = /^([A-Z][0-9]{2}(?:[._]?[0-9A-Za-z]+)*)\s+(.+)$/
const CHAPTER_LINE_REGEX = /^(?!포함\s*:|제외\s*:|주\s*:)(.+)\(([A-Z][0-9]+-[A-Z][0-9]+)\)$/
const REFERENCE_REGEX = /\b([A-Z][0-9]{2}(?:[._]?[0-9A-Za-z]+)*(?:\.\-)?)\b/g

interface RawLine {
  fileLine: number
  blockLine: number
  text: string
  trimmed: string
}

interface ChapterContext {
  title: string
  range: string
}

interface ParsedBlock {
  rawLines: RawLine[]
  scriptStartLine: number
  scriptEndLine: number
}

const FALLBACK_CHAPTERS: Array<{ match: (code: string) => boolean; chapter: ChapterContext }> = [
  {
    match: (code) => /^M0[0-4]/.test(code),
    chapter: { title: '관절병증', range: 'M00-M25' },
  },
  {
    match: (code) => /^M(05|06|08|12|13)/.test(code),
    chapter: { title: '염증성 다발관절병증', range: 'M05-M14' },
  },
  {
    match: (code) => /^M(15|19)/.test(code),
    chapter: { title: '보존된 관절증 관련 코드', range: 'M15-M19' },
  },
  {
    match: (code) => /^M(61|62|79)/.test(code),
    chapter: { title: '보존된 근육·연조직 관련 코드', range: 'M60-M79' },
  },
  {
    match: (code) => /^Q3[5-7]/.test(code),
    chapter: { title: '구순열 및 구개열', range: 'Q35-Q37' },
  },
  {
    match: (code) => /^Q38/.test(code),
    chapter: { title: '소화계통의 기타 선천기형', range: 'Q38-Q45' },
  },
  {
    match: (code) => /^[ST]/.test(code),
    chapter: { title: '보존된 외상·장치 관련 코드', range: 'S00-T98' },
  },
  {
    match: (code) => /^Z/.test(code),
    chapter: { title: '보존된 보철·장치·예방 관련 코드', range: 'Z00-Z99' },
  },
]

function rangeTokenValue(token: string) {
  const letter = token[0]
  const number = Number(token.slice(1))
  return letter.charCodeAt(0) * 1000 + number
}

export function chapterRangeContainsCode(range: string, code: string) {
  const chapterCode = code.slice(0, 3)
  const [start, end] = range.split('-')
  if (!start || !end || chapterCode.length !== 3) {
    return false
  }

  const current = rangeTokenValue(chapterCode)
  return current >= rangeTokenValue(start) && current <= rangeTokenValue(end)
}

export function fallbackChapterForCode(code: string): ChapterContext | null {
  for (const candidate of FALLBACK_CHAPTERS) {
    if (candidate.match(code)) {
      return candidate.chapter
    }
  }
  return null
}

export function inferParentCode(currentCode: string, previousCodes: string[]): string | null {
  let winner: string | null = null

  for (const candidate of previousCodes) {
    if (candidate === currentCode) {
      continue
    }

    if (currentCode.startsWith(candidate)) {
      if (!winner || candidate.length > winner.length) {
        winner = candidate
      }
    }
  }

  return winner
}

export function parseLegacyScript(html: string): ParsedBlock {
  const lines = html.replace(/\r\n/g, '\n').split('\n')
  const scriptStartIndex = lines.findIndex((line) => line.includes(`<script id="${SCRIPT_ID}" type="text/plain">`))

  if (scriptStartIndex === -1) {
    throw new Error(`Unable to find <script id="${SCRIPT_ID}"> in legacy/index.html`)
  }

  const scriptEndIndex = lines.findIndex((line, index) => index > scriptStartIndex && line.trim() === '</script>')

  if (scriptEndIndex === -1) {
    throw new Error('Unable to find the closing </script> for kcdRawData')
  }

  const rawLines = lines.slice(scriptStartIndex + 1, scriptEndIndex).map((line, index) => ({
    fileLine: scriptStartIndex + 2 + index,
    blockLine: index + 1,
    text: line.replace(/\r$/, ''),
    trimmed: line.replace(/\r$/, '').trim(),
  }))

  return {
    rawLines,
    scriptStartLine: scriptStartIndex + 1,
    scriptEndLine: scriptEndIndex + 1,
  }
}

export function parseOfficialEntries(rawLines: RawLine[]): OfficialKcdEntry[] {
  const entries: OfficialKcdEntry[] = []
  let currentChapter: ChapterContext | null = null
  let previousCodesInChapter: string[] = []
  let currentEntry: OfficialKcdEntry | null = null

  const finalizeCurrent = () => {
    if (!currentEntry) {
      return
    }

    entries.push(currentEntry)
    if (currentChapter) {
      previousCodesInChapter.push(currentEntry.code)
    }
    currentEntry = null
  }

  for (const rawLine of rawLines) {
    const line = rawLine.trimmed

    if (!line) {
      finalizeCurrent()
      continue
    }

    if (
      line === '한국표준질병사인분류' ||
      line === '(통계청홈페이지(www.kostat.go.kr)→통계분류→한국표준질병사인분류→자료실)'
    ) {
      continue
    }

    if (!currentEntry) {
      const chapterMatch = line.match(CHAPTER_LINE_REGEX)
      if (chapterMatch) {
        currentChapter = {
          title: chapterMatch[1].trim(),
          range: chapterMatch[2].trim(),
        }
        previousCodesInChapter = []
        continue
      }
    }

    const codeMatch = line.match(CODE_LINE_REGEX)
    if (codeMatch) {
      finalizeCurrent()

      const code = codeMatch[1]
      const name = codeMatch[2]

      if (!currentChapter || !chapterRangeContainsCode(currentChapter.range, code)) {
        const fallbackChapter = fallbackChapterForCode(code)
        if (!fallbackChapter) {
          throw new Error(`Unable to determine chapter for ${code}`)
        }

        const isSameRange = currentChapter?.range === fallbackChapter.range
        currentChapter = fallbackChapter
        if (!isSameRange) {
          previousCodesInChapter = []
        }
      }

      currentEntry = {
        code,
        parent_code: inferParentCode(code, previousCodesInChapter),
        chapter_title: currentChapter.title,
        chapter_range: currentChapter.range,
        sort_order: entries.length,
        scope: currentChapter.range === 'K00-K14' ? 'primary-k00-k14' : 'supplemental-dental-related',
        name_ko_official: name,
        includes_official: [],
        excludes_official: [],
        notes_official: [],
        raw_block: [line],
        referenced_codes: [],
        source: {
          file: 'legacy/index.html',
          script_id: 'kcdRawData',
          line_start: rawLine.fileLine,
          line_end: rawLine.fileLine,
        },
      }
      continue
    }

    if (!currentEntry) {
      continue
    }

    currentEntry.raw_block.push(line)
    currentEntry.source.line_end = rawLine.fileLine

    if (line.startsWith('포함 :')) {
      currentEntry.includes_official.push(line.slice('포함 :'.length).trim())
      continue
    }

    if (line.startsWith('제외 :')) {
      currentEntry.excludes_official.push(line.slice('제외 :'.length).trim())
      continue
    }

    if (line.startsWith('주 :')) {
      currentEntry.notes_official.push(line.slice('주 :'.length).trim())
      continue
    }

    currentEntry.notes_official.push(line)
  }

  finalizeCurrent()

  const knownCodes = new Set(entries.map((entry) => entry.code))

  for (const entry of entries) {
    const references = new Set<string>()
    const text = entry.raw_block.join(' ')
    for (const match of text.matchAll(REFERENCE_REGEX)) {
      const found = match[1]
      if (found === entry.code) {
        continue
      }
      if (knownCodes.has(found) || found.endsWith('.-')) {
        references.add(found)
      }
    }
    entry.referenced_codes = [...references]
  }

  return entries.map((entry, index) => ({
    ...entry,
    sort_order: index,
  }))
}

export function summarizeEntries(entries: OfficialKcdEntry[]) {
  const primaryCount = entries.filter((entry) => entry.scope === 'primary-k00-k14').length
  const supplementalCount = entries.length - primaryCount
  const chapterCounts = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.chapter_range] = (acc[entry.chapter_range] ?? 0) + 1
    return acc
  }, {})

  return {
    total: entries.length,
    primaryCount,
    supplementalCount,
    chapterCounts,
  }
}

export function toOfficialTs(entries: OfficialKcdEntry[]) {
  const payload = JSON.stringify(entries, null, 2)
  return `import type { OfficialKcdEntry } from '../types'\n\n// Generated by scripts/extract-kcd.ts. Do not edit manually.\nexport const officialKcdData: OfficialKcdEntry[] = ${payload} as OfficialKcdEntry[]\n\nexport const officialKcdMap = Object.fromEntries(officialKcdData.map((entry) => [entry.code, entry]))\n`
}

function escapeCsvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

export function toOfficialCsv(entries: OfficialKcdEntry[]) {
  const header = [
    'code',
    'parent_code',
    'chapter_title',
    'chapter_range',
    'sort_order',
    'scope',
    'name_ko_official',
    'includes_official',
    'excludes_official',
    'notes_official',
    'referenced_codes',
    'line_start',
    'line_end',
    'raw_block',
  ]

  const rows = entries.map((entry) => [
    entry.code,
    entry.parent_code ?? '',
    entry.chapter_title,
    entry.chapter_range,
    String(entry.sort_order),
    entry.scope,
    entry.name_ko_official,
    entry.includes_official.join(' | '),
    entry.excludes_official.join(' | '),
    entry.notes_official.join(' | '),
    entry.referenced_codes.join(' | '),
    String(entry.source.line_start),
    String(entry.source.line_end),
    entry.raw_block.join(' || '),
  ])

  return [header, ...rows]
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(','))
    .join('\n')
}

export async function extractOfficialEntries() {
  const html = await readFile(LEGACY_FILE, 'utf8')
  const { rawLines } = parseLegacyScript(html)
  const entries = parseOfficialEntries(rawLines)
  return entries
}

export async function writeOfficialArtifacts(entries: OfficialKcdEntry[]) {
  await writeFile(OFFICIAL_TS_FILE, toOfficialTs(entries), 'utf8')
  await writeFile(OFFICIAL_JSON_FILE, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
  await writeFile(OFFICIAL_CSV_FILE, `${toOfficialCsv(entries)}\n`, 'utf8')
}

export { LEGACY_FILE, OFFICIAL_CSV_FILE, OFFICIAL_JSON_FILE, OFFICIAL_TS_FILE }