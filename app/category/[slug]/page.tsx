import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { HierarchyTree } from '@/components/code/hierarchy-tree'
import { SearchCombobox } from '@/components/ui/search-combobox'
import { StatusBadge } from '@/components/ui/status-badge'
import { absoluteSiteUrl, codeRoute } from '@/lib/format'
import { getCategoryBySlug, getCategoryEntries, getOfficialEntry, getPrimaryCategories } from '@/lib/getters'

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

  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="print-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tree</p>
        <h2 className="mt-2 text-lg font-bold text-slate-950 dark:text-slate-50">K00-K14 네비게이션</h2>
        <div className="mt-4 max-h-[70vh] overflow-auto pr-2">
          <HierarchyTree roots={getPrimaryCategories()} activeCode={root.code} />
        </div>
      </aside>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="blue">Category</StatusBadge>
            <StatusBadge tone="slate">공식원문</StatusBadge>
          </div>
          <div className="mt-4 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{root.code}</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-50">{root.name_ko_official}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            하위 코드 {descendants.length}개가 정적 생성으로 제공됩니다.
          </p>
          <div className="mt-5 max-w-2xl">
            <SearchCombobox allowedCodes={allowedCodes} searchPageFallback="/search" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
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
          {entries.map((entry) => (
            <Link
              key={entry.code}
              href={codeRoute(entry.code)}
              className="block rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm hover:border-brand-accent dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{entry.code}</div>
              <div className="mt-1 text-lg font-semibold text-slate-950 dark:text-slate-50">{entry.name_ko_official}</div>
            </Link>
          ))}
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