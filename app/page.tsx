import Link from 'next/link'

import { LocalStats } from '@/components/ui/local-stats'
import { SearchCombobox } from '@/components/ui/search-combobox'
import { Icon, accentStyles, type IconName } from '@/components/ui/icon'
import {
  getCategoryEntries,
  getContentCoverage,
  getPrimaryCategories,
  getSupplementalClusters,
} from '@/lib/getters'
import { getCategoryPresentation } from '@/lib/data/category-presentation'

const FEATURES: Array<{ title: string; href: string; description: string; icon: IconName }> = [
  { title: '비교', href: '/compare', description: '두 코드를 나란히 펼쳐 포함·제외·주석을 한눈에 대조합니다.', icon: 'compare' },
  { title: '청구', href: '/claim', description: '검증된 HIRA/NHIS 근거가 있는 코드만 청구 정보를 표시합니다.', icon: 'claim' },
  { title: '퀴즈', href: '/quiz', description: '공식 코드와 공식명으로 분류 감각을 빠르게 훈련합니다.', icon: 'quiz' },
  { title: '변경 이력', href: '/diff', description: '검증된 changelog가 확보된 경우에만 차이를 보여줍니다.', icon: 'diff' },
]

export default function HomePage() {
  const categories = getPrimaryCategories()
  const supplementalClusters = getSupplementalClusters()
  const coverage = getContentCoverage()

  const stats = [
    { label: '공식 코드', value: coverage.officialCodes.toLocaleString() },
    { label: '주요 분류', value: `${coverage.primaryCategories}` },
    { label: '분류 흐름도', value: `${coverage.flowcharts}` },
    { label: '검증 보강', value: `${coverage.verifiedEnrichment}` },
  ]

  return (
    <div className="space-y-12">
      <section className="animate-rise panel overflow-hidden p-6 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <span className="pill bg-brand-primary/10 text-brand-primary">
              <Icon name="shield" size={14} />
              공식 원문 중심 · 출처 분리
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
              치과 KCD를
              <br />
              <span className="bg-brand-sheen bg-clip-text text-transparent">가장 빠르게</span> 찾는 곳
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              K00–K14 주요 분류와 외상·선천기형·보철 보조 코드를 원문 그대로 보존하고, 검색·비교·학습·인쇄를 한 화면에서
              제공합니다. 일상어로도 코드를 찾을 수 있습니다.
            </p>
            <div className="mt-7">
              <SearchCombobox
                className="w-full max-w-2xl"
                placeholder="충치, 사랑니, 잇몸병, K02… 무엇이든 검색"
                inputClassName="w-full rounded-2xl border bg-white/90 px-5 py-4 text-base shadow-glow dark:bg-slate-950/70"
              />
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">바로 검색:</span>
                {['충치', '사랑니', '잇몸병', '신경치료', '부정교합'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border px-2.5 py-0.5 font-medium hover:border-brand-accent hover:text-brand-primary"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="panel-tight p-5">
                <div className="text-3xl font-black text-brand-primary dark:text-sky-300">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading eyebrow="K00–K14" title="주요 분류 브라우저" caption="카테고리별 하위 코드와 분류 흐름도로 바로 이동합니다." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((entry) => {
            const presentation = getCategoryPresentation(entry.code)
            const accent = accentStyles(presentation?.accent ?? 'sky')
            const descendants = getCategoryEntries(entry.code.toLowerCase()).filter(
              (candidate) => candidate.code !== entry.code,
            ).length
            return (
              <Link
                key={entry.code}
                href={`/category/${entry.code.toLowerCase()}`}
                className={`group panel hover-lift border p-5 ${accent.ring}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.soft} ${accent.text}`}>
                    <Icon name={(presentation?.icon as IconName) ?? 'tooth'} size={24} />
                  </span>
                  <div className="min-w-0">
                    <div className="code-font text-xs font-bold tracking-wider text-brand-primary dark:text-sky-300">
                      {entry.code}
                    </div>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-slate-950 dark:text-slate-50">
                      {entry.name_ko_official}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {presentation?.description ?? '공식 분류명 기준의 하위 코드를 탐색합니다.'}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>하위 코드 {descendants}개</span>
                  <span className="flex items-center gap-1 text-brand-primary opacity-0 transition group-hover:opacity-100">
                    살펴보기 <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading eyebrow="Tools" title="작업 도구" caption="검색에서 비교·청구·학습까지 한 흐름으로 이어집니다." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <Link key={feature.href} href={feature.href} className="group panel hover-lift p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                <Icon name={feature.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-slate-50">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <LocalStats />

      <section className="space-y-5">
        <SectionHeading eyebrow="Supplemental" title="보존된 보조 코드" caption="외상·선천기형·TMJ·보철 관련 코드도 검색과 라우팅이 가능합니다." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {supplementalClusters.map((cluster) => (
            <article key={cluster.slug} className="panel p-5">
              <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50">{cluster.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{cluster.description}</p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                코드 {cluster.entries.length}개
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function SectionHeading({ eyebrow, title, caption }: { eyebrow: string; title: string; caption: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50 md:text-3xl">{title}</h2>
      </div>
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{caption}</p>
    </div>
  )
}
