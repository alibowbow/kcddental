import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StatusBadge } from '@/components/ui/status-badge'
import { officialKcdData } from '@/lib/data/official-kcd'
import { absoluteSiteUrl, provenanceLabel } from '@/lib/format'
import { getClaimEntries, getDiseaseViewModel } from '@/lib/getters'

export const dynamicParams = false

export function generateStaticParams() {
  return officialKcdData.map((entry) => ({ code: entry.code }))
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)
  if (!viewModel) {
    return {}
  }
  return {
    title: `${viewModel.official.name_ko_official} (${viewModel.official.code}) — 인쇄 요약`,
    alternates: { canonical: absoluteSiteUrl(`/print/${encodeURIComponent(code)}`) },
  }
}

export default async function PrintPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)

  if (!viewModel) {
    notFound()
  }

  const claims = getClaimEntries(code)
  const enrichmentStatus = viewModel.enrichment?.provenance.status ?? 'official-only'
  const treatmentSummary = viewModel.enrichment?.treatment?.map((item) => item.description).join(' / ')
  const preventionSummary = viewModel.enrichment?.prevention?.join(' / ')

  return (
    <div className="print-shell mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-6 text-slate-900 shadow-panel">
      <section className="print-card space-y-4 rounded-3xl border border-slate-200 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="blue">공식원문</StatusBadge>
          <StatusBadge tone={enrichmentStatus === 'verified' ? 'green' : enrichmentStatus === 'pending' ? 'amber' : 'blue'}>
            {provenanceLabel(enrichmentStatus)}
          </StatusBadge>
        </div>
        <div className="code-font text-sm font-semibold text-brand-primary">{viewModel.official.code}</div>
        <h1 className="text-3xl font-bold">{viewModel.official.name_ko_official}</h1>
        <p className="text-sm text-slate-600">
          {viewModel.official.chapter_title} ({viewModel.official.chapter_range})
        </p>
      </section>

      <section className="print-card rounded-3xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold">공식 분류 요약</h2>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-sm">
          {viewModel.official.raw_block.join('\n')}
        </pre>
      </section>

      <section className="print-card rounded-3xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold">치료 / 예방 요약</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {treatmentSummary || preventionSummary || '검증된 치료·예방 데이터 없음'}
        </p>
      </section>

      <section className="print-card rounded-3xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold">보험 청구 요약</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {claims.length ? `${claims.length}개의 검증 청구 항목` : '검증된 청구 데이터 없음'}
        </p>
      </section>
    </div>
  )
}