import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { Icon, accentStyles, type IconName } from '@/components/ui/icon'
import { flowchartData } from '@/lib/data/flowcharts'
import { getCategoryPresentation } from '@/lib/data/category-presentation'
import { absoluteSiteUrl, codeRoute, provenanceLabel } from '@/lib/format'
import { getDiseaseViewModel, getFlowchart } from '@/lib/getters'
import type { FlowchartNode } from '@/lib/types'

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

interface TreeNode {
  node: FlowchartNode
  children: TreeNode[]
}

export default async function FlowchartPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)
  const flowchart = getFlowchart(code)

  if (!viewModel || !flowchart) {
    notFound()
  }

  const presentation = getCategoryPresentation(viewModel.official.code)
  const accent = accentStyles(presentation?.accent ?? 'sky')

  const nodeMap = new Map(flowchart.nodes.map((node) => [node.id, node]))
  const childIds = new Set(flowchart.edges.map((edge) => edge.to))
  const adjacency = new Map<string, string[]>()
  for (const edge of flowchart.edges) {
    adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge.to])
  }

  const rootIds = flowchart.nodes.map((node) => node.id).filter((id) => !childIds.has(id))
  const visited = new Set<string>()

  function build(id: string): TreeNode | null {
    const node = nodeMap.get(id)
    if (!node || visited.has(id)) {
      return null
    }
    visited.add(id)
    const children = (adjacency.get(id) ?? [])
      .map((childId) => build(childId))
      .filter((child): child is TreeNode => Boolean(child))
    return { node, children }
  }

  const tree = rootIds.map((id) => build(id)).filter((item): item is TreeNode => Boolean(item))

  return (
    <div className="space-y-6">
      <section className="animate-rise panel p-6 md:p-8">
        <div className="flex flex-wrap items-start gap-5">
          <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl ${accent.soft} ${accent.text}`}>
            <Icon name={(presentation?.icon as IconName) ?? 'flow'} size={28} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={flowchart.status === 'verified' ? 'green' : 'amber'}>
                {provenanceLabel(flowchart.status === 'verified' ? 'verified' : 'pending')}
              </StatusBadge>
              <StatusBadge tone="slate">교육용 참고</StatusBadge>
            </div>
            <div className="mt-3 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{viewModel.official.code}</div>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-slate-50">{flowchart.title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{flowchart.note}</p>
          </div>
        </div>
      </section>

      {flowchart.nodes.length ? (
        <section className="panel p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">분류 트리</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                각 노드를 눌러 해당 코드 상세 페이지로 이동합니다.
              </p>
            </div>
            <StatusBadge tone="blue">노드 {flowchart.nodes.length}</StatusBadge>
          </div>
          <div className="mt-6 space-y-2">
            {tree.map((branch) => (
              <TreeBranch key={branch.node.id} branch={branch} depth={0} accentText={accent.text} accentSoft={accent.soft} />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState
          title="아직 연결된 흐름 데이터가 없습니다"
          description="공식 분류와 검증된 설명을 바탕으로 교육용 흐름도를 준비 중입니다."
        />
      )}

      <Link href={codeRoute(code)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline">
        <Icon name="arrow-right" size={14} className="rotate-180" /> 질병 상세 페이지로 돌아가기
      </Link>
    </div>
  )
}

function TreeBranch({
  branch,
  depth,
  accentText,
  accentSoft,
}: {
  branch: TreeNode
  depth: number
  accentText: string
  accentSoft: string
}) {
  const { node, children } = branch
  const isRoot = depth === 0
  const card = (
    <div
      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition ${
        isRoot ? `${accentSoft} border-transparent` : 'bg-white/70 hover:border-brand-accent dark:bg-slate-900/50'
      }`}
    >
      <p className={`text-sm font-semibold ${isRoot ? accentText : 'text-slate-800 dark:text-slate-100'}`}>{node.label}</p>
      {node.targetCode ? (
        <span className="code-font shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-brand-primary dark:bg-slate-950/60 dark:text-sky-300">
          {node.targetCode}
        </span>
      ) : null}
    </div>
  )

  return (
    <div className={depth > 0 ? 'ml-4 border-l border-dashed pl-4 md:ml-6 md:pl-6' : ''}>
      {node.targetCode ? (
        <Link href={codeRoute(node.targetCode)} className="block">
          {card}
        </Link>
      ) : (
        card
      )}
      {children.length ? (
        <div className="mt-2 space-y-2">
          {children.map((child) => (
            <TreeBranch
              key={child.node.id}
              branch={child}
              depth={depth + 1}
              accentText={accentText}
              accentSoft={accentSoft}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
