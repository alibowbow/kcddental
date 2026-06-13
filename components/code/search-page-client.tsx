'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { SearchCombobox } from '@/components/ui/search-combobox'
import { StatusBadge } from '@/components/ui/status-badge'
import { getDiseaseViewModel } from '@/lib/getters'
import { codeRoute, provenanceLabel, scopeLabel } from '@/lib/format'
import { searchOfficialEntries } from '@/lib/search'

const scopeOptions = [
  { value: 'all', label: 'All' },
  { value: 'primary', label: 'Primary' },
  { value: 'supplemental', label: 'Supplemental' },
] as const

const provenanceOptions = [
  { value: 'all', label: 'All' },
  { value: 'official-only', label: 'Official only' },
  { value: 'verified', label: 'Verified' },
] as const

export function SearchPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') ?? ''
  const scope = (searchParams.get('scope') as 'all' | 'primary' | 'supplemental' | null) ?? 'all'
  const provenance = (searchParams.get('provenance') as 'all' | 'official-only' | 'verified' | null) ?? 'all'

  const results = useMemo(
    () =>
      searchOfficialEntries(query, { scope, provenance })
        .map((item) => getDiseaseViewModel(item.code))
        .filter(Boolean),
    [provenance, query, scope],
  )

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    const next = params.toString()
    router.replace(next ? `/search?${next}` : '/search')
  }

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">검색</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          정적 데이터에서 코드, 공식명, 포함/제외/주석, 검증된 동의어를 클라이언트 측 검색으로 조회합니다.
        </p>
        <div className="mt-5">
          <SearchCombobox
            initialQuery={query}
            searchPageFallback="/search"
            navigateOnSelect={false}
            onQueryChange={(nextQuery) => updateParams({ q: nextQuery.trim() || null })}
            onSelectCode={(code) => router.push(codeRoute(code))}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {scopeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateParams({ scope: option.value === 'all' ? null : option.value })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                scope === option.value ? 'bg-brand-primary text-white' : 'border border-slate-300 dark:border-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
          {provenanceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateParams({ provenance: option.value === 'all' ? null : option.value })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                provenance === option.value
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'border border-slate-300 dark:border-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">검색 결과 {results.length}건</p>
        {!query.trim() ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">검색어를 입력하면 결과가 표시됩니다.</p>
        ) : null}
        {query.trim() && !results.length ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">일치하는 공식 코드가 없습니다.</p>
        ) : null}
        {results.map((viewModel) => {
          const item = viewModel!
          return (
            <Link
              key={item.official.code}
              href={codeRoute(item.official.code)}
              className="block rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{item.official.code}</div>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.official.name_ko_official}</h2>
                  {item.enrichment?.name_en ? (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.enrichment.name_en}</p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <StatusBadge tone={item.official.scope === 'primary-k00-k14' ? 'blue' : 'slate'}>
                    {scopeLabel(item.official.scope)}
                  </StatusBadge>
                  <StatusBadge tone={item.enrichment?.provenance.status === 'verified' ? 'green' : 'blue'}>
                    {provenanceLabel(item.enrichment?.provenance.status ?? 'official-only')}
                  </StatusBadge>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}