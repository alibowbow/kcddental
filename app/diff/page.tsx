import { EmptyState } from '@/components/ui/empty-state'
import { getChangeEntries } from '@/lib/getters'

export default function DiffPage() {
  const changes = getChangeEntries()

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">KCD 변경 비교</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          검증된 changelog 데이터가 있을 때만 added / removed / renamed / moved를 표시합니다.
        </p>
      </section>
      {changes.length ? (
        <section className="space-y-3">
          {changes.map((change) => (
            <article
              key={`${change.code}-${change.status}`}
              className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="code-font text-sm font-semibold text-brand-primary dark:text-sky-300">{change.code}</div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{change.summary}</p>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState
          title="변경 이력 데이터 없음"
          description="KCD-8과 KCD-9 차이 데이터는 아직 검증된 로컬 dataset으로 포함되어 있지 않습니다. 현재는 UI와 타입 구조만 준비되어 있습니다."
        />
      )}
    </div>
  )
}