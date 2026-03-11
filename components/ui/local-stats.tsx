'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { analyticsUpdateEventName, readAnalyticsState } from '@/lib/analytics'
import { officialKcdMap } from '@/lib/data/official-kcd'
import { codeRoute } from '@/lib/format'

import { StatusBadge } from './status-badge'

export function LocalStats() {
  const [state, setState] = useState(readAnalyticsState())

  useEffect(() => {
    const refresh = () => setState(readAnalyticsState())
    refresh()
    window.addEventListener(analyticsUpdateEventName(), refresh)
    return () => window.removeEventListener(analyticsUpdateEventName(), refresh)
  }, [])

  const mostViewed = useMemo(
    () =>
      Object.entries(state.viewCounts)
        .sort((left, right) => right[1] - left[1])
        .slice(0, 5),
    [state.viewCounts],
  )

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Today&apos;s local stats</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50">최근 조회, 즐겨찾기, 로컬 사용 기록</h2>
        </div>
        <StatusBadge tone="slate">localStorage</StatusBadge>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatList title="Most viewed" items={mostViewed.map(([code, count]) => `${code} · ${count}회`)} />
        <LinkedStatList title="Recent views" codes={state.recentViews} />
        <LinkedStatList title="Favorites" codes={state.favorites} />
      </div>
    </section>
  )
}

function StatList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">아직 로컬 기록이 없습니다.</p>
      )}
    </div>
  )
}

function LinkedStatList({ title, codes }: { title: string; codes: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      {codes.length ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {codes.map((code) => {
            const entry = officialKcdMap[code]
            return entry ? (
              <li key={code}>
                <Link href={codeRoute(code)} className="hover:text-brand-primary hover:underline">
                  <span className="code-font font-semibold">{code}</span> {entry.name_ko_official}
                </Link>
              </li>
            ) : null
          })}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">아직 로컬 기록이 없습니다.</p>
      )}
    </div>
  )
}