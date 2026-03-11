import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { flowchartData } from '@/lib/data/flowcharts'
import { absoluteSiteUrl, codeRoute, provenanceLabel } from '@/lib/format'
import { getDiseaseViewModel, getFlowchart } from '@/lib/getters'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(flowchartData).map((code) => ({ code }))
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)
  if (!viewModel) {
    return {}
  }
  return {
    title: `${viewModel.official.name_ko_official} (${viewModel.official.code}) — 교육용 흐름도`,
    alternates: { canonical: absoluteSiteUrl(`/flowchart/${encodeURIComponent(code)}`) },
  }
}

export default async function FlowchartPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)
  const flowchart = getFlowchart(code)

  if (!viewModel || !flowchart) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={flowchart.status === 'verified' ? 'green' : 'amber'}>
            {provenanceLabel(flowchart.status === 'verified' ? 'verified' : 'pending')}
          </StatusBadge>
          <StatusBadge tone="slate">교육용 참고</StatusBadge>
        </div>
        <div className="mt-4 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{viewModel.official.code}</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-50">{flowchart.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{flowchart.note}</p>
      </section>
      {flowchart.nodes.length ? (
        <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
          흐름도 노드 렌더링은 verified dataset이 추가되면 활성화됩니다.
        </section>
      ) : (
        <EmptyState
          title="흐름도 데이터 없음"
          description="권위 있어 보이는 임상 경로는 임의로 생성하지 않습니다. 검증된 로컬 flowchart 데이터가 준비되면 이 페이지를 활성화합니다."
        />
      )}
      <Link href={codeRoute(code)} className="inline-flex text-sm font-semibold text-brand-primary hover:underline">
        상세 페이지로 이동
      </Link>
    </div>
  )
}