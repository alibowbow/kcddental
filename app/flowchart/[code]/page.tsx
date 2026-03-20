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
    title: `${viewModel.official.name_ko_official} (${viewModel.official.code}) | 교육용 분류 흐름`,
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

  const nodeMap = new Map(flowchart.nodes.map((node) => [node.id, node]))
  const connections = flowchart.edges
    .map((edge) => ({
      from: nodeMap.get(edge.from),
      to: nodeMap.get(edge.to),
    }))
    .filter((item): item is { from: NonNullable<typeof item.from>; to: NonNullable<typeof item.to> } => Boolean(item.from && item.to))

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
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          이 페이지는 진단이나 처치 결정을 대신하는 임상 알고리즘이 아니라, 관련 KCD 코드가 어떤 갈래로 나뉘는지 빠르게 이해하기 위한
          분류 지도입니다.
        </p>
      </section>

      {flowchart.nodes.length ? (
        <>
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">핵심 노드</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  각 카드를 눌러 해당 코드 상세 페이지로 바로 이동할 수 있습니다.
                </p>
              </div>
              <StatusBadge tone="blue">Node {flowchart.nodes.length}</StatusBadge>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {flowchart.nodes.map((node) => {
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{node.label}</p>
                      {node.targetCode ? (
                        <span className="code-font rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-brand-primary dark:bg-sky-950/40 dark:text-sky-200">
                          {node.targetCode}
                        </span>
                      ) : null}
                    </div>
                  </>
                )

                if (node.targetCode) {
                  return (
                    <Link
                      key={node.id}
                      href={codeRoute(node.targetCode)}
                      className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 transition hover:border-brand-accent hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
                    >
                      {content}
                    </Link>
                  )
                }

                return (
                  <article key={node.id} className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    {content}
                  </article>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">연결 흐름</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">대표적인 교육용 분기만 간단히 보여줍니다.</p>
              </div>
              <StatusBadge tone="slate">Edge {connections.length}</StatusBadge>
            </div>
            <div className="mt-5 space-y-3">
              {connections.map((connection) => (
                <article
                  key={`${connection.from.id}-${connection.to.id}`}
                  className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <FlowNodeLink node={connection.from} />
                    <div className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">to</div>
                    <FlowNodeLink node={connection.to} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <EmptyState
          title="아직 연결된 흐름 데이터가 없습니다"
          description="공식 분류와 검증된 설명을 바탕으로 교육용 흐름도를 준비 중입니다."
        />
      )}

      <Link href={codeRoute(code)} className="inline-flex text-sm font-semibold text-brand-primary hover:underline">
        질병 상세 페이지로 돌아가기
      </Link>
    </div>
  )
}

function FlowNodeLink({ node }: { node: { label: string; targetCode?: string | null } }) {
  if (!node.targetCode) {
    return <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{node.label}</p>
  }

  return (
    <Link href={codeRoute(node.targetCode)} className="text-sm font-semibold text-brand-primary hover:underline">
      {node.label}
    </Link>
  )
}
