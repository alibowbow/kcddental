import { Suspense } from 'react'

import { SearchPageClient } from '@/components/code/search-page-client'

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="panel p-6">
          검색 페이지를 준비하고 있습니다.
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  )
}