'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { SearchCombobox } from '@/components/ui/search-combobox'
import { StatusBadge } from '@/components/ui/status-badge'
import { getCodeRelations, getDiseaseViewModel } from '@/lib/getters'
import { provenanceLabel, scopeLabel } from '@/lib/format'

function formatValue(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : '—'
}

function formatJoined(items: string[] | undefined) {
  return items && items.length ? items.join(' / ') : '—'
}

export function CompareClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const leftCode = searchParams.get('left')
  const rightCode = searchParams.get('right')
  const left = leftCode ? getDiseaseViewModel(leftCode) : null
  const right = rightCode ? getDiseaseViewModel(rightCode) : null
  const printableRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printableRef, documentTitle: 'kcddental-compare' })

  const updateCode = (key: 'left' | 'right', code: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, code)
    router.replace(`/compare?${params.toString()}`)
  }

  const rows = useMemo(() => {
    const leftRelations = left ? getCodeRelations(left.official.code) : null
    const rightRelations = right ? getCodeRelations(right.official.code) : null

    return [
      {
        label: '공식명',
        left: left?.official.name_ko_official ?? '—',
        right: right?.official.name_ko_official ?? '—',
      },
      {
        label: '챕터 / 범위',
        left: left ? `${left.official.chapter_title} (${left.official.chapter_range})` : '—',
        right: right ? `${right.official.chapter_title} (${right.official.chapter_range})` : '—',
      },
      {
        label: '상위 코드',
        left: formatValue(left?.official.parent_code),
        right: formatValue(right?.official.parent_code),
      },
      {
        label: '포함',
        left: formatJoined(left?.official.includes_official),
        right: formatJoined(right?.official.includes_official),
      },
      {
        label: '제외',
        left: formatJoined(left?.official.excludes_official),
        right: formatJoined(right?.official.excludes_official),
      },
      {
        label: '주',
        left: formatJoined(left?.official.notes_official),
        right: formatJoined(right?.official.notes_official),
      },
      {
        label: '하위 코드 수',
        left: leftRelations ? String(leftRelations.children.length) : '—',
        right: rightRelations ? String(rightRelations.children.length) : '—',
      },
      {
        label: '정의',
        left: formatValue(left?.enrichment?.definition),
        right: formatValue(right?.enrichment?.definition),
      },
      {
        label: '환자 설명',
        left: formatValue(left?.enrichment?.patient_friendly_summary),
        right: formatValue(right?.enrichment?.patient_friendly_summary),
      },
      {
        label: '보험 정보',
        left: formatValue(left?.enrichment?.insurance?.source_title),
        right: formatValue(right?.enrichment?.insurance?.source_title),
      },
    ]
  }, [left, right])

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">코드 비교</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              공식 분류 필드를 항상 비교하고, 검증된 보강 데이터가 있으면 해당 항목만 추가로 나란히 보여줍니다.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
            onClick={() => handlePrint()}
          >
            비교 인쇄
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <SearchCombobox
            initialQuery={leftCode ?? ''}
            navigateOnSelect={false}
            onSelectCode={(code) => updateCode('left', code)}
          />
          <SearchCombobox
            initialQuery={rightCode ?? ''}
            navigateOnSelect={false}
            onSelectCode={(code) => updateCode('right', code)}
          />
        </div>
      </section>
      <div ref={printableRef} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {[left, right].map((item, index) => (
          <section
            key={index}
            className="panel p-6"
          >
            {item ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={item.official.scope === 'primary-k00-k14' ? 'blue' : 'slate'}>
                    {scopeLabel(item.official.scope)}
                  </StatusBadge>
                  <StatusBadge tone={item.enrichment?.provenance.status === 'verified' ? 'green' : 'blue'}>
                    {provenanceLabel(item.enrichment?.provenance.status ?? 'official-only')}
                  </StatusBadge>
                </div>
                <div className="mt-4 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{item.official.code}</div>
                <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">{item.official.name_ko_official}</h2>
              </>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">좌우 비교할 코드를 선택하세요.</p>
            )}
          </section>
        ))}
      </div>
      <section className="panel p-6">
        <div className="grid gap-3">
          {rows.map((row) => {
            const changed = row.left !== row.right
            return (
              <div
                key={row.label}
                className={`grid gap-3 rounded-2xl border p-4 md:grid-cols-[180px_1fr_1fr] ${
                  changed
                    ? 'border-sky-200 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/20'
                    : 'border-slate-200/70 dark:border-slate-800'
                }`}
              >
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{row.label}</div>
                <div className="text-sm text-slate-700 dark:text-slate-200">{row.left}</div>
                <div className="text-sm text-slate-700 dark:text-slate-200">{row.right}</div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}