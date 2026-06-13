import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { HierarchyTree } from '@/components/code/hierarchy-tree'
import { SearchCombobox } from '@/components/ui/search-combobox'
import { StatusBadge } from '@/components/ui/status-badge'
import { Icon, accentStyles, type IconName } from '@/components/ui/icon'
import { absoluteSiteUrl, codeRoute, flowchartRoute } from '@/lib/format'
import { getCategoryPresentation } from '@/lib/data/category-presentation'
import { getCategoryBySlug, getCategoryEntries, getFlowchart, getOfficialEntry, getPrimaryCategories } from '@/lib/getters'

export const dynamicParams = false

export function generateStaticParams() {
  return getPrimaryCategories().map((entry) => ({ slug: entry.code.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  const entry = category ? getOfficialEntry(category.code) : null

  if (!category || !entry) {
    return {}
  }

  return {
    title: `${entry.name_ko_official} (${entry.code}) — KCD 치과 카테고리`,
    alternates: { canonical: absoluteSiteUrl(`/category/${slug}`) },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  const root = category ? getOfficialEntry(category.code) : null

  if (!category || !root) {
    notFound()
  }

  const entries = getCategoryEntries(slug)
  const allowedCodes = entries.map((entry) => entry.code)
  const descendants = entries.filter((entry) => entry.code !== root.code)
  const presentation = getCategoryPresentation(root.code)
  const accent = accentStyles(presentation?.accent ?? 'sky')
  const hasFlowchart = Boolean(getFlowchart(root.code))

  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="print-hidden hidden rounded-3xl border bg-white/85 p-5 shadow-panel dark:bg-slate-950/70 xl:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tree</p>
        <h2 className="mt-2 text-lg font-bold text-slate-950 dark:text-slate-50">K00-K14 네비게이션</h2>
        <div className="mt-4 max-h-[70vh] overflow-auto pr-2">
          <HierarchyTree roots={getPrimaryCategories()} activeCode={root.code} />
        </div>
      </aside>
      <div className="space-y-6">
        <section className="animate-rise panel overflow-hidden p-6 md:p-8">
          <div className="flex flex-wrap items-start gap-5">
            <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${accent.soft} ${accent.text}`}>
              <Icon name={(presentation?.icon as IconName) ?? 'tooth'} size={32} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone="blue">Category</StatusBadge>
                <StatusBadge tone="slate">공식원문</StatusBadge>
              </div>
              <div className="mt-3 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{root.code}</div>
              <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-slate-50">{root.name_ko_official}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {presentation?.description ?? '공식 분류명 기준의 하위 코드입니다.'} 하위 코드 {descendants.length}개가 정적 생성으로 제공됩니다.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="max-w-xl flex-1">
              <SearchCombobox allowedCodes={allowedCodes} searchPageFallback="/search" />
            </div>
            {hasFlowchart ? (
              <Link
                href={flowchartRoute(root.code)}
                className="flex items-center gap-1.5 rounded-full border border-brand-accent px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
              >
                <Icon name="flow" size={16} /> 분류 흐름도
              </Link>
            ) : null}
          </div>
        </section>

        <section className="panel p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">관련 공식 메모</h2>
            <StatusBadge tone="slate">공식원문</StatusBadge>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <MetaColumn title="포함" items={root.includes_official} />
            <MetaColumn title="제외" items={root.excludes_official} />
            <MetaColumn title="주" items={root.notes_official} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">하위 코드 목록</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {entries.map((entry) => (
              <Link
                key={entry.code}
                href={codeRoute(entry.code)}
                className="group flex items-center justify-between gap-3 rounded-2xl border bg-white/85 p-4 shadow-sm hover-lift hover:border-brand-accent dark:bg-slate-950/70"
              >
                <div className="min-w-0">
                  <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{entry.code}</div>
                  <div className="mt-1 font-semibold text-slate-950 dark:text-slate-50">{entry.name_ko_official}</div>
                </div>
                <Icon name="arrow-right" size={16} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand-primary" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function MetaColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">표시할 공식 {title} 항목이 없습니다.</p>
      )}
    </div>
  )
}