import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { officialKcdData } from '@/lib/data/official-kcd'
import { absoluteSiteUrl, codeRoute } from '@/lib/format'
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
    title: `${viewModel.official.name_ko_official} (${viewModel.official.code}) — 보험 청구`,
    alternates: { canonical: absoluteSiteUrl(`/claim/${encodeURIComponent(code)}`) },
  }
}

export default async function ClaimDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const viewModel = getDiseaseViewModel(code)

  if (!viewModel) {
    notFound()
  }

  const claims = getClaimEntries(code)

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={claims.length ? 'green' : 'amber'}>{claims.length ? '검증완료' : '준비중'}</StatusBadge>
          <StatusBadge tone="slate">출처 필요</StatusBadge>
        </div>
        <div className="mt-4 code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{viewModel.official.code}</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-slate-50">{viewModel.official.name_ko_official}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          청구 페이지는 검증된 급여 자료가 있을 때만 급여 여부, 상대가치점수, 인정 기준, 제출 서류를 표시합니다.
        </p>
      </section>

      {claims.length ? (
        <section className="space-y-3">
          {claims.map((claim) => (
            <article
              key={`${claim.code}-${claim.title}`}
              className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
            >
              <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">{claim.title}</h2>
              {claim.coverage_condition ? (
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{claim.coverage_condition}</p>
              ) : null}
              {claim.claim_codes?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {claim.claim_codes.map((item) => (
                    <span
                      key={`${claim.code}-${item.code}`}
                      className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-semibold dark:border-slate-700"
                    >
                      {item.code} {item.name}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {claim.age_restrictions ? (
                  <InfoCard title="연령 기준" body={claim.age_restrictions} />
                ) : null}
                {claim.frequency_limit ? (
                  <InfoCard title="횟수 기준" body={claim.frequency_limit} />
                ) : null}
              </div>
              {claim.claim_tips?.length ? (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">청구 팁</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {claim.claim_tips.map((tip) => (
                      <li key={tip} className="rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-800">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {claim.denial_risk_factors?.length ? (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">주의할 제외/불인정 위험</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {claim.denial_risk_factors.map((item) => (
                      <li key={item} className="rounded-xl border border-slate-200/70 px-3 py-2 dark:border-slate-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {claim.notes ? (
                <div className="mt-4 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
                  {claim.notes}
                </div>
              ) : null}
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {claim.source_title} / {claim.effective_date}
              </p>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState
          title="검증된 청구 데이터 없음"
          description="공식 KCD 분류와 보험 청구 기준은 별개입니다. 최신 HIRA/NHIS 문서가 검증되어 연결되기 전까지는 청구 판단을 생성하지 않습니다."
          badge="준비중"
        />
      )}

      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="text-xl font-bold text-slate-950 dark:text-slate-50">공식 코드 정보 fallback</h2>
        <pre className="prose-reference mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-slate-100">
          {viewModel.official.raw_block.join('\n')}
        </pre>
        <Link href={codeRoute(code)} className="mt-4 inline-flex text-sm font-semibold text-brand-primary hover:underline">
          상세 페이지로 돌아가기
        </Link>
      </section>
    </div>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{body}</p>
    </div>
  )
}
