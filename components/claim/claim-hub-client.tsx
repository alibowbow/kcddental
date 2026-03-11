'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { SearchCombobox } from '@/components/ui/search-combobox'
import { EmptyState } from '@/components/ui/empty-state'
import { officialKcdData } from '@/lib/data/official-kcd'
import { claimRoute } from '@/lib/format'
import { getClaimEntries } from '@/lib/getters'

export function ClaimHubClient() {
  const [query, setQuery] = useState('')
  const matches = useMemo(
    () =>
      officialKcdData
        .filter(
          (entry) =>
            !query.trim() || entry.code.toLowerCase().includes(query.toLowerCase()) || entry.name_ko_official.includes(query),
        )
        .slice(0, 20),
    [query],
  )

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">보험 청구 허브</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          공식 KCD 코드와 검증된 청구 근거를 분리해 보여줍니다. 검증된 급여 자료가 없으면 빈 상태를 명확히 표시합니다.
        </p>
        <div className="mt-5">
          <SearchCombobox
            initialQuery={query}
            onQueryChange={setQuery}
            navigateOnSelect={false}
            onSelectCode={setQuery}
            searchPageFallback="/claim"
          />
        </div>
      </section>
      <EmptyState
        title="검증된 청구 데이터는 아직 적습니다"
        description="현재 저장소에는 검증 완료된 급여·청구 rule dataset이 포함되어 있지 않습니다. claim detail 페이지에서는 공식 코드 정보와 source-needed 상태를 먼저 확인할 수 있습니다."
        badge="준비중"
      />
      <section className="grid gap-3">
        {matches.map((entry) => {
          const claimCount = getClaimEntries(entry.code).length
          return (
            <Link
              key={entry.code}
              href={claimRoute(entry.code)}
              className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{entry.code}</div>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{entry.name_ko_official}</h2>
                </div>
                <span className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-semibold dark:border-slate-700">
                  검증 청구 {claimCount}건
                </span>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}