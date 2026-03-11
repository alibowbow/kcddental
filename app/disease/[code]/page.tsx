import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { DetailActions } from '@/components/code/detail-actions'
import { HierarchyTree } from '@/components/code/hierarchy-tree'
import { OutboundLinks } from '@/components/external/outbound-links'
import { CodeChip } from '@/components/ui/code-chip'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { officialKcdData } from '@/lib/data/official-kcd'
import {
  absoluteSiteUrl,
  claimRoute,
  codeRoute,
  flowchartRoute,
  printRoute,
  provenanceLabel,
  scopeLabel,
} from '@/lib/format'
import {
  getClaimEntries,
  getCodeRelations,
  getDiseaseViewModel,
  getDrugEntries,
  getFlowchart,
  getPrimaryCategories,
} from '@/lib/getters'
import type { OfficialKcdEntry } from '@/lib/types'

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

  const isPrimary = viewModel.official.scope === 'primary-k00-k14'
  const title = isPrimary
    ? `${viewModel.official.name_ko_official} (${viewModel.official.code}) — KCD 치과 질환 분류`
    : `${viewModel.official.name_ko_official} (${viewModel.official.code}) — KCD 치과 코드 레퍼런스`

  return {
    title,
    alternates: {
      canonical: absoluteSiteUrl(`/disease/${encodeURIComponent(code)}`),
    },
    openGraph: {
      title,
      url: absoluteSiteUrl(`/disease/${encodeURIComponent(code)}`),
    },
  }
}

