import { Suspense } from 'react'

import { CompareClient } from '@/components/code/compare-client'

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
          비교 페이지를 준비하고 있습니다.
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  )
}