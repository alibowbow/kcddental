import Link from 'next/link'

import { getOutboundLinks } from '@/lib/external'
import type { DiseaseViewModel } from '@/lib/types'

import { StatusBadge } from '../ui/status-badge'

export function OutboundLinks({ viewModel }: { viewModel: DiseaseViewModel }) {
  const references = viewModel.enrichment?.external?.references ?? []

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">외부 탐색</h3>
        <StatusBadge tone="slate">Outbound only</StatusBadge>
      </div>

      {references.length ? (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">검증 참고 링크</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {references.map((reference) => (
              <li key={`${reference.url}-${reference.title}`}>
                <Link href={reference.url} target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">
                  {reference.title}
                </Link>
                <span className="ml-2 text-slate-500 dark:text-slate-400">
                  {reference.type}
                  {reference.year ? ` / ${reference.year}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">검색 링크</h4>
        <ul className="mt-3 space-y-2 text-sm">
          {getOutboundLinks(viewModel).map((link) => (
            <li key={link.url}>
              <Link href={link.url} target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}