export default async function DiseaseDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)

  if (!viewModel) {
    notFound()
  }

  const relations = getCodeRelations(code)
  const flowchart = getFlowchart(code)
  const drugs = getDrugEntries(code)
  const claimEntries = getClaimEntries(code)
  const sidebarRoots = officialKcdData.filter(
    (entry) => entry.chapter_range === viewModel.official.chapter_range && entry.parent_code === null,
  )
  const enrichmentStatus = viewModel.enrichment?.provenance.status ?? 'official-only'
  const hasClinicalOverview = Boolean(
    viewModel.enrichment?.definition ||
      viewModel.enrichment?.pathophysiology ||
      viewModel.enrichment?.etiology?.length ||
      viewModel.enrichment?.risk_factors?.length ||
      viewModel.enrichment?.anatomy_involved?.length ||
      viewModel.enrichment?.patient_friendly_summary,
  )
  const hasDiagnosisData = Boolean(
    viewModel.enrichment?.symptoms?.length ||
      viewModel.enrichment?.diagnostic_criteria?.length ||
      viewModel.enrichment?.differential_diagnosis?.length,
  )
  const hasTreatmentData = Boolean(
    viewModel.enrichment?.treatment?.length ||
      viewModel.enrichment?.prevention?.length ||
      viewModel.enrichment?.complications?.length ||
      viewModel.enrichment?.prognosis,
  )
  const hasClaimData = Boolean(claimEntries.length || viewModel.enrichment?.insurance)
  const structuredData =
    viewModel.official.scope === 'primary-k00-k14'
      ? {
          '@context': 'https://schema.org',
          '@type': 'MedicalCondition',
          name: viewModel.official.name_ko_official,
          code: viewModel.official.code,
          url: absoluteSiteUrl(`/disease/${encodeURIComponent(code)}`),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: viewModel.official.name_ko_official,
          termCode: viewModel.official.code,
          url: absoluteSiteUrl(`/disease/${encodeURIComponent(code)}`),
        }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_240px]">
        <aside className="print-hidden hidden rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-panel dark:border-slate-800 dark:bg-slate-950/70 xl:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tree</p>
          <div className="mt-4 max-h-[75vh] overflow-auto pr-2">
            <HierarchyTree roots={sidebarRoots.length ? sidebarRoots : getPrimaryCategories()} activeCode={code} />
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={viewModel.official.scope === 'primary-k00-k14' ? 'blue' : 'slate'}>
                {scopeLabel(viewModel.official.scope)}
              </StatusBadge>
              <StatusBadge tone={enrichmentStatus === 'verified' ? 'green' : enrichmentStatus === 'pending' ? 'amber' : 'blue'}>
                {provenanceLabel(enrichmentStatus)}
              </StatusBadge>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="code-font inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-brand-primary dark:bg-sky-950/40 dark:text-sky-200">
                  {viewModel.official.code}
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                  {viewModel.official.name_ko_official}
                </h1>
                {viewModel.enrichment?.name_en ? (
                  <h2 className="mt-2 text-lg text-slate-500 dark:text-slate-400">{viewModel.enrichment.name_en}</h2>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={printRoute(code)}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold dark:border-slate-700"
                >
                  인쇄
                </Link>
                <Link
                  href={`/compare?left=${encodeURIComponent(code)}`}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold dark:border-slate-700"
                >
                  비교
                </Link>
                <DetailActions code={code} title={viewModel.official.name_ko_official} />
              </div>
            </div>
            {viewModel.enrichment?.patient_friendly_summary ? (
              <details className="mt-5 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-slate-100">
                  환자용 쉬운 설명 보기
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {viewModel.enrichment.patient_friendly_summary}
                </p>
              </details>
            ) : null}
          </section>

          <nav className="print-hidden sticky top-[5.5rem] z-20 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/90 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex gap-2 text-sm font-semibold">
              {[
                ['official', '공식 분류'],
                ['clinical', '임상 개요'],
                ['diagnosis', '증상 및 진단'],
                ['treatment', '치료 및 예방'],
                ['claim', '보험 청구 가이드'],
                ['learning', '학습 자료'],
                ['stats', '역학 / 통계'],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="whitespace-nowrap rounded-full border border-slate-300/80 px-3 py-1.5 hover:border-brand-accent dark:border-slate-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <SectionCard id="official" title="공식 분류" badge="공식원문" tone="blue">
            <div className="grid gap-4 lg:grid-cols-3">
              <MetaList title="포함" items={viewModel.official.includes_official} />
              <MetaList title="제외" items={viewModel.official.excludes_official} />
              <MetaList title="주" items={viewModel.official.notes_official} />
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Source transparency</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                legacy/index.html / kcdRawData / lines {viewModel.official.source.line_start}-{viewModel.official.source.line_end}
              </p>
              <pre className="prose-reference mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-slate-100">
                {viewModel.official.raw_block.join('\n')}
              </pre>
            </div>
          </SectionCard>

          <SectionCard id="clinical" title="임상 개요" badge={provenanceLabel(enrichmentStatus)} tone={badgeTone(enrichmentStatus)}>
            {hasClinicalOverview ? (
              <div className="space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {viewModel.enrichment?.definition ? <p>{viewModel.enrichment.definition}</p> : null}
                {viewModel.enrichment?.pathophysiology ? <p>{viewModel.enrichment.pathophysiology}</p> : null}
                {viewModel.enrichment?.etiology?.length ? <BulletBlock title="원인" items={viewModel.enrichment.etiology} /> : null}
                {viewModel.enrichment?.risk_factors?.length ? (
                  <BulletBlock title="위험요인" items={viewModel.enrichment.risk_factors} />
                ) : null}
                {viewModel.enrichment?.anatomy_involved?.length ? (
                  <BulletBlock title="관련 해부" items={viewModel.enrichment.anatomy_involved} />
                ) : null}
              </div>
            ) : (
              <EmptyState
                title="임상 개요 준비중"
                description="정의, 병태생리, 원인, 위험요인은 검증된 공공/공식 출처가 확인된 항목만 노출합니다."
              />
            )}
          </SectionCard>

          <SectionCard id="diagnosis" title="증상 및 진단" badge={provenanceLabel(enrichmentStatus)} tone={badgeTone(enrichmentStatus)}>
            {hasDiagnosisData ? (
              <div className="space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {viewModel.enrichment?.symptoms?.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">증상</h3>
                    <ul className="mt-3 space-y-3">
                      {viewModel.enrichment.symptoms.map((symptom) => (
                        <li key={symptom.name} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                          <div className="flex flex-wrap items-center gap-2">
                            <StatusBadge tone={severityTone(symptom.severity)}>{symptom.severity}</StatusBadge>
                            {symptom.is_pathognomonic ? <StatusBadge tone="red">특이성 높음</StatusBadge> : null}
                          </div>
                          <p className="mt-3">{symptom.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {viewModel.enrichment?.diagnostic_criteria?.length ? (
                  <BulletBlock title="진단 포인트" items={viewModel.enrichment.diagnostic_criteria} />
                ) : null}
                {viewModel.enrichment?.differential_diagnosis?.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">감별진단</h3>
                    <ul className="mt-3 space-y-3">
                      {viewModel.enrichment.differential_diagnosis.map((item) => (
                        <li key={item.code} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                          <p className="font-semibold">{item.code} · {item.name_ko}</p>
                          <p className="mt-2 text-slate-600 dark:text-slate-300">{item.key_difference}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {flowchart ? (
                  <Link href={flowchartRoute(code)} className="inline-flex text-sm font-semibold text-brand-primary hover:underline">
                    교육용 흐름도 보기
                  </Link>
                ) : null}
              </div>
            ) : (
              <EmptyState
                title="증상·진단 데이터 없음"
                description="증상, 진단기준, 감별진단은 검증된 자료가 확보된 항목만 표시합니다."
              >
                {flowchart ? (
                  <Link href={flowchartRoute(code)} className="text-sm font-semibold text-brand-primary hover:underline">
                    교육용 흐름도 보기
                  </Link>
                ) : null}
              </EmptyState>
            )}
          </SectionCard>

          <SectionCard id="treatment" title="치료 및 예방" badge={provenanceLabel(enrichmentStatus)} tone={badgeTone(enrichmentStatus)}>
            {hasTreatmentData ? (
              <div className="space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {viewModel.enrichment?.treatment?.length ? (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">치료</h3>
                    {viewModel.enrichment.treatment.map((item) => (
                      <article key={item.approach} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold">{item.approach}</h4>
                          <StatusBadge tone="slate">Evidence {item.evidence_level}</StatusBadge>
                        </div>
                        <p className="mt-2">{item.description}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                {viewModel.enrichment?.prevention?.length ? (
                  <BulletBlock title="예방 및 자가관리" items={viewModel.enrichment.prevention} />
                ) : null}
                {viewModel.enrichment?.complications?.length ? (
                  <BulletBlock title="합병증" items={viewModel.enrichment.complications} />
                ) : null}
                {viewModel.enrichment?.prognosis ? (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">예후</h3>
                    <p className="mt-3">{viewModel.enrichment.prognosis}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <EmptyState
                title="치료·예방 데이터 없음"
                description="치료, 예방, 예후는 검증된 출처가 확보된 항목만 표시합니다."
              />
            )}
          </SectionCard>

          <SectionCard id="claim" title="보험 청구 가이드" badge={hasClaimData ? '검증완료' : '준비중'} tone={hasClaimData ? 'green' : 'amber'}>
            {hasClaimData ? (
              <div className="space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {viewModel.enrichment?.insurance ? (
                  <article className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">검증된 보험 메모</h3>
                    <p className="mt-2">
                      적용 상태:{' '}
                      {typeof viewModel.enrichment.insurance.covered === 'boolean'
                        ? viewModel.enrichment.insurance.covered
                          ? '급여 확인'
                          : '비급여/제한 확인'
                        : '미확인'}
                    </p>
                    {viewModel.enrichment.insurance.coverage_condition ? (
                      <p className="mt-2">{viewModel.enrichment.insurance.coverage_condition}</p>
                    ) : null}
                    {viewModel.enrichment.insurance.source_title ? (
                      <p className="mt-3 text-slate-500 dark:text-slate-400">
                        출처: {viewModel.enrichment.insurance.source_title}
                      </p>
                    ) : null}
                  </article>
                ) : null}
                {claimEntries.length ? (
                  <div className="space-y-3">
                    {claimEntries.map((entry) => (
                      <article key={`${entry.code}-${entry.title}`} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{entry.title}</h3>
                        {entry.coverage_condition ? <p className="mt-2">{entry.coverage_condition}</p> : null}
                        <p className="mt-3 text-slate-500 dark:text-slate-400">
                          {entry.source_title} / {entry.effective_date}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <EmptyState
                title="공식 급여자료 연동 전"
                description="급여 여부, 상대가치점수, 청구 조건은 검증된 HIRA/NHIS 문서가 연결되기 전까지 표시하지 않습니다."
              >
                <Link href={claimRoute(code)} className="text-sm font-semibold text-brand-primary hover:underline">
                  claim detail 페이지로 이동
                </Link>
              </EmptyState>
            )}
          </SectionCard>

          <SectionCard id="learning" title="학습 자료" badge={viewModel.enrichment?.learning ? '검증완료' : '준비중'} tone={viewModel.enrichment?.learning ? 'green' : 'amber'}>
            <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">공식 분류 기반 학습</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    공식 코드명, 포함, 제외, 주석은 현재 데이터만으로도 퀴즈와 분류 학습에 사용할 수 있습니다.
                  </p>
                  <Link href="/quiz" className="mt-3 inline-flex text-sm font-semibold text-brand-primary hover:underline">
                    퀴즈로 이동
                  </Link>
                </div>
                <EmptyState
                  title="증례·시나리오 준비중"
                  description="케이스 시나리오와 임상 의사결정 콘텐츠는 검증된 학습 노트가 추가될 때만 공개합니다."
                />
              </div>
              <OutboundLinks viewModel={viewModel} />
            </div>
          </SectionCard>

          <SectionCard id="stats" title="역학 / 통계" badge={viewModel.enrichment?.epidemiology ? '검증완료' : '준비중'} tone={viewModel.enrichment?.epidemiology ? 'green' : 'amber'}>
            {viewModel.enrichment?.epidemiology ? (
              <div className="space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                {viewModel.enrichment.epidemiology.prevalence_korea ? <p>국내: {viewModel.enrichment.epidemiology.prevalence_korea}</p> : null}
                {viewModel.enrichment.epidemiology.prevalence_global ? <p>국외: {viewModel.enrichment.epidemiology.prevalence_global}</p> : null}
                {viewModel.enrichment.epidemiology.trend ? <p>추세: {viewModel.enrichment.epidemiology.trend}</p> : null}
              </div>
            ) : (
              <EmptyState
                title="역학 데이터 없음"
                description="국내외 유병률과 추세 차트는 검증된 통계 원문이 준비된 뒤에만 노출합니다."
              />
            )}
          </SectionCard>
        </main>

        <aside className="space-y-4">
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
            <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">관련 코드</h2>
            <div className="mt-4 space-y-4">
              {relations?.parent ? <RelationGroup title="상위 코드" items={[relations.parent]} /> : null}
              {relations?.children?.length ? <RelationGroup title="하위 코드" items={relations.children} /> : null}
              {relations?.siblings?.length ? <RelationGroup title="형제 코드" items={relations.siblings.slice(0, 8)} /> : null}
              {relations?.references?.length ? <RelationGroup title="원문 참조 코드" items={relations.references.slice(0, 8)} /> : null}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 text-sm">
              {relations?.previous ? (
                <Link href={codeRoute(relations.previous.code)} className="text-brand-primary hover:underline">
                  이전
                </Link>
              ) : (
                <span />
              )}
              {relations?.next ? (
                <Link href={codeRoute(relations.next.code)} className="text-brand-primary hover:underline">
                  다음
                </Link>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
            <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">출처 상태</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge tone="blue">공식원문</StatusBadge>
              <StatusBadge tone="green">검증완료</StatusBadge>
              <StatusBadge tone="amber">준비중</StatusBadge>
            </div>
            {viewModel.enrichment?.provenance.sources.length ? (
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {viewModel.enrichment.provenance.sources.map((source) => (
                  <li key={`${source.title}-${source.url ?? ''}`} className="rounded-2xl border border-slate-200/70 p-3 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{source.title}</p>
                    {source.year ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{source.year}</p> : null}
                    {source.note ? <p className="mt-2">{source.note}</p> : null}
                    {source.url ? (
                      <Link href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-brand-primary hover:underline">
                        원문 링크
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                현재 이 페이지는 공식 원문 추출 데이터를 기준으로 하며, 추가 검증 출처는 아직 연결되지 않았습니다.
              </p>
            )}
          </section>

          {drugs.length ? (
            <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
              <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">관련 약물</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {drugs.map((drug) => (
                  <article key={`${drug.code}-${drug.drug_name}`} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{drug.drug_name}</p>
                    <p className="mt-2">{drug.warning}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </>
  )
}

function badgeTone(status: 'official-only' | 'verified' | 'pending') {
  if (status === 'verified') {
    return 'green' as const
  }
  if (status === 'pending') {
    return 'amber' as const
  }
  return 'blue' as const
}

function severityTone(severity: 'mild' | 'moderate' | 'severe') {
  if (severity === 'severe') {
    return 'red' as const
  }
  if (severity === 'moderate') {
    return 'amber' as const
  }
  return 'blue' as const
}

function SectionCard({
  id,
  title,
  badge,
  tone,
  children,
}: {
  id: string
  title: string
  badge: string
  tone: 'blue' | 'green' | 'amber' | 'red' | 'slate'
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">{title}</h2>
        <StatusBadge tone={tone}>{badge}</StatusBadge>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function MetaList({ title, items }: { title: string; items: string[] }) {
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
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">공식 {title} 항목이 없습니다.</p>
      )}
    </div>
  )
}

function BulletBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="rounded-2xl border border-slate-200/70 p-4 dark:border-slate-800">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RelationGroup({
  title,
  items,
}: {
  title: string
  items: Array<Pick<OfficialKcdEntry, 'code' | 'name_ko_official'>>
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <CodeChip key={item.code} code={item.code} label={item.name_ko_official} />
        ))}
      </div>
    </div>
  )
}