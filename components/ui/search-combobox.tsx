'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { getDiseaseViewModel } from '@/lib/getters'
import { codeRoute, provenanceLabel, scopeLabel } from '@/lib/format'
import { suggestOfficialEntries } from '@/lib/search'

import { StatusBadge } from './status-badge'

interface SearchComboboxProps {
  initialQuery?: string
  placeholder?: string
  allowedCodes?: string[] | null
  className?: string
  inputClassName?: string
  navigateOnSelect?: boolean
  onSelectCode?: (code: string) => void
  onQueryChange?: (query: string) => void
  searchPageFallback?: string
}

export function SearchCombobox({
  initialQuery = '',
  placeholder = '코드, 공식명, 포함/제외/주석 검색',
  allowedCodes = null,
  className,
  inputClassName,
  navigateOnSelect = true,
  onSelectCode,
  onQueryChange,
  searchPageFallback = '/search',
}: SearchComboboxProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery)
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [])

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    return suggestOfficialEntries(query, { allowedCodes })
      .map((result) => getDiseaseViewModel(result.code))
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
  }, [allowedCodes, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const commitSelection = (code: string) => {
    setQuery(code)
    onSelectCode?.(code)
    setOpen(false)
    if (navigateOnSelect && pathname !== codeRoute(code)) {
      router.push(codeRoute(code))
    }
  }

  return (
    <div ref={containerRef} className={className}>
      <div className="relative">
        <input
          aria-label="KCD 코드 검색"
          role="combobox"
          aria-expanded={open}
          aria-controls="kcd-search-results"
          value={query}
          placeholder={placeholder}
          className={
            inputClassName ??
            'w-full rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/70'
          }
          onChange={(event) => {
            const nextQuery = event.target.value
            setQuery(nextQuery)
            onQueryChange?.(nextQuery)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
              setActiveIndex((current) => Math.min(current + 1, Math.max(suggestions.length - 1, 0)))
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActiveIndex((current) => Math.max(current - 1, 0))
            }
            if (event.key === 'Enter') {
              event.preventDefault()
              const target = suggestions[activeIndex]
              if (target) {
                commitSelection(target.official.code)
              } else if (query.trim()) {
                router.push(`${searchPageFallback}?q=${encodeURIComponent(query.trim())}`)
                setOpen(false)
              }
            }
            if (event.key === 'Escape') {
              setOpen(false)
            }
          }}
        />
        {query.trim() ? (
          <Link
            href={`${searchPageFallback}?q=${encodeURIComponent(query.trim())}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white"
          >
            검색
          </Link>
        ) : null}
      </div>
      {open && suggestions.length > 0 ? (
        <div
          id="kcd-search-results"
          role="listbox"
          className="mt-2 overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-panel dark:border-slate-700 dark:bg-slate-950"
        >
          {suggestions.map((item, index) => (
            <button
              key={item.official.code}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              className={`flex w-full items-start justify-between gap-3 border-b border-slate-200/70 px-4 py-3 text-left last:border-b-0 dark:border-slate-800 ${
                activeIndex === index ? 'bg-sky-50 dark:bg-sky-950/40' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => commitSelection(item.official.code)}
            >
              <div>
                <div className="code-font text-xs font-semibold text-brand-primary dark:text-sky-300">
                  {item.official.code}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.official.name_ko_official}
                </div>
                {item.enrichment?.name_en ? (
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.enrichment.name_en}</div>
                ) : null}
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge tone={item.official.scope === 'primary-k00-k14' ? 'blue' : 'slate'}>
                  {scopeLabel(item.official.scope)}
                </StatusBadge>
                <StatusBadge tone={item.enrichment?.provenance.status === 'verified' ? 'green' : 'blue'}>
                  {provenanceLabel(item.enrichment?.provenance.status ?? 'official-only')}
                </StatusBadge>
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}