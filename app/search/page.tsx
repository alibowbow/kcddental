import { Suspense } from 'react'

import { SearchPageClient } from '@/components/code/search-page-client'

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-950/70">
          검색 페이지를 준비하고 있습니다.
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  )
}