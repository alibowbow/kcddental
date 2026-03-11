import Link from 'next/link'

import { LocalStats } from '@/components/ui/local-stats'
import { SearchCombobox } from '@/components/ui/search-combobox'
import { StatusBadge } from '@/components/ui/status-badge'
import { getCategoryEntries, getChangeEntries, getPrimaryCategories, getSupplementalClusters } from '@/lib/getters'
import { claimRoute, flowchartRoute, printRoute } from '@/lib/format'

export default function HomePage() {
  const categories = getPrimaryCategories()
  const supplementalClusters = getSupplementalClusters()
  const hasChanges = getChangeEntries().length > 0

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200/70 bg-white/88 p-6 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-950/72 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">KCD Dental Reference</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              치과 KCD 원문 중심
              <br />
              분류·검색·비교 플랫폼
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              K00-K14를 주요 정보구조로 두고, legacy 원문에 포함된 외상·선천기형·보철·장치 관련 보조 코드를 함께
              보존합니다.
            </p>
            <div className="mt-6 max-w-3xl">
              <SearchCombobox
                className="w-full"
                inputClassName="w-full rounded-[1.75rem] border border-slate-300/80 bg-white/90 px-5 py-4 text-base shadow-sm dark:border-slate-700 dark:bg-slate-950/70"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <QuickCard title="Compare" href="/compare" description="두 코드를 나란히 비교합니다." />
            <QuickCard title="Claim" href="/claim" description="검증된 청구 근거가 있는지 확인합니다." />
            <QuickCard title="Quiz" href="/quiz" description="공식 코드와 공식명 기반으로 학습합니다." />
            <QuickCard title="Diff" href="/diff" description="검증된 변경 이력이 있을 때만 표시합니다." />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">K00-K14</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-50">주요 분류 브라우저</h2>
          </div>
          <StatusBadge tone="blue">Main IA</StatusBadge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((entry) => {
            const descendants = getCategoryEntries(entry.code.toLowerCase()).filter((candidate) => candidate.code !== entry.code).length
            return (
              <Link
                key={entry.code}
                href={`/category/${entry.code.toLowerCase()}`}
                className="group rounded-3xl border border-slate-200/70 bg-white/88 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-panel dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{entry.code}</div>
                <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-slate-50">{entry.name_ko_official}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">공식 분류명 기준의 하위 코드를 탐색합니다.</p>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  하위 코드 {descendants}개
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <LocalStats />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Supplemental</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-50">보존된 보조 코드 진입점</h2>
          </div>
          <StatusBadge tone="slate">Searchable & routable</StatusBadge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {supplementalClusters.map((cluster) => (
            <article key={cluster.slug} className="rounded-3xl border border-slate-200/70 bg-white/88 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
              <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">{cluster.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{cluster.description}</p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                코드 {cluster.entries.length}개
              </div>
            </article>
          ))}
        </div>
      </section>

      {hasChanges ? (
        <section className="rounded-3xl border border-slate-200/70 bg-white/88 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">최근 추가 / 변경</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">검증된 changelog 데이터가 있을 때만 표시됩니다.</p>
            </div>
            <Link href="/diff" className="text-sm font-semibold text-brand-primary hover:underline">
              diff 보기
            </Link>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <UtilityCard
          title="Claim detail"
          href={claimRoute('K02')}
          description="공식 코드 정보와 검증된 청구 근거 유무를 확인합니다."
        />
        <UtilityCard
          title="Flowchart shell"
          href={flowchartRoute('K02')}
          description="검증 전에는 교육용 빈 상태를 명확히 보여줍니다."
        />
        <UtilityCard title="Print view" href={printRoute('K02')} description="A4 인쇄에 맞춘 요약 페이지를 제공합니다." />
      </section>
    </div>
  )
}

function QuickCard({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-4 transition hover:border-brand-accent hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
    >
      <p className="text-sm font-bold text-slate-950 dark:text-slate-50">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </Link>
  )
}

function UtilityCard({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-slate-200/70 bg-white/88 p-5 shadow-sm transition hover:border-brand-accent dark:border-slate-800 dark:bg-slate-950/70"
    >
      <h3 className="text-xl font-bold text-slate-950 dark:text-slate-50">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </Link>
  )
}