import { Suspense } from 'react'

import { CompareClient } from '@/components/code/compare-client'

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="panel p-6">
          비교 페이지를 준비하고 있습니다.
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  )
}