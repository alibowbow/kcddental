import Link from 'next/link'

import { codeRoute } from '@/lib/format'

export function CodeChip({ code, label }: { code: string; label: string }) {
  return (
    <Link
      href={codeRoute(code)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-brand-accent hover:text-brand-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      <span className="code-font font-semibold text-brand-primary dark:text-sky-300">{code}</span>
      <span className="truncate">{label}</span>
    </Link>
  )
}