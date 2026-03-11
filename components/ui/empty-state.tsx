import type { ReactNode } from 'react'

import { StatusBadge } from './status-badge'

export function EmptyState({
  title,
  description,
  badge = '준비중',
  children,
}: {
  title: string
  description: string
  badge?: string
  children?: ReactNode
}) {
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