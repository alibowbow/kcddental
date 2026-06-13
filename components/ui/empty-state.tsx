import type { ReactNode } from 'react'

import { StatusBadge } from './status-badge'

export function EmptyState({
  title,
  description,
  badge = '준비중',
  compact = false,
  children,
}: {
  title: string
  description: string
  badge?: string
  compact?: boolean
  children?: ReactNode
}) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed bg-white/50 px-4 py-3 dark:bg-slate-950/30">
        <StatusBadge tone="amber">{badge}</StatusBadge>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-slate-100">{title}</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
          {description}
        </p>
        {children ? <div className="ml-auto">{children}</div> : null}
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950/40">
      <div className="flex items-center gap-3">
        <StatusBadge tone="amber">{badge}</StatusBadge>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  )
}